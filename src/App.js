import React from 'react';
import { Provider } from 'mobx-react';
import store from './store/Store';
import Nav from './navigation/Nav';

function App() {
  return (
    <Provider {...store}>
      <Nav />
    </Provider>
  );
}

export default App;
