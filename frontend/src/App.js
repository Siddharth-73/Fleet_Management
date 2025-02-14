import React, { useEffect, useState } from 'react';
import axios from 'axios';


const App = () => {
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/predict')
            .then(response => setPredictions(response.data.predictions))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Fleet Management Dashboard</h1>
            <h2>Maintenance Predictions</h2>
            <ul>
                {predictions.map((prediction, index) => (
                    <li key={index}>{prediction ? "Maintenance Required" : "No Maintenance Required"}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;