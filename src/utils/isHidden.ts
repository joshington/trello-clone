//add a helper mthd to calculate if we need to hide the column.

import {DragItem} from "../DragItem"

export const isHidden = (
    isPreview:boolean | undefined,
    draggedItem:DragItem | undefined,
    itemType:string,
    id:string
):boolean => {
    return Boolean(
        !isPreview &&
            draggedItem && 
            draggedItem.type === itemType && 
            draggedItem.id === id
    )
    //function compares the type and id of the currently draggged item with the type and id
    //we pass to its args.
}

//our custom preview is hidden because it uses the same id and index as the currently
//dragged column.we need to add isPreview condition to our isHidden function