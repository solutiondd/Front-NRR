<template>
    <v-container fluid class="d-flex pa-0">
        <div style="height: 100vh; background-color: #EEEEEE;">
            <v-row style="background-color: #EEEEEE;">
                <!-- //NOTE - For horizontal layout [แนวนอน] -->
                <v-col v-if="isHorizontal" cols="3" class="pa-0">
                    <v-sheet width="100%" height="101.5vh" class="pa-4 overflow-y-auto"
                        style="background-color: #EEEEEE;">
                        <h2 class="text-h5 font-weight-bold mb-4" style="color:black ;">🚗 รายการล่าสุด</h2>
                        <v-list class="pa-0" style="background-color: #EEEEEE;">
                            <v-list-item v-for="(entry, index) in recentEntries" :key="index" @click="selectCar(entry)"
                                class="pa-0 mb-3">
                                <v-card class="pa-2 cursor-pointer" style="background-color:  #FAFAFA; color: grey;">
                                    <v-row style="color:black;">
                                        <v-col cols="12" class="pa-3 pb-0">
                                            <!-- <v-img :src="baseUrl + entry.platesPhoto2" width="100%"
                                                class="rounded-lg"></v-img> -->
                                            <v-img class="rounded-lg" width="100%"
                                                :src="!entry.platesPhoto2.startsWith('http') ? baseUrl + entry.platesPhoto2 : entry.platesPhoto2"></v-img>
                                            <v-card-title class="px-2">
                                                <p style="font-size: 1.1rem;">ทะเบียน : {{ entry.licensePlate.License }}
                                                    <span style="color: grey;font-size: 0.9rem;">({{
                                                        entry.msg }})</span>
                                                </p>
                                            </v-card-title>
                                        </v-col>
                                        <v-row class="px-2" style="position: relative;">
                                            <v-col cols="9">
                                                <v-card-subtitle class="px-2 pb-3">
                                                    <p class="d-flex align-center" style="font-size: 1rem;"><v-icon
                                                            size="small" class="mr-1">mdi-calendar</v-icon> วันที่
                                                        {{ dateFormat(entry.time) }}</p>
                                                    <p style="font-size: 1rem;"><v-icon icon="mdi-clock" size="small"
                                                            class="mr-1"></v-icon>เวลา {{ formatitemdevice(entry.time)
                                                            }}</p>
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
                </v-col>

                <!-- //NOTE - For Verticle layout [แนวตั้ง] -->
                <v-col v-if="!isHorizontal" cols="12" class="pa-0 pt-5 d-flex justify-center">
                    <v-sheet width="1070px" style="background-color: #EEEEEE;" class="pa-3 overflow-x-auto">
                        <v-card style="background-color:  #FAFAFA;">
                            <div>
                                <v-toolbar density="comfortable" color="teal">
                                    <v-toolbar-title>
                                        <h2 class="text-h5 font-weight-bold" style="color:white ;">
                                            <v-icon size="small">mdi-format-list-bulleted</v-icon>
                                            รายการล่าสุด
                                        </h2>
                                    </v-toolbar-title>
                                </v-toolbar>
                            </div>
                            <div class="pa-3">
                                <v-list class="d-flex flex-row overflow-x-auto no-scrollbar pa-0"
                                    style="white-space: nowrap;background-color: #EEEEEE;">
                                    <v-list-item v-for="(entry, index) in recentEntries" :key="index"
                                        @click="selectCar(entry)" class="flex-shrink-0 py-3" style="min-width: 120px;">
                                        <v-card class="pa-2 cursor-pointer"
                                            style="background-color:  #FAFAFA; color: grey;">
                                            <v-row style="color: black;">
                                                <v-col cols="12" class="pa-3 pb-0">
                                                    <!-- <v-img :src="baseUrl + entry.platesPhoto2" width="100%"
                                                        class="rounded-lg"></v-img> -->
                                                    <v-img class="rounded-lg" width="100%"
                                                        :src="!entry.platesPhoto2.startsWith('http') ? baseUrl + entry.platesPhoto2 : entry.platesPhoto2"></v-img>
                                                    <v-card-title class="px-2">
                                                        <p style="font-size: 1.1rem;">ทะเบียน : {{
                                                            entry.licensePlate.License }}
                                                            <span style="color: grey;font-size: 0.9rem;">({{
                                                                entry.msg }})</span>
                                                        </p>
                                                    </v-card-title>
                                                    <v-row style="position: relative;">
                                                        <v-col cols="9">
                                                            <v-card-subtitle class="px-2 pb-3">
                                                                <p class="d-flex align-center" style="font-size: 1rem;">
                                                                    <v-icon size="small"
                                                                        class="mr-1">mdi-calendar</v-icon>
                                                                    วันที่
                                                                    {{ dateFormat(entry.time) }}
                                                                </p>
                                                                <p style="font-size: 1rem;"><v-icon icon="mdi-clock"
                                                                        size="small" class="mr-1"></v-icon>เวลา {{
                                                                            formatitemdevice(entry.time)
                                                                        }}</p>
                                                            </v-card-subtitle>
                                                        </v-col>
                                                        <v-col class="pr-6 pb-6"
                                                            style="position: absolute;text-align: end; left: 0px;bottom: 0%;">
                                                            <v-btn icon="" style="width: 30px; height: 30px;"
                                                                color="#E53935" @click="deleteEntry(entry)">
                                                                <v-icon style="font-size: 18px;"
                                                                    icon="mdi-delete"></v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>

                                            </v-row>
                                        </v-card>
                                    </v-list-item>
                                </v-list>
                            </div>
                        </v-card>
                    </v-sheet>
                </v-col>

                <!-- //NOTE - Tab for Switch Car and Person -->
                <v-col cols="12">
                    <v-toolbar density="comfortable" style="background-color: #F57F17; font-size: 20px;">
                        <v-toolbar-title>
                            <p style="font-size: 22px; font-weight: bold;" class="d-flex align-center">
                                <v-icon size="small"
                                    class="mr-2">mdi-file-document-edit-outline</v-icon>ข้อมูลผู้มาติดต่อ
                            </p>
                        </v-toolbar-title>
                        <template v-slot:extension>
                            <v-tabs v-model="tabs" bg-color="" align-tabs="center">
                                <v-tab value="car">
                                    <p style="font-size: 18px;font-weight: bold;">มียานหาหนะ</p>
                                </v-tab>
                                <v-tab value="person">
                                    <p style="font-size: 18px;font-weight: bold;">ไม่มียานหาหนะ</p>
                                </v-tab>
                            </v-tabs>
                        </template>
                    </v-toolbar>
                    <v-card style="background-color: #FAFAFA; color: black;height: 90%;" class="pt-1 pb-5">
                        <v-tabs-window v-model="tabs">

                            <!-- //NOTE - Form for Car -->
                            <v-tabs-window-item value="car">
                                <v-row>
                                    <v-col :cols="isHorizontal ? 5 : 7" class="px-0 pb-0">
                                        <v-sheet width="100%" height="100%"
                                            class="d-flex align-start justify-center pb-5"
                                            :class="isHorizontal ? 'pt-5' : 'pt-0'" style="background-color: #FAFAFA;">
                                            <v-card v-if="selectedCar" style="background-color:  #FAFAFA; color: grey;"
                                                width="95%">
                                                <v-toolbar density="comfortable" color="primary">
                                                    <v-toolbar-title style="display: flex; justify-content: start;">
                                                        <p style="font-size: 27px; font-weight: bold; height: 50px;"
                                                            class="d-flex align-center">
                                                            <v-icon size="small" class="mr-2">mdi-car</v-icon>ข้อมูลรถ
                                                        </p>
                                                    </v-toolbar-title>
                                                </v-toolbar>
                                                <div class="pa-5">
                                                    <v-row class="d-flex align-center px-3 pb-3 pt-5"
                                                        style="color: black;">
                                                        <v-col cols="4" class="text-start pb-5 pt-0">
                                                            <p style="font-size: 1.2rem;">ทะเบียนรถ</p>
                                                        </v-col>
                                                        <v-col cols="8" class="pa-0 ">
                                                            <v-text-field v-model="sendData.licensePlate.License"
                                                                placeholder="ระบุทะเบียนรถ" variant="outlined"
                                                                density="comfortable" required
                                                                :rules="[v => !!v || 'โปรดระบุทะเบียนรถ']"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="4" class="text-start py-2 pt-0">
                                                            <p style="font-size: 1.2rem;">เวลาเข้า</p>
                                                        </v-col>
                                                        <v-col cols="8" class="pa-0 py-2">
                                                            <v-text-field readonly v-model="formatTime"
                                                                placeholder="เวลาเข้า" variant="outlined"
                                                                density="comfortable"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="4" class="pb-5 pt-0">
                                                            <p style="font-size: 1.2rem;">ประเภทยานพาหนะ</p>
                                                        </v-col>
                                                        <v-col cols="8" class="pa-0">
                                                            <v-select v-model="sendData.vehicleType"
                                                                placeholder="ระบุประเภทยานพาหนะ" variant="outlined"
                                                                density="comfortable" :items="vehicleList"
                                                                item-title="name" item-value="value" required
                                                                :rules="[v => !!v || 'โปรดระบุประเภทยานพาหนะ']"></v-select>
                                                        </v-col>
                                                    </v-row>
                                                    <v-divider :thickness="2"></v-divider>
                                                    <div class="pt-5 mb-3">
                                                        <p class="d-flex align-center justify-center"
                                                            v-if="selectedCar.msg === 'บุคคลภายนอก'"
                                                            style="font-size: 3.5rem; background-color: #E53935;color:#FAFAFA ; font-weight: bold;height: 100px;border-radius: 10px;">
                                                            {{ selectedCar.msg }}
                                                            <!-- <span style="font-size: 1.5rem; color: #F57F17;">(กรุณาลงทะเบียน)</span> -->
                                                        </p>
                                                        <p class="d-flex align-center justify-center"
                                                            v-if="selectedCar.msg === 'บุคคลภายใน'"
                                                            style="font-size: 3.5rem;background-color: #66BB6A; color: #FAFAFA; font-weight: bold;height: 100px;border-radius: 10px;">
                                                            {{ selectedCar.msg }}
                                                        </p>
                                                        <p class="d-flex align-center justify-center"
                                                            v-if="selectedCar.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'"
                                                            style="font-size: 3.5rem;background-color: #F57F17; color: #FAFAFA; font-weight: bold;height: 100px;border-radius: 10px;">
                                                            ผู้ติดต่อที่ลงทะเบียน</p>
                                                    </div>

                                                    <v-row class="pt-1">
                                                        <v-col cols="6" class="">
                                                            <!-- <v-img :src="baseUrl + selectedCar.platesPhoto"
                                                                width="100%"></v-img> -->
                                                            <v-img class="rounded-lg" width="100%"
                                                                :src="!selectedCar.platesPhoto.startsWith('http') ? baseUrl + selectedCar.platesPhoto : selectedCar.platesPhoto"></v-img>
                                                        </v-col>
                                                        <v-col cols="6" class="">
                                                            <!-- <v-img :src="baseUrl + selectedCar.platesPhoto2"
                                                                width="100%"></v-img> -->
                                                            <v-img class="rounded-lg" width="100%"
                                                                :src="!selectedCar.platesPhoto2.startsWith('http') ? baseUrl + selectedCar.platesPhoto2 : selectedCar.platesPhoto2"></v-img>
                                                        </v-col>
                                                        <v-col cols="12" class="d-flex align-center justify-center">
                                                            <v-row>
                                                                <v-col cols="12" class="pa-0 text-center">
                                                                    <h1 style="font-size: 3.5rem; color: black;"
                                                                        class="font-weight-bold">
                                                                        ทะเบียน : {{ selectedCar.licensePlate.License }}
                                                                    </h1>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                </div>
                                            </v-card>
                                        </v-sheet>
                                    </v-col>

                                    <v-col :cols="isHorizontal ? 4 : 5" class="pl-0 pb-0">
                                        <v-sheet width="100%" height="100%" class="pa-0 pr-3 pb-5"
                                            :class="isHorizontal ? 'pt-5' : 'pt-0'" style="background-color: #FAFAFA;">
                                            <v-toolbar density="comfortable"
                                                style="background-color: #3949AB; font-size: 20px;">
                                                <v-toolbar-title>
                                                    <p style="font-size: 22px; font-weight: bold;"
                                                        class="d-flex align-center">
                                                        <v-icon size="small"
                                                            class="mr-2">mdi-file-document-edit-outline</v-icon>ลงทะเบียน
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
                                                            <p style="font-size: 18px; font-weight: bold;">เอกสารอื่น ๆ
                                                            </p>
                                                        </v-tab>
                                                    </v-tabs>
                                                </template>
                                            </v-toolbar>
                                            <v-card class="pa-4"
                                                style="background-color: #FAFAFA; color: black; height: 100%;">
                                                <v-tabs-window v-model="activeTab">

                                                    <!-- //NOTE - form ของ บัตรประชาชน -->
                                                    <v-tabs-window-item value="id">
                                                        <v-form fast-fail @submit.prevent="submit">
                                                            <v-row class="pa-3">
                                                                <v-col cols="5" lg="5" class="pa-0">
                                                                    <p style="font-size: 20px; font-weight: bold;"
                                                                        class="d-flex align-center">
                                                                        <v-icon icon="mdi-card-account-details"
                                                                            size="small"
                                                                            class="mr-2"></v-icon>ข้อมูลคนขับ
                                                                    </p>
                                                                </v-col>
                                                                <v-col cols="7" class="pa-0 text-end">
                                                                    <!-- <v-btn color="primary" @click="readIDCard()"><v-icon
                                                                class="mr-2">mdi-text-box-search-outline</v-icon>อ่านข้อมูลบัตร</v-btn> -->
                                                                    <v-btn :ripple="false" class="ml-2" color="black"
                                                                        variant="text" icon="mdi-refresh" size="small"
                                                                        @click="resetSendData"></v-btn>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="d-flex align-top pb-2 px-3 overflow-yp-auto"
                                                                style="height:600px;">
                                                                <v-col v-if="loading" class="pa-2">
                                                                    <div>
                                                                        <v-progress-linear color="cyan"
                                                                            indeterminate></v-progress-linear>
                                                                    </div>
                                                                </v-col>
                                                                <v-col cols="12" class="pb-0 pr-0">

                                                                </v-col>
                                                                <v-col cols="12" lg="5">
                                                                    <p>รูปภาพ</p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7"
                                                                    class="d-flex align-center justify-center">
                                                                    <img id="Photo"
                                                                        src="../../assets/Logo-Sunsweet-Final.svg"
                                                                        alt="image" style="width: 130px;">
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="text-start pt-2">
                                                                    <p>เลขประจำตัวประชาชน</p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field placeholder="ระบุเลขประจำตัวประชาชน"
                                                                        variant="outlined" density="compact"
                                                                        v-model="sendData.identityNumber"
                                                                        :rules="[v => !!v || 'โปรดระบุเลขบัตรประจำตัว', v => /^[0-9]{1,13}$/.test(v) || 'กรุณาระบุเลขบัตร 13 หลัก']"
                                                                        required maxlength="13"
                                                                        hide-details="auto"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="text-start pt-2">
                                                                    <p>ชื่อ-นามสกุล</p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field density="compact" variant="outlined"
                                                                        placeholder="ระบุชื่อ-นามสกุล"
                                                                        v-model="sendData.name"
                                                                        :rules="sendData.name ? [] : [v => !!v || 'โปรดระบุชื่อ-นามสกุล']"
                                                                        required hide-details="auto"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>เบอร์โทรศัพท์</p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field type="tel" density="compact"
                                                                        variant="outlined"
                                                                        placeholder="ระบุเบอร์โทรศัพท์"
                                                                        v-model="sendData.tel" hide-details="auto"
                                                                        :rules="[
                                                                            v => !!v || 'กรุณาระบุเบอร์โทรศัพท์',
                                                                            v => /^[0-9]*$/.test(v) || 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
                                                                        ]" maxlength="10"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>ที่อยู่</p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 d-flex align-top">
                                                                    <v-textarea variant="outlined"
                                                                        placeholder="ระบุที่อยู่" rows="2"
                                                                        v-model="sendData.address"
                                                                        :rules="sendData.address ? [] : [v => !!v || 'โปรดระบุที่อยู่']"
                                                                        required auto-grow></v-textarea>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>จากบริษัท
                                                                        <span
                                                                            style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                    </p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field variant="outlined" density="compact"
                                                                        v-model="sendData.agency" hide-details="auto"
                                                                        placeholder="ระบุหน่วยงาน"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>
                                                                        จำนวนผู้มาติดต่อ
                                                                        <span
                                                                            style="color: red;font-size: 14px;">*</span>
                                                                    </p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field variant="outlined" density="compact"
                                                                        v-model="sendData.totalVisitor"
                                                                        hide-details="auto"
                                                                        placeholder="ระบุจำนวนผู้มาติดต่อ"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>
                                                                        ผู้รับการติดต่อ
                                                                        <span
                                                                            style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                    </p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field variant="outlined" density="compact"
                                                                        v-model="sendData.contactPerson"
                                                                        hide-details="auto"
                                                                        placeholder="ระบุชื่อผู้รับการติดต่อ"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>
                                                                        แผนกที่ต้องการติดต่อ
                                                                        <span
                                                                            style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                    </p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field variant="outlined" density="compact"
                                                                        v-model="sendData.department"
                                                                        hide-details="auto"
                                                                        placeholder="ระบุชื่อแผนก"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>
                                                                        วัตถุประสงค์
                                                                        <span
                                                                            style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                    </p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field variant="outlined" density="compact"
                                                                        v-model="sendData.object" hide-details="auto"
                                                                        placeholder="ระบุวัตถุประสงค์"></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <v-divider class="mt-2" :thickness="2"></v-divider>
                                                            <v-card-actions class="px-0">
                                                                <v-btn variant="flat"
                                                                    :disabled="sendData?.msg === 'บุคคลภายใน' || sendData?.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ' || !sendData._id || sendData._id === 'undefined'"
                                                                    type="submit" color="#66BB6A" width="100%"
                                                                    class="mt-4" size="large">บันทึกขาเข้า
                                                                    <v-icon
                                                                        class="ml-2">mdi-tray-arrow-down</v-icon></v-btn>
                                                            </v-card-actions>
                                                            <CheckOut @update="getData()" />
                                                        </v-form>
                                                    </v-tabs-window-item>

                                                    <!-- //NOTE - form ของ ใบขับบี่ -->
                                                    <v-tabs-window-item value="license">
                                                        <v-form fast-fail @submit.prevent="submitBylicenseId"
                                                            class="pt-8">
                                                            <v-row class="pa-3">
                                                                <v-col cols="12" class="pb-0 pr-0 pt-0">
                                                                    <p style="font-size: 20px; font-weight: bold;"
                                                                        class="d-flex align-center">
                                                                        <v-icon icon="mdi-card-account-details"
                                                                            size="small"
                                                                            class="mr-2"></v-icon>ข้อมูลคนขับ
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn :ripple="false" class="ml-2"
                                                                            color="black" variant="text"
                                                                            icon="mdi-refresh" size="small"
                                                                            @click="resetSendData"></v-btn>
                                                                    </p>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row
                                                                class="d-flex align-top pt-5 pb-2 px-3 overflow-yp-auto"
                                                                style="height: 600px;">

                                                                <v-col cols="12" lg="5" class="text-start pt-2">
                                                                    <p>เลขประจำตัวประชาชน</p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field placeholder="ระบุเลขประจำตัวประชาชน"
                                                                        variant="outlined" density="compact"
                                                                        v-model="sendData.identityNumber"
                                                                        :rules="[v => !!v || 'โปรดระบุเลขบัตรประจำตัว', v => /^[0-9]{1,13}$/.test(v) || 'กรุณาระบุเลขบัตร 13 หลัก']"
                                                                        required maxlength="13"
                                                                        hide-details="auto"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="text-start pt-2">
                                                                    <p>ชื่อ-นามสกุล</p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field density="compact" variant="outlined"
                                                                        placeholder="ระบุชื่อ-นามสกุล"
                                                                        v-model="sendData.name"
                                                                        :rules="sendData.name ? [] : [v => !!v || 'โปรดระบุชื่อ-นามสกุล']"
                                                                        required hide-details="auto"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>เบอร์โทรศัพท์</p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field type="tel" density="compact"
                                                                        variant="outlined"
                                                                        placeholder="ระบุเบอร์โทรศัพท์"
                                                                        v-model="sendData.tel" hide-details="auto"
                                                                        :rules="[
                                                                            v => !!v || 'กรุณาระบุเบอร์โทรศัพท์',
                                                                            v => /^[0-9]*$/.test(v) || 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
                                                                        ]" maxlength="10"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-0">
                                                                    <p>เลขที่ใบขับขี่</p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 d-flex align-top">
                                                                    <v-text-field density="compact" variant="outlined"
                                                                        placeholder="ระบุเลขที่ใบขับขี่"
                                                                        v-model="sendData.licenseId"
                                                                        :rules="sendData.licenseId ? [] : [v => !!v || 'โปรดระบุเลขที่ใบขับขี่']"
                                                                        required hide-details="auto"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>จากบริษัท
                                                                        <span
                                                                            style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                    </p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field variant="outlined" density="compact"
                                                                        v-model="sendData.agency" hide-details="auto"
                                                                        placeholder="ระบุหน่วยงาน"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>
                                                                        จำนวนผู้มาติดต่อ
                                                                        <span
                                                                            style="color: red;font-size: 14px;">*</span>
                                                                    </p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field variant="outlined" density="compact"
                                                                        v-model="sendData.totalVisitor"
                                                                        hide-details="auto"
                                                                        placeholder="ระบุจำนวนผู้มาติดต่อ"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>
                                                                        ผู้รับการติดต่อ
                                                                        <span
                                                                            style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                    </p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field variant="outlined" density="compact"
                                                                        v-model="sendData.contactPerson"
                                                                        hide-details="auto"
                                                                        placeholder="ระบุชื่อผู้รับการติดต่อ"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>
                                                                        แผนกที่ต้องการติดต่อ
                                                                        <span
                                                                            style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                    </p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field variant="outlined" density="compact"
                                                                        v-model="sendData.department"
                                                                        hide-details="auto"
                                                                        placeholder="ระบุชื่อแผนก"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" lg="5" class="pt-2">
                                                                    <p>
                                                                        วัตถุประสงค์
                                                                        <span
                                                                            style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                    </p>
                                                                </v-col>
                                                                <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                    <v-text-field variant="outlined" density="compact"
                                                                        v-model="sendData.object" hide-details="auto"
                                                                        placeholder="ระบุวัตถุประสงค์"></v-text-field>
                                                                </v-col>

                                                                <v-col class="pa-0">
                                                                    <v-textarea class="hidden-textarea" auto-grow
                                                                        ref="inputField"
                                                                        v-model="dataLicense"></v-textarea>
                                                                </v-col>
                                                            </v-row>
                                                            <v-divider class="mt-8" :thickness="2"></v-divider>
                                                            <v-card-actions class="px-0">
                                                                <v-btn variant="flat"
                                                                    :disabled="sendData?.msg === 'บุคคลภายใน' || sendData?.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ' || !sendData._id || sendData._id === 'undefined'"
                                                                    type=" submit" color="#66BB6A" width="100%"
                                                                    class="mt-4" size="large">บันทึกขาเข้า
                                                                    <v-icon
                                                                        class="ml-2">mdi-tray-arrow-down</v-icon></v-btn>
                                                            </v-card-actions>
                                                            <CheckOut @update="getData()" />
                                                        </v-form>
                                                    </v-tabs-window-item>

                                                    <!-- ######################################################################################################### -->
                                                    <!-- //NOTE - form ของ เอกสารอื่น ๆ -->
                                                    <v-tabs-window-item value="person">
                                                        <v-form fast-fail @submit.prevent="submitWOther">
                                                            <v-col cols="12">
                                                                <p style="font-size: 20px; font-weight: bold;"
                                                                    class="d-flex align-center pb-4">
                                                                    <v-icon icon="mdi-camera-plus" color="#3949AB"
                                                                        size="small" class="mr-2" />
                                                                    กรุณาถ่ายรูปบัตร หรือเอกสารอื่น ๆ
                                                                </p>
                                                            </v-col>
                                                            <v-row class="overflow-yp-auto" style="height: 600px;">
                                                                <v-col cols="12">
                                                                    <v-row>
                                                                        <v-col cols="12" class="py-2">
                                                                            <!-- ✅ แสดง video เฉพาะตอนยังไม่ถ่าย -->
                                                                            <video v-show="!isCapturedDoc"
                                                                                ref="videoRef" autoplay playsinline
                                                                                width="100%"
                                                                                style="border: 2px solid grey; border-radius: 10px;" />
                                                                            <canvas ref="canvasRef"
                                                                                style="display: none;" />
                                                                        </v-col>
                                                                    </v-row>

                                                                    <div class="pt-5 d-flex justify-center">
                                                                        <v-btn size="large" block @click="capture()"
                                                                            color="primary" v-if="!isCapturedDoc">
                                                                            <v-icon icon="mdi-camera-iris"
                                                                                class="mr-2"></v-icon>
                                                                            ถ่ายรูป
                                                                        </v-btn>

                                                                        <v-btn size="large" block
                                                                            @click="retakeDocImage()" color="secondary"
                                                                            v-else>
                                                                            <v-icon icon="mdi-restart" size="small"
                                                                                class="mr-2"></v-icon>
                                                                            ลองใหม่อีกครั้ง
                                                                        </v-btn>
                                                                    </div>

                                                                    <div class="pt-5" v-if="capturedImage">
                                                                        <p style="font-size: 20px; font-weight: bold;"
                                                                            class="d-flex align-center pb-4">
                                                                            <v-icon icon="mdi-camera-image" size="small"
                                                                                class="mr-2" color="#00897B" />
                                                                            ตัวอย่างรูปภาพ
                                                                        </p>
                                                                        <!-- ✅ แสดงรูปภาพที่ถ่าย -->
                                                                        <img v-if="capturedImage" :src="capturedImage"
                                                                            alt="Captured image" width="100%"
                                                                            style="border: 1px solid grey; border-radius: 10px;" />
                                                                    </div>
                                                                    <v-col cols="12" lg="5" class="text-start pt-5">
                                                                        <p>ชื่อ-นามสกุล</p>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                        <v-text-field density="compact"
                                                                            variant="outlined"
                                                                            placeholder="ระบุชื่อ-นามสกุล"
                                                                            v-model="sendData.name"
                                                                            :rules="sendData.name ? [] : [v => !!v || 'โปรดระบุชื่อ-นามสกุล']"
                                                                            required hide-details="auto"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="5" class="pt-2">
                                                                        <p>จากบริษัท
                                                                            <span
                                                                                style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                        </p>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                        <v-text-field variant="outlined"
                                                                            density="compact" v-model="sendData.agency"
                                                                            hide-details="auto"
                                                                            placeholder="ระบุหน่วยงาน"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="5" class="pt-2">
                                                                        <p>เบอร์โทรศัพท์</p>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                        <v-text-field type="tel" density="compact"
                                                                            variant="outlined"
                                                                            placeholder="ระบุเบอร์โทรศัพท์"
                                                                            v-model="sendData.tel" hide-details="auto"
                                                                            :rules="[
                                                                                v => !!v || 'กรุณาระบุเบอร์โทรศัพท์',
                                                                                v => /^[0-9]*$/.test(v) || 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
                                                                            ]" maxlength="10"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="5" class="pt-2">
                                                                        <p>
                                                                            จำนวนผู้มาติดต่อ
                                                                            <span
                                                                                style="color: red;font-size: 14px;">*</span>
                                                                        </p>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                        <v-text-field variant="outlined"
                                                                            density="compact"
                                                                            v-model="sendData.totalVisitor"
                                                                            hide-details="auto"
                                                                            placeholder="ระบุจำนวนผู้มาติดต่อ"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="5" class="pt-2">
                                                                        <p>
                                                                            ผู้รับการติดต่อ
                                                                            <span
                                                                                style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                        </p>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                        <v-text-field variant="outlined"
                                                                            density="compact"
                                                                            v-model="sendData.contactPerson"
                                                                            hide-details="auto"
                                                                            placeholder="ระบุชื่อผู้รับการติดต่อ"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="5" class="pt-2">
                                                                        <p>
                                                                            แผนกที่ต้องการติดต่อ
                                                                            <span
                                                                                style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                        </p>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                        <v-text-field variant="outlined"
                                                                            density="compact"
                                                                            v-model="sendData.department"
                                                                            hide-details="auto"
                                                                            placeholder="ระบุชื่อแผนก"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="5" class="pt-2">
                                                                        <p>
                                                                            วัตถุประสงค์
                                                                            <span
                                                                                style="color: grey;font-size: 14px;">(ไม่บังคับ)</span>
                                                                        </p>
                                                                    </v-col>
                                                                    <v-col cols="12" lg="7" class="pa-0 pb-2">
                                                                        <v-text-field variant="outlined"
                                                                            density="compact" v-model="sendData.object"
                                                                            hide-details="auto"
                                                                            placeholder="ระบุวัตถุประสงค์"></v-text-field>
                                                                    </v-col>
                                                                </v-col>
                                                            </v-row>
                                                            <v-btn variant="flat"
                                                                :disabled="sendData?.msg === 'บุคคลภายใน' || sendData?.msg === 'ผู้ติดต่อที่ได้รับอนุญาติ'"
                                                                type="submit" color="#66BB6A" width="100%" class="mt-4"
                                                                size="large">
                                                                บันทึกขาเข้า
                                                                <v-icon class="ml-2">mdi-tray-arrow-down</v-icon>
                                                            </v-btn>

                                                            <CheckOut @update="getData()" />
                                                        </v-form>
                                                    </v-tabs-window-item>
                                                    <!-- ######################################################################################################### -->
                                                </v-tabs-window>
                                            </v-card>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </v-tabs-window-item>

                            <!-- //NOTE - Form for Person -->
                            <v-tabs-window-item value="person">
                                <PersonRegister @created="CreatedSuccess()" />
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-card>
                </v-col>
                <v-col v-if="!isHorizontal" cols="12" class="pt-0 pb-0">
                    <!-- <RemainTable ref="remainTable" /> -->
                    <v-card class="ma-2" style="background-color: #FAFAFA;">
                        <div>
                            <v-toolbar color="primary" density="comfortable">
                                <v-toolbar-title class="d-flex align-center">
                                    <p>
                                        <v-icon icon="mdi-parking" size="small" class="mr-2"></v-icon>
                                        คงเหลือในพื้นที่ทั้งหมด {{ this.data.length }} คัน
                                    </p>
                                </v-toolbar-title>
                            </v-toolbar>
                        </div>
                        <div>
                            <v-card variant="flat" style="background-color: #FAFAFA;">
                                <v-data-table :headers="headers" :items="data" :page="page"
                                    :items-per-page="itemsPerPage" class="elevation-1" hide-default-footer
                                    style="background-color: #FAFAFA; color: black;">
                                    <template v-slot:headers="column">
                                        <tr>
                                            <th style="font-size: 13px;" class="text-center"
                                                v-for="hd in column.headers[0]" :key="hd.title">
                                                {{ hd.title }}
                                            </th>
                                        </tr>
                                    </template>
                                    <template v-slot:item="row">
                                        <tr>
                                            <td class="text-center">
                                                {{ ((page - 1) * itemsPerPage) + (row.index + 1) }}
                                            </td>
                                            <td class="text-center">
                                                {{ row.item.license }}
                                            </td>
                                            <td class="text-center" style="min-width: 180px;">
                                                <div v-for="lp in row.item.person" :key="lp.identityNumber">
                                                    {{ lp.name }}
                                                </div>
                                            </td>
                                            <td class="text-center">
                                                {{ formatDateTime(row.item.firstTimeStamp) }}
                                            </td>
                                            <td class="text-center">
                                                <p>{{ formatDateTime(row.item.exitTime) }}</p>
                                            </td>
                                            <td class="text-center">
                                                <v-chip color="red">{{ row.item.msg }}</v-chip>
                                            </td>
                                            <td class="text-center">
                                                <DetailRemain :data="row.item.data" />
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-slot:bottom>
                                        <div class="text-center pt-2">
                                            <v-pagination v-model="page" :length="pageCount"></v-pagination>
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>

    <!-- //NOTE - Print Form -->
    <div id="app">
        <!-- <div>
            <v-btn @click="printForm()">พิมพ์ฟอร์ม</v-btn>
        </div> -->
        <div id="form-container" style="visibility: hidden; position: absolute; left: -9999px;">
            <div style="text-align: center;padding-bottom: 10px;">
                <div style="padding-bottom: 5px;">
                    <img style="height: 90px; justify-content: center;" src="/Logo-Sunsweet-Final.png" alt="Img">
                </div>
                <div style="text-align: center; margin-bottom: 10px;">
                    <h4 style="padding-bottom: 5px;">สแกนขาออก</h4>
                    <qrcode-vue :value="sendData._id" :size="100" level="H" render-as="canvas"
                        :key="sendData._id"></qrcode-vue>
                    <h4 style="padding-top: 10px;">ใบผ่าน เข้า-ออก รหัส
                        <span style="font-weight: 400;font-size: 12px;">(No.)</span>
                        <p style="font-size: 12px;font-weight: 400;padding-top: 5px;">{{ sendData._id }}</p>
                    </h4>
                </div>

                <h4 style="padding-bottom:5px; ">บริษัท ซันสวีท จำกัด (มหาชน)</h4>
            </div>
            <div style="text-align: start; font-size: 12px;">
                <p style="font-weight: bold;padding-bottom: 5px;">เวลาเข้า <span
                        style="font-size: 10px;color: #BDBDBD;font-weight: 300;">(Time
                        IN)</span> :
                    <span style="font-weight: 400;">
                        {{ dateFormatDayandTime(sendData.time) }} - {{ formatitemdevice(sendData.time) }}
                    </span>
                </p>
                <p style="font-weight: bold;">เวลาออก <span
                        style="font-size: 10px;color: #BDBDBD; font-weight: 300;">(Time
                        OUT)</span> :
                    <span style="display: inline-block; border-bottom: 1px dashed grey; width: 140px;"></span>
                </p>
                <p style="font-weight: bold;">
                    วัตถุประสงค์ :
                    <span v-if="sendData.object" style="font-weight: 400;">{{ sendData.object }}</span>
                    <span v-else
                        style="display: inline-block; border-bottom: 1px dashed grey; min-width: 175px;">&nbsp;</span>
                    <br />
                    <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Purpose of Visit)</span>
                </p>
                <p style="font-weight: bold;">
                    ชื่อ-นามสกุล :
                    <span v-if="sendData.name" style="font-weight: 400;">{{ sendData.name }}</span>
                    <span v-else
                        style="display: inline-block; border-bottom: 1px dashed grey; min-width: 175px;">&nbsp;</span>
                    <br />
                    <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Name-Surname)</span>
                </p>
                <p style="font-weight: bold;">
                    ทะเบียนรถ
                    <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Car)</span> :
                    <span v-if="sendData.licensePlate?.License" style="font-weight: 400;">{{
                        sendData.licensePlate.License
                    }}</span>
                    <span v-else
                        style="display: inline-block; border-bottom: 1px dashed grey; min-width: 160px;">&nbsp;</span>
                </p>
                <p style="font-weight: bold;">
                    จากบริษัท :
                    <span v-if="sendData.agency" style="font-weight: 400;">{{ sendData.agency }}</span>
                    <span v-else
                        style="display: inline-block; border-bottom: 1px dashed grey; min-width: 190px;">&nbsp;</span>
                    <br />
                    <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(From Company)</span>
                </p>
                <p style="font-weight: bold;">
                    จำนวนผู้มาติดต่อ :
                    <span v-if="sendData.totalVisitor !== undefined && sendData.totalVisitor !== null"
                        style="font-weight: 400;">
                        {{ sendData.totalVisitor }} คน
                    </span>
                    <span v-else
                        style="display: inline-block; border-bottom: 1px dashed grey; min-width: 100px;">&nbsp;</span>
                    <br />
                    <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Total Visitor)</span>
                </p>
                <p style="font-weight: bold;">
                    ผู้รับการติดต่อ :
                    <span v-if="sendData.contactPerson" style="font-weight: 400;">{{ sendData.contactPerson }}</span>
                    <span v-else
                        style="display: inline-block; border-bottom: 1px dashed grey; min-width: 170px;">&nbsp;</span>
                    <br />
                    <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Contact Person)</span>
                </p>
                <p style="font-weight: bold;">ติดต่อแผนก : <span v-if="sendData.department" style="font-weight: 400;">
                        {{ sendData.department }}
                    </span>
                    <span v-else
                        style="display: inline-block; border-bottom: 1px dashed grey; width: 180px;">&nbsp;</span>
                    <br /><span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(Department)</span>
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
                    <span style="font-weight: 300; font-size: 10px;color:#BDBDBD;">(security guard sign)</span>
                </p>
            </div>

            <div style="text-align: center; margin-top: 20px; padding-top: 10px; border-top: 1px dashed grey;">
                <img :src="qrImage" data-print-footer-qr="true" alt="QR Code" style="height: 80px; width: 80px;">
                <p style="margin-top: 6px; font-weight: bold; font-size: 12px;">กฎระเบียบบริษัทฯ</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, toRaw, nextTick, watch, computed, defineComponent, getCurrentInstance, onBeforeUnmount } from 'vue'
import { openDB } from 'idb'
import { formatitemdevice, dateFormat, dateFormatValue, dateFormatDayandTime, datetimeFormatLimit } from '../../function/day'
import Swal from "sweetalert2";
import { LPService } from '../../api/licenseplate';
import { useStore } from 'vuex';
import QrcodeVue from "qrcode.vue";
import CheckOut from '../../components/Security-Guard/CheckOut.vue';
import { ImageService } from "../../api/UploadImage";
// import RemainTable from '../../components/Security-Guard/RemainTable.vue';
import { StrangerService } from '../../api/ReportStranger';
import DetailRemain from '../../components/Security-Guard/DetailRemain.vue';
import PersonRegister from '../../components/Security-Guard/PersonRegister.vue';
import qrImage from '../../assets/qr-code.png';

export default defineComponent({
    setup() {
        const store = useStore();
        const lp = new LPService();
        const imgService = new ImageService();
        const stranger = new StrangerService();
        const baseUrl = import.meta.env.VITE_APP_BASE_URL
        const recentEntries = ref([]) // 🔥 เก็บรายการรถของวันนี้
        const selectedCar = ref(null) // รถที่เลือก (หรือรถล่าสุด)
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
        })

        const dataLicense = ref('');
        const inputField = ref(null);
        const activeTab = ref({
            id: true,
            license: false,
            person: false,
        });

        const sendDataLicense = ref({
            name: '',
            identityNumber: '',
            licenseId: '',
        })
        const { proxy } = getCurrentInstance()

        let timer = null;

        watch(activeTab, (newVal) => {
            if (newVal === 'license') {
                // หน่วงเวลาก่อน focus เล็กน้อย เผื่อ Vuetify render UI ยังไม่เสร็จ
                setTimeout(() => {
                    inputField.value?.focus();
                }, 100);
            }
        });

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
            if (/[ก-๙]/.test(input)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'กรุณาเปลี่ยนภาษา',
                    text: 'กรุณาเปลี่ยนภาษาบนแป้นพิมพ์ และ ลองใหม่อีกครั้ง',
                }).then(() => {
                    dataLicense.value = ''; // reset ค่าใน dataLicense (ถ้า dataLicense เป็น ref)
                });
                return; // ❌ หยุดการทำงานต่อถ้าพบอักษรไทย
            }


            const lines = input.split("\n");

            let foundName = false;
            let foundId = false;
            let foundLicenseId = false;

            for (const line of lines) {
                const trimmedLine = line.trim();
                console.log("Checking line:", trimmedLine);
                if (!foundName && trimmedLine.includes("$")) {
                    // 1. จับ pattern เต็ม: %  ^LASTNAME$FIRSTNAME$TITLE^^?
                    let matchFull = trimmedLine.match(/\^([A-Z]+)\$([A-Z]+)\$([A-Z.]+)\^\^?\?/);
                    if (matchFull) {
                        sendData.value.name = `${matchFull[2]} ${matchFull[1]}`; // FIRSTNAME LASTNAME
                        foundName = true;
                        console.log("✅ Found name (pattern full):", sendData.value.name);
                        continue;
                    }

                    // 2. จับ pattern สั้น: %  ^$FIRSTNAME$TITLE^^?
                    let matchShort = trimmedLine.match(/\$([A-Z]+)\$([A-Z.]+)\^\^?\?/);
                    if (matchShort) {
                        sendData.value.name = `${matchShort[2]} ${matchShort[1]}`; // TITLE FIRSTNAME
                        foundName = true;
                        console.log("✅ Found name (pattern short):", sendData.value.name);
                        continue;
                    }
                }


                // ✅ ตรวจสอบเลขประจำตัวประชาชน
                if (!foundId && line.startsWith(";")) {
                    const match = line.match(/;600764(\d{13})/);
                    if (match) {
                        sendData.value.identityNumber = match[1];
                        foundId = true;
                    }
                }

                // ✅ ตรวจสอบเลขที่ใบขับขี่
                if (!foundLicenseId && line.startsWith("+")) {
                    const match = line.match(/\d{4,5}\s+\d{1,2}\s+(\d{7,8})/);
                    if (match) {
                        sendData.value.licenseId = match[1];
                        foundLicenseId = true;
                    }
                }
            }

            // fallback สำหรับเลขบัตร ปชช.
            if (!foundId) {
                const idMatch = input.match(/(\d{13})/);
                if (idMatch) {
                    sendData.value.identityNumber = idMatch[1];
                }
            }

            // fallback สำหรับเลขใบขับขี่
            if (!foundLicenseId) {
                const licenseMatch = input.match(/(?:\D|^)(\d{7,8})(?:\D|$)/);
                if (licenseMatch) {
                    sendData.value.licenseId = licenseMatch[1];
                }
            }

            // fallback สำหรับชื่อ ถ้ายังหาไม่เจอเลย
            if (!foundName) {
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

            dataLicense.value = "";

            setTimeout(() => {
                inputField.value?.focus();
            }, 100);
        };

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
            const db = await initDB();
            const tx = db.transaction('history', 'readonly');
            const store = tx.objectStore('history');
            const allEntries = await store.getAll();

            const today = new Date().toISOString().split('T')[0];

            // 🔥 กรองเฉพาะรายการที่ msg เป็น "บุคคลภายนอก"
            const filteredEntries = allEntries.filter(entry => entry.msg === "บุคคลภายนอก");


            // 🔥 Log ข้อมูลป้ายทะเบียนพร้อมวันที่ที่พบ
            console.log('🔍 License plate entries with date:',
                filteredEntries.map(e => ({
                    licensePlate: e.licensePlate,
                    date: e.date,
                    timeStamp: e.timeStamp
                }))
            );

            // 🔥 กรองข้อมูลซ้ำก่อนแสดงผล
            const uniqueEntries = [];
            const seen = new Set();

            filteredEntries
                .sort((a, b) => b.timeStamp - a.timeStamp) // ใหม่สุดอยู่บน
                .forEach(entry => {
                    const key = entry.licensePlate.License + entry.timeStamp;
                    if (!seen.has(key)) {
                        seen.add(key);
                        uniqueEntries.push(entry);
                    }
                });

            recentEntries.value = uniqueEntries; // ✅ แสดงเฉพาะรายการที่ไม่ซ้ำและตรงกับเงื่อนไข

            selectedCar.value = uniqueEntries[0];
        };

        // 👉 บันทึกข้อมูลใหม่ลง IndexedDB
        const saveHistory = async (newEntry) => {
            const db = await initDB();
            const tx = db.transaction('history', 'readwrite');
            const store = tx.objectStore('history');

            const now = new Date();
            const expireTime = now.getTime() + 60 * 60 * 1000; // 1 ชั่วโมง

            // 🔥 ดึงข้อมูลทั้งหมดในวันนี้
            const existingEntries = await store.getAll();

            // 🛑 ตรวจสอบว่ามีทะเบียนรถนี้อยู่ในวันนี้หรือยัง + msg ต้องเป็น "บุคคลภายนอก"
            const isDuplicate = existingEntries.some(entry =>
                entry._id === newEntry._id
            );

            // ✅ เพิ่มเงื่อนไขให้บันทึกเฉพาะ "บุคคลภายนอก"
            if (!isDuplicate && newEntry.msg === "บุคคลภายนอก") {
                const dataWithExpireTime = { ...newEntry, expireTime };
                await store.add(dataWithExpireTime); // ✅ บันทึกเฉพาะข้อมูลใหม่ที่ตรงเงื่อนไข
                console.log("✅ บันทึกข้อมูลใหม่ลง IndexedDB:", dataWithExpireTime);
                loadTodayHistory(); // โหลดข้อมูลใหม่หลังเพิ่มรายการ
            }
        };

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

                        // selectedCar.value = newEntry; // อัปเดตแถวกลาง
                        console.log(newEntry)
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

            // ✅ ป้องกันไม่ให้ element หาย เพราะ visibility แทน display
            formContainer.style.visibility = "visible";
            formContainer.style.position = "absolute";
            formContainer.style.left = "-9999px";

            await new Promise((resolve) => setTimeout(resolve, 100)); // ป้องกัน canvas ยังไม่ render

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
            printWindow.document.write(`
        <html>
        <head>
            <title>Visitor</title>
            <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap" rel="stylesheet">
            <style>
                * {
                    font-family: 'Sarabun', Arial, sans-serif;
                }
                p {
                    padding-bottom: 5px;
                }
                @media print {
                    @page {
                        size: 72.1mm 3276mm;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 10px;
                        text-align: center;
                    }
                    div {
                        max-width: 72.1mm;
                        margin: 0 auto;
                        padding-right: 1mm;
                    }
                    .v-row {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }
                    .v-col {
                        flex: 0 0 30%;
                    }
                    footer {
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                        text-align: center;
                    }
                }
            </style>
        </head>
        <body>
            ${formContent}
        </body>
        </html>
    `);
            printWindow.document.close();

            printWindow.onload = () => {
                printWindow.focus();
                printWindow.print();
            };

            printWindow.onafterprint = () => {
                printWindow.close();
            };
        };

        const submit = async (event) => {
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
                            const expire = `${new Date().getFullYear()}-12-31`;
                            const data = {
                                guestName: sendData.value.name,
                                licensePlate: sendData.value.licensePlate.License,
                                licensePlateProvince: '',
                                start: dateFormatValue(sendData.value.time),
                                listType: 'fixedlist',
                                expire: expire,

                                identityNumber: sendData.value.identityNumber,
                                address: sendData.value.address,
                                vehicleType: sendData.value.vehicleType,
                                cate: 'stranger',
                                personImgUrl: res.data.filePath,
                                cdataId: sendData.value._id,
                                timeStamp: sendData.value.time,
                                visitorTel: sendData.value.tel,

                                agency: sendData.value.agency || '',
                                object: sendData.value.object || '',
                                contactPerson: sendData.value.contactPerson || '',
                                totalVisitor: sendData.value.totalVisitor || '',
                                department: sendData.value.department || '',
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
                                        agency: '',
                                        object: '',
                                        contactPerson: '',
                                        totalVisitor: 1,
                                        department: '',
                                    };
                                    document.getElementById('Photo').src = "/Logo-Sunsweet-Final.svg";
                                    proxy.getData();
                                } else if (res.data.message === 'validate error') {
                                    Swal.fire({
                                        title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                                        icon: 'warning',
                                    })
                                }
                                // else if (res.data.message === 'This license has been added') {
                                //     Swal.fire({
                                //         title: 'มีข้อมูลป้ายทะเบียนนี้แล้ว !',
                                //         text: 'กรุณาลองใหม่อีกครั้ง',
                                //         icon: 'warning',
                                //         showConfirmButton: true,
                                //         confirmButtonColor: '#E53935',
                                //     })
                                // } 
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

        //#####################################################
        //NOTE - Function to Reset When Create form Person Success
        const CreatedSuccess = () => {
            proxy.getData();
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
        }
        //#####################################################


        const submitBylicenseId = async (event) => {
            const res = await event
            if (res.valid === true) {
                if (!sendData.value._id || sendData.value._id === 'undefined') {
                    Swal.fire({
                        title: 'กรุณาเลือกทะเบียนรถ !!',
                        html: '<h2>จากทางด้านซ้ายมือ</h2>',
                        icon: 'warning',
                    });
                } else {
                    const token = localStorage.getItem('token');
                    const park = store.state.park;
                    const expire = `${new Date().getFullYear()}-12-31`;
                    const data = {
                        guestName: sendData.value.name,
                        licensePlate: sendData.value.licensePlate.License,
                        licensePlateProvince: '',
                        start: dateFormatValue(sendData.value.time),
                        listType: 'fixedlist',
                        expire: expire,

                        identityNumber: sendData.value.identityNumber,
                        vehicleType: sendData.value.vehicleType,
                        cate: 'stranger',
                        cdataId: sendData.value._id,
                        timeStamp: sendData.value.time,

                        driverLicenseId: sendData.value.licenseId,
                        visitorTel: sendData.value.tel,

                        agency: sendData.value.agency || '',
                        object: sendData.value.object || '',
                        contactPerson: sendData.value.contactPerson || '',
                        totalVisitor: sendData.value.totalVisitor || '',
                        department: sendData.value.department || '',
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
                                agency: '',
                                object: '',
                                contactPerson: '',
                                totalVisitor: 1,
                                department: '',
                            };
                            document.getElementById('Photo').src = "/Logo-Sunsweet-Final.svg";
                            proxy.getData();
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

            // ลบรายการที่ createdAt เกิน 1 ชั่วโมง
            const deletePromises = allEntries
                .filter(entry => {
                    if (!entry.createdAt) return false;
                    const created = new Date(entry.createdAt).getTime();
                    return created + 60 * 60 * 1000 < currentTime;
                })
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

        const wSocketSend = (json_Str) => {
            if (debugFlag) {
                console.log(">" + JSON.parse(json_Str).Command);
            }
            wSocket.send(json_Str);
        }

        // const GetAutoReadOptions = () => {
        //     const JS_OBJ = {
        //         command: "GetAutoReadOptions",
        //     };
        //     const jsonStr = JSON.stringify(JS_OBJ);
        //     wSocketSend(jsonStr);
        // }

        // const setAutoReadOptions = () => {
        //     const JS_OBJ = {
        //         Command: "SetAutoReadOptions",
        //         AutoRead: true,
        //         IDNumberRead: false,
        //         IDTextRead: true,
        //         IDATextRead: false,
        //         IDPhotoRead: true,
        //     };
        //     const jsonStr = JSON.stringify(JS_OBJ);
        //     console.log("auto setup : ", jsonStr);
        //     wSocketSend(jsonStr);
        //     GetAutoReadOptions();
        // }

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
                    // setAutoReadOptions();
                    getReaderlist();
                } else {
                    Swal.fire({
                        title: 'มีบางอย่างผิดพลาด !',
                        icon: 'error',
                    })
                }

            }

            //NOTE - Response หลังจาก อ่านบัตรอัตโนมัติ
            // if (msgObj.Message == "AutoReadIDCardE") {
            //     // stopTimer();
            //     data.value = JSON.parse(JSON.stringify(msgObj));
            //     ReaderData.value = parseIDText(data.value.ID_Text);
            //     putimagtoScreen(data.value.ID_Photo);
            //     putDatatoSendData(ReaderData.value);
            //     console.log("ReaderData : ", ReaderData.value);
            // }

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
                if (msgObj.Status == -1001) {
                    Swal.fire({
                        title: 'มีบางอย่างผิดพลาด !',
                        text: 'กรุณาลองใหม่อีกครั้ง [-1001]',
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
            } else if (msgObj.Status === -7) {
                Swal.fire({
                    title: 'บัตรที่อ่านไม่ใช่บัตรประชาชน !',
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
            sendData.value.vehicleType = 'TRUCK'
            document.getElementById('Photo').src = "/Logo-Sunsweet-Final.svg";
        }

        const resetSendData = () => {
            sendData.value.name = '';
            sendData.value.identityNumber = '';
            sendData.value.address = '';
            sendData.value.licenseId = '';
            sendData.value.tel = '';
        }

        // ################################################## //
        //NOTE - Function to Capture img from Web Cam
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

            // ปรับขนาด canvas เพื่อให้ย่อภาพ
            canvas.width = 320
            canvas.height = 240
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

            // preview base64
            capturedImage.value = canvas.toDataURL('image/jpeg', 0.8)

            // แปลงเป็นไฟล์โดยบีบอัดให้ไม่เกิน 24 KB
            const file = await compressAndConvertToFile(canvas)
            UPimage.value = file
            console.log('✅ ได้ไฟล์ขนาด', file.size, 'bytes')
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
                            const expire = `${new Date().getFullYear()}-12-31`;
                            const data = {
                                guestName: sendData.value.name,
                                licensePlate: sendData.value.licensePlate.License,
                                licensePlateProvince: '',
                                start: dateFormatValue(sendData.value.time),
                                listType: 'fixedlist',
                                expire: expire,

                                identityNumber: '',
                                address: '',

                                vehicleType: sendData.value.vehicleType,
                                cate: 'stranger',
                                personCardImgUrl: res.data.filePath,
                                cdataId: sendData.value._id,
                                timeStamp: sendData.value.time,
                                visitorTel: sendData.value.tel,

                                agency: sendData.value.agency || '',
                                object: sendData.value.object || '',
                                contactPerson: sendData.value.contactPerson || '',
                                totalVisitor: sendData.value.totalVisitor || '',
                                department: sendData.value.department || '',
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
                                    isCapturedDoc.value = false
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
            imgService,
            printForm,
            qrImage,
            activeTab,
            inputField,
            dataLicense,
            sendDataLicense,
            submitBylicenseId,
            datetimeFormatLimit,
            stranger,

            //NOTE - Function to Capture img from Web Cam
            videoRef,
            canvasRef,
            capturedImage,
            capture,
            submitWOther,
            retakeDocImage,
            isCapturedDoc,

            CreatedSuccess,
        }
    },
    components: {
        QrcodeVue,
        CheckOut,
        // RemainTable,
        DetailRemain,
        PersonRegister
    },
    computed: {
        formatTime() {
            return this.formatDateTime(this.sendData.time)
        },
        pageCount() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
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
        isHorizontal: false,
        headers: [
            { title: 'ลำดับ', align: 'center', sortable: false, key: 'index' },
            { title: 'หมายเลขทะเบียน', align: 'center', sortable: false, key: 'license' },
            { title: 'เจ้าของ', align: 'center', sortable: false, key: 'license' },
            { title: 'วันที่/เวลา (ขาเข้า)', align: 'center', sortable: false, key: 'entry.time' },
            { title: 'วันที่/เวลา (ขาออก)', align: 'center', sortable: false, key: 'entry.checkoutTimeStamp' },
            { title: 'สถานะ', align: 'center', sortable: false, key: 'entry.msg' },
            { title: 'รายละเอียดเพิ่มเติม', align: 'center', sortable: false, key: 'inout' },
        ],
        data: [],
        page: 1,
        itemsPerPage: 5,
        startDate: new Date(),
        endDate: new Date(),
        tabs: {
            car: true,
            person: false,
        },
        interval: null,
    }),
    mounted() {
        this.checkOrientation();
        window.addEventListener('resize', this.checkOrientation);
        this.endDate = this.addDays(this.startDate, +1)
        this.getData();
        this.interval = setInterval(() => {
            this.getData();
        }, 60000);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkOrientation);
        clearInterval(this.interval);
    },
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
        checkOrientation() {
            this.isHorizontal = window.innerWidth > window.innerHeight;
        },
        async getData() {
            const start = datetimeFormatLimit(this.startDate);
            const end = datetimeFormatLimit(this.endDate);
            const park = this.$store.state.park;
            await this.stranger.RemainingInSite(start, end, park).then((res) => {
                if (res.message === 'ok') {
                    this.data = res.data;
                    this.page = 1;
                } else {
                    this.$swal({
                        icon: 'error',
                        title: 'มีบางอย่างผิดพลาด',
                        text: 'กรุณาลองใหม่อีกครั้ง !',
                    });
                }
            });
        },
        addDays(date, days) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        },
        formatDateTime(dateString) {
            if (dateString === null || dateString === undefined || !dateString) {
                return '-';
            } else {
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
            }
        },
    },
})
</script>

<style scoped>
.overflow-y-auto {
    overflow-y: auto;
}

.overflow-yp-auto {
    overflow-y: auto;
}

/* Scrollbar สำหรับ Chrome, Edge, และ Safari */
.overflow-y-auto::-webkit-scrollbar {
    width: 10px;
    /* ปรับขนาด Scrollbar */
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: white;
    /* เปลี่ยนสีพื้นหลังของ Scrollbar */
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: white;
    /* เปลี่ยนสีของ Scrollbar */
    border-radius: 4px;
    border: 1px solid rgba(128, 128, 128, 0.521);
    /* เพิ่มเส้นขอบเพื่อให้มองเห็น */
}

.overflow-x-auto {
    overflow-x: auto;
}

.overflow-x-auto::-webkit-scrollbar {
    width: 10px;
    /* ปรับขนาด Scrollbar */
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: white;
    /* เปลี่ยนสีพื้นหลังของ Scrollbar */
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: white;
    /* เปลี่ยนสีของ Scrollbar */
    border-radius: 4px;
    border: 1px solid rgba(128, 128, 128, 0.521);
    /* เพิ่มเส้นขอบเพื่อให้มองเห็น */
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
