import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import reducer from './store/reducer';
import { Nav } from './componetns/Navigation/Navigation';

const store = createStore(reducer, applyMiddleware())

function App() {
  return (  
    <div>
       <Nav></Nav>
    </div>
  );
}

export default App;
