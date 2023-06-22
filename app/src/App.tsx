import { useEffect, useState } from "react";
import { AuthContext, User } from "./context/AuthContext";
import { Auth } from "./views/Auth";
import { Admin } from "./views/Admin";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const login = async (username: string, password: string) => {
    const user = {
      id: 1,
      name: "John Doe",
      username,
      password,
    };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  useEffect(() => {
    // Recupera os dados do usuário do local storage ou session storage
    const storedUser = localStorage.getItem("user");
    // const storedUser = sessionStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <main className="w-screen h-screen">
        {!user ? <Auth login={login}></Auth> : <Admin></Admin>}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
