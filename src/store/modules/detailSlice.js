import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosIns } from "../../api";

const initialState = {
  data: [
    {
      id: 0,
      // postId: 0,
      nickName: "",
      content: "",
      exercise: "",
      time: "",
      date: "",
      modifiedAt: "",
      createAt: "",
    },
  ],
  detail: {
    id: 0,
    // postId: 0,
    nickName: "",
    content: "",
    exercise: "",
    time: "",
    date: "",
    modifiedAt: "",
    createAt: "",
  },

  imgResponseDtoList: {
    0: {
      url: "",
    },
  },

  isLoading: false,
  error: null,
};

export const __getDet = createAsyncThunk(
  "api/posts/getDet",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosIns.get("api/posts");
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __detailDet = createAsyncThunk(
  "data/detailDet",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosIns.get(`/api/posts/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteDet = createAsyncThunk(
  "data/deleteDet",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosIns.delete(`/api/posts/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editDet = createAsyncThunk(
  "data/clearDet",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosIns.put(
        `/api/posts/${payload[0]}`,
        payload[1]
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const detailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: {
    //get
    [__getDet.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDet.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__getDet.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //post
    // [__postDet.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__postDet.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.data.push(action.payload);
    // },
    // [__postDet.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },

    //detail
    [__detailDet.pending]: (state) => {
      state.isLoading = true;
    },
    [__detailDet.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [__detailDet.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //delete
    [__deleteDet.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteDet.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__deleteDet.rejected]: (state, action) => {
      state.error = action.payload;
    },

    //edit
    [__editDet.pending]: (state) => {
      state.isLoading = true;
    },
    [__editDet.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = [...state.data].map((item) => {
        if (action.payload.id === item.id) {
          return action.payload;
        }
        return item;
      });
    },
    [__editDet.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = detailSlice.actions;
export default detailSlice.reducer;
