const db = require("../models");
const contactStatus = db.contactStatus;
const contact = db.Contact;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    contactStatus.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

exports.findAllCount = async (req, res) => {
    const khoId = req.query.khoId;
    const data = {};
    const contact1 = await contact.count({ where: {statusId: 1, khoId: khoId} });
    data['moi'] = contact1;
    const contact2 = await contact.count({ where: {statusId: 2, khoId: khoId} });
    data['da_goi'] = contact2;
    const contact3 = await contact.count({ where: {statusId: 3, khoId: khoId} });
    data['da_huy'] = contact3;
    const contact4 = await contact.count({ where: {statusId: 4, khoId: khoId} });
    data['cho_goi_lai'] = contact4;
    const contact5 = await contact.count({ where: {statusId: 5, khoId: khoId} });
    data['da_tao_don'] = contact5;
    res.send(data);
};

exports.countConcatByStatus = async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const khoId = req.query.khoId;
    if (khoId == 0) {
        var kho = {
            [Op.in] : [1,2]
        }
    }
    if (khoId == 1) {
        var kho = {
            [Op.in] : [1]
        }
    }
    if (khoId == 2) {
        var kho = {
            [Op.in] : [2]
        }
    }
    const data = {};
    const contact1 = await contact.count({
        where: {
            statusId: 1,
            createdAt: {
                [Op.between] : [startDate, endDate]
            },
            khoId: kho
        } 
    });
    data['moi'] = contact1;
    const contact2 = await contact.count({
        where: {
            statusId: 2,
            createdAt: {
                [Op.between] : [startDate, endDate]
            },
            khoId: kho
        } 
    });
    data['da_goi'] = contact2;
    const contact3 = await contact.count({
        where: {
            statusId: 3,
            createdAt: {
                [Op.between] : [startDate, endDate]
            },
            khoId: kho
        } 
    });
    data['da_huy'] = contact3;
    const contact4 = await contact.count({
        where: {
            statusId: 4,
            createdAt: {
                [Op.between] : [startDate, endDate]
            },
            khoId: kho
        } 
    });
    data['cho_goi_lai'] = contact4;
    const contact5 = await contact.count({
        where: {
            statusId: 5,
            createdAt: {
                [Op.between] : [startDate, endDate]
            },
            khoId: kho
        } 
    });
    data['da_tao_don'] = contact5;

    res.send(data);
};