<template>
    <v-container fluid class="d-flex pa-0">

        <v-sheet width="22%" height="93vh" class="pa-4 overflow-y-auto">
            <h2 class="text-h5 font-weight-bold mb-4">🚗 รายการล่าสุด</h2>
            <v-list class="pa-0">
                <v-list-item v-for="(entry, index) in recentEntries" :key="index" @click="selectCar(entry)"
                    class="pa-0 mb-3">
                    <v-card class="pa-2 cursor-pointer" style="background-color:  #424242;">
                        <v-row>
                            <v-col cols="12" class="pa-3 pb-0">
                                <v-img :src="baseUrl + entry.platesPhoto2" width="100%" class="rounded-lg"></v-img>
                                <v-card-title class="px-2">
                                    <p style="font-size: 1.1rem;">ทะเบียน : {{ entry.licensePlate.License }}</p>
                                </v-card-title>
                            </v-col>
                            <v-row class="px-2" style="position: relative;">
                                <v-col cols="9">
                                    <v-card-subtitle class="px-2 pb-3">
                                        <p class="d-flex align-center" style="font-size: 1rem;"><v-icon size="small"
                                                class="mr-1">mdi-calendar</v-icon> วันที่
                                            {{ dateFormat(entry.time) }}</p>
                                        <p style="font-size: 1rem;"><v-icon icon="mdi-clock" size="small"
                                                class="mr-1"></v-icon>เวลา {{ formatitemdevice(entry.time) }}</p>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col class="pr-6 pb-6"
                                    style="position: absolute;text-align: end; left: 0px;bottom: 0%;">
                                    <v-btn icon="" style="width: 30px; height: 30px;" color="#E53935"
                                        @click="deleteEntry(entry)">
                                        <v-icon style="font-size: 18px;" icon="mdi-delete"></v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-card>
                </v-list-item>
            </v-list>
        </v-sheet>

        <v-sheet width="50%" height="93vh" class="d-flex pt-5 align-start justify-center bg-grey-darken-4">
            <v-card v-if="selectedCar" style="background-color:  #424242;" width="95%" class="pa-4">
                <div class="pa-2 text-center mb-3" style="border-radius: 10px; background-color: #212121;">
                    <p class="" v-if="selectedCar.msg === 'บุคคลภายนอก'"
                        style="font-size: 3rem; color: #E53935; font-weight: bold;">
                        {{ selectedCar.msg }}
                        <!-- <span style="font-size: 1.5rem; color: #F57F17;">(กรุณาลงทะเบียน)</span> -->
                    </p>
                    <p class="" v-if="selectedCar.msg === 'บุคคลภายใน'"
                        style="font-size: 3rem; color: #66BB6A; font-weight: bold;">
                        {{ selectedCar.msg }}
                    </p>
                    <p class="" v-if="selectedCar.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'"
                        style="font-size: 3rem; color: #F57F17; font-weight: bold;">ผู้ติดต่อที่ลงทะเบียน</p>

                </div>
                <v-img :src="baseUrl + selectedCar.platesPhoto" width="100%"></v-img>
                <v-row class="pt-1">
                    <v-col cols="6" class="pt-5">
                        <v-img :src="baseUrl + selectedCar.platesPhoto2" width="100%"></v-img>
                    </v-col>
                    <v-col cols="6" class="d-flex align-center justify-center">
                        <v-row>
                            <v-col cols="12" class="pa-0 text-center">
                                <h1 style="font-size: 5rem;" class="font-weight-bold">
                                    {{ selectedCar.licensePlate.License }}
                                </h1>
                            </v-col>
                            <!-- <v-col cols="12" class="pa-0 text-center">
                                <p v-if="selectedCar.msg === 'บุคคลภายนอก'" style="font-size: 2rem; color: #E53935;">
                                    {{ selectedCar.msg }} <br />
                                    <span style="font-size: 1.5rem; color: #F57F17;">(กรุณาลงทะเบียน)</span>
                                </p>
                                <p v-if="selectedCar.msg === 'บุคคลภายใน'" style="font-size: 2rem; color: #66BB6A;">
                                    {{ selectedCar.msg }}
                                </p>
                                <p v-if="selectedCar.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'"
                                    style="font-size: 2rem; color: #F57F17;">ผู้ติดต่อที่ลงทะเบียน</p>
                            </v-col> -->
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-sheet>

        <v-sheet width="35%" height="93vh" class="pa-0 pr-3 pt-5">
            <v-toolbar density="compact" style="background-color: #F57F17; font-size: 20px;">
                <v-toolbar-title>
                    <p style="font-size: 22px; font-weight: bold;" class="d-flex align-center">
                        <v-icon size="small" class="mr-2">mdi-file-document-edit-outline</v-icon>ลงทะเบียน
                    </p>
                </v-toolbar-title>
            </v-toolbar>
            <v-card class="pa-4" style="background-color: #424242;">
                <v-form fast-fail @submit.prevent="submit">
                    <v-row class="d-flex align-center px-3 pb-7">
                        <v-col cols="12">
                            <p style="font-size: 20px; font-weight: bold;" class="d-flex align-center">
                                <v-icon icon="mdi-car" size="small" class="mr-2"></v-icon>ข้อมูลรถ
                            </p>
                        </v-col>
                        <v-col cols="5" class="text-start">
                            <p>ทะเบียนรถ</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-text-field v-model="sendData.licensePlate.License" label="ทะเบียนรถ" variant="outlined"
                                density="compact" hide-details="auto" required
                                :rules="[v => !!v || 'โปรดระบุทะเบียนรถ']"></v-text-field>
                        </v-col>
                        <v-col cols="5" class="text-start">
                            <p>เวลาเข้า</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-text-field readonly v-model="formatTime" label="เวลาเข้า" variant="outlined"
                                density="compact" hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <p>ประเภทยานพาหนะ</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-select v-model="sendData.vehicleType" label="ประเภทยานพาหนะ" variant="outlined"
                                density="compact" hide-details="auto" :items="vehicleList" item-title="name"
                                item-value="value" required :rules="[v => !!v || 'โปรดระบุประเภทยานพาหนะ']"></v-select>
                        </v-col>
                    </v-row>
                    <v-divider :thickness="2"></v-divider>
                    <v-row class="d-flex align-center pt-4 pb-2 px-3">
                        <v-col cols="12">
                            <p style="font-size: 20px; font-weight: bold;" class="d-flex align-center">
                                <v-icon icon="mdi-card-account-details" size="small" class="mr-2"></v-icon>ข้อมูลคนขับ
                            </p>
                        </v-col>
                        <!-- <v-col cols="5">
                            <p>รูปภาพ</p>
                        </v-col>
                        <v-col cols="7">
                            <img src="" alt="image">
                        </v-col> -->
                        <v-col cols="5" class="text-start">
                            <p>เลขประจำตัวประชาชน</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-text-field label="เลขประจำตัวประชาชน" variant="outlined" density="compact"
                                hide-details="auto" v-model="sendData.identityNumber"
                                :rules="[v => !!v || 'โปรดระบุเลขบัตรประจำตัว', v => /^[0-9]{1,13}$/.test(v) || 'กรุณาระบุเลขบัตร 13 หลัก']"
                                required maxlength="13"></v-text-field>
                        </v-col>
                        <v-col cols="5" class="text-start">
                            <p>ชื่อ-นามสกุล</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-text-field density="compact" variant="outlined" hide-details="auto"
                                placeholder="ชื่อ-นามสกุล" v-model="sendData.name"
                                :rules="sendData.guestName ? [] : [v => !!v || 'โปรดระบุชื่อ-นามสกุล']"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <p>ที่อยู่</p>
                        </v-col>
                        <v-col cols="7" class="pa-0 d-flex align-top">
                            <v-textarea variant="outlined" placeholder="ที่อยู่" rows="2" hide-details="auto"
                                v-model="sendData.address"
                                :rules="sendData.agency ? [] : [v => !!v || 'โปรดระบุที่อยู่']" required></v-textarea>
                        </v-col>
                    </v-row>
                    <v-divider class="mt-5" :thickness="2"></v-divider>
                    <div>
                        <v-btn
                            :disabled="sendData?.msg === 'บุคคลภายใน' || sendData?.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'"
                            type="submit" color="#66BB6A" block class="mt-4">บันทึก</v-btn>
                    </div>
                </v-form>
            </v-card>
        </v-sheet>
    </v-container>
</template>

<script>
import { ref, onMounted, toRaw } from 'vue'
import { openDB } from 'idb'
import { formatitemdevice, dateFormat, dateFormatValue } from '../../function/day'
import Swal from "sweetalert2";
import { LPService } from '../../api/licenseplate';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const lp = new LPService();
        const baseUrl = import.meta.env.VITE_APP_BASE_URL
        const recentEntries = ref([]) // 🔥 เก็บรายการรถของวันนี้
        const selectedCar = ref(null) // รถที่เลือก (หรือรถล่าสุด)
        const sendData = ref({
            msg: '',
            licensePlate: { License: '' },
            vehicleType: null,
            time: new Date(),
            name: '',
            identityNumber: '',
            address: '',
        })
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

        // const clearOldHistory = async () => {
        //     const db = await initDB()
        //     const tx = db.transaction('history', 'readwrite')
        //     const store = tx.objectStore('history')
        //     const allEntries = await store.getAll()

        //     const today = new Date().toISOString().split('T')[0]
        //     for (let entry of allEntries) {
        //         if (entry.date !== today) {
        //             await store.delete(entry.id)
        //         }
        //     }
        // }

        // 👉 ดึงข้อมูลของวันนี้จาก IndexedDB
        const loadTodayHistory = async () => {
            // await clearOldHistory();

            const db = await initDB();
            const tx = db.transaction('history', 'readonly');
            const store = tx.objectStore('history');
            const allEntries = await store.getAll();

            const today = new Date().toISOString().split('T')[0];

            // 🔥 กรองข้อมูลซ้ำก่อนแสดงผล
            const uniqueEntries = [];
            const seen = new Set();

            allEntries
                // .filter(entry => entry.date === today)
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

            const currentTime = new Date().getTime();
            const expireTime = currentTime + 60 * 60 * 1000; // 1 ชม.

            // 🔥 ดึงข้อมูลทั้งหมดในวันนี้
            const existingEntries = await store.getAll();
            console.log('🚗 รายการที่มีใน IndexedDB:', existingEntries);

            // 🛑 ตรวจสอบว่ามีทะเบียนรถนี้อยู่ในวันนี้หรือยัง
            const isDuplicate = existingEntries.some(entry =>
                entry._id === newEntry._id
            );

            if (!isDuplicate) {
                const dataWithExpireTime = { ...newEntry, expireTime };
                await store.add(dataWithExpireTime); // ✅ บันทึกเฉพาะข้อมูลใหม่ที่ไม่ซ้ำ
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

                        selectedCar.value = newEntry;
                        // sendData.value = JSON.parse(JSON.stringify(newEntry));

                        await saveHistory(newEntry);
                    }
                } catch (error) {
                    console.error("❌ JSON Parse Error:", error);
                }
            };

            ScreenSocket.onerror = (error) => console.error('WebSocket Error:', error)
            // ScreenSocket.onclose = () => console.log('🔴 WebSocket Closed');

            ScreenSocket.onclose = () => {
                console.log('🔴 WebSocket Closed');
                // ถ้า WebSocket ปิดให้ลองเชื่อมต่อใหม่
                reconnectWebSocket();
            }
        }

        const deleteEntry = async (entry) => {

            const confirm = await Swal.fire({
                title: "ต้องการลบรายการนี้หรือไม่?",
                text: `ทะเบียน: ${entry.licensePlate.License}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก'
            });

            if (confirm.isConfirmed) {
                const db = await initDB();
                const tx = db.transaction('history', 'readwrite');
                const store = tx.objectStore('history');
                await store.delete(entry.id);

                // ✅ อัปเดตรายการหลังจากลบ
                await loadTodayHistory();

                Swal.fire({
                    title: 'ลบข้อมูลเรียบร้อย !',
                    icon: 'success',
                })
            }

        }

        const submit = async (event) => {
            const res = await event
            if (res.valid === true) {
                const token = localStorage.getItem('token');
                const park = store.state.park;
                const data = {
                    guestName: sendData.value.name,
                    licensePlate: sendData.value.licensePlate.License,
                    licensePlateProvince: '',
                    start: dateFormatValue(sendData.value.time),
                    listType: 'fixedlist',
                    expire: '2025-12-31',

                    identityNumber: sendData.value.identityNumber,
                    address: sendData.value.address,
                    vehicleType: sendData.value.vehicleType,
                    cate: 'stranger',
                }
                console.log('เข้าจ้า' + JSON.stringify(sendData.value.id))
                await lp.CreateLP(park, data, token).then(async (res) => {
                    if (res.message === 'ok') {
                        Swal.fire({
                            icon: 'success',
                            title: `บันทึกข้อมูลสำเร็จ!`,
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        await deleteFromIndexedDB(sendData.value.id);
                        sendData.value = {
                            msg: '',
                            licensePlate: { License: '' },
                            vehicleType: null,
                            time: new Date(),
                            name: '',
                            identityNumber: '',
                            address: '',
                        };
                    } else if (res.data.message === 'validate error') {
                        this.$swal({
                            title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                            icon: 'warning',
                        })
                    } else {
                        this.$swal({
                            icon: 'warning',
                            title: `มีบางอย่างผิดพลาด !`,
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                    }
                })
            }
        }

        const deleteFromIndexedDB = async (id) => {
            try {
                const db = await initDB();
                const tx = db.transaction('history', 'readwrite');
                const store = tx.objectStore('history');

                await store.delete(id);
                console.log(`🚗 ลบรายการ ID: ${id} ออกจาก IndexedDB แล้ว`);

                await tx.done;
                await loadTodayHistory();
            } catch (error) {
                console.error("❌ ลบข้อมูลไม่สำเร็จ:", error);
            }
        };

        const checkExpire = async () => {
            const db = await initDB();
            const tx = db.transaction('history', 'readwrite');
            const store = tx.objectStore('history');

            const currentTime = new Date().getTime();
            const allEntries = await store.getAll();

            for (let entry of allEntries) {
                if (entry.expireTime < currentTime) {
                    await store.delete(entry.id);
                    console.log(`🚗 ลบรายการที่หมดอายุ ID: ${entry}`);
                    await loadTodayHistory();
                }
            }
            console.log("ตรวจสอบเสร็จสิ้น");
        }

        const reconnectWebSocket = () => {
            console.log('กำลังเชื่อมต่ออีกครั้ง กรุณารอสักครู่...');
            if (navigator.onLine) {
                connectScreen();  // เรียก connectScreen เพื่อเชื่อมต่อใหม่
            } else {
                console.log('ไม่มีการเชื่อมต่ออินเทอร์เน็ต, กรุณาตรวจสอบอินเตอร์เน็ตของท่าน...');
            }
        }

        // ฟังก์ชันตรวจสอบสถานะการเชื่อมต่ออินเทอร์เน็ต
        window.addEventListener('online', () => {
            reconnectWebSocket();
        });

        window.addEventListener('offline', () => {
            console.log('สูญเสียการเชื่อมต่อ');
        });


        onMounted(() => {
            loadTodayHistory() // โหลดข้อมูลของวันนี้ก่อน
            connectScreen() // เริ่มเชื่อมต่อ WebSocket
            checkExpire() // ตรวจสอบข้อมูลที่หมดอายุ
            setInterval(checkExpire, 60000); // ตรวจสอบทุกๆ 1 นาที
        })

        const selectCar = (entry) => {
            selectedCar.value = { ...entry } // กดเลือกรายการ -> อัปเดตแถวกลาง
            sendData.value = JSON.parse(JSON.stringify(entry));

        }

        return { baseUrl, recentEntries, selectedCar, selectCar, formatitemdevice, deleteEntry, lp, toRaw, submit, sendData, dateFormat }
    },
    computed: {
        formatTime() {
            return this.formatDateTime(this.sendData.time)
        }
    },
    data: () => ({
        vehicleList: [
            { name: 'รถยนต์', value: 'CAR' },
            { name: 'รถจักรยานยนต์', value: 'MOTORCYCLE' },
            { name: 'รถบรรทุก', value: 'TRUCK' },
        ],
        sendData: {
            name: '',
            startDate: '',
            vehicleType: '',
            licensePlate: '',
            identityNumber: '',
            address: '',
        },
    }),
    methods: {
        formatDateTime(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString("th-TH", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }).replace(",", "");
        },
    },
}
</script>

<style scoped>
.overflow-y-auto {
    overflow-y: auto;
}
</style>
