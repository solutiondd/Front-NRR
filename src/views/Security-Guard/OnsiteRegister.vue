<!-- <template>
    <div>
        <v-card variant="flat" class="pb-5">
            <v-row>
                <v-col cols="2" class="pl-7 pt-5 pr-4">
                    <p style="font-size: 1.4rem;" class="pb-2">รายการล่าสุด</p>
                    <v-col class="pa-0">
                        <v-btn rounded="lg" class="pa-3" width="100%" height="100%" variant="flat" color="#424242"
                            :ripple="false" elevation="0">
                            <v-row>
                                <v-col cols="12" class="pb-0">
                                    <img :src="baseUrl + data.platesPhoto2" alt="img"
                                        style="width:100%; max-width: 19rem;border-radius: 5px;">
                                </v-col>
                                <v-col cols="12" class="text-center">
                                    <p style="font-size: 16px;">ป้ายทะเบียน : {{ licensePlate.License }}</p>
                                    <p style="font-size: 16px;">เวลา : {{ formatitemdevice(data.time) }}</p>
                                </v-col>
                            </v-row>
                        </v-btn>
                    </v-col>
                </v-col>
                <v-divider vertical :thickness="1"></v-divider>
                <v-col cols="6" class="mx-2 mt-5">
                    <v-row class="text-center">
                        <v-col cols="12" class="px-2">
                            <img :src="baseUrl + data.platesPhoto" alt="img" style="width: 100%;">
                        </v-col>
                        <v-col cols="6" class="text-end pa-5">
                            <img :src="baseUrl + data.platesPhoto2" alt="img" style="width: 100%;">
                        </v-col>
                        <v-col cols="6" class="d-flex align-center justify-center pa-5">
                            <h1 style="font-size: 60px;">{{ licensePlate.License }}</h1>
                        </v-col>
                    </v-row>
                </v-col>
                <v-divider vertical :thickness="1"></v-divider>
                <v-col cols="3">

                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import { formatitemdevice } from '../../function/day';
export default {
    setup() {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL;
        return {
            baseUrl,
            formatitemdevice
        }
    },
    data: () => ({
        ScreenSocket: null,
        SSerrorMessages: '',
        isSSConnected: false,

        AgentSocket: null,
        ASMessage: '',
        ASerrorMessage: '',
        isASConnected: false,

        data: {},
        licensePlate: '',
    }),
    mounted() {
        this.connectScreen();
    },
    methods: {
        connectScreen() {
            const token = import.meta.env.VITE_ACCESS_TOKEN_WS
            this.ScreenSocket = new WebSocket('wss://lprapi.zoftdd.com:8080/socket', token)

            this.ScreenSocket.onopen = () => {
                this.isSSConnected = true;
                console.log('Connected SS to WebSocket Server')
            }

            this.ScreenSocket.onmessage = (event) => {
                try {
                    const Resdata = JSON.parse(event.data);
                    if (Resdata['IN']) {
                        this.data = Resdata['IN']
                        this.licensePlate = this.data.plates?.[0] || { License: "ไม่พบป้ายทะเบียน" };
                    }
                } catch (error) {
                    console.error("❌ JSON Parse Error:", error);
                }
            }

            this.ScreenSocket.onerror = (error) => {
                this.SSerrorMessages = 'Web Socket Error : ' + error;
            }

            this.ScreenSocket.onclose = () => {
                this.isSSConnected = false;
                console.log('Websocket connection close');
            }
        }
    },
}
</script>

<style></style> -->


<template>
    <v-container fluid class="d-flex pa-0">
        <!-- 🔥 แถบซ้าย: รายการล่าสุด (มี Scroll) -->
        <v-sheet width="20%" height="93vh" class="pa-4 overflow-y-auto">
            <h2 class="text-h5 font-weight-bold mb-4">🚗 รายการล่าสุด</h2>
            <v-list class="pa-0">
                <v-list-item v-for="(entry, index) in recentEntries" :key="index" @click="selectCar(entry)"
                    class="pa-0">
                    <v-card class="pa-3 cursor-pointer" color="orange darken-3" dark>
                        <v-img :src="baseUrl + entry.platesPhoto2" height="150px" class="rounded-lg"></v-img>
                        <v-card-title>{{ entry.licensePlate.License }}</v-card-title>
                        <v-card-subtitle>🕒 {{ formatitemdevice(entry.time) }}</v-card-subtitle>
                    </v-card>
                </v-list-item>
            </v-list>
        </v-sheet>

        <!-- ⚫ แถบกลาง: รูปภาพและรายละเอียด (อัปเดตเป็นอันล่าสุดเสมอ) -->
        <v-sheet width="50%" height="93vh" class="d-flex pt-10 align-start justify-center bg-grey-darken-4 text-white">
            <v-card v-if="selectedCar" color="grey darken-3" width="90%" class="pa-4 ">
                <v-img :src="baseUrl + selectedCar.platesPhoto" width="100%"></v-img>
                <v-row>
                    <v-col cols="6" class="pt-5">
                        <v-img :src="baseUrl + selectedCar.platesPhoto2" width="100%"></v-img>
                    </v-col>
                    <v-col cols="6" class="d-flex align-center justify-center">
                        <h1 class="text-h2 font-weight-bold">{{ selectedCar.licensePlate.License }}</h1>
                    </v-col>
                </v-row>
            </v-card>
        </v-sheet>

        <!-- ⚪ แถบขวา: ฟอร์มกรอกข้อมูล -->
        <v-sheet width="30%" height="93vh" class="pa-4 pt-10">
            <v-card class="pa-4" style="background-color: #424242;">
                <v-card-title class="text-h6">📝 กรอกข้อมูล</v-card-title>
                <v-form v-if="selectedCar">
                    <v-text-field v-model="selectedCar.licensePlate.License" label="ทะเบียนรถ"
                        variant="outlined"></v-text-field>
                    <v-text-field v-model="selectedCar.time" label="เวลาเข้า" variant="outlined"></v-text-field>
                    <v-textarea v-model="selectedCar.note" label="หมายเหตุ" variant="outlined"></v-textarea>
                    <v-btn color="orange" block class="mt-4" size="large">บันทึก</v-btn>
                </v-form>
            </v-card>
        </v-sheet>
    </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import { formatitemdevice } from '../../function/day'

export default {
    setup() {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL
        const recentEntries = ref([]) // เก็บรายการล่าสุดจาก WebSocket
        const selectedCar = ref(null) // รถที่เลือก (หรือรถล่าสุด)

        let ScreenSocket = null

        const connectScreen = () => {
            const token = import.meta.env.VITE_ACCESS_TOKEN_WS
            ScreenSocket = new WebSocket('wss://lprapi.zoftdd.com:8080/socket', token)

            ScreenSocket.onopen = () => console.log('✅ Connected to WebSocket')

            ScreenSocket.onmessage = (event) => {
                try {
                    const Resdata = JSON.parse(event.data)
                    if (Resdata['IN']) {
                        const newEntry = {
                            ...Resdata['IN'],
                            licensePlate: Resdata['IN'].plates?.[0] || { License: "ไม่พบป้ายทะเบียน" },
                        }
                        recentEntries.value.unshift(newEntry) // เพิ่มรายการใหม่ด้านบนสุด
                        selectedCar.value = newEntry // ✅ อัปเดตรถล่าสุดเสมอ
                    }
                } catch (error) {
                    console.error("❌ JSON Parse Error:", error)
                }
            }

            ScreenSocket.onerror = (error) => console.error('WebSocket Error:', error)
            ScreenSocket.onclose = () => console.log('🔴 WebSocket Closed')
        }

        onMounted(connectScreen)

        const selectCar = (entry) => {
            selectedCar.value = { ...entry } // กดเลือกรายการ -> อัปเดตแถวกลาง
        }

        return { baseUrl, recentEntries, selectedCar, selectCar, formatitemdevice }
    }
}
</script>

<style scoped>
/* ✅ ให้แถบซ้ายมี Scroll แยก */
.overflow-y-auto {
    overflow-y: auto;
}
</style>