<template>
    <div id="app">
        <button @click="printForm">พิมพ์ฟอร์ม</button>

        <!-- Form content -->
        <div id="form-container" style="display: none;">
            <div style="text-align: center;">
                <v-row>
                    <v-col cols="6" class="text-start">
                        <p style="font-size: 12px;">เล่มที่ : 138</p>
                        <p style="font-size: 10px;">F/HR/SC.01.04.06 RV:06</p>
                    </v-col>
                    <v-col cols="6" class="text-end">
                        <p style="font-size: 12px;">เลขที่ : 13707</p>
                        <p style="font-size: 10px;">ISSUED DATE : 28/03/2568</p>
                    </v-col>
                </v-row>
                <div style="text-align: center; margin-bottom: 10px;">
                    <qrcode-vue :value="qrValue" :size="100" level="H" render-as="image"></qrcode-vue>
                    <p style="font-size: 12px;">{{ qrValue }}</p>
                </div>
                <!-- ข้อความ h1 -->
                <h3>บันทึกการเข้า-ออก บริษัท ซันสวีท จำกัด (มหาชน)</h3>

                <!-- ช่องสี่เหลี่ยมสำหรับลายเซ็น -->

            </div>
            <div style="text-align: start; font-size: 12px;">
                <p style="font-weight: bold;">วันที่ : <span style="font-weight: 400;">28/03/2568</span></p>
                <p style="font-weight: bold;">เวลาเข้า : <span style="font-weight: 400;">12.00</span> </p>
                <p style="font-weight: bold;">ชื่อ (ผู้ติดต่อ) : <span style="font-weight: 400;">วัชรพล
                        ลีลาวัชรมาศ</span></p>
                <p style="font-weight: bold;">บริษัท/หน่วยงาน : <span style="font-weight: 400;">Solution DD</span></p>
                <p style="font-weight: bold;">จำนวนคน : <span style="font-weight: 400;">1</span></p>
                <p style="font-weight: bold;">ทะเบียนรถ : <span style="font-weight: 400;">จต3635</span></p>
                <p style="font-weight: bold;">ติดต่อแผนก/คุณ : <span style="font-weight: 400;">คุณภาคภูมิ</span></p>
                <p style="font-weight: bold;">รายละเอียดกิจธุระ : <span
                        style="font-weight: 400;">กล้องจับป้ายทะเบียน</span></p>
            </div>

            <div>
                <v-row>
                    <v-col>
                        <p style="font-size: 12px;">ลงชื่อผู้ติดต่อ</p>
                        <div style="border: 1px solid black;padding: 30px;"></div>
                    </v-col>
                    <v-col>
                        <p style="font-size: 12px;">ลงชื่อ รปภ.</p>
                        <div style="border: 1px solid black;padding: 30px;"></div>
                    </v-col>
                    <v-col>
                        <p style="font-size: 12px;">ลงชื่อผู้รับการติดต่อ</p>
                        <div style="border: 1px solid black;padding: 30px;"></div>
                    </v-col>
                </v-row>
            </div>

            <div style="padding-top: 20px; text-align: start;">
                <div style="border: 1px solid black;">
                    <h4 style="font-size: 10px; text-align: center;">
                        ระเบียบปฏิบัติสำหรับบุคคลภายนอกที่เข้ามาติดต่อบริษัทฯ
                    </h4>
                </div>
                <p style="font-size:10px">1. กรุณาติดบัตร VISITOR ตลอดเวลาที่อยู่ในบริษัทฯ</p>
                <p style="font-size:10px">2. กรุณาจอดรถในพื้นที่ ที่บริษัทฯกำหนด และกรุณาดับเครื่องยนต์ทุกครั้ง
                    เพื่อลดมลภาวะทางอากาศ</p>
                <p style="font-size:10px">3. ห้ามพกพาอาวุธ ของมึนเมา หรือสิ่งเสพติดทุกชนิดเข้ามาภายในบริษัทฯ</p>
                <p style="font-size:10px">4. กรณีที่ต้องเข้าสายการผลิต ต้องแต่งกายตามที่บริษัทฯ กำหนด</p>
                <p style="font-size:10px">5. ห้ามพกพา วัตถุสิ่งของประเภทแก้วทุกชนิด เข้ามาภายในบริษัทฯ</p>
                <p style="font-size:10px">6. ห้ามนำสิ่งของอื่น ออกนอกบริษัทฯ ก่อนได้รับอนุญาตจากเจ้าหน้าที่บริษัทฯ</p>
                <p style="font-size:10px">7. ห้ามสูบบุหรี่ในอาคารบริษัทฯ และบริเวณรอบๆ พื้นที่ (เว้นแต่บริเวณที่บริษัทฯ
                    จัดไว้ให้เท่านั้น)</p>
            </div>
            <div style="padding-top: 20px; text-align: start;">
                <div style="border: 1px solid black;">
                    <h4 style="font-size: 10px; text-align: center;">
                        ระเบียบปฏิบัติด้านความปลอดภัยและการจัดการด้านสิ่งแวดล้อม ISO 14001
                    </h4>
                </div>
                <p style="font-size:10px">1. ปฏิบัติตามป้ายห้าม, ป้ายเตือนต่างๆ อย่างเคร่งครัด เพื่อความปลอดภัย
                    และรักษาสภาพแวดล้อมของบริษัทฯ</p>
                <p style="font-size:10px">2. รถยนต์/จักรยานยนต์ ต้องมีการตรวจสอบน้ำมันรั่วไหลก่อนเข้าบริษัทฯ</p>
                <p style="font-size:10px">3. ผู้รับเหมาต้องกำจัดขยะ และนำออกอย่างเหมาะสมไม่ปล่อยน้ำเสีย/ ไม่ก่อเสียงดัง/
                    ไม่สร้างมลพิษ</p>
                <p style="font-size:10px">4. ผู้รับเหมาต้องสวมอุปกรณ์ PPE
                    ที่เหมาะสมเพื่อความปลอดภัยตามลักษณะความเสี่ยงของงาน</p>
                <p style="font-size:10px">5. ผู้ที่เข้ามาติดต่อบริษัทฯ ต้องร่วมมือในการอนุรักษ์พลังงาน
                    และใช้ทรัพยากรอย่างมีประสิทธิภาพ</p>
                <p style="font-size:10px">6. รถรับเปลือกต้องไม่ปล่อยน้ำล้างเปลือกลงบนพื้นถนนและรางน้ำฝน</p>
                <p style="font-size:10px">7. ขับรถในบริษัทฯ ด้วยความเร็วไม่เกิน ๑๐ ก.ม./ช.ม. เพื่อความปลอดภัย</p>
                <p style="font-size:10px">8. ผู้มาติดต่อที่เข้าบริษัท ต้องมีเจ้าหน้าที่ของบริษัทฯ พาเข้าพื้นที่ทุกครั้ง
                    เพื่อความปลอดภัย</p>
            </div>
            <div style="padding-top: 20px;">
                <div style="text-align: center;border: 1px solid black;">
                    <p style="font-size: 12px; font-weight: bold;">กรุณานำบัตร VISITOR คืนให้เจ้าหน้าที่ รปภ.
                        ก่อนออกจากบริษัทฯ
                        และต้องมีลายเซ็นของเจ้าหน้าที่บริษัทฯ จึงจะสามารถออกนอกบริษัทฯ ได้</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
export default {
    components: {
        QrcodeVue,
    },
    data() {
        return {
            qrValue: "622903256", // เปลี่ยนเป็นค่าที่ต้องการ
        };
    },
    methods: {
        async printForm() {
            const formContainer = document.getElementById("form-container");
            const qrCanvas = formContainer.querySelector("canvas");

            if (qrCanvas) {
                // แปลง QR Code เป็นรูปภาพ
                const qrImageUrl = qrCanvas.toDataURL("image/png");

                // สร้าง <img> แทนที่ <canvas>
                const qrImg = document.createElement("img");
                qrImg.src = qrImageUrl;
                qrImg.style.width = "100px"; // ปรับขนาดตามต้องการ
                qrImg.style.height = "100px";

                // แทนที่ <canvas> ด้วย <img>
                qrCanvas.replaceWith(qrImg);
            }

            // เปิดหน้าต่างใหม่สำหรับปริ้น
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
            printWindow.document.write('.v-col { flex: 0 0 45%; margin-bottom: 5px; }'); // จัดระเบียบ v-col
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
        },
    },
};
</script>