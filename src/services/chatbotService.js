import request from "request"
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const IMAGE_GET_START = 'http://bit.ly/maicongthanh-bot-1'

const IMAGE_MAIN_MENU_2 = 'https://bit.ly/maicongthanh-bot2'

const IMAGE_MAIN_MENU_3 = 'https://bit.ly/maicongthanh-bot3'

const IMAGE_MAIN_MENU_4 = 'https://bit.ly/maicongthanh-bot4'


let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

let getUserName = (sender_psid) => {
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body)
                let username = `${body.first_name} ${body.last_name} `;
                resolve(username)
            } else {
                console.error("Unable to send message:" + err);
                reject(err)
            }
        });
    })

}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid)
            let response1 = { "text": `Xin chào mừng bạn ${username} đến với Web đặt lịch khám bệnh của Mai Công Thành` }
            let response2 = getStartedTemplate();


            //send text message
            await callSendAPI(sender_psid, response1)

            //send generic template message

            await callSendAPI(sender_psid, response2)


            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let getStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Xin kính chào quý khách",
                    "subtitle": "Dưới đây là các lựa chọn của chúng tôi",
                    "image_url": IMAGE_GET_START,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "THÔNG TIN CHÍNH",
                            "payload": "MAIN_PAGE",
                        },
                        {
                            "type": "postback",
                            "title": "ĐẶT LỊCH",
                            "payload": "RESERVE",
                        },
                        {
                            "type": "postback",
                            "title": "HƯỚNG DẪN SỬ DỤNG BOT",
                            "payload": "GUIDE_TO_USE",
                        }
                    ],
                }]
            }
        }
    }
    return response
}

let handleSendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getMainMenuTemplate();

            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let getMainMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "TRANG CHỦ",
                        "subtitle": "Chúng tôi hân hạnh mang đến những sự trải nghiệm tốt nhất",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁC SĨ",
                                "payload": "DOCTOR",
                            },
                            {
                                "type": "postback",
                                "title": "CHUYÊN KHOA",
                                "payload": "SPECIALTY",
                            },
                            {
                                "type": "postback",
                                "title": "PHÒNG KHÁM",
                                "payload": "CLINIC",
                            }
                        ],
                    },
                    {
                        "title": "Giờ hoạt động",
                        "subtitle": "Thứ 2 - Chủ nhật || 8 giờ sáng - 5 giờ chiều",
                        "image_url": IMAGE_MAIN_MENU_3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "ĐẶT LỊCH",
                                "payload": "RESERVE",
                            },
                        ],
                    },
                    {
                        "title": "Không gian bệnh viện",
                        "subtitle": "Bệnh viện có chuyên tốt , sạch sẽ , luôn luôn hướng về bệnh nhân",
                        "image_url": IMAGE_MAIN_MENU_4,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIẾT",
                                "payload": "SHOW_ROOMS",
                            },
                        ],
                    }
                ]
            }
        }
    }
    return response
}

let handleSendDoctor = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getDoctorTemplate();

            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let getDoctorTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Bác sĩ 1",
                        "subtitle": "Chuyên khoa 1 , phòng khám 1",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR1",
                            }
                        ],
                    },
                    {
                        "title": "Bác sĩ 2",
                        "subtitle": "Chuyên khoa 2 , phòng khám 2",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR2",
                            }
                        ],
                    },
                    {
                        "title": "Bác sĩ 3",
                        "subtitle": "Chuyên khoa 3 , phòng khám 3",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR3",
                            }
                        ],
                    },
                ]
            }
        }
    }
    return response
}

let handleSendSpecialty = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getSpecialtyTemplate();

            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let getSpecialtyTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "TRANG CHỦ",
                        "subtitle": "Chúng tôi hân hạnh mang đến những sự trải nghiệm tốt nhất",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁC SĨ",
                                "payload": "DOCTOR",
                            },
                            {
                                "type": "postback",
                                "title": "CHUYÊN KHOA",
                                "payload": "SPECIALTY",
                            },
                            {
                                "type": "postback",
                                "title": "PHÒNG KHÁM",
                                "payload": "CLINIC",
                            }
                        ],
                    },
                    {
                        "title": "Giờ hoạt động",
                        "subtitle": "Thứ 2 - Chủ nhật || 8 giờ sáng - 5 giờ chiều",
                        "image_url": IMAGE_MAIN_MENU_3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "ĐẶT LỊCH",
                                "payload": "RESERVE",
                            },
                        ],
                    },
                    {
                        "title": "Không gian bệnh viện",
                        "subtitle": "Bệnh viện có chuyên tốt , sạch sẽ , luôn luôn hướng về bệnh nhân",
                        "image_url": IMAGE_MAIN_MENU_4,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIẾT",
                                "payload": "SHOW_ROOMS",
                            },
                        ],
                    }
                ]
            }
        }
    }
    return response
}

let handleSendClinic = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getClinicTemplate();

            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let getClinicTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "TRANG CHỦ",
                        "subtitle": "Chúng tôi hân hạnh mang đến những sự trải nghiệm tốt nhất",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁC SĨ",
                                "payload": "DOCTOR",
                            },
                            {
                                "type": "postback",
                                "title": "CHUYÊN KHOA",
                                "payload": "SPECIALTY",
                            },
                            {
                                "type": "postback",
                                "title": "PHÒNG KHÁM",
                                "payload": "CLINIC",
                            }
                        ],
                    },
                    {
                        "title": "Giờ hoạt động",
                        "subtitle": "Thứ 2 - Chủ nhật || 8 giờ sáng - 5 giờ chiều",
                        "image_url": IMAGE_MAIN_MENU_3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "ĐẶT LỊCH",
                                "payload": "RESERVE",
                            },
                        ],
                    },
                    {
                        "title": "Không gian bệnh viện",
                        "subtitle": "Bệnh viện có chuyên tốt , sạch sẽ , luôn luôn hướng về bệnh nhân",
                        "image_url": IMAGE_MAIN_MENU_4,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIẾT",
                                "payload": "SHOW_ROOMS",
                            },
                        ],
                    }
                ]
            }
        }
    }
    return response
}
module.exports = {
    handleGetStarted,
    callSendAPI,
    handleSendMainMenu,
    handleSendDoctor,
    handleSendSpecialty,
    handleSendClinic,
}