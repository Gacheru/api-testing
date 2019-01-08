'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp);

describe('Test api end point', ()=> {
    it('should fetch api welcome message', () =>{
        chai.request(app)
        .get('/api')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.text).to.equal('{"message":"welcome to the Todos API"}');
        });
    });
});