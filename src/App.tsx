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
      {<PersonTable
          data={data}
          isError={!!error}
          isLoading={isFetching}
          tableName={"Person Table"}
          tableHeadNames={["ID", "First name", "Last name", "Email", "Phone Number"]}
          tableSortKey={["id", "firstName", "lastName", "email", "phone"]}
          pagination={true}
        />}
    </div>
  );
};

export default App;
