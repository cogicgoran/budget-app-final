import styles from "./backdrop.module.scss";

interface Props {
  onCancel: any;
}

function Backdrop(props: Props) {
  return <div className={styles.backdrop} onClick={props.onCancel}></div>;
}

export default Backdrop;
