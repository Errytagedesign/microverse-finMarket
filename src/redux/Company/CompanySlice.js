import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_API_KEY;

// Fetch Mission
export const getCompanies = createAsyncThunk(
  'company/getCompanies',
  async () => {
    const resp = await fetch(
      `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${API_KEY}`,
    );
    const data = await resp.json();
    console.log(data);
    return data;

    // const state = thunkAPI.getState();

    // if (state.mission.missionData.length === 0) {
    //   const resp = await fetch(
    //     `https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=${API_KEY}`,
    //   );
    //   const data = resp.json();
    //   console.log(data);
    //   return data;
    // }

    // return state.mission.missionData;
  },
);

const initialState = {
  companies: [],
  filteredCompanies: [],
  companyDetail: [],
  statement: [],
  isLoading: false,
  error: '',
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addCase(getCompanies.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        companies: action.payload,
      }))
      .addCase(getCompanies.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

export const selectCompanies = (state) => state.companies;
export default companiesSlice.reducer;
