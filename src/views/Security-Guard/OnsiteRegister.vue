<template>
    <v-container fluid class="d-flex pa-0">
        <v-sheet width="20%" height="93vh" class="pa-4 overflow-y-auto">
            <h2 class="text-h5 font-weight-bold mb-4">🚗 รายการล่าสุด</h2>
            <v-list class="pa-0">
                <v-list-item v-for="(entry, index) in recentEntries" :key="index" @click="selectCar(entry)"
                    class="pa-0 mb-3">
                    <v-card class="pa-2 cursor-pointer" style="background-color:  #424242;">
                        <v-img :src="baseUrl + entry.platesPhoto2" width="100%" class="rounded-lg"></v-img>
                        <v-card-title class="px-2">
                            <p style="font-size: 1.1rem;">ทะเบียน : {{ entry.licensePlate.License }}</p>
                        </v-card-title>
                        <v-card-subtitle class="px-2 ">
                            <p style="font-size: 1rem;">🕒 เวลา {{ formatitemdevice(entry.time) }}</p>
                        </v-card-subtitle>
                    </v-card>
                </v-list-item>
            </v-list>
        </v-sheet>

        <v-sheet width="50%" height="93vh" class="d-flex pt-10 align-start justify-center bg-grey-darken-4 text-white">
            <v-card v-if="selectedCar" style="background-color:  #424242;" width="90%" class="pa-4 ">
                <v-img :src="baseUrl + selectedCar.platesPhoto" width="100%"></v-img>
                <v-row>
                    <v-col cols="6" class="pt-5">
                        <v-img :src="baseUrl + selectedCar.platesPhoto2" width="100%"></v-img>
                    </v-col>
                    <v-col cols="6" class="d-flex align-center justify-center">
                        <v-row>
                            <v-col cols="12" class="pa-0 text-center">
                                <h1 style="font-size: 4rem;" class="font-weight-bold">
                                    {{ selectedCar.licensePlate.License }}
                                </h1>
                            </v-col>
                            <v-col cols="12" class="pa-0 text-center">
                                <p v-if="selectedCar.msg === 'บุคคลภายนอก'" style="font-size: 2rem; color: #E53935;">{{
                                    selectedCar.msg }} <br />
                                    <span style="font-size: 1.5rem; color: #F57F17;">(กรุณาลงทะเบียน)</span>
                                </p>
                                <p v-if="selectedCar.msg === 'บุคคลภายใน'" style="font-size: 2rem; color: #66BB6A;">{{
                                    selectedCar.msg }}
                                </p>
                                <p v-if="selectedCar.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'"
                                    style="font-size: 2rem; color: #F57F17;">{{ selectedCar.msg }}</p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-sheet>

        <v-sheet width="35%" height="93vh" class="pa-4 pt-10">
            <v-card class="pa-4" style="background-color: #424242;">
                <v-card-title class="text-h6 pb-5">📝 กรอกข้อมูล</v-card-title>
                <v-form v-if="selectedCar" fast-fail>
                    <v-row class="d-flex align-center px-3 pb-7">
                        <v-col cols="5" class="text-start">
                            <p>ทะเบียนรถ</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-text-field v-model="selectedCar.licensePlate.License" label="ทะเบียนรถ"
                                variant="outlined" density="compact" hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="5" class="text-start">
                            <p>เวลาเข้า</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-text-field v-model="selectedCar.time" label="เวลาเข้า" variant="outlined"
                                density="compact" hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <p>ประเภทยานพาหนะ</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-select v-model="selectedCar.note" label="ประเภทยานพาหนะ" variant="outlined"
                                density="compact" hide-details="auto"></v-select>
                        </v-col>
                    </v-row>
                    <v-divider :thickness="2"></v-divider>
                    <v-row class="d-flex align-center pt-7 px-3">
                        <v-col cols="5" class="text-start">
                            <p>เลขประจำตัวประชาชน</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-text-field label="เลขประจำตัวประชาชน" variant="outlined" density="compact"
                                hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="5" class="text-start">
                            <p>ชื่อ-นามสกุล</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-text-field density="compact" variant="outlined" hide-details="auto"
                                placeholder="ชื่อ-นามสกุล"></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <p>ที่อยู่</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-textarea variant="outlined" placeholder="ที่อยู่"></v-textarea>
                        </v-col>
                    </v-row>
                    <div class="pt-3">
                        <v-btn color="#66BB6A" block class="mt-4">บันทึก</v-btn>
                    </div>
                </v-form>
            </v-card>
        </v-sheet>
    </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import { openDB } from 'idb'
import { formatitemdevice } from '../../function/day'

export default {
    setup() {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL
        const recentEntries = ref([]) // 🔥 เก็บรายการรถของวันนี้
        const selectedCar = ref(null) // รถที่เลือก (หรือรถล่าสุด)
        let ScreenSocket = null

        // 👉 เปิดหรือสร้างฐานข้อมูล IndexedDB
        const initDB = async () => {
            return openDB('CarDB', 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains('history')) {
                        db.createObjectStore('history', { keyPath: 'id', autoIncrement: true })
                    }
                }
            })
        }

        // 👉 ลบข้อมูลวันเก่าออกจาก IndexedDB
        const clearOldHistory = async () => {
            const db = await initDB()
            const tx = db.transaction('history', 'readwrite')
            const store = tx.objectStore('history')
            const allEntries = await store.getAll()

            const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
            for (let entry of allEntries) {
                if (entry.date !== today) {
                    await store.delete(entry.id) // ❌ ลบข้อมูลที่ไม่ใช่ของวันนี้
                }
            }
        }

        // 👉 ดึงข้อมูลของวันนี้จาก IndexedDB
        const loadTodayHistory = async () => {
            await clearOldHistory();

            const db = await initDB();
            const tx = db.transaction('history', 'readonly');
            const store = tx.objectStore('history');
            const allEntries = await store.getAll();

            const today = new Date().toISOString().split('T')[0];

            // 🔥 กรองข้อมูลซ้ำก่อนแสดงผล
            const uniqueEntries = [];
            const seen = new Set();

            allEntries
                .filter(entry => entry.date === today)
                .sort((a, b) => b.timeStamp - a.timeStamp) // ใหม่สุดอยู่บน
                .forEach(entry => {
                    const key = entry.licensePlate.License + entry.timeStamp;
                    if (!seen.has(key)) {
                        seen.add(key);
                        uniqueEntries.push(entry);
                    }
                });

            recentEntries.value = uniqueEntries; // ✅ แสดงเฉพาะรายการที่ไม่ซ้ำ
        }

        // 👉 บันทึกข้อมูลใหม่ลง IndexedDB
        const saveHistory = async (newEntry) => {
            const db = await initDB();
            const tx = db.transaction('history', 'readwrite');
            const store = tx.objectStore('history');

            // 🛑 เช็กก่อนว่าข้อมูลซ้ำหรือไม่
            const existingEntries = await store.getAll();
            const isDuplicate = existingEntries.some(entry =>
                entry.licensePlate.License === newEntry.licensePlate.License &&
                entry.timeStamp === newEntry.timeStamp
            );

            if (!isDuplicate) {
                await store.add(newEntry); // ✅ บันทึกเฉพาะข้อมูลใหม่
                loadTodayHistory(); // โหลดข้อมูลใหม่หลังเพิ่มรายการ
            }
        }

        const connectScreen = () => {
            const token = import.meta.env.VITE_ACCESS_TOKEN_WS
            ScreenSocket = new WebSocket('wss://lprapi.zoftdd.com:8080/socket', token)

            ScreenSocket.onopen = () => console.log('✅ Connected to WebSocket')

            ScreenSocket.onmessage = async (event) => {
                try {
                    const Resdata = JSON.parse(event.data);
                    if (Resdata['IN']) {
                        const newEntry = {
                            ...Resdata['IN'],
                            licensePlate: Resdata['IN'].plates?.[0] || { License: "ไม่พบป้ายทะเบียน" },
                            timeStamp: Date.now(),
                            date: new Date().toISOString().split('T')[0]
                        };

                        // 🔥 เช็กก่อนว่า `selectedCar` เป็นข้อมูลซ้ำหรือไม่
                        if (
                            !selectedCar.value ||
                            selectedCar.value.licensePlate.License !== newEntry.licensePlate.License ||
                            selectedCar.value.timeStamp !== newEntry.timeStamp
                        ) {
                            selectedCar.value = newEntry;
                        }

                        await saveHistory(newEntry);
                    }
                } catch (error) {
                    console.error("❌ JSON Parse Error:", error);
                }
            };

            ScreenSocket.onerror = (error) => console.error('WebSocket Error:', error)
            ScreenSocket.onclose = () => console.log('🔴 WebSocket Closed')
        }

        onMounted(() => {
            loadTodayHistory() // โหลดข้อมูลของวันนี้ก่อน
            connectScreen() // เริ่มเชื่อมต่อ WebSocket
        })

        const selectCar = (entry) => {
            selectedCar.value = { ...entry } // กดเลือกรายการ -> อัปเดตแถวกลาง
        }

        return { baseUrl, recentEntries, selectedCar, selectCar, formatitemdevice }
    }
}
</script>



<style scoped>
.overflow-y-auto {
    overflow-y: auto;
}
</style>