import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
  SearchRestaurant,
  SearchRestaurantVariables,
} from '../../__api__/SearchRestaurant';

const SEARCH_RESTAURANT = gql`
  query SearchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [callQuery] = useLazyQuery<SearchRestaurant, SearchRestaurantVariables>(
    SEARCH_RESTAURANT
  );
  useEffect(() => {
    const [_, query] = location.search.split('?term=');
    if (!query) {
      return history.replace('/');
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location]);
  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <h1>Search page</h1>
    </div>
  );
};
