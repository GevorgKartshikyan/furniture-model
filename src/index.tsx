import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../src/asstest/styles/style.scss'
import store from './store'
import { Provider } from 'react-redux'
import Modal from 'react-modal';
import {ToastContainer} from "react-toastify";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
Modal.setAppElement('#root');
root.render(
    <Provider store={store}>
        <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
