<template>
    <div class="pa-5" onload="onPageLoad()" onunload="onPageUnload()">
        <v-card class="pa-5">
            <h1>Hello From Read IdentityNumber</h1>
            <v-btn color="primary" @click="readIDCard">ทดสอบ</v-btn>
            <v-sheet class="pt-5">
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="ReaderData.name"></v-text-field>
                        <v-text-field v-model="ReaderData.address"></v-text-field>
                        <v-text-field v-model="ReaderData.identityNumber"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <img id="Photo" src="../../assets/Logo-Sunsweet-Final_White.svg" alt="" width="200px">
                    </v-col>
                </v-row>
            </v-sheet>
        </v-card>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
    setup() {
        let wSocket = ref(null);
        let debugFlag = ref(false);
        let data = ref({});
        let ReaderData = ref({});

        const onPageLoad = () => {
            initWebsocket();
        }

        const onPageUnload = () => {
            if (wSocket != null) {
                wSocket.close();
            }
        }

        const initWebsocket = () => {
            wSocket = new WebSocket("ws://localhost:14820/TDKWAgent");
            wSocket.onopen = function () {
                if (debugFlag) {
                    console.log("WebSocket is connected now.");
                }
            }
            wSocket.onmessage = (evt) => onGetMessage(evt.data);
            wSocket.onclose = () => {
                document.getElementById("socket-message").style.color = "red";
                document.getElementById("socket-message").innerHTML =
                    "Agent: No connection";
                if (debugFlag) {
                    console.log("WebSocket: onclose() event called.");
                }
            }
            wSocket.onerror = (evt) => {
                document.getElementById("socket-message").style.color = "red";
                document.getElementById("socket-message").innerHTML =
                    "Agent: No connection";
                if (debugFlag) {
                    console.log("WebSocket: onerror() event called.");
                }
            };
        }

        const wSocketSend = (json_Str) => {
            if (debugFlag) {
                console.log(">" + JSON.parse(json_Str).Command);
            }
            wSocket.send(json_Str);
        }

        const GetAutoReadOptions = () => {
            const JS_OBJ = {
                command: "GetAutoReadOptions",
            };
            const jsonStr = JSON.stringify(JS_OBJ);
            wSocketSend(jsonStr);
        }

        const setAutoReadOptions = () => {
            const JS_OBJ = {
                Command: "SetAutoReadOptions",
                AutoRead: true,
                IDNumberRead: false,
                IDTextRead: true,
                IDATextRead: false,
                IDPhotoRead: true,
            };
            const jsonStr = JSON.stringify(JS_OBJ);
            console.log("auto setup : ", jsonStr);
            wSocketSend(jsonStr);
            GetAutoReadOptions();
        }

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
            resetTimer();
            startTimer();
        }

        //ANCHOR - ABOUT TIME AND TIMER

        let readingTimeMs = 0;
        let then = new Date();

        //NOTE - ตัวจับเวลา
        const startTimer = () => {
            then.setTime(then.getTime() - readingTimeMs);
        }

        const stopTimer = () => {
            let now = new Date();
            readingTimeMs = now.getTime() - then.getTime();
            // document.getElementById("Reading_Time").style.display = "inherit";
            // document.getElementById("Reading_Time").innerHTML =
            //     "Reading Time: " + msToSecond(readingTimeMs) + " s";
        }

        const resetTimer = () => {
            readingTimeMs = 0;
            // document.getElementById("Reading_Time").innerHTML =
            //     "Reading Time: " + msToSecond(readingTimeMs) + " s";
            // document.getElementById("Reading_Time").style.display = "none";
        }

        const msToSecond = (duration) => {
            const milliseconds = parseInt((duration % 1000) / 100),
                seconds = Math.floor(duration / 1000);
            return seconds + "." + milliseconds;
        }


        let intendPresent_flag = ref(false);
        const onGetMessage = (jsonString) => {
            const msgObj = JSON.parse(jsonString);

            if (msgObj.Message != "ReadingProgressE" && msgObj.Message != "CardStatusChangeE") {
                if (debugFlag) {
                    console.log("<" + msgObj.Message + "(" + msgObj.Status + ")");
                }
            }

            if (msgObj.Message == "AgentStatusE") {
                if (msgObj.Status == 1) {
                    setAutoReadOptions();
                    getReaderlist();
                    // label.innerHTML = "Agent: " + msgObj.AgentInfo;
                    // label.style.color = "blue";
                } else {
                    alert("ERROR Code :" + msgObj.Status);
                }
            }

            if (msgObj.Message == "CardStatusChangeE") {
                if (debugFlag) {
                    console.log(
                        "<CardStatusChangeE: " +
                        "(" +
                        msgObj.Status +
                        ")" +
                        " ReaderName: " +
                        "(" +
                        msgObj.ReaderName +
                        ")"
                    );
                }

                if (msgObj.Status == -1004) {
                    alert("ERROR Code :" + msgObj.Status);
                    return;
                } else if (msgObj.Status == 1) {
                    resetTimer();
                    startTimer();
                    // clearScreen();

                    intendPresent_flag = false;
                    // document.getElementById("ReaderNameStatus").style.color =
                    //     "limegreen";
                    // document.getElementById("ReaderNameStatus").innerHTML =
                    //     msgObj.ReaderName;

                    // document.getElementById("lbCardStatus").style.color = "limegreen";
                    // document.getElementById("lbCardStatus").innerHTML =
                    //     "Card Status: Present";
                    // document.getElementById("LEDCardStatus").style.backgroundColor =
                    //     "limegreen";
                } else if (msgObj.Status == -16) {
                    intendPresent_flag = true;
                    // document.getElementById("ReaderNameStatus").style.color = "red";
                    // document.getElementById("ReaderNameStatus").innerHTML =
                    //     msgObj.ReaderName;

                    // document.getElementById("lbCardStatus").style.color = "red";
                    // document.getElementById("lbCardStatus").innerHTML =
                    //     "Card Status: Absent";
                    // document.getElementById("LEDCardStatus").style.backgroundColor =
                    //     "red";
                } else if (msgObj.Status == 0) {
                    // document.getElementById("lbCardStatus").style.color = "orange";
                    // document.getElementById("lbCardStatus").innerHTML =
                    //     "Card Status: Unknown";
                    // document.getElementById("LEDCardStatus").style.backgroundColor =
                    //     "orange";

                    // document.getElementById("ReaderNameStatus").style.color = "orange";
                    // document.getElementById("ReaderNameStatus").innerHTML =
                    //     msgObj.ReaderName;
                } else {
                    alert("ERROR Code :" + msgObj.Status);
                }
                msgObj.ReaderName = "";
            }

            if (msgObj.Message == "ReadingProgressE") {
                if (msgObj.Status == 0) {
                    // document.getElementById("myBar").style.backgroundColor = 'rgb(10, 206, 241)';
                    // document.getElementById("myBar").style.width = msgObj.Progress + "%";
                    // document.getElementById("lbBar").innerHTML = msgObj.Progress + "%";
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
                }
                if (msgObj.Status == -1) {
                    document.getElementById("myBar").style.backgroundColor = "red";
                }
            }
            //NOTE - Response หลังจาก อ่านบัตรอัตโนมัติ
            if (msgObj.Message == "AutoReadIDCardE") {
                stopTimer();
                data.value = JSON.parse(JSON.stringify(msgObj));
                ReaderData.value = parseIDText(data.value.ID_Text);
                putimagtoScreen(data.value.ID_Photo);
                console.log("ReaderData : ", ReaderData.value);
            }

            if (msgObj.Message == "AutoSelectReaderE") {
                // document.getElementById("ReaderSelected").style.color = "limegreen";
                // document.getElementById("ReaderSelected").innerHTML =
                //     msgObj.ReaderName;
            }

            if (msgObj.Message == "GetReaderListR") {
                // var readerData = msgObj.ReaderList;
                // var readerList = document.getElementById("listReadername");
                // if (msgObj.Status > 0) {
                //     while (readerList.options.length) {
                //         readerList.remove(0);
                //     }
                //     var i;
                //     for (i = 0; i < readerData.length; i++) {
                //         var txtReaderName = new Option(readerData[i], i);
                //         readerList.options.add(txtReaderName);
                //     }
                // } else {
                //     if (msgObj.Status == -3 || msgObj.Status == 0) {
                //         while (readerList.options.length) {
                //             readerList.remove(0);
                //         }
                //         var txtReaderName = new Option("Reader not found", 0);
                //         readerList.options.add(txtReaderName);
                //     } else {
                //         alert("ERROR Code :" + msgObj.Status);
                //     }
                // }
            }

            if (msgObj.Message == "SelectReaderR") {
                var strReader = msgObj.ReaderName;
                // var readerSelect = document.getElementById("ReaderSelected");
                if (parseInt(msgObj.Status) > 0) {
                    // readerSelect.innerHTML = strReader;
                    // readerSelect.style.color = "green";
                } else {
                    if (strReader == "") {
                        strReader = "Reader";
                    }
                    // readerSelect.innerHTML = strReader + ": Not selected";
                    // readerSelect.style.color = "red";
                    // var readerList = document.getElementById("listReadername");
                    // if (msgObj.Status == -3) {
                    //     while (readerList.options.length) {
                    //         readerList.remove(0);
                    //     }
                    //     var txtReaderName = new Option("Reader not found", 0);
                    //     readerList.options.add(txtReaderName);
                    // }
                    alert("ERROR Code :" + msgObj.Status);
                }
            }
            //NOTE - Response หลังจาก กดอ่านบัตร เอง
            if (msgObj.Message == "ReadIDCardR") {
                stopTimer();
                data.value = JSON.parse(JSON.stringify(msgObj));
                ReaderData.value = parseIDText(data.value.ID_Text);
                putimagtoScreen(data.value.ID_Photo);
                console.log("ReaderData : ", ReaderData.value);
            }

            if (msgObj.Message == "GetSoftwareInfoR") {
                if (msgObj.Status == 0) {
                    var StrResult = msgObj.SoftwareInfo.split("#");
                    var txtResult = "";
                    var i;
                    for (i = 0; i < StrResult.length; i++) {
                        txtResult += StrResult[i] + "\r\n";
                    }
                    alert(txtResult);
                } else {
                    alert("ERROR Code :" + msgObj.Status);
                }
            }

            if (msgObj.Message == "GetLicenseInfoR") {
                if (msgObj.Status == 0) {
                    alert(msgObj.LicenseInfo);
                } else {
                    alert("ERROR Code :" + msgObj.Status);
                }
            }

            if (msgObj.Message == "GetReaderIDR") {
                if (msgObj.Status > 0) {
                    alert("Reader ID: " + msgObj.ReaderID);
                } else {
                    alert("ERROR Code :" + msgObj.Status);
                }
            }

            if (msgObj.Message == "UpdateLicenseFileR") {
                if (msgObj.Status >= 0 && msgObj.Status < 4)
                    alert(
                        "The new license file has been successfully updated. (" +
                        msgObj.Status +
                        ")"
                    );
                else if (msgObj.Status >= 100 && msgObj.Status < 104)
                    alert(
                        "The lastest license file has already been installed. (" +
                        msgObj.Status +
                        ")"
                    );
                else alert("ERROR Code :" + msgObj.Status);
            }

            if (msgObj.Message == "GetAutoReadOptionsR") {
                if (msgObj.Status == 0) {
                    document.getElementById("chkAutoRead").checked = msgObj.AutoRead;
                    document.getElementById("chkAutoNIDNumber").checked =
                        msgObj.IDNumberRead;
                    document.getElementById("chkAutoNIDText").checked =
                        msgObj.IDTextRead;
                    document.getElementById("chkAutoAText").checked =
                        msgObj.IDATextRead;
                    document.getElementById("chkAutoNIDPhoto").checked =
                        msgObj.IDPhotoRead;
                } else alert("ERROR Code :" + msgObj.Status);
            }

            if (msgObj.Message == "SetAutoReadOptionsR") {
                if (msgObj.Status == 0) {
                    // document.getElementById("chkAutoRead").checked = msgObj.AutoRead;
                    // document.getElementById("chkAutoNIDNumber").checked =
                    //     msgObj.IDNumberRead;
                    // document.getElementById("chkAutoNIDText").checked =
                    //     msgObj.IDTextRead;
                    // document.getElementById("chkAutoAText").checked =
                    //     msgObj.IDATextRead;
                    // document.getElementById("chkAutoNIDPhoto").checked =
                    //     msgObj.IDPhotoRead;
                    console.log("SetAutoReadOptionsR : ", msgObj);
                } else alert("ERROR Code :" + msgObj.Status);
            }
        }

        const parseIDText = (idText) => {
            const keys = [
                "idNumber", "titleTh", "firstNameTh", "", "lastNameTh",
                "titleEn", "firstNameEn", "", "lastNameEn",
                "houseNo", "villageNo", "", "", "subDistrict",
                "district", "province", "gender", "birthDate",
                "issueAt", "issueDate", "expiryDate", "laserCode"
            ];

            const data = idText.split("#").map((item) => item.trim()).reduce((obj, val, index) => {
                if (keys[index]) obj[keys[index]] = val || ""; // เก็บเฉพาะ key ที่ไม่ใช่ค่าว่าง
                return obj;
            }, {});

            // รวมข้อมูล name และ address ตามที่ต้องการ
            const name = `${data.firstNameTh} ${data.lastNameTh}`;
            const address = `${data.houseNo} หมู่ที่ ${data.villageNo} ตำบล ${data.subDistrict} อำเภอ ${data.district} จังหวัด ${data.province}`;
            const identityNumber = data.idNumber;

            // เก็บผลลัพธ์ในรูปแบบที่ต้องการ
            return {
                name,
                address,
                identityNumber
            };
        };

        const putimagtoScreen = (IDPhoto) => {
            var base64str = IDPhoto;
            var photo = document.getElementById("Photo");  // เลือก element img ที่มี id = "Photo"

            if (base64str != null && base64str !== "") {
                // กรณีที่ Base64 string ถูกต้อง
                photo.setAttribute(
                    "src",
                    "data:image/png;base64," + base64str
                );
            } else {
                // กรณีที่ไม่มี Base64 หรือค่าภาพเป็น null ให้แสดงภาพปกติ
                photo.src = "../../assets/Logo-Sunsweet-Final_White.svg";
            }

            if (debugFlag) {
                console.log("Reading is finished");
            }
        }

        onMounted(() => {
            onPageLoad();
        })

        return {
            onPageLoad,
            onPageUnload,
            readIDCard,
            data,
            ReaderData
        }
    }
}
</script>

<style></style>