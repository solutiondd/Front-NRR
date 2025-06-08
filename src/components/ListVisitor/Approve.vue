<template>
    <v-btn color="success" icon="mdi-check" size="small" variant="flat" @click="getData()"></v-btn>
</template>

<script>
import { LPService } from '../../api/licenseplate';
import { vehicleService } from '../../api/Vehicle';
import { dateFormatValue } from '../../function/day';
export default {
    emits: ['success'],
    props: {
        lpdata: Object,
        Id: String,
    },
    setup() {
        const lp = new LPService();
        const vehicle = new vehicleService();
        return {
            lp,
            vehicle,
        }
    },
    data: () => ({
        LicensePlateDB: [],
        DeviceData: [],
        sendData: {
            deviceId: [],
        }
    }),
    methods: {
        async getData() {
            this.getDevice();
            this.LicensePlateDB = this.lpdata;
            console.log("LicensePlateDB : ", this.LicensePlateDB);
            const park = this.$store.state.park;
            const token = localStorage.getItem("token");
            const data = {
                guestName: this.LicensePlateDB.guestName,
                licensePlate: this.LicensePlateDB.licensePlate.replace(/[^ก-ฮ0-9a-zA-Z]/g, ''),
                licensePlateProvince: this.LicensePlateDB.licensePlateProvince,
                listType: this.LicensePlateDB.listType,
                start: dateFormatValue(this.LicensePlateDB.start),
                expire: '2025-12-31',

                agency: this.LicensePlateDB.agency,
                identityNumber: this.LicensePlateDB.identityNumber || '',
                brand: this.LicensePlateDB.brand,
                carColor: this.LicensePlateDB.carColor,
                object: this.LicensePlateDB.object,
                cate: 'visitor',
                vehicleType: this.LicensePlateDB.vehicleType,
                category: this.LicensePlateDB.category,

                contactPerson: this.LicensePlateDB.contactPerson,
                department: this.LicensePlateDB.department,
                visitorTel: this.LicensePlateDB.tel,
            }
            console.log("Data to send: ", data);
            await this.lp.CreateLP(park, data, token).then(async (res) => {
                if (res.message === 'ok') {
                    const licenseId = res.data._id
                    const sendData = {
                        deviceId: this.sendData.deviceId,
                        licenseId: licenseId,
                        listType: 'fixedlist',
                        requestEntryId: this.Id,
                    }
                    await this.vehicle.AddDevice(sendData).then(res => {
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
                            this.LicensePlateDB = [];
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
        },
        async getDevice() {
            await this.vehicle.getDevice(this.$store.state.park).then(res => {
                if (res.message == 'get devices successfully') {
                    this.DeviceData = res.devices;
                    this.sendData.deviceId = [this.DeviceData[0]._id]
                }
            })
        }
    },
}
</script>

<style></style>