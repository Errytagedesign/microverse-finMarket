import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import DetailNav from '../components/DetailNav';
import companiesReducer from '../redux/Company/CompanySlice';

describe('DetailNav test', () => {
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
          <DetailNav />
        </BrowserRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
