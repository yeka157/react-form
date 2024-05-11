import React, { useState } from "react";
import FormInput from "../components/formInput";
import { Button } from "@chakra-ui/react";
import FormRadioInput from "../components/formRadioInput";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function Add() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [addressValid, setAddressValid] = useState(false);
  const [birthdayValid, setBirthdayValid] = useState(false);

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [phoneErrorMsg, setPhoneErrorMsg] = useState("");
  const [addressErrorMsg, setAddressErrorMsg] = useState("");
  const [birthdayErrorMsg, setBirthdayErrorMsg] = useState("");
  const [genderErrorMsg, setGenderErrorMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeName = (e) => {
    let fullName = e.target.value;
    setName((prev) => prev = fullName);
    if (!fullName) {
        setNameErrorMsg('Full name is required!');
        setNameValid(true);
    } else if (!/^[a-zA-Z ]+$/.test(fullName)) {
        setNameErrorMsg('Full name should contain only letters and spaces!');
        setNameValid(true);
    } else {
        setNameErrorMsg('');
        setNameValid(false);
    }
  };

  const onChangeEmail = (e) => {
    setEmail((prev) => prev = e.target.value);
    if (!e.target.value) {
        setEmailErrorMsg('Email is required!');
        setEmailValid(true);
    } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
        setEmailErrorMsg('Invalid email address');
        setEmailValid(true);
    } else {
        setEmailErrorMsg('');
        setEmailValid(false);
    }
  };

  const onChangePhone = (e) => {
    setPhone((prev) => prev = e.target.value);
    if (!e.target.value) {
        setPhoneErrorMsg('Phone number is required');
        setPhoneValid(true);
    } else if (!/^\d+$/.test(e.target.value)) {
        setPhoneErrorMsg('Phone number should contain only numbers');
        setPhoneValid(true);
    } else {
        setPhoneErrorMsg('');
        setPhoneValid(false);
    }
  };

  const onChangeAddress = (e) => {
    setAddress((prev) => prev = e.target.value);
    if (!e.target.value) {
        setAddressErrorMsg('Address is required');
        setAddressValid(true);
    } else if (e.target.value.length < 5) {
        setAddressErrorMsg('Address should be at least 5 characters long');
        setAddressValid(true);
    } else {
        setAddressErrorMsg('');
        setAddressValid(false);
    }
  };

  const onChangeBirthday = (e) => {
    if (!e.target.value) {
        setBirthdayErrorMsg('Birthdate is required');
        setBirthdayValid(true);
        return;
    }
    setBirthday((prev) => prev = e.target.value);
    let birthdayDate = new Date(e.target.value);
    let currentDate = new Date();

    if (birthdayDate > currentDate) {
        setBirthdayErrorMsg('Invalid Birthdate');
        setBirthdayValid(true);
    } else {
        setBirthdayErrorMsg('');
        setBirthdayValid(false);
    }
  };

  const onChangeGender = (e) => {
    setGender((prev) => prev = e.target.value);
    if (!e.target.value) {
        setGenderErrorMsg('Please select your gender');
    } else {
        setGenderErrorMsg('');
    }
  };

  const navigateHome = () => {
    navigate('/');
  }

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      if (!name || !phone || !email || !address || !birthday || !gender) return setErrorMsg('ERROR - Incomplete form');
      let url = process.env.REACT_APP_API_URL;
      let res = await Axios.post(url + 'customer', {
        name,
        phone_number : phone,
        email,
        address,
        birthdate: birthday,
        gender
      });
      if (res.data.status === 'success') {
        navigate('/')
      } else {
        setErrorMsg(res.data.errorMsg);
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Button colorScheme="purple" onClick={navigateHome}>Back</Button>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Customer Data
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormInput
            label="Full Name"
            isValid={nameValid}
            onChange={onChangeName}
            errorMsg={nameErrorMsg}
            value={name}
          />
          <FormInput
            label="Phone Number"
            isValid={phoneValid}
            onChange={onChangePhone}
            errorMsg={phoneErrorMsg}
            value={phone}
            type="number"
          />
          <FormInput
            label="Email"
            isValid={emailValid}
            onChange={onChangeEmail}
            errorMsg={emailErrorMsg}
            value={email}
          />
          <FormInput
            label="Address"
            isValid={addressValid}
            onChange={onChangeAddress}
            errorMsg={addressErrorMsg}
            value={address}
          />
          <FormInput
            label="Birthdate"
            isValid={birthdayValid}
            onChange={onChangeBirthday}
            errorMsg={birthdayErrorMsg}
            value={birthday}
            type="date"
          />
          <h1 className="text-md text-gray-900 ps-2">
            Gender <span className="text-md text-red-600">*</span>
          </h1>
          <FormRadioInput onChange={onChangeGender} />
          <span className="text-sm text-red-600">{genderErrorMsg}</span>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Button
            colorScheme="purple"
            className="flex w-full justify-center rounded-md px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            disabled={isLoading || nameValid || emailValid || phoneValid || addressValid || birthdayValid}
            onClick={onSubmit}
            style={{ height: "45px" }}
          >
            {isLoading ? (
              <motion.div
                animate={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 180, 180, 0],
                  borderRadius: ["0%", "0%", "50%", "50%", "0%"],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                style={{
                  height: 15,
                  width: 15,
                  background: "white",
                }}
                className="box my-1"
              />
            ) : (
              "Add"
            )}
          </Button>
        </div>

        <h2 className="text-center text-lg font-bold leading-9 tracking-tight text-red-700">
            {errorMsg}
          </h2>
      </div>
  );
}
