import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../index';

const [should, expect] = [chai.should(), chai.expect]; // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Get all location', () => {
  it('should return status of 200 on success', (done) => {
    chai.request(app)
      .get('/api/v1/locations')
      .end((res) => {
        expect(res.status).to.equal(200);
        res.body.should.be.a('object');
        res.body.locations.should.be.a('array');
        done();
      });
  });
});