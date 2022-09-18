import { useState } from "react";
import { Outlet } from "react-router-dom";
import MenuToogle from "./MenuToggle";
import Drawer from "./Drawer";

const Layout = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenuHandler = () => {
    setMenu(!menu);
  };

  return (
    <>
      <Drawer isOpen={menu} />
      <MenuToogle onToggle={toggleMenuHandler} isOpen={menu} />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
