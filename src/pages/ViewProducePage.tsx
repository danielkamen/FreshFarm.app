import { useNavigate, useParams } from "react-router-dom";
import SingleProduce from "../components/SingleProduce";
import Navigation from "../components/Navigation";
import { HOME } from "../constants/routes";

export default function ViewProducePage() {
  const { produceId } = useParams();
  const navigate = useNavigate();

  if (!produceId) {
    navigate(HOME);
    return null;
  } else {
    return (
      <div className="min-h-full">
        <header>
          <Navigation />
        </header>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SingleProduce produceId={produceId} />
          </div>
        </div>
      </div>
    );
  }
}
