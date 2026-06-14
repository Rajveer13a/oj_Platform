import { ChangeEvent } from "react";

export const  createOnUserInput = (setState) =>  (e: ChangeEvent<HTMLInputElement>) => {

        const {name , value} = e.target;

        setState( (prev) => ({...prev, [name]: value}) );

    }