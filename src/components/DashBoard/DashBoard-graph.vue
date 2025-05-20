<template>
    <v-col cols="12" class="mb-8 pa-0">
        <v-card class="pa-5" width="100%">
            <h3 class="d-flex align-center"><v-icon color="#FF4D00" icon="mdi-calendar-filter" class="mr-2" />ตัวกรอง
            </h3>
            <v-row class="mt-2">
                <v-col cols="12" sm="5">
                    <p class="pb-2">วันทื่เริ่มต้น</p>
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
                <v-col cols="12" sm="5">
                    <p class="pb-2">วันที่สิ้นสุด</p>
                    <v-menu ref="menu" v-model="dialogEnd" :close-on-content-click="false" v-model:propName="endDate"
                        transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ props }">
                            <v-text-field v-model="FormatEnd" density="comfortable" variant="outlined"
                                prepend-inner-icon="mdi-calendar" v-bind="props" hide-details></v-text-field>
                        </template>
                        <v-date-picker color="primary" v-model="endDate"
                            @update:modelValue="dialogEnd = false, endDate = $event"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="2" class="d-flex align-end">
                    <v-btn color="primary" height="48px" icon="mdi-magnify" @click="getData"></v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-col>
    <v-row class="pa-0">
        <v-col class="pt-0" cols="12" sm="12" md="6">
            <v-card class="pa-5 " width="100%">
                <h3 class="pb-5">ข้อมูลกราฟ วันนี้ {{ dateFormatDayandTime(new Date()) }}</h3>
                <div class="chart-container mx-auto">
                    <DoughnutChart :chart-data="chartData" :options="chartOptions" />
                </div>
            </v-card>
        </v-col>
        <v-col class="pt-0" cols="12" sm="12" md="6">
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
                        <v-card color="#66BB6A">
                            <v-row class="pa-3">
                                <v-col cols="8">
                                    <p style="font-size:18px;">ลงทะเบียนเวลาเข้า</p>
                                    <p style="font-size:22px; font-weight: bold;">{{ dataDashBoard.registered }} คัน</p>
                                </v-col>
                                <v-col cols="4" class="d-flex align-end justify-end">
                                    <v-btn variant="text" @click="openDialog('Registered')">คลิก</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card color="#E53935">
                            <v-row class="pa-3">
                                <v-col cols="9">
                                    <p style="font-size:18px;">ลงทะเบียนเวลาออก</p>
                                    <p style="font-size:22px; font-weight: bold;">{{ dataDashBoard.exited }} คัน</p>
                                </v-col>
                                <v-col cols="3" class="d-flex align-end justify-end">
                                    <v-btn variant="text" @click="openDialog('CheckOut')">คลิก</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card class="pa-3" color="#757575">
                            <v-row>
                                <v-col cols="9">
                                    <p style="font-size:18px;">ไม่ได้ลงทะเบียนเวลาเข้า</p>
                                    <p style="font-size:22px; font-weight: bold;">{{ dataDashBoard.notRegistered }} คัน
                                    </p>
                                </v-col>
                                <v-col cols="3" class="d-flex align-end justify-end">
                                    <v-btn variant="text" @click="openDialog('NotRegister')">คลิก</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card color="primary">
                            <v-row class="pa-3">
                                <v-col cols="9">
                                    <p style="font-size: 18px;">คงเหลือในพื้นที่</p>
                                    <p style="font-size: 22px; font-weight: bold;"> {{ dataDashBoard.registered -
                                        dataDashBoard.exited }} คัน</p>
                                </v-col>
                                <v-col cols="3" class="d-flex align-end justify-end">
                                    <v-btn variant="text" @click="openDialog('Remaining')">คลิก</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <!-- <ReportVisitor v-model="dialog" :type="selectedType" /> -->
                <ReportVisitorGroupByLP :DateStart="startDate" :DateEnd="endDate" v-model="dialog"
                    :type="selectedType" />
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
import ReportVisitor from './ReportVisitor.vue';
import ReportVisitorGroupByLP from './ReportVisitorGroupByLP.vue';

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
        ReportVisitor,
        ReportVisitorGroupByLP
    },
    computed: {
        FormatStart() {
            return dateFormatValue(this.startDate)
        },
        FormatEnd() {
            return dateFormatValue(this.endDate)
        }
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
            endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            dialog: false,
            selectedType: '',
            dialogStart: false,
            dialogEnd: false,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            const start = datetimeFormatLimit(this.startDate);
            const end = datetimeFormatLimit(this.endDate);
            const parkId = this.$store.state.park
            await this.his.getDashBoardGroup(start, end, parkId).then(res => {
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
        getFontSize() {
            const screenWidth = window.innerWidth;
            if (screenWidth < 600) {
                return 12;  // สำหรับหน้าจอเล็ก
            } else if (screenWidth < 1024) {
                return 16;  // สำหรับหน้าจอปานกลาง
            } else {
                return 18;  // สำหรับหน้าจอใหญ่
            }
        },
        openDialog(type) {
            this.selectedType = type;
            this.dialog = true;
        },
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
