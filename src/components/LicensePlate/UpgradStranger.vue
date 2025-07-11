<template>
    <div v-if="this.data.cate === 'stranger'">
        <v-btn icon="mdi-arrow-up" size="small" variant="flat" color="orange-darken-2" @click="getData()"></v-btn>
    </div>

</template>

<script>
import { LPService } from '../../api/licenseplate';
import { vehicleService } from '../../api/Vehicle';
import { dateFormatValue } from '../../function/day';
export default {
    emits: ['success'],
    props: {
        id: String,
        data: Object
    },
    setup() {
        const lp = new LPService();
        const vehicle = new vehicleService();
        return {
            lp,
            vehicle
        }
    },
    data: () => ({
        dialogUpgrade: false,
        sendData: {
            deviceId: [],
            listType: 'fixedlist',
        },
        DeviceData: [],
    }),
    methods: {
        async getDevice() {
            await this.vehicle.getDevice(this.$store.state.park).then(res => {
                if (res.message === 'get devices successfully') {
                    this.DeviceData = res.devices;
                    this.sendData.deviceId = [this.DeviceData[0]._id]
                }
            })
        },
        async getData() {
            this.$swal({
                // // title: "ต้องการเปลี่ยนสถานะของผู้ใช้งานใช่หรือไม่ ?",
                // text: "ต้องการเปลี่ยนสถานะของผู้ใช้งานใช่หรือไม่ ?",
                html: `<h3>ต้องการอัปเดตสถานะของผู้ใช้งานใช่หรือไม่ ?</h3> <br /> เมื่อทำการยืนยันระบบจะทำการอัปเดตสถานะเป็น <br /> "ผู้ติดต่อที่ลงทะเบียน" ทันที`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ยืนยัน",
                cancelButtonText: "ยกเลิก"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    this.getDevice();
                    this.sendData = { ...this.sendData, ...this.data };
                    console.log(this.sendData)
                    const park = this.$store.state.park;
                    const token = localStorage.getItem("token");
                    const data = {
                        guestName: this.sendData.guestName,
                        licensePlate: this.sendData.licensePlate.replace(/[^ก-ฮ0-9a-zA-Z]/g, ''),
                        licensePlateProvince: this.sendData.licensePlateProvince,
                        listType: this.sendData.listType,
                        start: dateFormatValue(this.sendData.start),
                        expire: '2025-12-31',

                        address: this.sendData.address || '',

                        // agency: this.sendData.agency, //ไม่มี
                        identityNumber: this.sendData.identityNumber || '',
                        // brand: this.sendData.brand, //ไม่มี
                        // carColor: this.sendData.carColor, //ไม่มี
                        // object: this.sendData.object, //ไม่มี
                        cate: 'visitor',
                        vehicleType: this.sendData.vehicleType,
                        // category: this.sendData.category, //ไม่มี

                        // contactPerson: this.LicensePlateDB.contactPerson,
                        // department: this.LicensePlateDB.department,
                        visitorTel: this.sendData.visitorTel,
                    }
                    console.log(data)
                    await this.lp.CreateLP(park, data, token).then(async (res) => {
                        if (res.message === 'ok') {
                            const licenseId = res.data._id
                            const DataToDevice = {
                                deviceId: this.sendData.deviceId,
                                licenseId: licenseId,
                                listType: 'fixedlist',
                            }
                            this.$emit('success');
                            await this.vehicle.AddDevice(DataToDevice).then(async (res) => {
                                if (res.message === 'ok') {
                                    this.$swal({
                                        icon: 'success',
                                        title: `เพิ่มข้อมูลสำเร็จ!`,
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                    });
                                    this.$emit('success');
                                    this.sendData = {
                                        deviceId: [],
                                        listType: 'fixedlist',
                                    };
                                } else {
                                    this.$swal({
                                        icon: 'warning',
                                        title: `ไม่สามารถเพิ่มอุปกรณ์ได้ !`,
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                    });
                                }

                            })
                        } else {
                            this.$swal({
                                icon: 'warning',
                                title: `ไม่สามารถบันทึกข้อมูลได้ !`,
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                            });
                        }
                    })
                }
            })
        },
    }
}
</script>

<style scoped></style>