import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";

ReactDOM.render(
  <BrowserRouter>
    <>
      {/* ログインしたときはAppを表示 */}
      <Route exact path="/" component={App} />
      {/* ログインしていないときはLoginを表示 */}
      <Route exact path="/login" component={Login} />
    </>
  </BrowserRouter>,
  document.getElementById("root")
);
