import { NavLink, Outlet } from "react-router-dom";

const Setup = () => {
  return (
    <>
      <h4 className="page-title">Setup</h4>
      <div className="text-center">
        <span>
          <NavLink
            to="ChatApp"
            className="btn btn-primary menu-btn rounded-0 w-25"
          >
            ChatApp
          </NavLink>
          <NavLink
            to="ScreenShare"
            className="btn btn-primary menu-btn rounded-0 w-25"
          >
            ScreenShare
          </NavLink>
        </span>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Setup;
// import React, { useCallback, useState } from 'react';

// function Button({ onClick }) {
//   console.log('Button rendered');
//   return <button onClick={onClick}>Click Me</button>;
// }

// function Setup() {
//   const [count, setCount] = useState(0);

//   // Memoize the handleClick function
//   const handleClick = useCallback(() => {
//     console.log('Button clicked');
//     setCount(count + 1);
//   }, [count]); // Dependencies array

//   return (
//     <div>
//       <Button onClick={handleClick} />
//       <p>Count: {count}</p>
//     </div>
//   );
// }

// export default Setup;
