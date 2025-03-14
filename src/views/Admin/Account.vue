<template>
    <div class="pa-0">
        <v-breadcrumbs color="white" :items="items"></v-breadcrumbs>
        <v-card>
            <v-tabs v-model="tab" bg-color="primary">
                <v-tab value="Account" style="font-weight: bold;">ข้อมูลผู้ใช้งาน</v-tab>
            </v-tabs>

            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="Account">
                        <Table />
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Table from "../../components/Account/Table.vue";
export default {
    components: {
        Table
    },
    data: () => ({
        items: [
            'หน้าหลัก',
            'ข้อมูลผู้ใช้งาน',
        ],
        tab: 'Account',
    })
}
</script>

<style scoped></style>