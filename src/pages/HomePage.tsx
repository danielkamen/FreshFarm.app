import Navigation from "../components/Navigation";
import About from "../components/About";
import Callout from "../components/Callout";
import ProductPage from "./ProductPage";

export default function HomePage() {

  return (
    <div>
        <>
          <Navigation />
          <About />
          <Callout />
        </>
    </div>
  );
}
