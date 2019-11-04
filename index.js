import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import logger from 'morgan';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import http from 'http';
import https from 'https';
import path from 'path';
import userRoute from './server/routes/user';
import businessRoute from './server/routes/business';
import reviewRoute from './server/routes/reviews';
import models from './server/models/index';
import webpackConfig from './webpack.config';
import webpackProdConfig from './webpack.prod';

const swaggerDocument = yaml.load(`${process.cwd()}/swagger.yaml`);

const app = express();

const port = process.env.PORT || 5000;

const appUrl = process.env.NODE_ENV.match('development')
  ? `http://localhost:${port}` : process.env.PRODUCTION_URL

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// validator to check user input
app.use(expressValidator());

const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    hot: true
  }));

  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(webpackMiddleware(webpack(webpackProdConfig)));
}

app.use(logger('dev'));
app.use(express.static('./dist'));

userRoute(app);
businessRoute(app);
reviewRoute(app);
// route for api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(port, () => {
  models.sequelize.sync();
});

const httpProtocol = process.env.NODE_ENV.match('production') ? https : http;

setInterval(() => {
  (() => {
    httpProtocol.get(`${appUrl}/api/v1/healthCheck`, () => {});
  })();
}, 1000 * 10 * 60 * 24);

export default app;
