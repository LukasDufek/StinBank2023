const Router  = require('express')
const Client = require('../../models/Client')
const https = require("https");


const ClientRouter = Router()

ClientRouter.get('/', async (req, res) => {

    try {
        const clients = await Client.find()
        if (!clients) throw new Error('No Clients')
        res.status(200).json(clients)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }


})

ClientRouter.post('/', async (req, res) => {

    const newClient = new Client(req.body)
    try {
        const client = await newClient.save()
        if (!client) throw new Error('Something went wrong saving the item')
        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

ClientRouter.put('/:id', async (req, res) => {

    const { id } = req.params

    try {
        const response = await Client.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

ClientRouter.delete('/:id', async (req, res) => {

    const { id } = req.params
    try {
        const removed = await Client.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

/*
ClientRouter.get('/cnbfile', async (req, res) => {

    const response = await fetch('https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt');
    const body = await response.text();
    res.status(200).send(body);
    console.log(body);


})
*/



module.exports = ClientRouter;
