import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Bandas from './bandas';
import reportWebVitals from './reportWebVitals';

import localesEsMessages from "./locales/es.json";
import localesEnMessages from "./locales/en.json";

import { IntlProvider } from "react-intl";

const det = () => {
  if (navigator.language.includes('en')){
    return localesEnMessages
  } else if (navigator.language.includes('es')) {
    return localesEsMessages
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
  <IntlProvider locale = {navigator.language} messages={det()}>
  <Bandas/>
  </IntlProvider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
