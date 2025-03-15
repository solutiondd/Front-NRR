<template>
    <div class="pa-5">
        <v-row>
            <v-col cols="12" sm="6" class="pb-3">
                <p style="font-size: 25px; font-weight: bold;">รายการผู้ใช้งาน</p>
            </v-col>
            <v-col cols="12" sm="6" class="pb-3 text-end">
                <Create @success="getData()" />
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-text-field prepend-inner-icon="mdi-magnify" density="comfortable" variant="outlined" label="ค้นหา"
                    v-model="search"></v-text-field>
            </v-col>
        </v-row>
    </div>
    <v-card variant="flat">
        <v-data-table fixed-header :headers="headers" :page="page" :items-per-page="itemsPerPage" hide-default-footer
            :items="data" class="elevation-1 no-border-table" :search="search" item-value="_id">
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
                        <p class="my-2">ชื่อ : {{ row.item.displayName }}</p>
                        <v-chip color="primary" class="mb-2" variant="outlined">{{ row.item.role }}</v-chip>
                    </td>
                    <td class="text-center">
                        <p class="">{{ row.item.username }}</p>
                    </td>
                    <td class="text-center" style="width: 200px;">
                        <Delete @success="getData()" :id="row.item._id" />
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
</template>

<script>
import { AccountService } from '../../api/Account';
import Create from './Create.vue';
import Delete from './Delete.vue';
export default {
    setup() {
        const account = new AccountService();
        return {
            account
        }
    },
    components: {
        Create,
        Delete,
    },
    computed: {
        pageCount() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
    },
    data: () => ({
        data: [],
        search: '',
        page: 1,
        itemsPerPage: 15,
        headers: [
            { title: 'ลำดับ', align: 'center', sortable: false, key: 'index' },
            { title: 'ชื่อ', align: 'center', sortable: false, key: 'displayName' },
            { title: 'ชื่อผู้ใช้งาน (username)', align: 'center', sortable: false, key: 'username' },
            { title: 'จัดการ', align: 'center', sortable: false, key: 'manage' },
        ],

    }),
    async mounted() {
        await this.getData();
    },
    methods: {
        async getData() {
            await this.account.getAll(this.$store.state.park).then(res => {
                if (res.message === 'ok') {
                    this.data = res.data
                }
            })
        }
    }
}
</script>

<style scoped></style>