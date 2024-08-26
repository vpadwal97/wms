import profilePic from "../../assets/img/blank-profile-pic.png";
import Dashboard from "../../assets/img/Dashboard.png";
import Setup from "../../assets/img/Setup.png";
import Manager from "../../assets/img/Manager.png";
import Master from "../../assets/img/Master.png";
import Inventory from "../../assets/img/Inventory.png";
import Purchase from "../../assets/img/Purchase.png";
import Sales from "../../assets/img/Sales.png";
import Reports from "../../assets/img/Reports.png";



export const TempVariable = {
  Menu: [
    { mName: "dashboard", mImg: Dashboard, mLink: "/dashboard", mTitle: "Dashboard" },
    {
      mName: "setup",
      mImg: Setup,
    //   mLink: "/setup",
      mTitle: "Setup",
      subM: [
        {
          smName: "ChatApp",
          smTitle: "sub Setup 1",
          smLink: "/setup/ChatApp",
        },
        {
          smName: "ScreenShare",
          smTitle: "sub Setup 2",
          smLink: "/setup/ScreenShare",
        },
      ],
    },
    {
      mName: "userManager",
      mImg: Manager,
    //   mLink: "/user",
      mTitle: "User Manager",
      subM: [
        {
          smName: "subUserManager1",
          smTitle: "sub UserManager 1",
          smLink: "/subUserManager1",
        },
      ],
    },
    {
      mName: "master",
      mImg: Master,
    //   mLink: "/master",
      mTitle: "Master",
      subM: [
        {
          smName: "subMaster1",
          smTitle: "sub Master 1",
          smLink: "/subMaster1",
        },
      ],
    },
    {
      mName: "inventoryManagment",
      mImg: Inventory,
    //   mLink: "/inventory",
      mTitle: "Inventory Managment",
      subM: [
        {
          smName: "subInventoryManagment1",
          smTitle: "sub InventoryManagment 1",
          smLink: "/subInventoryManagment1",
        },
      ],
    },
    {
      mName: "purchase",
      mImg: Purchase,
    //   mLink: "/purchase",
      mTitle: "Purchase",
      subM: [
        {
          smName: "subPurchase1",
          smTitle: "sub Purchase 1",
          smLink: "/subPurchase1",
        },
      ],
    },
    {
      mName: "sales",
      mImg: Sales,
    //   mLink: "/sales",
      mTitle: "Sales",
      subM: [
        {
          smName: "subSales1",
          smTitle: "sub Sales 1",
          smLink: "/subSales1",
        },
      ],
    },
    {
      mName: "reports",
      mImg: Reports,
    //   mLink: "/reports",
      mTitle: "Reports",
      subM: [
        {
          smName: "subReports1",
          smTitle: "sub Reports 1",
          smLink: "/subReports1",
        },
      ],
    },
  ],
};
