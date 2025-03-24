import Home from './routes/Home/Home'
import Articles from './routes/Article/Article'

const AppRoutes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: 'article/:slug',
    component: Articles,
    exact: true,
  }
];

export default AppRoutes