// hooks/useWalletForm.ts
import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
const backendURL = process.env.REACT_APP_BACKEND_URL;
import { Labels } from '../constants';

// Typescript interface extends record of string keys and string values
interface FormState extends Record<string, string> {}

const useWalletForm = (initialState: FormState) => {
  const [formState, setFormState] = useState(initialState);
  const [walletExists, setWalletExists] = useState(false);
  const [formErrors, setFormErrors] = useState<FormState>({});

  const setFormValue = (field: string, value: string) => {
    setFormState((prevState: FormState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const validateForm = () => {
    let errors: FormState = {};

    // Validate wallet field
    if (!/^0x[a-fA-F0-9]{40}$/.test(formState.wallet)) {
      errors.wallet = "42 character string '0x...'";
    }

    // Validate twitter field
    if (!/^@.*/.test(formState.twitter)) {
      errors.twitter = "'@' followed by a string";
    }

    // Validate label field NOTE ENUM VALUE MUST BE STRING
    if (!Object.values(Labels).includes(formState.label as Labels)) {
      errors.label = `Label must be one of the following: ${Object.values(Labels).join(', ')}.`;
    }

    // Validate notes field
    if (formState.notes.length > 255) {
      errors.notes = 'Notes must be 255 characters or less.';
    }

    setFormErrors(errors);

    // The form is valid if the errors object is empty
    return Object.keys(errors).length === 0;
  };

  const checkWalletExists = async () => {
    try {
      const response = await axios.post(`${backendURL}/checkWallet`, { wallet: formState.wallet });

      if (response.data.exists) {
        setWalletExists(true);
      } else {
        setWalletExists(false);
      }
    } catch (err) {
      console.log("Error checking wallet", err);
    }
  };

  useEffect(() => {
    if (formState.wallet) {
      checkWalletExists();
    }
  }, [formState.wallet]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendURL}/addWallet`, formState);

      if (response.data.success) {
        console.log('Wallet added');
        setFormState(initialState);
      } else {
        console.log('Error adding wallet');
      }
    } catch (error) {
      console.log('Error adding wallet', error);
    }
  };

  return {
    formState,
    setFormValue,
    handleSubmit,
    walletExists,
    formErrors
  };

};

export default useWalletForm;
