import Navigation from "../components/Navigation";
import About from "../components/About";
import Callout from "../components/Callout";
import { useUserContext } from "../contexts/useUserContext";
import ProductPage from "./ProductPage";

export default function HomePage() {
  const { user } = useUserContext();

  return (
    <div>
      {user ? (
        <ProductPage />
      ) : (
        <>
          <Navigation />
          <About />
          <Callout />
        </>
      )}
    </div>
  );
}
