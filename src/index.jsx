import React from "react";
import ReactDOM from "react-dom";
import App from "./view/App.jsx";

import styles from './styles/style.styl';

import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

  import {createBrowserHistory} from 'history'

import PageHome from './view/pages/PageHome'
import PageBoard from './view/pages/PageBoard'

ReactDOM.render( 
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<PageHome/>}></Route>
      <Route path="/board/:id" element={<PageBoard/>}></Route>
    </Routes>
  </BrowserRouter>, 
    document.getElementById("root")
    );