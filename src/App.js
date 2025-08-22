import React, { useEffect } from 'react'
import Page from './Routes/Page'
import './App.css'
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from 'react-router-dom';


export default function App() {
  const Env = process.env;
  useEffect(() => {
  // Set favicon
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/png';
  link.rel = 'shortcut icon';
  link.href = Env.REACT_APP_PROJECT_ICON;
  document.getElementsByTagName('head')[0].appendChild(link);

  // Set page title
  document.title = Env.REACT_APP_PROJECT_NAME; // <-- Change this to your desired title
}, []);


  return (<>
    <Provider store={store}>
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </Provider>
  </>
  )
}
