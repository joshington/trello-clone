// The dragging logic will be similar for both cards and columns. I suggest we move it
// to a custom hook.
// This hook will return a drag method that accepts the ref of a draggable element.
// Whenever we start dragging the item - the hook will dispatch a SET_DRAG_ITEM action
// to save the item in the app state. When we stop dragging it will dispatch this action
// again with undefined as payload.

import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useAppState } from "./AppStateContext";
import { DragItem } from "./DragItem";

export const useItemDrag = (item: DragItem) => {
    const {dispatch} = useAppState()
    const [, drag] = useDrag({
        item,
        begin: () => 
            dispatch({
                type:"SET_DRAGGED_ITEM",
                payload:item
            }),
        end: () => dispatch({type:"SET_DRAGGED_ITEM",payload:undefined})
    })
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState:true});
    }, [preview]);
    // To hide the default drag preview we’ll have to modify the useItemDrag hook.
    // Open src/useItemDrag.ts . We’ll use getEmptyImage function to create the preview
    return {drag}
}
//internally this hook uses useDrag from react-dnd.we pass an options object to it
// item - contains the data about the dragged item
//begin - is called wen we start dragging an item
//end - is called wen we release the item
// As you can see inside this hook we dispatch the new SET_DRAGGED_ITEM action. When
// we start dragging - we store the item in our app state, and when we stop - we reset
// it to undefined .