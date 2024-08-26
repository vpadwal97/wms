import CollapseWrapper from "../reusableComp/CollapseWrapper";
import profilePic from "../../assets/img/blank-profile-pic.png";
import Dashboard from "../../assets/img/Dashboard.png";
import Setup from "../../assets/img/Setup.png";
import Manager from "../../assets/img/Manager.png";
import Master from "../../assets/img/Master.png";
import Inventory from "../../assets/img/Inventory.png";
import Purchase from "../../assets/img/Purchase.png";
import Sales from "../../assets/img/Sales.png";
import Reports from "../../assets/img/Reports.png";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import MenuBarCloseIcon from "../reusableComp/MenuBarCloseIcon";
import MainBody from "./MainBody";
import Header from "./Header";
import { FaAngleDown } from "react-icons/fa";
import LocationPath from "../reusableComp/LocationPath";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const childRef = useRef();

  const handleClose = () => {
    if (childRef.current) {
      childRef.current.triggerFunction();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      handleClose();
    }
  }, [isOpen]);

  return (
    <>
      <div className={`mainCon d-flex w-100 ${isOpen ? "active" : ""}`}>
        <aside
          className={`sidebarCon overflow-y-auto h-100 bg-primary position-fixed z-1`}
        >
          <div className="sidebar">
            <div className="profile-detail-holder p-2 text-center text-white">
              <img
                src={profilePic}
                alt="profile-pic"
                className="avatar profile-pic img-fluid bg-white rounded-pill p-2"
              />

              {isOpen && (
                <>
                  <h4 className="">Welcome Vijay ! </h4>
                  <small className="login-det">
                    Last Logged - in 27/07/2022 11:54:44 AM
                  </small>
                </>
              )}
            </div>
            <div className="text-center">
              <button
                className={`sidebar-button btn btn-primary rounded-circle top-0 px-2  ${
                  isOpen ? "position-fixed translate-middle-x mt-3" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <MenuBarCloseIcon openClose={isOpen} color="white" />
              </button>
            </div>
            <div>
              <CollapseWrapper
                buttonClass="p-0 w-100 border-0"
                buttonLabel={
                  <NavLink
                    to="/dashboard"
                    className="btn rounded-0 text-white border-0 px-2 py-2 w-100 menu-btn"
                  >
                    <div className={`d-flex align-items-center ${isOpen ? "justify-content-between" : "justify-content-center"}`}>
                      <div className="d-flex align-items-center menu-item">
                        <img
                          className={`m-icon ${isOpen ? "me-2" : ""}`}
                          src={Dashboard}
                          alt="Dashboard.png"
                        />
                        <span className={`fw-semibold m-0 m-title ${isOpen ? "fs-15" : "fs-12 mt-1"}`}>Dashboard</span>
                      </div>
                      {/* {isOpen && <FaAngleDown className="collapse-icon" />} */}
                    </div>
                  </NavLink>
                }
              />

              <CollapseWrapper
                ref={childRef}
                buttonClass="px-2 py-2 border-0 w-100 text-start rounded-0 menu-btn"
                buttonLabel={
                  <LocationPath>
                    <div className={`d-flex align-items-center ${isOpen ? "justify-content-between" : "justify-content-center"}`}>
                      <div className="d-flex align-items-center menu-item">
                        <img
                          className={`m-icon ${isOpen ? "me-2" : ""}`}
                          src={Setup}
                          alt="Setup.png"
                        />

                        <span className={`fw-semibold m-0 m-title ${isOpen ? "fs-15" : "fs-12 mt-1"}`}>Setup</span>
                      </div>
                      {isOpen && <FaAngleDown className="collapse-icon" />}
                    </div>
                  </LocationPath>
                }
                collapseBody={
                  <div className="p-2">
                    {/* <div className="">SubMenue1</div> */}
                    <button
                      // to="/setup/m1"
                      className="text-white"
                      onClick={handleClose}
                    >
                      handleClose
                    </button>
                  </div>
                }
              />

              <CollapseWrapper
                buttonClass="px-2 py-2 border-0 w-100 text-start rounded-0 menu-btn"
                buttonLabel={
                  <LocationPath>
                    <div className={`d-flex align-items-center ${isOpen ? "justify-content-between" : "justify-content-center"}`}>
                      <div className="d-flex align-items-center menu-item">
                        <img
                          className={`m-icon ${isOpen ? "me-2" : ""}`}
                          src={Manager}
                          alt="Manager.png"
                        />

                        <span className={`fw-semibold m-0 m-title ${isOpen ? "fs-15" : "fs-12 mt-1"}`}>
                          User Manager
                        </span>
                      </div>
                      {isOpen && <FaAngleDown className="collapse-icon" />}
                    </div>
                  </LocationPath>
                }
                collapseBody={
                  <div>
                    <div className="">Submenue2</div>
                  </div>
                }
              />

              <CollapseWrapper
                buttonClass="px-2 py-2 border-0 w-100 text-start rounded-0 menu-btn"
                buttonLabel={
                  <LocationPath>
                    <div className={`d-flex align-items-center ${isOpen ? "justify-content-between" : "justify-content-center"}`}>
                      <div className="d-flex align-items-center menu-item">
                        <img
                          className={`m-icon ${isOpen ? "me-2" : ""}`}
                          src={Master}
                          alt="Master.png"
                        />

                        <span className={`fw-semibold m-0 m-title ${isOpen ? "fs-15" : "fs-12 mt-1"}`}>Master</span>
                      </div>
                      {isOpen && <FaAngleDown className="collapse-icon" />}
                    </div>
                  </LocationPath>
                }
                collapseBody={
                  <div>
                    <div className="">Submenue3</div>
                  </div>
                }
              />

              <CollapseWrapper
                buttonClass="px-2 py-2 border-0 w-100 text-start rounded-0 menu-btn"
                buttonLabel={
                  <LocationPath>
                    <div className={`d-flex align-items-center ${isOpen ? "justify-content-between" : "justify-content-center"}`}>
                      <div className="d-flex align-items-center menu-item">
                        <img
                          className={`m-icon ${isOpen ? "me-2" : ""}`}
                          src={Inventory}
                          alt="Inventory.png"
                        />

                        <span className={`fw-semibold m-0 m-title ${isOpen ? "fs-15" : "fs-12 mt-1"}`}>
                          Inventory Managment
                        </span>
                      </div>
                      {isOpen && <FaAngleDown className="collapse-icon" />}
                    </div>
                  </LocationPath>
                }
                collapseBody={
                  <div>
                    <div className="">Submenue4</div>
                  </div>
                }
              />

              <CollapseWrapper
                buttonClass="px-2 py-2 border-0 w-100 text-start rounded-0 menu-btn"
                buttonLabel={
                  <LocationPath>
                    <div className={`d-flex align-items-center ${isOpen ? "justify-content-between" : "justify-content-center"}`}>
                      <div className="d-flex align-items-center menu-item">
                        <img
                          className={`m-icon ${isOpen ? "me-2" : ""}`}
                          src={Purchase}
                          alt="Purchase.png"
                        />

                        <span className={`fw-semibold m-0 m-title ${isOpen ? "fs-15" : "fs-12 mt-1"}`}>Purchase</span>
                      </div>
                      {isOpen && <FaAngleDown className="collapse-icon" />}
                    </div>
                  </LocationPath>
                }
                collapseBody={
                  <div>
                    <div className="">Submenue5</div>
                  </div>
                }
              />

              <CollapseWrapper
                buttonClass="px-2 py-2 border-0 w-100 text-start rounded-0 menu-btn"
                buttonLabel={
                  <LocationPath>
                    <div className={`d-flex align-items-center ${isOpen ? "justify-content-between" : "justify-content-center"}`}>
                      <div className="d-flex align-items-center menu-item">
                        <img
                          className={`m-icon ${isOpen ? "me-2" : ""}`}
                          src={Sales}
                          alt="Sales.png"
                        />

                        <span className={`fw-semibold m-0 m-title ${isOpen ? "fs-15" : "fs-12 mt-1"}`}>Sales</span>
                      </div>
                      {isOpen && <FaAngleDown className="collapse-icon" />}
                    </div>
                  </LocationPath>
                }
                collapseBody={
                  <div>
                    <div className="">Submenue6</div>
                  </div>
                }
              />

              <CollapseWrapper
                buttonClass="px-2 py-2 border-0 w-100 text-start rounded-0 menu-btn"
                buttonLabel={
                  <LocationPath>
                    <div className={`d-flex align-items-center ${isOpen ? "justify-content-between" : "justify-content-center"}`}>
                      <div className="d-flex align-items-center menu-item">
                        <img
                          className={`m-icon ${isOpen ? "me-2" : ""}`}
                          src={Reports}
                          alt="Reports.png"
                        />

                        <span className={`fw-semibold m-0 m-title ${isOpen ? "fs-15" : "fs-12 mt-1"}`}>Reports</span>
                      </div>
                      {isOpen && <FaAngleDown className="collapse-icon" />}
                    </div>
                  </LocationPath>
                }
                collapseBody={
                  <div>
                    <div className="">Submenue7</div>
                  </div>
                }
              />
            </div>
          </div>
        </aside>
        <section className={`mainBody `}>
          <Header />
          <MainBody />
        </section>
      </div>
    </>
  );
};

export default Sidebar;
