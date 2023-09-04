import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuthService } from "../../config/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function AuthenticationPage() {
  const [user] = useAuthState(firebaseAuthService);
  const [showSignIn, setShowSignIn] = useState(true);
  const navigate = useNavigate();

  if (user) {
    navigate("/dashboard");
    return null;
  }

  return (
    <>
      {showSignIn && <SignIn onToggleForm={setShowSignIn} />}
      {!showSignIn && <SignUp onToggleForm={setShowSignIn} />}
    </>
  );
}

export default AuthenticationPage;
