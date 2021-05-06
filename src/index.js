import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; // App.js ekledik.
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//Component'ları neye göre yazıcaz karar verelim.
//App.js olcak. SearchBar diye bir component, MovieList'ide ayrı bir component olcak.
//

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
