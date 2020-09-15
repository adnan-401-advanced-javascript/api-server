const supertest = require("supertest");

const { server }  = require('../lib/server.js');

const mockRequest = supertest(server);

describe('500 Server error', () => {
    it('should respond with 500 for bad routes', ()=>{
        return mockRequest.get('/serverError').then(response=>{
            expect(response.error).toBeTruthy();
            expect(response.error.status).toBe(500);
        }).catch(err=> {
            console.log(err);
        });
    });
});
