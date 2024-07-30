// src/lib/context/RegisterFormApi.tsx
import React, { useReducer, createContext, useContext } from "react";

import { useAuth } from "@lib/context/AuthContext.tsx";
import { UserData } from "@appTypes/types"
import { debounce } from "@lib/api/axiosInstance.ts"

import { USERNAME_REGEX } from "@lib/components/RegisterForm/Username.tsx";
import { PASSWORD_REGEX } from "@lib/components/RegisterForm/Password.tsx";
import axios from "axios";

type State = {
    username: string;
    password: string;
    matchword: string;
    errorMessage: string | null;
}

type API = {
    onUsernameChange: (username: string) => void;
    onPasswordChange: (password: string) => void;
    onMatchwordChange: (matchword: string) => void;
    onSubmit: ()=> Promise<boolean>;
}

const RegisterFormDataContext = createContext<State>({} as State);
const RegisterFormAPIContext = createContext<API>({} as API);

type Actions =
    | { type: "updateUsername"; username: string }
    | { type: "updatePassword"; password: string }
    | { type: "updateMatchword"; matchword: string }
    | { type: "setErrorMessage"; errorMessage: string }
    | { type: "clearErrorMessage"};

const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case "updateUsername":
            return { ...state, username: action.username };
        case "updatePassword":
            return { ...state, password: action.password };
        case "updateMatchword":
            return { ...state, matchword: action.matchword };
        case "setErrorMessage":
            return { ...state, errorMessage: action.errorMessage };
        case "clearErrorMessage":
            return { ...state, errorMessage: null };
        default:
            return state;
    }
}

const RegisterFormDataProvider = ({ children }: { children: React.ReactNode }) => {

    const [ state, dispatch ] = useReducer(reducer, {
        username: "",
        password: "",
        matchword: "",
        errorMessage: null,
    } as State);

    const { setUserData } = useAuth();

    const onSubmit = async () => {

        console.log("Submitting register form...")

        const isValidUsername = USERNAME_REGEX.test(state.username);
        const isValidPassword = PASSWORD_REGEX.test(state.password);

        if (!isValidUsername || !isValidPassword) {
            dispatch({
                type: "setErrorMessage",
                errorMessage: "Invalid username or password" });
            return false;
        }

        try {
            console.log("Sending register request...")
            const response = await debounce.post(`/api/register`,
                {
                    username: state.username,
                    password: state.password,
                },
                {
                    withCredentials: true
                }
            );

            const userData: UserData = { ... response.data };
            setUserData(userData);
            localStorage.setItem('accessToken', userData.accessToken);

            console.log("Set userData to: ", userData);
            console.log("localStorage.getItem('accessToken'): ", localStorage.getItem('accessToken'));

            dispatch({ type: "clearErrorMessage" });
            return true;

        } catch (error) {

            let errorMessage = "An unknown error occurred"; // Default error message

            if (axios.isAxiosError(error)) {
                // If it's an Axios error and we have a message from the server, use that
                errorMessage = error.response?.data?.message || error.message;
            }

            console.log("Caught error registering: ", error);

            dispatch({
                type: "setErrorMessage",
                errorMessage: errorMessage
            });

            return false;
        }

    };

    const onUsernameChange = (username: string) => {
        dispatch({ type: "updateUsername", username });
        dispatch({ type: "clearErrorMessage"})
    };
    const onPasswordChange = (password: string) => {
        dispatch({ type: "updatePassword", password });
        dispatch({ type: "clearErrorMessage"})
    }
    const onMatchwordChange = (matchword: string) => {
        dispatch({ type: "updateMatchword", matchword });
        dispatch({ type: "clearErrorMessage"})
    }

    const api = { onSubmit, onUsernameChange, onPasswordChange, onMatchwordChange };


    return (
        <RegisterFormAPIContext.Provider value={api}>
            <RegisterFormDataContext.Provider value={state}>
                {children}
            </RegisterFormDataContext.Provider>
        </RegisterFormAPIContext.Provider>
    );
};

const useRegisterFormData = () => useContext(RegisterFormDataContext);
const useRegisterFormAPI = () => useContext(RegisterFormAPIContext);

export { RegisterFormDataProvider, useRegisterFormData, useRegisterFormAPI }