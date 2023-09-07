import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import CompanyCard from '../components/CompanyCard/CompanyCard';

test('renders correctly', () => {
  const tree = render(
    <Provider store={store}>
      <BrowserRouter>
        <CompanyCard />
      </BrowserRouter>
    </Provider>,
  );

  expect(tree).toMatchSnapshot();
});
