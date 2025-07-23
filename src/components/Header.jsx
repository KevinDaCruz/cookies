import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import "../assets/styles/Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const auth = localStorage.getItem("auth");
      if (auth) {
        try {
          const { token, expiresAt } = JSON.parse(auth);
          if (token) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (e) {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLogin();

    window.addEventListener("storage", checkLogin);
    window.addEventListener("login", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("login", checkLogin);
    };
  }, []);

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Accueil
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/publiques">
            Offres Publiques
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/professionnelles">
            Offres Professionnelles
          </Nav.Link>

          {!isLoggedIn && (
            <>
              <Nav.Link as={NavLink} to="/inscription">
                Inscription
              </Nav.Link>
              <Nav.Link as={NavLink} to="/connexion">
                Connexion
              </Nav.Link>
            </>
          )}

          {isLoggedIn && (
            <Nav.Link as={NavLink} to="/deconnexion">
              Déconnexion
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
