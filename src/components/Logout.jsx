import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/authSlice.js";

const Logout = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (token) {
          const response = await fetch(
            "https://offers-api.digistos.com/api/auth/logout",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            const datas = await response.json();
            throw new Error(
              `HTTP error: ${datas.message} (status: ${response.status})`
            );
          }
        } else {
          throw new Error("Missing Token");
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        dispatch(logout());
        navigate("/connexion");
      }
    };

    handleLogout();
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
