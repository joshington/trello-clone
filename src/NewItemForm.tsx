import React, {useState} from "react";;
import { NewItemFormContainer, NewItemButton,NewItemInput } from './styles';
import { useFocus } from './utils/useFocus';


interface NewItemFormProps{
    onAdd(text:string): void //onAdd is acallback passed thru AddNewItemProps.
}

export const NewItemForm = ({onAdd}:NewItemFormProps) => {
    const [text, setText] = useState("");
    const inputRef = useFocus()
    return (
        <NewItemFormContainer>
            <NewItemInput 
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <NewItemButton onClick={() => onAdd(text)}>
                Create
            </NewItemButton>
        </NewItemFormContainer>
    )
}

//cpt uses acontrolled input we'll store the value for it in the text state.
//whenever u type in the text inside this input-we update the text state.
//here,we didnt have to provide any type for the event argument of our onChange calllback.

//==here we didnt have to provide any type for the event argument of our onChange callback.
//Typescript gets the type from react type defns.