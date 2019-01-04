'use strict'

import { test } from'../server/config/config';
import app from '../app';

export const request = require('supertest')(app);
export const chai = require('chai');
export const should = chai.should();

export const BASE = process.env.API_BASE ='/api';

const createTestdb = async() => {
    const TestdbModel = new User(test);
    await TestdbModel.save();
};

const getDefaultUser = async() => {
    let users = await User.find({ "username" : test.username});
    if(users.length === 0){
        await createTestdb();
        return getDefaultUser();
    }else{
        return users[0]
    }
};

export const loginWithDefaultUser = async() => {
    let user = await getDefaultUser();
    return request.post(BASE + "auth/signin")
    .send({'username': test.username, 'password': test.password})
    .expect(200);
};

export const cleanExceptDefaultUser = async() => {
    let user = await getDefaultUser();
    await User.deleteMany({'username': {$ne: user.username}});
};