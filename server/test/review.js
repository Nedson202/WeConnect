import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../index';
import models from '../models/index';

const [should, expect] = [chai.should(), chai.expect]; // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoibW9zZXMiLCJlbWFpbCI6ImhlaWdodEB3aWR0aC5jb20iLCJpYXQiOjE1MjE3MDUxODN9.ttpWh2Ju4h9pBURJQQHfc2bqii5-py7zS2VSIOugeSU'; // eslint-disable-line no-max-len
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

  it('should return status 400 if message is empty', (done) => {
    chai.request(app)
      .post(`/api/v1/businesses/${availableBusinessId}/reviews`)
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
      .post(`/api/v1/businesses/${availableBusinessId}/reviews`)
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
});
