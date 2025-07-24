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
                            <td class="text-center py-2">
                                <!-- <img class="zoom" :src="baseUrl + row.item.platesPhoto" alt="image"
                                    style="width: 200px; height: auto;"> -->
                                <img class="zoom"
                                    :src="!row.item.platesPhoto.startsWith('http') ? baseUrl + row.item.platesPhoto : row.item.platesPhoto"
                                    alt="image" style="width: 200px; height: auto;">
                            </td>
                            <td class="text-center">
                                <!-- <img class="zoom" :src="baseUrl + row.item.platesPhoto2" alt="image"
                                    style="width: 200px; height: auto;"> -->
                                <img class="zoom"
                                    :src="!row.item.platesPhoto2.startsWith('http') ? baseUrl + row.item.platesPhoto2 : row.item.platesPhoto2"
                                    alt="image" style="width: 200px; height: auto;">
                            </td>
                            <td>
                                {{ row.item.license }}
                            </td>
                            <!-- //NOTE - Entry -->
                            <td class="text-center">
                                <p v-if="row.item.inout === 'ENTRY'">{{ formatDateTime(row.item.time) }}</p>
                                <p v-else>-</p>
                            </td>
                            <!-- <td>
                                        <p v-if="this.TypeOf === 'CheckOut'">{{
                                            formatDateTime(row.item.EntryTime) }}
                                        </p>
                                        <p v-else>{{ formatDateTime(row.item.time) }}</p>
                                    </td> -->
                            <!-- //NOTE - Exit -->
                            <td class="text-center">
                                <p v-if="row.item.inout === 'EXIT'">{{ formatDateTime(row.item.time) }}</p>
                                <p v-else>-</p>
                            </td>
                            <!-- <td>
                                        <p v-if="row.item.checkoutTimeStamp">{{
                                            formatDateTime(row.item.checkoutTimeStamp) }}</p>
                                        <p v-else-if="row.item.exitTime">{{ formatDateTime(row.item.exitTime)
                                            }}</p>
                                        <p v-else>-</p>
                                    </td> -->
                            <td>
                                <v-chip color="red">{{ row.item.msg }}</v-chip>
                            </td>
                            <td>
                                <v-chip color="teal-lighten-1">{{ row.item.inout }}</v-chip>
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