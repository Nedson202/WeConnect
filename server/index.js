import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import logger from 'morgan';
import route from './routes/index';

const app = express();

const port = 4000;

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// validator to check user input
app.use(expressValidator());

app.use(logger('dev'));

route(app);

app.listen(port);

// setup a default catch-all route for undef-route
app.get('*', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the WeConnect api',
    error: false
  });
});

export default app;
