<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:model-value', $event)" width="85%">
        <div>
            <v-toolbar :color="typeMap[type]?.color" density="comfortable">
                <v-toolbar-title class="d-flex align-center">
                    <v-icon :icon="typeMap[type]?.icon" size="small" class="mr-2" />
                    {{ typeMap[type]?.text || 'ไม่พบข้อมูล' }}
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
                                <td class="text-center">
                                    {{ ((page - 1) * itemsPerPage) + (row.index + 1) }}
                                </td>
                                <td class="text-center">
                                    {{ row.item.license }}
                                </td>
                                <td class="text-center" style="min-width: 180px;">
                                    <div v-for="lp in row.item.person" :key="lp">
                                        {{ lp.name }}
                                    </div>
                                </td>
                                <td class="text-center">
                                    <p>{{ formatDateTime(row.item.firstTimeStamp) }}</p>
                                </td>
                                <!-- //NOTE - Condition to show ExitTime -->
                                <!-- <td v-if="type === 'CheckOutByCam'" class="text-center">
                                    <p>{{ formatDateTime(row.item.exitTime) }}</p>
                                </td>
                                <td v-else-if="type === 'NotRegisterIN' || type === 'NotRegisterOUT'">
                                    <p v-if="row.item.checkoutTimeStamp.length > 0">{{
                                        formatDateTime(row.item.checkoutTimeStamp[0]) }}</p>
                                    <p v-else>{{ formatDateTime(row.item.exitTime) }}</p>
                                </td>
                                <td v-else>
                                    <p> {{ formatDateTime(row.item.checkoutTimeStamp[0]) }}</p>
                                </td> -->
                                <td class="text-center">
                                    <p>{{ formatDateTime(row.item.exitTime) }}</p>
                                </td>
                                <!-- // -->
                                <td class="tex-center">
                                    <v-chip color="red">{{ row.item.msg }}</v-chip>
                                </td>
                                <td class="text-center">
                                    <Detail :data="row.item.data" :TypeOf="this.type" />
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
import { dateFormatValue2, datetimeFormatLimit } from '../../function/day';
import { StrangerService } from '../../api/ReportStranger';
import Detail from '../ReportVisitorGroup/Detail.vue';
export default {
    props: {
        modelValue: Boolean,
        Reportdialog: Boolean,
        type: String,
        DateStart: Date,
        DateEnd: Date,
    },
    components: {
        Detail,
    },
    setup() {
        const stranger = new StrangerService();
        const baseUrl = import.meta.env.VITE_BASE_URL;
        return {
            stranger,
            baseUrl,
            datetimeFormatLimit,
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
                const personMatch = item.person?.some(p => p.name?.toLowerCase().includes(query));
                return licenseMatch || personMatch;
            });
        }
    },
    watch: {
        modelValue(newVal) {
            if (newVal) {
                this.startDate = this.DateStart;
                this.endDate = this.DateEnd;
                // this.getData(this.type);
                this.getCRData(this.type);
            }
        },
        type: {
            handler(newVal) {
                this.startDate = this.DateStart;
                this.endDate = this.DateEnd;
                // this.getData(newVal);
                this.getCRData(newVal);
            },
            immediate: true // <-- เรียกทันทีเมื่อเริ่มต้น
        },
    },
    data: () => ({
        typeMap: {
            Registered: {
                icon: 'mdi-car-arrow-left',
                text: 'ลงทะเบียนเวลาเข้า',
                color: '#66BB6A'
            },
            CheckOutByQR: {
                icon: 'mdi-car-arrow-right',
                text: 'ลงทะเบียนเวลาออกด้วยคิวอาร์โคด',
                color: '#DC3545'
            },
            CheckOutByCam: {
                icon: 'mdi-car-arrow-right',
                text: 'ลงทะเบียนเวลาออกด้วยกล้อง',
                color: '#FD7E14'
            },
            NotRegisterIN: {
                icon: 'mdi-alert-circle-outline',
                text: 'ไม่ได้ลงทะเบียนเวลาเข้า',
                color: '#757575'
            },
            NotRegisterOUT: {
                icon: 'mdi-alert-circle-outline',
                text: 'ไม่ได้ลงทะเบียนเวลาออก',
                color: '#E091A3'
            },
            Remaining: {
                icon: 'mdi-parking',
                text: 'คงเหลือในพื้นที่',
                color: 'primary'
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
        timeEntry: '',
    }),
    mounted() {
        // this.endDate = this.addDays(this.startDate, +1)
        this.getCRData();
    },
    methods: {
        // async getData(type) {
        //     try {
        //         const statusin = 'in';
        //         const statusout = 'out';
        //         const start = datetimeFormatLimit(this.startDate);
        //         const end = datetimeFormatLimit(this.endDate);
        //         const park = this.$store.state.park;
        //         let res;

        //         //NOTE - Not Group
        //         // if (type === 'Registered') {
        //         //     res = await this.stranger.Registered(start, end, park);
        //         // } else if (type === 'CheckOut') {
        //         //     res = await this.stranger.CheckOut(start, end, park);
        //         // } else if (type === 'NotRegister') {
        //         //     res = await this.stranger.NotRegister(start, end, park);
        //         // } else if (type === 'Remaining') {
        //         //     res = await this.stranger.Remaining(start, end, park);
        //         // }


        //         //NOTE - Group by LicensePlate
        //         if (type === 'Registered') {
        //             res = await this.stranger.RegisteredGroup(start, end, park);
        //         } else if (type === 'CheckOutByQR') {
        //             res = await this.stranger.ReportCR(start, end, statusout);
        //         } else if (type === 'CheckOutByCam') {
        //             res = await this.stranger.ReportCR(start, end, statusout);
        //         } else if (type === 'NotRegisterIN') {
        //             res = await this.stranger.NotRegisterGroup(start, end, park);
        //         } else if (type === 'NotRegisterOUT') {
        //             res = await this.stranger.NotRegisterGroup(start, end, park);
        //         } else if (type === 'Remaining') {
        //             res = await this.stranger.ReportCR(start, end, statusin);
        //         }

        //         if (res?.message === 'ok') {
        //             this.data = res.data;
        //             if (type === 'CheckOut' || type === 'Remaining') {
        //                 this.data = this.data.map(item => {
        //                     const firstEntry = item.data.find(entry => entry.inout && entry.inout.toUpperCase() === "ENTRY");
        //                     return {
        //                         ...item,
        //                         entryTime: firstEntry?.time || '-',
        //                     };
        //                 });
        //                 console.log(this.data)
        //                 // this.timeEntry = timeEn ? timeEn.time : '-';
        //                 // this.data.reverse();
        //                 this.page = 1;
        //             }

        //         }
        //     } catch (error) {
        //         console.log(`Error for type: ${type}`, error)
        //     }
        // },
        addDays(date, days) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
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
        closeDialog() {
            this.searchQuery = '';
            this.$emit('update:modelValue', false);
        },
        LastExit(AttData) {
            console.log("Att Data : ", AttData);
            if (!Array.isArray(AttData) || AttData.length === 0) {
                return '-';
            }

            const lastExit = AttData.filter(item => item.inout && item.inout.toUpperCase() === "EXIT");
            if (lastExit.length === 0) {
                return '-';
            }

            const lastExitTime = lastExit.reduce((latest, current) => {
                const currentTime = new Date(current.time);
                return currentTime > latest ? currentTime : latest;
            }, new Date(lastExit[0].time));

            return this.formatDateTime(lastExitTime);
        },
        async getCRData(type) {
            try {
                const start = datetimeFormatLimit(this.startDate);
                const end = datetimeFormatLimit(this.endDate);
                const park = this.$store.state.park;

                let res;

                if (type === 'Registered') {
                    res = await this.stranger.RegisteredIn(start, end, park);
                } else if (type === 'CheckOutByQR') {
                    res = await this.stranger.CheckOutByQr(start, end, park);
                } else if (type === 'CheckOutByCam') {
                    res = await this.stranger.CheckOutByCam(start, end, park);
                } else if (type === 'NotRegisterIN') {
                    res = await this.stranger.NotRegisterIn(start, end, park);
                } else if (type === 'NotRegisterOUT') {
                    res = await this.stranger.NotRegisterOut(start, end, park);
                }
                else if (type === 'Remaining') {
                    res = await this.stranger.RemainingInSite(start, end, 'in');
                }

                if (res?.message === 'ok') {
                    this.data = res.data;
                    console.log(this.data);
                    this.page = 1;
                }
            } catch (error) {
                this.$swal({
                    icon: 'error',
                    title: `มีบางอย่างผิดพลาด!`,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        }
    }
}
</script>

<style scoped>
.zoom {
    transition: transform .2s;
}

.zoom:hover {
    transform: scale(1.3);
    z-index: 1;
}
</style>