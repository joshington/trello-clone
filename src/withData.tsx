import { loadavg } from "node:os";
import React, {PropsWithChildren,ComponentType } from "react"
import { AppState } from './AppStateContext';

/*
    HOC is areact patern where u create afactory function that accepts awrapped
    cpt as an argument,wraps it into another cpt that implements the desired
    behavior and then returns this construction.
*/
export const withData = (
    WrappedComponent: ComponentType<PropsWithChildren<{initialState:AppState}>>
//above means that we want to have aReact cpt that acepts children and also additional
//initialState props of type AppState.
) => {
    return ({children}: PropsWithChildren<{}>) => {
        // const initialState:AppState={lists: [], draggedItem:undefined}
        const [isLoading,setIsLoading]  = useState(true)
        const [error, setError] = useState<Error | undefined>()
        const [initialState, setInitialState] = useState<AppState>({
            lists: [],
            draggedItem:undefined,
        })
        //we'll need to update the above states when the status of our request changes
        React.useEffect(() => {
            const fetchInitialState = async () => {
                try{
                    const data = await load()
                    setInitialState(data)
                }catch(e){
                    setError(e)
                }
                setIsLoading(false)
            }
            fetchInitialState()
        }, [])
        if(isLoading){
            return <div>Loading</div>
        }
        if(error){
            return <div>{error.message}</div>
        }
        //here we show the loader if isLoading state is true.we show an error message
//if something went wrong.we return the wrapped cpt if the data was loaded successfully.
        return(
            <WrappedComponent initialState={initialState}>
                {children}
            </WrappedComponent>
        )
    }
}