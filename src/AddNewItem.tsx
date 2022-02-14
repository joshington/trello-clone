import React, {useState} from "react";
import { NewItemForm } from "./NewItemForm";
import { AddItemButton } from './styles';

// This component will accept an item type and some text props for it’s buttons. Define
// an interface for it’s props:

interface AddNewItemProps {
    onAdd(text:string):void
    toggleButtonText:string;
    dark?:boolean
}

// onAdd is a callback function that will be called when we click the Create item
// button.
// • toggleButtonText is the text we’ll render when this component is a button.
// • dark is a flag that we’ll pass to the styled component.

export const AddNewItem = (props:AddNewItemProps) => {
    const [showForm, setShowForm ] = useState(false);
    const {onAdd, toggleButtonText,dark} = props;

    if(showForm){
        //we show item creation form here
        return (
            <NewItemForm 
                onAdd={text => {
                    onAdd(text)
                    setShowForm(false)
                }}
            />
        )
    }
    return (
        <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
            {toggleButtonText}
        </AddItemButton>
    )
    //it holds ashowForm boolean state.when this state is true,we show an input with the
    //Create button.wen its false- we render the button with toggleButtonText on it.

    //now define the form that we'll show inside the condition block.

}