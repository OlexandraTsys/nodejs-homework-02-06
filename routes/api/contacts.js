const express = require('express');
const router = express.Router();
const {contactSchema} =require('../../schemas')

const {listContacts,getContactById,removeContact,addContact,updateContact} = require('../../model/index')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    })
    // res.json({
    //     contacts
    // });
  }
  catch(error) {
    next(error)    
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId)

    if(!result){
            const error = new Error(`Contact with id=${id} not found`);
            error.status = 404;
            throw error;
            
        }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
   try {
        const {error} = contactSchema.validate(req.body);
        if(error){
            const err = new Error(error.message);
            err.status = 400;
            throw err;
        }
        const result = await addContact(req.body);
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                result
            }
        });
    } 
    catch (error) {
        next(error);
    }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
        const {contactId} = req.params;
        const result = await removeContact(contactId);
        if(!result){
            const error = new Error(`Contact with id=${contactId} not found`);
            error.status = 404;
            throw error;
        }
        res.json({
            status: "success",
            code: 200,
            message: "Success delete"
        });
    } 
    catch (error) {
        next(error);
    }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
        const {error} = contactSchema.validate(req.body);
        if(error){
            const err = new Error(error.message);
            err.status = 400;
            throw err;
        }
        const {contactId} = req.params;
        const result = await updateContact(contactId, req.body);
        if(!result){
            const error = new Error(`Contact with id=${contactId} not found`);
            error.status = 404;
            throw error;
        }
        res.json({
            status: "success",
            code: 200,
            data: {
                result
            }
        });
    } 
    catch (error) {
        next(error);
    }
})

module.exports = router
