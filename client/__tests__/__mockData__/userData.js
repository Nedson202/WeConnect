export default {
  authResponse: {
    message: 'login successful',
    tokenMessage: 'Generated token expires in 10 hours time',
    data: {
      error: false,
      token: localStorage.token,
      image: ''
    }
  },
  loginData: {
    username: 'test',
    password: '123456'
  },
  signupData: {
    username: 'test',
    email: 'example@email.com',
    password: '123456'
  },
  userDetailsToUpdate: {
    id: 1,
    username: 'oldUser',
    email: 'user@email.com',
    image: 'path/to/image'
  },
  userUpdateData: {
    id: 1,
    username: 'newUser',
    email: 'example@email.com',
    image: 'path/to/image'
  },
  errorResponse: {
    response: {
      data: ['Unsuccessful']
    }
  },
  userUpdateResponse: {
    message: 'profile updated successfully',
    data: {
      username: 'newUser',
      email: 'example@email.com',
      image: 'path/to/image'
    },
    token,
    error: false,
  },
  userData: {
    id: 1,
    username: 'astro'
  },
  users: [
    {
      id: 1,
      username: 'astro'
    },
    {
      id: 2,
      username: 'chemical'
    },
    {
      id: 3,
      username: 'physics'
    },
  ],
  state: {
    username: 'mike',
    email: 'alen@stuart.mill'
  },
  loginState: {
    username: 'mike',
    password: 'alen@stuart.mill'
  },
  signupState: {
    username: 'mike',
    email: 'alen@stuart.mill',
    password: 'oilwell'
  },
  searchState: {
    query: 'benue',
    option: 'location'
  }
};
