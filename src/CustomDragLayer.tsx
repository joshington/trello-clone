import {XYCoord,useDragLayer} from "react-dnd"
import { CustomDragLayerContainer } from './styles';
import { Column } from './Column';
// import { XYCoord,useDragLayer } from "react-dnd";

//we will write a function that will get the dragged item coordinates from react-dnd and
//generate the styles with the transform attribute to move the preview around.

//===function to generate new styles
function getItemStyles(currentOffset:XYCoord | null):React.CSSProperties {
    if(!currentOffset){
        return {
            display: "none"
        }
    }
    const {x,y} = currentOffset
    const transform = `translate(${x}px, ${y}px)`
    return{
        transform,
        WebkitTransform:transform
    }
}
//we can manually set the return value of this function to be React.CSSProperties.its not rqd
//but can be useful,because then if u will make amistake-youwill get an error inside the function
//instead of the place where u pass the resulting style as aprop to your cpt.

//==this function accepts acurrentOffset argument that has the XYCoord type.it contains
//acurrently dragged item position.we take x and y fields from the currentOffset and generate


// Here we also get the currentOffset value from the useDragLayer hook. Pass this
// value to our getItemStyles function.
// After we create our CustomDragLayer component we need to do two things. First, we
// need to mount the component inside the App layout, and then we’ll need to hide the
// default drag preview

const CustomDragLayer:React.FC = () => {
    const {isDragging, item, currentOffset} = useDragLayer(monitor => ({
        item:monitor.getItem(),
        currentOffset:monitor.getSourceClientOffset(), 
        isDragging:monitor.isDragging()
    }))
    return isDragging ? (
        <CustomDragLayerContainer>
            <div style={getItemStyles(currentOffset)}>
                <Column 
                    id={item.id}
                    text={item.text}
                    index={item.index}
                />
            </div>
        </CustomDragLayerContainer>
    ) : null
}
//we use useDragLayer to obtain isDragging flag and currently 

export default CustomDragLayer;