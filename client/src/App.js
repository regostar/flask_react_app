import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/api/message')
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('There was an error fetching the message!', error);
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>{message}</p>
            </header>
        </div>
    );
}

export default App;
