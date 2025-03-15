<template>
    <v-btn color="primary" icon="" @click="dialog === true" size="small"><v-icon>mdi-magnify</v-icon>
        <v-dialog v-model="dialog" activator="parent" width="400px">
            <v-toolbar color="primary" density="compact" title="รายละเอียด"></v-toolbar>
            <v-card class="pa-5">
                <v-row>
                    <v-col cols="12">
                        <h3>ข้อมูลผู้ลงทะเบียนและยานพาหนะ</h3>
                        <p>ชื่อ-นานสกุล : {{ data.guestName }}</p>
                        <p>ป้ายทะเบียน : {{ data.licensePlate }}</p>
                        <p>จังหวัด : {{ data.licensePlateProvince }}</p>
                        <p>ประเภทรถ : {{ data.vehicleType }}</p>
                    </v-col>
                    <v-col cols="12">
                        <h3>ข้อมูลอุปกรณ์</h3>
                        <p>ชื่ออุปกรณ์ : {{ data.devices[0]?.name }}</p>
                        <p>ประเภทการเข้า/ออก : {{ data.devices[0]?.gate }}</p>
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
export default {
    props: {
        data: Object
    },
    data: () => ({
        dialog: false
    })
}
</script>

<style></style>