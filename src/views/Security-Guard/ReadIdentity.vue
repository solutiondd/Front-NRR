<template>
    <div id="app">
        <button @click="printForm">พิมพ์ฟอร์ม</button>

        <!-- Form content -->
        <div id="form-container" style="display: none;">
            <div style="text-align: center;">
                <!-- โลโก้ -->
                <img src="../../assets/Logo-Sunsweet-Final.svg" alt="Logo"
                    style="max-width: 50%; margin-bottom: 10px; margin-top: 20px;" />

                <!-- ข้อความ h1 -->
                <h2>ผู้ติดต่อที่ไม่ได้ลงทะเบียน</h2>

                <!-- ช่องสี่เหลี่ยมสำหรับลายเซ็น -->
                <div>
                    <p style="text-align: start; line-height: 50px; margin: 0;width: 90%;">ลายเซ็น :</p>
                </div>
                <div style="border: 1px solid black; height: 150px; width: 90%;"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        async printForm() {
            const formContainer = document.getElementById("form-container");
            const images = formContainer.getElementsByTagName("img");

            // ฟังก์ชันรอให้รูปภาพโหลดเสร็จทั้งหมด
            const loadImages = () => {
                return Promise.all(
                    Array.from(images).map(img => {
                        return new Promise(resolve => {
                            if (img.complete) {
                                resolve();
                            } else {
                                img.onload = () => resolve();
                                img.onerror = () => resolve(); // ป้องกันกรณีโหลดภาพไม่สำเร็จ
                            }
                        });
                    })
                );
            };

            await loadImages(); // รอให้รูปภาพโหลดเสร็จ

            // เปิดหน้าต่างใหม่สำหรับปริ้น
            const formContent = formContainer.innerHTML;
            const printWindow = window.open('', '', 'height=600,width=800');
            printWindow.document.write('<html><head><title>Visitor</title>');
            printWindow.document.write('<style>@media print {');
            printWindow.document.write('body { font-family: Arial, sans-serif; text-align: center; }');
            printWindow.document.write('@page { size: 80mm 210mm; margin: 0; }');
            printWindow.document.write('div { max-width: 80mm; margin: 0 auto; }');
            printWindow.document.write('footer { position: fixed; bottom: 0; width: 100%; text-align: center; }');
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