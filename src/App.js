import React from 'react';
import Home from './components/home'
import Application from './components/Application'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.scss'
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Route path="/app" exact component={Application} />
        <Route path="/" exact component={Home} />
    </Router>
  );
}

export default App;
