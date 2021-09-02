import { AppThunk, RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface RepoState {
  data: string[];
  error: string | null;
  loading: boolean;
}

const initialState: RepoState = {
  data: [],
  error: null,
  loading: false,
};
const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    searchRepoStart: (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    },
    searchRepoSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    searchRepoFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

// manuly create thunk

export const searchRepo =
  (term: string): AppThunk =>
  async (dispatch) => {
    dispatch(searchRepoStart());
    console.log('inside thunk');

    try {
      const { data } = await axios.get(
        'http://registry.npmjs.com/-/v1/search',
        {
          params: {
            text: term,
          },
        }
      );
      const names = data.objects.map((item: any) => item.package.name);
      dispatch(searchRepoSuccess(names));
    } catch (error: any) {
      dispatch(searchRepoFail(error.message));
    }
  };

export const selectRepo = (state: RootState) => state.repo;

export const { searchRepoStart, searchRepoSuccess, searchRepoFail } =
  repoSlice.actions;
export default repoSlice.reducer;
