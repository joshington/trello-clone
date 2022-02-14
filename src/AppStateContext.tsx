import React, {createContext,useReducer,useContext} from "react";
import {v4 as uuidv4} from 'uuid';
import { findItemById } from "./utils/findItemIndexById";
import { withData } from './withData';


//provide the type for our context
interface AppStateContextProps {
    state:AppState
}

//react needs us to provide the default value for our context,this value will only be used if
//we dont wrap our application into our AppStateProvider.so we can omit it.to do it pass
//an empty object that we'll cast to AppStateContextProps to createContext function.
//thus we use an operator to make TS think that our empty object actually has 
//AppStateContextProps type
const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

//now define AppStateProvider.it will pass the hardcoded appData thru the AppStateContext.Provider

//==using Data from Global context implement custom hook.
export const useAppState = () => {
    return useContext(AppStateContext)
//inside of func above we retrieve the value from AppStateContext using useContext
    //hook and return the result.
}

interface Task {
    id:string
    text:string
}

interface List{
    id:string 
    text:string 
    tasks:Task[]
}

export interface AppState{
    lists:List[]
}

//adding our actions====
type Action = 
    |   {
            type:"ADD_LIST"
            payload:string
        }
    |   {
            type:"ADD_TASK"
            payload:{
                text:string; 
                taskId:string
            }
        }
    |   {
            type: "MOVE_LIST"
            payload: {
                dragIndex: number
                hoverIndex: number
            }
        }
    |   {
            type:"MOVE_LIST"
            payload:{
                dragIndex:number
                hoverIndex:number
            }
        }
        //we have added a MOVE_LIST action.this action has dragIndex and hoverIndex in its 
        //payload.wen we start dragging the colun, we remember the original position of it and
        //then pass it as adragIndex,wen we hover other columns we take their positions and use them
        //as ahoverIndex.
    |   {
            type:"MOVE_TASK"
            payload:{
                dragIndex:number
                hoverIndex:number
                sourceColumn:string
                targetColumn:string
            }
        }
    |   {
            type:"SETDRAGGED_ITEM"
            payload: DragItem | undefined
            //It will hold the DragItem that we defined earlier. We need to be able to set it to
            //undefined if we are not dragging anything.
        }

//now the reducer
//reducer needs to return anewinstance of an object.so we;ll use aspread operator to get all the
//fields from the previous state.then we'll set lists field to be anew array with the old lists
//plus new item.
const appStateReducer = (state:AppState,action:Action): AppState => {
    switch(action.type){
        case "ADD_LIST":{
            return {
                ...state,
                lists:[
                    ...state.lists,
                    {
                        id:uuidv4(),
                        text:action.payload,
                        tasks:[]
                    }
                ]
            }
        }
        //new column hs text, id and tasks fields.the text field contains the list's title,we get 
        //its value from action.payload,lists will be an empty array and id for each list has to be
        //unique.we will use uuid to generate new identifiers.
        
        case "ADD_TASK":{
            //reducer logic
            const targetLaneIndex = findItemById(
                state.lists,
                action.payload.taskId
            )
            state.lists[targetLaneIndex].tasks.push({
                id:uuidv4(),
                text:action.payload.text
            })
            return {
                ...state
            }
            //first find the target list index and save it to targetLaneIndex constant.
            //then push anew task object to the list with that index.
            //and then return anew object,created from the old state using spread operator.
        }
//Here we first find the target list index and save it to targetListIndex constant.
// Then we push a new task object to the list with that index.
// And then we return a new object, created from the old state using object spread
// syntax.

        case "MOVE_LIST":{
            const {dragIndex,hoverIndex} =action.payload
            state.lists = moveItem(state.lists, dragIndex,hoverIndex)
            return {...state}
        }
        case "MOVE_TASK":{
            const {dragIndex,hoverIndex,sourceColumn,targetColumn}=action.payload
            const sourceLaneIndex = findItemById(state.lists,sourceColumn)
            const targetLaneIndex = findItemById(state.lists, targetColumn)
            const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex,1)[0]
            state.lists[targetLaneIndex].tasks.splice(hoverIndex,0,item)
            return {...state}
        }
//         Our sourceColumn and targetColumn are column ids so first, we find their corre-
// sponding indices in columns array. Then we use splice to remove the card from the
// source column and then another splice to add it to the target column.

        case "SET_DRAGGED_ITEM":{
            return {...state, draggedItem:action.payload}
            //we set the draggedItem field of our state to whatever we get from action.payload
        }
        default:{
            return state
        }
    }
}




export const appData: AppState = {
    lists: [
        {
            id:"0",
            text:"To Do",
            tasks: [{id:"c0", text:"Generate app scaffold"}] 
        },
        {
            id:"1",
            text:"In Progress",
            tasks: [{id:"c2", text:"Learn Typescript"}] 
        },
        {
            id:"2",
            text:"Done",
            tasks: [{id:"c3", text:"Begin to use static typing"}] 
        },
     
    ]
}

// Now let’s define the AppStateProvider . It will pass the hardcoded appData through
// the AppStateContext.Provider :

export const AppStateProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData)
    return (
        <AppStateContext.Provider value={{state,dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
}
//our component will only accept children as prop.we use React.propsWithChidren type,
//it requires one generic argument, but we dont want to have any other props sow we pass an empty
//object to it.