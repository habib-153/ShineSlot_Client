import { Link } from "react-router-dom";
import CustomButton2 from "../Buttons/CustomButton2";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  logout,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";

const NavAction = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <Link to={`/${user.role}/dashboard`}>
            <CustomButton2
              text="Dashboard"
              bgColor="#FFFFFF"
              textColor="#111111"
            />
          </Link>
          <div onClick={handleLogout}>
            <CustomButton2 text="Logout" textColor="#FFFFFF" />
          </div>
        </>
      ) : (
        <>
          <Link to="/signUp">
            <CustomButton2 text="Sign Up" bgColor="#FFFFFF" textColor="#111111" />
          </Link>
          <Link to="/login">
            <CustomButton2 text="Login" textColor="#FFFFFF" />
          </Link>
        </>
      )}
    </div>
  );
};

export default NavAction;
