import React from "react";
import { AddNewItem } from "./AddNewItem";
import { ColumnContainer,ColumnTitle } from "./styles";
import { useAppState } from './AppStateContext';
import { Card } from './Card';
import { useRef } from 'react';
import { useItemDrag } from './useItemDrag';
import {useDrop} from "react-dnd"
import { DragItem } from "./DragItem";
import { isHidden } from './utils/isHidden';
import { ReturnDocument } from "mongodb";


//we call useAppState to get the data. Then we get the column by
// index . This is why we are passing it as a prop to the Column component. Then we
// iterate over the cards and render the Card components.

//==React.PropsWIthChildren type defn.
// type React.PropsWithChildren<P>  = P &{
//     children?:React.ReactNode;
// } 
//when we used React.PropsWIthChildren we've passed our ColumnProps interface
//to it.then it was combined with another type using an ampersand.
//===type intersection==

interface ColumnProps{
    text:string
    index:number
    id:number
    isPreview?:boolean
}



export const Column = ({text,index,id,isPreview}:ColumnProps) => {
    const [,drop] = useDrop({
        accept:["COLUMN","CARD"],
        hover(item:DragItem){
            if(item.type === "COLUMN"){
                //dragging column
            }else{
                const dragIndex = item.index
                const hoverIndex = 0
                const sourceColumn = item.columnId
                const targetColumn = id
                if(sourceColumn === targetColumn){
                    return
                }
                dispatch({
                    type:"MOVE_TASK",
                    payload:{dragIndex,hoverIndex,sourceColumn,targetColumn}
                })
                item.index = hoverIndex
                item.columnId = targetColumn
            }
            {/*
                   const dragIndex = item.index
                const hoverIndex = index
                if(dragIndex === hoverIndex){
                    return
                }
                dispatch({type:"MOVE_LIST",payload:{dragIndex,hoverIndex}})
                item.index = hoverIndex
            
            */} 
         
        }
        //above we pass the accepted item type and then define the hover callback.the hover callback is
        //triggered whenever u move the dragged item above the drop target.
        //inside our hover callback we check that dragIndex and hoverIndex are not the same.
        //which means we arent hovering above the dragged item.
        //if the dragIndex and hoverIndex are different-we dispatch a MOVE_LIST action
    })
    const {state,dispatch} = useAppState()


    //lets implement the dragging for the Column cpt
    const ref = useRef<HTMLDivElement>(null)
    const {drag} = useItemDrag({type:"COLUMN",id,index,text})
    drag(ref)
    // we need aref to specify as adrag target.here we know that it will be adiv element.
    //we manually provide the HTMLDivElement type to useRefcall.you can see that we provided
    //it as aref prop to ColumnContainer.
    //then we call our useItemDrag hook.we pass an object that will represent the draggged item.
    //we tell that its aCOLUMN and we pass the id,index and text.this hook returns the drag function
    //next we pass our ref to the drag function
    return(
        <ColumnContainer 
            isPreview={isPreview}
            ref={ref} 
            isHidden={isHidden(isPreview,state.draggedItem,"COLUMN",id)}>
            <ColumnTitle>{text}</ColumnTitle>
            {state.lists[index].tasks.map((task, i) => (
                <Card text={task.text} key={task.id} index={i} />
            ))}
            {/* {index} */}
            <AddNewItem 
                toggleButtonText="+ Add another card"
                onAdd={text => 
                    dispatch({type:"ADD_TASK", payload:{text,columnId:id}})
                }
                dark
            />
        </ColumnContainer>
    )
}
//in TS, u need to provide atype or an interface to define the form of your
//props object.
//we make use of React.PropsWIthChildren type that can enhance your props interface
//and add a defn for children there.
//or we could manually add children?:React.ReactNode to our ColumnProps