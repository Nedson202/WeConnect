export default {
  business: {
    id: 1,
    name: 'alpha tech',
    email: 'altech@caria.net',
    address: '2r close sau paulo',
    location: 'sau paulo',
    categories: 'tech',
    description: 'this is a simple meal made with rice and yam',
    image: 'image/connect.jpg'
  },
  allBusiness: [
    {
      id: 1,
      name: 'alpha tech',
      email: 'altech@caria.net',
      address: '2r close sau paulo',
      location: 'sau paulo',
      categories: 'tech',
      description: 'this is a simple meal made with rice and yam',
      image: 'image/connect.jpg',
      userId: 1
    },
    {
      id: 2,
      name: 'techudia',
      email: 'testech@caria.net',
      address: '2r close sau paulo',
      location: 'sau paulo',
      categories: 'tech',
      description: 'this is a simple meal made with rice and yam',
      image: 'image/connect.jpg',
      userId: 1
    },
    {
      id: 3,
      name: 'Lancorp',
      email: 'lancorp@biz.net',
      address: '2r close sau paulo',
      location: 'sau paulo',
      categories: 'tech',
      description: 'this is a simple meal made with rice and yam',
      image: 'image/connect.jpg',
      userId: 3
    }
  ],
  usersBusiness: [
    {
      id: 1,
      name: 'alpha tech',
      email: 'altech@caria.net',
      address: '2r close sau paulo',
      location: 'sau paulo',
      categories: 'tech',
      description: 'this is a simple meal made with rice and yam',
      image: 'image/connect.jpg',
      userId: 1
    },
    {
      id: 2,
      name: 'techudia',
      email: 'testech@caria.net',
      address: '2r close sau paulo',
      location: 'sau paulo',
      categories: 'tech',
      description: 'this is a simple meal made with rice and yam',
      image: 'image/connect.jpg',
      userId: 1
    }
  ],
  locations: [
    {
      id: 1,
      location: 'lao'
    },
    {
      id: 2,
      location: 'hawaii'
    }
  ],
  categories: [
    {
      id: 1,
      category: 'finance'
    },
    {
      id: 2,
      category: 'tech'
    }
  ],
  paginationResult: {
    page: 1,
    limit: 6,
    totalBusiness: 10
  },
  review: {
    message: 'Great business',
    rating: 3
  },
  loadingStatus: {
    isLoading: false
  }
};
