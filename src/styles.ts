import styled from 'styled-components'

interface AddItemButtonProps{
    dark?:boolean
}
//we'll use AddNewItemButton cpt for both lists and tasks.wen we'll use it for lists it will be
//rendered on adark background, so we'll need white color for text.wen we use it for tasks.
//we'll rendere it inside the Column cpt.which already has alight grey bg, so we want the text to
//have black color


//if u try to drag the column around, u will see that the original dragged column is still visible
//we'll need to reuse this logic so we'll move it out to DragPreviewContainer.

interface DragPreviewContainerProps{
    isHidden?: boolean
}

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
    transform:${props => (props.isPreview ? "rotate(5deg)":undefined)};
    opacity:${props => (props.isHidden ? 0:1)};
`

export const CustomDragLayerContainer = styled.div`
    height:100%;
    left:0;
    pointer-events:none;
    position:fixed;
    top:0;
    width:100%;
    z-index:100;
`
// We want this container to be rendered on top of any other element on the page, so
// we provide z-index: 100 . Also, we specify pointer-events: none so it will ignore
// all mouse events.



export const AddItemButton = styled.button<AddItemButtonProps>`
    background-color: #ffffff3d;
    border-radius: 3px;
    border: none;
    color: ${props => (props.dark ? "#000" : "#fff")};
    cursor:pointer;
    max-width: 300px;
    padding: 10px 12px;
    text-align: left;
    transition: background 85ms ease-in;
    width: 100%;
    &:hover{
        background-color: #ffffff52;

    }
`;

export const NewItemFormContainer =styled.div`
    max-width: 300px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
`;

export const NewItemButton = styled.button`
    background-color: #5aac44;
    border-radius: 3px;
    border: none;
    box-shadow: none;
    color: #fff;
    padding: 6px 12px;
    text-align: center;
`;

export const NewItemInput = styled.input`
    border-radius: 3px;
    border: none;
    box-shadow: #091e4240 0px 1px 0px 0px;
    margin-bottom: 0px.5rem;
    padding: 0.5rem 1rem;
    width: 100%;
`;

export const AppContainer = styled.div`
    align-items: flex-start;
    background-color: #3179ba;
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 20px;
    width: 100%;
`

// For now, we won’t hide the column completely we’ll just make it semitransparent.
// Set the opacity in the hidden state to 0.3 .
// Now update the ColumnContainer . It has to extend DragPreviewContainer compo-
// nent:
export const ColumnContainer = styled(DragPreviewContainer)`
    background-color: #ebecf0;
    width:300px;
    min-height:40px;
    margin-right: 20px;
    border-radius: 3px;
    padding: 8px 8px;
    flex-grow:0;
`

export const ColumnTitle = styled.div`
    padding:6px 16px 12px;
    font-weight: bold;
`

export const CardContainer = styled.div`
    background-color: #fff;
    cursor:pointer;
    margin-bottom: 0%.5rem;
    padding: 0.5rem 1rem;
    max-width: 300px;
    border-radius: 3px;
    box-shadow:#091e4240 0px 1px 0px 0px;
`