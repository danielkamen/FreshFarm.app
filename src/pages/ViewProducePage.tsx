import { useParams } from "react-router-dom";
import SingleProduce from "../components/SingleProduce";
import Navigation from "../components/Navigation";

export default function ViewProducePage() {
  const { produceId } = useParams();

  return (
    <div>
      <header>
        <Navigation />
      </header>
      <div className=" py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SingleProduce />
        </div>
      </div>
    </div>
  );
}
