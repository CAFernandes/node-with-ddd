import CardTable from "../../../components/Cards/CardTable";

export const Units = () => {
  const columns = [
    "Active",
    "Model",
    "Proprietary",
    "Status",
    "Health Level",
    "Last Update",
    "Actions",
  ];
  const state = ["Alerta", "Parado", "Em Execução"];
  const data = [
    {
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
      7: "",
    },
    {
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
      7: "",
    },
    {
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
      7: "",
    },
    {
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
      7: "",
    },
    {
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
      7: "",
    },
    {
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
      7: "",
    },
    {
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
      7: "",
    },
    {
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
      7: "",
    },
    {
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
      7: "",
    },
    {
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
      7: "",
    },
    {
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
      7: "",
    },
  ];
  return (
    <div>
      <h1 className="text-4xl font-bold">Units</h1>
      <div className="relative pb-32 pt-12">
        <CardTable color="dark" title="Actives" columns={columns} data={data} />
      </div>
    </div>
  );
};
