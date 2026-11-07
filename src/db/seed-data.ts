/*
 * Sample catalog loaded by src/db/seed.ts. The app reads the database, not this
 * file. Photos are from Unsplash (https://unsplash.com/license).
 */
import type { Picture } from "@/lib/product";
import { unsplash, type Focus } from "@/lib/unsplash";

const PRODUCT_RATIO = "3:4";
const COLLECTION_RATIO = "4:5";

const OUTERWEAR = "outerwear";
const LEATHER_GOODS = "leather-goods";
const FOOTWEAR = "footwear";
const TAILORING = "tailoring";
const EYEWEAR = "eyewear";

export const seedCategories = [
  {
    slug: OUTERWEAR,
    name: "Outerwear",
    description: "Double-faced wool and belted camel",
    imageSrc: unsplash("1539533018447-63fcce2678e3", COLLECTION_RATIO),
    imageAlt: "Model in a belted camel coat walking down stone steps",
    homepagePosition: 1,
  },
  {
    slug: LEATHER_GOODS,
    name: "Leather Goods",
    description: "Bags that age with you",
    imageSrc: unsplash("1624687943971-e86af76d57de", COLLECTION_RATIO),
    imageAlt: "Tan leather tote hanging from a white door",
    homepagePosition: 2,
  },
  {
    slug: FOOTWEAR,
    name: "Footwear",
    description: "Hand-finished soles and uppers",
    imageSrc: unsplash("1641893843833-a006778dc00b", COLLECTION_RATIO),
    imageAlt: "Pair of dark burgundy leather wingtip shoes",
    homepagePosition: 3,
  },
  { slug: TAILORING, name: "Tailoring" },
  { slug: EYEWEAR, name: "Eyewear" },
];

type ProductInput = {
  slug: string;
  name: string;
  priceCents: number;
  category: string;
  stock: number;
  isNew?: boolean;
  description: string;
  details: string[];
  photo: string;
  alt: string;
  closeUps: (Focus & { alt: string })[];
};

function product({
  category,
  stock,
  photo,
  alt,
  closeUps,
  isNew = false,
  ...fields
}: ProductInput) {
  const images: Picture[] = [
    { src: unsplash(photo, PRODUCT_RATIO), alt },
    ...closeUps.map(({ alt: closeUpAlt, ...focus }) => ({
      src: unsplash(photo, PRODUCT_RATIO, focus),
      alt: closeUpAlt,
    })),
  ];
  return {
    ...fields,
    categorySlug: category,
    stockQuantity: stock,
    isNew,
    images,
  };
}

const newArrivals = [
  product({
    slug: "holloway-satchel",
    name: "Holloway Top-Handle Satchel",
    priceCents: 148000,
    category: LEATHER_GOODS,
    stock: 8,
    isNew: true,
    description:
      "A structured satchel in polished cognac leather, with twin buckled straps across the front and a rounded top handle that holds its shape.",
    details: [
      "Polished calf leather",
      "Twin buckled front straps",
      "Front slip pocket",
      "Rolled top handle",
    ],
    photo: "1691480150204-66dd1eb77391",
    alt: "Cognac leather top-handle satchel with buckled straps",
    closeUps: [
      {
        x: 0.5,
        y: 0.45,
        zoom: 2.2,
        alt: "Close-up of the satchel's buckled straps and front pocket",
      },
      {
        x: 0.5,
        y: 0.7,
        zoom: 2.2,
        alt: "Close-up of the satchel's polished leather and stitched base",
      },
    ],
  }),
  product({
    slug: "double-faced-overcoat",
    name: "Double-Faced Wool Overcoat",
    priceCents: 215000,
    category: OUTERWEAR,
    stock: 5,
    isNew: true,
    description:
      "An unlined overcoat cut from double-faced wool, soft enough to wear open over a roll-neck and long enough to carry through winter.",
    details: [
      "Double-faced wool",
      "Unlined construction",
      "Notched lapel",
      "Single-breasted front",
    ],
    photo: "1619603364937-8d7af41ef206",
    alt: "Model in a blush wool overcoat over a matching roll-neck",
    closeUps: [
      {
        x: 0.5,
        y: 0.45,
        zoom: 2,
        alt: "Close-up of the overcoat's notched lapel over the roll-neck",
      },
      {
        x: 0.5,
        y: 0.25,
        zoom: 2.2,
        alt: "Head-and-shoulders view of the model in the overcoat and roll-neck",
      },
    ],
  }),
  product({
    slug: "cat-eye-sunglasses",
    name: "Cat-Eye Sunglasses",
    priceCents: 39000,
    category: EYEWEAR,
    stock: 12,
    description:
      "A soft cat-eye shape with pale frames, a fine metal bridge, and brown gradient lenses that fade toward the cheek.",
    details: [
      "Pale acetate and metal frame",
      "Brown gradient lenses",
      "Fine metal bridge",
      "Case included",
    ],
    photo: "1508296695146-257a814070b4",
    alt: "Pale metal cat-eye sunglasses with gradient lenses",
    closeUps: [
      {
        x: 0.5,
        y: 0.5,
        zoom: 1.8,
        alt: "Close-up of the sunglasses' gradient lenses and metal bridge",
      },
      {
        x: 0.3,
        y: 0.5,
        zoom: 2.4,
        alt: "Close-up of one gradient lens in its pale frame",
      },
    ],
  }),
  product({
    slug: "belted-camel-coat",
    name: "Belted Camel Coat",
    priceCents: 198000,
    category: OUTERWEAR,
    stock: 2,
    isNew: true,
    description:
      "A wrap coat in warm camel, tied at the waist with a matching self-belt and finished with deep side pockets.",
    details: [
      "Camel wool blend",
      "Removable self-belt",
      "Deep side pockets",
      "Below-the-knee length",
    ],
    photo: "1539533113208-f6df8cc8b543",
    alt: "Belted camel coat worn against a grey stone wall",
    closeUps: [
      {
        x: 0.5,
        y: 0.4,
        zoom: 2,
        alt: "Close-up of the coat's tied belt and side pockets",
      },
      {
        x: 0.5,
        y: 0.65,
        zoom: 2,
        alt: "Close-up of the coat's hem and hanging belt ends",
      },
    ],
  }),
  product({
    slug: "stone-satchel",
    name: "Stone Grain Satchel",
    priceCents: 135000,
    category: LEATHER_GOODS,
    stock: 6,
    description:
      "A compact satchel in pebbled stone-grey leather, closed with two brass buckles and carried by a slim top handle.",
    details: [
      "Pebbled grain leather",
      "Brass buckle closures",
      "Slim top handle",
      "Fold-over front flap",
    ],
    photo: "1605733513597-a8f8341084e6",
    alt: "Grey pebbled leather satchel with brass buckles",
    closeUps: [
      {
        x: 0.5,
        y: 0.55,
        zoom: 2.2,
        alt: "Close-up of the satchel's pebbled grain and stitched flap",
      },
      {
        x: 0.5,
        y: 0.35,
        zoom: 2.2,
        alt: "Close-up of the satchel's top handle and brass hardware",
      },
    ],
  }),
  product({
    slug: "browline-sunglasses",
    name: "Browline Sunglasses",
    priceCents: 36000,
    category: EYEWEAR,
    stock: 9,
    description:
      "A classic browline in black, with a heavier upper frame, a thin metal rim below, and smoke-grey gradient lenses.",
    details: [
      "Black acetate browline",
      "Thin metal lower rim",
      "Grey gradient lenses",
      "Case included",
    ],
    photo: "1584036553516-bf83210aa16c",
    alt: "Black browline sunglasses with grey gradient lenses",
    closeUps: [
      {
        x: 0.5,
        y: 0.5,
        zoom: 1.8,
        alt: "Front view of the sunglasses' grey gradient lenses",
      },
      {
        x: 0.3,
        y: 0.5,
        zoom: 2.4,
        alt: "Close-up of one lens under its black browline frame",
      },
    ],
  }),
  product({
    slug: "harness-messenger",
    name: "Harness Messenger",
    priceCents: 119000,
    category: LEATHER_GOODS,
    stock: 0,
    description:
      "A working messenger in dark brown leather, strapped and buckled like a saddlebag, with tan edge stitching that shows its construction.",
    details: [
      "Dark brown full-grain leather",
      "Contrast tan stitching",
      "Twin harness buckles",
      "Curved top handle",
    ],
    photo: "1603219527847-24c87f552a77",
    alt: "Dark brown leather messenger bag on a round wooden stool",
    closeUps: [
      {
        x: 0.5,
        y: 0.45,
        zoom: 2,
        alt: "Close-up of the messenger's straps, buckles, and tan stitching",
      },
      {
        x: 0.5,
        y: 0.3,
        zoom: 2.4,
        alt: "Close-up of the messenger's curved top handle",
      },
    ],
  }),
  product({
    slug: "oversized-wool-coat",
    name: "Oversized Wool Coat",
    priceCents: 234000,
    category: OUTERWEAR,
    stock: 3,
    description:
      "A long, dropped-shoulder coat in pale grey wool. The generous cut layers easily over knitwear and falls straight to the ankle.",
    details: [
      "Pale grey brushed wool",
      "Dropped shoulder",
      "Open front",
      "Ankle length",
    ],
    photo: "1632577743431-2b2d91e5dc8a",
    alt: "Model in a long pale grey wool coat carrying a black bag",
    closeUps: [
      {
        x: 0.5,
        y: 0.4,
        zoom: 1.9,
        alt: "Model's upper body in the grey coat, a quilted black bag on one arm",
      },
      {
        x: 0.5,
        y: 0.65,
        zoom: 2,
        alt: "Close-up of the coat's hem above tan leather boots",
      },
    ],
  }),
];

const bestSellers = [
  product({
    slug: "porter-crossbody",
    name: "Porter Crossbody",
    priceCents: 124000,
    category: LEATHER_GOODS,
    stock: 7,
    description:
      "An everyday crossbody in tan leather, organized around zipped compartments and two front pockets, with a long adjustable strap.",
    details: [
      "Vegetable-tanned leather",
      "Two zipped compartments",
      "Two front pockets",
      "Adjustable, removable strap",
    ],
    photo: "1657603738389-951c374b740c",
    alt: "Tan leather crossbody bag with front pockets and a long strap",
    closeUps: [
      {
        x: 0.5,
        y: 0.5,
        zoom: 2,
        alt: "Close-up of the crossbody's front pockets and contrast stitching",
      },
      {
        x: 0.5,
        y: 0.3,
        zoom: 2.2,
        alt: "Close-up of the crossbody's zipped top compartments",
      },
    ],
  }),
  product({
    slug: "oxblood-wingtip",
    name: "Oxblood Wingtip",
    priceCents: 72000,
    category: FOOTWEAR,
    stock: 4,
    description:
      "A traditional laced wingtip in deep burgundy leather, with a pebbled grain across the toe and brogued seams along each side.",
    details: [
      "Pebbled burgundy leather",
      "Perforated wingtip toe",
      "Waxed burgundy laces",
      "Slim dark sole",
    ],
    photo: "1641893843833-a006778dc00b",
    alt: "Pair of dark burgundy leather wingtip shoes",
    closeUps: [
      {
        x: 0.5,
        y: 0.5,
        zoom: 2,
        alt: "Close-up of the wingtip's laces and pebbled toe",
      },
      {
        x: 0.35,
        y: 0.5,
        zoom: 2.4,
        alt: "Close-up of the wingtip's brogued side seam and heel",
      },
    ],
  }),
  product({
    slug: "stitched-card-case",
    name: "Stitched Card Case",
    priceCents: 24000,
    category: LEATHER_GOODS,
    stock: 20,
    description:
      "A slim folding card case in tan leather, stitched by hand around its edge with a single waxed thread.",
    details: [
      "Tan vegetable-tanned leather",
      "Hand saddle-stitched edge",
      "Folding, slim profile",
      "Develops a patina with use",
    ],
    photo: "1628483211662-9bcc692c46dc",
    alt: "Hand-stitched tan leather card case beside leatherworking tools",
    closeUps: [
      {
        x: 0.5,
        y: 0.5,
        zoom: 2,
        alt: "Close-up of the case's grained leather and hand stitching",
      },
      {
        x: 0.5,
        y: 0.3,
        zoom: 2,
        alt: "Close-up of the case's stitched corner beside a wooden tool",
      },
    ],
  }),
  product({
    slug: "washed-linen-jacket",
    name: "Washed Linen Jacket",
    priceCents: 98000,
    category: TAILORING,
    stock: 10,
    description:
      "A lightly structured jacket in off-white linen, garment-washed so it arrives soft and keeps its natural creases.",
    details: [
      "Washed linen",
      "Soft, unpadded shoulder",
      "Patch pockets",
      "Horn-style buttons",
    ],
    photo: "1604506847073-4a8e18e07d92",
    alt: "Off-white linen jacket on a wooden hanger against a dark rail",
    closeUps: [
      {
        x: 0.5,
        y: 0.35,
        zoom: 2,
        alt: "The jacket's collar on a wooden hanger below a dark rail",
      },
      {
        x: 0.5,
        y: 0.6,
        zoom: 2,
        alt: "Close-up of the jacket's creased linen texture",
      },
    ],
  }),
  product({
    slug: "brogue-derby",
    name: "Teal Brogue Derby",
    priceCents: 76000,
    category: FOOTWEAR,
    stock: 6,
    description:
      "A brogued derby in saturated teal leather, set on a stacked natural sole for a quiet flash of color.",
    details: [
      "Teal calf leather",
      "Full brogue perforation",
      "Tan waxed laces",
      "Stacked natural sole",
    ],
    photo: "1571859856639-d54ab2c18ba0",
    alt: "Pair of teal perforated leather derby shoes on a pale surface",
    closeUps: [
      {
        x: 0.5,
        y: 0.5,
        zoom: 2,
        alt: "Close-up of the derby's perforated toe and tan laces",
      },
      {
        x: 0.3,
        y: 0.5,
        zoom: 2.4,
        alt: "Close-up of the derby's broguing and stacked sole",
      },
    ],
  }),
  product({
    slug: "clear-round-sunglasses",
    name: "Clear Round Sunglasses",
    priceCents: 34000,
    category: EYEWEAR,
    stock: 1,
    description:
      "Round sunglasses with crystal-clear frames and warm amber lenses, made for bright days by the water.",
    details: [
      "Clear acetate frame",
      "Amber lenses",
      "Keyhole bridge",
      "Case included",
    ],
    photo: "1577803645773-f96470509666",
    alt: "Round sunglasses with clear frames and amber lenses by the sea",
    closeUps: [
      {
        x: 0.5,
        y: 0.5,
        zoom: 1.8,
        alt: "Close-up of the sunglasses' clear frames and amber lenses",
      },
      {
        x: 0.4,
        y: 0.45,
        zoom: 2.4,
        alt: "Close-up of one clear frame and amber lens",
      },
    ],
  }),
];

export const seedProducts = [
  ...newArrivals.map((item, index) => ({
    ...item,
    homepageSection: "new_arrivals" as const,
    homepagePosition: index + 1,
  })),
  ...bestSellers.map((item, index) => ({
    ...item,
    homepageSection: "best_sellers" as const,
    homepagePosition: index + 1,
  })),
];
