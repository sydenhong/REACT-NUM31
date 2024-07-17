import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";

var userData = null;
if(localStorage.getItem("user") !== 'null') {
    userData = JSON.parse(localStorage.getItem("user"));
    console.log("userData localStorage:", userData);
}

const INITIAL_STATE = {
    user: userData,
    isFetching: false,
    error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <Context.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}>
            {children}
        </Context.Provider>
    )
}