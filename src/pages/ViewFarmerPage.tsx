
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { Farmer } from "../types";
import { HOME } from "../constants/routes";

export default function ViewFarmerPage() {
  const navigate = useNavigate();
  
  const { farmerId } = useParams();

  const [farmer, setFarmer] = useState<Farmer | null>(null);

  useEffect(() => {
    if (!farmerId) {
    navigate(HOME)
    } else {
    const fetchFarmers = async () => {
      const farmerRef = doc(db, "sellers", farmerId);
      const farmerData = await getDoc(farmerRef);

      if (farmerData.exists()) {
        const farmer = {
          id: farmerData.id,
          ...farmerData.data()
        } as Farmer
        setFarmer(farmer);
      } else {
        setFarmer(null);
      }
    }
    fetchFarmers();   
  }
  }, [farmerId, navigate])

  return (
    <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
        </div>
      </div>
  );
}
