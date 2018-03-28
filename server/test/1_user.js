import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../index';
import models from '../models/index';

const [should, expect] = [chai.should(), chai.expect]; // eslint-disable-line no-unused-vars

chai.use(chaiHttp);
const users = models.User;

before((done) => {
  users.sync({ force: true })
    .then(() => done());
});

describe('User signup authenticator', () => {
  it('should return status 201 on successful signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'moses',
        email: 'height@width.com',
        password: 'israel'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('should return status 409/conflict if user already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'moses',
        email: 'height@width.com',
        password: 'horus'
      })
      .end((res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
});

describe('User Login authenticator', () => {
  it('should return status 401 if user credentials is incorrect', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'moses',
        password: 'horusss'
      })
      .end((res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return status 400 if any field is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: null,
        password: 'horus'
      })
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return status 400 if any property is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: null
      })
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return status 200 on successful user login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'moses',
        password: 'israel'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
