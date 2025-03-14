<template>
    <div class="pa-5">
        <v-row>
            <v-col cols="12" class="pb-3">
                <p style="font-size: 25px; font-weight: bold;">รายการประวัติการเข้า-ออก</p>
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-text-field prepend-inner-icon="mdi-magnify" density="comfortable" variant="outlined" label="ค้นหา"
                    v-model="search"></v-text-field>
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
                        <img class="zoom" :src="baseUrl + row.item.entry.image" alt="image"
                            style="width: 250px; height: auto;">
                    </td>
                    <td class="text-center">
                        {{ row.item.license }}
                    </td>
                    <td class="text-center">
                        {{ formatDateTime(row.item.entry.time) }}
                    </td>
                    <td class="text-center">
                        {{ row.item.entry.msg }}
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { HistorylogSer } from "../../api/Historylog";
export default {
    setup() {
        const his = new HistorylogSer();
        const baseUrl = import.meta.env.VITE_APP_BASE_URL;
        return {
            his,
            baseUrl
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.totalItems / this.itemsPerPage);;
        },
    },
    data: () => ({
        Url: '',
        page: 1,
        itemsPerPage: 5,
        totalItems: 0,
        imagePreview: null,
        data: [],
        search: '',
        headers: [
            { title: 'ลำดับ', align: 'center', sortable: false, key: 'index' },
            { title: 'รูป', align: 'center', sortable: false, key: 'entry.image' },
            { title: 'เลขทะเบียน', align: 'center', sortable: false, key: 'license' },
            { title: 'วันที่/เวลา', align: 'center', sortable: false, key: 'entry.time' },
            { title: 'รายละเอียด', align: 'center', sortable: false, key: 'entry.msg' },
        ],
    }),
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            await this.his.getAll(this.$store.state.park, this.page, this.itemsPerPage).then(res => {
                if (res.message === 'ok') {
                    this.data = res.data;
                    this.totalItems = this.data.length;
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
                hour12: false
            }).replace(",", "");
        }
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