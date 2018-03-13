import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import logger from 'morgan';
import route from './routes/index';

const swaggerDocument = yaml.load(`${process.cwd()}/swagger.yaml`);

const app = express();

const port = 4000;

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// validator to check user input
app.use(expressValidator());


app.use(logger('dev'));

route(app);
// route for api-docs
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port);

// setup a default catch-all route for undef-route
app.get('*', (req, res) => {
  res.status(405).json({
    message: 'Welcome to the WeConnect api, this route is unavailable',
    error: true
  });
});

export default app;
