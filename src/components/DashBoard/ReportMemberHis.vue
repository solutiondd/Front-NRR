<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:model-value', $event)" width="85%">
        <div>
            <v-toolbar :color="typeMap[type]?.color" density="comfortable">
                <v-toolbar-title class="d-flex align-center">
                    <v-icon :icon="typeMap[type]?.icon" size="small" class="mr-2"></v-icon>
                    {{ typeMap[type]?.text || 'ไม่พบข้อมูลประเภท' }}
                </v-toolbar-title>
                <v-btn icon="mdi-close" size="small" @click="closeDialog"></v-btn>
            </v-toolbar>
        </div>
        <div class="pa-3" style="background-color: #212121;">
            <v-text-field class="pt-5 px-5" density="comfortable" variant="outlined" label="ค้นหา (ทะเบียนรถ, เจ้าของ)"
                prepend-inner-icon="mdi-magnify" v-model="searchQuery" clearable hide-details></v-text-field>
        </div>
        <v-card>
            <div class="pa-3">
                <v-card variant="flat">
                    <v-data-table :headers="headers" :page="page" :items-per-page="itemsPerPage" :items="filteredData"
                        class="elevation-1" hide-default-footer>
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
                                <td>
                                    <p>{{ ((page - 1) * itemsPerPage) + (row.index + 1) }}</p>
                                </td>
                                <td>
                                    <p>{{ row.item.license }}</p>
                                </td>
                                <td>
                                    <p>{{ row.item.person }}</p>
                                </td>
                                <td>
                                    <p>{{ dateFormatWTime(row.item.firstTimeStamp) }}</p>
                                </td>
                                <td>
                                    <p>{{ dateFormatWTime(row.item.exitTime) }}</p>
                                </td>
                                <td>
                                    <v-chip v-if="row.item.msg === 'บุคคลภายใน'" color="green">{{ row.item.msg
                                    }}</v-chip>
                                    <v-chip v-if="row.item.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'" color="warning">{{
                                        row.item.msg }}</v-chip>
                                </td>
                                <td>
                                    <DetailMember :data="row.item.data" :TypeOf="this.type" />
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
    </v-dialog>
</template>

<script>
import { HistorylogSer } from '../../api/Historylog';
import { datetimeFormatLimit, dateFormatWTime } from '../../function/day';
import DetailMember from './DetailMember.vue';
export default {
    props: {
        modelValue: Boolean,
        type: String,
        DateStart: Date,
        DateEnd: Date,
    },
    components: {
        DetailMember
    },
    setup() {
        const historylog = new HistorylogSer();
        const baseUrl = import.meta.env.VITE_BASE_URL;
        return {
            historylog,
            baseUrl,
            dateFormatWTime
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
        filteredData() {
            if (!this.searchQuery) return this.data;

            const query = this.searchQuery.toLowerCase();

            return this.data.filter(item => {
                const licenseMatch = item.license?.toLowerCase().includes(query);
                const personMatch = item.person?.toLowerCase().includes(query);
                return licenseMatch || personMatch;
            });
        }
    },
    watch: {
        modelValue(newVal) {
            if (newVal) {
                this.startDate = this.DateStart;
                this.endDate = this.DateEnd;
                this.getData(this.type);
            }
        },
        type: {
            handler(newVal) {
                this.startDate = this.DateStart;
                this.endDate = this.DateEnd;
                this.getData(newVal);
            },
            immediate: true
        },
    },
    data: () => ({
        typeMap: {
            member: {
                icon: 'mdi-car',
                text: 'รถพนักงาน',
                color: '#66BB6A'
            },
            visitor: {
                icon: 'mdi-car-info',
                text: 'รถผู้ติดต่อที่ลงทะเบียน',
                color: '#FD7E14'
            }
        },
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
        itemsPerPage: 7,
        startDate: new Date(),
        endDate: new Date(),
        searchQuery: '',
    }),
    mounted() {

    },
    methods: {
        async getData(type) {
            try {
                const park = this.$store.state.park;
                const start = datetimeFormatLimit(this.startDate);
                const end = datetimeFormatLimit(this.endDate);

                let res;
                if (type === 'member') {
                    res = await this.historylog.MemberHis(park, start, end, 'บุคคลภายใน')
                } else if (type === 'visitor') {
                    res = await this.historylog.MemberHis(park, start, end, 'ผู้ติดต่อที่ได้รับอนุญาติ')
                }

                if (res?.message === 'ok') {
                    res.data.sort((a, b) => new Date(b.firstTimeStamp) - new Date(a.firstTimeStamp));
                    this.data = res.data;
                    this.page = 1;
                }
            } catch (error) {
                console.error(error);
                this.$swal({
                    icon: 'error',
                    title: `มีบางอย่างผิดพลาด!`,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                })
            }

        },
        closeDialog() {
            this.searchQuery = '';
            this.$emit('update:modelValue', false);
        },
        formatDateTime(dateString) {
            if (dateString === null || dateString === undefined || !dateString || dateString === '-') {
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

<style scoped>
td {
    text-align: center;
}
</style>