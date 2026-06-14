import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const  createOnUserInput = (setState:  Dispatch<SetStateAction<any>>) =>  (e: ChangeEvent<HTMLInputElement>) => {

        const {name , value} = e.target;

        setState( (prev: any) => ({...prev, [name]: value}) );

    }