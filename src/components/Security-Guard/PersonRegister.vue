<template>
    <div class="pa-5">
        <v-sheet width="50%" height="100%" class="pa-0" style="background-color: #FAFAFA;">
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
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-card class="pa-4" style="background-color: #FAFAFA; color: black;">
                <v-tabs-window v-model="activeTab">

                    <!-- //NOTE - form ของ บัตรประชาชน -->
                    <v-tabs-window-item value="id">
                        <!-- @submit.prevent="submit" -->
                        <v-form fast-fail>
                            <v-row class="d-flex align-top pb-2 px-3">
                                <!-- <v-col v-if="loading" class="pa-2">
                                    <div>
                                        <v-progress-linear color="cyan" indeterminate></v-progress-linear>
                                    </div>
                                </v-col> -->
                                <v-col cols="12" class="pb-0 pr-0">
                                    <v-row class="pa-3">
                                        <v-col cols="5" lg="5" class="pa-0">
                                            <p style="font-size: 20px; font-weight: bold;" class="d-flex align-center">
                                                <v-icon icon="mdi-card-account-details" size="small"
                                                    class="mr-2"></v-icon>ข้อมูลคนขับ
                                            </p>
                                        </v-col>
                                        <v-col cols="7" class="pa-0 text-end">
                                            <!-- <v-btn color="primary" @click="readIDCard()"><v-icon
                                                                class="mr-2">mdi-text-box-search-outline</v-icon>อ่านข้อมูลบัตร</v-btn> -->
                                            <v-btn :ripple="false" class="ml-2" color="black" variant="text"
                                                icon="mdi-refresh" size="small" @click="resetSendData"></v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
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
                                    <v-text-field density="compact" variant="outlined" placeholder="ระบุชื่อ-นามสกุล"
                                        v-model="sendData.name"
                                        :rules="sendData.name ? [] : [v => !!v || 'โปรดระบุชื่อ-นามสกุล']" required
                                        hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="5" class="pt-2">
                                    <p>เบอร์โทรศัพท์</p>
                                </v-col>
                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                    <v-text-field type="tel" density="compact" variant="outlined"
                                        placeholder="ระบุเบอร์โทรศัพท์" v-model="sendData.tel" hide-details="auto"
                                        :rules="[
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
                                        :rules="sendData.address ? [] : [v => !!v || 'โปรดระบุที่อยู่']" required
                                        auto-grow></v-textarea>
                                </v-col>
                            </v-row>
                            <v-divider class="mt-2" :thickness="2"></v-divider>
                            <v-card-actions class="px-0">
                                <v-btn variant="flat"
                                    :disabled="sendData?.msg === 'บุคคลภายใน' || sendData?.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ' || !sendData._id || sendData._id === 'undefined'"
                                    type="submit" color="#66BB6A" width="100%" class="mt-4" size="large">บันทึกขาเข้า
                                    <v-icon class="ml-2">mdi-tray-arrow-down</v-icon></v-btn>
                            </v-card-actions>
                            <CheckOut @update="getData()" />
                        </v-form>
                    </v-tabs-window-item>

                    <!-- //NOTE - form ของ ใบขับบี่ -->
                    <v-tabs-window-item value="license">
                        <!-- @submit.prevent="submitBylicenseId" -->
                        <v-form fast-fail>
                            <v-row class="d-flex align-top pb-2 px-3">
                                <v-col cols="12" class="pb-0 pr-0">
                                    <p style="font-size: 20px; font-weight: bold;" class="d-flex align-center">
                                        <v-icon icon="mdi-card-account-details" size="small"
                                            class="mr-2"></v-icon>ข้อมูลคนขับ
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
                                    <v-text-field density="compact" variant="outlined" placeholder="ระบุชื่อ-นามสกุล"
                                        v-model="sendData.name"
                                        :rules="sendData.name ? [] : [v => !!v || 'โปรดระบุชื่อ-นามสกุล']" required
                                        hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="5" class="pt-2">
                                    <p>เบอร์โทรศัพท์</p>
                                </v-col>
                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                    <v-text-field type="tel" density="compact" variant="outlined"
                                        placeholder="ระบุเบอร์โทรศัพท์" v-model="sendData.tel" hide-details="auto"
                                        :rules="[
                                            v => !!v || 'กรุณาระบุเบอร์โทรศัพท์',
                                            v => /^[0-9]*$/.test(v) || 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
                                        ]" maxlength="10"></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="5" class="pt-0">
                                    <p>เลขที่ใบขับขี่</p>
                                </v-col>
                                <v-col cols="12" lg="7" class="pa-0 d-flex align-top">
                                    <v-text-field density="compact" variant="outlined" placeholder="ระบุเลขที่ใบขับขี่"
                                        v-model="sendData.licenseId"
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
                                    :disabled="sendData?.msg === 'บุคคลภายใน' || sendData?.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ' || !sendData._id || sendData._id === 'undefined'"
                                    type=" submit" color="#66BB6A" width="100%" class="mt-4" size="large">บันทึกขาเข้า
                                    <v-icon class="ml-2">mdi-tray-arrow-down</v-icon></v-btn>
                            </v-card-actions>
                            <CheckOut @update="getData()" />
                        </v-form>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card>
        </v-sheet>
    </div>
</template>

<script>
import CheckOut from './CheckOut.vue'
export default {
    components: {
        CheckOut,
    },
    data: () => ({
        activeTab: {
            id: true,
            license: false,
        },
        sendData: {
            identityNumber: null,
            name: null,
            tel: null,
            address: null,
            licenseId: null,
            msg: null,
            _id: null,
        },
    }),
    mounted() {

    },
    methods: {
        resetSendData() {
            this.sendData = {
                identityNumber: null,
                name: null,
                tel: null,
                address: null,
                licenseId: null,
                msg: null,
                _id: null,
            }
            this.$refs.inputField.value = ''
        }
    }
}
</script>

<style></style>