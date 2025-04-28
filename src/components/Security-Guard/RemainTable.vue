<template>
    <v-card class="ma-2" style="background-color: #FAFAFA;">
        <div>
            <v-toolbar color="primary" density="comfortable">
                <v-toolbar-title class="d-flex align-center">
                    <p>
                        <v-icon icon="mdi-parking" size="small" class="mr-2"></v-icon>
                        คงเหลือในพื้นที่ทั้งหมด {{ this.data.length }} คัน
                    </p>
                </v-toolbar-title>
            </v-toolbar>
        </div>
        <div>
            <v-card variant="flat" style="background-color: #FAFAFA;">
                <v-data-table :headers="headers" :items="data" :page="page" :items-per-page="itemsPerPage"
                    class="elevation-1" hide-default-footer style="background-color: #FAFAFA; color: black;">
                    <template v-slot:headers="column">
                        <tr>
                            <th style="font-size: 13px;" class="text-center" v-for="hd in column.headers[0]"
                                :key="hd.title">
                                {{ hd.title }}
                            </th>
                        </tr>
                    </template>
                    <template v-slot:item="row">
                        <tr>
                            <td class="text-center">
                                {{ ((page - 1) * itemsPerPage) + (row.index + 1) }}
                            </td>
                            <td class="text-center">
                                {{ row.item.license }}
                            </td>
                            <td class="text-center" style="min-width: 180px;">
                                <div v-for="lp in row.item.person" :key="lp.identityNumber">
                                    {{ lp.name }}
                                </div>
                            </td>
                            <td class="text-center">
                                {{ formatDateTime(row.item.timeStamp[0]) }}
                            </td>
                            <td class="text-center">
                                {{ formatDateTime(row.item.checkoutTimeStamp[0]) }}
                            </td>
                            <td class="text-center">
                                <v-chip color="red">{{ row.item.msg }}</v-chip>
                            </td>
                            <td class="text-center">
                                <DetailRemain :data="row.item.data" />
                            </td>
                        </tr>
                    </template>
                    <template v-slot:bottom>
                        <div class="text-center pt-2">
                            <v-pagination v-model="page" :length="pageCount"></v-pagination>
                        </div>
                    </template>
                </v-data-table>
            </v-card>
        </div>
    </v-card>
</template>

<script>
import { StrangerService } from '../../api/ReportStranger';
import { datetimeFormatLimit } from '../../function/day';
import DetailRemain from './DetailRemain.vue';
export default {
    setup() {
        const stranger = new StrangerService();
        return {
            stranger,
            datetimeFormatLimit
        }
    },
    components: {
        DetailRemain,
    },
    computed: {
        pageCount() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
    },
    data: () => ({
        headers: [
            { title: 'ลำดับ', align: 'center', sortable: false, key: 'index' },
            { title: 'หมายเลขทะเบียน', align: 'center', sortable: false, key: 'license' },
            { title: 'เจ้าของ', align: 'center', sortable: false, key: 'license' },
            { title: 'วันที่/เวลา (ขาเข้า)', align: 'center', sortable: false, key: 'entry.time' },
            { title: 'วันที่/เวลา (ขาออก)', align: 'center', sortable: false, key: 'entry.checkoutTimeStamp' },
            { title: 'สถานะ', align: 'center', sortable: false, key: 'entry.msg' },
            { title: 'รายละเอียดเพิ่มเติม', align: 'center', sortable: false, key: 'inout' },
        ],
        data: [],
        page: 1,
        itemsPerPage: 10,
        startDate: new Date(),
        endDate: new Date(),
    }),
    async mounted() {
        this.endDate = this.addDays(this.startDate, +1)
        await this.getData();
    },
    methods: {
        async getData() {
            const start = datetimeFormatLimit(this.startDate);
            const end = datetimeFormatLimit(this.endDate);
            const park = this.$store.state.park;
            await this.stranger.SRgetreport(start, end, park).then((res) => {
                if (res.message === 'ok') {
                    this.data = res.data;
                    this.page = 1;
                } else {
                    this.$swal({
                        icon: 'error',
                        title: 'มีบางอย่างผิดพลาด',
                        text: 'กรุณาลองใหม่อีกครั้ง !',
                    });
                }
            });
        },
        addDays(date, days) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        },
        formatDateTime(dateString) {
            if (dateString === null || dateString === undefined || !dateString) {
                return '-';
            } else {
                const date = new Date(dateString);
                return date.toLocaleString("th-TH", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false
                }).replace(",", "");
            }
        },
    }
}
</script>

<style scoped></style>