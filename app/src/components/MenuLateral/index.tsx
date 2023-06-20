export const MenuLateral = () => {
  return (
    <section className="bg-[#F2EAE1] w-fit p-4 whitespace-nowrap flex flex-col justify-center gap-8">
      <header className="flex flex-col items-center">
        <img
          className="rounded-full w-32 h-32"
          src="https://dummyimage.com/250x250"
          alt="Image"
        />
        <p className="text-xl font-bold">Nome do usuário</p>
      </header>
      <main className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 justify-center">
          <button className="flex flex-row flex-nowrap gap-2">
            <div className="w-60 h-8 bg-orange-400 rounded-md">
              <p className="text-xl font-bold">Home</p>
            </div>
          </button>
          <button className="flex flex-row flex-nowrap gap-2">
            <div className="w-2 h-8 bg-yellow-300 rounded-md"></div>
            <p className="text-xl font-bold">Ativos</p>
          </button>
          <button className="flex flex-row flex-nowrap gap-2">
            <div className="w-2 h-8 bg-yellow-300 rounded-md"></div>
            <p className="text-xl font-bold">Unidades</p>
          </button>
          <button className="flex flex-row flex-nowrap gap-2">
            <div className="w-2 h-8 bg-yellow-300 rounded-md"></div>
            <p className="text-xl font-bold">Usuários</p>
          </button>
        </div>
        <div className="flex flex-1 items-end justify-center">
          <button className="flex flex-row flex-nowrap gap-2">logout</button>
        </div>
      </main>
    </section>
  );
};
