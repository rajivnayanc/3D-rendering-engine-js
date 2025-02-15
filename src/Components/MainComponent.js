import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import RayTracing from './RayTracing/RayTracing';
import HomePage from './HomePage/Home';
import Rasterization from './Rasterization/Rasterization';

class MainComponent extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path='/' element={<Navigate to='/home' replace />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/ray-tracing' element={<RayTracing />} />
                    <Route path='/rasterization' element={<Rasterization />} />
                </Routes>
            </Router>
        );
    }

}

export default MainComponent;
