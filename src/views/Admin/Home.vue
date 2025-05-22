<template>
    <div class="pa-5">
        <v-breadcrumbs class="pt-0" color="white" :items="items"></v-breadcrumbs>
        <!-- //NOTE - หน้าแสดง DashBoard -->
        <DashBoard />
        <DashBoardLine />
        <v-card>
            <v-tabs align-tabs="start" v-model="tab" bg-color="primary">
                <v-tab value="history" style="font-weight: bold;font-size: 16px;">ประวัติการเข้า-ออก
                    (มียานพาหนะ)</v-tab>
                <!-- <v-tab value="people" style="font-weight: bold;font-size: 16px;">ประวัติการเข้า-ออก
                    (ไม่มียานพาหนะ)</v-tab> -->
            </v-tabs>

            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="history">
                        <HistoryLog />
                    </v-tabs-window-item>
                    <!-- <v-tabs-window-item value="people">
                        <HistoryLogPerson />
                    </v-tabs-window-item> -->
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import HistoryLog from '../../components/DashBoard/HistoryLog.vue';
import HistoryLogPerson from '../../components/DashBoard/HistoryLogPerson.vue';
import DashBoard from './DashBoard.vue';
import DashBoardLine from '../../components/DashBoard/DashBoard-line.vue';
export default {
    components: {
        HistoryLog,
        HistoryLogPerson,
        DashBoard,
        DashBoardLine
    },
    data: () => ({
        items: [
            'หน้าหลัก',
        ],
        tab: null,
    }),
}
</script>

<style scoped></style>