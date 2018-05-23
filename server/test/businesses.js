import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../index';
import models from '../models/index';

require('dotenv').config();


const [should, expect] = [chai.should(), chai.expect]; // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

const { TOKEN } = process.env;

const businesses = models.Business

const invalidTOKEN = `${TOKEN}l`;
const { NOWRITEACCESS } = process.env;

before((done) => {
  businesses.sync({ force: true })
    .then(() => done());
});

describe('Display all business', () => {
  it('should return a status of 404 if no business is registered yet', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('Register business', () => {
  it('should return 400 if category any field is missing', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        name: 'thor',
        email: 'odin@fine.net',
        address: '12 payne avenue',
        location: 'lagos',
        category: null
      })
      .end((res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return 201 on successful registration', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        name: 'thsor',
        email: 'odinc@fine.net',
        address: '12 payne avenue',
        location: 'ondo',
        category: 'finance',
        description: 'hey there'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should return 201 on successful registration', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        name: 'thorasifa',
        email: 'thoin@fine.net',
        address: '12 payne avenue',
        location: 'lagos',
        category: 'finance',
        description: 'hey there'          
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('should return 201 on successful registration', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        name: 'torus',
        email: 'odinfy@fine.net',
        address: '12 payne avenue',
        location: 'lagos',
        category: 'others',
        description: 'hey there'          
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should return 409 if name is taken', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        name: 'torus',
        email: 'crack@fine.net',
        address: '12 payne avenue',
        location: 'lagos',
        category: 'health',
        description: 'hey there'          
      })
      .end((res) => {
        expect(res.status).to.equal(409);
        done();
      });
  });

  it('should return 400 if name field is empty', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        email: 'crack@fine.net',
        address: '12 payne avenue',
        location: 'lagos',
        category: 'health',
        description: 'hey there'          
      })
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return 400 if no email is given', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        name: 'torus',
        address: '12 payne avenue',
        location: 'lagos',
        category: 'health',
        description: 'hey there'          
      })
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return 400 if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        name: 'torus',
        email: 'crack@fine',
        address: '12 payne avenue',
        location: 'lagos',
        category: 'health',
        description: 'hey there'          
      })
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return 400 if no address', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        name: 'torus',
        email: 'crack@fine.net',
        location: 'lagos',
        category: 'health',
        description: 'hey there'          
      })
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return 400 if location is missing', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        name: 'torus',
        email: 'crack@fine.net',
        address: '12 payne avenue',
        location: null,
        category: 'health',
        description: 'hey there'          
      })
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return 400 if category is missing', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        name: 'torus',
        email: 'crack@fine.net',
        address: '12 payne avenue',
        location: 'lagos',
        description: 'hey there'          
      })
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return 400 if description is missing', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('Authorization', TOKEN)
      .send({
        name: 'torus',
        email: 'crack@fine.net',
        address: '12 payne avenue',
        location: 'lagos',
        category: 'health',
      })
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return 403 when TOKEN is absent', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .send({
        name: 'cracks',
        email: 'crack@fine.net',
        address: '12 payne avenue',
        location: 'lagos',
        category: 'fashion'
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});

describe('Display all business', () => {
  it('should return an object', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return a status of 200', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return a status of 404 if no business is registered yet', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Filter business by location', () => {
  it('should return a status of 200 if match is found', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .query({ location: 'lagos' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return a 404 if no business with provided location is found', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .query({ location: 'ajah' })
      .end((res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('Filter/get business by id', () => {
  it('should return a 404 if no business with provided id is found', (done) => {
    const businessId = 10;
    chai.request(app)
      .get(`/api/v1/businesses/${businessId}`)
      .end((res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return status of 200 if match is found', (done) => {
    const businessId = 1;
    chai.request(app)
      .get(`/api/v1/businesses/${businessId}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return status of 500 for invalid businessId', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/11111111132222222222222224333333')
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
});

describe('Filter business by category', () => {
  it('should return a 404 if no business with provided category is found', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .query({ category: 'religion' })
      .end((res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 200 if match is found', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
      .query({ category: 'finance' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Update business by id', () => {
  it('should return a 404 if no business with provided id is found', (done) => {
    const businessId = 10;
    chai.request(app)
      .put(`/api/v1/businesses/${businessId}`)
      .set('Authorization', TOKEN)
      .end((res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 200 if update is successful', (done) => {
    const businessId = 1;
    chai.request(app)
      .put(`/api/v1/businesses/${businessId}`)
      .set('Authorization', TOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return 409 if business exists', (done) => {
    const businessId = 3;
    chai.request(app)
      .put(`/api/v1/businesses/${businessId}`)
      .set('Authorization', TOKEN)
      .send({
        name: 'torus',
        email: 'crack@fine.net',
        location: 'lagos',
        category: 'health',
        address: '12 jsd',
        description: 'hey there'          
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return 400 if user tries to update businessId or userId', (done) => {
    const businessId = 1;
    chai.request(app)
      .put(`/api/v1/businesses/${businessId}`)
      .set('Authorization', TOKEN)
      .send({
        id: 10
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.message.should.eql('UserId and business id can not be updated');
        done();
      });
  });

  it('should return a 403 if user has no write access to business', (done) => {
    const businessId = 1;
    chai.request(app)
      .put(`/api/v1/businesses/${businessId}`)
      .set('Authorization', NOWRITEACCESS)
      .send({
        name: 'Hi tech',
        address: '42 close limo concl'
      })
      .end((res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('should return a 403 if TOKEN is not valid', (done) => {
    const businessId = 1;
    chai.request(app)
      .put(`/api/v1/businesses/${businessId}`)
      .set('Authorization', invalidTOKEN)
      .send({
        name: 'Hi tech',
        address: '42 close limo concl'
      })
      .end((res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('Delete business by id', () => {
  it('should return a 404 if no business with provided id is found', (done) => {
    const businessId = 10;
    chai.request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .set('Authorization', TOKEN)
      .end((res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return a 403 if TOKEN is not valid', (done) => {
    const businessId = 1;
    chai.request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .set('Authorization', invalidTOKEN)
      .end((res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('should return 200 if delete is successful', (done) => {
    const businessId = 1;
    chai.request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .set('Authorization', TOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return 500 if businessId is invalid', (done) => {
    const businessId = '1afdf';
    chai.request(app)
      .delete(`/api/v1/businesses/${businessId}`)
      .set('Authorization', TOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
});