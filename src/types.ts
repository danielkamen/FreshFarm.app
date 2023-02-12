import { DocumentReference, Timestamp } from "@firebase/firestore";

export type Farmer = {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    email_address: string;
    image_url: string;
    phone_number: string;
    address: string;
}


export type Category = {
    id: string;
    name: string;
    image_url: string;
    image_alt: "Not available";
}

export type Product = {
    id: string;
    name: string;
    image_url: string;
    image_alt: "Not available";
    price: number;
    quantity: number;
    category: Category;
    seller: Farmer;
    picked_on: Timestamp;
}

export type ProductQuery = {
    id: string;
    name: string;
    image_url: string;
    image_alt: "Not available";
    price: number;
    quantity: number;
    category_id: DocumentReference<Category>;
    seller_id: DocumentReference<Farmer>;
    picked_on: Timestamp;
}