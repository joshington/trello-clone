import React from "react";
import { ColumnContainer, ColumnTitle } from "./styles";

interface ColumnProps {
    text:string  //add ? to make the prop optional
    index:number
}

export const Column = ({text}: ColumnProps) => {
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
        </ColumnContainer>
    )
}
//have defined an interface called ColumnProps.
//inside of ColumnProps interface,we define afield text of type string.
//by default this field will be reqd,so u will get atype error if u dont provide
//this prop to your cpt.