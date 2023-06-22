import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

type MenuLateralProps = {
  views: string[];
  active: string;
  changeView: Dispatch<SetStateAction<string>>;
};
export const MenuLateral = ({
  views,
  active,
  changeView,
}: MenuLateralProps) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <section className="bg-gray-200 w-fit p-4 whitespace-nowrap flex flex-col justify-center gap-8">
      <header className="flex flex-col items-center">
        Welcome!
        <p className="text-xl font-bold">{user?.name}</p>
      </header>
      <main className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 justify-center">
          {views.map((view: string, index: number) => (
            <button
              className="flex flex-row flex-nowrap gap-2 transition-all duration-300 hover:cursor-pointer hover:scale-105"
              key={index}
              onClick={() => changeView(view)}
            >
              {view === active ? (
                <div className="w-60 h-8 bg-gray-800 rounded-md">
                  <p className="text-xl font-bold text-white">{view}</p>
                </div>
              ) : (
                <>
                  <div className="w-2 h-8 bg-gray-600 rounded-md"></div>
                  <p className="text-xl font-bold text-gray-600">{view}</p>
                </>
              )}
            </button>
          ))}
        </div>
        <div className="flex flex-1 items-end justify-center">
          <button
            className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            onClick={() => logout()}
          >
            logout
          </button>
        </div>
      </main>
    </section>
  );
};
