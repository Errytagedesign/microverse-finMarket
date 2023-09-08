import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CompanyDetails, { formatMoney } from '../pages/CompanyDetails';
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
          companyDetail: [
            {
              companyName: 'Apple',
              ceo: 'Cook',
              currency: 'USD',
              exchangeShortName: 'NASDAQ',
              image: 'https://apple.com/images',
              industry: 'Software Engineer',
              isActivelyTrading: 'Yes',
              mktCap: 120979678899,
              price: 2.5,
              sector: 'Tech',
              website: 'https://apple.com',
              description: 'About apple products',
            },
          ],
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

    // Assert that the company name is displayed
    const isCompanyName = screen.getByText('Apple');
    expect(isCompanyName).toBeInTheDocument();

    // Assert that the ceo name is displayed
    const isCEO = screen.getByText('Cook');
    expect(isCEO).toBeInTheDocument();

    // Assert that the currency name is displayed
    const isCurrency = screen.getByText('USD');
    expect(isCurrency).toBeInTheDocument();

    // Assert that the exchange name is displayed
    const isExchangeName = screen.getByText('NASDAQ');
    expect(isExchangeName).toBeInTheDocument();

    // Assert that the logo is displayed
    const isCompanyLogo = screen.getByRole('img');
    expect(isCompanyLogo).toBeInTheDocument();
    // Assert img has src
    expect(isCompanyLogo).toHaveAttribute('src', 'https://apple.com/images');
    // Assert that img has alt text
    expect(isCompanyLogo).toHaveAttribute('alt', 'Apple');

    // Assert that the industry name is displayed
    const isIndustry = screen.getByText('Software Engineer');
    expect(isIndustry).toBeInTheDocument();

    // Assert that the actively trading status is displayed
    const isActivelyTrading = screen.getByText('Yes');
    expect(isActivelyTrading).toBeInTheDocument();

    // Assert that Market cap is displayed
    const isMktCap = screen.getByText('$120,979,678,899.00');
    expect(isMktCap).toBeInTheDocument();

    // Assert that the price is displayed
    const isCompanyPrice = screen.getByText('$2.5');
    expect(isCompanyPrice).toBeInTheDocument();

    // Assert that the company Sector is displayed
    const isCompanySector = screen.getByText('Tech');
    expect(isCompanySector).toBeInTheDocument();

    // Assert that the company website is displayed
    const isCompanyWebsite = screen.getByRole('link', {
      name: 'Visit Our Website',
    });
    expect(isCompanyWebsite).toBeInTheDocument();

    // Assert that the company Description is displayed
    const isCompanyDescription = screen.getByText('About apple products');
    expect(isCompanyDescription).toBeInTheDocument();
  });

  it('Conver number to money in USD currency', () => {
    const result = formatMoney(98786569);
    expect(result).toBe('$98,786,569.00');
  });
});
