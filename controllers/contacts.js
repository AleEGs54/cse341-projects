const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId
const contactsController = {}

contactsController.getAll = async (req, res) => {
    
    try {

        const result = await mongodb.getDb().db().collection('contacts').find().toArray()
        
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
    }

}
contactsController.getSingle = async (req, res) => {

    try {
            const contactId = new ObjectId(req.params.id)
            const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId}).toArray()
            
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(result[0])

    } catch (error) {
        console.log(error)
    }
}

module.exports = contactsController