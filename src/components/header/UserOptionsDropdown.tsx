import React, { MouseEvent, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { IconChevronDown } from "../icons/ChevronDown";
import { IconCircleUser } from "../icons/CircleUser";
import styles from "./userLoggedDisplay.module.scss";
import { firebaseAuthService } from "../../config/firebase";
import Language from "../language/Language";

const UserOptionDropdown: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user] = useAuthState(firebaseAuthService);
  const { t } = useTranslation();
  const [signOut, loading, error] = useSignOut(firebaseAuthService);

  const textLogout = t("logout");
  const textLanguage = t("language");

  async function handleLogout() {
    try {
      await signOut();
    } catch (error) {
      alert("Sign out error occurred");
    }
  }

  function handleDropdownClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setShowDropdown((prevState) => !prevState);
  }

  return (
    <div
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      <div className={styles.displayUserLogged}>
        <div className={styles.userDropdownLabel} onClick={handleDropdownClick}>
          <IconCircleUser key="userIcon" />
          <IconChevronDown key="arrowDown" />
        </div>
        {showDropdown && (
          <>
            <div className={styles.displayUserDropdown}>
              {!!user && <div onClick={handleLogout}>{textLogout}</div>}
              <div>
                {textLanguage}
                <Language />
              </div>
            </div>
          </>
        )}
      </div>
      {showDropdown && (
        <div
          className={styles.dropdownBackground}
          onClick={handleDropdownClick}
        ></div>
      )}
    </div>
  );
};

export default UserOptionDropdown;
