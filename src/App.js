import React from 'react';

const App = () => {

  const API_KEY = process.env.REACT_APP_API_KEY;
  const APP_KEY = '2d508402b4840570e8a9933163754db5';
  const search = '';
  const API = `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${API_KEY}`;
  return (
    <div className="app">
      <h1>Hello React</h1>
    </div>
  )
}

export default App;
