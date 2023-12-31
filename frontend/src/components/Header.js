import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Navbar } from "react-bootstrap";
import "../css/components/Header.css";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && (
        <Navbar
          id="searchNavbar"
          className="custom-navbar d-flex justify-content-center"
          expand="lg"
        >
          <SearchBar />
        </Navbar>
      )}
    </>
  );
};

export default Header;
