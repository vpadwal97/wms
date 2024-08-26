import React, { useEffect, useRef, useState } from "react";
import FormGroup from "../../forms/FormGroup";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ValidationChecking, numberValidation } from "../../../constants/ValidationConstants";
import CustomePopup from "../../forms/CustomePopup";
import FormCheckbox from "../../forms/FormCheckbox";
import { useDispatch, useSelector } from "react-redux";
import PhoneInputWrapper from "../../forms/PhoneInputWrapper";
import { TempVariable } from "../../../constants/TempVariable";
import FormSelect from "../../forms/FormSelect";
import DateTimePickerWrapper from "../../forms/DateTimePickerWrapper";
import { getYear, addDays } from "date-fns";
import axios from '../../../utils/HttpServices';
import { setAuthCode, setCountryCallingCode, setLoginStatus, setMobile, setUserFirstName, setUserID, setUserLastName, setUserType } from "../../../reduxStore/LoginSlice";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { TokenDecrypt } from "../../ReusableComponents/TokenEncryptDecrypt";
import { setTokenExpiryTime } from "../../../reduxStore/LoginSlice";
import { FcCheckmark } from "react-icons/fc";

function SignUpPage({ onValueChange, handleCloseModal, login, setLogin }) {
  const userData = useSelector((state) => state.persistedReducer.loginDetails);
  const [passValid1, setPassValid2] = useState();
  const [confPassValid, setConfPassValid] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [formSubmitted1, setFormSubmitted1] = useState(false);
  const [otpSubmitted, setotpSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [customePopup, setCustomePopup] = useState({});
  const nametitle = TempVariable.NameTitleList;
  const dispatch = useDispatch();
  const [apiOTP, setApiOTP] = useState();
  const [jwtAuthOtpToken, setJWTAuthOtpToken] = useState();
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  const [confPassDisplay, setConfPassDisplay] = useState(false);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,15}$/;

  const [formDataArray, setFormDataArray] = useState([
    {
      nametitle: "",
      firstName: "",
      lastName: "",
      email: "",
      phonenumber: "",
      phoneCode: "+91",
      dob: "",
      password: '',
      confirmPassword: ''
    },
    { otp1: "", otp2: "", otp3: "", otp4: "", otp: "" },
  ]);

  // const [iAgree, setiAgree] = useState(true);
  const [dob, setdob] = useState((userData?.dob && new Date(userData.dob)) || null);
  const handleDateChange = (date) => { setdob(date); };
  const handlePhoneChange = (newPhone) => {
    const newFormDataArray = [...formDataArray];
    newFormDataArray[0] = { ...newFormDataArray[0], phoneCode: '+' + newPhone, };
    setFormDataArray(newFormDataArray);
  };
  const [error, setError] = useState({
    phoneCode: "",
    phonenumber: "",
    firstName: "",
    lastName: "",
    email: "",
    otp: "",
    confirmPassword: '',
    password: ''
  });

  const passwordValidation = (fieldName, fieldValue) => {
    if (fieldName == 'password') {
      const step1 = /^.{8,15}$/.test(fieldValue)//Password should be between 8-15 digits or Characters
      const step2 = /(?=.*[A-Z])/.test(fieldValue)//At least 1 Uppercase
      const step3 = /(?=.*[a-z])/.test(fieldValue)// At least 1 Lowercase 
      const step4 = /\d/.test(fieldValue)  //At least 1 Digit 
      const step5 = /[^a-zA-Z0-9]/.test(fieldValue)// At least 1 special character
      let obj = {
        span1: <span key="span1" style={{ color: `${step1 ? 'Green' : 'red'}` }}> {step1 && <FcCheckmark style={{ fontSize: '20px' }} />} Password should be between 8-15 digits or Characters </span>,
        span2: <span key="span2" style={{ color: `${step2 ? 'Green' : 'red'}` }}> {step2 && <FcCheckmark style={{ fontSize: '20px' }} />}Password Contain At least 1 Uppercase </span>,
        span3: <span key="span2" style={{ color: `${step3 ? 'Green' : 'red'}` }}> {step3 && <FcCheckmark style={{ fontSize: '20px' }} />}Password Contain At least 1 Lowercase </span>,
        span4: <span key="span2" style={{ color: `${step4 ? 'Green' : 'red'}` }}> {step4 && <FcCheckmark style={{ fontSize: '20px' }} />}Password Contain At least 1 Digit </span>,
        span5: <span key="span2" style={{ color: `${step5 ? 'Green' : 'red'}` }}> {step5 && <FcCheckmark style={{ fontSize: '20px' }} />}Password Contain At least 1 special character</span>,
      }
      setPassValid2(obj);
    }
    if (fieldName == 'confirmPassword') {
      if(formDataArray[0].password){
        const check1 =formDataArray[0].password==fieldValue;
        let obj = {
           span1: <span key="span1" style={{ color: `${check1 ? 'Green' : 'red'}` }}> {check1 && <FcCheckmark style={{ fontSize: '20px' }} />} Password and Confirm Password not matching </span>,
         }
      setConfPassValid(obj)

      }
   
    }
  }
  const passValidation = (fieldValue)=>{
    const step1 = /^.{8,15}$/.test(fieldValue)//Password should be between 8-15 digits or Characters
    const step2 = /(?=.*[A-Z])/.test(fieldValue)//At least 1 Uppercase
    const step3 = /(?=.*[a-z])/.test(fieldValue)// At least 1 Lowercase 
    const step4 = /\d/.test(fieldValue)  //At least 1 Digit 
    const step5 = /[^a-zA-Z0-9]/.test(fieldValue)// At least 1 special character
    if(step1 && step2 && step3 && step4 && step5){
      return {
        isValid:true
      }
    }else{
      return {
        isValid:false,
        message:"Enter Valid Password"
      }
    }
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormDataArray = [...formDataArray];
    newFormDataArray[index] = { ...newFormDataArray[index], [name]: value, };
    setFormDataArray(newFormDataArray);
    if (e.target.name == 'password' || e.target.name == 'confirmPassword') {
      passwordValidation(name, value)
    }
  };

  const handleLogin = () => {
    setLogin(true); // Change the login state to true
    const newUserData = {
      ...userData,
      phonenumber: formDataArray[0].phonenumber,
      phoneCode: formDataArray[0].phoneCode,
      firstName: formDataArray[0].firstName,
      lastName: formDataArray[0].lastName,
      email: formDataArray[0].email,
    };
  };

  const handleChildValue = (value) => {
    let newcustomePopup = {};
    newcustomePopup.showCommand = value;
    setCustomePopup(newcustomePopup);
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
      // if (nextInputRef) {
      nextInputRef.current.focus();
    }
  };
  useEffect(() => {
    if (formSubmitted1) {
      validateFormData([
        { filedName: "Phone number", filedValue: formDataArray[0].phonenumber, regexMethod: "mobileNumberValidation", isMandatory: true, errorField: "phonenumber", },
        { filedName: "firstName", filedValue: formDataArray[0].firstName, regexMethod: "onlyAlphanumericValidation", isMandatory: true, errorField: "firstName", },
        { filedName: "lastName", filedValue: formDataArray[0].lastName, regexMethod: "onlyAlphanumericValidation", isMandatory: true, errorField: "lastName", },
        { filedName: "Email", filedValue: formDataArray[0].email, regexMethod: "emailValidation", isMandatory: true, errorField: "email", },
      ]);
    }
  }, [formDataArray]);
  const handleNext = async (e, index) => {
    if (currentStep == 2) {
      const validate1 = validateFormData([
        { filedName: "Phone number", filedValue: formDataArray[0].phonenumber, regexMethod: "mobileNumberValidation", isMandatory: true, errorField: "phonenumber", },
        { filedName: "firstName", filedValue: formDataArray[0].firstName, regexMethod: "onlyAlphanumericValidation", isMandatory: true, errorField: "firstName", },
        { filedName: "lastName", filedValue: formDataArray[0].lastName, regexMethod: "onlyAlphanumericValidation", isMandatory: true, errorField: "lastName", },
        { filedName: "Email", filedValue: formDataArray[0].email, regexMethod: "emailValidation", isMandatory: true, errorField: "email", },
        { filedName: "password", filedValue: formDataArray[0].password, regexMethod: "codeValidation", isMandatory: true, errorField: "password", },
        { filedName: "confirmPassword", filedValue: formDataArray[0].confirmPassword, regexMethod: "codeValidation", isMandatory: true, errorField: "confirmPassword", },
      ]);
      const passValidation1 = passValidation(formDataArray[0].password);
      if(!passValidation1.isValid){
        let newCustomePopup = {};
        newCustomePopup.icons = "error";
        newCustomePopup.titles = passValidation1.message;
        newCustomePopup.showCommand = true;
        newCustomePopup.customebtnClick = () => { };
        setCustomePopup(newCustomePopup);
        return 
      }
      if (formDataArray[0].password != formDataArray[0].confirmPassword) {
        let newCustomePopup = {};
        newCustomePopup.icons = "error";
        newCustomePopup.titles = "Password and Confirm Password not matching! Enter Valid Password";
        newCustomePopup.showCommand = true;
        newCustomePopup.customebtnClick = () => { };
        setCustomePopup(newCustomePopup);
        return
      } 
      if (validate1.isValid )  {
      
          await axios.post('/api/user-detail/user-signUp',
            {
              menuType: formDataArray[0].nametitle,
              userFName: formDataArray[0].firstName,
              userLName: formDataArray[0].lastName,
              // country: formDataArray[0].nametitle,
              countryCallCode: formDataArray[0].phoneCode,
              userMobile: formDataArray[0].phonenumber,
              // customerType: formDataArray[0].nametitle,
              userEmailId: formDataArray[0].email,
              dob: dob,
              // gender: formDataArray[0].nametitle,
              userPass: formDataArray[0].password,
              confirmPass: formDataArray[0].confirmPassword
            }
          ).then(response => {
            if (response.data.success) {
              let newCustomePopup = {};
              newCustomePopup.icons = response.data.success ? "success" : "error";
              newCustomePopup.titles = response.data.message;
              newCustomePopup.showCommand = true;
              newCustomePopup.customebtnClick = () => { };
              setCustomePopup(newCustomePopup);
              setCurrentStep(currentStep + 1);

            } else {
              let newCustomePopup = {};
              newCustomePopup.icons = response.data.success ? "success" : "error";
              newCustomePopup.titles = response.data.message;
              newCustomePopup.showCommand = true;
              newCustomePopup.customebtnClick = () => { };
              setCustomePopup(newCustomePopup);
              // setCurrentStep(currentStep + 1);
            }
          }).catch(error => {
          })
        
      }
    } else if (currentStep == 4) {
      let otp = "";
      if (formDataArray[1]?.otp1 && formDataArray[1]?.otp2 && formDataArray[1]?.otp3 && formDataArray[1]?.otp4) {
        otp = formDataArray[1].otp1 + formDataArray[1].otp2 + formDataArray[1].otp3 + formDataArray[1].otp4;
      }
      setotpSubmitted(true);
      const validationStatus = numberValidation(otp, 'otp', 'otp', true, null);
      if (validationStatus.isValid && otp == apiOTP) {
        await axios.post(`/api/user-detail/otp-verify`, {
          mobileOtp: apiOTP,
          mobile: formDataArray[0].phonenumber,
          otpJwtToken: jwtAuthOtpToken,
        })
          .then(response => {
            if (response.data.success) {
              const descryptedToken = TokenDecrypt(response.data.response.authCode);
              const authCodeTokenData = jwtDecode(descryptedToken);
              dispatch(setTokenExpiryTime(authCodeTokenData.exp * 1000));
              // const encryptedToken = TokenEncrypt(response.data.response.authCode);
              dispatch(setLoginStatus(true));
              dispatch(setUserID(authCodeTokenData.userId))
              dispatch(setAuthCode(response.data.response.authCode))
              dispatch(setUserType(authCodeTokenData.userType));
              dispatch(setUserFirstName(response.data.response.userFname))
              let newCustomePopup = {};
              newCustomePopup.icons = "success";
              newCustomePopup.titles = "Success";
              newCustomePopup.customebtnClick = () => {
                handleLogin();
                handleCloseModal();
              };
              newCustomePopup.showCommand = true;
              setCustomePopup(newCustomePopup);
            } else {
              let newCustomePopup = {};
              newCustomePopup.icons = "error";
              newCustomePopup.titles = "Please Enter Correct OTP";
              newCustomePopup.showCommand = true;
              newCustomePopup.customebtnClick = () => { };
              setCustomePopup(newCustomePopup);
            }
          }).catch(error => {
          }).finally(() => {
          })
      } else {
        let newCustomePopup = {};
        newCustomePopup.icons = "error";
        newCustomePopup.titles = "Please Enter Correct OTP";
        newCustomePopup.showCommand = true;
        newCustomePopup.customebtnClick = () => { };
        setCustomePopup(newCustomePopup);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleBack = () => { setCurrentStep(currentStep - 1); };
  const gotoLoginPage = () => { onValueChange("login"); };

  const validateFormData = (data) => {
    setFormSubmitted1(true);
    const result = ValidationChecking(data);
    let newErrors = {};
    result.forEach((obj) => {
      newErrors[obj.errorField] = obj.messageTwo;
    });
    setError(newErrors);
    return result[0] || { isValid: true };
  };
  const handleContinueLogin = async () => {
    setCurrentStep(currentStep + 1);
    await axios.post(`/api/user-detail/user-login`,
      {
        mobile: formDataArray[0].phonenumber,
        countryCallCode: formDataArray[0].phoneCode
      })
      .then(response => {
        if (response?.data?.success) {
          dispatch(setCountryCallingCode(response.data.response.countryCallCode))
          const descryptedToken = TokenDecrypt(response.data.response.otpJwtToken);
          const tokenData = jwtDecode(descryptedToken);
          dispatch(setMobile(tokenData.sub))
          setApiOTP(tokenData.OTP)
          setJWTAuthOtpToken(response.data.response.otpJwtToken)
          alert(response.data.response.mobileOtp)
          setCurrentStep(currentStep + 1);
        } else {
          let newCustomePopup = {};
          newCustomePopup.icons = response.data.success ? "success" : "error";
          newCustomePopup.titles = response.data.message;
          newCustomePopup.showCommand = true;
          newCustomePopup.customebtnClick = () => { };
          setCustomePopup(newCustomePopup);
        }
      }).catch(error => {

      })
  }
  const handleClose = () => {
    handleCloseModal();
  }

  const switchData = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="px-3">
            <div>
              <div className="mb-4">
                <span className="font-32 font-600 text-cblack">Welcome to</span><br />
                <span className="font-32 font-600 text-pprimary">Grocer Now</span>
              </div>
              <div>
                <span className="text-cblack">Your journey to<span className="text-pprimary">Better choices</span> beginsnow!</span>
              </div>
            </div>
            <div>
              <button className="btn btn-primary font-14 mt-3 rounded-tr-bl string-limit w-100 my-3" onClick={handleNext}>Sign up with Phone Number</button>
            </div>
            <div className="or"><span className="bs-body-bg px-3">OR</span></div>
            <div className="text-center">
              <Link to={"https://www.google.co.in/"} className="btn btn-primary font-14 mt-3 rounded-tr-bl string-limit my-3">Google</Link>
            </div>
            <span className="font-30">Already have an account?
              <a className="font-30 p-0 text-primary-secondary cursor-pointer text-decoration-none" onClick={gotoLoginPage}>Sign In</a>
            </span>
          </div>
        );
      case 2:
        return (
          <div className="2">
            <button className="text-primary-secondary bg-none border-0 d-flex justify-content-center align-items-center" onClick={handleBack}   >
              <IoMdArrowRoundBack className="font-18" /> back
            </button>
            <div className="mb-4">
              <span className="font-32 font-600 text-cblack">Sign up</span>
              <br /><span className="font-32 font-600 text-pprimary">with your number</span>
            </div>
            <div className="mb-2">
              <span className="text-cblack">Enter the <span className="text-pprimary">Phone number</span>{" "}associated with your account</span>
            </div>
            <div className="my-4">
              <div className="d-flex">
                <FormSelect label={"Title"} name={"nametitle"} id="nametitle" value={formDataArray[0].nametitle} dropdownlist={nametitle} onChange={(e) => handleChange(e, 0)} conClassName="mt-3 me-1" required errorMessage={error.nametitle} />
                <FormGroup conClassName="mt-3 w-75" preventSpecialCharacters preventNum placeholder="" label="Enter First Name" name="firstName" errorMessage={error.firstName} value={formDataArray[0].firstName} onChange={(e) => handleChange(e, 0)} />
              </div>
              <FormGroup conClassName="mt-3" preventSpecialCharacters preventNum placeholder="" label="Enter Last Name" name="lastName" errorMessage={error.lastName} value={formDataArray[0].lastName} onChange={(e) => handleChange(e, 0)} />
              <FormGroup conClassName="mt-3" preventSpaces placeholder="" label="Email" name="email" errorMessage={error.email} value={formDataArray[0].email} onChange={(e) => handleChange(e, 0)} />
              <PhoneInputWrapper mainconClassName="mt-3" country="in" valueCode={formDataArray[0].phoneCode} onChangeCode={handlePhoneChange} labelCode="Phone Code" label="Phone number" value={formDataArray[0].phonenumber} placeholder="" name="phonenumber" errorMessage={error.phonenumber} onChange={(e) => handleChange(e, 0)} />
              <DateTimePickerWrapper isClearable wrapperClass="mt-3" startDate={dob} onChange={handleDateChange} yearsRange={[getYear(new Date()) - 100, getYear(new Date())]} label="DOB" name="dob" maxDate={addDays(new Date(), 0)} errorMessage={error.dob} />
              <div>
                <FormGroup
                  conClassName="mt-3"
                  placeholder=""
                  label="Password"
                  name="password"
                  errorMessage={error.password}
                  validMessage={passValid1}
                  value={formDataArray[0].password}
                  onChange={(e) => handleChange(e, 0)}
                  type={passwordDisplay ? "text" : "password"}
                  isPasswordField={'1'}
                  handleChangedVisibility={() => setPasswordDisplay(!passwordDisplay)}
                //  isPassword={false}
                />
              </div>

              <FormGroup
                validMessage={confPassValid}
                conClassName="mt-3"
                placeholder=""
                label="Confirm Password"
                name="confirmPassword"
                errorMessage={error.confirmPassword}
                value={formDataArray[0].confirmPassword}
                onChange={(e) => handleChange(e, 0)}
                type={confPassDisplay ? "text" : 'password'}
                isPasswordField={'1'}
                handleChangedVisibility={() => setConfPassDisplay(!confPassDisplay)}

              // isPassword={false}
              />


            </div>
            <FormCheckbox id="consent" title="I agree to receive promotions and offers from Grocer Now" name="consent" onChange={() => { setConsent(!consent); }} checked={consent} labelClass="text-cblack" />
            <button className="btn btn-primary font-14 mt-3 rounded-tr-bl string-limit w-100 my-3" onClick={(e) => handleNext(e, 0)}>Proceed</button>
          </div>
        );
      case 3:
        return (
          <div className="px-3">
            <div>
              <div className="mb-4">
                <span className="font-32 font-600 text-pprimary">Registration Successful! </span>
                <span className="font-32 font-600 text-cblack">Thank you for signing up.You can now log in to your account.</span>
              </div>
              <br />
              <span className="text-cblack font-20">Click <span className="text-pprimary"> Continue </span> to log in and start using your account! </span>
              <br />
              <span className="text-cblack font-20">If you wish to exit, click <span className="text-pprimary" > Close </span></span>
            </div>
            <button className="btn btn-primary font-14 mt-3 rounded-tr-bl string-limit w-100 my-3" onClick={() => handleContinueLogin()} >Continue</button>
            <button className="btn btn-primary font-14 mt-3 rounded-tr-bl string-limit w-100 my-3" onClick={() => handleClose()} >Close</button></div>
        )
      case 4:
        return (
          <div className="3">
            <div className="mb-4"><span className="font-32 font-600 text-cblack">Enter OTP Here !</span></div>
            <div className="row row-cols-4 otp-con mx-0">
              <div className="col"> <input type="text" className="p-3 form-control text-center" name="otp1" ref={input1Ref} autoComplete="off" maxLength="1" value={formDataArray[1].otp1} onChange={(e) => handleOTPChange(e, 1, input2Ref)} /></div>
              <div className="col"> <input type="text" className="p-3 form-control text-center" name="otp2" ref={input2Ref} autoComplete="off" maxLength="1" value={formDataArray[1].otp2} onChange={(e) => handleOTPChange(e, 1, input3Ref)} /></div>
              <div className="col"><input type="text" className="p-3 form-control text-center" name="otp3" ref={input3Ref} autoComplete="off" maxLength="1" value={formDataArray[1].otp3} onChange={(e) => handleOTPChange(e, 1, input4Ref)} /></div>
              <div className="col"> <input type="text" className="p-3 form-control text-center" name="otp4" ref={input4Ref} autoComplete="off" maxLength="1" value={formDataArray[1].otp4} onChange={(e) => handleOTPChange(e, 1)} /> </div>
              <div className="col-12 my-2 position-relative"><div className="position-absolute">{error.otp}</div></div>
            </div>
            <button onClick={(e) => handleNext(e, 1)} className="btn btn-primary font-14 mt-3 rounded-tr-bl string-limit w-100 my-3" > Proceed </button>
          </div>
        );
    }
  };

  return (
    <>
      {switchData()}
      <CustomePopup customebtnClick={customePopup.customebtnClick} icons={customePopup.icons} titles={customePopup.titles} texts={customePopup.texts} url={customePopup.url} showCommand={customePopup.showCommand} size="sm" onValueChange={handleChildValue} ></CustomePopup>
      <ToastContainer />

    </>
  );
}

export default SignUpPage;
