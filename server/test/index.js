import mocha from 'mocha';
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';

const should = chai.should();

chai.use(chaiHttp);

describe('Api test', () => {
  // Test to get default route for api
  it('should return status 200 for default route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  // Test to return 404 for unavailable route
  it('should return status 400 for unavailable route', (done) => {
    chai.request(app)
      .post('/here/here/here')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('User signup authenticator', () => {
  // Test to return bad request if no data is provided
  it('should return status 400 if no data is provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: null,
        email: null,
        password: null
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  // Test to return 400 if any field is missing
  it('should return status 400 if any field is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'alpha',
        email: null,
        password: 'horus'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  // Test to return 400 if any property is missing
  it('should return status 400 if any property is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        // username: 'alpha',
        email: null,
        password: 'horus'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  // Test to return 400 if user already exists
  it('should return status 400 if user already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'michael',
        email: 'mike@smith.lin',
        password: 'horus'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  // Test to return 201 for successful user registration
  it('should return status 201 on successful signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'moses',
        email: 'height@width.com',
        password: 'israel'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('Signup successful');
        done();
      });
  });
});
