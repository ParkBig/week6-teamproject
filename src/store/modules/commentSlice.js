import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosIns } from "../../api";


const initialState = {
  comments: [
    {
      id: 0,
      comment: "",
      nickName: "",
      createdAt: "",
    },
  ],
  isLoading: false,
  error: null,
};

export const __getCom = createAsyncThunk(
  "comments/getCom",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosIns.get(`/api/posts/${payload}`);

      return thunkAPI.fulfillWithValue(data.data.commentResponseDtoList);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postCom = createAsyncThunk(
  "comments/postCom",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosIns.post(
        `/api/posts/${payload[0]}/comments`,
        payload[1]
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteCom = createAsyncThunk(
  "comments/deleteCom",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosIns.delete(
        `/api/posts/${payload[0]}/comments/${payload[1]}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    //get
    [__getCom.pending]: (state) => {
      state.isLoading = true;
    },
    [__getCom.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [__getCom.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //post
    [__postCom.pending]: (state) => {
      state.isLoading = true;
    },
    [__postCom.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments.push(action.payload);
    },
    [__postCom.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //delete
    [__deleteCom.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteCom.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__deleteCom.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
