const db = require("../models");
const Contact = db.Contact;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    const phone = req.query.phone;
    const khoId = req.query.khoId;
    const contactStatus = req.query.contactStatus;
    const limit = (req.query.limit) ? parseInt(req.query.limit) : 15;
    const page =(req.query.page) ? parseInt(req.query.page) : 0;;
    const startContact = (page * limit);
    const condition = {};
    if(phone) {
      condition['contactPhone'] = { [Op.like]: `%${phone}%` };
    }
    if(khoId) {
      condition['khoId'] = khoId;
    }
    if(contactStatus) {
      condition['statusId'] = contactStatus;
    }
    const listContact = await Contact.findAll({ where: condition, order: [
      ['id', 'DESC']
    ], offset: startContact, limit: limit});
    if(listContact && listContact.length > 0){
      for(var i = 0 ; i < listContact.length; i++){
        if (listContact[i].statusId == 1){
          listContact[i].dataValues['colorStatus'] = 'rgba(64, 224, 208, 0.53)';
        } else if (listContact[i].statusId == 2){
          listContact[i].dataValues['colorStatus'] = 'rgba(64, 224, 103, 0.73)';
        } else if (listContact[i].statusId == 3){
          listContact[i].dataValues['colorStatus'] = 'red';
        } else if (listContact[i].statusId == 4){
          listContact[i].dataValues['colorStatus'] = 'rgba(247, 237, 63, 0.91)';
        } else if (listContact[i].statusId == 5){
          listContact[i].dataValues['colorStatus'] = 'rgba(241, 14, 175, 0.91)';
        }
      }
    }
    const countContact = await Contact.findAll({ where: condition});
    res.send({
      "data" :listContact,
      "count": countContact.length
    });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findOne({ where: {id: id}});
  if(contact) {
    res.send(contact);
  } else {
    res.send([]);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const data = req.body.data;
  const contactName = data.contactName;
  const contactPhone = data.contactPhone;
  const address = data.address;
  const numberProduct = data.numberProduct;
  const note = data.note;
  const status = data.status;
  const updateContact = await Contact.update({
    contactName: contactName,
    contactPhone: contactPhone,
    address: address,
    numberProduct: numberProduct,
    note: note,
    statusId: status
  }, {
    where: { id: id }
  });
  if (updateContact) {
    res.send({
      success: "true",
      mesage: 'Cập nhật thành công.'
    });
  } else {
    res.send({
      success: "false",
      mesage: 'Cập nhật thất bại.'
    });
  }
}