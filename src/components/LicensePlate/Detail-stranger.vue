<template>
    <v-btn v-if="data.cate === 'stranger'" color="primary" icon="" size="small" @click="getData()">
        <v-icon>mdi-magnify</v-icon>
        <v-dialog v-model="dialog" activator="parent" width="400px">
            <v-toolbar color="primary" density="compact">
                <v-toolbar-title>
                    <p class="d-flex align-center"><v-icon size="small" class="mr-2">mdi-magnify</v-icon>รายละเอียด</p>
                </v-toolbar-title>
            </v-toolbar>
            <v-card class="pa-5">
                <v-row>
                    <v-col cols="12" class="text-center">
                        <h3 class="d-flex align-center justify-center pb-5"><v-icon size="small"
                                class="mr-2">mdi-image</v-icon>รูปผู้ลงทะเบียน</h3>
                        <div v-if="Image">
                            <img :src="'data:image/jpeg;base64,' + Image" alt="blank" width="120px">
                        </div>
                        <!-- กรณีไม่มีรูปภาพ -->
                        <img v-else src="../../assets/Logo-Sunsweet-Final_White.svg" alt="No image" width="150px">
                    </v-col>
                    <v-col cols="12">
                        <h3 class="d-flex align-center pb-2"><v-icon size="small"
                                class="mr-2">mdi-account</v-icon>ข้อมูลผู้ลงทะเบียน</h3>
                        <p>ชื่อ-นานสกุล : {{ data.guestName }}</p>
                        <p>วันที่เข้า : {{ data.start }}</p>
                        <p>เลขบัตรประจำตัว : {{ data.identityNumber }}</p>
                        <p>ที่อยู่ : {{ data.address }}</p>
                        <p>เบอร์โทรศัพท์ : {{ data.visitorTel }}</p>
                    </v-col>
                    <v-col cols="12">
                        <h3 class="d-flex align-center pb-2"><v-icon size="small"
                                class="mr-2">mdi-car</v-icon>ข้อมูลยานพาหนะ</h3>
                        <p>ป้ายทะเบียน : {{ data.licensePlate }}</p>
                        <p>ประเภทยานพาหนะ : {{ vehicleLabel }}</p>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-btn variant="flat" color="red" @click="dialog = false">ปิด</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
import { ImageService } from '../../api/UploadImage';
export default {
    setup() {
        const img = new ImageService();
        return {
            img,
        }
    },
    props: {
        data: Object
    },
    computed: {
        vehicleLabel() {
            const vehicleMap = {
                CAR: "รถยนต์ (CAR)",
                MOTORCYCLE: "รถจักรยานยนต์ (MOTORCYCLE)",
                TRUCK: "รถบรรทุก (TRUCK)",
            };
            return vehicleMap[this.data.vehicleType] || "ไม่ทราบประเภท";
        }
    },
    data: () => ({
        dialog: false,
        Image: null,
        blobUrl: null
    }),
    methods: {
        async getImage(data) {
            try {
                const base64 = await this.img.getImg(data);
                if (base64) {
                    // เก็บ base64 ไว้ใช้กับ template
                    this.Image = base64;
                } else {
                    console.error("No image data received");
                }
            } catch (error) {
                console.error("Error in getImage:", error);
            }
        },
        async getData() {
            await this.getImage(this.data.personImgUrl);
            this.dialog = true;
        },
    },
}
</script>

<style scoped>
p {
    font-size: 1.1rem;
}
</style>