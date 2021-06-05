const {google} = require("googleapis");
const db = require("../models");
const Contact = db.Contact;
const Notification = db.Notification;
const TokenFirebase = db.TokenFirebase;
const Op = db.Sequelize.Op;
const fetch = require('node-fetch');

exports.asyncContactKho1 =  async () => {
    console.log('start async contact');

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});
    const spreadsheetId = "1idMjbp2YWZZ7gFdG8uFTtG_-J_-9TKx4a0MRaVSWGsk";
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    //read row
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range:"AA!A2:K"
    });
    var datas = getRows.data.values;
    for(var i = 0; i < datas.length; i++){
        const item = datas[i];
        if(item.length > 0){
            const checkContact = await Contact.findOne({
                attributes: ['id'],
                where: {
                    contactPhone: {
                        [Op.like]: `${item[2].trim()}`,
                    }
                }
            });
            if(!checkContact || checkContact == null){
                var addressContact = item[5] + ' ' + item[6] + ' ' + item[7] + ' ' + item[8];
                const add = Contact.create({
                    contactName: item[1],
                    contactPhone: item[2],
                    numberProduct: item[3],
                    address: addressContact,
                    statusId: 1,
                    note: item[4],
                    khoId: 1,
                    linkUrl: item[10],
                    createdAt: item[0],
                    createdBy: 1,
                    updatedAt: item[0],
                    updatedBy: 1,
                    deletedAt: null
                });
                const content = `SDT ${item[2]} vừa đăng ký mua hàng.`
                const addNoti = Notification.create({
                    content: content,
                    reader: 0,
                    createdAt: item[0]
                });
                if(add) {
                    console.log(`Đã tạo ${item[2]} trên hệ thống.`);
                    //send notification
                    const getListToken = await TokenFirebase.findAll();
                    if (getListToken && getListToken.length > 0) {
                        for(var k = 0; k < getListToken.length; k++){
                            const itemToken = getListToken[k].token;
                            const dataNoti = { 
                                to: itemToken,
                                notification: {
                                    body: `SDT ${item[2]} vừa được thêm vào kho.`,
                                    title: "Thông báo:",
                                    icon: "",
                                    click_action: "http://localhost:8080/"
                                }
                            };
        
                            fetch('https://fcm.googleapis.com/fcm/send', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'key=AAAAUTNypcc:APA91bGRxVRQzUAteyPT2Go7Wmo5t6hfzs0qpBTImZ1YCLiNRj92RB5wVqeWjYsL-MVbi2Gd8odETG6gMf1gDDW0LqoLs3-8MHcFnV15BP4KNwD58B8j9uolE1H_CLiEhSC6tWsgEvID'
                                },
                                body: JSON.stringify(dataNoti),
                            })
                            .then(response => response.json())
                            .then(data => {
                            console.log('Success:', data);
                            })
                            .catch((error) => {
                            console.error('Error:', error);
                            });
                        }
                    }
                } else {
                    console.log(`Lỗi. không tạo ${item[2]} được trên hệ thống.`);
                }
            } else {
                console.log(`${item[2]}  đã tồn tại trên hệ thống.`);
            }
        }
    }
};

exports.asyncContactKho2 =  async () => {
    console.log('start async contact');

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});
    const spreadsheetId = "1VCVMjTGqw2ElXUjfYOfdpeMNIJd35393e-JKgZRtEUE";
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    //read row
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range:"AA!A2:K"
    });
    var datas = getRows.data.values;
    for(var i = 0; i < datas.length; i++){
        const item = datas[i];
        if(item.length > 0){
            const checkContact = await Contact.findOne({
                attributes: ['id'],
                where: {
                    contactPhone: {
                        [Op.like]: `${item[2].trim()}`,
                    }
                }
            });
            if(!checkContact || checkContact == null){
                var addressContact = item[5] + ' ' + item[6] + ' ' + item[7] + ' ' + item[8];
                const add = Contact.create({
                    contactName: item[1],
                    contactPhone: item[2],
                    numberProduct: item[3],
                    address: addressContact,
                    statusId: 1,
                    note: item[4],
                    khoId: 2,
                    linkUrl: item[10],
                    createdAt: item[0],
                    createdBy: 1,
                    updatedAt: item[0],
                    updatedBy: 1,
                    deletedAt: null
                });
                const content = `SDT ${item[2]} vừa đăng ký mua hàng.`
                const addNoti = Notification.create({
                    content: content,
                    reader: 0,
                    createdAt: item[0]
                });
                if(add) {
                    console.log(`Đã tạo ${item[2]} trên hệ thống.`);
                    //send notification
                    const getListToken = await TokenFirebase.findAll();
                    if (getListToken && getListToken.length > 0) {
                        for(var k = 0; k < getListToken.length; k++){
                            const itemToken = getListToken[k].token;
                            const dataNoti = { 
                                to: itemToken,
                                notification: {
                                    body: `SDT ${item[2]} vừa được thêm vào kho.`,
                                    title: "Thông báo:",
                                    icon: "",
                                    click_action: "http://localhost:8080/"
                                }
                            };
        
                            fetch('https://fcm.googleapis.com/fcm/send', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'key=AAAAUTNypcc:APA91bGRxVRQzUAteyPT2Go7Wmo5t6hfzs0qpBTImZ1YCLiNRj92RB5wVqeWjYsL-MVbi2Gd8odETG6gMf1gDDW0LqoLs3-8MHcFnV15BP4KNwD58B8j9uolE1H_CLiEhSC6tWsgEvID'
                                },
                                body: JSON.stringify(dataNoti),
                            })
                            .then(response => response.json())
                            .then(data => {
                            console.log('Success:', data);
                            })
                            .catch((error) => {
                            console.error('Error:', error);
                            });
                        }
                    }
                } else {
                    console.log(`Lỗi. không tạo ${item[2]} được trên hệ thống.`);
                }
            } else {
                console.log(`${item[2]}  đã tồn tại trên hệ thống.`);
            }
        }
    }
};