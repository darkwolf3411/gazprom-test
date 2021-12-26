import { useState } from "react";
import PersonTable from "./components/PersonTable/PersonTable";
import { personApi } from "./services/person";

type FetchPersonSizeType = "bigger" | "small";

const App = () => {
  const [fetchSize, setFetchSize] = useState<FetchPersonSizeType>("small");
  const { data, error, isFetching } =
    personApi.useGetAllPersonQuery(fetchSize);
  return (
    <div>
      <button onClick={() => setFetchSize("small")}>Маленький список</button>
      <button onClick={() => setFetchSize("bigger")}>Большой список</button>
      {isFetching && <h1>Идет загрузка</h1>}
      {error && <h1>Ошибка при загрузке</h1>}
      {data && (
        <PersonTable
          data={data}
          tableName={"Person Table"}
          tableHeadNames={["Id", "firstName", "lastName", "Email", "Phone"]}
          pagination={true}
        />
      )}
    </div>
  );
};

export default App;
