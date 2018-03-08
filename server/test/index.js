import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';

const [should, expect] = [chai.should(), chai.expect]; // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Api test', () => {
  // Test to get default for unavailable route
  it('should return status 405 as default for unavailable route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an('object');
        done();
      });
  });

  // Test to return 404 when request is posted unavailable route
  it('should return status 404 for unavailable route', (done) => {
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

// Test for login authentication
describe('User Login authenticator', () => {
  // Test to return unauthorised if no data is provided
  it('should return status 401 if no data is provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: null,
        password: null
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  // Test to return 401 if any field is missing
  it('should return status 401 if any field is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: null,
        password: 'horus'
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  // Test to return 401 if any property is missing
  it('should return status 401 if any property is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'alpha',
        // password: 'horus'
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  // Test to return 401 if not user
  it('should return status 401 if user credentials is incorrect', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'michael',
        password: 'horus'
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  // Test to return 401 password length is less than 5
  it('should return status message if password length is below 5', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'michael',
        password: 'horu'
      })
      .end((err, res) => {
        expect(res.body.message).to.eql('minimun password length is 5 chars');
        done();
      });
  });

  // Test to return 200 for successful user login
  it('should return status 200 on successful user login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'michael',
        password: 'asynch'
      })
      .end((err, res) => {
        expect(res.body.message).to.eql('Login successful');
        res.should.have.status(200);
        done();
      });
  });
});

describe('Register business', () => {
  it('should return status 400 if any field is missing', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .send({
        name: null,
        email: 'asynch',
        address: 'asynch',
        location: 'asynch',
        category: 'asynch'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return status 400 if any property is missing', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .send({
        // name: null,
        email: 'asynch',
        address: 'asynch',
        location: 'asynch',
        category: 'asynch'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  // Test to return 404 when request is posted unavailable route
  it('should return message on successful registration', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .send({
        name: 'Fine cracker',
        email: 'crack@fine.net',
        address: '12 payne avenue',
        location: 'lagos',
        category: 'snacks'
      })
      .end((err, res) => {
        expect(res.body.message).to.eql('Business registration successful');
        done();
      });
  });
});

describe('Display all business', () => {// Test to return 404 when request is posted unavailable route
  it('should return an object', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        res.body.should.be.an('object')
        done();
      });
  });

  it('should return a status of 200', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        res.should.have.status('200');
        done();
      });
  });
});
