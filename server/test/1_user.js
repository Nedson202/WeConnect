import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../index';
import models from '../models/index';

process.env.NODE_ENV = 'test';

const { noReadAccess } = process.env;
const { adminToken } = process.env;

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
        res.body.message.should.eql('Signup successful');
        done();
      });
  });

  it('should return status 201 on successful signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'alan',
        email: 'alan@width.com',
        password: 'israel'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        res.body.message.should.eql('Signup successful');
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
        res.body.message.should.eql('login successful');
        done();
      });
  });
});

describe('User administrator test', () => {
  it('should return status 403 if token is absent', (done) => {
    chai.request(app)
      .get('/api/v1/admin/users')
      .end((res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should return message if not admin', (done) => {
    chai.request(app)
      .get('/api/v1/admin/users')
      .set('x-access-token', noReadAccess)
      .end((res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should return object if successful', (done) => {
    chai.request(app)
      .get('/api/v1/admin/users')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return 200 and message if delete is successful', (done) => {
    chai.request(app)
      .delete('/api/v1/admin/users/2')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.message.should.eql('User deleted successfully');
        done();
      });
  });

  it('should return 404 and message if user is not registered', (done) => {
    chai.request(app)
      .delete('/api/v1/admin/users/50')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.message.should.eql('User not found');
        done();
      });
  });
});
