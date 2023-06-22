import { useState } from "react";
import { CardTableActives } from "../../../components/Cards/CardTableActives";
import { UnitsDelete } from "../../../components/Modal/UnitsDelete";
import { UnitsSee } from "../../../components/Modal/UnitsSee";

export const Units = () => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalSeeOpen, setIsModalSeeOpen] = useState(false);

  const [row, setRow] = useState({} as any);
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
  const rows = [
    {
      0: Date.now().toString(),
      1: "Primeiro Ativo",
      2: "ferrari",
      3: "Joe Doe",
      4: state[Math.floor(Math.random() * 3)],
      5: Math.floor(Math.random() * 100),
      6: Date.now(),
    },
  ];

  const handleOpenDeleteModal = (id: string) => {
    setIsModalDeleteOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };
  const handleConfirmDeleteModal = () => {
    console.log('Confirmação realizada com sucesso!');
    setIsModalDeleteOpen(false);
  };

  const handleCloseSeeModal = () => {
    setIsModalSeeOpen(false);
  };

  const handleEdit = (id: string) => {
    const searchedRow = rows.filter((active) => active[0] == id)
    setRow(searchedRow[0]);
    console.log("edit", id);
  };
  const handleSee = (id: string) => {
    const searchedRow = rows.filter((active) => active[0] == id)
    setIsModalSeeOpen(true);
    setRow(searchedRow[0]);
    console.log("see", id);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Units</h1>
      <div className="relative pb-32 pt-12">
        <CardTableActives
          color="light"
          title="Actives"
          columns={columns}
          rows={rows}
          onSee={handleSee}
          onDelete={handleOpenDeleteModal}
          onEdit={handleEdit}
        />
        <UnitsSee isOpen={isModalSeeOpen} onClose={handleCloseSeeModal} row={row} />
        <UnitsDelete
          message="Are you sure you want to delete this unit?"
          isOpen={isModalDeleteOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDeleteModal}
        />
      </div>
    </div>
  );
};
