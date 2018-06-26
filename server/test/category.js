import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../index';


const [should, expect] = [chai.should(), chai.expect]; // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Get all category', () => {
  it('should return status of 200 on success', (done) => {
    chai.request(app)
      .get('/api/v1/categories')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        res.body.categories.should.be.a('array');
        done();
      });
  });
});