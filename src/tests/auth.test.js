import { expect } from 'chai';
import supertest from 'supertest';
import db from '../db';
import app from '..';

const {
  sequelize, models: {
    User
  }
} = db;

const root = '/api/v1/auth';
let token = '';

describe('Auth Tests', () => {
  before((done) => {
    sequelize.sync().then(() => {
      done();
    });
  });
  describe('POST', () => {
    it('should create a user', (done) => {
      supertest(app)
        .post(`${root}/register`)
        .send({
          email: 'barry@app.com',
          password: 'password'
        })
        .end((err, res) => {
          const { body, status } = res;
          console.table([body]);
          console.table([body.body]);
          expect(status).to.be.eql(201);
          done(err);
        });
    });
    it('should log a user in', (done) => {
      supertest(app)
        .post(`${root}/login`)
        .send({
          email: 'barry@app.com',
          password: 'password'
        })
        .end((err, res) => {
          const { body, status } = res;
          token = body.body.token;
          console.table([body]);
          console.table([body.body]);
          expect(status).to.be.eql(200);
          done(err);
        });
    });
    it('should update a user detail', (done) => {
      supertest(app)
        .patch(`${root}/update`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: 'password1'
        })
        .end((err, res) => {
          const { body, status } = res;
          console.table([body]);
          expect(status).to.be.eql(200);
          done(err);
        });
    });
    it('should get logged in user', (done) => {
      supertest(app)
        .get(`${root}/getLoggedUser`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          const { body, status } = res;
          console.table([body.body]);
          expect(status).to.be.eql(200);
          done(err);
        });
    });
  });
  after((done) => {
    User.destroy({ truncate: true }).then(() => {
      done();
    });
  });
});
