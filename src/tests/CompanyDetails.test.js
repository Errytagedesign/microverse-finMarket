import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CompanyDetails from '../pages/CompanyDetails';
import companiesReducer from '../redux/Company/CompanySlice';

describe('CompanyDetails Component', () => {
  let store;

  beforeEach(() => {
    // Create a store with the companiesReducer and the desired initial state
    store = configureStore({
      reducer: {
        companies: companiesReducer,
      },
      preloadedState: {
        companies: {
          companyDetail: [],
        },
      },
    });
  });

  it('renders company details correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CompanyDetails />
        </BrowserRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
