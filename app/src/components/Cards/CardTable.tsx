type Color = "light" | "dark";
type Column = string[];
type Data = Record<string, string | number | Date | Record<string, unknown>>[];
type CardTableProps = {
  color?: Color;
  title?: string;
  columns?: Column;
  data?: Data;
};

export default function CardTable({
  color = "dark",
  title,
  columns,
  data,
}: CardTableProps) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-gray-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-gray-700" : "text-white")
                }
              >
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {columns &&
                  columns.map((column, index) => (
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-gray-50 text-gray-500 border-gray-100"
                          : "bg-gray-800 text-gray-300 border-gray-700")
                      }
                      key={index}
                    >
                      {column}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td
                        className={
                          "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 " +
                          (color === "light"
                            ? "bg-gray-100 text-gray-500 border-gray-100"
                            : "bg-gray-800 text-gray-300 border-gray-700")
                        }
                        key={index}
                      >
                        {(index == 3 && defineState(value as string)) ||
                          (index == 4 && defineHealth(value as string)) ||
                          (index == 5 && new Date(value).toLocaleString()) ||
                          (value as string)}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const defineState = (state = "") => {
  if (state == "Alerta") {
    return (
      <>
        <i className="fas fa-circle text-orange-500 mr-2"></i> alert
      </>
    );
  }
  if (state == "Parado") {
    return (
      <>
        <i className="fas fa-circle text-red-500 mr-2"></i> stoped
      </>
    );
  }
  return (
    <>
      <i className="fas fa-circle text-teal-500 mr-2"></i> Running
    </>
  );
};
const defineHealth = (healthLevel = "0") => {
  return (
    <div className="flex items-center">
      <span className="mr-2">{healthLevel}%</span>
      <div className="relative w-full">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
          <div
            style={{ width: `${healthLevel}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${defineHeathGravity(
              healthLevel
            )}`}
          ></div>
        </div>
      </div>
    </div>
  );
};
const defineHeathGravity = (healthLevel = "0") => {
  const level = parseInt(healthLevel);
  if (isNaN(level)) {
    return "bg-gray-500";
  }
  if (level < 30) {
    return "bg-red-500";
  }
  if (level < 60) {
    return "bg-orange-500";
  }
  return "bg-green-500";
};
