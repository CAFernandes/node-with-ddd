import { useState } from "react";
import { MenuLateral } from "./MenuLateral";
import { Actives } from "./Actives";
import { Home } from "./Home";
import { Units } from "./Units";
import { Users } from "./Users";
import { Companys } from "./Companys";

export const Admin = () => {
  const views = ["Home", "Companys", "Units", "Actives", "Users"];
  const [activeView, setActiveView] = useState(views[0]);
  return (
    <main className="grid grid-cols-[min-content_1fr] h-screen">
      <MenuLateral
        views={views}
        active={activeView}
        changeView={setActiveView}
      />
      <section className="bg-gray-100 w-full p-4">
        {activeView == "Home" && <Home />}
        {activeView == "Companys" && <Companys />}
        {activeView == "Actives" && <Actives />}
        {activeView == "Units" && <Units />}
        {activeView == "Users" && <Users />}
      </section>
    </main>
  );
};
