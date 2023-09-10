import UserOptionDropdown from "./UserOptionsDropdown";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/dashboard">
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>AragoK Budget App</h1>
        <UserOptionDropdown />
      </header>
    </Link>
  );
};

export default Header;
