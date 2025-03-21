<template>
    <div class="pa-5">
        <v-row>
            <v-col cols="12" class="pb-5">
                <p style="font-size: 25px; font-weight: bold;">รายการประวัติการเข้า-ออก<v-icon
                        class="ml-2">mdi-history</v-icon>
                </p>
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-row class="d-flex align-center">
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field readonly density="comfortable" variant="outlined" label="วันที่เริ่มต้น"
                            hide-details prepend-inner-icon="mdi-calendar-today" v-model="FormatStart"
                            @click="dialogStart = true">
                            <v-dialog v-model="dialogStart" width="auto">
                                <v-date-picker v-model="startDate" color="primary" @click:save="dialogStart = false"
                                    @click:cancel="dialogStart = false"></v-date-picker>
                            </v-dialog>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field readonly density="comfortable" variant="outlined" label="วันที่สิ้นสุด"
                            hide-details prepend-inner-icon="mdi-calendar" v-model="FormatEnd"
                            @click="dialogEnd = true">
                            <v-dialog v-model="dialogEnd" width="auto">
                                <v-date-picker v-model="endDate" color="primary" @click:save="dialogEnd = false"
                                    @click:cancel="dialogEnd = false"></v-date-picker>
                            </v-dialog>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field prepend-inner-icon="mdi-card-text" density="comfortable" variant="outlined"
                            label="ค้นหาตามป้ายทะเบียนรถ" v-model="licenseplate" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn width="100%" prepend-icon="mdi-magnify" color="primary" @click="getData()">ค้นหา</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn icon="mdi-refresh" size="small" color="grey-darken-2" @click="clearFilter()"></v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
    <v-card variant="flat">
        <v-data-table fixed-headers :headers="headers" :page="page" :items-per-page="itemsPerPage"
            :server-items-length="totalItems" :items="data" class="elevation-1" :search="search" item-value="_id">
            <template v-slot:headers="column">
                <tr>
                    <th class="text-center" v-for="hd in column.headers[0]" :key="hd.title">
                        {{ hd.title }}
                    </th>
                </tr>
            </template>
            <template v-slot:item="row">
                <tr>
                    <td class="text-center">
                        {{ ((page - 1) * itemsPerPage) + (row.index + 1) }}
                    </td>
                    <td class="text-center py-3">
                        <img class="zoom" :src="baseUrl + row.item.platesPhoto" alt="image"
                            style="width: 250px; height: auto;">
                    </td>
                    <td class="text-center py-3">
                        <img class="zoom" :src="baseUrl + row.item.platesPhoto2" alt="image"
                            style="width: 250px; height: auto;">
                    </td>
                    <td class="text-center" v-for="lp in row.item.plates" :key="lp._id">
                        {{ lp.License }}
                    </td>
                    <td class="text-center">
                        {{ formatDateTime(row.item.time) }}
                    </td>
                    <td class="text-center">
                        <p v-if="row.item.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'">ผู้ติดต่อที่ลงทะเบียน</p>
                        <p v-else>{{ row.item.msg }}</p>

                    </td>
                    <td class="text-center">
                        <v-chip color="teal-lighten-1">{{ row.item.inout }}</v-chip>
                    </td>
                    <!-- <td class="text-center">
                        <v-chip v-if="row.item.hooked === false" color="red-lighten-2">
                            {{ row.item.hooked }}
                        </v-chip>
                        <v-chip v-if="row.item.hooked === true" color="green-lighten-2">
                            {{ row.item.hooked }}
                        </v-chip>
                    </td> -->
                </tr>
            </template>
            <template v-slot:bottom>
                <div class="text-center pt-2">
                    <v-pagination v-model="page" :length="pageCount" @update:modelValue="getData"></v-pagination>
                </div>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { HistorylogSer } from "../../api/Historylog";
import { dateFormatValue, datetimeFormat, datetimeFormatLimit } from "../../function/day";
export default {
    setup() {
        const his = new HistorylogSer();
        const baseUrl = import.meta.env.VITE_APP_BASE_URL;
        return {
            his,
            baseUrl,
            datetimeFormat,
            dateFormatValue
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        FormatStart() {
            return dateFormatValue(this.startDate);
        },
        FormatEnd() {
            return dateFormatValue(this.endDate);
        },
    },
    data: () => ({
        startDate: new Date(),
        endDate: new Date(),
        Url: '',
        page: 1,
        licenseplate: '',
        itemsPerPage: 5,
        totalItems: 0,
        imagePreview: null,
        data: [],
        search: '',
        headers: [
            { title: 'ลำดับ', align: 'center', sortable: false, key: 'index' },
            { title: 'ภาพป้ายทะเบียน 1', align: 'center', sortable: false, key: 'platesPhoto' },
            { title: 'ภาพป้ายทะเบียน 2', align: 'center', sortable: false, key: 'platesPhoto2' },
            { title: 'หมายเลขทะเบียน', align: 'center', sortable: false, key: 'license' },
            { title: 'วันที่/เวลา', align: 'center', sortable: false, key: 'entry.time' },
            { title: 'รายละเอียด', align: 'center', sortable: false, key: 'entry.msg' },
            { title: 'ประเภทการเข้า/ออก', align: 'center', sortable: false, key: 'inout' },
            // { title: 'สถานะการเชื่อมต่อ', align: 'center', sortable: false, key: 'hooked' },
        ],
        dialogStart: false,
        dialogEnd: false,
    }),
    mounted() {
        this.endDate = this.addDays(this.startDate, +1)
        this.getData();
    },
    methods: {
        async getData() {
            this.data = [];
            const start = datetimeFormatLimit(this.startDate)
            const end = datetimeFormatLimit(this.endDate);
            const page = this.page
            const limit = this.itemsPerPage
            const park = this.$store.state.park
            const license = this.licenseplate
            await this.his.getRecHis(limit, page, start, end, license, park).then(res => {
                if (res.message === 'ok') {
                    this.data = res.data;
                    this.totalItems = res.totalItem;
                    this.itemsPerPage = Number(res.itemPerpage)
                    console.log(this.data)
                }
            })
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
        addDays(date, days) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        },
        clearFilter() {
            this.licenseplate = '';
            this.getData();
        },
    }

}
</script>

<style scoped>
.zoom {
    transition: transform .2s;
}

.zoom:hover {
    transform: scale(1.5);
    z-index: 1;
}
</style>