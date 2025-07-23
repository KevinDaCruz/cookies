import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleLogout = async () => {
      try {
        // (1) Appel API pour notifier la déconnexion (facultatif selon ton backend)
        const authData = JSON.parse(localStorage.getItem("auth"));
        const token = authData?.token;

        if (token) {
          await fetch("https://offers-api.digistos.com/api/auth/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
        }
      } catch (err) {
        console.error("Erreur lors de la déconnexion :", err);
      }

      // (2) Suppression du token côté frontend
      localStorage.removeItem("auth");

      // (3) Redirection vers la page de login
      navigate("/connexion");
    };

    handleLogout();
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
