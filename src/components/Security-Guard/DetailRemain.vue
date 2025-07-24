<template>
    <v-btn icon="" size="small" color="primary"><v-icon>mdi-magnify</v-icon>
        <v-dialog v-model="dialog" activator="parent" width="1200px">
            <div>
                <v-toolbar color="primary" density="comfortable">
                    <v-toolbar-title>
                        <p>รายละเอียดการเข้า-ออก</p>
                    </v-toolbar-title>
                    <v-btn icon="mdi-close" size="small" @click="dialog = false"></v-btn>
                </v-toolbar>
            </div>
            <v-card style="background-color: #FAFAFA;">
                <div class="pa-3">
                    <v-card variant="flat" style="background-color: #FAFAFA;">
                        <v-data-table :page="page" :items-per-page="itemsPerPage" :headers="headers" :items="detailData"
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
                                    <td>
                                        {{ formatDateTime(row.item.time) }}
                                    </td>
                                    <td>
                                        {{ formatDateTime(row.item.checkoutTimeStamp) }}
                                    </td>
                                    <td>
                                        <v-chip color="red">{{ row.item.msg }}</v-chip>
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
    </v-btn>
</template>

<script>
export default {
    props: {
        data: Array,
    },
    setup() {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL;
        return {
            baseUrl
        };
    },
    watch: {
        data: {
            immediate: true,
            handler(newVal) {
                this.detailData = newVal;
            }
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
    },
    data: () => ({
        dialog: false,
        headers: [
            { title: 'ลำดับ', align: 'center', sortable: false, key: 'index' },
            { title: 'ภาพป้ายทะเบียน 1', align: 'center', sortable: false, key: 'platesPhoto' },
            { title: 'ภาพป้ายทะเบียน 2', align: 'center', sortable: false, key: 'platesPhoto2' },
            { title: 'หมายเลขทะเบียน', align: 'center', sortable: false, key: 'license' },
            { title: 'วันที่/เวลา (ขาเข้า)', align: 'center', sortable: false, key: 'entry.time' },
            { title: 'วันที่/เวลา (ขาออก)', align: 'center', sortable: false, key: 'entry.checkoutTimeStamp' },
            { title: 'รายละเอียด', align: 'center', sortable: false, key: 'entry.msg' },
        ],
        page: 1,
        itemsPerPage: 5,
        detailData: [],
    }),
    mounted() {

    },
    methods: {
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

<style scoped>
.zoom {
    transition: transform .2s;
}

.zoom:hover {
    transform: scale(1.3);
    z-index: 1;
}
</style>