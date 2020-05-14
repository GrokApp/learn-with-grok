import React, { useState } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthContext from 'contexts/AuthContext';
import LanguageContext from 'contexts/LanguageContext';
import { isLoggedIn } from 'helpers/helpers';

const store = configureStore();

const AppWrapper = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const [siteLanguage, setSiteLanguage] = useState('GB');

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <LanguageContext.Provider value={{ siteLanguage, setSiteLanguage }}>
        <App />
      </LanguageContext.Provider>
    </AuthContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
