<template>
    <div class="pa-5">
        <v-row>
            <v-col cols="12" sm="6" class="pb-3">
                <p style="font-size: 25px; font-weight: bold;">รายการทะเบียนรถ<v-icon
                        class="ml-2">mdi-card-text</v-icon>
                </p>
            </v-col>
            <v-col cols="12" sm="6" class="pb-3 text-end">
                <Create @success="getData()" />
                <Import class="ml-2" @success="getData()" />
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-row class="d-flex align-center">
                    <v-col cols="12" sm="8" md="9" lg="8">
                        <v-text-field hide-details prepend-inner-icon="mdi-magnify" density="comfortable"
                            variant="outlined" label="ค้นหา" v-model="search"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="3" lg="2">
                        <v-select label="ค้นหาตามสถานะ" hide-details variant="outlined" density="comfortable"
                            v-model="filterStatus" :items="Allstatus" item-value="value" item-title="label"
                            clearable></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="3" lg="2">
                        <v-btn prepend-icon="mdi-magnify" color="primary" @click="getData()">ค้นหา</v-btn>
                        <v-btn icon="mdi-refresh" color="grey-darken-2" size="small" class="ml-3"
                            @click="clearSearch()"></v-btn>
                    </v-col>

                </v-row>
            </v-col>
        </v-row>
    </div>
    <v-card variant="flat">
        <v-data-table fixed-header :headers="headers" :page="page" :items-per-page="itemsPerPage"
            :server-items-length="totalItems" :items="data" class="elevation-1 no-border-table" item-value="_id">
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
                    <td class="text-center">
                        {{ row.item.licensePlate }}
                    </td>
                    <td class="text-center">
                        {{ row.item.licensePlateProvince }}
                    </td>
                    <td class="text-center">
                        {{ row.item.vehicleType }}
                    </td>
                    <td class="text-center">
                        <p v-if="row.item.category">{{ row.item.category }}</p>
                        <p v-if="row.item.vehicleType === 'TRUCK' && (!row.item.cate || row.item.cate === 'member')">
                            รถส่งข้าวโพด</p>
                    </td>

                    <td class="text-center">
                        {{ dateFormat(row.item.start) }}
                    </td>
                    <td class="text-center">
                        {{ dateFormat(row.item?.expire) }}
                    </td>
                    <td class="text-center">
                        {{ row.item.guestName }}
                    </td>
                    <td class="text-center" style="width: 220px;">
                        <div v-for="device in row.item.devices" :key="device._id" class="py-1">
                            <v-chip color="primary">
                                <p>{{ device.name }}</p>
                            </v-chip>
                            <v-chip color="teal-lighten-1">
                                <p>{{ device.gate }}</p>
                            </v-chip>
                        </div>
                    </td>
                    <td class="text-center">
                        <UpgradStranger @success="getData()" :id="row.item._id" :data="row.item" />
                        <UploadToCloud @success="getData()" :id="row.item._id" :data="row.item" />
                    </td>
                    <td class="text-center">
                        <v-chip v-if="row.item.cate == 'member' || row.item.cate === ''"
                            color="#689F38">พนักงาน</v-chip>
                        <v-chip v-if="row.item.cate === 'visitor'" color="#F57F17">ผู้ติดต่อที่ลงทะเบียน</v-chip>
                        <v-chip v-if="row.item.cate === 'stranger'" color="#E53935">ผู้ติดต่อที่ไม่ได้ลงทะเบียน</v-chip>
                    </td>
                    <td class="text-center">
                        <Detail :data="row.item" />
                        <DetailStranger :data="row.item" />
                        <Delete @success="getData()" :id="row.item._id" />
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
import { LPService } from "../../api/licenseplate";
import UploadToCloud from './UploadToCloud.vue';
import Delete from "../../components/LicensePlate/Delete.vue";
import Create from "../../components/LicensePlate/Create.vue";
import Import from './import.vue';
import { dateFormat } from "../../function/day";
import Detail from '../../components/LicensePlate/Detail.vue';
import DetailStranger from "./Detail-stranger.vue";
import UpgradStranger from "./UpgradStranger.vue";
export default {
    setup() {
        const lp = new LPService();
        return {
            lp,
            dateFormat
        }
    },
    components: {
        UploadToCloud,
        Delete,
        Create,
        Import,
        Detail,
        DetailStranger,
        UpgradStranger
    },
    computed: {
        pageCount() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
    },
    data: () => ({
        page: 1,
        itemsPerPage: 10,
        totalItems: 0,
        data: [],
        search: '',
        headers: [
            { title: 'ลำดับ', align: 'center', sortable: false, key: 'index' },
            { title: 'เลขทะเบียน', align: 'center', sortable: false, key: 'licensePlate' },
            { title: 'จังหวัด', align: 'center', sortable: false, key: 'licensePlateProvince' },
            { title: 'ประเภทรถ', align: 'center', sortable: false, key: 'vehicleType' },
            { title: 'ประเภทสิทธิ์', align: 'center', sortable: false, key: 'category' },
            { title: 'วันที่เริ่ม', align: 'center', sortable: false, key: 'start' },
            { title: 'วันที่หมดอายุ', align: 'center', sortable: false, key: 'expire' },
            { title: 'เจ้าของ', align: 'center', sortable: false, key: 'guestName' },
            { title: 'อุปกรณ์', align: 'center', sortable: false, key: 'devices' },
            { title: 'การอนุมัติ', align: 'center', sortable: false, key: 'devices' },
            { title: 'สถานะ', align: 'center', sortable: false, key: 'status' },
            { title: 'จัดการ', align: 'center', sortable: false, key: 'manage' },
        ],
        filterStatus: null,
        Allstatus: [
            { value: 'member', label: 'พนักงาน' },
            { value: 'visitor', label: 'ผู้ติดต่อที่ลงทะเบียน' },
            { value: 'stranger', label: 'ผู้ติดต่อที่ไม่ได้ลงทะเบียน' }
        ],
    }),
    async mounted() {
        await this.getData();
    },
    methods: {
        async getData() {
            const licenseplate = this.search
            if (this.filterStatus) {
                await this.lp.getAll(this.$store.state.park, this.page, this.itemsPerPage, licenseplate, this.filterStatus).then(res => {
                    if (res.status === 'success') {
                        this.data = res.data;
                        this.totalItems = res.totalItem;
                        this.itemsPerPage = Number(res.itemPerPage);
                    }
                })
            } else {
                await this.lp.getAll(this.$store.state.park, this.page, this.itemsPerPage, licenseplate).then(res => {
                    if (res.status === 'success') {
                        this.data = res.data;
                        this.totalItems = res.totalItem;
                        this.itemsPerPage = Number(res.itemPerPage);
                    }
                })
            }
        },
        clearSearch() {
            this.search = '';
            this.filterStatus = null;
            this.getData();
        }
    }
}
</script>

<style scoped>
.swal-confirm-button {
    color: white !important;
    /* เปลี่ยนสีตัวอักษรของปุ่มยืนยัน */
}

.swal-cancel-button {
    color: white !important;
    /* เปลี่ยนสีตัวอักษรของปุ่มยกเลิก */
}
</style>