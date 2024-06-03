import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { App } from '../app';
import Koa from 'koa';

let mongod: MongoMemoryServer;
let app: App;
let instance: any;

async function initializeDb() {
  mongod = await MongoMemoryServer.create({
    instance: {
      port: 30000,
      dbName: 'tasks',
    },
  });

  app = new App();
  instance = app.start();
}

async function closeDb() {
  await app.close();
  await mongoose.disconnect();
  await mongod.stop();
}

beforeAll(() => {
  return initializeDb();
});

describe('Me query', () => {
  test('should return user not authenticated', (done: Function) => {
    request(instance)
      .post('/')
      .set('Content-Type', 'application/json')
      .send(`{"query":"query {me {name}}","variables":{}}`)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(200);
        expect(res.body.errors[0].message).toBe('user not authenticated');
        return done();
      });
  });
});

afterAll(() => {
  return closeDb();
});
