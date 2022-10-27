import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/configureStore";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Detail from "./pages/Detail"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/main" element={<Main/>}/>
          <Route path="/main/:id" element={<Detail/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
