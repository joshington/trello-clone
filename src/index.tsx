import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DndProvider } from 'react-dnd';
import Backend from "react-dnd-html5-backend";
import BackendFactory from 'dnd-core';
import { AppStateProvider } from './AppStateContext';


ReactDOM.render(
  <DndProvider backend={Backend}>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </DndProvider>,
  document.getElementById('root')
);
//this provider will add adragging context to our app.it will allow us to use useDRag and useDRop
//hooks inside our cpts.



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

