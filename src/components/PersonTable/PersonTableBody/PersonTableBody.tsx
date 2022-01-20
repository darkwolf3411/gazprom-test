import React, { FC, useState } from "react";
import { IPerson } from "../../../models/Person";
import { SortSettings } from "../PersonTable";
//@ts-ignore
import styles from "./pTableBody.module.scss";

interface Props extends React.TableHTMLAttributes<HTMLTableElement> {
  persons: IPerson[];
  tableHeadNames: string[];
  sortSettings: SortSettings;
  tableSortKey: string[];
  onSelectSort: (event: string) => void;
  onSelectPerson: (event: IPerson) =>void;
}

const PersonTableBody: FC<Props> = ({
  persons,
  tableHeadNames,
  tableSortKey,
  sortSettings,
  onSelectSort,
  onSelectPerson,
  ...props
}) => {
  const onPersonSelectHandler =(event: IPerson)=>{
    onSelectPerson(event)
  }
  const directionArrow = (index: number) => {
    if (sortSettings.sortName == tableSortKey[index]) {
      return sortSettings.sortDirection ? "⏷" : "⏶";
    }
  };
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
        <tbody className={styles.tableBodyWrapper}>
          {persons.map((person) => {
            return (
              <tr onClick={()=>{onPersonSelectHandler(person)}} key={person.id}>
                <td>{person.id}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PersonTableBody;