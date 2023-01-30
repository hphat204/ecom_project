import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { getProducts } from "./api";
function App() {
  return (
    <div className="mx-auto font-poppins bg-bgColor h-auto">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;

export function loader() {
  return getProducts();
}
