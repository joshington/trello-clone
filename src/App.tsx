import React from 'react';
import { useAppState } from './AppStateContext';
import { Card } from './Card';
import { Column } from './Column';
import { AppContainer } from './styles';
import { AddNewItem } from './AddNewItem';

import CustomDragLayer  from './CustomDragLayer';

const App = () => {
  const {state,dispatch} = useAppState();
  return (
    <AppContainer>
      {state.lists.map((list, i) => (
        <Column id={list.id} text={list.text} key={list.id} index={i} />
      ))}
      {/* <AddNewItem 
        toggleButtonText="+ Add another list"
        onAdd={console.log}
      /> */}
      {/* <Column text="To Do">
        <Card text="Generate app scaffold" />
      </Column>
      <Column text="In Progress">
        <Card text="Learn Typescript" />
      </Column>
      <Column text="Done">
        <Card text="Begin to use typing" />
      </Column> */}
      <AddNewItem 
        toggleButtonText="+ Add another list" 
        onAdd={text => dispatch({type:"ADD_LIST",payload:text})} 
      />
    </AppContainer>
  )
}

export default App;
