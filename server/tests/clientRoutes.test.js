const request = require("supertest");
const express =  require('express');
const router = require('../routes/api/clientRoutes');
const mongoConnection = require("../scripts/connection");
const app = express()
const Client = require('../models/Client')



app.use(express.json())
app.use('/', router);

beforeAll(() => {
    mongoConnection.connect_database()
});

afterAll(() => {
    mongoConnection.disconnect_database()
});

describe('Testing routes', () => {

    it('Reaching GET / should return status of 200', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    })

    it('Reaching GET / should return status of 500 - no clients found', async () => {
        const res = await request(app).get('/?fail=true');
        expect(res.statusCode).toBe(500);
    });

    it('Reaching PUT /:id should change data', async() => {
        const res = await request(app).put('/645269b38780d68c1ef8b3ae').send({"code": 1234})
        expect(res.statusCode).toBe(200)
    });

    it('Reaching PUT/:id with incorrect id', async () => {
        const res = await request(app).put('/645269b38780d68cf1ef8b3ae').send({"code": 1234})
        expect(res.statusCode).toBe(500)
    })
})
