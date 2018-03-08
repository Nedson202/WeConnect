import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';

const [should, expect] = [chai.should(), chai.expect]; // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Api test', () => {
  it('should return status 405 as default for unavailable route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.an('object');
        done();
      });
  });

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

describe('User Login authenticator', () => {
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

describe('Display all business', () => {
  it('should return an object', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        res.body.should.be.an('object');
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

describe('Filter business by location', () => {
  it('should return a 404 if no business with provided location is found', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?location=ajah')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return a status of 200 if a match is found', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?location=lagos')
      .end((err, res) => {
        res.should.have.status('200');
        done();
      });
  });
});

describe('Filter business by category', () => { 
  it('should return a 404 if no business with provided category is found', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?category=ajah')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return an object if match is found', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?category=lagos')
      .end((err, res) => {
        res.should.be.an('object');
        done();
      });
  });
});

describe('Filter/get business by id', () => {
  it('should return a 404 if no business with provided id is found', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/0')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return status of 200 if match is found', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/2')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('Update business by id', () => { 
  it('should return a 404 if no business with provided id is found', (done) => {
    chai.request(app)
      .put('/api/v1/businesses/10')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return a message if update is successful', (done) => {
    chai.request(app)
      .put('/api/v1/businesses/2')
      .send({
        name: 'Hi tech',
        address: '42 close limo concl'
      })
      .end((err, res) => {
        expect(res.body.message).to.eql('Business profile updated');
        done();
      });
  });
});
