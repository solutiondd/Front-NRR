<template>
    <div class="pa-5">
        <v-row>
            <v-col cols="12" sm="6" class="pb-3">
                <p style="font-size: 25px; font-weight: bold;">รายการทะเบียนรถ</p>
            </v-col>
            <v-col cols="7" sm="6" class="pb-3 text-end">
                <Create @success="getData()" />
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-text-field prepend-inner-icon="mdi-magnify" density="comfortable" variant="outlined" label="ค้นหา"
                    v-model="search"></v-text-field>
            </v-col>
        </v-row>
    </div>
    <v-card variant="flat">
        <v-data-table fixed-header :headers="headers" :page="page" :items-per-page="itemsPerPage"
            :server-items-length="totalItems" :items="data" class="elevation-1 no-border-table" :search="search"
            item-value="_id">
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
                        {{ row.index + 1 }}
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
                        {{ dateFormat(row.item.start) }}
                    </td>
                    <td class="text-center">
                        {{ dateFormat(row.item.expire) }}
                    </td>
                    <td class="text-center">
                        {{ row.item.guestName }}
                    </td>
                    <td class="text-center">
                        <div v-for="device in row.item.devices" :key="device._id">
                            <v-chip color="primary">
                                <p>{{ device.name }}</p>
                            </v-chip>
                            <v-chip color="teal-lighten-1">
                                <p>{{ device.gate }}</p>
                            </v-chip>
                        </div>
                    </td>
                    <td class="text-center">
                        <UploadToCloud @success="getData()" :id="row.item._id" :data="row.item" />

                    </td>
                    <td class="text-center">
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
import { dateFormat } from "../../function/day";
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
    },
    computed: {
        pageCount() {
            return Math.ceil(this.totalItems / this.itemsPerPage);;
        },
    },
    data: () => ({
        page: 1,             // หน้าปัจจุบัน
        itemsPerPage: 10,    // ใช้ค่าเริ่มต้นจาก API
        totalItems: 0,
        data: [],
        search: '',
        headers: [
            { title: 'ลำดับ', align: 'center', sortable: false, key: 'index' },
            { title: 'เลขทะเบียน', align: 'center', sortable: false, key: 'licensePlate' },
            { title: 'จังหวัด', align: 'center', sortable: false, key: 'licensePlateProvince' },
            { title: 'ประเภทรถ', align: 'center', sortable: false, key: 'vehicleType' },
            { title: 'วันที่เริ่ม', align: 'center', sortable: false, key: 'start' },
            { title: 'วันที่หมดอายุ', align: 'center', sortable: false, key: 'expire' },
            { title: 'เจ้าของ', align: 'center', sortable: false, key: 'guestName' },
            { title: 'อุปกรณ์', align: 'center', sortable: false, key: 'devices' },
            { title: 'การอนุมัติ / สถานะ', align: 'center', sortable: false, key: 'devices' },
            { title: 'จัดการ', align: 'center', sortable: false, key: 'manage' },
        ],
    }),
    async mounted() {
        await this.getData();
    },
    methods: {
        async getData() {
            await this.lp.getAll(this.$store.state.park, this.page, this.itemsPerPage).then(res => {
                if (res.status === 'success') {
                    this.data = res.data;
                    this.totalItems = res.totalItem;
                    this.itemsPerPage = Number(res.itemPerPage);
                }
            })
        },
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