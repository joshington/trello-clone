// To focus on the input we’ll use React feature called refs.
// Refs provide a way to access the actual DOM nodes of rendered React elements.

import { useRef,useEffect } from "react";


//automatic focus of input.
export const useFocus = () => {
    const ref = useRef<HTMLInputElement>(null)


// Here we use the useRef hook to get access to the rendered input element. Typescript
// can’t automatically know what will be the element type. So we provide the actual
// type to it. In our case, we work with input so it’s HTMLInputElement .

//incase want to know what is the name of some elemt type usually check @types/react/global.d.ts
//contains type defns for types that have to be exposed globally.
    useEffect(() => {
        ref.current?.focus()
    })
    return ref
}