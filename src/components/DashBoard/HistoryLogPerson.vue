<template>
    <div class="pa-5">
        <v-row>
            <v-col cols="12" class="pb-5">
                <div class="d-flex justify-space-between align-center flex-wrap ga-3">
                    <p class="mb-0" style="font-size: 25px; font-weight: bold;">
                        รายการประวัติการเข้า-ออก (ไม่มียานพาหนะ)
                        <v-icon class="ml-2">mdi-history</v-icon>
                    </p>
                    <v-btn prepend-icon="mdi-file-excel" color="success" :loading="exportLoading"
                        :disabled="exportLoading" @click="exportExcel()">Export Excel</v-btn>
                </div>
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
                        <v-text-field prepend-inner-icon="mdi-account" density="comfortable" variant="outlined"
                            label="ค้นหาชื่อผู้มาติดต่อ" v-model="personName" hide-details></v-text-field>
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
                        <img class="zoom"
                            :src="row.item.person?.personImgUrl ? (row.item.person.personImgUrl.startsWith('http') ? row.item.person.personImgUrl : baseUrl + row.item.person.personImgUrl) : ''"
                            alt="image" style="width: 100px; height: auto;">
                    </td>
                    <td class="text-center" style="min-width: 150px;">
                        {{ row.item?.person?.name }}
                    </td>
                    <td class="text-center">
                        {{ formatDateTime(row.item.time) }}
                    </td>
                    <td v-if="row.item.checkoutTimeStamp" class="text-center" style="min-width: 120px;">
                        {{ formatDateTime(row.item.checkoutTimeStamp) }}
                    </td>
                    <td v-else class="text-center" style="min-width: 130px;">
                        {{ }}
                    </td>
                    <td class="text-center">
                        <p v-if="row.item.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'">ผู้ติดต่อที่ลงทะเบียน</p>
                        <p v-else>{{ row.item.msg }}</p>
                    </td>
                    <td class="text-center">
                        <v-chip color="teal-lighten-1">{{ row.item.inout }}</v-chip>
                    </td>
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
import ExcelJS from "exceljs";
export default {
    setup() {
        const his = new HistorylogSer();
        const baseUrl = import.meta.env.VITE_APP_BASE_URL;
        return {
            dateFormatValue,
            datetimeFormat,
            datetimeFormatLimit,
            his,
            baseUrl
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
        dialogStart: false,
        dialogEnd: false,
        startDate: new Date(),
        endDate: new Date(),
        page: 1,
        itemsPerPage: 5,
        totalItems: 0,
        data: [],
        search: '',
        personName: '',
        exportLoading: false,
        headers: [
            { title: 'ลำดับ', align: 'center', sortable: false, key: 'index' },
            { title: 'ภาพ', align: 'center', sortable: false, key: 'personImgUrl' },
            { title: 'ชื่อผู้มาติดต่อ', align: 'center', sortable: false, key: 'name' },
            { title: 'วันที่/เวลา (ขาเข้า)', align: 'center', sortable: false, key: 'time' },
            { title: 'วันที่/เวลา (ขาออก)', align: 'center', sortable: false, key: 'checkoutTimeStamp' },
            { title: 'รายละเอียด', align: 'center', sortable: false, key: 'msg' },
            { title: 'ประเภทการเข้า/ออก', align: 'center', sortable: false, key: 'inout' },
        ],
    }),
    mounted() {
        this.endDate = this.addDays(this.startDate, +1)
        this.getData();
    },
    methods: {
        async getData() {
            this.data = [];
            const start = this.datetimeFormatLimit(this.startDate);
            const end = this.datetimeFormatLimit(this.endDate);
            const page = this.page;
            const limit = this.itemsPerPage;
            const park = this.$store.state.park;
            const name = this.personName;
            await this.his.getPersonHistory(park, start, end, name, limit, page).then(res => {
                if (res.message === 'ok') {
                    this.data = res.data;
                    if (typeof res.total_items !== 'undefined') {
                        this.totalItems = res.total_items;
                    } else if (typeof res.totalItems !== 'undefined') {
                        this.totalItems = res.totalItems;
                    } else if (typeof res.totalItem !== 'undefined') {
                        this.totalItems = res.totalItem;
                    } else {
                        this.totalItems = res.data.length;
                    }
                    if (typeof res.item_per_page !== 'undefined') {
                        this.itemsPerPage = Number(res.item_per_page);
                    } else if (typeof res.itemsPerPage !== 'undefined') {
                        this.itemsPerPage = Number(res.itemsPerPage);
                    } else if (typeof res.itemPerpage !== 'undefined') {
                        this.itemsPerPage = Number(res.itemPerpage);
                    }
                    if (typeof res.page !== 'undefined') {
                        this.page = Number(res.page);
                    }
                }
            })
        },
        async fetchAllHistoryForExport() {
            const start = this.datetimeFormatLimit(this.startDate);
            const end = this.datetimeFormatLimit(this.endDate);
            const park = this.$store.state.park;
            const name = this.personName;
            const candidateLimits = [...new Set([
                Number(this.itemsPerPage) || 20,
                100,
                50,
                20,
                10,
            ])]

            const fetchByLimit = async (limit) => {
                let page = 1
                let totalPages = 1
                let allItems = []

                while (page <= totalPages) {
                    const res = await this.his.getPersonHistory(park, start, end, name, limit, page)
                    if (res.message !== 'ok') {
                        throw new Error(res?.error || 'ไม่สามารถดึงข้อมูลสำหรับ Export ได้')
                    }

                    const pageItems = Array.isArray(res.data) ? res.data : []
                    allItems = allItems.concat(pageItems)

                    const totalItems = Number(
                        res.total_items ?? res.totalItems ?? res.totalItem ?? pageItems.length
                    )
                    totalPages = totalItems > 0 ? Math.ceil(totalItems / limit) : 1
                    page += 1
                }

                return allItems
            }

            let lastError = null
            for (const limit of candidateLimits) {
                try {
                    return await fetchByLimit(limit)
                } catch (error) {
                    lastError = error
                    if (!String(error?.message || '').includes('400')) {
                        throw error
                    }
                }
            }

            throw lastError || new Error('ไม่สามารถดึงข้อมูลสำหรับ Export ได้')
        },
        async exportExcel() {
            this.exportLoading = true

            try {
                const rows = await this.fetchAllHistoryForExport()

                if (!rows.length) {
                    alert('ไม่พบข้อมูลสำหรับ Export')
                    return
                }

                const workbook = new ExcelJS.Workbook()
                const worksheet = workbook.addWorksheet('HistoryLogPerson')

                worksheet.columns = [
                    { width: 8 },
                    { width: 30 },
                    { width: 25 },
                    { width: 25 },
                    { width: 40 },
                    { width: 20 },
                ]

                worksheet.mergeCells('A1:F1')
                const titleCell = worksheet.getCell('A1')
                titleCell.value = `ประวัติการเข้า-ออก (ไม่มียานพาหนะ)   วันที่ ${this.formatDateForExcelTitle(this.startDate)}`
                titleCell.font = { bold: true, size: 14 }
                titleCell.alignment = { horizontal: 'center', vertical: 'middle' }
                worksheet.getRow(1).height = 30

                const headerRow = worksheet.addRow([
                    'ลำดับ',
                    'ชื่อผู้มาติดต่อ',
                    'วันที่/เวลา (ขาเข้า)',
                    'วันที่/เวลา (ขาออก)',
                    'รายละเอียด',
                    'ประเภทการเข้า/ออก',
                ])
                headerRow.font = { bold: true }
                headerRow.alignment = { horizontal: 'center', vertical: 'middle' }
                headerRow.height = 20

                rows.forEach((item, index) => {
                    worksheet.addRow([
                        index + 1,
                        item?.person?.name || '',
                        this.formatDateTime(item.time),
                        item.checkoutTimeStamp ? this.formatDateTime(item.checkoutTimeStamp) : '',
                        item.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ' ? 'ผู้ติดต่อที่ลงทะเบียน' : (item.msg || ''),
                        item.inout || '',
                    ])
                })

                const buffer = await workbook.xlsx.writeBuffer()
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                const startStr = dateFormatValue(this.startDate).replaceAll('/', '-')
                a.href = url
                a.download = `ประวัติการเข้า-ออก (ไม่มียานพาหนะ)-${startStr}.xlsx`
                a.click()
                URL.revokeObjectURL(url)
            } catch (error) {
                console.error(error)
                alert('เกิดข้อผิดพลาดขณะ Export Excel')
            } finally {
                this.exportLoading = false
            }
        },
        formatDateTime(dateString) {
            if (!dateString) return '';
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
        formatDateForExcelTitle(dateValue) {
            const date = new Date(dateValue)
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = date.getFullYear()
            return `${day}/${month}/${year}`
        },
        addDays(date, days) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        },
        clearFilter() {
            this.personName = '';
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