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
}
interface seceltPerson {
  isSelect: boolean;
  person: IPerson | null;
}
const PersonTableBody: FC<Props> = ({
  persons,
  tableHeadNames,
  tableSortKey,
  sortSettings,
  onSelectSort,
  ...props
}) => {
  const [selecteblPerson, setSelecteblPerson] = useState<seceltPerson>({
    isSelect: false,
    person: null,
  });
  const onSelectPersonHandler=(event: IPerson)=>{
    setSelecteblPerson({
      isSelect: selecteblPerson.person?.id==event.id?!selecteblPerson.isSelect:true,
      person: event,
    })
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
              <>
              <tr onClick={()=>{onSelectPersonHandler(person)}} key={person.id}>
                <td>{person.id}</td>
                <td>{person.first_name}</td>
                <td>{person.last_name}</td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
              </tr>
              {(selecteblPerson.isSelect && selecteblPerson.person!.id == person.id)&&
              <tr>
                <div>
                  <h3>хуй</h3>
                </div>
              </tr>}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PersonTableBody;
