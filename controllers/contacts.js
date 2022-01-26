const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../helpers");
const { Contact } = require("../models")

const getAllContacts = async (req, res) => {
    const {page = 1, limit = 4,favorite = null} = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find({}, "_id name email phone favorite owner", {skip, limit: +limit});
    
    sendSuccessRes(res, { result });
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const contact = { _id: id, owner: req.user._id }

    // const result = await Contact.findById(id, "_id name price code active");
    const result = await Contact.findOne(contact, '_id name email phone favorite owner');
    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`);
    }
    sendSuccessRes(res, { result });
};

const addContact = async (req, res) => {
    const result = await Contact.create({ ...req.body, owner: req.user._id });
    sendSuccessRes(res, { result }, 201);
};

const updateContactById = async (req, res) => {
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`);
    }
    sendSuccessRes(res, { result });
};

const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
    
    const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: false });
    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`);
    }
    sendSuccessRes(res, { result });
};

const removeContactById = async(req, res)=>{
    const { id } = req.params;
    const contact = { id, owner: req.user._id }
    const result = await Contact.findByIdAndDelete(contact.id);
    if(!result){
        throw new NotFound(`Contact with id=${contact.id} not found`);
    }
    sendSuccessRes(res, {message: "Success delete"});
};

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    updateContactById,
    updateFavorite,
    removeContactById,
};