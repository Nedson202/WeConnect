import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../index';
import models from '../models/index';

require("dotenv").config;

const { NOREADACCESS } = process.env;
const { ADMINTOKEN } = process.env;
const { TOKEN } = process.env;

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
        username: 'admin',
        email: 'admin@aladmin.com',
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

  it('should return status 201 on successful signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'alanco',
        email: 'israel@all.net',
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
        username: 'alan',
        email: 'height@width.com',
        password: 'horuss'
      })
      .end((res) => {
        expect(res).to.have.status(409);
        done();
      });
  });

  it('should return status 400 if password length is less than 6', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'alan',
        email: 'height@width.com',
        password: 'horus'
      })
      .end((res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return status 400 if any field is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'alan',
        password: 'horuss'
      })
      .end((res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return status 400 if username is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: null,
        password: 'horuss'
      })
      .end((res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return status 400 any property is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'alan',
        email: 'ajs@uoo.sla',
        password: null
      })
      .end((res) => {
        expect(res).to.have.status(400);
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
      .end((err, res) => {
        // if(err) done(err);
        // expect(res).to.have.status(401);
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
        username: 'alan',
        password: 'israel'
      })
      .end((err, res) => {
        res.body.should.have.property('token');
        // expect(res.body).to.have.property('token');
        res.body.message.should.eql('login successful');
        done();
      });
  });
});

describe('User updater', () => {
  it('should return status 403 if token is absent', (done) => {
    chai.request(app)
      .put('/api/v1/user/1')
      .end((res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should return 403 if not user', (done) => {
    chai.request(app)
      .put('/api/v1/user/2')
      .set('Authorization', NOREADACCESS)
      .end((res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should return if user is not found', (done) => {
    chai.request(app)
      .put('/api/v1/user/20')
      .set('Authorization', NOREADACCESS)
      .end((res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return object if successful', (done) => {
    chai.request(app)
      .put('/api/v1/user/1')
      .set('Authorization', TOKEN)
      .send({
        username: 'alansm',
        email: 'israejl@all.net'
      }).end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.token.should.be.a('string');
        done();
      });
  });

  it('should return conflict if username exists', (done) => {
    chai.request(app)
      .put('/api/v1/user/1')
      .set('Authorization', TOKEN)
      .send({
        username: 'alanco',
        email: 'israejl@all.net'
      }).end((err, res) => {
        expect(res.status).to.equal(409);
        res.body.should.be.a('array');
        res.body[0].should.eql('user with name is already registered');
        done();
      });
  });

  it('should return conflict if email exists', (done) => {
    chai.request(app)
      .put('/api/v1/user/1')
      .set('Authorization', TOKEN)
      .send({
        username: 'alansmith co',
        email: 'israel@all.net'
      }).end((err, res) => {
        expect(res.status).to.equal(409);
        res.body.should.be.a('array');
        res.body[0].should.eql('user with email is already registered');
        done();
      });
  });

  it('should return internal server error if userid is invalid', (done) => {
    chai.request(app)
      .put('/api/v1/user/-------------------')
      .set('Authorization', TOKEN)
      .send({
        username: 
        `alansm1`,
        email: 'israejl@all.net',
      }).end((err, res) => {
        expect(res).to.have.status(500);
        res.body.error.should.eql(true)
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
      .set('Authorization', NOREADACCESS)
      .end((res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('should return object if successful', (done) => {
    chai.request(app)
      .get('/api/v1/admin/users')
      .set('Authorization', ADMINTOKEN)
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return 403 and message if not an admin', (done) => {
    chai.request(app)
      .delete('/api/v1/admin/users/2')
      .set('Authorization', NOREADACCESS)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        res.body.message.should.eql('Forbidden, you do not have access to view all users');
        done();
      });
  });

  it('should return 200 and message if delete is successful', (done) => {
    chai.request(app)
      .delete('/api/v1/admin/users/2')
      .set('Authorization', ADMINTOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.message.should.eql('User deleted successfully');
        done();
      });
  });

  it('should return 400 if user is admin', (done) => {
    chai.request(app)
      .delete('/api/v1/admin/users/1')
      .set('Authorization', ADMINTOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.message.should.eql('you cannot delete yourself');
        done();
      });
  });

  it('should return 404 and message if user is not registered', (done) => {
    chai.request(app)
      .delete('/api/v1/admin/users/50')
      .set('Authorization', ADMINTOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.message.should.eql('user not found');
        done();
      });
  });

  it('should return internal server error if userid is invalid', (done) => {
    chai.request(app)
      .delete('/api/v1/admin/users/_____________________-------------------')
      .set('Authorization', ADMINTOKEN)
      .end((err, res) => {
        expect(res).to.have.status(500);
        res.body.error.should.eql(true)
        done();
      });
  });
});