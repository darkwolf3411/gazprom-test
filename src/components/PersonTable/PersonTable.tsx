import React, { FC, useState } from "react";
import { usePersons } from "../../hooks/usePerson.hook";
import { IPerson } from "../../models/Person";
import PersonTableBody from "./PersonTableBody/PersonTableBody";
import PersonTableFooter from "./PersonTableFooter/PersonTableFooter";
import PersonTableHeader from "./PersonTableHeader/PersonTableHeader";
//@ts-ignore
import styles from "./personTable.module.scss";

interface Props extends React.TableHTMLAttributes<HTMLTableElement> {
  data: IPerson[];
  tableName: string;
  pagination?: boolean;
  tableHeadNames: string[];
  tableSortKey: string[];
}

interface PaginationSettings {
  limit: number;
  page: number;
}
export interface SortSettings {
  sortName: string;
  sortDirection: boolean;
}

const PersonTable: FC<Props> = ({
  data,
  tableHeadNames,
  tableSortKey,
  tableName,
  pagination,
}) => {
  const [paginationSettings, setPaginationSettings] =
    useState<PaginationSettings>({
      limit: 5,
      page: 1,
    });
  const [searchValue, setSearchValue] = useState<string>("");

  const [sortSettings, setSortSettings] = useState<SortSettings>({
    sortName: "id",
    sortDirection: true,
  });

  const persons = usePersons(
    data,
    paginationSettings.limit,
    paginationSettings.page,
    searchValue,
    sortSettings.sortName,
    sortSettings.sortDirection
  );

  const searchHandler = (event: string) => {
    setSearchValue(event);
  };
  const tableHeadHandler = (sortName: string) => {
    setSortSettings({
      ...sortSettings,
      sortName,
      sortDirection: !sortSettings.sortDirection,
    });
  };

  const changeLimitHandler = (limit: number) => {
    setPaginationSettings({
      limit,
      page: 1,
    });
  };
  const changePageHandler = (event: number) => {
    setPaginationSettings({
      ...paginationSettings,
      page: event,
    });
  };

  return (
    <div className={styles.tableWrapper}>
      <PersonTableHeader onSearch={searchHandler} tableName={tableName} />
      <div className={styles.tableBodyWrapper}>
        {persons.array.length != 0 ? (
          <PersonTableBody
            sortSettings={sortSettings}
            onSelectSort={tableHeadHandler}
            persons={persons.array}
            tableHeadNames={tableHeadNames}
            tableSortKey={tableSortKey}
          />
        ) : (
          <div>
            <h3>Данные не найдены</h3>
          </div>
        )}
      </div>
      {(pagination && persons.array.length !== 0 ? true : false) && (
        <PersonTableFooter
          currentPage={paginationSettings.page}
          limit={paginationSettings.limit}
          onSelectChange={changeLimitHandler}
          totalCount={persons.searchLenght}
          onPageChange={changePageHandler}
        />
      )}
    </div>
  );
};

export default PersonTable;
