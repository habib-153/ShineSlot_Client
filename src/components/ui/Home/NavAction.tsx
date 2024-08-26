import { Link } from "react-router-dom";
import CustomButton2 from "../Buttons/CustomButton2";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const NavAction = () => {
    const user = useAppSelector(selectCurrentUser)
    return (
        <div className="flex items-center gap-2">
            {user ? (
        <>
          <Link to="/dashboard">
            <CustomButton2 text="Dashboard" bgColor="#FFFFFF" textColor="#111111" />
          </Link>
          <Link to="/logout">
            <CustomButton2 text="Logout" textColor="#FFFFFF" />
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <CustomButton2 text="Login" bgColor="#FFFFFF" textColor="#111111" />
          </Link>
          <Link to="/signUp">
            <CustomButton2 text="Sign Up" textColor="#FFFFFF" />
          </Link>
        </>
      )}
        </div>
    );
};

export default NavAction;