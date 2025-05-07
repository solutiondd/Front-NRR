<template>
    <div class="pa-5">
        <v-row>
            <v-col cols="12" sm="6" class="pb-3">
                <p class="d-flex align-center justify-start" style="font-size: 25px;font-weight: bold;">
                    รายการผู้ลงทะเบียน<v-icon icon="mdi-file-document-multiple" class="ml-2" size="small"></v-icon></p>
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-row class="d-flex align-center">
                    <v-col cols="12">
                        <v-text-field hide-details prepend-inner-icon="mdi-magnify" density="comfortable"
                            variant="outlined" label="ค้นหา (ทะเบียนรถ, ชื่อ-นามสกุล)" v-model="search"></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
    <v-card variant="flat">
        <v-data-table fixed-header :headers="headers" :page="page" :items-per-page="itemsPerPage" :items="filteredData"
            class="elevation-1" item-value="_id">
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
                    <td class="text-center" style="min-width: 120px;">
                        <p v-if="row.item.vehicleType === 'CAR'">รถยนต์ (CAR)</p>
                        <p v-else-if="row.item.vehicleType === 'TRUCK'">รถบรรทุก (TRUCK)</p>
                        <p v-else>รถมอเตอร์ไซค์ (MOTORCYCLE)</p>
                    </td>
                    <td class="text-center" style="min-width: 120px;">
                        {{ row.item.category }}
                    </td>
                    <td class="text-center" style="min-width: 180px;">
                        {{ row.item.guestName }}
                    </td>
                    <td class="text-center" style="min-width: 120px;">
                        {{ row.item.start }}
                    </td>
                    <td class="text-center" style="min-width: 120px;">
                        {{ row.item.expire }}
                    </td>
                    <td class="text-center">
                        <Approve :Id="row.item._id" :lpdata="row.item" @success="getData()" />
                    </td>
                    <td class="text-center">
                        <v-chip v-if="!row.item.cate" color="#689F38">พนักงาน</v-chip>
                        <v-chip v-if="row.item.cate === 'visitor'" color="#F57F17">ผู้ติดต่อที่ลงทะเบียน</v-chip>
                        <v-chip v-if="row.item.cate === 'stranger'" color="#E53935">ผู้ติดต่อที่ไม่ได้ลงทะเบียน</v-chip>
                    </td>
                    <td style="min-width: 120px;">
                        <Detail :data="row.item" />
                        <Delete :id="row.item._id" @success="getData()" />
                    </td>
                </tr>
            </template>
            <template v-slot:no-data>
                <v-alert :value="true" color="#212121">
                    ไม่มีข้อมูล
                </v-alert>
            </template>
            <template v-slot:bottom>
                <div class="text-center pt-2">
                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
                </div>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { VisitorService } from '../../api/Visitor';
import { LPService } from '../../api/licenseplate';
import Detail from '../LicensePlate/Detail.vue';
import Approve from './Approve.vue';
import Delete from './Delete.vue';
export default {
    setup() {
        const visitor = new VisitorService();
        const lp = new LPService();
        return {
            visitor,
            lp
        }
    },
    components: {
        Approve,
        Detail,
        Delete
    },
    computed: {
        pageCount() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
        filteredData() {
            if (!this.search) return this.data;

            const keyword = this.search.toLowerCase();
            return this.data.filter(item =>
                (item.licensePlate || '').toLowerCase().includes(keyword) ||
                (item.vehicleType || '').toLowerCase().includes(keyword) ||
                (item.guestName || '').toLowerCase().includes(keyword) ||
                (item.start || '').toLowerCase().includes(keyword) ||
                (item.expire || '').toLowerCase().includes(keyword)
            );
        }
    },
    data: () => ({
        page: 1,
        itemsPerPage: 10,
        data: [],
        search: '',
        headers: [
            { title: 'ลำดับ', align: 'center', sortable: false, key: 'index' },
            { title: 'เลขทะเบียน', align: 'center', sortable: false, key: 'licensePlate' },
            { title: 'ประเภทรถ', align: 'center', sortable: false, key: 'vehicleType' },
            { title: 'ประเภทสิทธิ์', align: 'center', sortable: false, key: 'category' },
            { title: 'ชื่อ-นามสกุล', align: 'center', sortable: false, key: 'guestName' },
            { title: 'วันที่เริ่ม', align: 'center', sortable: false, key: 'start' },
            { title: 'วันที่หมดอายุ', align: 'center', sortable: false, key: 'expire' },
            { title: 'การอนุมัติ', align: 'center', sortable: false, key: 'devices' },
            { title: 'สถานะ', align: 'center', sortable: false, key: 'status' },
            { title: 'จัดการ', align: 'center', sortable: false, key: 'manage' },
        ],
    }),
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            const park = this.$store.state.park
            await this.visitor.getAll(park).then(res => {
                if (res.message === 'ok') {
                    this.data = res.data;
                    this.data.reverse();
                    console.log(this.data);
                }
            })
        },
        clearSearch() {
            this.search = '';
            this.getData();
        }
    }
}
</script>

<style></style>