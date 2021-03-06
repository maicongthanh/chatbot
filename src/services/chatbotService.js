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

const IMAGE_BACK_MAIN_MENU = 'https://bit.ly/maicongthanh-manchester'

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
            let response1 = { "text": `Xin ch??o m???ng ${username} ?????n v???i web ?????t l???ch kh??m b???nh c???a Mai C??ng Th??nh` }

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
                    "title": "Xin k??nh ch??o qu?? kh??ch",
                    "subtitle": "D?????i ????y l?? c??c l???a ch???n c???a b???nh vi???n",
                    "image_url": IMAGE_GET_START,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "TH??NG TIN CH??NH",
                            "payload": "MAIN_PAGE",
                        },
                        {
                            "type": "web_url",
                            "url": `${process.env.URL_WEB_VIEW_ORDER}/${senderID}`,
                            "title": "?????T L???CH T?? V???N",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true
                        },
                        {
                            "type": "postback",
                            "title": "H?????NG D???N S??? D???NG BOT",
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
        "text": "D?????i ????y l?? c??c l???a ch???n c???a ch??ng t??i",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "TRANG CH??NH",
                "payload": "MAIN_PAGE",

            },
            {
                "content_type": "text",
                "title": "HD S??? D???NG BOT",
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
                        "title": "TRANG CH??NH",
                        "subtitle": "Ch??ng t??i h??n h???nh mang ?????n nh???ng s??? tr???i nghi???m t???t nh???t",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "B??C S??",
                                "payload": "DOCTOR",
                            },
                            {
                                "type": "postback",
                                "title": "CHUY??N KHOA",
                                "payload": "SPECIALTY",
                            },
                            {
                                "type": "postback",
                                "title": "PH??NG KH??M",
                                "payload": "CLINIC",
                            }
                        ],
                    },
                    {
                        "title": "Gi??? ho???t ?????ng",
                        "subtitle": "Th??? 2 - Ch??? nh???t || 8 gi??? s??ng - 5 gi??? chi???u",
                        "image_url": IMAGE_MAIN_MENU_3,
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": `${process.env.URL_WEB_VIEW_ORDER}/${senderID}`,
                                "title": "?????T L???CH T?? V???N",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true
                            },
                        ],
                    },
                    {
                        "title": "Kh??ng gian b???nh vi???n",
                        "subtitle": "R???ng r??i , tho??ng m??t v?? c???c k?? y??n t??nh",
                        "image_url": IMAGE_MAIN_MENU_4,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TI???T",
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
                        "subtitle": "Hu???n luy???n vi??n c???a Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_DOCTOR1",
                            }
                        ],
                    },
                    {
                        "title": "Cristiano Ronaldo",
                        "subtitle": "C???u th??? c???a Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_DOCTOR2",
                            }
                        ],
                    },
                    {
                        "title": "Wayne Rooney",
                        "subtitle": "Qu??? ?????u ????n",
                        "image_url": IMAGE_VIEW_DOCTOR3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_DOCTOR3",
                            }
                        ],
                    },
                    {
                        "title": "Quay tr??? l???i ",
                        "subtitle": "Quay tr??? l???i Trang ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
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
                        "subtitle": "Hu???n luy???n vi??n c???a Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_DOCTOR1",
                            }
                        ],
                    },
                    {
                        "title": "Cristiano Ronaldo",
                        "subtitle": "C???u th??? c???a Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_DOCTOR2",
                            }
                        ],
                    },
                    {
                        "title": "Wayne Rooney",
                        "subtitle": "Qu??? ?????u ????n",
                        "image_url": IMAGE_VIEW_DOCTOR3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_DOCTOR3",
                            }
                        ],
                    },
                    {
                        "title": "Quay tr??? l???i ",
                        "subtitle": "Quay tr??? l???i Trang ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
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
                        "subtitle": "Hu???n luy???n vi??n c???a Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_DOCTOR1",
                            }
                        ],
                    },
                    {
                        "title": "Cristiano Ronaldo",
                        "subtitle": "C???u th??? c???a Manchester United",
                        "image_url": IMAGE_VIEW_DOCTOR2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_DOCTOR2",
                            }
                        ],
                    },
                    {
                        "title": "Wayne Rooney",
                        "subtitle": "Qu??? ?????u ????n",
                        "image_url": IMAGE_VIEW_DOCTOR3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_DOCTOR3",
                            }
                        ],
                    },
                    {
                        "title": "Quay tr??? l???i ",
                        "subtitle": "Quay tr??? l???i Trang ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
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
                        "title": "Th???i gian hu???n luy???n",
                        "subtitle": "26 n??m ??? c??u l???c b???",
                        "image_url": IMAGE_VIEW_DOCTOR4,
                    },
                    {
                        "title": "Bi???t danh ",
                        "subtitle": "M??y s???y t??c",
                        "image_url": IMAGE_VIEW_DOCTOR5,
                    },
                    {
                        "title": "S??? th??ch",
                        "subtitle": "Nhai k???o cao su",
                        "image_url": IMAGE_VIEW_DOCTOR6,
                    },
                    {
                        "title": "Quay tr??? l???i ",
                        "subtitle": "Quay tr??? l???i Trang ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
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
                        "title": "Th???i gian ??? c??u l???c b???",
                        "subtitle": "Tr???i qua 2 kho???ng th???i gian kh??c nhau",
                        "image_url": IMAGE_VIEW_DOCTOR7,
                    },
                    {
                        "title": "Bi???t danh",
                        "subtitle": "CR7",
                        "image_url": IMAGE_VIEW_DOCTOR8,
                    },
                    {
                        "title": "S??? th??ch",
                        "subtitle": "Khoe body",
                        "image_url": IMAGE_VIEW_DOCTOR9,
                    },
                    {
                        "title": "Quay tr??? l???i ",
                        "subtitle": "Quay tr??? l???i Trang ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
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
                        "title": "Th???i gian ??? c??u l???c b???",
                        "subtitle": "13 n??m thi ?????u ??? ????y",
                        "image_url": IMAGE_VIEW_DOCTOR10,
                    },
                    {
                        "title": "Bi???t danh",
                        "subtitle": "G?? Shrek ",
                        "image_url": IMAGE_VIEW_DOCTOR11,
                    },
                    {
                        "title": "S??? th??ch",
                        "subtitle": "?????ng l?? x??c",
                        "image_url": IMAGE_VIEW_DOCTOR12,
                    },
                    {
                        "title": "Quay tr??? l???i ",
                        "subtitle": "Quay tr??? l???i MENU ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
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
                "text": "Kh??ng gian b???nh vi???n r???ng r??i , y??n t??nh , nh??n vi??n ph???c v??? nhi???t t??nh chu ????o",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Quay l???i Trang Ch??nh",
                        "payload": "MAIN_PAGE"
                    },
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}/${senderID}`,
                        "title": "?????T L???CH T?? V???N",
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
            let response1 = { "text": `Xin ch??o b???n ${username} , M??nh l?? chat bot c???a web ?????t l???ch kh??m b???nh Mai C??ng Th??nh . \n ????? bi???t th??m th??ng tin , vui l??ng xem th??ng tin b??n d?????i nh?? ????  ` }
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
                                "title": "Quay l???i MENU Ch??nh",
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