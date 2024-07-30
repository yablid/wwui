// src/lib/context/LoginFormApi.tsx
import React, {
    useReducer,
    createContext,
    useContext,
} from "react";

import axios from "axios";
import debounce from "@lib/api/axiosInstance";

import { UserData } from "@appTypes/types";
import { useAuth } from "@lib/context/AuthContext";

type State = {
    username: string;
    password: string;
    errorMessage: string | null;
}

type API = {
    onUsernameChange: (username: string) => void;
    onPasswordChange: (password: string) => void;
    onSubmit: ()=> Promise<boolean>;
}

const LoginFormDataContext = createContext<State>({} as State);
const LoginFormAPIContext = createContext<API>({} as API);

type Actions =
    | { type: "updateUsername"; username: string }
    | { type: "updatePassword"; password: string }
    | { type: "setErrorMessage"; errorMessage: string }
    | { type: "clearErrorMessage"};

const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case "updateUsername":
            return { ...state, username: action.username };
        case "updatePassword":
            return { ...state, password: action.password };
        case "setErrorMessage":
            return { ...state, errorMessage: action.errorMessage };
        case "clearErrorMessage":
            return { ...state, errorMessage: null };
        default:
            return state;
    }
}

const LoginFormDataProvider = ({ children }: { children: React.ReactNode }) => {

    const [ state, dispatch ] = useReducer(reducer, {
        username: "",
        password: "",
        errorMessage: null,
    } as State);

    const { setUserData } = useAuth();

    const onSubmit = async () => {

        console.log("onSubmit fired with state:", state)

        if ( !state.username || ! state.password ) {
            dispatch({
                type: "setErrorMessage",
                errorMessage: "Username and Password required" });
            return false;
        }

        try {
            console.log("Sending request to login...")
            const response = await debounce.post(`/api/login`,
                {
                    username: state.username,
                    password: state.password
                },
                {
                    // withCredentials: true
                }
            );
            console.log("Posted login...")
            // updateAuthContext
            const userData: UserData = { ...response.data };
            console.log("userData from api login: ", userData)

            setUserData(userData)

            localStorage.setItem('accessToken', userData.accessToken);

            console.log("localStorage.getItem('accessToken'):", localStorage.getItem('accessToken'));

            dispatch({ type: "clearErrorMessage" });

            return true;
        } catch (error) {

            let errorMessage = "An unknown error occurred"; // Default error message

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }

            console.log("Unknown error: ", error)
            console.log("Unknown error type: ", typeof error)

            dispatch({ type: "setErrorMessage",  errorMessage: errorMessage});
            return false;
        }
    };

    const onUsernameChange = (username: string) => {
        dispatch({ type: "updateUsername", username });
    };
    const onPasswordChange = (password: string) => {
        dispatch({ type: "updatePassword", password });
    }

    const api =  { onSubmit, onUsernameChange, onPasswordChange };


    return (
        <LoginFormAPIContext.Provider value={api}>
            <LoginFormDataContext.Provider value={state}>
                {children}
            </LoginFormDataContext.Provider>
        </LoginFormAPIContext.Provider>
    );
};

const useLoginFormData = () => useContext(LoginFormDataContext);
const useLoginFormAPI = () => useContext(LoginFormAPIContext);

export { LoginFormDataProvider, useLoginFormData, useLoginFormAPI }