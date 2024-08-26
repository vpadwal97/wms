import Header from "./Header";
import MainBody from "./MainBody";
import Sidebar from "./Sidebar";

const Home = () => {
    
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <>
          {/* <Header /> */}
      {/* <div className={`sidebarCon d-flex ${isOpen ? "active" : ""}`}> */}
      {/* <div className={`sidebar-con h-100 bg-primary position-relative z-1`}>
        <button className={`sidebar-button btn btn-primary rounded-circle mt-3 position-fixed top-0 px-2 start- 100 translate-middle-x `} onClick={() => setIsOpen(!isOpen)}>
        <MenuBarCloseIcon openClose={isOpen} color="white"/>
        </button> */}

        <Sidebar />
      {/* </div> */}
        {/* <div className={`mainBody `}>
          <MainBody />
        </div> */}
      {/* </div> */}
    </>
  );
};

export default Home;
