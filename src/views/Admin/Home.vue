<template>
    <div class="pa-0">
        <v-breadcrumbs color="white" :items="items"></v-breadcrumbs>
        <!-- //NOTE - หน้าแสดง DashBoard -->
        <DashBoard />
        <v-card>
            <v-tabs v-model="tab" bg-color="primary">
                <v-tab value="history" style="font-weight: bold;">ประวัติการเข้า-ออก</v-tab>
            </v-tabs>

            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="history">
                        <HistoryLog />
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import HistoryLog from '../../components/DashBoard/HistoryLog.vue';
import DashBoard from './DashBoard.vue';
export default {
    components: {
        HistoryLog,
        DashBoard
    },
    data: () => ({
        items: [
            'หน้าหลัก',
        ],
        tab: 'history'
    }),
}
</script>

<style scoped></style>