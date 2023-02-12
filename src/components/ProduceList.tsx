import {
  ChevronRightIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";

import { Link } from "react-router-dom";
import { Produce } from "../types";
import { PRODUCEPAGE } from "../constants/routes";

export default function ProduceList({ produce }: { produce: Array<Produce> }) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {produce.map((produce) => (
          <li key={produce.id}>
            <Link
              to={`${PRODUCEPAGE}/${produce.id}`}
              className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-gray-600">
                        {produce.name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <CurrencyDollarIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">{produce.price}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
