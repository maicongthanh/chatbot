import request from "request"
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const IMAGE_GET_START = 'http://bit.ly/maicongthanh-bot-1'

const IMAGE_MAIN_MENU_2 = 'http://bit.ly/maicongthanh-bot2'
const IMAGE_MAIN_MENU_3 = 'http://bit.ly/maicongthanh-bot3'
const IMAGE_MAIN_MENU_4 = 'http://bit.ly/maicongthanh-bot4'


const IMAGE_VIEW_DOCTOR1 = 'http://bit.ly/maicongthanh-bot5'
const IMAGE_VIEW_DOCTOR2 = 'http://bit.ly/maicongthanh-bot6'
const IMAGE_VIEW_DOCTOR3 = 'http://bit.ly/maicongthanh-bot7'

const IMAGE_BACK_MAIN_MENU = 'https://bit.ly/eric-bot-8'

const IMAGE_VIEW_DOCTOR4 = 'http://bit.ly/maicongthanh-alex-1'
const IMAGE_VIEW_DOCTOR5 = 'http://bit.ly/maicongthanh-alex-2'
const IMAGE_VIEW_DOCTOR6 = 'http://bit.ly/maicongthanh-alex-3'

const IMAGE_VIEW_DOCTOR7 = 'https://bit.ly/maicongthanh-ronaldo-1'
const IMAGE_VIEW_DOCTOR8 = 'https://bit.ly/maicongthanh-ronaldo-2'
const IMAGE_VIEW_DOCTOR9 = 'https://bit.ly/maicongthanh-ronaldo-3'

const IMAGE_VIEW_DOCTOR10 = 'https://bit.ly/maicongthanh-rooney-1'
const IMAGE_VIEW_DOCTOR11 = 'https://bit.ly/maicongthanh-rooney-2'
const IMAGE_VIEW_DOCTOR12 = 'https://bit.ly/maicongthanh-rooney-3'

const IMAGE_GIF_WELCOME = 'https://images6.fanpop.com/image/photos/37800000/-Hello-penguins-of-madagascar-37800672-500-500.gif'

let callSendAPI = (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            }
            await sendMarkReadMessage(sender_psid)
            await sendTypingOn(sender_psid)

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v9.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('message sent')
                } else {
                    console.error("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e)
        }
    })

}

let sendTypingOn = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('sendTypingOn sent!')
        } else {
            console.error("Unable to send sendTypingOn:" + err);
        }
    });
}

let sendMarkReadMessage = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "mark_seen"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('sendTypingOn sent!')
        } else {
            console.error("Unable to send sendTypingOn:" + err);
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
            let response1 = { "text": `Xin chào mừng ${username} đến với web đặt lịch khám bệnh của Mai Công Thành` }

            //send generic template message
            // let response2 = getStartedTemplate(sender_psid);

            //send an image
            let response2 = getImageGetStartedTemplate();

            //send a quick reply
            let response3 = getStartedQuickReplyTemplate();


            //send text message
            await callSendAPI(sender_psid, response1)

            //send an image
            await callSendAPI(sender_psid, response2)
            //send a quick reply

            await callSendAPI(sender_psid, response3)


            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}



let getStartedTemplate = (senderID) => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Xin kính chào quý khách",
                    "subtitle": "Dưới đây là các lựa chọn của bệnh viện",
                    "image_url": IMAGE_GET_START,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "THÔNG TIN CHÍNH",
                            "payload": "MAIN_PAGE",
                        },
                        {
                            "type": "web_url",
                            "url": `${process.env.URL_WEB_VIEW_ORDER}/${senderID}`,
                            "title": "ĐẶT LỊCH TƯ VẤN",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true
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

let getStartedQuickReplyTemplate = () => {
    let response = {
        "text": "Dưới đây là các lựa chọn của chúng tôi",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "TRANG CHÍNH",
                "payload": "MAIN_PAGE",

            },
            {
                "content_type": "text",
                "title": "HD SỬ DỤNG BOT",
                "payload": "GUIDE_TO_USE",

            },
        ]
    }
    return response
}

let getImageGetStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "image",
            "payload": {
                "url": IMAGE_GIF_WELCOME,
                "is_reusable": true
            }
        }
    }
    return response;
}

let handleSendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getMainMenuTemplate(sender_psid);

            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let getMainMenuTemplate = (senderID) => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "TRANG CHÍNH",
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
                                "type": "web_url",
                                "url": `${process.env.URL_WEB_VIEW_ORDER}/${senderID}`,
                                "title": "ĐẶT LỊCH TƯ VẤN",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true
                            },
                        ],
                    },
                    {
                        "title": "Không gian bệnh viện",
                        "subtitle": "Rộng rãi , thoáng mát và cực kì yên tĩnh",
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
                        "title": "Alex Ferguson",
                        "subtitle": "Huấn luyện viên của Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR1",
                            }
                        ],
                    },
                    {
                        "title": "Cristiano Ronaldo",
                        "subtitle": "Cầu thủ của Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR2",
                            }
                        ],
                    },
                    {
                        "title": "Wayne Rooney",
                        "subtitle": "Quỷ đầu đàn",
                        "image_url": IMAGE_VIEW_DOCTOR3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR3",
                            }
                        ],
                    },
                    {
                        "title": "Quay trở lại ",
                        "subtitle": "Quay trở lại Trang chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
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
                        "title": "Alex Ferguson",
                        "subtitle": "Huấn luyện viên của Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR1",
                            }
                        ],
                    },
                    {
                        "title": "Cristiano Ronaldo",
                        "subtitle": "Cầu thủ của Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR2",
                            }
                        ],
                    },
                    {
                        "title": "Wayne Rooney",
                        "subtitle": "Quỷ đầu đàn",
                        "image_url": IMAGE_VIEW_DOCTOR3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR3",
                            }
                        ],
                    },
                    {
                        "title": "Quay trở lại ",
                        "subtitle": "Quay trở lại Trang chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    },
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
                        "title": "Alex Ferguson",
                        "subtitle": "Huấn luyện viên của Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR1",
                            }
                        ],
                    },
                    {
                        "title": "Cristiano Ronaldo",
                        "subtitle": "Cầu thủ của Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR2",
                            }
                        ],
                    },
                    {
                        "title": "Wayne Rooney",
                        "subtitle": "Quỷ đầu đàn",
                        "image_url": IMAGE_VIEW_DOCTOR3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DOCTOR3",
                            }
                        ],
                    },
                    {
                        "title": "Quay trở lại ",
                        "subtitle": "Quay trở lại Trang chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    },
                ]
            }
        }
    }
    return response
}

let handleBackToMainMenu = async (sender_psid) => {
    await handleSendMainMenu(sender_psid)
}

let handleViewDetailDoctor1 = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getDetailViewDoctor1();

            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailViewDoctor1 = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Thời gian huấn luyện",
                        "subtitle": "26 năm ở câu lạc bộ",
                        "image_url": IMAGE_VIEW_DOCTOR4,
                    },
                    {
                        "title": "Biệt danh ",
                        "subtitle": "Máy sấy tóc",
                        "image_url": IMAGE_VIEW_DOCTOR5,
                    },
                    {
                        "title": "Sở thích",
                        "subtitle": "Nhai kẹo cao su",
                        "image_url": IMAGE_VIEW_DOCTOR6,
                    },
                    {
                        "title": "Quay trở lại ",
                        "subtitle": "Quay trở lại Trang chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    },
                ]
            }
        }
    }
    return response
}

let handleViewDetailDoctor2 = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getDetailViewDoctor2();

            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getDetailViewDoctor2 = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Thời gian ở câu lạc bộ",
                        "subtitle": "Trải qua 2 khoảng thời gian khác nhau",
                        "image_url": IMAGE_VIEW_DOCTOR7,
                    },
                    {
                        "title": "Biệt danh",
                        "subtitle": "CR7",
                        "image_url": IMAGE_VIEW_DOCTOR8,
                    },
                    {
                        "title": "Sở thích",
                        "subtitle": "Khoe body",
                        "image_url": IMAGE_VIEW_DOCTOR9,
                    },
                    {
                        "title": "Quay trở lại ",
                        "subtitle": "Quay trở lại Trang chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    },
                ]
            }
        }
    }
    return response
}
let handleViewDetailDoctor3 = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = getDetailViewDoctor3();

            await callSendAPI(sender_psid, response1)

            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}
let getDetailViewDoctor3 = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Thời gian ở câu lạc bộ",
                        "subtitle": "13 năm thi đấu ở đây",
                        "image_url": IMAGE_VIEW_DOCTOR10,
                    },
                    {
                        "title": "Biệt danh",
                        "subtitle": "Gã Shrek ",
                        "image_url": IMAGE_VIEW_DOCTOR11,
                    },
                    {
                        "title": "Sở thích",
                        "subtitle": "Đụng là xúc",
                        "image_url": IMAGE_VIEW_DOCTOR12,
                    },
                    {
                        "title": "Quay trở lại ",
                        "subtitle": "Quay trở lại MENU chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    },
                ]
            }
        }
    }
    return response
}

let getImageRoomTemplate = () => {
    let response = {
        "attachment": {
            "type": "image",
            "payload": {
                "url": IMAGE_MAIN_MENU_4,
                "is_reusable": true
            }
        }
    }
    return response;
}

let getTemplateButtonRoom = (senderID) => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Không gian bệnh viện rộng rãi , yên tĩnh , nhân viên phục vụ nhiệt tình chu đáo",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Quay lại Trang Chính",
                        "payload": "MAIN_PAGE"
                    },
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}/${senderID}`,
                        "title": "ĐẶT LỊCH TƯ VẤN",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true
                    },
                ]
            }
        }
    }
    return response
}

let handleShowRoomsDetail = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Send email
            let response1 = getImageRoomTemplate(sender_psid);

            //send a button template : text , button
            let response2 = getTemplateButtonRoom(sender_psid);

            await callSendAPI(sender_psid, response1)
            await callSendAPI(sender_psid, response2)
            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let handleGuideToUserBOt = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Send text message
            let username = await getUserName(sender_psid)
            let response1 = { "text": `Xin chào bạn ${username} , Mình là chat bot của web đặt lịch khám bệnh Mai Công Thành . \n Để biết thêm thông tin , vui lòng xem thông tin bên dưới nhé 😁  ` }
            //send a button template : text , button
            let response2 = getBotMediaTemplate();

            await callSendAPI(sender_psid, response1)
            await callSendAPI(sender_psid, response2)
            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

let getBotMediaTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "media",
                "elements": [
                    {
                        "media_type": "video",
                        "url": "https://business.facebook.com/maicongthanh45261/videos/112828894815433/",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Quay lại MENU Chính",
                                "payload": "MAIN_PAGE"
                            },
                            {
                                "type": "web_url",
                                "title": "My Facebook",
                                "url": "https://www.facebook.com/profile.php?id=100024354322866",
                                "webview_height_ratio": "full"
                            },
                        ]
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
    handleBackToMainMenu,
    handleViewDetailDoctor1,
    handleViewDetailDoctor2,
    handleViewDetailDoctor3,
    handleShowRoomsDetail,
    getUserName,
    handleGuideToUserBOt
}