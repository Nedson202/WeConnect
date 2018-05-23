import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../index';

require("dotenv").config();

const [should, expect] = [chai.should(), chai.expect]; // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

const { NOREADACCESS } = process.env;
const { REVIEWER_TOKEN } = process.env;
const { TOKEN } = process.env;
const { ADMINTOKEN } = process.env;
const { NOWRITEACCESS } = process.env;

const invalidToken = `${REVIEWER_TOKEN}l`;

const availableBusinessId = 2;

describe('Review posting', () => {
  it('should return status of 403 if token is invalid', (done) => {
    chai.request(app)
      .post(`/api/v1/businesses/${availableBusinessId}/reviews`)
      .set('Authorization', invalidToken)
      .send({
        message: 'Business is great'
      })
      .end((res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should return status of 201 if review is posted successfully', (done) => {
    chai.request(app)
      .post(`/api/v1/businesses/${availableBusinessId}/reviews`)
      .set('Authorization', NOREADACCESS)
      .send({
        message: 'Business is great'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should return status of 201 if review is posted successfully', (done) => {
    chai.request(app)
      .post(`/api/v1/businesses/${availableBusinessId}/reviews`)
      .set('Authorization', NOREADACCESS)
      .send({
        message: 'Really cool'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should return status of 201 if review is posted successfully', (done) => {
    chai.request(app)
      .post(`/api/v1/businesses/${availableBusinessId}/reviews`)
      .set('Authorization', NOREADACCESS)
      .send({
        message: 'Unbelievable'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should return status of 403 if posts a review', (done) => {
    chai.request(app)
      .post(`/api/v1/businesses/${availableBusinessId}/reviews`)
      .set('Authorization', ADMINTOKEN)
      .send({
        message: 'Unbelievable'
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should return forbidden if reviewer is the business owner', (done) => {
    chai.request(app)
      .post(`/api/v1/businesses/${availableBusinessId}/reviews`)
      .set('Authorization', TOKEN)
      .send({
        message: 'Business is great'
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        res.body.message.should.eql('Owner of a business can not post a review');
        done();
      });
  });

  it('should return status 400 if message is empty', (done) => {
    chai.request(app)
      .post('/api/v1/businesses/3/reviews')
      .set('Authorization', NOREADACCESS)
      .send({
        message: null
      })
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return status 403 if token is absent', (done) => {
    chai.request(app)
      .post('/api/v1/businesses/2/reviews')
      .send({
        message: 'Too bad'
      })
      .end((res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should return status of 404 if business is not registered', (done) => {
    const businessId = 10;
    chai.request(app)
      .post(`/api/v1/businesses/${businessId}/reviews`)
      .set('Authorization', NOREADACCESS)
      .send({
        message: 'Business is great'
      })
      .end((res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return status of 500 for invalid businessId', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/11111111132222222222222224333333')
      .set('Authorization', REVIEWER_TOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });

  it('should return status of 500 if id is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/11tts3')
      .set('Authorization', REVIEWER_TOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
});

describe('Get all reviews', () => {
  it('should return status of 404 if no review', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/3/reviews/')
      .end((res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return status of 200 on success', (done) => {
    chai.request(app)
      .get(`/api/v1/businesses/${availableBusinessId}/reviews/`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return 404 if no specified business is found', (done) => {
    const businessId = 10;
    chai.request(app)
      .get(`/api/v1/businesses/${businessId}/reviews/`)
      .end((res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return status of 500 for invalid businessId', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/11111111132222222222222224333333')
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.error).to.equal(true);
        done();
      });
  });
  it('should return status of 500 if id is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/shduss')
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.error).to.equal(true);
        done();
      });
  });
});

describe('Delete review by id', () => {
  it('should return status of 404 if not found', (done) => {
    chai.request(app)
      .delete('/api/v1/businesses/3/reviews/100')
      .set('Authorization', NOREADACCESS)
      .end((res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return status of 200 if successful', (done) => {
    chai.request(app)
      .delete(`/api/v1/businesses/3/reviews/1`)
      .set('Authorization', NOREADACCESS)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return status of 200 if deleted by admin', (done) => {
    chai.request(app)
      .delete(`/api/v1/businesses/3/reviews/2`)
      .set('Authorization', ADMINTOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return status of 403 if not owner or admin', (done) => {
    chai.request(app)
      .delete(`/api/v1/businesses/3/reviews/2`)
      .set('Authorization', REVIEWER_TOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should return status of 404 if business does note exist', (done) => {
    chai.request(app)
      .delete(`/api/v1/businesses/300/reviews/2`)
      .set('Authorization', ADMINTOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should return status of 500 if id is invalid', (done) => {
    chai.request(app)
      .delete(`/api/v1/businesses/3/reviews/thsh`)
      .set('Authorization', ADMINTOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });

  it('should return status of 403 if token is valid but not admin or owner', (done) => {
    chai.request(app)
      .delete(`/api/v1/businesses/3/reviews/3`)
      .set('Authorization', NOWRITEACCESS)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        res.body.message.should.eql('Operation forbidden, you have no access to modify this review');
        done();
      });
  });
});
