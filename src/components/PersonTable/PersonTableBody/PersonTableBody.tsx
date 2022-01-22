import React, { FC, useState } from "react";
import { IPerson } from "../../../models/Person";
import { SortSettings } from "../PersonTable";
import classNames from "classnames/bind";
//@ts-ignore
import styles from "./pTableBody.module.scss";

interface Props extends React.TableHTMLAttributes<HTMLTableElement> {
  persons: IPerson[];
  tableHeadNames: string[];
  isLoading: boolean;
  isError: boolean;
  limit: number;
  sortSettings: SortSettings;
  tableSortKey: string[];
  onSelectSort: (event: string) => void;
  onSelectPerson: (event: IPerson) =>void;
}

let cx = classNames.bind(styles);

const PersonTableBody: FC<Props> = ({
  persons,
  isLoading,
  limit,
  isError,
  tableHeadNames,
  tableSortKey,
  sortSettings,
  onSelectSort,
  onSelectPerson,
  ...props
}) => {
  const setLoadingArr =()=> {
    const mockColums = []
    for (let i = 1; i < limit; i++) {
      mockColums.push(<tr key={i}>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>)
    }
    return mockColums
  }
  const onPersonSelectHandler =(event: IPerson)=>{
    onSelectPerson(event)
  }
  const directionArrow = (index: number) => {
    if (sortSettings.sortName == tableSortKey[index]) {
      return sortSettings.sortDirection ? "⏷" : "⏶";
    }
  };
  let tBodyWrapper = cx({
    bodyBase: true,
    preloading: isLoading
  });
  return (
    <div className={styles.wrapper}>
      <table className={styles.tableWrapper} {...props}>
        <thead className={styles.tableHeadWrapper}>
          <tr>
            {tableHeadNames.map((tHeadName, index) => {
              return (
                <td
                  onClick={() => onSelectSort(tableSortKey[index])}
                  key={tableSortKey[index]}
                >
                  {directionArrow(index)}
                  {tHeadName}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody className={tBodyWrapper}>
          {!isLoading?
          persons.map((person) => {
            return (
              <tr onClick={()=>{onPersonSelectHandler(person)}} key={person.id}>
                <td>{person.id}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
              </tr>
            );
          })
          :<>{setLoadingArr()}</>}
        </tbody>
      </table>
      {isError&&<h4>Load error</h4>}
    </div>
  );
};

export default PersonTableBody;
