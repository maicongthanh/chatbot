import request from "request"
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
let callSendAPI = (res) => {
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

let handleGetStarted = () => {
    return new Promise(async (resolve, reject) => {
        try {
            response = { "text": "Xin chào mừng bạn ABC đến với Web đặt lịch khám bệnh của Mai Công Thành" }
            await callSendAPI(response)
            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleGetStarted,
    callSendAPI
}