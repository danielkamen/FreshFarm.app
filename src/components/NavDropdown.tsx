import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import { useCategoryContext } from "../contexts/useCategoryContext";
import { useSearchContext } from "../contexts/useSearchContext";

export default function NavDropDown() {
  const { categories } = useCategoryContext();
  const { selectedCategory, setSelectedCategory } = useSearchContext();

  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      {({ open }) => (
        <>
          <div className="relative w-72">
            <Listbox.Button
              className={`relative w-full h-full cursor-pointer ${
                open ? "bg-gray-200" : "bg-gray-100"
              } hover:bg-gray-200 rounded-md py-2 pl-3 pr-10 text-left sm:text-sm`}>
              <span className="flex items-center">
                {selectedCategory !== null ? (
                  <img
                    src={selectedCategory.image_url}
                    alt=""
                    className="h-6 w-6 flex-shrink-0 rounded-full"
                  />
                ) : (
                  <Squares2X2Icon
                    aria-hidden="true"
                    className="h-6 w-6 flex-shrink-0 rounded-full"
                  />
                )}
                <span className="ml-3 block truncate">
                  {selectedCategory !== null
                    ? selectedCategory.name
                    : "All Categories"}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="opacity-0 -translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-250"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-1">
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
                {categories.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    className={({ selected, active }) =>
                      `${
                        active || selected
                          ? "text-white bg-primary"
                          : "text-gray-900"
                      } relative cursor-pointer select-none py-2 pl-3 pr-9`
                    }
                    value={category}>
                    {({ selected }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={category.image_url}
                            alt=""
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal"
                            } ml-3 block truncate`}>
                            {category.name}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
