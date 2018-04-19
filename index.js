import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import logger from 'morgan';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import userRoute from './server/routes/user';
import businessRoute from './server/routes/business';
import reviewRoute from './server/routes/reviews';
import models from './server/models/index';
import webpackConfig from './webpack.config';

const swaggerDocument = yaml.load(`${process.cwd()}/swagger.yaml`);

const app = express();

const port = process.env.PORT || 4000;

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// validator to check user input
app.use(expressValidator());

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  hot: true
}));

app.use(webpackHotMiddleware(compiler));

app.use(logger('dev'));

userRoute(app);
businessRoute(app);
reviewRoute(app);
// route for api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static(path.resolve(__dirname, './dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, () => {
  models.sequelize.sync();
});

export default app;
