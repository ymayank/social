import React, { useEffect, useState } from 'react';
import { Provider } from 'mobx-react';
import store from './store/Store';
import Nav from './navigation/Nav';
import Toast from './components/Toast';
import Loader from './components/Loader';

function App() {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await store.init();
      setIsLoaded(true);
    })()
  })

  return (
    <Provider {...store}>
      <Toast />
      <Loader />
      {isLoaded && <Nav />}
    </Provider>
  );
}

export default App;
