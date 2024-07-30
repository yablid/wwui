// src/lib/context/WalletFormApi.tsx
import React, { createContext, useReducer, useContext, useMemo } from 'react';
import axios from 'axios';
import axiosInstance from '@lib/api/axiosInstance.ts';

import { ADDRESS_REGEX } from '../components/WalletForm/Address.tsx';
import { TWITTER_REGEX } from '../components/WalletForm/Twitter.tsx';
import { NICKNAME_REGEX } from '../components/WalletForm/Nickname.tsx';
import { NOTES_REGEX } from '../components/WalletForm/WalletNotes.tsx';

type State = {
    address: string;
    twitter: string;
    label: string;
    nickname: string;
    notes: string;
    errorMessage: string | null;
}

type API = {
    onAddressChange: (address: string) => void;
    onTwitterChange: (twitter: string) => void;
    onLabelChange: (label: string) => void;
    onNicknameChange: (nickname: string) => void;
    onNotesChange: (notes: string) => void;
    onSave: () => Promise<boolean>;
}

const WalletFormDataContext = createContext<State>({} as State);
const WalletFormAPIContext = createContext<API>({} as API);

type Actions =
    | { type: "updateAddress"; address: string }
    | { type: "updateTwitter"; twitter: string }
    | { type: "updateLabel"; label: string }
    | { type: "updateNickname"; nickname: string }
    | { type: "updateNotes"; notes: string }
    | { type: "setErrorMessage"; errorMessage: string }
    | { type: "clearErrorMessage" };

const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case "updateAddress":
            return { ...state, address: action.address };
        case "updateTwitter":
            return { ...state, twitter: action.twitter };
        case "updateLabel":
            return { ...state, label: action.label };
        case "updateNickname":
            return { ...state, nickname: action.nickname };
        case "updateNotes":
            return { ...state, notes: action.notes };
        case "setErrorMessage":
            return { ...state, errorMessage: action.errorMessage };
        case "clearErrorMessage":
            return { ...state, errorMessage: null };
        default:
            return state;
    }
}

const WalletFormDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, {
        address: "",
        twitter: "",
        label: "",
        nickname: "",
        notes: "",
        errorMessage: null,
    } as State);

    const onSave = async () => {
        console.log("onSave state: ", state);

        const isValidAddress = ADDRESS_REGEX.test(state.address);
        const isValidTwitter = TWITTER_REGEX.test(state.twitter);
        const isValidNickname = NICKNAME_REGEX.test(state.nickname);
        const isValidNotes = NOTES_REGEX.test(state.notes);

        if (!isValidAddress || !isValidTwitter || !isValidNickname || !isValidNotes) {
            dispatch({
                type: "setErrorMessage",
                errorMessage: "Invalid address, twitter, nickname, or notes"
            });
            return false;
        }

        try {
            const response = await axiosInstance.post(`/api/addWallet`, {
                address: state.address,
                twitter: state.twitter,
                label: state.label,
                nickname: state.nickname,
                notes: state.notes,
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log("addWallet response", response.data);
            // handle response
            dispatch({ type: "clearErrorMessage" });
            return true;
        } catch (error) {
            let errorMessage = "An unknown error occurred"; // Default error message

            if (axios.isAxiosError(error)) {
                // If it's an Axios error and we have a message from the server, use that
                errorMessage = error.response?.data?.message || error.message;
            }

            console.log("Caught error saving wallet: ", error);

            dispatch({
                type: "setErrorMessage",
                errorMessage: errorMessage
            });

            return false;
        }
    };

    const onAddressChange = (address: string) => {
        dispatch({ type: "updateAddress", address });
        dispatch({ type: "clearErrorMessage" });
    };

    const onTwitterChange = (twitter: string) => {
        dispatch({ type: "updateTwitter", twitter });
        dispatch({ type: "clearErrorMessage" });
    };

    const onLabelChange = (label: string) => {
        dispatch({ type: "updateLabel", label });
        dispatch({ type: "clearErrorMessage" });
    };

    const onNicknameChange = (nickname: string) => {
        dispatch({ type: "updateNickname", nickname });
        dispatch({ type: "clearErrorMessage" });
    };

    const onNotesChange = (notes: string) => {
        dispatch({ type: "updateNotes", notes });
        dispatch({ type: "clearErrorMessage" });
    }

    const api = useMemo(() => ({
        onSave,
        onAddressChange,
        onTwitterChange,
        onLabelChange,
        onNicknameChange,
        onNotesChange
    }), [state]);

    return (
        <WalletFormAPIContext.Provider value={api}>
            <WalletFormDataContext.Provider value={state}>
                {children}
            </WalletFormDataContext.Provider>
        </WalletFormAPIContext.Provider>
    );
};

const useWalletFormData = () => useContext(WalletFormDataContext);
const useWalletFormAPI = () => useContext(WalletFormAPIContext);

export { WalletFormDataProvider, useWalletFormData, useWalletFormAPI };