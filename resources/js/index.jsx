import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import ReactDOM from 'react-dom';
import { createInertiaApp } from '@inertiajs/react'
import { ConfigProvider } from './contexts/ConfigContext';
import App from './Apps';
import {Provider} from "react-redux";
import store from "./store";
import './index.scss';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./views/**/*.jsx', { eager: true })
        return pages[`./views/${name}.jsx`]
    },
    setup({el}) {
       // createRoot(el).render(<App {...props} />)
        const rootElement = document.getElementById("root");
        const root = createRoot(rootElement);
        console.log("childrensautheindesx")
        root.render(
            <StrictMode>
                <Provider store={store}>
                    <ConfigProvider>
                        <App />
                    </ConfigProvider>
                </Provider>
            </StrictMode>

        );
    },



});
