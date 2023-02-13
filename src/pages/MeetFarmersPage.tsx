import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { Farmer } from "../types";
import Navigation from "../components/Navigation";

export default function MeetFarmersPage() {
  const [farmers, setFarmers] = useState<Array<Farmer>>([]);
  useEffect(() => {
    setFarmers([]);
    const fetchFarmers = async () => {
      const farmersData = await getDocs(collection(db, "sellers"));
      let farmersArray: Array<Farmer> = [];
      farmersData.forEach((doc) => {
        const farmerData = {
          id: doc.id,
          ...doc.data(),
        } as Farmer;
        if (farmerData.name && farmerData.address) {
          farmersArray.push(farmerData);
        }
      });
      setFarmers(farmersArray);
    };
    fetchFarmers();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-h-8xl max-w-2xl lg:mx-0">
            <h2 className="text-8xl tracking-tight animate-text font-extrabold bg-clip-text bg-gradient-to-r from-lime-500 via-primary-accent to-green-600 text-transparent font-black ">
              Our Farmers
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best produce for our
              clients.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {farmers.map((farmer) => (
              <div key={farmer.id}>
                <div>
                  <li key={farmer.name}>
                    <img
                      className="aspect-[3/2] w-full rounded-2xl object-cover"
                      src={farmer.image_url}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y=";
                      }}
                      alt="not loaded"
                    />
                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900 text-center">
                      {farmer.name}
                    </h3>
                    <p className="text-base leading-7 text-gray-600 text-center">
                      {farmer.address}
                    </p>
                  </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
