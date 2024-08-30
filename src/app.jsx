import './index.css'; // import css
import * as React from "react";
import { createRoot } from "react-dom/client";
import {HashRouter as Router ,Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import ConfigurationPage from './ConfigurationPage.jsx';
import TemplatePage from './TemplatePage.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
   <> 
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Configure" element={< ConfigurationPage/>} />
                <Route path="/template" element={<TemplatePage/>}/>
            </Routes>
        </div>
    </Router>
   </>
);