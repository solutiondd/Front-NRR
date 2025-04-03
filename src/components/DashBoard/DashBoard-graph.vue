<template>
    <v-row class="pa-0">

        <v-col cols="12" sm="12" md="6">
            <v-card class="pa-5 " width="100%">
                <h3 class="pb-5">ข้อมูลกราฟ วันนี้ {{ dateFormatDayandTime(new Date()) }}</h3>
                <div class="chart-container mx-auto">
                    <DoughnutChart :chart-data="chartData" :options="chartOptions" />
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6">
            <v-card class="pa-5" width="100%">
                <h3 class="pb-5">ข้อมูลตัวเลข วันนี้ {{ dateFormatDayandTime(new Date()) }}</h3>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#66BB6A">
                            <p style="font-size: 18px;">รถพนักงาน</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.member }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#F57F17">
                            <p style=" font-size: 18px;">รถผู้ติดต่อที่ลงทะเบียน</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.visitor }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#E53935">
                            <p style="font-size: 18px;">รถผู้ติดต่อที่ไม่ได้ลงทะเบียน</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.stranger }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="primary">
                            <p style="font-size: 18px;">รวมทั้งหมด</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.member +
                                dataDashBoard.visitor + dataDashBoard.stranger
                                }} คัน</p>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
            <v-card class="pa-5 mt-5" width="100%">
                <h3 class="pb-5">ข้อมูลรถผู้ติดต่อที่ไม่ได้ลงทะเบียน</h3>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#66BB6A">
                            <p style="font-size:18px;">ลงทะเบียนเวลาเข้า</p>
                            <p style="font-size:22px; font-weight: bold;">{{ dataDashBoard.registered }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#E53935">
                            <p style="font-size:18px;">ลงทะเบียนเวลาออก</p>
                            <p style="font-size:22px; font-weight: bold;">{{ dataDashBoard.exited }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#757575">
                            <p style="font-size:18px;">ไม่ได้ลงทะเบียนเวลาเข้า</p>
                            <p style="font-size:22px; font-weight: bold;">{{ dataDashBoard.notRegistered }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="primary">
                            <p style="font-size: 18px;">คงเหลือในพื้นที่</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.registered -
                                dataDashBoard.exited }} คัน</p>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>

            <!-- <v-card class="pa-5 mt-5" width="100%">
                <h3 class="pb-5">ข้อมูลทั้งหมด</h3>
                <v-row>
                    <v-col cols="12" sm="6" color="primary">
                        <v-card class="pa-3" color="#66BB6A">
                            <p style="font-size: 18px;">รถพนักงานที่ลงทะเบียน (คัน)</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.totalMember }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#F57F17">
                            <p style="font-size: 18px;">รถผู้มาติดต่อที่ลงทะเบียน (คัน)</p>
                            <p style="font-size: 22px; font-weight: bold;">{{ dataDashBoard.totalVisitor }} คัน
                            </p>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card> -->
        </v-col>
        <v-col cols="12">
            <v-card class="pa-5" width="100%">
                <h3 class="pb-5">ข้อมูลทั้งหมด</h3>
                <v-row>
                    <v-col cols="12" sm="6" color="primary">
                        <v-card class="pa-3" color="#66BB6A">
                            <p style="font-size: 18px;">รถพนักงานที่ลงทะเบียน (คัน)</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.totalMember }} คัน</p>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#F57F17">
                            <p style="font-size: 18px;">รถผู้มาติดต่อที่ลงทะเบียน (คัน)</p>
                            <p style="font-size: 22px; font-weight: bold;">{{ dataDashBoard.totalVisitor }} คัน
                            </p>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>

            <!-- <v-card class="pa-5" width="100%">
                <h3 class="pb-5">ข้อมูลรถผู้ติดต่อคงเหลือในพื้นที่</h3>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-card class="pa-3" color="#757575">
                            <p style="font-size: 18px;">รถผู้ติดต่อคงเหลือในพื้นที่ (คัน)</p>
                            <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.currentVisitor }} คัน</p>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card> -->
        </v-col>
    </v-row>
</template>

<script>
import { HistorylogSer } from '../../api/Historylog';
import { dateFormatValue, datetimeFormat, dateFormatWithFixedTime, datetimeFormatLimit, dateFormatDayandTime } from "../../function/day";
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
            theme,
            datetimeFormatLimit,
            dateFormatDayandTime
        }
    },
    components: {
        DoughnutChart,
    },
    data() {
        return {
            chartData: {
                labels: ["รถพนักงาน", "รถผู้ติดต่อที่ลงทะเบียน", "รถผู้ติดต่อที่ไม่ได้ลงทะเบียน"],
                // datasets: [
                //     {
                //         data: [0, 0, 0],
                //         backgroundColor: ["#66BB6A", "#F57F17", "#E53935"],
                //     },
                // ],
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff', // กำหนดสีให้เป็นขาวเสมอ
                            font: {
                                size: this.getFontSize(),
                                family: 'K2D',
                            }
                        },

                    },
                    title: {
                        font: {
                            size: this.getFontSize()
                        }
                    },
                    tooltip: {
                        titleFont: {
                            color: '#ffffff', // สีฟอนต์ของ tooltip
                            size: this.getFontSize(),
                            family: 'K2D',
                        },
                        bodyFont: {
                            color: '#ffffff',
                            size: this.getFontSize(),
                            family: 'K2D',
                            // สีฟอนต์ของ body ใน tooltip
                        },
                        footerFont: {
                            color: '#ffffff', // สีฟอนต์ของ footer ใน tooltip
                            size: this.getFontSize(),
                            family: 'K2D',
                        },
                    },
                    datalabels: {
                        color: '#ffffff', // กำหนดสีของ datalabels เป็นสีขาว
                        font: {
                            size: this.getFontSize(),
                            family: 'K2D',
                            weight: 'bold',
                        },
                        anchor: "center",
                        align: "center",
                        formatter: (value, context) => {
                            // หากค่าคือ 0 ก็จะไม่แสดงค่า
                            if (value === 0) {
                                return '';
                            }
                            return value;
                        },
                    },
                    cutout: '10%',
                },
            },
            dataDashBoard: [],
            startDate: new Date(),
            endDate: new Date(),
        };
    },
    // computed: {
    //     chartOptions() {
    //         const isDark = this.theme.global.current.value.dark; // เช็คว่าธีมเป็น dark หรือไม่
    //         return {
    //             responsive: true,
    //             maintainAspectRatio: false,
    //             plugins: {
    //                 legend: {
    //                     labels: {
    //                         color: '#ffffff', // กำหนดสีให้เป็นขาวเสมอ
    //                     },
    //                 },
    //                 tooltip: {
    //                     titleFont: {
    //                         color: '#ffffff', // สีฟอนต์ของ tooltip
    //                     },
    //                     bodyFont: {
    //                         color: '#ffffff', // สีฟอนต์ของ body ใน tooltip
    //                     },
    //                     footerFont: {
    //                         color: '#ffffff', // สีฟอนต์ของ footer ใน tooltip
    //                     },
    //                 },
    //                 datalabels: {
    //                     color: '#ffffff', // กำหนดสีของ datalabels เป็นสีขาว
    //                     font: {
    //                         weight: "bold",
    //                         size: 16,
    //                     },
    //                     anchor: "center",
    //                     align: "center",
    //                 },
    //             },
    //             // เพิ่ม cutout เพื่อให้เป็น Donut Chart
    //             cutout: '70%',
    //         };
    //     },
    // },
    mounted() {
        this.endDate = this.addDays(this.startDate, +1)
        this.getData();
    },
    methods: {
        async getData() {
            const start = datetimeFormatLimit(this.startDate);
            const end = datetimeFormatLimit(this.endDate);
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
                                backgroundColor: ["#66BB6A", "#F57F17", "#E53935"],
                            },
                        ],
                    };

                    //NOTE - กรณีที่หากไม่มีข้อมูลก็ไม่แสดงออกมาเลย
                    // const member = this.dataDashBoard.member || 0;
                    // const visitor = this.dataDashBoard.visitor || 0;
                    // const stranger = this.dataDashBoard.stranger || 0;

                    // // จับคู่ข้อมูลและสีที่คงที่
                    // const data = [
                    //     { label: "รถพนักงาน", value: member, color: "#66BB6A" },  // สีเขียว
                    //     { label: "รถผู้ติดต่อที่ลงทะเบียน", value: visitor, color: "#F57F17" },  // สีส้ม
                    //     { label: "รถผู้ติดต่อที่ไม่ได้ลงทะเบียน", value: stranger, color: "#E53935" }  // สีแดง
                    // ];

                    // // กรองข้อมูลที่มีค่าเป็น 0 ออก
                    // const filteredData = data.filter(item => item.value !== 0);

                    // // กำหนดข้อมูลที่ต้องการแสดงในกราฟ
                    // this.chartData = {
                    //     labels: filteredData.map(item => item.label),
                    //     datasets: [
                    //         {
                    //             data: filteredData.map(item => item.value),
                    //             backgroundColor: filteredData.map(item => item.color),
                    //         },
                    //     ],
                    // };
                }
            })

        },
        addDays(date, days) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        },
        getFontSize() {
            const screenWidth = window.innerWidth;
            if (screenWidth < 600) {
                return 12;  // สำหรับหน้าจอเล็ก
            } else if (screenWidth < 1024) {
                return 16;  // สำหรับหน้าจอปานกลาง
            } else {
                return 18;  // สำหรับหน้าจอใหญ่
            }
        }
    },
};
</script>

<style>
.chart-container {
    width: 100%;
    height: 490px;
    justify-content: center;
    align-content: center;
}

/* เอาสีฟอนต์ของ canvas เป็นสีขาว */
canvas {
    color: white !important;
}
</style>
