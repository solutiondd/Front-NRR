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
                                <h1 style="font-size: 4rem;" class="font-weight-bold">
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

        <v-sheet width="35%" height="93vh" class="pa-0 pr-3 pt-5 overflow-y-auto">
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
                                <!-- <v-spacer>
                                </v-spacer>
                                <v-btn icon="mdi-refresh" size="small" color="grey-darken-4"
                                    @click="resetSendData()"></v-btn> -->
                            </p>
                        </v-col>
                        <v-col cols="5" class="text-start pb-5 pt-0">
                            <p>ทะเบียนรถ</p>
                        </v-col>
                        <v-col cols="7" class="pa-0 ">
                            <v-text-field v-model="sendData.licensePlate.License" placeholder="ระบุทะเบียนรถ"
                                variant="outlined" density="compact" required
                                :rules="[v => !!v || 'โปรดระบุทะเบียนรถ']"></v-text-field>
                        </v-col>
                        <v-col cols="5" class="text-start py-2 pt-0">
                            <p>เวลาเข้า</p>
                        </v-col>
                        <v-col cols="7" class="pa-0 py-2">
                            <v-text-field readonly v-model="formatTime" placeholder="เวลาเข้า" variant="outlined"
                                density="compact"></v-text-field>
                        </v-col>
                        <v-col cols="5" class="pb-5 pt-0">
                            <p>ประเภทยานพาหนะ</p>
                        </v-col>
                        <v-col cols="7" class="pa-0">
                            <v-select v-model="sendData.vehicleType" placeholder="ระบุประเภทยานพาหนะ" variant="outlined"
                                density="compact" :items="vehicleList" item-title="name" item-value="value" required
                                :rules="[v => !!v || 'โปรดระบุประเภทยานพาหนะ']"></v-select>
                        </v-col>
                    </v-row>
                    <v-divider :thickness="2"></v-divider>
                    <v-row class="d-flex align-top pt-4 pb-2 px-3">
                        <v-col v-if="loading" class="pa-2">
                            <div>
                                <v-progress-linear color="cyan" indeterminate></v-progress-linear>
                            </div>
                        </v-col>
                        <v-col cols="12" class="pb-4 pr-0">
                            <p style="font-size: 20px; font-weight: bold;" class="d-flex align-center">
                                <v-icon icon="mdi-card-account-details" size="small" class="mr-2"></v-icon>ข้อมูลคนขับ
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="readIDCard()"><v-icon
                                        class="mr-2">mdi-text-box-search-outline</v-icon>อ่านข้อมูลบัตร</v-btn>
                                <v-btn :ripple="false" class="ml-2" color="white" variant="text" icon="mdi-refresh"
                                    size="small" @click="resetSendData"></v-btn>
                            </p>
                        </v-col>
                        <v-col cols="5">
                            <p>รูปภาพ</p>
                        </v-col>
                        <v-col cols="7" class="d-flex align-center justify-center">
                            <img id="Photo" src="../../assets/Logo-Sunsweet-Final_White.svg" alt="image"
                                style="width: 130px;">
                        </v-col>
                        <v-col cols="5" class="text-start pt-2">
                            <p>เลขประจำตัวประชาชน</p>
                        </v-col>
                        <v-col cols="7" class="pa-0 pb-2">
                            <v-text-field placeholder="ระบุเลขประจำตัวประชาชน" variant="outlined" density="compact"
                                v-model="sendData.identityNumber"
                                :rules="[v => !!v || 'โปรดระบุเลขบัตรประจำตัว', v => /^[0-9]{1,13}$/.test(v) || 'กรุณาระบุเลขบัตร 13 หลัก']"
                                required maxlength="13"></v-text-field>
                        </v-col>
                        <v-col cols="5" class="text-start pt-2">
                            <p>ชื่อ-นามสกุล</p>
                        </v-col>
                        <v-col cols="7" class="pa-0 pb-2">
                            <v-text-field density="compact" variant="outlined" placeholder="ระบุชื่อ-นามสกุล"
                                v-model="sendData.name"
                                :rules="sendData.name ? [] : [v => !!v || 'โปรดระบุชื่อ-นามสกุล']"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="5" class="pt-0">
                            <p>ที่อยู่</p>
                        </v-col>
                        <v-col cols="7" class="pa-0 d-flex align-top">
                            <v-textarea variant="outlined" placeholder="ระบุที่อยู่" rows="2" v-model="sendData.address"
                                :rules="sendData.address ? [] : [v => !!v || 'โปรดระบุที่อยู่']" required
                                auto-grow></v-textarea>
                        </v-col>
                    </v-row>
                    <v-divider class="mt-2" :thickness="2"></v-divider>
                    <v-card-actions>
                        <CheckOut />
                        <v-btn variant="flat"
                            :disabled="sendData?.msg === 'บุคคลภายใน' || sendData?.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'"
                            type="submit" color="#66BB6A" width="50%" class="mt-4">บันทึกขาเข้า
                            <v-icon class="ml-2">mdi-tray-arrow-down</v-icon></v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-sheet>
    </v-container>

    <!-- //NOTE - Print Form -->
    <div id="app">
        <div id="form-container" style="display: none;">
            <div style="text-align: center;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h4>สแกนขาออก</h4>
                    <qrcode-vue :value="sendData._id" :size="100" level="H" render-as="canvas"
                        :key="sendData._id"></qrcode-vue>
                    <p style="font-size: 12px;">{{ sendData._id }}</p>
                </div>
                <h3 style="padding-bottom: 0px;">บันทึกการเข้า-ออก</h3>
                <h3>บริษัท ซันสวีท จำกัด (มหาชน)</h3>
            </div>
            <div style="text-align: start; font-size: 12px;">
                <p style="font-weight: bold;">วันที่ :
                    <span style="font-weight: 400;">
                        {{ dateFormatDayandTime(sendData.time) }}
                    </span>
                </p>
                <p style="font-weight: bold;">เวลาเข้า :
                    <span style="font-weight: 400;">
                        {{ formatitemdevice(sendData.time) }}
                    </span>
                </p>
                <p style="font-weight: bold;">ชื่อ (ผู้ติดต่อ) :
                    <span style="font-weight: 400;">
                        {{ sendData.name }}
                    </span>
                </p>
                <p style="font-weight: bold;">บริษัท/หน่วยงาน : </p>
                <p style="font-weight: bold;">จำนวนคน : </p>
                <p style="font-weight: bold;">ทะเบียนรถ :
                    <span style="font-weight: 400;">
                        {{ sendData.licensePlate.License }}
                    </span>
                </p>
                <p style="font-weight: bold;">ติดต่อแผนก/คุณ : </p>
                <p style="font-weight: bold;">รายละเอียดกิจธุระ : </p>
            </div>

            <div>
                <v-row>
                    <v-col>
                        <p style="font-size: 12px;">ลงชื่อผู้ติดต่อ</p>
                        <div style="border: 1px solid black;padding: 30px;"></div>
                    </v-col>
                    <v-col>
                        <p style="font-size: 12px;">ลงชื่อ รปภ.</p>
                        <div style="border: 1px solid black;padding: 30px;"></div>
                    </v-col>
                    <v-col>
                        <p style="font-size: 12px;">ลงชื่อผู้รับการติดต่อ</p>
                        <div style="border: 1px solid black;padding: 30px;"></div>
                    </v-col>
                </v-row>
            </div>

            <div style="text-align: start;">
                <div style="border: 1px solid black;">
                    <h4 style="font-size: 8px; text-align: center;">
                        ระเบียบปฏิบัติสำหรับบุคคลภายนอกที่เข้ามาติดต่อบริษัทฯ
                    </h4>
                </div>
                <p style="font-size:7px; padding-top:0px; padding-bottom: 0px;">
                    1. กรุณาติดบัตร VISITOR ตลอดเวลาที่อยู่ในบริษัทฯ <br />
                    2. กรุณาจอดรถในพื้นที่ ที่บริษัทฯกำหนด และกรุณาดับเครื่องยนต์ทุกครั้งเพื่อลดมลภาวะทางอากาศ <br />
                    3. ห้ามพกพาอาวุธ ของมึนเมา หรือสิ่งเสพติดทุกชนิดเข้ามาภายในบริษัทฯ <br />
                    4. กรณีที่ต้องเข้าสายการผลิตต้องแต่งกายตามที่บริษัทฯ กำหนด <br />
                    5. ห้ามพกพาวัตถุสิ่งของประเภทแก้วทุกชนิด เข้ามาภายในบริษัทฯ <br />
                    6. ห้ามนำสิ่งของอื่น ออกนอกบริษัทฯ ก่อนได้รับอนุญาตจากเจ้าหน้าที่บริษัทฯ <br />
                    7. ห้ามสูบบุหรี่ในอาคารบริษัทฯ และบริเวณรอบๆ พื้นที่ (เว้นแต่บริเวณที่บริษัทฯ จัดไว้ให้เท่านั้น)
                </p>
            </div>
            <div style="text-align: start;">
                <div style="border: 1px solid black;">
                    <h4 style="font-size: 8px; text-align: center;">
                        ระเบียบปฏิบัติด้านความปลอดภัยและการจัดการด้านสิ่งแวดล้อม ISO 14001
                    </h4>
                </div>
                <p style="font-size:7px ; padding-top:0px; padding-bottom: 0px;">
                    1. ปฏิบัติตามป้ายห้าม, ป้ายเตือนต่างๆ อย่างเคร่งครัดเพื่อความปลอดภัย และรักษาสภาพแวดล้อมของบริษัทฯ
                    <br />
                    2. รถยนต์/จักรยานยนต์ต้องมีการตรวจสอบน้ำมันรั่วไหลก่อนเข้าบริษัทฯ <br />
                    3. ผู้รับเหมาต้องกำจัดขยะ และนำออกอย่างเหมาะสมไม่ปล่อยน้ำเสีย/ ไม่ก่อเสียงดัง/ไม่สร้างมลพิษ <br />
                    4. ผู้รับเหมาต้องสวมอุปกรณ์ PPE ที่เหมาะสมเพื่อความปลอดภัยตามลักษณะความเสี่ยงของงาน <br />
                    5. ผู้ที่เข้ามาติดต่อบริษัทฯ ต้องร่วมมือในการอนุรักษ์พลังงาน และใช้ทรัพยากรอย่างมีประสิทธิภาพ <br />
                    6. รถรับเปลือกต้องไม่ปล่อยน้ำล้างเปลือกลงบนพื้นถนนและรางน้ำฝน <br />
                    7. ขับรถในบริษัทฯ ด้วยความเร็วไม่เกิน ๑๐ ก.ม./ช.ม. เพื่อความปลอดภัย <br />
                    8. ผู้มาติดต่อที่เข้าบริษัทต้องมีเจ้าหน้าที่ของบริษัทฯ พาเข้าพื้นที่ทุกครั้งเพื่อความปลอดภัย <br />
                </p>
            </div>
            <div>
                <div style="text-align: center;border: 1px solid black;">
                    <p style="font-size: 9px; font-weight: bold; ; padding-top:0px; padding-bottom: 0px;">กรุณานำบัตร
                        VISITOR คืนให้เจ้าหน้าที่ รปภ.
                        ก่อนออกจากบริษัทฯ
                        และต้องมีลายเซ็นของเจ้าหน้าที่บริษัทฯ จึงจะสามารถออกนอกบริษัทฯ ได้</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { ref, onMounted, toRaw, nextTick } from 'vue'
import { openDB } from 'idb'
import { formatitemdevice, dateFormat, dateFormatValue, dateFormatDayandTime } from '../../function/day'
import Swal from "sweetalert2";
import { LPService } from '../../api/licenseplate';
import { useStore } from 'vuex';
import QrcodeVue from "qrcode.vue";
import CheckOut from '../../components/Security-Guard/CheckOut.vue';
import { ImageService } from "../../api/UploadImage";

export default {
    setup() {
        const store = useStore();
        const lp = new LPService();
        const imgService = new ImageService();
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
            image: null,
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

                        selectedCar.value = newEntry; // อัปเดตแถวกลาง

                        await saveHistory(newEntry);
                    }
                } catch (error) {
                    console.error("❌ JSON Parse Error:", error);
                }
            };

            ScreenSocket.onerror = (error) => console.error('WebSocket Error:', error)

            ScreenSocket.onclose = () => {
                console.log('🔴 WebSocket Closed');
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

        //NOTE - Print Form
        const printForm = async () => {
            await nextTick(); // รอให้ Vue อัปเดต DOM
            const formContainer = document.getElementById("form-container");
            const qrCanvas = formContainer.querySelector("canvas");

            if (qrCanvas) {
                const qrImageUrl = qrCanvas.toDataURL("image/png");
                console.log("QR Code Image URL:", qrImageUrl); // เช็คว่าภาพถูกต้องไหม

                const qrImg = document.createElement("img");
                qrImg.src = qrImageUrl;
                qrImg.style.width = "100px";
                qrImg.style.height = "100px";

                qrCanvas.replaceWith(qrImg);
            }

            const formContent = formContainer.innerHTML;
            const printWindow = window.open('', '', 'height=600,width=800');
            printWindow.document.write('<html><head><title>Visitor</title>');
            printWindow.document.write('<style>');
            printWindow.document.write('@media print {');
            printWindow.document.write('body { font-family: Arial, sans-serif; text-align: center; }');
            printWindow.document.write('@page { size: 72.1mm 3276mm; margin: 0; }');
            printWindow.document.write('div { max-width: 72.1mm; margin: 0 auto; padding-right: 1mm;}');
            printWindow.document.write('footer { position: fixed; bottom: 0; width: 100%; text-align: center; }');
            printWindow.document.write('.v-row { display: flex; flex-wrap: wrap; justify-content: space-between; }');
            printWindow.document.write('.v-col { flex: 0 0 45%; margin-bottom: 5px; }'); // จัดระเบียบ v-col
            printWindow.document.write('</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write(formContent);
            printWindow.document.write('</body></html>');
            printWindow.document.close();

            printWindow.onload = () => {
                printWindow.print();
            };

            printWindow.onafterprint = () => {
                printWindow.close();
            };
        };

        const submit = async (event) => {
            const res = await event
            if (res.valid === true) {
                const formdata = new FormData();
                formdata.append('image', sendData.value.image)
                await imgService.uploadimg(formdata).then(async (res) => {
                    if (res.message === 'ok') {
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
                            personImgUrl: res.data.filePath,
                            cdataId: sendData.value._id,
                            timeStamp: sendData.value.time
                        }
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
                                await printForm();
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
                                document.getElementById('Photo').src = "/Logo-Sunsweet-Final_White.svg";
                            } else if (res.data.message === 'validate error') {
                                Swal.fire({
                                    title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                                    icon: 'warning',
                                })
                            } else if (res.data.message === 'This license has been added') {
                                Swal.fire({
                                    title: 'มีข้อมูลป้ายทะเบียนนี้แล้ว !',
                                    text: 'กรุณาลองใหม่อีกครั้ง',
                                    icon: 'warning',
                                    showConfirmButton: true,
                                    confirmButtonColor: '#E53935',
                                })
                            } else {
                                Swal.fire({
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
                    } else {
                        Swal.fire({
                            title: 'ไม่สามารถอัพโหลดรูปภาพได้ !',
                            text: 'กรุณาลองใหม่อีกครั้ง',
                            icon: 'warning',
                        })
                        console.log("Error : ", res.data)
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
                // console.log(`🚗 ลบรายการ ID: ${id} ออกจาก IndexedDB แล้ว`);

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

            const deletePromises = allEntries
                .filter(entry => entry.expireTime < currentTime)
                .map(entry => store.delete(entry.id));

            await Promise.all(deletePromises);
            // console.log("🚗 ลบรายการที่หมดอายุเรียบร้อย");

            await loadTodayHistory();
            // console.log("ตรวจสอบเสร็จสิ้น");
        };


        const reconnectWebSocket = () => {
            console.log('กำลังเชื่อมต่ออีกครั้ง กรุณารอสักครู่...');
            if (navigator.onLine) {
                connectScreen();
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


        //NOTE - สำหรับอ่านบัตรประชาชน
        let wSocket = ref(null);
        let debugFlag = ref(true);
        let data = ref(null);
        let ReaderData = ref({});
        let loading = ref(false);

        const initWebsocket = () => {
            wSocket = new WebSocket("ws://localhost:14820/TDKWAgent");
            wSocket.onopen = function () {
                if (debugFlag) {
                    console.log("Card Reader is connected.");
                }
            }
            wSocket.onmessage = (evt) => onGetMessage(evt.data);
            wSocket.onclose = (evt) => {
                if (debugFlag) {
                    console.log("WebSocket: onclose() event called." + evt);
                }
            }
            wSocket.onerror = (evt) => {
                if (debugFlag) {
                    console.log("WebSocket: onerror() event called." + evt);
                }
            };
        }

        const wSocketSend = (json_Str) => {
            if (debugFlag) {
                console.log(">" + JSON.parse(json_Str).Command);
            }
            wSocket.send(json_Str);
        }

        const GetAutoReadOptions = () => {
            const JS_OBJ = {
                command: "GetAutoReadOptions",
            };
            const jsonStr = JSON.stringify(JS_OBJ);
            wSocketSend(jsonStr);
        }

        const setAutoReadOptions = () => {
            const JS_OBJ = {
                Command: "SetAutoReadOptions",
                AutoRead: true,
                IDNumberRead: false,
                IDTextRead: true,
                IDATextRead: false,
                IDPhotoRead: true,
            };
            const jsonStr = JSON.stringify(JS_OBJ);
            console.log("auto setup : ", jsonStr);
            wSocketSend(jsonStr);
            GetAutoReadOptions();
        }

        const getReaderlist = () => {
            const JS_OBJ = {
                Command: "GetReaderList",
            };
            const jsonStr = JSON.stringify(JS_OBJ);
            wSocketSend(jsonStr);
        }

        const selectReader = () => {
            const JS_OBJ = {
                Command: "SelectReader",
                ReaderName: "Identiv uTrust 2700 R Smart Card Reader 0",
            };
            const jsonStr = JSON.stringify(JS_OBJ);
            wSocketSend(jsonStr);
        }

        //NOTE - GET ข้อมูลแบบกดเอง (Manual) เอาไปใส่ปุ่มอะไรประมาณนั้น
        const readIDCard = () => {
            selectReader();
            const JS_OBJ = {
                Command: "ReadIDCard",
                IDNumberRead: false,
                IDTextRead: true,
                IDATextRead: false,
                IDPhotoRead: true,
            };
            const jsonStr = JSON.stringify(JS_OBJ);
            wSocketSend(jsonStr);
        }

        const onGetMessage = (jsonString) => {
            const msgObj = JSON.parse(jsonString);

            if (msgObj.Message != "ReadingProgressE" && msgObj.Message != "CardStatusChangeE") {
                if (debugFlag) {
                    console.log("<" + msgObj.Message + "(" + msgObj.Status + ")");
                }
            }

            if (msgObj.Message === "AgentStatusE") {
                if (msgObj.Status === 1) {
                    setAutoReadOptions();
                    getReaderlist();
                } else {
                    Swal.fire({
                        title: 'มีบางอย่างผิดพลาด !',
                        icon: 'error',
                    })
                }

            }

            //NOTE - Response หลังจาก อ่านบัตรอัตโนมัติ
            if (msgObj.Message == "AutoReadIDCardE") {
                // stopTimer();
                data.value = JSON.parse(JSON.stringify(msgObj));
                ReaderData.value = parseIDText(data.value.ID_Text);
                putimagtoScreen(data.value.ID_Photo);
                putDatatoSendData(ReaderData.value);
                console.log("ReaderData : ", ReaderData.value);
            }

            //NOTE - Response หลังจาก กดอ่านบัตร เอง
            if (msgObj.Message == "ReadIDCardR") {
                // stopTimer();
                data.value = JSON.parse(JSON.stringify(msgObj));
                ReaderData.value = parseIDText(data.value.ID_Text);
                putimagtoScreen(data.value.ID_Photo);
                putDatatoSendData(ReaderData.value);
                console.log("ReaderData : ", ReaderData.value);
            }

            if (msgObj.Message == "ReadingProgressE") {
                loading.value = true;
                if (msgObj.Status == 0) {
                    if (debugFlag) {
                        console.log(
                            "<ReadingProgressE" +
                            "(" +
                            msgObj.Status +
                            "): " +
                            msgObj.Progress +
                            "%"
                        );
                    }
                    if (msgObj.Progress === 100) {
                        loading.value = false;
                    }
                }
                if (msgObj.Status == -1 || msgObj.Status == -1001) {
                    Swal.fire({
                        title: 'มีบางอย่างผิดพลาด !',
                        text: 'กรุณาลองใหม่อีกครั้ง',
                        icon: 'error',
                        showConfirmButton: true,
                    })
                }
            }

            if (msgObj.Status === -1004) {
                Swal.fire({
                    title: 'ไม่สามารถดึงข้อมูลจากบัตรได้ !',
                    text: 'กรุณาลองใหม่อีกครั้ง',
                    icon: 'error',
                    showConfirmButton: true,
                    confirmButtonColor: '#E53935',
                })
            } else if (msgObj.Status == -16) {
                Swal.fire({
                    title: 'ไม่พบบัตรในเครื่องอ่าน !',
                    text: 'กรุณาลองใหม่อีกครั้ง',
                    icon: 'warning',
                    showConfirmButton: true,
                    confirmButtonColor: '#E53935',
                })
            } else if (msgObj.Status == -7) {
                Swal.fire({
                    title: 'บัตรที่อ่านไม่ใชบัตรประชชน !',
                    text: 'กรุณาลองใหม่อีกครั้ง',
                    icon: 'error',
                    showConfirmButton: true,
                    confirmButtonColor: '#E53935',
                })
            }
        }

        //NOTE - ตัวแปลงค่าจากเครื่องอ่านบัตร
        const parseIDText = (idText) => {
            const keys = [
                "idNumber", "titleTh", "firstNameTh", "", "lastNameTh",
                "titleEn", "firstNameEn", "", "lastNameEn",
                "houseNo", "villageNo", "", "", "roadOrVillage", "subDistrict",
                "district", "province", "gender", "birthDate",
                "issueAt", "issueDate", "expiryDate", "laserCode"
            ];

            // แยกข้อมูลด้วย "#"
            const rawData = idText.split("#").map(item => item.trim());

            // สร้าง object โดย map ข้อมูลเข้ากับ keys
            const data = rawData.reduce((obj, val, index) => {
                if (keys[index]) obj[keys[index]] = val || "";
                return obj;
            }, {});

            // ดึงค่าที่อยู่โดยตรงจาก keys
            const addressParts = [
                data.houseNo,
                data.roadOrVillage,
                data.subDistrict,
                data.district,
                data.province
            ].filter(Boolean); // กรองค่าที่ว่างออก

            const address = addressParts.join(" ");

            // รวมชื่อ
            const name = `${data.firstNameTh} ${data.lastNameTh}`;

            return {
                name,
                address,
                identityNumber: data.idNumber
            };
        };

        //NOTE - ตัวแปลงข้อมูลรูปภาพ
        const putimagtoScreen = (IDPhoto) => {
            var base64str = IDPhoto;
            const fileName = "image.jpg"
            sendData.value.image = base64Tofile(base64str, fileName);
            console.log(sendData.value)
            var photo = document.getElementById("Photo");  // เลือก element img ที่มี id = "Photo"

            if (base64str != null && base64str !== "") {
                // กรณีที่ Base64 string ถูกต้อง
                photo.setAttribute(
                    "src",
                    "data:image/png;base64," + base64str
                );
            } else {
                // กรณีที่ไม่มี Base64 หรือค่าภาพเป็น null ให้แสดงภาพปกติ
                photo.src = "/Logo-Sunsweet-Final_White.svg";
            }

            if (debugFlag) {
                console.log("Reading is finished");
            }
        }

        const putDatatoSendData = (data) => {
            sendData.value.name = data.name;
            sendData.value.identityNumber = data.identityNumber;
            sendData.value.address = data.address;
        }

        const base64Tofile = (base64String, fileName) => {
            const base64Data = `data:image/png;base64, ${base64String}`
            const byteStr = atob(base64Data.split(',')[1]); // แปลง Base64 เป็น binary
            const mimeType = base64Data.split(',')[0].split(':')[1].split(';')[0]; // ดึง MIME type
            const arrayBuffer = new ArrayBuffer(byteStr.length);
            const uintArray = new Uint8Array(arrayBuffer);

            for (let i = 0; i < byteStr.length; i++) {
                uintArray[i] = byteStr.charCodeAt(i);
            }

            return new File([arrayBuffer], fileName, { type: mimeType });
        }

        onMounted(() => {
            loadTodayHistory() // โหลดข้อมูลของวันนี้ก่อน
            connectScreen() // เริ่มเชื่อมต่อ WebSocket
            checkExpire() // ตรวจสอบข้อมูลที่หมดอายุ
            setInterval(checkExpire, 60000); // ตรวจสอบทุกๆ 1 นาที

            initWebsocket();
        })

        const selectCar = (entry) => {
            selectedCar.value = { ...entry } // กดเลือกรายการ -> อัปเดตแถวกลาง
            sendData.value = JSON.parse(JSON.stringify(entry));
            document.getElementById('Photo').src = "/Logo-Sunsweet-Final_White.svg";
        }

        const resetSendData = () => {
            sendData.value.name = '';
            sendData.value.identityNumber = '';
            sendData.value.address = '';
        }

        return {
            baseUrl,
            recentEntries,
            selectedCar,
            selectCar,
            formatitemdevice,
            deleteEntry,
            lp,
            toRaw,
            submit,
            sendData,
            dateFormat,
            readIDCard,
            loading,
            resetSendData,
            dateFormatValue,
            dateFormatDayandTime,
            imgService
        }
    },
    components: {
        QrcodeVue,
        CheckOut,
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
