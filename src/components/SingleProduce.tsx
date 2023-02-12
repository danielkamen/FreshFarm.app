import { Tab } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Category, Farmer, Produce } from "../types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CARTPAGE, HOME } from "../constants/routes";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export default function SingleProduce({ produceId }: { produceId: string }) {
  const navigate = useNavigate();
  const [produce, setProduce] = useState<Produce | null>(null);

  useEffect(() => {
    if (!produceId) {
      navigate(HOME);
    } else {
      const fetchFarmers = async () => {
        const produceRef = doc(db, "products", produceId);
        const produceData = await getDoc(produceRef);

        if (produceData.exists()) {
          const categoryRef = await getDoc<Category>(
            produceData.data().category_id
          );
          if (categoryRef.exists()) {
            const sellerRef = await getDoc<Farmer>(
              produceData.data().seller_id
            );
            if (sellerRef.exists()) {
              const produce = {
                id: produceData.id,
                name: produceData.data().name,
                price: produceData.data().price,
                quantity: produceData.data().quantity,
                picked_on: produceData.data().picked_on,
                category: {
                  id: categoryRef.id,
                  name: categoryRef.data().name,
                  image_url: categoryRef.data().image_url,
                } as Category,
                seller: {
                  id: sellerRef.id,
                  name: sellerRef.data().name,
                  description: sellerRef.data().description,
                  created_at: sellerRef.data().created_at,
                  updated_at: sellerRef.data().updated_at,
                  email_address: sellerRef.data().email_address,
                  image_url: sellerRef.data().image_url,
                  phone_number: sellerRef.data().phone_number,
                  address: sellerRef.data().address,
                } as Farmer,
              } as Produce;
              setProduce(produce);
            } else {
              setProduce(null);
            }
          }
        }
      };
      fetchFarmers();
    }
  }, [produceId, navigate]);

  if (!produce) {
    return null;
  } else {
    return (
      <div className="bg-white">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                <Tab
                  key={produce.category.id}
                  className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4">
                  {({ selected }) => (
                    <>
                      <span className="sr-only"> {produce.category.name} </span>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <img
                          src={produce.category.image_url}
                          alt={produce.category.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </span>
                    </>
                  )}
                </Tab>
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
              <Tab.Panel key={produce.category.id}>
                <img
                  src={produce.category.image_url}
                  alt={produce.category.name}
                  className="h-full w-full object-cover object-center sm:rounded-lg"
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          {/* Produce info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {produce.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Produce information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {formatter.format(produce.price)}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: produce.seller.description,
                }}
              />
            </div>

            <form className="mt-6">
              <div className="sm:flex-col1 mt-10 flex">
                <button
                  type="submit"
                  onClick={() => {
                    navigate(CARTPAGE);
                  }}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary py-3 px-8 text-base font-medium text-white hover:bg-primary-accent sm:w-full">
                  Add to bag
                </button>

                {/* <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <HeartIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Add to favorites</span>
                  </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
