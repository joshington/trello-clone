import React from "react";
import { CardContainer } from "./styles";
import { CardDragItem } from './DragItem';

interface CardProps{
    text:string
}

export const Card = ({text}: CardProps) => {
    const [,drop] = useDrop({
        accept:"CARD",
        hover(item:CardDragItem){
            if(item.id === id){
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            const sourceColumn = columnId
            const targetColumn = columnId
            dispatch({
                type:"MOVE_TASK",
                payload:{dragIndex,hoverIndex,sourceColumn,targetColumn}
            })
            item.index = hoverIndex
            item.columnId = targetColumn
            //we set the dragged item's index and columnId to match the fields of the hovered
            //card.
            drag(drop(ref))
        }
    })
    return <CardContainer>{text}</CardContainer>
}