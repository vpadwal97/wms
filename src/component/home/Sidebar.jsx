import CollapseWrapper from "../reusableComp/CollapseWrapper";
import profilePic from "../../assets/img/blank-profile-pic.png";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import MenuBarCloseIcon from "../reusableComp/MenuBarCloseIcon";
import MainBody from "./MainBody";
import Header from "./Header";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { TempVariable } from "../reusableComp/TempVariable";
import LocationPathFun from "../reusableComp/LocationPathFun";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const childRef = useRef();
  const menuContent = TempVariable.Menu;

  const handleCollapseClose = () => {
    if (childRef.current) {
      childRef.current.triggerFunction();
    }
  };

  const handleSidebarClose = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      handleCollapseClose();
    }
  };

  return (
    <>
      <div className={`mainCon d-flex w-100 ${isOpen ? "active" : ""}`}>
        <aside
          className={`sidebarCon overflow-y-auto h-100 bg-primary position-fixed z-1`}
        >
          <div className="sidebar">
            <div className="profile-detail-holder px-3 py-2 text-center text-white">
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
                onClick={handleSidebarClose}
              >
                <MenuBarCloseIcon openClose={isOpen} color="white" />
              </button>
            </div>
            <div>
              {menuContent?.map((mItem, index) => (
                <CollapseWrapper
                  msetIsOpen={setIsOpen}
                  mIsOpen={isOpen}
                  ref={childRef}
                  btnLink={mItem.mLink || null}
                  buttonClass={`px-2 py-2 border-0 w-100 text-start rounded-0 menu-btn ${LocationPathFun(
                    mItem.mLink ? mItem.mLink : ""
                  )}`}
                  buttonLabel={
                    // <LocationPath to={mItem.mLink ? mItem.mLink : ""}>
                    <div
                      className={`d-flex align-items-center ${
                        isOpen
                          ? "justify-content-between"
                          : "justify-content-center"
                      }`}
                    >
                      <div className="d-flex align-items-center menu-item">
                        <img
                          className={`m-icon ${isOpen ? "me-2" : ""}`}
                          src={mItem.mImg}
                          alt={mItem.mName}
                        />

                        <span
                          className={`fw-semibold m-0 m-title ${
                            isOpen ? "fs-15" : "fs-12 mt-1 text-center"
                          }`}
                        >
                          {mItem.mTitle}
                        </span>
                      </div>
                      {!mItem.mLink && (
                        <>
                          {isOpen && <FaAngleDown className="collapse-icon" />}
                        </>
                      )}
                    </div>
                    // </LocationPath>
                  }
                  collapseBody={
                    !mItem.mLink && mItem.subM?.length > 0 ? (
                      <div className="p-2 border-bottom border-white">
                        {mItem.subM?.map((sunMItem, index) => (
                          <div className="ps-2 p-1">
                            <NavLink
                              to={sunMItem.smLink}
                              className="text-decoration-none text-white-psecondry w-100 rounded-0 fw-semibold d-flex align-items-center"
                              onClick={handleCollapseClose}
                            >
                              {/* <FaAngleRight className="me-1"/> */}
                              {sunMItem.smName}
                            </NavLink>
                          </div>
                        ))}
                      </div>
                    ) : null
                  }
                />
              ))}
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
