import React from 'react';
import ReactDOM from 'react-dom';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.js', { eager: true })
        return pages[`./Pages/${name}.js`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})
