<template>
    <v-row>
        <v-col cols="12" sm="12" md="6">
            <v-card class="pa-5">
                <h3 class="pb-5">ข้อมูลกราฟ วันนี้</h3>
                <div class="chart-container">
                    <DoughnutChart :chart-data="chartData" :chart-options="chartOptions" />
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6">
            <v-card class="pa-5">
                <h3 class="pb-5">ข้อมูลตัวเลข วันนี้</h3>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#66BB6A">
                            <p style="font-size: 18px;">รถพนักงาน</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.member }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#42A5F5">
                            <p style="font-size: 18px;">รถผู้ติดต่อที่ลงทะเบียน</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.visitor }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#78909C">
                            <p style="font-size: 18px;">รถผู้ติดต่อที่ไม่ได้ลงทะเบียน</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.stranger }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#FB8C00">
                            <p style="font-size: 18px;">รวมทั้งหมด</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.member +
                                dataDashBoard.visitor + dataDashBoard.stranger
                                }} คัน</p>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
            <v-card class="mt-5 pa-5">
                <h3 class="pb-5">ข้อมูลทั้งหมด</h3>
                <v-row>
                    <v-col cols="12" sm="6" color="primary">
                        <v-card class="pa-3" color="#66BB6A">
                            <p style="font-size: 18px;">รถพนักงานที่ลงทะเบียน (คัน)</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.totalMember }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#42A5F5">
                            <p style="font-size: 18px;">รถผู้มาติดต่อที่ลงทะเบียน (คัน)</p>
                            <p style="font-size: 22px; font-weight: bold;">{{ dataDashBoard.totalVisitor }} คัน
                            </p>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { HistorylogSer } from '../../api/Historylog';
import { dateFormatValue, datetimeFormat, dateFormatWithFixedTime } from "../../function/day";
import { useTheme } from 'vuetify';
import { DoughnutChart } from "vue-chart-3";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, DoughnutController } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, ArcElement, DoughnutController, ChartDataLabels);

// กำหนดสีฟอนต์ให้เป็นสีขาวสำหรับทุก chart โดยใช้ defaults
ChartJS.defaults.color = '#ffffff';

export default {
    setup() {
        const theme = useTheme();
        const his = new HistorylogSer();
        return {
            dateFormatValue,
            datetimeFormat,
            dateFormatWithFixedTime,
            his,
            theme
        }
    },
    components: {
        DoughnutChart,
    },
    data() {
        return {
            chartData: {
                labels: ["รถพนักงาน", "รถผู้ติดต่อที่ลงทะเบียน", "รถผู้ติดต่อที่ไม่ได้ลงทะเบียน"],
                datasets: [
                    {
                        data: [0, 0, 0],
                        backgroundColor: ["#66BB6A", "#42A5F5", "#78909C"],
                    },
                ],
            },
            dataDashBoard: [],
            startDate: new Date(),
            endDate: new Date(),
        };
    },
    computed: {
        chartOptions() {
            const isDark = this.theme.global.current.value.dark; // เช็คว่าธีมเป็น dark หรือไม่
            return {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff', // กำหนดสีให้เป็นขาวเสมอ
                        },
                    },
                    tooltip: {
                        titleFont: {
                            color: '#ffffff', // สีฟอนต์ของ tooltip
                        },
                        bodyFont: {
                            color: '#ffffff', // สีฟอนต์ของ body ใน tooltip
                        },
                        footerFont: {
                            color: '#ffffff', // สีฟอนต์ของ footer ใน tooltip
                        },
                    },
                    datalabels: {
                        color: '#ffffff', // กำหนดสีของ datalabels เป็นสีขาว
                        font: {
                            weight: "bold",
                            size: 14,
                        },
                        anchor: "center",
                        align: "center",
                    },
                },
                // เพิ่ม cutout เพื่อให้เป็น Donut Chart
                cutout: '70%',
            };
        },
    },
    mounted() {
        this.startDate = this.addDays(this.startDate, -1)
        this.getData();
    },
    methods: {
        async getData() {
            const start = dateFormatWithFixedTime(this.startDate);
            const end = dateFormatWithFixedTime(this.endDate);
            const parkId = this.$store.state.park
            await this.his.getDashBoard(start, end, parkId).then(res => {
                if (res.message === 'ok') {
                    this.dataDashBoard = res.data
                    this.chartData = {
                        labels: ["รถพนักงาน", "รถผู้ติดต่อที่ลงทะเบียน", "รถผู้ติดต่อที่ไม่ได้ลงทะเบียน"],
                        datasets: [
                            {
                                data: [
                                    this.dataDashBoard.member || 0,  // รถพนักงาน
                                    this.dataDashBoard.visitor || 0, // รถผู้ติดต่อที่ลงทะเบียน
                                    this.dataDashBoard.stranger || 0, // รถผู้ติดต่อที่ไม่ได้ลงทะเบียน
                                ],
                                backgroundColor: ["#66BB6A", "#42A5F5", "#78909C"],
                            },
                        ],
                    };
                }
            })

        },
        addDays(date, days) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        },
    },
};
</script>

<style>
.chart-container {
    width: 100%;
    height: 385px;
}

/* เอาสีฟอนต์ของ canvas เป็นสีขาว */
canvas {
    color: white !important;
}
</style>
