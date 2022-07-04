import request from "request"
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const IMAGE_GET_START = 'http://bit.ly/maicongthanh-bot-1'

const IMAGE_MAIN_MENU_2 = 'https://bit.ly/eric-bot-2'
const IMAGE_MAIN_MENU_3 = 'https://bit.ly/eric-bot-3'
const IMAGE_MAIN_MENU_4 = 'https://bit.ly/eric-bot-4'


const IMAGE_VIEW_DOCTOR1 = 'https://bit.ly/eric-bot-5'
const IMAGE_VIEW_DOCTOR2 = 'https://bit.ly/eric-bot-6'
const IMAGE_VIEW_DOCTOR3 = 'https://bit.ly/eric-bot-7'

const IMAGE_BACK_MAIN_MENU = 'https://bit.ly/eric-bot-8'

const IMAGE_VIEW_DOCTOR4 = 'https://bit.ly/eric-bot-9'
const IMAGE_VIEW_DOCTOR5 = 'https://wallpapercave.com/dwp1x/wp2756455.jpg'
const IMAGE_VIEW_DOCTOR6 = 'https://bit.ly/eric-bot-11'

const IMAGE_VIEW_DOCTOR7 = 'https://bit.ly/eric-bot-12'
const IMAGE_VIEW_DOCTOR8 = 'https://bit.ly/eric-bot-13-1'
const IMAGE_VIEW_DOCTOR9 = 'https://bit.ly/eric-bot-14'

const IMAGE_VIEW_DOCTOR10 = 'https://bit.ly/eric-bot-15'
const IMAGE_VIEW_DOCTOR11 = 'https://bit.ly/eric-bot-16'
const IMAGE_VIEW_DOCTOR12 = 'https://bit.ly/eric-bot-17'

const IMAGE_GIF_WELCOME = 'https://media0.giphy.com/media/3o6ozt8eXv5SqeWcVO/giphy.gif?cid=ecf05e47ycsxrbmj35dhotplx5tr7u0t1ljn923c1hwt5zte&rid=giphy.gif'

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
            let response1 = { "text": `Xin chào mừng bạn ${username} đến với nhà hàng của Mai Công Thành` }

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
                    "subtitle": "Dưới đây là các lựa chọn của nhà hàng",
                    "image_url": IMAGE_GET_START,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "THÔNG TIN MENU",
                            "payload": "MAIN_PAGE",
                        },
                        {
                            "type": "web_url",
                            "url": `${process.env.URL_WEB_VIEW_ORDER}/${senderID}`,
                            "title": "ĐẶT LỊCH",
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
                "title": "MENU CHÍNH",
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
                        "title": "MENU CHÍNH",
                        "subtitle": "Chúng tôi hân hạnh mang đến những sự trải nghiệm tốt nhất",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BỮA SÁNG",
                                "payload": "DOCTOR",
                            },
                            {
                                "type": "postback",
                                "title": "BỮA TRƯA",
                                "payload": "SPECIALTY",
                            },
                            {
                                "type": "postback",
                                "title": "BỮA TỐI",
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
                                "title": "ĐẶT LỊCH",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true
                            },
                        ],
                    },
                    {
                        "title": "Không gian nhà hàng",
                        "subtitle": "Rộng rãi , thoáng mát và cực kì yên tĩnh và có thể chứa tối đa 300 khách hàng",
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
                        "title": "Món tráng miệng",
                        "subtitle": "Nhà hàng có nhiều món tráng miệng hấp dẫn ",
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
                        "title": "Cá bảy màu",
                        "subtitle": "Cá nước mặn và có nước ngọt",
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
                        "title": "Thịt hun khói",
                        "subtitle": "Chuyên khoa 3 , phòng khám 3",
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
                        "title": "Món tráng miệng",
                        "subtitle": "Nhà hàng có nhiều món tráng miệng hấp dẫn ",
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
                        "title": "Cá bảy màu",
                        "subtitle": "Cá nước mặn và có nước ngọt",
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
                        "title": "Thịt hun khói",
                        "subtitle": "Chuyên khoa 3 , phòng khám 3",
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
                        "title": "Món tráng miệng",
                        "subtitle": "Nhà hàng có nhiều món tráng miệng hấp dẫn ",
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
                        "title": "Cá bảy màu",
                        "subtitle": "Cá nước mặn và có nước ngọt",
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
                        "title": "Thịt hun khói",
                        "subtitle": "Chuyên khoa 3 , phòng khám 3",
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
                        "title": "Dưa hấu Vmart",
                        "subtitle": "50.000dđ/1kg",
                        "image_url": IMAGE_VIEW_DOCTOR4,
                    },
                    {
                        "title": "Xoài Vmart",
                        "subtitle": "20.000đ/1kg",
                        "image_url": IMAGE_VIEW_DOCTOR5,
                    },
                    {
                        "title": "Ổi Vmart",
                        "subtitle": "10.000đ/1kg",
                        "image_url": IMAGE_VIEW_DOCTOR6,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIẾT",
                                "payload": "SHOW_ROOMS",
                            },
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
                        "title": "Cá hồi Châu Âu",
                        "subtitle": "150.000đ/1kg",
                        "image_url": IMAGE_VIEW_DOCTOR7,
                    },
                    {
                        "title": "Cá chéo ông Táo",
                        "subtitle": "200.000đ/1kg",
                        "image_url": IMAGE_VIEW_DOCTOR8,
                    },
                    {
                        "title": "Cá ngừ Châu Mỹ",
                        "subtitle": "300.000đ/1kg",
                        "image_url": IMAGE_VIEW_DOCTOR9,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIẾT",
                                "payload": "SHOW_ROOMS",
                            },
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
                        "title": "Thịt lợn hun khói",
                        "subtitle": "500.000đ/1kg",
                        "image_url": IMAGE_VIEW_DOCTOR10,
                    },
                    {
                        "title": "Thịt bò Châu Mỹ",
                        "subtitle": "200.000đ/1kg",
                        "image_url": IMAGE_VIEW_DOCTOR11,
                    },
                    {
                        "title": "Thịt trâu Đồ Sơn",
                        "subtitle": "789 Trần Xuân Soạn",
                        "image_url": IMAGE_VIEW_DOCTOR12,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIẾT",
                                "payload": "SHOW_ROOMS",
                            },
                        ],
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
                "text": "Nhà hàng có thể phụ vụ tối đa 300 khách hàng",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Quay lại Trang Chính",
                        "payload": "MAIN_PAGE"
                    },
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}/${senderID}`,
                        "title": "ĐẶT LỊCH",
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
            let response1 = { "text": `Xin chào bạn ${username} , Mình là chat bot của nhà hàng Mai Công Thành . \n Để biết thêm thông tin , vui lòng xem thông tin bên dưới nhé  ` }
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
                        "url": "https://business.facebook.com/maicongthanh45261/videos/1171446100303978/",
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