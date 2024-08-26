// import logoWMS from "../../assets/img/WMS_logo.png";
import logoWMS from "../../assets/img/active-user.png";
import resetPass from "../../assets/img/Reset-pass.png";
import logout from "../../assets/img/logout.png";
import { MdLogout, MdOutlineLockReset } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearLoginData, setLogin } from "../../redux/appSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearLoginData());
    dispatch(setLogin(false));
    navigate("/Login");
  };
  return (
    <>
      <section
        className="position-sticky top-0 d-flex flex-row justify-content-evenly border-bottom p-3 bg-white"
        id="right-nav"
      >
        <Link to="/" className="lh-1">
          <img src={logoWMS} className="logo-img img-fluid" />
        </Link>
        <div className="search-sec w-50">
          <h5 className="search-heading fs-20 text-center text-primary mb-2">
            Welcom to WMS
          </h5>
          <div className="position-relative">
            <input
              type="text"
              className="form-control search"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="position-absolute top-50 end-0 mx-2 translate-middle-y" />
          </div>
        </div>
        <div className="btn-con">
          <p className="my-2">
            <button className="btn btn-link text-primary-psecondry p-0 text-decoration-none fw-semibold">
              <MdOutlineLockReset className="fs-3 me-1" />
              Change Password
            </button>
          </p>
          <p className="my-2">
            <button
              className="btn btn-link text-primary-psecondry p-0 text-decoration-none fw-semibold"
              onClick={handleLogout}
            >
              <MdLogout className="fs-4 me-1" />
              Logout
            </button>
          </p>
        </div>
      </section>
    </>
  );
};

export default Header;
