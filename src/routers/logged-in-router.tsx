import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Restaurants from '../pages/client/restaurants';
import Header from '../components/header';
import { useMe } from '../hooks/useMe';
import NotFound from '../pages/404';
import ConfirmEmail from '../pages/user/confirm-email';
import EditProfile from '../pages/user/edit-profile';
import { Search } from '../pages/client/search';
import { CategoryView } from '../pages/client/category';
import { RestaurantView } from '../pages/client/restaurant';

const clientRoutes = [
  {
    path: '/',
    component: <Restaurants />,
  },
  {
    path: '/confirm',
    component: <ConfirmEmail />,
  },
  {
    path: '/search',
    component: <Search />,
  },
  {
    path: '/edit-profile',
    component: <EditProfile />,
  },
  {
    path: '/category/:slug',
    component: <CategoryView />,
  },
  {
    path: '/restaurants/:id',
    component: <RestaurantView />,
  },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="text-3xl tracking-widest">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'CLIENT' &&
          clientRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
