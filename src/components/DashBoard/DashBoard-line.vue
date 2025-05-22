<template>
    <v-row class="pa-0 pb-5">
        <v-col cols="12">
            <v-card class="pa-5">
                <h3 class="pa-5 text-center">ข้อมูลขาเข้า รายชั่วโมง</h3>
                <LineChart :chart-data="chartData" :options="chartOptions" />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { HistorylogSer } from "../../api/Historylog";
import { dateFormatValue } from "../../function/day";

import { defineComponent } from "vue";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, LineController } from "chart.js";
import { LineChart } from "vue-chart-3";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, ChartDataLabels);

export default defineComponent({
    setup() {
        const his = new HistorylogSer();
        return {
            his,
            dateFormatValue
        }
    },
    components: { LineChart },
    data() {
        return {
            chartData: {
                labels: Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0")),
                datasets: [
                    {
                        label: "พนักงาน",
                        data: Array(24).fill(0),
                        borderColor: "#66BB6A",
                        backgroundColor: "#66BB6A",
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: "ผู้ติดต่อที่ลงทะเบียน",
                        data: Array(24).fill(0),
                        borderColor: "#F57F17",
                        backgroundColor: "#F57F17",
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: "ผู้ติดต่อที่ไม่ได้ลงทะเบียน",
                        data: Array(24).fill(0),
                        borderColor: "#E53935",
                        backgroundColor: "#E53935",
                        fill: false,
                        tension: 0.4
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            padding: 20,
                            font: {
                                size: this.getFontSize(),
                                family: 'K2D',
                            }
                        }
                    },
                    tooltip: {
                        titleFont: {
                            color: '#ffffff',
                            size: this.getFontSize(),
                            family: 'K2D',
                        },
                        bodyFont: {
                            color: '#ffffff',
                            size: this.getFontSize(),
                            family: 'K2D',
                        },
                        footerFont: {
                            color: '#ffffff',
                            size: this.getFontSize(),
                            family: 'K2D',
                        },
                    },
                    datalabels: {
                        // display: function (context) {
                        //     return context.dataset.data[context.dataIndex] !== 0;
                        // },
                        display: true,
                        color: "white",  // สีของตัวเลข
                        font: {
                            size: this.getFontSize(),
                            family: 'K2D',
                        },
                        anchor: "end",
                        align: "top",
                        formatter: function (value) {
                            // หากค่าเป็น 0 ก็จะไม่แสดงเลข 0
                            return value === 0 ? '' : value;
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'ชั่วโมง',
                            font: {
                                size: this.getFontSize(),
                                family: 'K2D',
                            },
                        },
                        ticks: {
                            font: {
                                size: this.getFontSize(),
                                family: 'K2D',
                            },
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'จำนวนรถ',
                            font: {
                                size: this.getFontSize(),
                                family: 'K2D',
                            },
                        },
                        min: 0,
                        ticks: {
                            callback: function (value) {
                                return value < 0 ? 0 : value;
                            },
                            font: {
                                size: this.getFontSize(),
                                family: 'K2D',
                            },
                        },
                        afterDataLimits(scale) {
                            scale.max = scale.max + 10;
                        }
                    },
                }
            },
            ReportData: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            const date = dateFormatValue(new Date())
            const parkId = this.$store.state.park;
            await this.his.getReportDay(date, parkId).then(res => {
                if (res.message === 'ok') {
                    this.ReportData = res.data
                    this.processData(this.ReportData)
                }
            })
        },
        processData(data) {
            // ตรวจสอบและอัพเดตข้อมูลสำหรับแต่ละประเภท (stranger, member, visitor)
            const datasets = [];

            const types = ['member', 'visitor', 'stranger',];  // ประเภทที่ต้องการแสดง
            const labels = ['พนักงาน', 'ผู้ติดต่อที่ลงทะเบียน', 'ผู้ติดต่อที่ไม่ได้ลงทะเบียน']; // เปลี่ยนชื่อ label

            types.forEach((type, index) => {
                const typeData = data.find(item => item.type === type);

                // สร้าง array สำหรับแต่ละชั่วโมง (01:00 - 24:00)
                const dataPoints = Array(24).fill(0);  // เตรียม array ที่มีค่าเป็น 0 ทั้งหมด

                // ถ้ามีข้อมูลจาก API, นำข้อมูลมาใส่ในแต่ละชั่วโมง
                if (typeData && typeData.shiftime) {
                    Object.keys(typeData.shiftime).forEach((hour) => {
                        const hourIndex = parseInt(hour.split(':')[0]) - 1;
                        if (hourIndex >= 0 && hourIndex < 24) {
                            dataPoints[hourIndex] = typeData.shiftime[hour];
                        }
                    });
                }

                datasets.push({
                    label: labels[index],
                    data: dataPoints,
                    borderColor: this.getBorderColor(labels[index]),
                    backgroundColor: this.getBackgroundColor(labels[index]),
                    fill: false,
                    tension: 0.4
                });
            });

            this.chartData.datasets = datasets;
        },

        //NOTE - กรณีที่หากไม่มีข้อมูลก็ไม่แสดงออกมาเลย
        // processData(data) {
        //     const datasets = [];
        //     const types = ['member', 'visitor', 'stranger'];  // ประเภทที่ต้องการแสดง
        //     const labels = ['พนักงาน', 'ผู้ติดต่อที่ลงทะเบียน', 'ผู้ติดต่อที่ไม่ได้ลงทะเบียน']; // เปลี่ยนชื่อ label

        //     types.forEach((type, index) => {
        //         const typeData = data.find(item => item.type === type);

        //         // สร้าง array สำหรับแต่ละชั่วโมง (01:00 - 24:00)
        //         const dataPoints = Array(24).fill(null);  // ใช้ null แทนค่า 0

        //         // ถ้ามีข้อมูลจาก API, นำข้อมูลมาใส่ในแต่ละชั่วโมง
        //         if (typeData && typeData.shiftime) {
        //             Object.keys(typeData.shiftime).forEach((hour) => {
        //                 const hourIndex = parseInt(hour.split(':')[0]) - 1;  // แปลง "01:00" เป็น index 0
        //                 if (hourIndex >= 0 && hourIndex < 24) {
        //                     dataPoints[hourIndex] = typeData.shiftime[hour];  // เติมข้อมูลลงในตำแหน่งที่ถูกต้อง
        //                 }
        //             });
        //         }

        //         // ตรวจสอบว่า dataPoints มีค่ามากกว่า 0 หรือไม่
        //         if (dataPoints.some(value => value > 0)) {
        //             datasets.push({
        //                 label: labels[index],  // เปลี่ยน label ที่นี่
        //                 data: dataPoints,
        //                 borderColor: this.getBorderColor(labels[index]), // เลือกสีตาม label
        //                 backgroundColor: this.getBackgroundColor(labels[index]),
        //                 fill: false,
        //                 tension: 0.4
        //             });
        //         }
        //     });

        //     // อัพเดต chartData ถ้ามีข้อมูลใน datasets
        //     this.chartData.datasets = datasets;

        //     // ถ้าไม่มีข้อมูลใน datasets (หมายถึงค่าทุกประเภทเป็น 0) จะไม่แสดงกราฟ
        //     if (datasets.length === 0) {
        //         this.chartData.labels = [];   // ลบ labels ออกเช่นกัน
        //     }
        // },
        getBorderColor(label) {
            switch (label) {
                case 'พนักงาน':
                    return "#66BB6A";
                case 'ผู้ติดต่อที่ลงทะเบียน':
                    return "#F57F17";
                case 'ผู้ติดต่อที่ไม่ได้ลงทะเบียน':
                    return "#E53935";
                default:
                    return "#000000"; // สีเริ่มต้น
            }
        },
        getBackgroundColor(label) {
            switch (label) {
                case 'พนักงาน':
                    return "#66BB6A";
                case 'ผู้ติดต่อที่ลงทะเบียน':
                    return "#F57F17";
                case 'ผู้ติดต่อที่ไม่ได้ลงทะเบียน':
                    return "#E53935";
                default:
                    return "#000000"; // สีเริ่มต้น
            }
        },
        getTotalShiftTime(data, type) {
            // หา element ที่เป็นประเภท 'member'
            const memberData = data.find(item => item.type === type);

            // ถ้ามีข้อมูลประเภท 'member' ให้ทำการรวมค่า shiftime
            if (memberData && memberData.shiftime) {
                // รวมค่าของ shiftime ทั้งหมด
                return Object.values(memberData.shiftime).reduce((sum, currentValue) => sum + currentValue, 0);
            }
            // ถ้าไม่มีข้อมูลประเภท 'member' จะคืนค่า 0
            return 0;
        },
        getFontSize() {
            const screenWidth = window.innerWidth;
            if (screenWidth < 600) {
                return 12;  // สำหรับหน้าจอเล็ก
            } else if (screenWidth < 1024) {
                return 15;  // สำหรับหน้าจอปานกลาง
            } else {
                return 17;  // สำหรับหน้าจอใหญ่
            }
        }
    },
});
</script>