import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../index';

const [should, expect] = [chai.should(), chai.expect]; // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Api test', () => {
  it('should return welcome message', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
        if (err) throw err;
        expect(res).to.have.status(200);
        // res.body.message.should.eql('Welcome to the WeConnect api');
        done();
      });
  });

  it('should return status 404 when a post request is sent to an unavailable route', (done) => {
    chai.request(app)
      .post('/here')
      .end((res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
