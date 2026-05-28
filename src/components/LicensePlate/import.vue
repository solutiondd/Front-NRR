<template>
    <v-btn color="info" prepend-icon="mdi-file-excel">นำเข้า Excel
        <v-dialog v-model="dialog" activator="parent" max-width="980px" transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar title="นำเข้าข้อมูลทะเบียนรถจาก Excel" density="compact" color="primary"></v-toolbar>
                <v-card-text class="pa-5">
                    <v-row>
                        <v-col cols="12">
                            <v-file-input v-model="excelFile" accept=".xlsx,.xls" variant="outlined"
                                density="comfortable" prepend-icon="mdi-microsoft-excel" label="เลือกไฟล์ Excel"
                                :disabled="uploading" @update:modelValue="handleFileChange"></v-file-input>
                        </v-col>

                        <v-col cols="12" v-if="sheetHeaders.length">
                            <v-alert type="info" variant="tonal" class="mb-4">
                                ระบบจะใช้ชื่อคอลัมน์ที่เลือกด้านล่าง หากไม่พบค่าจะส่งเป็นค่าว่าง
                                และถ้าไม่ได้ระบุประเภทจะใช้ CAR
                            </v-alert>
                            <div class="mb-3">
                                <p class="font-weight-bold mb-2">คอลัมน์ที่พบในไฟล์</p>
                                <div class="d-flex flex-wrap ga-2">
                                    <v-chip v-for="header in sheetHeaders" :key="header" size="small"
                                        color="grey-darken-2">
                                        {{ header }}
                                    </v-chip>
                                </div>
                            </div>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <p class="mb-2">คอลัมน์ชื่อ-นามสกุล</p>
                            <v-select v-model="columnMap.guestName" :items="headerOptions" item-title="label"
                                item-value="value" variant="outlined" density="comfortable" clearable
                                placeholder="เลือกคอลัมน์"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="mb-2">คอลัมน์ทะเบียน</p>
                            <v-select v-model="columnMap.licensePlate" :items="headerOptions" item-title="label"
                                item-value="value" variant="outlined" density="comfortable" clearable
                                placeholder="เลือกคอลัมน์"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="mb-2">คอลัมน์จังหวัด</p>
                            <v-select v-model="columnMap.licensePlateProvince" :items="headerOptions" item-title="label"
                                item-value="value" variant="outlined" density="comfortable" clearable
                                placeholder="เลือกคอลัมน์"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="mb-2">คอลัมน์ประเภท</p>
                            <v-select v-model="columnMap.vehicleType" :items="headerOptions" item-title="label"
                                item-value="value" variant="outlined" density="comfortable" clearable
                                placeholder="เลือกคอลัมน์"></v-select>
                        </v-col>

                        <v-col cols="12" v-if="previewRows.length">
                            <p class="font-weight-bold mb-2">ตัวอย่างข้อมูล 3 แถวแรก</p>
                            <v-table density="compact" class="preview-table">
                                <thead>
                                    <tr>
                                        <th>ชื่อ-นามสกุล</th>
                                        <th>ทะเบียน</th>
                                        <th>จังหวัด</th>
                                        <th>ประเภท</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, index) in previewRows" :key="index">
                                        <td>{{ row.guestName }}</td>
                                        <td>{{ row.licensePlate }}</td>
                                        <td>{{ row.licensePlateProvince }}</td>
                                        <td>{{ row.vehicleType }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="justify-end px-5 pb-5">
                    <v-btn variant="text" color="red-lighten-1" @click="closeDialog"
                        :disabled="uploading">ยกเลิก</v-btn>
                    <v-btn variant="flat" color="green-lighten-1" append-icon="mdi-upload" :loading="uploading"
                        :disabled="!canImport" @click="submitImport">นำเข้า</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
import * as XLSX from 'xlsx';
import { LPService } from '../../api/licenseplate';

export default {
    emits: ['success'],
    setup() {
        const lp = new LPService();
        return {
            lp,
        }
    },
    data: () => ({
        dialog: false,
        excelFile: null,
        sheetHeaders: [],
        sheetRows: [],
        uploading: false,
        columnMap: {
            guestName: null,
            licensePlate: null,
            licensePlateProvince: null,
            vehicleType: null,
        },
    }),
    computed: {
        headerOptions() {
            return [
                { label: 'ไม่ระบุ', value: null },
                ...this.sheetHeaders.map((header) => ({ label: header, value: header })),
            ];
        },
        canImport() {
            return this.sheetRows.length > 0 && !this.uploading;
        },
        previewRows() {
            return this.sheetRows.slice(0, 3).map((row) => ({
                guestName: this.getCellValue(row, this.columnMap.guestName),
                licensePlate: this.getCellValue(row, this.columnMap.licensePlate),
                licensePlateProvince: this.getCellValue(row, this.columnMap.licensePlateProvince),
                vehicleType: this.getVehicleType(this.getCellValue(row, this.columnMap.vehicleType)),
            }));
        },
    },
    methods: {
        closeDialog() {
            this.dialog = false;
            this.resetState();
        },
        resetState() {
            this.excelFile = null;
            this.sheetHeaders = [];
            this.sheetRows = [];
            this.uploading = false;
            this.columnMap = {
                guestName: null,
                licensePlate: null,
                licensePlateProvince: null,
                vehicleType: null,
            };
        },
        async handleFileChange(file) {
            this.sheetHeaders = [];
            this.sheetRows = [];

            const selectedFile = Array.isArray(file) ? file[0] : file;

            if (!selectedFile) {
                return;
            }

            try {
                const buffer = await selectedFile.arrayBuffer();
                const workbook = XLSX.read(buffer, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];

                if (!firstSheetName) {
                    throw new Error('ไม่พบแผ่นงานในไฟล์');
                }

                const worksheet = workbook.Sheets[firstSheetName];
                const rawRows = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                    defval: '',
                    blankrows: false,
                });

                if (!rawRows.length) {
                    throw new Error('ไฟล์ไม่มีข้อมูล');
                }

                this.sheetHeaders = rawRows[0].map((header, index) => String(header || '').trim() || `Column ${index + 1}`);
                this.sheetRows = rawRows.slice(1)
                    .filter((row) => Array.isArray(row) && row.some((cell) => String(cell ?? '').trim() !== ''))
                    .map((row) => {
                        const mapped = {};

                        this.sheetHeaders.forEach((header, index) => {
                            mapped[header] = row[index] ?? '';
                        });

                        return mapped;
                    });

                this.columnMap = {
                    guestName: this.findHeader(['ชื่อ-นามสกุล', 'ชื่อ', 'name', 'fullname']),
                    licensePlate: this.findHeader(['ทะเบียน', 'เลขทะเบียน', 'licenseplate', 'plate']),
                    licensePlateProvince: this.findHeader(['จังหวัด', 'province']),
                    vehicleType: this.findHeader(['ประเภท', 'vehicletype', 'vehicle type']),
                };
            } catch (error) {
                this.$swal({
                    icon: 'warning',
                    title: 'อ่านไฟล์ไม่สำเร็จ',
                    text: error?.message || 'กรุณาตรวจสอบไฟล์ Excel อีกครั้ง',
                });
                this.resetState();
            }
        },
        findHeader(candidates) {
            const normalizedHeaders = this.sheetHeaders.map((header) => this.normalizeText(header));

            for (const candidate of candidates) {
                const candidateIndex = normalizedHeaders.indexOf(this.normalizeText(candidate));
                if (candidateIndex !== -1) {
                    return this.sheetHeaders[candidateIndex];
                }
            }

            return null;
        },
        getCellValue(row, header) {
            if (!header) {
                return '';
            }

            return String(row?.[header] ?? '').trim();
        },
        normalizeText(value) {
            return String(value ?? '')
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/-/g, '');
        },
        getVehicleType(value) {
            const normalized = this.normalizeText(value);

            if (!normalized) {
                return 'CAR';
            }

            const map = {
                car: 'CAR',
                รถยนต์: 'CAR',
                motorcycle: 'MOTORCYCLE',
                รถจักรยานยนต์: 'MOTORCYCLE',
                motorbike: 'MOTORCYCLE',
                truck: 'TRUCK',
                รถบรรทุก: 'TRUCK',
            };

            return map[normalized] || String(value).trim().toUpperCase() || 'CAR';
        },
        buildPayload(row) {
            const importDate = new Date();
            const expireDate = new Date(importDate);
            expireDate.setFullYear(expireDate.getFullYear() + 5);

            const guestName = this.getCellValue(row, this.columnMap.guestName);
            const licensePlate = this.getCellValue(row, this.columnMap.licensePlate).replace(/[^ก-ฮ0-9a-zA-Z]/g, '');
            const licensePlateProvince = this.getCellValue(row, this.columnMap.licensePlateProvince);
            const vehicleType = this.getVehicleType(this.getCellValue(row, this.columnMap.vehicleType));

            return {
                guestName,
                licensePlate,
                licensePlateProvince,
                vehicleType,
                start: importDate.toISOString(),
                expire: expireDate.toISOString(),
                listType: 'fixedlist',
                agency: 'SDD',
                cate: 'member',
                category: 'รถพนักงาน',
                userId: this.$store.state.userId ? this.$store.state.userId : '',
                address: '',
                brand: '',
                carColor: '',
                object: '',
                contactPerson: '',
                department: '',
                identityNumber: '',
                visitorTel: '',
                driverLicenseId: '',
                cdataId: '',
                personImgUrl: '',
            };
        },
        async submitImport() {
            if (!this.sheetRows.length) {
                this.$swal({
                    icon: 'warning',
                    title: 'กรุณาเลือกไฟล์ Excel',
                });
                return;
            }

            const token = localStorage.getItem('token');
            const park = this.$store.state.park;
            const rows = this.sheetRows.map((row) => this.buildPayload(row));

            this.uploading = true;

            let successCount = 0;
            let failCount = 0;

            try {
                for (const payload of rows) {
                    const res = await this.lp.CreateLP(park, payload, token);
                    if (res?.message === 'ok') {
                        successCount += 1;
                    } else {
                        failCount += 1;
                    }
                }

                this.$swal({
                    icon: failCount > 0 ? 'warning' : 'success',
                    title: 'นำเข้าข้อมูลเสร็จสิ้น',
                    text: `สำเร็จ ${successCount} รายการ${failCount > 0 ? `, ไม่สำเร็จ ${failCount} รายการ` : ''}`,
                });

                this.$emit('success');
                this.closeDialog();
            } catch (error) {
                this.$swal({
                    icon: 'warning',
                    title: 'นำเข้าข้อมูลไม่สำเร็จ',
                    text: error?.message || 'กรุณาลองใหม่อีกครั้ง',
                });
            } finally {
                this.uploading = false;
            }
        },
    },
}
</script>

<style scoped>
.preview-table :deep(th),
.preview-table :deep(td) {
    font-size: 0.9rem;
}
</style>
