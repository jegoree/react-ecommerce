import Categories from './components/categories/categories.component';

const categories = [
  {
    id: 1,
    title: 'New Arrivals',
    imageUrl: 'https://i.ibb.co/rGYSsVP/new-arrivals.jpg',
  },
  {
    id: 2,
    title: 'By Age',
    imageUrl: 'https://i.ibb.co/LP7BmRj/by-age.jpg',
  },
  {
    id: 3,
    title: 'By Manufacturer',
    imageUrl: 'https://i.ibb.co/r6WPGkm/by-manufacturer.jpg',
  },
  {
    id: 4,
    title: 'All products',
    imageUrl: 'https://i.ibb.co/6v8XY5Z/all-products.jpg',
  },
  {
    id: 5,
    title: 'Best Sellers',
    imageUrl: 'https://i.ibb.co/2SbSVBY/best-sellers.jpg',
  },
];

const App = () => {
  return <Categories categories={categories} />;
};

export default App;
