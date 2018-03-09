import express from 'express';
import businesses from '../dummy-data/businesses';

const businessRoute = express.Router();
let businessCounter = 0;

businessRoute.get('/', (req, res) => {
  res.send('Welcome to WeConnect');
});

businessRoute.post('/businesses/', (req, res) => {
  for (
    businessCounter; businessCounter < businesses.length; businessCounter += 1
  ) {
    if (!req.body.name) {
      return res.json({
        message: 'please provide a name'
      });
    } else if (businesses[businessCounter].name === req.body.name) {
      return res.json({
        message: 'name is taken'
      });
    } else if (!req.body.email) {
      return res.json({
        message: 'please provide an email'
      });
    } else if (!req.body.address) {
      return res.json({
        message: 'please provide an address'
      });
    } else if (!req.body.location) {
      return res.json({
        message: 'please provide a location'
      });
    } else if (!req.body.category) {
      return res.json({
        message: 'please provide a category'
      });
    }
  }

  const bizId = businesses[businesses.length - 1].id + 1;

  businesses.push({
    id: bizId,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    location: req.body.location,
    category: req.body.category
  });

  return res.status(200).json({
    message: 'Business registration successful'
  });
});

// Get all business
businessRoute.get('/businesses', (req, res) => {
  let filteredBusiness;

  const { location, category } = req.query;

  if (location) {
    filteredBusiness = businesses.filter(business => location.toLowerCase() === business.location);
    return res.status(200).json(filteredBusiness);
  }

  if (category) {
    filteredBusiness = businesses.filter(business => category.toLowerCase() === business.category);
    return res.status(200).json(filteredBusiness);
  }

  if (location && category) {
    filteredBusiness = businesses.filter(business => location === business.location &&
            category === business.category);
    return res.status(200).json(filteredBusiness);
  }

  res.status(200).send(businesses);
});

// Get a business by id
businessRoute.get('/businesses/:businessId', (req, res) => {
  const businessId = parseInt(req.params.businessId, 10);
  const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

  if (!filteredBusiness) {
    res.status(404).send({
      error: 'Business not found'
    });
  }

  res.status(200).send(filteredBusiness);
});

businessRoute.put('/businesses/:businessId', (req, res) => {
  const businessId = parseInt(req.params.businessId, 10);
  const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

  if (!filteredBusiness) {
    return res.status(404).send({
      error: 'Business profile not found, update failed'
    });
  }

  // filteredBusiness.address = req.body.address;
  // filteredBusiness.location = req.body.location;
  // filteredBusiness.category = req.body.category;
  filteredBusiness.name = req.body.name;
  filteredBusiness.email = req.body.email;

  return res.status(201).send({
    message: 'Business profile updated'
  });
});

businessRoute.delete('/businesses/:businessId', (req, res) => {
  const businessId = parseInt(req.params.businessId, 10);
  // for (let i = 0; i <= businesses.length; i += 1) {
  //   if (businesses[i].id === parseInt(req.params.businessId, 10)) {
  //     businesses.splice(i, 1);
  //     return res.sendStatus(204);
  //   }
  // }
  // res.status(404).json({
  //   message: 'business not found'
  // });

  if (businessId) {
    for (let i = 0; i <= businesses.length; i += 1) {
      if (businessId === businesses[i].id) {
        businesses.splice(i, 1);
        return res.sendStatus(204);
      }
    }
  }

  res.status(404).json({
    message: 'business not found'
  });
});

businessRoute.post('/businesses/:businessId/reviews/', (req, res) => {
  const { review } = req.body;
  const businessId = parseInt(req.params.businessId, 10);
  const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

  if (!filteredBusiness) {
    res.status(404).send({
      message: 'Business not found, no review gotten',
      error: true
    });
  }

  filteredBusiness.reviews.push(review);

  res.status(200).json({
    message: 'Review posted successfully',
    error: false
  });
});

businessRoute.get('/businesses/:businessId/reviews/', (req, res) => {
  const businessId = parseInt(req.params.businessId, 10);
  const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

  if (!filteredBusiness) {
    res.status(404).send({
      message: 'Business not found, no review gotten',
      error: true
    });
  }

  if (filteredBusiness.reviews.length === 0) {
    res.sendStatus(204);
  }

  res.status(200).json(filteredBusiness.reviews);
});

export default businessRoute;



// user userLogin

/**
  *
  *@param {any} req
  *@param {any} res
  *return {json}
  *@memberof Auth
*/
static logUser(req, res) {
  const { username, password } = req.body;

  const filterUser = users.filter(user => user.username === username
    && password === user.password)[0];

  if (filterUser) {
    res.status(200).send({
      message: 'Login successful',
      error: false
    });
  }

  return res.status(401).json({
    message: 'Unathorised, check your username or password',
    error: true
  });
}


// user signup validator


static userLogin (req, res, next) {
  const { username, password } = req.body;

  req.check('username', 'Username is required').notEmpty();
  req.check('password', 'minimun password length is 5 chars')
    .isLength({ min: 5 });

  const errors = req.validationErrors();

  if (errors) {
    res.status(400).json({
      message: errors[0].msg,
      error: true
    });
  }

  next()
}


// get userSignup

  route.get('/users', (req, res) => {
    res.send(users);
  });


  route.post('/api/v1/auth/login', userValidator.userLogin, Auth.logUser);
  // route.post('/api/v1/businesses', validateBusiness, Businesses.createBusiness);
  // route.get('/api/v1/businesses', Businesses.filterByLocation, Businesses.filterByCategory, Businesses.getBusiness);
  // route.delete('/api/v1/business/:businessId/reviews', Reviews.postReview);
  // route.get('/api/v1/businesses/:businessId', Businesses.getBusiness);
  // route.put('/api/v1/business/:businessId', Businesses.updateBusiness);
  // route.post('/api/v1/business/:businessId/reviews', Reviews.postReview);
  // route.get('/api/v1/business/:businessId/reviews', Reviews.getReview);





  static getAllBusiness(req, res) {

  }

  static retrieveBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

    if (!filteredBusiness) {
      res.status(404).send({
        error: 'Business not found'
      });
    }

    res.status(200).send(filteredBusiness);
  }

  static updateBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

    if (!filteredBusiness) {
      return res.status(404).json({
        error: 'Business profile not found, update failed'
      });
    }

    filteredBusiness.name = req.body.name || filteredBusiness.name;
    filteredBusiness.email = req.body.email || filteredBusiness.email;
    filteredBusiness.address = req.body.address || filteredBusiness.address;
    filteredBusiness.location = req.body.location || filteredBusiness.location;
    filteredBusiness.category = req.body.category || filteredBusiness.category;

    return res.status(201).json({
      message: 'Business profile updated'
    });
  }

  static deleteBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);

    if (businessId) {
      for (let i = 0; i <= businesses.length; i += 1) {
        if (businessId === businesses[i].id) {
          businesses.splice(i, 1);
          return res.jsonStatus(204);
        }
      }
    }

    res.status(404).json({
      message: 'business not found'
    });
  }
  }




  describe('Get all review', () => {
    it('should return 404 if no review is availvable', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/3/reviews/')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should return status of 200 on success', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/4/reviews/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });



  /**
    *
    *gets all reviews under a business
    *@param {any} req - request value - handles data coming from the user
    *@param {any} res - response value - this is the response gotten after
    interaction with the Api routes
    *@return {status} response object gotten
    *@memberof Businesses
  */
  static getReview(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const filteredBusiness = businesses.filter(business => business.id === businessId)[0];

    if (!filteredBusiness) {
      res.status(404).send({
        message: 'Business not found, no review gotten',
        error: true
      });
    }

    if (filteredBusiness.reviews === undefined) {
      res.status(404).json({
        message: 'No review found',
        error: true
      });
    }

    return res.status(200).json(filteredBusiness.reviews);
  }

  
