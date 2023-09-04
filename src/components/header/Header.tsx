import UserOptionDropdown from "./UserOptionsDropdown";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./header.module.scss";
import { firebaseAuthService } from "../../config/firebase";
import { Link } from "react-router-dom";

const Header = () => {
  const [user] = useAuthState(firebaseAuthService);

  return (
    <Link to="/dashboard">
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>AragoK Budget App</h1>
        {!!user && <UserOptionDropdown />}
      </header>
    </Link>
  );
};

export default Header;
