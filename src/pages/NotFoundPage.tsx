import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { HOME } from "../constants/routes";

export default function ErrorPage() {
  return (
    <div className="min-h-full grid bg-white ">
      <header>
        <Navigation />
      </header>
      <main className="place-items-center py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-500">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={HOME}
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-primary-accent ">
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
