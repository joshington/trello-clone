//wen we begin to drag some item we have to provide information about it  to react-dnd.we'll pass
//an object that will describe the item we are currently dragging.
//object will have the type field that for now will be COLUMN.we'll also pass the column's id,text 
//and index that we'll get from Column component.


//drag cards
export type CardDragItem = {
    index:number
    id:string
    columnId:string
    text:string
    type:"CARD"
}



export  type ColumnDragItem = {
    index:number
    id:string
    text:string
    type:"COLUMN"
}

export type DragItem = ColumnDragItem | CardDragItem
