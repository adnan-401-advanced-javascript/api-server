const {
  server
} = require('../lib/server');
const supertest = require('supertest');

const mockRequest = supertest(server);

const category = {
    id: "1",
    name: 'category',
    display_name: 'category',
    description: 'category',
    category: 'category',
};

const product = {
    id: "1",
    name: 'adnan',
    display_name: 'adnan',
    description: 'adnan',
    category: 'adnan',
};

describe('Server module', () => {
    it('Server error status code 404', () => {
        return mockRequest
            .get('/not-found').then(response => {
                expect(response.status).toBe(404);
            });
    });

    it('POST /categories', () => {
        return mockRequest
            .post('/categories')
            .send(category)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(category);
            });
    });

    it('GET /categories', () => {
      return mockRequest
          .get('/categories')
          .send(category)
          .then(results => {
            expect(results.status).toBe(200);
            expect(results.body.result[0]).toStrictEqual(category);
          });


    });

    it('GET /categories/id', () => {
        return mockRequest
            .get('/categories/1').then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(category);
            });
    });

    it('GET /categories/id of not found', () => {
        return mockRequest
            .get('/categories/sth').then(results => {
                expect(results.status).toBe(404);
            });
    });


    it('PUT /categories/id', () => {
        return mockRequest
            .put('/categories/1')
            .send(category)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(category);
            });
    });

    it('PUT /categories/id of not found', () => {
        return mockRequest
            .put('/categories/sth')
            .send(category)
            .then(results => {
                expect(results.status).toBe(404);
            });
    });

    it('PATCH /categories/id', () => {
        return mockRequest
            .patch('/categories/1')
            .send(category)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(category);
            });
    });

    it('PATCH /categories/id of not found', () => {
        return mockRequest
            .patch('/categories/sth')
            .send(category)
            .then(results => {
                expect(results.status).toBe(404);
            });
    });

    it("DELETE /categories/id", () => {
        return mockRequest
            .delete('/categories/1').then(results => {
                expect(results.status).toBe(200);
            });
    });

    it("DELETE /categories/id of not found", () => {
        return mockRequest
            .delete('/categories/sth').then(results => {
                expect(results.status).toBe(404);
            });
    });

    it('POST /products', () => {
        return mockRequest
            .post('/products')
            .send(product)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(product);
            });
    });

    it('GET /products ', () => {
        return mockRequest
            .get('/products')
            .then(response => {
                expect(response.status).toBe(200);
            });
    });

    it('GET /products/id', () => {
        return mockRequest
            .get('/products/1').then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(product);
            });
    });

    it('GET /products/id of not found', () => {
        return mockRequest
            .get('/products/sth').then(results => {
                expect(results.status).toBe(404);
            });
    });


    it('PUT /products/id', () => {
        return mockRequest
            .put('/products/1')
            .send(product)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(product);
            });
    });

    it('PUT /products/id of not found', () => {
        return mockRequest
            .put('/products/sth')
            .send(product)
            .then(results => {
                expect(results.status).toBe(404);
            });
    });


    it('PATCH /products/id', () => {
        return mockRequest
            .patch('/products/1')
            .send(product)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body).toStrictEqual(product);
            });
    });

    it('PATCH /products/id of not found', () => {
        return mockRequest
            .patch('/products/sth')
            .send(product)
            .then(results => {
                expect(results.status).toBe(404);
            });
    });

    it("DELETE /products/id", () => {
        return mockRequest
            .delete('/products/1').then(results => {
                expect(results.status).toBe(200);
            });
    });

    it("DELETE /products/id of not found", () => {
        return mockRequest
            .delete('/products/sth').then(results => {
                expect(results.status).toBe(404);
            });
    });

});
