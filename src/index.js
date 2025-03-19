'use strict';

import React from "react";
import ReactDOM from 'react-dom/client';

import Main from './components/Main.js';
import ErrorBoundary from './components/ErrorBoundary.js';
import './style.css';

const rootNodeElement = document.querySelector('#main');
const root = ReactDOM.createRoot(rootNodeElement);
root.render(
    <ErrorBoundary>
        <Main/>
    </ErrorBoundary>
);