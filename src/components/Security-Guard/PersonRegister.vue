<template>
    <div class="pa-5">
        <v-row>
            <!-- ################################################## -->
            <!-- //NOTE - Capture ผู้มาติดต่อแบบไม่บังคับ -->
            <v-col cols="6" class="py-0 pl-0">
                <v-sheet class="pa-0" style="background-color: #FAFAFA;">
                    <v-toolbar density="comfortable" color="primary">
                        <v-toolbar-title>
                            <p style="height:50px; font-size: 22px; font-weight: bold;" class="d-flex align-center">
                                <v-icon size="small" class="mr-2">mdi-camera</v-icon>รูปผู้ติดต่อ
                            </p>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card class="pa-4" style="background-color: #FAFAFA; color: black;">
                        <v-row class="align-center">
                            <v-col cols="9" class="py-0 d-flex align-center">
                                <p style="font-size: 20px;" class="mb-0 font-weight-bold">
                                    <v-icon color="#3949AB" icon="mdi-camera-account" size="small"
                                        class="mr-2"></v-icon>
                                    กรุณาถ่ายรูปผู้มาติดต่อ (ไม่บังคับ)
                                </p>
                            </v-col>
                            <v-col cols="3" class="py-0 d-flex justify-end align-center">
                                <span class="mr-2" :style="{ color: isCameraOn ? 'green' : 'red' }">
                                    {{ isCameraOn ? 'เปิด' : 'ปิด' }}
                                </span>
                                <v-switch v-model="isCameraOn" hide-details color="green" inset></v-switch>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" class="py-0">
                                <video v-show="!isCaptured" ref="videoPerson" autoplay playsinline
                                    style="width: 100%; max-width: 500px; border: 2px solid grey; border-radius: 10px;"></video>

                                <canvas ref="canvasPerson" style="display: none;"></canvas>
                            </v-col>
                        </v-row>

                        <div class="pt-5 d-flex justify-center">
                            <v-btn size="large" block @click="captureImage" color="primary" v-if="!isCaptured">
                                <v-icon icon="mdi-camera-iris" class="mr-2"></v-icon>
                                ถ่ายรูป
                            </v-btn>

                            <v-btn size="large" block @click="retakeImage" color="secondary" v-else>
                                <v-icon icon="mdi-restart" size="small" class="mr-2"></v-icon>
                                ลองใหม่อีกครั้ง
                            </v-btn>
                        </div>

                        <div class="pt-5" v-if="capturedImagePerson">
                            <p style="font-size: 20px;font-weight: bold;">
                                <v-icon icon="mdi-camera-image" size="small" class="mr-2" color="#00897B"></v-icon>
                                ตัวอย่างรูปภาพ
                            </p>
                            <v-img :src="capturedImagePerson" class="mt-4" width="100%"
                                style="border: 1px solid grey; border-radius: 10px;" />
                        </div>
                    </v-card>
                </v-sheet>
            </v-col>
            <!-- ################################################## -->


            <!-- ################################################## -->
            <!-- //NOTE - Form Register Stranger w/out CAR -->
            <v-col cols="6" class="py-0 pr-0">
                <v-sheet width="100%" height="100%" class="pa-0" style="background-color: #FAFAFA;">
                    <v-toolbar density="comfortable" style="background-color: #3949AB; font-size: 20px;">
                        <v-toolbar-title>
                            <p style="font-size: 22px; font-weight: bold;" class="d-flex align-center">
                                <v-icon size="small" class="mr-2">mdi-file-document-edit-outline</v-icon>ลงทะเบียน
                            </p>
                        </v-toolbar-title>
                        <template v-slot:extension>
                            <v-tabs v-model="activeTab" align-tabs="center">
                                <v-tab value="id">
                                    <p style="font-size: 18px; font-weight: bold;">บัตรประชาชน
                                    </p>
                                </v-tab>
                                <v-tab value="license">
                                    <p style="font-size: 18px; font-weight: bold;">ใบขับขี่</p>
                                </v-tab>
                                <v-tab value="person">
                                    <p style="font-size: 18px; font-weight: bold;">เอกสารอื่น ๆ</p>
                                </v-tab>
                            </v-tabs>
                        </template>
                    </v-toolbar>
                    <v-card class="pa-4" style="background-color: #FAFAFA; color: black;">
                        <v-tabs-window v-model="activeTab" :key="activeTab">

                            <!-- //NOTE - form ของ บัตรประชาชน -->
                            <v-tabs-window-item value="id">
                                <!-- @submit.prevent="submit" -->
                                <v-form fast-fail>
                                    <v-col cols="12" class="pb-0 pr-0">
                                        <v-row class="pa-3">
                                            <v-col cols="5" lg="5" class="pa-0">
                                                <p style="font-size: 20px; font-weight: bold;"
                                                    class="d-flex align-center">
                                                    <v-icon icon="mdi-card-account-details" size="small"
                                                        class="mr-2"></v-icon>ข้อมูลผู้ติดต่อ
                                                </p>
                                            </v-col>
                                            <v-col cols="7" class="pa-0 text-end">
                                                <v-btn :ripple="false" class="ml-2" color="black" variant="text"
                                                    icon="mdi-refresh" size="small" @click="resetSendData"></v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-row class="pb-2 px-3 overflow-y-auto" style="max-height: 600px;">
                                        <v-col cols="12" lg="5">
                                            <p>รูปภาพ</p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="d-flex align-center justify-center">
                                            <img id="Photo" src="../../assets/Logo-Sunsweet-Final.svg" alt="image"
                                                style="width: 130px;">
                                        </v-col>
                                        <v-col cols="12" lg="5" class="text-start pt-2">
                                            <p>เลขประจำตัวประชาชน</p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field placeholder="ระบุเลขประจำตัวประชาชน" variant="outlined"
                                                density="compact" v-model="sendData.identityNumber"
                                                :rules="[v => !!v || 'โปรดระบุเลขบัตรประจำตัว', v => /^[0-9]{1,13}$/.test(v) || 'กรุณาระบุเลขบัตร 13 หลัก']"
                                                required maxlength="13" hide-details="auto"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" lg="5" class="text-start pt-2">
                                            <p>ชื่อ-นามสกุล</p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field density="compact" variant="outlined"
                                                placeholder="ระบุชื่อ-นามสกุล" v-model="sendData.name"
                                                :rules="sendData.name ? [] : [v => !!v || 'โปรดระบุชื่อ-นามสกุล']"
                                                required hide-details="auto"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" lg="5" class="pt-2">
                                            <p>เบอร์โทรศัพท์</p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field type="tel" density="compact" variant="outlined"
                                                placeholder="ระบุเบอร์โทรศัพท์" v-model="sendData.tel"
                                                hide-details="auto" :rules="[
                                                    v => !!v || 'กรุณาระบุเบอร์โทรศัพท์',
                                                    v => /^[0-9]*$/.test(v) || 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
                                                ]" maxlength="10"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" lg="5" class="pt-2">
                                            <p>ที่อยู่</p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 d-flex align-top">
                                            <v-textarea variant="outlined" placeholder="ระบุที่อยู่" rows="2"
                                                v-model="sendData.address"
                                                :rules="sendData.address ? [] : [v => !!v || 'โปรดระบุที่อยู่']"
                                                required auto-grow></v-textarea>
                                        </v-col>
                                        <v-col cols="12" lg="5" class="pt-2">
                                            <p>จากบริษัท
                                                <span style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                            </p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field variant="outlined" density="compact" v-model="sendData.agency"
                                                hide-details="auto" placeholder="ระบุหน่วยงาน"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" lg="5" class="pt-2">
                                            <p>
                                                จำนวนผู้มาติดต่อ
                                                <span style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                            </p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field variant="outlined" density="compact"
                                                v-model="sendData.totalVisitor" hide-details="auto"
                                                placeholder="ระบุจำนวนผู้มาติดต่อ"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" lg="5" class="pt-2">
                                            <p>
                                                ติดต่อแผนก/คุณ
                                                <span style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                            </p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field variant="outlined" density="compact"
                                                v-model="sendData.contactPerson" hide-details="auto"
                                                placeholder="ระบุชื่อผู้รับการติดต่อ"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" lg="5" class="pt-2">
                                            <p>
                                                วัตถุประสงค์
                                                <span style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                            </p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field variant="outlined" density="compact" v-model="sendData.object"
                                                hide-details="auto" placeholder="ระบุวัตถุประสงค์"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-card-actions class="px-0">
                                        <v-btn variant="flat"
                                            :disabled="sendData?.msg === 'บุคคลภายใน' || sendData?.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'"
                                            type="submit" color="#66BB6A" width="100%" class="mt-4"
                                            size="large">บันทึกขาเข้า
                                            <v-icon class="ml-2">mdi-tray-arrow-down</v-icon></v-btn>
                                    </v-card-actions>
                                    <CheckOut @update="getData()" />
                                </v-form>
                            </v-tabs-window-item>

                            <!-- //NOTE - form ของ ใบขับบี่ -->
                            <v-tabs-window-item value="license">
                                <!-- @submit.prevent="submitBylicenseId" -->
                                <v-form fast-fail>
                                    <v-row class=" pb-2 px-3">
                                        <v-col cols="12" class="pb-0 pr-0">
                                            <p style="font-size: 20px; font-weight: bold;" class="d-flex align-center">
                                                <v-icon icon="mdi-card-account-details" size="small"
                                                    class="mr-2"></v-icon>ข้อมูลผู้ติดต่อ
                                                <v-spacer></v-spacer>
                                                <v-btn :ripple="false" class="ml-2" color="black" variant="text"
                                                    icon="mdi-refresh" size="small" @click="resetSendData"></v-btn>
                                            </p>
                                        </v-col>
                                        <v-col cols="12" lg="5" class="text-start pt-2">
                                            <p>เลขประจำตัวประชาชน</p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field placeholder="ระบุเลขประจำตัวประชาชน" variant="outlined"
                                                density="compact" v-model="sendData.identityNumber"
                                                :rules="[v => !!v || 'โปรดระบุเลขบัตรประจำตัว', v => /^[0-9]{1,13}$/.test(v) || 'กรุณาระบุเลขบัตร 13 หลัก']"
                                                required maxlength="13" hide-details="auto"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" lg="5" class="text-start pt-2">
                                            <p>ชื่อ-นามสกุล</p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field density="compact" variant="outlined"
                                                placeholder="ระบุชื่อ-นามสกุล" v-model="sendData.name"
                                                :rules="sendData.name ? [] : [v => !!v || 'โปรดระบุชื่อ-นามสกุล']"
                                                required hide-details="auto"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" lg="5" class="pt-2">
                                            <p>เบอร์โทรศัพท์</p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field type="tel" density="compact" variant="outlined"
                                                placeholder="ระบุเบอร์โทรศัพท์" v-model="sendData.tel"
                                                hide-details="auto" :rules="[
                                                    v => !!v || 'กรุณาระบุเบอร์โทรศัพท์',
                                                    v => /^[0-9]*$/.test(v) || 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
                                                ]" maxlength="10"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" lg="5" class="pt-0">
                                            <p>เลขที่ใบขับขี่</p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 d-flex align-top">
                                            <v-text-field density="compact" variant="outlined"
                                                placeholder="ระบุเลขที่ใบขับขี่" v-model="sendData.licenseId"
                                                :rules="sendData.licenseId ? [] : [v => !!v || 'โปรดระบุเลขที่ใบขับขี่']"
                                                required hide-details="auto"></v-text-field>
                                        </v-col>
                                        <v-col class="pa-0">
                                            <v-textarea class="hidden-textarea" auto-grow ref="inputField"
                                                v-model="dataLicense"></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-divider class="mt-8" :thickness="2"></v-divider>
                                    <v-card-actions class="px-0">
                                        <v-btn variant="flat"
                                            :disabled="sendData?.msg === 'บุคคลภายใน' || sendData?.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'"
                                            type=" submit" color="#66BB6A" width="100%" class="mt-4"
                                            size="large">บันทึกขาเข้า
                                            <v-icon class="ml-2">mdi-tray-arrow-down</v-icon></v-btn>
                                    </v-card-actions>
                                    <CheckOut @update="getData()" />
                                </v-form>
                            </v-tabs-window-item>

                            <v-tabs-window-item value="person">
                                <v-form fast-fail @submit.prevent="submitWOther">
                                    <v-row>
                                        <v-col>
                                            <p style="font-size: 20px; font-weight: bold;"
                                                class="d-flex align-center pb-4">
                                                <v-icon icon="mdi-camera-plus" color="#3949AB" size="small"
                                                    class="mr-2" />
                                                กรุณาถ่ายรูปบัตร หรือเอกสารอื่น ๆ
                                            </p>

                                            <v-row>
                                                <v-col cols="12" class="py-2">
                                                    <!-- ✅ แสดง video เฉพาะตอนยังไม่ถ่าย -->
                                                    <video v-show="!isCapturedDoc" ref="videoRef" autoplay playsinline
                                                        width="100%"
                                                        style="border: 2px solid grey; border-radius: 10px;" />
                                                    <canvas ref="canvasRef" style="display: none;" />
                                                </v-col>
                                            </v-row>

                                            <div class="pt-5 d-flex justify-center">
                                                <v-btn size="large" block @click="capture()" color="primary"
                                                    v-if="!isCapturedDoc">
                                                    <v-icon icon="mdi-camera-iris" class="mr-2"></v-icon>
                                                    ถ่ายรูป
                                                </v-btn>

                                                <v-btn size="large" block @click="retakeDocImage()" color="secondary"
                                                    v-else>
                                                    <v-icon icon="mdi-restart" size="small" class="mr-2"></v-icon>
                                                    ลองใหม่อีกครั้ง
                                                </v-btn>
                                            </div>

                                            <div class="pt-5" v-if="capturedImage">
                                                <p style="font-size: 20px; font-weight: bold;"
                                                    class="d-flex align-center pb-4">
                                                    <v-icon icon="mdi-camera-image" size="small" class="mr-2"
                                                        color="#00897B" />
                                                    ตัวอย่างรูปภาพ
                                                </p>
                                                <!-- ✅ แสดงรูปภาพที่ถ่าย -->
                                                <img v-if="capturedImage" :src="capturedImage" alt="Captured image"
                                                    width="100%" style="border: 1px solid grey; border-radius: 10px;" />
                                            </div>

                                            <v-btn variant="flat"
                                                :disabled="sendData?.msg === 'บุคคลภายใน' || sendData?.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'"
                                                type="submit" color="#66BB6A" width="100%" class="mt-4" size="large">
                                                บันทึกขาเข้า
                                                <v-icon class="ml-2">mdi-tray-arrow-down</v-icon>
                                            </v-btn>
                                            <CheckOut @update="getData()" />
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-card>
                </v-sheet>
            </v-col>
            <!-- ################################################## -->
        </v-row>
    </div>
</template>

<script>
import { ref, onMounted, toRaw, nextTick, watch, computed, defineComponent, getCurrentInstance, onBeforeUnmount } from 'vue'
import Swal from "sweetalert2";
import { useStore } from 'vuex';
import { ImageService } from "../../api/UploadImage";
import { formatitemdevice, dateFormat, dateFormatValue, dateFormatDayandTime, datetimeFormatLimit } from '../../function/day'
import CheckOut from './CheckOut.vue'
import { CdataService } from '../../api/Cdata';
export default {
    components: {
        CheckOut,
    },
    setup() {
        const cdata = new CdataService();
        const store = useStore();
        const imgService = new ImageService();
        const baseUrl = import.meta.env.VITE_APP_BASE_URL
        const activeTab = ref({
            id: true,
            license: false,
            person: false,
        });
        const sendData = ref({
            msg: '',
            licensePlate: { License: '' },
            vehicleType: 'TRUCK',
            time: new Date(),
            name: '',
            identityNumber: '',
            address: '',
            image: null,
            licenseId: '',
            tel: '',
            agency: '',
            object: '',
            contactPerson: '',
            totalVisitor: 1,
        });
        const dataLicense = ref('');
        const inputField = ref(null);
        const sendDataLicense = ref({
            name: '',
            identityNumber: '',
            licenseId: '',
        })

        watch(dataLicense, (newVal) => {

            console.log("📌 dataLicense เปลี่ยนค่า:", newVal);
            // ถ้ามีการเปลี่ยนค่าใหม่ ให้ยกเลิกการทำงานของฟังก์ชันก่อนหน้า
            clearTimeout(timer);

            timer = setTimeout(() => {
                if (newVal) {
                    parseDriverLicenseData(newVal);
                }
            }, 800);
        });

        // ฟังก์ชันแยกข้อมูลจากเครื่องอ่านใบขับขี่
        const parseDriverLicenseData = (input) => {
            const lines = input.split("\n");

            let foundName = false;
            let foundId = false;
            let foundLicenseId = false;

            for (const line of lines) {
                // ตรวจสอบและแยกชื่อ-นามสกุล
                if (!foundName && line.startsWith("%")) {
                    const match = line.match(/\^([A-Za-z]+)\$([A-Za-z]+)\$/);
                    if (match) {
                        sendData.value.name = `${match[2]} ${match[1]}`;
                        foundName = true;
                    }
                }

                // ตรวจสอบและแยกเลขประจำตัวประชาชน
                else if (!foundId && line.startsWith(";")) {
                    const match = line.match(/;600764(\d{13})=/);
                    if (match) {
                        sendData.value.identityNumber = match[1];
                        foundId = true;
                    }
                }

                // ตรวจสอบและแยกเลขที่ใบขับขี่
                else if (!foundLicenseId && line.startsWith("+")) {
                    const match = line.match(/(\d{7,8})\s*\d+/);
                    if (match) {
                        sendData.value.licenseId = match[1];
                        foundLicenseId = true;
                    }
                }
            }

            // 🔍 เงื่อนไข fallback ถ้า pattern ปกติไม่ match:
            if (!foundId) {
                const idMatch = input.match(/(\d{13})/);
                if (idMatch) {
                    sendData.value.identityNumber = idMatch[1];
                }
            }

            if (!foundLicenseId) {
                const licenseMatch = input.match(/(?:\D|^)(\d{7,8})(?:\D|$)/);
                if (licenseMatch) {
                    sendData.value.licenseId = licenseMatch[1];
                }
            }

            if (!foundName) {
                // fallback แบบง่าย: หาชื่อจาก $NAME SURNAME?
                const nameMatch = input.match(/\$([A-Z]+)\s+([A-Z]+)[^A-Z]?/);
                if (nameMatch) {
                    sendData.value.name = `${nameMatch[1]} ${nameMatch[2]}`;
                }
            }

            console.log("✅ แยกค่าสำเร็จ:", {
                name: sendData.value.name,
                identityNumber: sendData.value.identityNumber,
                licenseId: sendData.value.licenseId,
            });

            // ล้าง textarea
            dataLicense.value = "";

            // โฟกัสกลับไปที่ input
            setTimeout(() => {
                inputField.value?.focus();
            }, 100);
        };

        //NOTE - Function submit for IdentityNumber
        const submit = async (event) => {
            const res = await event
            if (res.valid === true) {
                const formdata = new FormData();
                formdata.append('image', sendData.value.image)
                await imgService.uploadimg(formdata).then(async (res) => {
                    if (res.message === 'ok') {
                        let CheckToken = '';
                        if (store.state.role === 'security') {
                            CheckToken = localStorage.getItem('retoken');
                        } else {
                            CheckToken = localStorage.getItem('token');
                        }
                        const token = CheckToken;
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
                            timeStamp: sendData.value.time,
                            visitorTel: sendData.value.tel,
                        }
                        console.log("Data in submit", data)
                        // await lp.CreateLP(park, data, token).then(async (res) => {
                        //     if (res.message === 'ok' || res.data.message === 'This license has been added') {
                        //         Swal.fire({
                        //             icon: 'success',
                        //             title: `บันทึกข้อมูลสำเร็จ!`,
                        //         });
                        //         await printForm();
                        //         await deleteFromIndexedDB(sendData.value.id);
                        //         sendData.value = {
                        //             msg: '',
                        //             licensePlate: { License: '' },
                        //             vehicleType: 'TRUCK',
                        //             time: new Date(),
                        //             name: '',
                        //             identityNumber: '',
                        //             address: '',
                        //             tel: '',
                        //         };
                        //         document.getElementById('Photo').src = "/Logo-Sunsweet-Final.svg";
                        //         proxy.getData();
                        //     } else if (res.data.message === 'validate error') {
                        //         Swal.fire({
                        //             title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                        //             icon: 'warning',
                        //         })
                        //     }
                        //     // else if (res.data.message === 'This license has been added') {
                        //     //     Swal.fire({
                        //     //         title: 'มีข้อมูลป้ายทะเบียนนี้แล้ว !',
                        //     //         text: 'กรุณาลองใหม่อีกครั้ง',
                        //     //         icon: 'warning',
                        //     //         showConfirmButton: true,
                        //     //         confirmButtonColor: '#E53935',
                        //     //     })
                        //     // } 
                        //     else {
                        //         Swal.fire({
                        //             icon: 'warning',
                        //             title: `มีบางอย่างผิดพลาด !`,
                        //             toast: true,
                        //             position: 'top-end',
                        //             showConfirmButton: false,
                        //             timer: 3000,
                        //             timerProgressBar: true,
                        //         });
                        //     }
                        // })
                    } else {
                        Swal.fire({
                            title: 'ไม่สามารถอัพโหลดรูปภาพได้ !',
                            html: `กรุณาลองใหม่อีกครั้ง ! <br /> ${res.data.message}`,
                            icon: 'warning',
                        });
                    }
                })
            }
        }

        //NOTE - Function submit for Driver License
        const submitBylicenseId = async (event) => {
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
                    vehicleType: sendData.value.vehicleType,
                    cate: 'stranger',
                    cdataId: sendData.value._id,
                    timeStamp: sendData.value.time,

                    driverLicenseId: sendData.value.licenseId,
                    visitorTel: sendData.value.tel,
                }
                console.log("Data in submit by licenseId", data)
                proxy.getData();
                await lp.CreateLP(park, data, token).then(async (res) => {
                    if (res.message === 'ok' || res.data.message === 'This license has been added') {
                        Swal.fire({
                            icon: 'success',
                            title: `บันทึกข้อมูลสำเร็จ!`,
                        });
                        await printForm();
                        await deleteFromIndexedDB(sendData.value.id);
                        sendData.value = {
                            msg: '',
                            licensePlate: { License: '' },
                            vehicleType: 'TRUCK',
                            time: new Date(),
                            name: '',
                            identityNumber: '',
                            address: '',
                            tel: '',
                        };
                        document.getElementById('Photo').src = "/Logo-Sunsweet-Final.svg";
                        this.getData();
                    } else if (res.data.message === 'validate error') {
                        Swal.fire({
                            title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                            icon: 'warning',
                        })
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: `มีบางอย่างผิดพลาด !`,
                            text: 'กรุณาลองใหม่อีกครั้ง',
                        });
                        console.log("Error : ", res.data)
                    }
                })
            }
        }

        let wSocket = ref(null);
        let debugFlag = ref(true);
        let data = ref(null);
        let ReaderData = ref({});

        const initWebsocket = () => {
            wSocket = new WebSocket("ws://localhost:4000");
            wSocket.onopen = function () {
                if (debugFlag) {
                    console.log("Card Reader is connected.");
                }
            }
            wSocket.onmessage = (evt) => OnGetMessageE(evt.data);

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

        const OnGetMessageE = (message) => {
            const messages = splitMessages(message);

            messages.forEach((msg) => {
                // เช็คว่าข้อความมี 'citizenId' ไหม
                if (msg.includes('citizenId')) {

                    const parsed = JSON.parse(msg);

                    console.log('[Got JSON]', parsed);
                    handleJsonData(parsed);

                } else {
                    console.log('Another Text : ', msg);
                }
            });
        };
        const handleJsonData = (msgObj) => {
            // เซฟข้อมูลเข้า data.value แบบ deep clone
            data.value = JSON.parse(JSON.stringify(msgObj));
            console.log(data.value);

            // ทำงานตามที่บอก
            ReaderData.value = data.value;
            putimagtoScreen(data.value.photo);
            putDatatoSendData(ReaderData.value);

            console.log("ReaderData:", ReaderData.value);
        };
        const splitMessages = (rawData) => {
            const messages = [];

            let buffer = '';
            let insideJson = false;
            let braceCount = 0;

            for (let i = 0; i < rawData.length; i++) {
                const char = rawData[i];

                buffer += char;

                if (char === '{') {
                    insideJson = true;
                    braceCount++;
                } else if (char === '}') {
                    braceCount--;
                    if (braceCount === 0) {
                        insideJson = false;
                        messages.push(buffer.trim());
                        buffer = '';
                    }
                } else if (!insideJson && (char === '\n' || char === '\r')) {
                    if (buffer.trim() !== '') {
                        messages.push(buffer.trim());
                    }
                    buffer = '';
                }
            }

            if (buffer.trim() !== '') {
                messages.push(buffer.trim());
            }

            return messages;
        };


        //NOTE - ตัวแปลงข้อมูลรูปภาพ
        const putimagtoScreen = (IDPhoto) => {
            var base64str = IDPhoto;
            const fileName = "image.jpg"
            sendData.value.image = base64Tofile(base64str, fileName);
            console.log("ข้อมูลหลังจากมี file : ", sendData.value)
            var photo = document.getElementById("Photo");  // เลือก element img ที่มี id = "Photo"

            if (base64str != null && base64str !== "") {
                // กรณีที่ Base64 string ถูกต้อง
                photo.setAttribute(
                    "src",
                    base64str
                );
            } else {
                // กรณีที่ไม่มี Base64 หรือค่าภาพเป็น null ให้แสดงภาพปกติ
                photo.src = "/Logo-Sunsweet-Final.svg";
            }

            if (debugFlag) {
                console.log("Reading is finished");
            }
        }

        const putDatatoSendData = (data) => {
            sendData.value.name = `${data.firstNameTH} ${data.lastNameTH}`;
            sendData.value.identityNumber = data.citizenId;
            sendData.value.address = data.address;
        }

        const base64Tofile = (base64String, fileName) => {
            // แยก Base64 String ออกเป็นส่วนที่ไม่ใช่ header
            const base64Data = base64String.split(';base64,')[1];

            // แปลง Base64 เป็น Binary Data
            const byteCharacters = atob(base64Data);

            // สร้าง Array สำหรับเก็บข้อมูลที่แปลงจาก Base64
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                const slice = byteCharacters.slice(offset, offset + 1024);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            // สร้าง Blob จากข้อมูล
            const fileBlob = new Blob(byteArrays, { type: 'image/jpeg' });

            // สร้างไฟล์จาก Blob
            const file = new File([fileBlob], fileName, { type: 'image/jpeg' });

            // Return เป็น File object
            return file;
        }

        // ################################################## //
        //NOTE - Function to Capture Card from Web Cam
        const videoRef = ref(null)
        const canvasRef = ref(null)
        const capturedImage = ref(null)
        const UPimage = ref(null)
        const MAX_SIZE = 24 * 1024

        const isCapturedDoc = ref(false) // ✅ ตัวแปรควบคุมสถานะ

        let stream = null

        watch(activeTab, async (newTab) => {
            if (newTab === 'person') {
                await nextTick()
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: true })
                    if (videoRef.value) {
                        videoRef.value.srcObject = stream
                    } else {
                        console.warn('videoRef ยังไม่พร้อมหลัง nextTick()')
                    }
                } catch (err) {
                    console.error('ไม่สามารถเปิดกล้องได้:', err)
                }
            } else {
                if (stream) {
                    stream.getTracks().forEach(track => track.stop())
                    stream = null
                }
            }
        })

        onBeforeUnmount(() => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
        })

        const compressAndConvertToFile = async (canvas) => {
            return new Promise((resolve) => {
                const tryCompress = (quality = 0.9) => {
                    canvas.toBlob((blob) => {
                        if (blob && blob.size <= MAX_SIZE) {
                            const file = new File([blob], 'captured.jpg', { type: 'image/jpeg' })
                            resolve(file)
                        } else if (quality > 0.1) {
                            tryCompress(quality - 0.1)
                        } else {
                            const file = new File([blob], 'captured.jpg', { type: 'image/jpeg' })
                            resolve(file)
                        }
                    }, 'image/jpeg', quality)
                }

                tryCompress()
            })
        }

        const capture = async () => {
            const video = videoRef.value
            const canvas = canvasRef.value
            const ctx = canvas.getContext('2d')

            canvas.width = 320
            canvas.height = 240
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

            capturedImage.value = canvas.toDataURL('image/jpeg', 0.8)

            const file = await compressAndConvertToFile(canvas)
            UPimage.value = file

            console.log('📸 ไฟล์ที่ได้:', UPimage.value)

            isCapturedDoc.value = true // ✅ แสดงรูปแทนวิดีโอ
        }

        const retakeDocImage = () => {
            capturedImage.value = null
            UPimage.value = null
            isCapturedDoc.value = false
        }

        const submitWOther = async (event) => {
            const res = await event
            if (res.valid === true) {
                if (!sendData.value._id || sendData.value._id === 'undefined') {
                    Swal.fire({
                        title: 'กรุณาเลือกทะเบียนรถ !!',
                        html: '<h2>จากทางด้านซ้ายมือ</h2>',
                        icon: 'warning',
                    });
                } else {
                    const formdata = new FormData();
                    formdata.append('image', UPimage.value)
                    await imgService.uploadimg(formdata).then(async (res) => {
                        if (res.message === 'ok') {
                            let CheckToken = '';
                            if (store.state.role === 'security') {
                                CheckToken = localStorage.getItem('retoken');
                            } else {
                                CheckToken = localStorage.getItem('token');
                            }
                            const token = CheckToken;
                            const park = store.state.park;
                            const data = {
                                // guestName: sendData.value.name,
                                licensePlate: sendData.value.licensePlate.License,
                                licensePlateProvince: '',
                                start: dateFormatValue(sendData.value.time),
                                listType: 'fixedlist',
                                expire: '2025-12-31',

                                // identityNumber: sendData.value.identityNumber,
                                // address: sendData.value.address,
                                // vehicleType: sendData.value.vehicleType,
                                cate: 'stranger',
                                personImgUrl: res.data.filePath,
                                cdataId: sendData.value._id,
                                timeStamp: sendData.value.time,
                                // visitorTel: sendData.value.tel,
                            }
                            await lp.CreateLP(park, data, token).then(async (res) => {
                                if (res.message === 'ok' || res.data.message === 'This license has been added') {
                                    Swal.fire({
                                        icon: 'success',
                                        title: `บันทึกข้อมูลสำเร็จ!`,
                                    });
                                    await printForm();
                                    await deleteFromIndexedDB(sendData.value.id);
                                    sendData.value = {
                                        msg: '',
                                        licensePlate: { License: '' },
                                        vehicleType: 'TRUCK',
                                        time: new Date(),
                                        name: '',
                                        identityNumber: '',
                                        address: '',
                                        tel: '',
                                    };
                                    UPimage.value = null;
                                    capturedImage.value = null;
                                    document.getElementById('Photo').src = "/Logo-Sunsweet-Final.svg";
                                    proxy.getData();
                                } else if (res.data.message === 'validate error') {
                                    Swal.fire({
                                        title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                                        icon: 'warning',
                                    })
                                }
                                else {
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
                                html: `กรุณาลองใหม่อีกครั้ง ! <br /> ${res.data.message}`,
                                icon: 'warning',
                            });
                        }
                    })
                }
            }
        }
        // ################################################## //

        // ################################################## //
        //NOTE - Function for Capture Person from Web Cam
        const isCameraOn = ref(true);
        const streamPerson = ref(null);
        const capturedImagePerson = ref(null);
        const videoPerson = ref(null);
        const canvasPerson = ref(null);
        const isCaptured = ref(false);

        const startCamera = async () => {
            try {
                streamPerson.value = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoPerson.value) {
                    videoPerson.value.srcObject = streamPerson.value;
                }
            } catch (error) {
                console.error('ไม่สามารถเปิดกล้องได้:', error);
            }
        }

        const stopCamera = () => {
            if (streamPerson.value) {
                streamPerson.value.getTracks().forEach(track => track.stop());
                streamPerson.value = null;
            }
        }

        const toggleCamera = () => {
            if (isCameraOn.value) {
                startCamera(); // ✅ เปิดเมื่อ switch เปิด
            } else {
                stopCamera(); // ✅ ปิดเมื่อ switch ปิด
            }
        };

        const captureImage = () => {
            const context = canvasPerson.value.getContext('2d');
            canvasPerson.value.width = videoPerson.value.videoWidth;
            canvasPerson.value.height = videoPerson.value.videoHeight;
            context.drawImage(videoPerson.value, 0, 0, canvasPerson.value.width, canvasPerson.value.height);
            capturedImagePerson.value = canvasPerson.value.toDataURL('image/jpeg');
            isCaptured.value = true; // ปิดกล้องหลังจากจับภาพ
        }

        const retakeImage = () => {
            capturedImagePerson.value = null;
            isCaptured.value = false;
        };

        onMounted(() => {
            toggleCamera();
        });

        // ปิด/เปิดกล้องเมื่อ switch เปลี่ยนค่า
        watch(isCameraOn, () => {
            toggleCamera();
        });
        // ################################################## //

        const resetSendData = () => {
            sendData.value.name = '';
            sendData.value.identityNumber = '';
            sendData.value.address = '';
            sendData.value.licenseId = '';
            sendData.value.tel = '';
        }


        onMounted(() => {
            initWebsocket();
        })

        return {
            //NOTE - API
            cdata,
            imgService,

            //NOTE - Function of IdendityNumber and Driver License
            resetSendData,
            activeTab,
            submit,
            sendData,
            baseUrl,
            inputField,
            dataLicense,
            sendDataLicense,
            submitBylicenseId,

            //NOTE - Function Format Date
            formatitemdevice,
            dateFormat,
            dateFormatValue,
            dateFormatDayandTime,
            datetimeFormatLimit,

            //NOTE - Function to Capture img from Web Cam
            videoRef,
            canvasRef,
            capturedImage,
            capture,
            submitWOther,
            retakeDocImage,
            isCapturedDoc,

            //NOTE - Function to Capture Person from Web Cam
            isCameraOn,
            streamPerson,
            capturedImagePerson,
            videoPerson,
            canvasPerson,
            captureImage,
            retakeImage,
            isCaptured,
        }
    },
    data: () => ({
    }),
    mounted() {

    },
    methods: {

    },
    beforeDestroy() {

    }
}
</script>

<style scoped>
.overflow-y-auto {
    overflow-y: auto;
}

.hidden-textarea {
    position: absolute;
    left: -9999px;
    /* ย้ายออกไปนอกหน้าจอ */
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
}
</style>