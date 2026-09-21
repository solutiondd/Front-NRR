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
                                <v-form fast-fail @submit.prevent="submit">
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
                                            <img id="PhotoPerson" src="../../assets/nrLogo.png" alt="image"
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
                                                ผู้รับการติดต่อ
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
                                                แผนกที่ต้องการติดต่อ
                                                <span style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                            </p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field variant="outlined" density="compact"
                                                v-model="sendData.department" hide-details="auto"
                                                placeholder="ระบุชื่อแผนก"></v-text-field>
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
                                <v-form fast-fail @submit.prevent="submitBylicenseId">
                                    <v-col cols="12" class="pb-0 pr-0 pb-5">
                                        <p style="font-size: 20px; font-weight: bold;" class="d-flex align-center">
                                            <v-icon icon="mdi-card-account-details" size="small"
                                                class="mr-2"></v-icon>ข้อมูลผู้ติดต่อ
                                            <v-spacer></v-spacer>
                                            <v-btn :ripple="false" class="ml-2" color="black" variant="text"
                                                icon="mdi-refresh" size="small" @click="resetSendData"></v-btn>
                                        </p>
                                    </v-col>
                                    <v-row class="overflow-y-auto pb-2 px-3" style="max-height: 600px;">
                                        <v-col cols="12" lg="5" class="text-start">
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
                                                ผู้รับการติดต่อ
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
                                                แผนกที่ต้องการติดต่อ
                                                <span style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                            </p>
                                        </v-col>
                                        <v-col cols="12" lg="7" class="pa-0 pb-2">
                                            <v-text-field variant="outlined" density="compact"
                                                v-model="sendData.department" hide-details="auto"
                                                placeholder="ระบุชื่อแผนก"></v-text-field>
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
                                    <p style="font-size: 20px; font-weight: bold;" class="d-flex align-center pb-4">
                                        <v-icon icon="mdi-camera-plus" color="#3949AB" size="small" class="mr-2" />
                                        กรุณาถ่ายรูปบัตร หรือเอกสารอื่น ๆ
                                    </p>
                                    <v-row class="overflow-y-auto" style="max-height: 600px;">
                                        <v-col>
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

                                            <v-col cols="12" lg="5" class="text-start pt-5">
                                                <p>ชื่อ-นามสกุล</p>
                                            </v-col>
                                            <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                <v-text-field density="compact" variant="outlined"
                                                    placeholder="ระบุชื่อ-นามสกุล" v-model="sendData.name"
                                                    :rules="sendData.name ? [] : [v => !!v || 'โปรดระบุชื่อ-นามสกุล']"
                                                    required hide-details="auto"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" lg="5" class="pt-2">
                                                <p>จากบริษัท
                                                    <span style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                </p>
                                            </v-col>
                                            <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                <v-text-field variant="outlined" density="compact"
                                                    v-model="sendData.agency" hide-details="auto"
                                                    placeholder="ระบุหน่วยงาน"></v-text-field>
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
                                                    ผู้รับการติดต่อ
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
                                                    แผนกที่ต้องการติดต่อ
                                                    <span style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                </p>
                                            </v-col>
                                            <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                <v-text-field variant="outlined" density="compact"
                                                    v-model="sendData.department" hide-details="auto"
                                                    placeholder="ระบุชื่อแผนก"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" lg="5" class="pt-2">
                                                <p>
                                                    วัตถุประสงค์
                                                    <span style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                </p>
                                            </v-col>
                                            <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                <v-text-field variant="outlined" density="compact"
                                                    v-model="sendData.object" hide-details="auto"
                                                    placeholder="ระบุวัตถุประสงค์"></v-text-field>
                                            </v-col>
                                        </v-col>
                                    </v-row>
                                    <v-col>
                                        <v-btn variant="flat"
                                            :disabled="sendData?.msg === 'บุคคลภายใน' || sendData?.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'"
                                            type="submit" color="#66BB6A" width="100%" class="mt-4" size="large">
                                            บันทึกขาเข้า
                                            <v-icon class="ml-2">mdi-tray-arrow-down</v-icon>
                                        </v-btn>
                                        <CheckOut @update="getData()" />
                                    </v-col>
                                </v-form>
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-card>
                </v-sheet>
            </v-col>
            <!-- ################################################## -->
        </v-row>
    </div>

    <!-- ################################################## -->
    <!-- //NOTE - Print Form -->
    <div id="app">
        <!-- <div>
            <v-btn @click="printForm()">พิมพ์ฟอร์ม</v-btn>
        </div> -->
        <div id="form-container-person" style="display: none;">
            <div style="text-align: center;padding-bottom: 10px;">
                <div style="padding-bottom: 5px;">
                    <img style="height: 90px; justify-content: center;" src="/nrLogo.png" alt="Img">
                </div>
                <div style="text-align: center; margin-bottom: 10px;">
                    <h4>สแกนขาออก</h4>
                    <qrcode-vue :value="sendData._id" :size="100" level="H" render-as="canvas"
                        :key="sendData._id"></qrcode-vue>
                    <h4 style="padding-bottom: 0px;">ใบผ่าน เข้า-ออก รหัส
                        <span style="font-weight: 400;font-size: 12px;">(No.)</span>
                        <p style="font-size: 12px;font-weight: 400;">{{ sendData._id }}</p>
                    </h4>
                </div>

                <h4>บริษัท ซันสวีท จำกัด (มหาชน)</h4>
            </div>
            <div style="text-align: start; font-size: 12px;">
                <!-- <p style="font-weight: bold;">วันที่ :
                    <span style="font-weight: 400;">
                        {{ dateFormatDayandTime(sendData.time) }}
                    </span>
                </p> -->
                <p style="font-weight: bold;">เวลาเข้า <span
                        style="font-size: 10px;color: #BDBDBD;font-weight: 300;">(Time
                        IN)</span> :
                    <span style="font-weight: 400;">
                        {{ dateFormatDayandTime(sendData.time) }} - {{ formatitemdevice(sendData.time) }}
                    </span>
                </p>

                <p style="font-weight: bold;">เวลาออก <span
                        style="font-size: 10px;color: #BDBDBD; font-weight: 300;">(Time
                        OUT)</span> :
                    <span style="display: inline-block; border-bottom: 1px solid grey; width: 100px;"></span>
                </p>

                <p style="font-weight: bold;">
                    วัตถุประสงค์ : <span style="font-weight: 400;">{{ sendData.object }}</span> <br /><span
                        style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Purpose of
                        Visit)</span>

                </p>

                <p style="font-weight: bold;">ชื่อ-นามสกุล :
                    <span style="font-weight: 400;">
                        {{ sendData.name }}
                    </span> <br />
                    <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Name-Surname)</span>
                </p>

                <p style="font-weight: bold;">จากบริษัท : <span style="font-weight: 400;">{{ sendData.agency }}</span>
                    <br /> <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(From Company)</span>
                </p>

                <p style="font-weight: bold;">จำนวนผู้มาติดต่อ : <span style="font-weight: 400;">{{
                    sendData.totalVisitor
                        }} คน</span>
                    <br /><span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Total Visitor)</span>
                </p>

                <p style="font-weight: bold;">ผู้รับการติดต่อ : <span style="font-weight: 400;">{{
                    sendData.contactPerson
                        }}</span>
                    <br /><span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Contact Person)</span>
                </p>

                <p style="font-weight: bold;">ติดต่อแผนก : <span style="font-weight: 400;">{{ sendData.department
                        }}</span>
                    <br /><span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Deparment)</span>
                </p>
            </div>

            <div style="text-align: center;font-weight: 400;font-size: 12px;">
                <p>
                    ข้าพเจ้ายินยอมให้บันทึกข้อมูลส่วนบุคคล <br> เพื่อใช้ตามวัตถุประสงค์ของบริษัทฯ
                </p>
                <p>
                    <br>
                    (<span style="display: inline-block; border-bottom: 1px solid grey; width: 150px;"> </span>)
                    <br>
                    <span>ลงชื่อผู้มาติดต่อ</span> <br>
                    <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Visitor Sign)</span>
                </p>
            </div>
            <div style="text-align: start; font-size: 12px;">
                <p>
                    ลงชื่อ ผู้รับการติดต่อ : <span
                        style="display: inline-block; border-bottom: 1px solid grey; width: 130px;"></span>
                    <br>
                    <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Contact person sign)</span>
                </p>
                <p>
                    ลงชื่อ เจ้าหน้าที่ รปภ. : <span
                        style="display: inline-block; border-bottom: 1px solid grey; width: 130px;"></span>
                    <br>
                    <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Contact person sign)</span>
                </p>
            </div>

            <div style="text-align: center; margin-top: 20px; padding-top: 10px; border-top: 1px dashed grey;">
                <img :src="qrImage" data-print-footer-qr="true" alt="QR Code" style="height: 80px; width: 80px;">
                <p style="margin-top: 6px; font-weight: bold; font-size: 12px;">กฎระเบียบบริษัทฯ</p>
            </div>
        </div>
    </div>
    <!-- ################################################## -->
</template>

<script>
import { ref, onMounted, toRaw, nextTick, watch, computed, defineComponent, getCurrentInstance, onBeforeUnmount } from 'vue'
import Swal from "sweetalert2";
import { useStore } from 'vuex';
import { ImageService } from "../../api/UploadImage";
import { formatitemdevice, dateFormat, dateFormatValue, dateFormatDayandTime, datetimeFormatLimit } from '../../function/day'
import CheckOut from './CheckOut.vue'
import { CdataService } from '../../api/Cdata';
import QrcodeVue from "qrcode.vue";
import qrImage from '../../assets/qr-code.png';
export default {
    components: {
        CheckOut,
        QrcodeVue,
    },
    emits: ['created'],
    setup(props, context) {
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
            department: '',
            _id: '',
            PersonImage: null,
            PersonCardImage: null,
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

        const resolvePrintId = (apiRes) => {
            const rawId = apiRes?.data?._id
                ?? apiRes?.data?.cdataId
                ?? apiRes?._id
                ?? apiRes?.cdataId;
            if (rawId === undefined || rawId === null) {
                return '';
            }

            const normalizedId = String(rawId).trim();
            if (!normalizedId || normalizedId === 'undefined' || normalizedId === 'null') {
                return '';
            }

            return normalizedId;
        }

        // ########################################################
        //NOTE - Function Form Print
        const printForm = async () => {
            await nextTick(); // รอให้ Vue อัปเดต DOM
            const formContainer = document.getElementById("form-container-person");
            if (!formContainer) {
                console.error('Print container not found: form-container-person');
                return;
            }
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

            const footerQrImage = formContainer.querySelector('[data-print-footer-qr="true"]');
            if (footerQrImage) {
                footerQrImage.src = new URL(qrImage, window.location.href).href;
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
            printWindow.document.write('.v-col { flex: 0 0 30%; }'); // จัดระเบียบ v-col
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
        // ########################################################

        // ########################################################
        //NOTE - Function submit for IdentityNumber
        const submit = async (event) => {
            const res = await event
            if (res.valid === true) {
                let PersonPic = null;
                if (sendData.value.image) {
                    PersonPic = sendData.value.image;
                } else {
                    PersonPic = CapturePerson.value;
                }
                const formdata = new FormData();
                formdata.append('image', PersonPic)
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
                            // licensePlate: sendData.value.licensePlate.License,
                            // licensePlateProvince: '',
                            // start: dateFormatValue(sendData.value.time),
                            // listType: 'fixedlist',
                            // expire: '2025-12-31',

                            driverLicenseId: '',
                            personCardImgUrl: '',

                            identityNumber: sendData.value.identityNumber,
                            address: sendData.value.address,
                            cate: 'stranger',
                            personImgUrl: res.data.filePath,
                            timeStamp: sendData.value.time,
                            visitorTel: sendData.value.tel,


                            agency: sendData.value.agency || '',
                            object: sendData.value.object || '',
                            contactPerson: sendData.value.contactPerson || '',
                            totalVisitor: sendData.value.totalVisitor || '',
                            department: sendData.value.department || '',
                        }
                        await cdata.Create(park, data, token).then(async (res) => {
                            if (res.message === 'ok' || res.data.message === 'This license has been added') {
                                Swal.fire({
                                    icon: 'success',
                                    title: `บันทึกข้อมูลสำเร็จ!`,
                                });
                                sendData.value._id = res.data._id
                                await printForm();
                                Object.assign(sendData.value, {
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
                                    department: '',
                                });
                                document.getElementById('PhotoPerson').src = "/nrLogo.png";
                                context.emit('created');
                            } else if (res.data.message === 'validate error') {
                                Swal.fire({
                                    title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                                    icon: 'warning',
                                })
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: `มีบางอย่างผิดพลาด !`,
                                    text: res?.data?.message || res?.message || res?.error || 'กรุณาลองใหม่อีกครั้ง',
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
        // ########################################################


        // ########################################################
        //NOTE - Function submit for Driver License
        const submitBylicenseId = async (event) => {
            const res = await event;
            if (res.valid === true) {
                let PersonPic = CapturePerson.value;

                const buildAndSendData = async (personImgUrl = '') => {
                    const token = store.state.role === 'security'
                        ? localStorage.getItem('retoken')
                        : localStorage.getItem('token');

                    const park = store.state.park;

                    const data = {
                        guestName: sendData.value.name,
                        cate: 'stranger',
                        timeStamp: sendData.value.time,
                        personImgUrl: personImgUrl,
                        driverLicenseId: sendData.value.licenseId,
                        visitorTel: sendData.value.tel,

                        identityNumber: '',
                        personCardImgUrl: '',
                        address: '',

                        agency: sendData.value.agency || '',
                        object: sendData.value.object || '',
                        contactPerson: sendData.value.contactPerson || '',
                        totalVisitor: sendData.value.totalVisitor || '',
                        department: sendData.value.department || '',
                    };

                    const cRes = await cdata.Create(park, data, token);
                    if (cRes.message === 'ok' || cRes.data.message === 'This license has been added') {
                        Swal.fire({
                            icon: 'success',
                            title: `บันทึกข้อมูลสำเร็จ!`,
                        });
                        sendData.value._id = cRes.data._id;
                        await printForm();
                        Object.assign(sendData.value, {
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
                            department: '',
                        });
                        retakeImage();
                        context.emit('created');
                    } else if (cRes.data.message === 'validate error') {
                        Swal.fire({
                            title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                            icon: 'warning',
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: `มีบางอย่างผิดพลาด !`,
                            text: cRes?.data?.message || cRes?.message || cRes?.error || 'กรุณาลองใหม่อีกครั้ง',
                        });
                        console.log("Error : ", cRes.data);
                    }
                };

                // เช็คว่ามีรูปไหม
                if (PersonPic) {
                    const formdata = new FormData();
                    formdata.append('image', PersonPic);
                    try {
                        const uploadRes = await imgService.uploadimg(formdata);
                        if (uploadRes.message === 'ok') {
                            await buildAndSendData(uploadRes.data.filePath || '');
                        } else {
                            Swal.fire({
                                title: 'ไม่สามารถอัพโหลดรูปภาพได้ !',
                                html: `กรุณาลองใหม่อีกครั้ง ! <br /> ${uploadRes.data.message}`,
                                icon: 'warning',
                            });
                        }
                    } catch (err) {
                        Swal.fire({
                            title: 'เกิดข้อผิดพลาดในการอัปโหลด!',
                            text: err.message || 'ไม่สามารถดำเนินการได้',
                            icon: 'error',
                        });
                    }
                } else {
                    // ถ้าไม่มีรูป → ส่งเลย
                    await buildAndSendData('');
                }
            }
        }
        // ########################################################

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
            var photo = document.getElementById("PhotoPerson");  // เลือก element img ที่มี id = "Photo"

            if (base64str != null && base64str !== "") {
                // กรณีที่ Base64 string ถูกต้อง
                photo.setAttribute(
                    "src",
                    base64str
                );
            } else {
                // กรณีที่ไม่มี Base64 หรือค่าภาพเป็น null ให้แสดงภาพปกติ
                photo.src = "/nrLogo.png";
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

        //NOTE - กรณีมีทั้งรูปคน และรูปบัตร
        const PersonNCard = async () => {
            try {
                //NOTE - รูปคน
                const personFormData = new FormData();
                personFormData.append('image', CapturePerson.value);
                const personUploadRes = await imgService.uploadimg(personFormData);
                if (personUploadRes.message !== 'ok') {
                    Swal.fire({
                        title: 'ไม่สามารถอัพโหลดรูปภาพได้ !',
                        html: `กรุณาลองใหม่อีกครั้ง ! <br /> ${personUploadRes.data.message}`,
                        icon: 'warning',
                    });
                    return null;
                }

                sendData.value.PersonImage = personUploadRes.data.filePath;

                //NOTE - รูปบัตร
                const cardFormData = new FormData();
                cardFormData.append('image', UPimage.value);
                const cardUploadRes = await imgService.uploadimg(cardFormData);
                if (cardUploadRes.message !== 'ok') {
                    Swal.fire({
                        title: 'ไม่สามารถอัพโหลดรูปภาพได้ !',
                        html: `กรุณาลองใหม่อีกครั้ง ! <br /> ${cardUploadRes.data.message}`,
                        icon: 'warning',
                    });
                    return null;
                }

                sendData.value.PersonCardImage = cardUploadRes.data.filePath;

                const token = store.state.role === 'security'
                    ? localStorage.getItem('retoken')
                    : localStorage.getItem('token');

                const park = store.state.park;
                const data = {
                    guestName: sendData.value.name,
                    driverLicenseId: '',
                    identityNumber: '',
                    cate: 'stranger',
                    timeStamp: sendData.value.time,
                    address: '',

                    personImgUrl: sendData.value.PersonImage,
                    personCardImgUrl: sendData.value.PersonCardImage,
                    visitorTel: sendData.value.tel,

                    agency: sendData.value.agency || '',
                    object: sendData.value.object || '',
                    contactPerson: sendData.value.contactPerson || '',
                    totalVisitor: sendData.value.totalVisitor || '',
                    department: sendData.value.department || '',
                }

                const createRes = await cdata.Create(park, data, token);
                if (createRes.message === 'ok' || createRes.data.message === 'This license has been added') {
                    Swal.fire({
                        icon: 'success',
                        title: `บันทึกข้อมูลสำเร็จ!`,
                    });
                    return createRes;
                }

                if (createRes.data.message === 'validate error') {
                    Swal.fire({
                        title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                        icon: 'warning',
                    })
                    return null;
                }

                Swal.fire({
                    icon: 'warning',
                    title: `มีบางอย่างผิดพลาด !`,
                    text: createRes?.data?.message || createRes?.message || createRes?.error || 'ไม่สามารถดำเนินการได้\nกรุณาลองใหม่อีกครั้ง !',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                return null;
            } catch (error) {
                Swal.fire({
                    title: 'เกิดข้อผิดพลาด!',
                    text: error.message || 'ไม่สามารถดำเนินการได้',
                    icon: 'error',
                });
                return null;
            }
        }

        //NOTE - กรณีมีแค่รูปคนหรือรูปบัตร
        const OnlyPersonOrCard = async () => {
            const formdata = new FormData();
            let usedImage = null;

            if (CapturePerson.value) {
                formdata.append('image', CapturePerson.value);
                usedImage = 'Capture';
            } else if (UPimage.value) {
                formdata.append('image', UPimage.value);
                usedImage = 'Upload';
            } else {
                Swal.fire({
                    title: 'ไม่พบรูปภาพ!',
                    text: 'กรุณาถ่ายรูปหรืออัปโหลดภาพก่อนส่งข้อมูล',
                    icon: 'warning',
                });
                return;
            }

            try {
                const res = await imgService.uploadimg(formdata);

                if (res.message === 'ok') {
                    // กำหนด URL ตามภาพที่ถูกใช้งาน
                    if (usedImage === 'Capture') {
                        sendData.value.PersonImage = res.filepath;
                        sendData.value.PersonCardImage = null;
                    } else if (usedImage === 'Upload') {
                        sendData.value.PersonCardImage = res.filepath;
                        sendData.value.PersonImage = null;
                    }

                    // ดำเนินการส่งข้อมูล
                    let CheckToken = store.state.role === 'security'
                        ? localStorage.getItem('retoken')
                        : localStorage.getItem('token');

                    const park = store.state.park;
                    const data = {
                        guestName: sendData.value.name,
                        driverLicenseId: '',
                        identityNumber: '',
                        cate: 'stranger',
                        timeStamp: sendData.value.time,
                        address: '',
                        visitorTel: sendData.value.tel,

                        personImgUrl: sendData.value.PersonImage,
                        personCardImgUrl: sendData.value.PersonCardImage,

                        agency: sendData.value.agency || '',
                        object: sendData.value.object || '',
                        contactPerson: sendData.value.contactPerson || '',
                        totalVisitor: sendData.value.totalVisitor || '',
                        department: sendData.value.department || '',
                    };

                    const lpRes = await cdata.Create(park, data, CheckToken);

                    if (lpRes.message === 'ok' || lpRes.data.message === 'This license has been added') {
                        Swal.fire({
                            icon: 'success',
                            title: `บันทึกข้อมูลสำเร็จ!`,
                        });
                        return lpRes;
                    } else if (lpRes.data.message === 'validate error') {
                        Swal.fire({
                            title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                            icon: 'warning',
                        });
                        return null;
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: `มีบางอย่างผิดพลาด !`,
                            text: lpRes?.data?.message || lpRes?.message || lpRes?.error || 'ไม่สามารถดำเนินการได้\nกรุณาลองใหม่อีกครั้ง !',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        return null;
                    }
                } else {
                    Swal.fire({
                        title: 'ไม่สามารถอัพโหลดรูปภาพได้ !',
                        html: `กรุณาลองใหม่อีกครั้ง ! <br /> ${res.data.message}`,
                        icon: 'warning',
                    });
                    return null;
                }
            } catch (error) {
                Swal.fire({
                    title: 'เกิดข้อผิดพลาด!',
                    text: error.message || 'ไม่สามารถดำเนินการได้',
                    icon: 'error',
                });
                return null;
            }
        }

        const submitWOther = async (event) => {
            const res = await event
            if (res.valid === true) {
                let createRes = null;
                if (CapturePerson.value && UPimage.value) {
                    createRes = await PersonNCard();
                } else {
                    createRes = await OnlyPersonOrCard();
                }

                const printId = resolvePrintId(createRes);
                if (!printId) {
                    return;
                }

                sendData.value._id = printId;
                await printForm();

                // reset ข้อมูลหลังพิมพ์
                Object.assign(sendData.value, {
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
                    department: '',
                });
                retakeImage();
                retakeDocImage();
                UPimage.value = null;
                capturedImage.value = null;
                document.getElementById('PhotoPerson').src = "/nrLogo.png";
                context.emit('created');
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
        const CapturePerson = ref(null);

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

        // const captureImage = () => {
        //     const context = canvasPerson.value.getContext('2d');
        //     canvasPerson.value.width = videoPerson.value.videoWidth;
        //     canvasPerson.value.height = videoPerson.value.videoHeight;
        //     context.drawImage(videoPerson.value, 0, 0, canvasPerson.value.width, canvasPerson.value.height);
        //     capturedImagePerson.value = canvasPerson.value.toDataURL('image/jpeg');
        //     isCaptured.value = true; // ปิดกล้องหลังจากจับภาพ
        // }

        const captureImage = async () => {
            const video = videoPerson.value;
            const canvas = canvasPerson.value;
            const ctx = canvas.getContext('2d')

            canvas.width = 320
            canvas.height = 240
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

            capturedImagePerson.value = canvas.toDataURL('image/jpeg', 0.8)

            const file = await compressAndConvertToFile(canvas)
            CapturePerson.value = file
            console.log('📸 ไฟล์ที่ได้:', CapturePerson.value)
            console.log('✅ ได้ไฟล์ขนาด', file.size, 'bytes')

            isCaptured.value = true;
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
            printForm,
            qrImage,

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