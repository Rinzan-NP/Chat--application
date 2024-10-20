import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import UserWrapper from "./Wrapper/UserWrapper";
import AdminWrapper from "./Wrapper/Adminwrapper";

function App() {
  useEffect(()=>{

  },[])
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<UserWrapper/>}></Route>
          <Route path="admin/*" element={<AdminWrapper/>}></Route>
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
