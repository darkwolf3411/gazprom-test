import React, { FC, useState } from "react";
import { usePagination } from "../../hooks/pagination";
import { useSearch } from "../../hooks/search";
import { useSort } from "../../hooks/sort";
import { IPerson } from "../../models/Person";

interface PersonTablePropsInterface
  extends React.TableHTMLAttributes<HTMLTableElement> {
  data: IPerson[];
  tableName: string;
  pagination?: boolean;
  tableHeadNames: string[];
}

interface PaginationSettings {
  limit: number;
  page: number;
}

const PersonTable: FC<PersonTablePropsInterface> = ({
  data: persons,
  tableHeadNames,
  tableName,
  pagination,
  ...props
}) => {
  const [paginationSettings, setPaginationSettings] =
    useState<PaginationSettings>({
      limit: 5,
      page: 1,
    });
  const [searchValue, setSearchValue] = useState<string>('')

  const [sortField, setSortField] = useState<string>('')

  const [numbersPageArray, paginateArray] = usePagination(
    persons,
    paginationSettings.limit,
    paginationSettings.page
    );
  const personsArray = useSearch(paginateArray,searchValue)

  const sortedPersonArray = useSort(personsArray,sortField)

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }
  const tableHeadHandler = (fieldName: string) => {
    setSortField(fieldName)
  }

  const selectPageSizeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaginationSettings({
      ...paginationSettings,
      page: 1,
      limit: Number(event.target.value),
    });
  };

  return (
    <div>
      <div>
        <h2>{tableName}</h2>
        <input 
        type="text" 
        placeholder="search" 
        value={searchValue} 
        onChange={searchHandler}/>
      </div>
      <table {...props}>
        <thead>
          <tr>
            {tableHeadNames.map((tHeadName) => {
              return <td onClick={()=>{tableHeadHandler(tHeadName)}} key={tHeadName}>{tHeadName}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {sortedPersonArray && sortedPersonArray.map((person) => {
            return (
              <tr onClick={()=>{alert(person.address)}} key={person.id}>
                <td>{person.id}</td>
                <td>{person.first_name}</td>
                <td>{person.last_name}</td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {(pagination && sortedPersonArray.length !==0?true:false) && (
        <div>
          <select
            value={paginationSettings.limit}
            onChange={selectPageSizeHandler}
          >
            <option value="5">5</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>
            {sortedPersonArray[0].id}-{sortedPersonArray[sortedPersonArray.length - 1].id}
            of {persons.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default PersonTable;
