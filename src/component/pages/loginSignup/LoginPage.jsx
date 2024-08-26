import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  ValidationChecking,
  numberValidation,
} from "../../../constants/ValidationConstants";
import CustomePopup from "../../forms/CustomePopup";
import { useDispatch, useSelector } from "react-redux";
import PhoneInputWrapper from "../../forms/PhoneInputWrapper";
import { setLogin, setLoginData } from "../../../redux/appSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiOTP, setApiOTP] = useState(1234);
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted1, setFormSubmitted1] = useState(false);
  const [formSubmitted2, setFormSubmitted2] = useState(false);
  const [otpSubmitted, setotpSubmitted] = useState(false);
  const [formDataArray, setFormDataArray] = useState([
    { phonenumber: "", phoneCode: "+91" },
    { firstName: "", lastName: "", email: "" },
    { otp1: "", otp2: "", otp3: "", otp4: "", otp: "" },
  ]);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const [customePopup, setCustomePopup] = useState({});
  const [error, setError] = useState({
    phonenumber: "",
    phoneCode: "",
    firstName: "",
    lastName: "",
    email: "",
    otp: "",
  });
  const handlePhoneChange = (newPhone) => {
    const newFormDataArray = [...formDataArray];
    newFormDataArray[0] = { ...newFormDataArray[0], phoneCode: newPhone };
    setFormDataArray(newFormDataArray);
  };

  const handleChildValue = (value) => {
    let newcustomePopup = {};
    newcustomePopup.showCommand = value;
    setCustomePopup(newcustomePopup);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormDataArray = [...formDataArray];
    newFormDataArray[index] = { ...newFormDataArray[index], [name]: value };
    setFormDataArray(newFormDataArray);
  };

  const handleOTPChange = (e, index, nextInputRef) => {
    const { name, value } = e.target;
    let val = /^[0-9\b]$/.test(value) ? value : "";
    const newFormDataArray = [...formDataArray];
    newFormDataArray[index] = {
      ...newFormDataArray[index],
      [name]: val,
    };
    setFormDataArray(newFormDataArray);
    if (/^[0-9\b]$/.test(e.target.value) && nextInputRef) {
      nextInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (formSubmitted1) {
      validateFormData([
        {
          filedName: "Phone number",
          filedValue: formDataArray[0].phonenumber,
          regexMethod: "mobileNumberValidation",
          isMandatory: true,
          errorField: "phonenumber",
        },
      ]);
    }
    if (formSubmitted2) {
      validateFormData([
        {
          filedName: "firstName",
          filedValue: formDataArray[1].firstName,
          regexMethod: "onlyAlphanumericValidation",
          isMandatory: true,
          errorField: "firstName",
        },
        {
          filedName: "lastName",
          filedValue: formDataArray[1].lastName,
          regexMethod: "onlyAlphanumericValidation",
          isMandatory: true,
          errorField: "lastName",
        },
        {
          filedName: "Email",
          filedValue: formDataArray[1].email,
          regexMethod: "emailValidation",
          isMandatory: true,
          errorField: "email",
        },
      ]);
    }
  }, [formDataArray]);

  useEffect(() => {
    if (otpSubmitted) {
      let otp = "";
      if (
        formDataArray[2].otp1 &&
        formDataArray[2].otp2 &&
        formDataArray[2].otp3 &&
        formDataArray[2].otp4
      ) {
        otp =
          formDataArray[2].otp1 +
          formDataArray[2].otp2 +
          formDataArray[2].otp3 +
          formDataArray[2].otp4;
      }
      validateFormData([
        {
          filedName: "otp",
          filedValue: otp,
          regexMethod: "numberValidation",
          isMandatory: true,
          errorField: "otp",
        },
      ]);
    }
  }, [
    formDataArray[2].otp1,
    formDataArray[2].otp2,
    formDataArray[2].otp3,
    formDataArray[2].otp4,
  ]);

  const handleNext = (e, index) => {
    if (currentStep == 2) {
      setFormSubmitted1(true);
      // validation phone number after proceed button click
      const validate1 = validateFormData([
        {
          filedName: "Phone number",
          filedValue: formDataArray[0].phonenumber,
          regexMethod: "mobileNumberValidation",
          isMandatory: true,
          errorField: "phonenumber",
        },
      ]);
      if (validate1.isValid) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep == 3) {
      let otp = "";
      if (
        formDataArray[2].otp1 &&
        formDataArray[2].otp2 &&
        formDataArray[2].otp3 &&
        formDataArray[2].otp4
      ) {
        otp =
          formDataArray[2].otp1 +
          formDataArray[2].otp2 +
          formDataArray[2].otp3 +
          formDataArray[2].otp4;
      }
      setotpSubmitted(true);
      const validationStatus = numberValidation(otp, "otp", "otp", true, null);
      if (validationStatus.isValid && otp == apiOTP) {
        const newUserData = {
          // ...userData,
          phonenumber: formDataArray[0].phonenumber,
          firstName: formDataArray[1].firstName,
          lastName: formDataArray[1].lastName,
          email: formDataArray[1].email,
          dob: "",
        };

        dispatch(setLogin(true));
        dispatch(setLoginData(newUserData));

        navigate("/dashboard");
      } else {
        let newCustomePopup = {};
        newCustomePopup.icons = "error";
        newCustomePopup.titles = "Please Enter Correct OTP";
        newCustomePopup.showCommand = true;
        newCustomePopup.customebtnClick = () => {};
        setCustomePopup(newCustomePopup);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  // const gotoSignupPage = () => {
  // onValueChange("Signup");
  // };

  const validateFormData = (data) => {
    const result = ValidationChecking(data);
    let newErrors = {};
    result.forEach((obj) => {
      newErrors[obj.errorField] = obj.messageTwo;
    });
    setError(newErrors);
    return result[0] || { isValid: true };
  };
  const switchData = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="px-3">
            <div className="mb-4">
              <span className="font-32 font-600 text-cblack">Welcome to</span>
              <br />
              <span className="font-32 font-600 text-pprimary">Grocer Now</span>
            </div>
            <div>
              <span className="text-cblack">
                Your journey to
                <span className="text-pprimary">Better choices</span> beginsnow!
              </span>
            </div>
            <div>
              <button
                onClick={handleNext}
                className="btn btn-primary font-14 mt-3 rounded-tr-bl string-limit w-100 my-3"
              >
                Sign in with Phone Number
              </button>
            </div>
            <div className="or">
              <span className="bs-body-bg px-3">OR</span>
            </div>
            <div className="text-center">
              <Link
                to={"https://www.google.co.in/"}
                className="btn btn-primary font-14 mt-3 rounded-tr-bl string-limit my-3"
              >
                Google
              </Link>
            </div>
            <span className="font-30">
              New at Grocer Now?
              <a
                className="font-30 p-0 text-primary-secondary cursor-pointer text-decoration-none"
                // onClick={gotoSignupPage}
              >
                Sign up
              </a>
            </span>
          </div>
        );
      case 2:
        return (
          <div className="2">
            <button
              onClick={handleBack}
              className="text-primary-secondary bg-none border-0 d-flex justify-content-center align-items-center"
            >
              <IoMdArrowRoundBack className="font-18" /> back
            </button>
            <div className="mb-4">
              <span className="font-32 font-600 text-cblack">
                You are almost there
              </span>
            </div>
            <div className="my-4">
              <PhoneInputWrapper
                mainconClassName="mt-3"
                country="in"
                valueCode={formDataArray[0].phoneCode}
                onChangeCode={handlePhoneChange}
                labelCode="Phone Code"
                placeholder=""
                label="Phone number"
                name="phonenumber"
                value={formDataArray[0].phonenumber}
                errorMessage={error.phonenumber}
                onChange={(e) => {
                  handleChange(e, 0);
                }}
              />
            </div>
            <button
              onClick={(e) => handleNext(e, 0)}
              className="btn btn-primary font-14 mt-3 rounded-tr-bl string-limit w-100 my-3"
            >
              Proceed
            </button>
          </div>
        );
      case 3:
        return (
          <div className="3">
            <button
              onClick={handleBack}
              className="text-primary-secondary bg-none border-0 d-flex justify-content-center align-items-center"
            >
              <IoMdArrowRoundBack className="font-18" /> back
            </button>
            <div className="mb-4">
              <span className="font-32 font-600 text-cblack">
                You are almost there
              </span>
            </div>
            <div className="row row-cols-4 otp-con mx-0">
              <div className="col">
                {" "}
                <input
                  type="text"
                  className="p-3 form-control text-center"
                  name="otp1"
                  ref={input1Ref}
                  autoComplete="off"
                  maxLength="1"
                  value={formDataArray[2].otp1}
                  onChange={(e) => handleOTPChange(e, 2, input2Ref)}
                />
              </div>
              <div className="col">
                {" "}
                <input
                  type="text"
                  className="p-3 form-control text-center"
                  name="otp2"
                  ref={input2Ref}
                  autoComplete="off"
                  maxLength="1"
                  value={formDataArray[2].otp2}
                  onChange={(e) => handleOTPChange(e, 2, input3Ref)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="p-3 form-control text-center"
                  name="otp3"
                  ref={input3Ref}
                  autoComplete="off"
                  maxLength="1"
                  value={formDataArray[2].otp3}
                  onChange={(e) => handleOTPChange(e, 2, input4Ref)}
                />
              </div>
              <div className="col">
                {" "}
                <input
                  type="text"
                  className="p-3 form-control text-center"
                  name="otp4"
                  ref={input4Ref}
                  autoComplete="off"
                  maxLength="1"
                  value={formDataArray[2].otp4}
                  onChange={(e) => handleOTPChange(e, 2)}
                />{" "}
              </div>
              <div className="col-12 my-2 position-relative">
                <div className="position-absolute">{error.otp}</div>
              </div>
            </div>
            <button
              onClick={(e) => handleNext(e, 2)}
              className="btn btn-primary font-14 mt-3 rounded-tr-bl string-limit w-100 my-3"
            >
              {" "}
              Proceed{" "}
            </button>
          </div>
        );
    }
  };
  return (
    <>
      {switchData()}
      <CustomePopup
        customebtnClick={customePopup.customebtnClick}
        icons={customePopup.icons}
        titles={customePopup.titles}
        texts={customePopup.texts}
        url={customePopup.url}
        showCommand={customePopup.showCommand}
        size="sm"
        // onValueChange={handleChildValue}
      ></CustomePopup>
    </>
  );
}

export default LoginPage;
