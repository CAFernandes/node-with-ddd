import { MenuLateral } from "./components/MenuLateral";

function App() {
  return (
    <main className="w-screen h-screen grid grid-cols-[min-content_1fr]">
      <MenuLateral />
      <div className="bg-blue-200"></div>
    </main>
  );
}

export default App;
