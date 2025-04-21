<template>
    <div class="pa-5">
        <v-row>
            <v-col cols="12" sm="6" class="pb-3">
                <p class="d-flex align-center justify-start" style="font-size: 25px;font-weight: bold;">
                    รายการผู้ลงทะเบียน<v-icon icon="mdi-file-document-multiple" class="ml-2" size="small"></v-icon></p>
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-row class="d-flex align-center">
                    <v-col cols="12" sm="8" md="9" lg="10">
                        <v-text-field hide-details prepend-inner-icon="mdi-magnify" density="comfortable"
                            variant="outlined" label="ค้นหา" v-model="search"></v-text-field>
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
        <v-data-table fixed-header :headers="headers" :page="page" :items-per-page="itemsPerPage" :items="data"
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
                        {{ row.item }}
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
export default {
    setup() {
        const visitor = new VisitorService();
        const lp = new LPService();
        return {
            visitor,
            lp
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
    },
    data: () => ({
        page: 1,
        itemsPerPage: 10,
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
            { title: 'การอนุมัติ', align: 'center', sortable: false, key: 'devices' },
            { title: 'สถานะ', align: 'center', sortable: false, key: 'status' },
            { title: 'จัดการ', align: 'center', sortable: false, key: 'manage' },
        ],
    }),
    mounted() {

    },
    methods: {
        async getData() {
            const park = this.$store.state.park
            await this.visitor.getAll(park).then(res => {
                if (res.message === 'ok') {
                    this.data = res.data;
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