import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/ray-tracing">Ray Tracing</Link>
                </li>
                <li>
                    <Link to="/rasterization">Rasterization</Link>
                </li>
            </ul>
        </nav>
    )
}

export default HomePage;