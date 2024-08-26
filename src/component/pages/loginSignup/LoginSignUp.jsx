import React, { useState, useRef } from "react";
import Slider from "react-slick";
import octashopLogo from "../../../assets/temp/Octashop-logo.png";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import { TempVariable } from "../../../constants/TempVariable";


function LoginSignUp({ ...props }) {
  
  const sliderRef = useRef(null);
  
  const [moduleType, setModuleType] = useState(props.moduleType);


  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const slides = TempVariable.LoginSignUp;

  const handleModuleType =(val) =>{
    setModuleType(val);
  }
  return (
    <>
    
    <div className="container">
      <div className="row gy-md-0 gy-3 m-0">
        <div className="col-md-5 col-sm-12 bg-cream p-0 order-1 order-md-0">
          <div className="m-2">
                <img
                  src={octashopLogo}
                  style={{ width: "auto", height: "70px" }}
                />
              </div>
          <div className="d-flex justify-content-center align-items-center loginSlick p-0">
        <Slider ref={sliderRef} {...settings}>
              {slides.map((slide, index) => (
                <div key={index} className="position-relative">
                  <img src={slide.imgSrc} alt={slide.title} className="w-100 h-auto" />
                  <div className="position-absolutebottom-0start-0 px-3" style={{fontSize:"56px"}}>
                    <div className="lh-1">
                    <span>
                      {slide.title}
                    </span>
                    </div>
                    <div className="text-pprimary">
                    <span>
                      {slide.info}
                    </span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="col-md-7 col-sm-12 order-0 order-md-1">
          <div className="d-flex justify-content-center align-items-top mt-md-5 h-100">
            <div className="w-100 LoginSignUp-con">
              {moduleType === "login" ? <LoginPage moduleType={moduleType} handleCloseModal={props.handleCloseModal} onValueChange={handleModuleType} 
              login={props.login} setLogin={props.setLogin} 
              // userData={props.userData} setUserData={props.setUserData}
               /> : <SignUpPage moduleType={moduleType} handleCloseModal={props.handleCloseModal} onValueChange={handleModuleType} 
               login={props.login} setLogin={props.setLogin} 
              // userData={props.userData} setUserData={props.setUserData}
               />}

            </div>
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginSignUp;
