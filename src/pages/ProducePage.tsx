import Navigation from "../components/Navigation";
import { VIEWPRODUCEPAGE } from "../constants/routes";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Strawberries",
    href: "#",
    price: "$48",
    imageSrc:
      "https://hgic.clemson.edu/wp-content/uploads/1999/06/freshly-harvested-strawberries-ready-to-be-enjoyed-scaled.jpeg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Blackberries",
    href: "#",
    price: "$35",
    imageSrc:
      "https://wamu.org/wp-content/uploads/2020/08/6060143865_e48165e959_k-1500x998.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Watermelon",
    href: "#",
    price: "$89",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/0038/6259/3665/products/Produce-Buddies-Watermelon.jpg?v=1634649207",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Potatoes",
    href: "#",
    price: "$35",
    imageSrc:
      "https://www.uvfarmersmarket.com/wp-content/uploads/brizy/imgs/pot-738x457x205x0x328x457x1563411775.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 1,
    name: "Bananas",
    href: "#",
    imageSrc:
      "https://suncitycenterphotos.com/wp-content/uploads/2014/06/Banana-prices-in-Sun-City-Center-Florida1.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Garlic",
    href: "#",
    imageSrc:
      "https://grocycle.com/wp-content/uploads/2022/07/Garlic-at-a-market-1024x655.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Broccollini",
    href: "#",
    imageSrc:
      "http://cdn.shopify.com/s/files/1/0206/9470/files/Pick_of_the_Week_-_Broccolini.jpg?v=1502173625",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Sweet Potatoes",
    href: "#",
    imageSrc:
      "https://www.agmrc.org/media/cms/swpotatoescomp_B6BE5ECFB4E85.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 1,
    name: "Starfruit",
    href: "#",
    imageSrc:
      "https://media.istockphoto.com/id/112860361/photo/photograph-of-multiple-starfruit.jpg?s=612x612&w=0&k=20&c=K7EaHcMsr_1P4tj1rcEO-ZQcW0BYnhqKKyw-nKR5xBE=",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Dragonfruit",
    href: "#",
    imageSrc:
      "https://media-cdn.tripadvisor.com/media/photo-s/06/8e/72/2e/keauhou-farmer-s-market.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Blueberries",
    href: "#",
    imageSrc:
      "https://extension.unh.edu/sites/default/files/styles/max_width_480px/public/migrated_images/blue-1326154_1280.jpg?itok=RA0CMEsN",
    imageAlt:
      "Basket of big beautiful blueberries",
  },
  {
    id: 4,
    name: "Peaches",
    href: "#",
    imageSrc:
      "https://img.freepik.com/premium-photo/fresh-yellow-peaches-cardboard-crates-farmers-market_707345-24.jpg?w=2000",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
];

export default function ProducePage() {
  return (
    <div className="bg-white">
      <Navigation />
      <div className="items-center margin-auto w-8xl">
      <h2 className="text-center margin-auto w-8xl text-4xl font-bold tracking-tight text-black-400 sm:text-6xl py-6 pl-10xl pt-10">
        Product Categories
      </h2>
      </div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">


        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link to={VIEWPRODUCEPAGE} key={product.id} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              {/*<p className="mt-1 text-lg font-medium text-gray-900">*/}
              {/*  {product.price}*/}
              {/*</p>*/}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}