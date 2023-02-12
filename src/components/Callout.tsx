// SECTION: find product and find farms
/*
This example requires some changes to your config:

```
// tailwind.config.js
module.exports = {
// ...
plugins: [
// ...
require('@tailwindcss/aspect-ratio'),
],
}
```
*/

import { PRODUCEPAGE, MEETFARMERSPAGE, SIGNUP } from "../constants/routes";

type CalloutType = {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  to: string;
};

const callouts: Array<CalloutType> = [
  {
    name: "Browse Produce",
    description: "A variety of fresh produce, easily available to you",
    imageSrc:
      "https://www.gardenroute.gov.za/wp-content/uploads/2021/08/Fresh-produce-market.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    to: PRODUCEPAGE,
  },
  {
    name: "Meet Our Farmers",
    description: "Real farms growing real food, at a small cost to you",
    imageSrc:
      "https://ohiomagazine.imgix.net/sitefinity/images/default-source/articles/2021/july-august-2021/farms-slate-run-farm-sheep-credit-megan-leigh-barnard.jpg?sfvrsn=59d8a238_8&w=960&auto=compress%2Cformat",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    to: MEETFARMERSPAGE,
  },
  {
    name: "Become a FreshFarmer",
    description:
      "Reduce food waste and sell your imperfect produce directly to clients",
    imageSrc:
      "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Sarah_Benoit_Delbecq_Indiana_1.jpg?crop=0%2C233%2C4000%2C2200&wid=4000&hei=2200&scl=1.0",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    to: SIGNUP+'?isFarmer=true',
  },
];

export default function Callout() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-4">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-3xl text-black-500 leading-10 font-bold">
                  <a href={callout.to}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-lg pt-4 leading-6 font-medium text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
