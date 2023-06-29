import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ReactDOM from 'react-dom/client';
import { store } from './infrastructure/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { AuthContextContextProvider } from './context/Auth-context';
import { ToastContainer } from 'react-toastify';
import CreateNewItemDialog from './components/core/CreateNewItemDialog';
import CreateNewClientDialog from './components/core/CreateNewClient';

const persistor = persistStore(store);
const root = document.getElementById('root');

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthContextContextProvider>
          <BrowserRouter>
            <ToastContainer />
            <CreateNewItemDialog />
            <CreateNewClientDialog />
            <App />
          </BrowserRouter>
        </AuthContextContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
