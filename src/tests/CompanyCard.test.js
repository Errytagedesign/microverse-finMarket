import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { beforeEach } from '@jest/globals';
import companiesReducer from '../redux/Company/CompanySlice';

import CompanyCard from '../components/CompanyCard/CompanyCard';
// Mock the fetch function globally to intercept API requests
global.fetch = jest.fn();

describe('CompanyCard Component', () => {
  let store;

  beforeEach(() => {
    // Create a store with the companiesReducer and the desired initial state
    store = configureStore({
      reducer: {
        companies: companiesReducer,
      },
      preloadedState: {
        companies: {
          topGainers: [
            {
              name: 'Company1',
              symbol: 'C1',
              price: 100,
            },
            {
              name: 'Company2',
              symbol: 'C2',
              price: 200,
            },
            {
              name: 'Company3',
              symbol: 'C3',
              price: 300,
            },
          ],
          isSearchParam: '',
          isLoading: false,
          error: null,
        },
      },
    });
  });

  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CompanyCard />
        </BrowserRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
    // Verify that the component renders without errors
    expect(screen.getByText('Top Gainers:')).toBeInTheDocument();
  });

  it('displays companies', async () => {
    // Mock the API response for fetch
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        topGainers: [
          {
            name: 'Company3',
            symbol: 'C3',
            price: 300,
          },
        ],
      }),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CompanyCard />
        </BrowserRouter>
      </Provider>,
    );

    // Wait for the component to load and display the companies
    await screen.findByText('Company1');
    await screen.findByText('Company3');

    // Verify that the loaded companies are displayed
    expect(screen.getByText('Company1')).toBeInTheDocument();
    expect(screen.getByText('Company3')).toBeInTheDocument();
  });

  it('Handle search', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CompanyCard />
        </BrowserRouter>
      </Provider>,
    );
    // Simulate typing in the search input
    fireEvent.change(screen.getByPlaceholderText('Search company by name...'), {
      target: { value: 'Company1' },
    });

    // Await comp to filter and display search result

    await screen.findByText('Company1');
    expect(screen.queryByText('Company2')).not.toBeInTheDocument();

    // Clear the search input
    fireEvent.change(screen.getByPlaceholderText('Search company by name...'), {
      target: { value: '' },
    });

    // Verify that all companies are displayed again
    expect(screen.getByText('Company1')).toBeInTheDocument();
    expect(screen.getByText('Company2')).toBeInTheDocument();
    expect(screen.getByText('Company3')).toBeInTheDocument();
  });
});
