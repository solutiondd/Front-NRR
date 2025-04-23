<template>
    <div v-if="this.data.devices?.length === 0 && this.data.cate !== 'stranger'">
        <v-btn v-if="role != 'visitor'" color="success" icon="" size="small" variant="flat"
            @click="getData()"><v-icon>mdi-check</v-icon>
        </v-btn>
    </div>
    <div v-else-if="this.data.devices?.length > 0">
        <v-chip color="green">อนุมัติสำเร็จ</v-chip>
    </div>

    <!-- <v-dialog v-model="dialogToCloud" activator="parent" max-width="400px" max-height="530px"
            transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar title="เพิ่มอุปกรณ์" density="compact" color="primary"></v-toolbar>
                <v-form fast-fail @submit.prevent="submit" class="pa-5 pb-0">
                    <v-card width="100%" class="px-5 py-5" color="grey-darken-3">
                        <v-row>
                            <v-col cols="12" class="px-2 py-0">
                                <p class="mb-2">อุปกรณ์</p>
                                <v-autocomplete variant="outlined" density="compact" v-model="sendData.deviceId"
                                    :items="DeviceData" item-title="name" item-value="_id" multiple></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card-actions class="justify-end py-5">
                        <v-btn variant="text" color="red-lighten-1" @click="dialogToCloud = false" rounded="xl"
                            width="80">ยกเลิก</v-btn>
                        <v-btn rounded="xl" append-icon="mdi-arrow-right" type="submit" color="green-lighten-1"
                            variant="flat" width="100">ยืนยัน</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog> -->
</template>

<script>
import { vehicleService } from '../../api/Vehicle';
export default {
    emits: ['success'],
    props: {
        id: String,
        data: Object
    },
    setup() {
        const vehicle = new vehicleService();
        return {
            vehicle,
        }
    },
    computed: {
        role() {
            return this.$store.state.role
        },
    },
    data: () => ({
        dialogToCloud: false,
        sendData: {
            deviceId: [],
            licenseId: '',
            listType: 'fixedlist',
        },
        DeviceData: [],
    }),
    methods: {
        async getData() {
            await this.vehicle.getDevice(this.$store.state.park).then(res => {
                if (res.message == 'get devices successfully') {
                    this.DeviceData = res.devices;
                    this.sendData.deviceId = [this.DeviceData[0]._id]
                    this.sendData.licenseId = this.id
                    this.submit();
                }
            })
        },
        async submit() {
            const data = {
                deviceId: this.sendData.deviceId,
                licenseId: this.id,
                listType: 'fixedlist'
            }
            console.log(data)
            await this.vehicle.AddDevice(data).then(res => {
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
                    this.dialogToCloud = false;
                    this.$emit('success');
                    this.sendData = {
                        deviceId: [],
                        licenseId: '',
                        listType: 'fixedlist',
                    }
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
    },
}
</script>

<style></style>