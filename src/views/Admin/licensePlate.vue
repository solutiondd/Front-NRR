<template>
    <div class="pa-0">
        <v-breadcrumbs color="white" :items="items"></v-breadcrumbs>
        <v-card>
            <v-tabs v-model="tab" bg-color="primary">
                <v-tab value="LicensePlate" style="font-weight: bold;">ทะเบียนรถ</v-tab>
            </v-tabs>

            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="LicensePlate">
                        <Table />
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Table from "../../components/LicensePlate/Table.vue";
export default {
    components: {
        Table
    },
    data: () => ({
        items: [
            'หน้าหลัก',
            'ทะเบียนรถ',
        ],
        tab: 'LicensePlate',
    })
}
</script>

<style></style>