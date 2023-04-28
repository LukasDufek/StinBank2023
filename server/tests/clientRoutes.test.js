const request = require('supertest');
const app = require('../index');

describe('ClientRouter', () => {
    it('should return all clients', async () => {
        const response = await request(app).get('api/clients');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });

    it('should return 500 error if database is not available', async () => {
        // zakomentujeme si připojení k MongoDB
        // ...

        const response = await request(app).get('api/clients');
        expect(response.status).toBe(500);
        expect(response.body.message).toMatch(/failed to connect/i);
    });
});
