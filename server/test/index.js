import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';

const [should, expect] = [chai.should(), chai.expect]; // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Api test', () => {
  it('should return status 405 as default for unavailable routes', () => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(405);
      });
  });

  it('should return status 404 when a post request is sent to an unavailable route', () => {
    chai.request(app)
      .post('/here')
      .end((err, res) => {
        res.should.have.status(404);
      });
  });
});

describe('User signup authenticator', () => {
  it('should return status 400 if no data is provided', () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: null,
        email: null,
        password: null
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
  });

  it('should return status 400 if any field is missing', () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'alpha',
        email: null,
        password: 'horus'
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
  });

  it('should return status 400 if user already exists', () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'michael',
        email: 'mike@smith.lin',
        password: 'horus'
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
  });

  it('should return status 201 on successful signup', () => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'moses',
        email: 'height@width.com',
        password: 'israel'
      })
      .end((err, res) => {
        res.should.have.status(201);
      });
  });
});

describe('User Login authenticator', () => {
  it('should return status 400 if no data is provided', () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: null,
        password: null
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
  });

  it('should return status 400 if any field is missing', () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: null,
        password: 'horus'
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
  });

  it('should return status 401 if user credentials is incorrect', () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'michael',
        password: 'horus'
      })
      .end((err, res) => {
        res.should.have.status(401);
      });
  });

  it('should return status 200 on successful user login', () => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'michael',
        password: 'asynch'
      })
      .end((err, res) => {
        expect(res.body.message).to.eql('Login successful');
        res.should.have.status(200);
      });
  });
});

describe('Register business', () => {
  it('should return status 400 if any field is missing', () => {
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
      });
  });

  it('should return 400 if name is taken', () => {
    chai
      .request(app)
      .post('/api/v1/businesses')
      .send({
        name: 'alans',
        email: 'crack@fine.net',
        address: '12 payne avenue',
        location: 'lagos',
        category: 'snacks'
      })
      .end((err, res) => {
        res.should.have.status(400);
      });
  });

  it('should return message on successful registration', () => {
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
      });
  });
});

describe('Display all business', () => {
  it('should return an object', () => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        res.body.should.be.an('object');
      });
  });

  it('should return a status of 200', () => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        res.should.have.status('200');
      });
  });
});

describe('Filter business by location', () => {
  it('should return a 404 if no business with provided location is found', () => {
    chai.request(app)
      .get('/api/v1/businesses?location=ajah')
      .end((err, res) => {
        res.should.have.status(404);
      });
  });

  it('should return a status of 200 if match is found', () => {
    chai.request(app)
      .get('/api/v1/businesses?location=lagos')
      .end((err, res) => {
        res.should.have.status('200');
      });
  });
});

describe('Filter business by category', () => {
  it('should return a 404 if no business with provided category is found', () => {
    chai.request(app)
      .get('/api/v1/businesses?category=ajah')
      .end((err, res) => {
        res.should.have.status(404);
      });
  });

  it('should return 200 if match is found', () => {
    chai.request(app)
      .get('/api/v1/businesses?category=oil')
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});

describe('Filter/get business by id', () => {
  it('should return a 404 if no business with provided id is found', () => {
    chai.request(app)
      .get('/api/v1/businesses/0')
      .end((err, res) => {
        res.should.have.status(404);
      });
  });

  it('should return status of 200 if match is found', () => {
    chai.request(app)
      .get('/api/v1/businesses/2')
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});

describe('Update business by id', () => {
  it('should return a 404 if no business with provided id is found', () => {
    chai.request(app)
      .put('/api/v1/businesses/10')
      .end((err, res) => {
        res.should.have.status(404);
      });
  });

  it('should return a message if update is successful', () => {
    chai.request(app)
      .put('/api/v1/businesses/2')
      .send({
        name: 'Hi tech',
        address: '42 close limo concl'
      })
      .end((err, res) => {
        expect(res.body.message).to.eql('Business profile updated');
      });
  });
});

describe('Delete a business', () => {
  it('should return status of 204 on success', () => {
    chai.request(app)
      .delete('/api/v1/businesses/2')
      .end((err, res) => {
        res.should.have.status(204);
      });
  });

  it('should return a 404 if no business with provided id is found', () => {
    chai.request(app)
      .delete('/api/v1/businesses/2')
      .end((err, res) => {
        res.should.have.status(404);
      });
  });
});

describe('Review posting', () => {
  it('should return status of 201 on success', () => {
    chai.request(app)
      .post('/api/v1/businesses/1/reviews/')
      .send({
        reviewer: 'smith',
        message: 'Great product quality'
      })
      .end((err, res) => {
        res.should.have.status(201);
      });
  });

  it('should return 404 if no specified business is found', () => {
    chai.request(app)
      .post('/api/v1/businesses/6/reviews/')
      .send({
        reviewer: 'smith',
        message: 'alan'
      })
      .end((err, res) => {
        res.should.have.status(404);
      });
  });
});

describe('Get reviews', () => {
  it('should return 404 if no specified business is found', () => {
    chai.request(app)
      .get('/api/v1/businesses/6/reviews/')
      .end((err, res) => res.should.have.status(404));
  });

  it('should return status of 200 on success', () => {
    chai.request(app)
      .get('/api/v1/businesses/1/reviews/')
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});
