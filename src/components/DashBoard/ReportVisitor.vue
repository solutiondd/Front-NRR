<template>
    <v-dialog :value="Reportdialog" @input="$emit('update:modelValue', $event)" width="80%">
        <v-card>
            <div>
                <v-toolbar :color="typeMap[type]?.color" density="comfortable">
                    <v-toolbar-title class="d-flex align-center">
                        <v-icon :icon="typeMap[type]?.icon" size="small" class="mr-2" />
                        {{ typeMap[type]?.text || 'ไม่พบข้อมูล' }}
                    </v-toolbar-title>
                    <v-btn icon="mdi-close" size="small" @click="$emit('update:modelValue', false)"></v-btn>
                </v-toolbar>
            </div>
            <div class="pa-3">
                <v-card variant="flat">
                    <v-data-table fixed-header :headers="headers" :page="page" :items-per-page="itemsPerPage"
                        :items="data" class="elevation-1 no-border-table" hide-default-footer>
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
                                        style="width: 150px; height: auto;"> -->
                                    <img class="zoom"
                                        :src="!row.item.platesPhoto.startsWith('http') ? baseUrl + row.item.platesPhoto : row.item.platesPhoto"
                                        alt="image" style="width: 150px; height: auto;">

                                </td>
                                <td class="text-center py-2">
                                    <!-- <img class="zoom" :src="baseUrl + row.item.platesPhoto2" alt="image"
                                        style="width: 150px; height: auto;"> -->
                                    <img class="zoom"
                                        :src="!row.item.platesPhoto2.startsWith('http') ? baseUrl + row.item.platesPhoto2 : row.item.platesPhoto2"
                                        alt="image" style="width: 150px; height: auto;">
                                </td>
                                <td class="text-center" v-for="lp in row.item.plates" :key="lp._id">
                                    {{ lp.License }}
                                    <p v-if="row.item.confirmLicensePlate" style="font-size: 14px; color: grey;">({{
                                        row.item.confirmLicensePlate }})</p>
                                </td>
                                <td class="text-center">
                                    {{ row.item?.person?.name }}
                                </td>
                                <td class="text-center">
                                    {{ formatDateTime(row.item.time) }}
                                </td>
                                <td v-if="row.item.checkoutTimeStamp" class="text-center">
                                    {{ formatDateTime(row.item.checkoutTimeStamp) }}
                                </td>
                                <td v-else class="text-center">
                                    {{ }}
                                </td>
                                <td class="text-center">
                                    <p>{{ row.item.msg }}</p>
                                </td>
                                <td class="text-center">
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
                <!-- <v-card-actions class="d-flex align-end justify-end pa-0">
                    <v-btn variant="flat" color="red" @click="$emit('update:modelValue', false)"
                        :ripple="false">ปิด</v-btn>
                </v-card-actions> -->
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import { datetimeFormatLimit } from '../../function/day';
import { StrangerService } from '../../api/ReportStranger';
export default {
    props: {
        Reportdialog: Boolean,
        type: String,
    },
    setup() {
        const stranger = new StrangerService();
        const baseUrl = import.meta.env.VITE_APP_BASE_URL;
        return {
            stranger,
            baseUrl,
            datetimeFormatLimit
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
    },
    watch: {
        type: {
            handler(newVal) {
                this.getData(newVal);
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
            CheckOut: {
                icon: 'mdi-car-arrow-right',
                text: 'ลงทะเบียนเวลาออก',
                color: '#E53935'
            },
            NotRegister: {
                icon: 'mdi-alert-circle-outline',
                text: 'ไม่ได้ลงทะเบียนเวลาเข้า',
                color: '#757575'
            },
            Remaining: {
                icon: 'mdi-parking',
                text: 'คงเหลือในพื้นที่',
                color: 'primary'
            }
        },
        headers: [
            { title: 'ลำดับ', align: 'center', sortable: false, key: 'index' },
            { title: 'ภาพป้ายทะเบียน 1', align: 'center', sortable: false, key: 'platesPhoto' },
            { title: 'ภาพป้ายทะเบียน 2', align: 'center', sortable: false, key: 'platesPhoto2' },
            { title: 'หมายเลขทะเบียน', align: 'center', sortable: false, key: 'license' },
            { title: 'ชื่อผู้ติดต่อ', align: 'center', sortable: false, key: 'license' },
            { title: 'วันที่/เวลา (ขาเข้า)', align: 'center', sortable: false, key: 'entry.time' },
            { title: 'วันที่/เวลา (ขาออก)', align: 'center', sortable: false, key: 'entry.checkoutTimeStamp' },
            { title: 'รายละเอียด', align: 'center', sortable: false, key: 'entry.msg' },
            { title: 'ประเภทการเข้า/ออก', align: 'center', sortable: false, key: 'inout' },
        ],
        data: [],
        page: 1,
        itemsPerPage: 5,
        startDate: new Date(),
        endDate: new Date(),
    }),
    mounted() {
        this.endDate = this.addDays(this.startDate, +1)
    },
    methods: {
        async getData(type) {
            try {
                const start = datetimeFormatLimit(this.startDate);
                const end = datetimeFormatLimit(this.endDate);
                const park = this.$store.state.park;
                let res;

                //NOTE - Not Group
                if (type === 'Registered') {
                    res = await this.stranger.Registered(start, end, park);
                } else if (type === 'CheckOut') {
                    res = await this.stranger.CheckOut(start, end, park);
                } else if (type === 'NotRegister') {
                    res = await this.stranger.NotRegister(start, end, park);
                } else if (type === 'Remaining') {
                    res = await this.stranger.Remaining(start, end, park);
                }


                //NOTE - Group by LicensePlate
                // if (type === 'Registered') {
                //     res = await this.stranger.RegisteredGroup(start, end, park);
                // } else if (type === 'CheckOut') {
                //     res = await this.stranger.CheckOutGroup(start, end, park);
                // } else if (type === 'NotRegister') {
                //     res = await this.stranger.NotRegisterGroup(start, end, park);
                // } else if (type === 'Remaining') {
                //     res = await this.stranger.RemainingGroup(start, end, park);
                // }

                if (res?.message === 'ok') {
                    this.data = res.data;
                    this.data.reverse();
                    this.page = 1;
                    console.log(`${type} : `, this.data);
                }
            } catch (error) {
                console.log(`Error for type: ${type}`, error)
            }
        },
        addDays(date, days) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        },
        formatDateTime(dateString) {
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
        },
    },
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