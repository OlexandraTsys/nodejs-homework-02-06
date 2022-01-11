const fs = require('fs/promises')
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json')


const getAllContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        return contacts
    } catch (error) {
        console.log(error)
    }
};

const updateContacts =  async(newContacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
};

const listContacts = async () => {
  try {
    const contacts = await getAllContacts()
    return contacts;
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await getAllContacts();
    const contact = contacts.find(item => String(item.id) === String(contactId));
    if (!contact) {
      return null;
    }
    return contact;

  } catch (error) {
    console.log(error)
    
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await getAllContacts();
    const idx = contacts.findIndex(item => String(item.id) === String(contactId));
    if (idx === -1) {
      return null;
    }
    contacts.splice(idx, 1);
    await updateContacts(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await getAllContacts();
  const newContact = { id:v4(),...body}
    contacts.push(newContact);
    await updateContacts(contacts);

    return newContact;
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await getAllContacts();
    const idx = contacts.findIndex(item => String(item.id) === String(contactId));
    if(idx === -1){
        return null;
    }
    const updateContact = {...contacts[idx], ...body};
    contacts[idx] = updateContact;
    await updateContacts(contacts);
    
    return updateContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
