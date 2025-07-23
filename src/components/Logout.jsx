import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem("auth"));
        const token = authData?.token;

        if (token) {
          const response = await fetch(
            "https://offers-api.digistos.com/api/auth/logout",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message || "Échec de la déconnexion côté serveur.");
          }
        } else {
          console.error(
            "Aucun token trouvé, aucune requête envoyée au serveur."
          );
        }
      } catch (err) {
        console.error("Erreur lors de la déconnexion :", err);
      } finally {
        localStorage.removeItem("auth");
        navigate("/connexion");
      }
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;
