import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import logger from 'morgan';
import route from './server/routes/index';
import models from './server/models/index';

const swaggerDocument = yaml.load(`${process.cwd()}/swagger.yaml`);

const app = express();

const port = process.env.PORT || 4000;

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// validator to check user input
app.use(expressValidator());


app.use(logger('dev'));

route(app);
// route for api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  models.sequelize.sync();
});

// setup a default catch-all route for undef-route
app.get('*', (req, res) => res.status(405).json({
  message: 'Welcome to the WeConnect api, this route is unavailable',
  error: true
}));

export default app;
