const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const contactsController = {};

contactsController.getAll = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Get all contacts'
  try {
    const result = await mongodb.getDb().db().collection('contacts').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

contactsController.getSingle = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Get a single contact'
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId }).toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
  }
};

contactsController.createContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Create a contact'
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);

  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json({ error: 'Some error occurred while creating the new contact.' });
  }
};

contactsController.updateContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Update a contact'
  const objectId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const result = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: objectId }, contact);

  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ error: 'Some error occurred while updating the contact.' });
  }
};

contactsController.deleteContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.description = 'Delete a contact'
  const objectId = new ObjectId(req.params.id);

  const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: objectId });

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ error: 'Some error occurred while deleting the contact.' });
  }
};

module.exports = contactsController;
