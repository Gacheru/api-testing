'use strict'
import {
    BASE,
    request,
    loginWithDefaultUser,
    cleanExceptDefaultUser
} from './app.test';

describe('# Auth API', () => {
    const newUser = {'username': 'tester1', 'password': '123456'};
    it('should create user', () => {
        return cleanExceptDefaultUser().then(() => {
            return request.post(BASE + '/auth/signup')
            .send(newUser)
            .expect(200)
            .then(res => {
                res.body.success.should.be.true;
            });
        });
    });
    it('should retrieve token', () => {
        return cleanExceptDefaultUser().then(res => {
            return loginWithDefaultUser().then(res =>{
                res.status.should.equal(200);
                res.body.success.should.be.true;
                res.body.token.should.not.be.empty;
            });
        });
    });
    it('should not login with right Username but Wrong password', () => {
        return request.post(BASE + '/auth/signip')
        .send({'username': newUser.username, 'password': 'random'})
        .expect(401);
    });
    it('should return invalid credentials error', () => {
        return request.post(BASE + '/auth/signin')
        .send({'username': newUser.username, 'password': ''})
        .expect(401)
        .then(res => {
            return request.post(BASE + '/auth/signin')
            .send({'username': newUser.username, 'password': 'mypass'})
            .expect(401);
        });
    });
});