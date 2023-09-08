import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navigation from '../components/Navigation';
import store from '../redux/store';

test('renders correctly', () => {
  const tree = render(
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>,
  );

  expect(tree).toMatchSnapshot();
});
