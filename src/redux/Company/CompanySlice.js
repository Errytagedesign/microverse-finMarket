import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_API_KEY;

// Fetch Mission
export const getCompanies = createAsyncThunk(
  'company/getCompanies',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    if (state.companies.topGainers.length === 0) {
      const resp = await fetch(
        `https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=${API_KEY}`,
      );
      const data = await resp.json();
      return data;
    }

    return state.companies.topGainers;
  },
);

export const getCompanyDetails = createAsyncThunk(
  'company/getCompanyDetails',
  async (symbol) => {
    const resp = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`,
    );
    const data = await resp.json();
    console.log(data);
    return data;
  },
);

const initialState = {
  topGainers: [],
  companyDetail: {},
  isLoading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topGainers = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(getCompanyDetails.fulfilled, (state, action) => {
        state.companyDetail = action.payload;
      });
  },
});

export const selectCompanies = (state) => state.companies;
export default companiesSlice.reducer;
