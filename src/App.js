import React from 'react'
import Page from './Routes/Page'
import './App.css'
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (<>
  <Provider store={store}>
    <div className="wrapper">
      <Page />
    </div>
    </Provider>s
  </>
  )
}
