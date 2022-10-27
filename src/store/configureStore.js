import { configureStore } from "@reduxjs/toolkit";

import comments from "../store/modules/commentSlice";
import details from "../store/modules/detailSlice";

const store = configureStore({
  reducer: {
    comments: comments,
    details: details,
  },
});

export default store;
