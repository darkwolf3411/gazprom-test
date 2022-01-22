import React, { FC } from "react";
import { IPerson } from "../../../models/Person";
//@ts-ignore
import {ReactComponent as CloseLogo} from '../../../assets/svg/x-svgrepo-com.svg';
//@ts-ignore
import styles from "./infoBlock.module.scss"

interface Props {
  person: IPerson;
  onClose:()=>void;
}

const MoreInformaitonBlock: FC<Props> = ({ person, onClose }) => {
    const onCloseHandler=()=>{
        onClose()
    }
  return (
    <div className={styles.infoWrapper}>
      <div className={styles.infoHeaderWrapper}>
        <h4>
          Select Person: {person.firstName} {person.lastName}
        </h4>
        <CloseLogo onClick={onCloseHandler} />
      </div>
      <div className={styles.infoDescriptionWrapper}>
        <span>Description:</span>
        <textarea name="description" readOnly value={person.description} />
      </div>
      <div className={styles.infoAdressWrapper}>
        <span>Adress: {person.address}</span>
      </div>
    </div>
  );
};

export default MoreInformaitonBlock;
