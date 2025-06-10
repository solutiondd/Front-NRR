<template>
    <div class="pa-5">
        <v-breadcrumbs class="pt-0" color="white" :items="items"></v-breadcrumbs>
        <!-- //NOTE - หน้าแสดง DashBoard -->
        <v-card class="pa-5" width="100%">
            <v-row class="mt-1">
                <v-col cols="4" sm="2" lg="1" class="d-flex align-center justify-center pt-0">
                    <h3 class="d-flex align-center"><v-icon color="#FF4D00" icon="mdi-calendar-filter"
                            class="mr-2" />วันที่
                    </h3>
                </v-col>
                <v-col cols="9" sm="5" class="pt-0">
                    <v-menu ref="menu" v-model="dialogStart" :close-on-content-click="false"
                        v-model:propName="startDate" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ props }">
                            <v-text-field density="comfortable" variant="outlined" v-model="FormatStart"
                                prepend-inner-icon="mdi-calendar-today" v-bind="props" hide-details></v-text-field>
                        </template>
                        <v-date-picker color="primary" v-model="startDate"
                            @update:modelValue="dialogStart = false, startDate = $event"></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
        </v-card>
        <DashBoard :centerDate="startDate" />
        <DashBoardLine :centerDate="startDate" />
        <v-card>
            <v-tabs align-tabs="start" v-model="tab" bg-color="primary">
                <!-- //NOTE - หัวข้อ Tabs [ก่อนมีกล้อง Web-Cam] -->
                <v-tab value="history" style="font-weight: bold;font-size: 16px;">ประวัติการเข้า-ออก</v-tab>

                <!-- //NOTE - หัวข้อ Tabs [หลังมีกล้อง Web-Cam] -->
                <!-- <v-tab value="history" style="font-weight: bold;font-size: 16px;">ประวัติการเข้า-ออก
                    (มียานพาหนะ)</v-tab> -->
                <!-- <v-tab value="people" style="font-weight: bold;font-size: 16px;">ประวัติการเข้า-ออก
                    (ไม่มียานพาหนะ)</v-tab> -->
            </v-tabs>

            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="history">
                        <HistoryLog :centerDate="startDate" />
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
import { dateFormatValue } from '../../function/day';
export default {
    components: {
        HistoryLog,
        HistoryLogPerson,
        DashBoard,
        DashBoardLine
    },
    computed: {
        FormatStart() {
            return dateFormatValue(this.startDate)
        },
    },
    data: () => ({
        items: [
            'หน้าหลัก',
        ],
        tab: null,
        dialogStart: false,
        startDate: new Date(),
    }),
}
</script>

<style scoped></style>