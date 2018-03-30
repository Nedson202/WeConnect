import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../index';

const [should, expect] = [chai.should(), chai.expect]; // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoibW9zZXMiLCJlbWFpbCI6ImhlaWdodEB3aWR0aC5jb20iLCJpYXQiOjE1MjI0MjU0ODgsImV4cCI6MTUyMjQ2MTQ4OH0.-awkLcbxRdMNOi_mjdKU6_PYNtag2EzM4g06D-tlSFM'; // eslint-disable-line no-max-len
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWxsZW4iLCJlbWFpbCI6Im1pa2VvZEBtYS55YSIsImlhdCI6MTUyMTU3OTYwNSwiZXhwIjoxNTIxNjE1NjA1fQ.AuYLQU_PdcDMvIfrDDcjH8DJI1MkLuCR74UXzu4BEQI'; // eslint-disable-line no-max-len
const availableBusinessId = 2;

describe('Review posting', () => {
  it('should return status of 403 if token is invalid', (done) => {
    chai.request(app)
      .post(`/api/v1/businesses/${availableBusinessId}/reviews`)
      .set('x-access-token', invalidToken)
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
      .set('x-access-token', token)
      .send({
        message: 'Business is great'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should return forbidden if reviewer is the business owner', (done) => {
    chai.request(app)
      .post(`/api/v1/businesses/${availableBusinessId}/reviews`)
      .set('x-access-token', token)
      .send({
        message: 'Business is great'
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        res.body.message.should.eql('Owner of a business can not post a review')
        done();
      });
  });

  it('should return status 400 if message is empty', (done) => {
    chai.request(app)
      .post('/api/v1/businesses/3/reviews')
      .set('x-access-token', token)
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
      .set('x-access-token', token)
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
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
});

describe('Get reviews', () => {
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
});
