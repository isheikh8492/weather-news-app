import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return <header>{!isHomePage && <SearchBar />}</header>;
};

export default Header;
