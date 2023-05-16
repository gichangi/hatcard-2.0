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
        const pages = import.meta.glob('./views/**/*.js', { eager: true })
        return pages[`./views/${name}.js`]
    },
    setup({el}) {
       // createRoot(el).render(<App {...props} />)
        const rootElement = document.getElementById("root");
        const root = createRoot(el);

        root.render(
            <Provider store={store}>
                <ConfigProvider>
                    <StrictMode>
                        <App />
                    </StrictMode>
                </ConfigProvider>
            </Provider>,
        );
    },



})
