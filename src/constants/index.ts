```tsx
export const APP_CONFIG = {
  name: "TUQO Tools",
  description: "Professional Tools for Higher Performance",
  tagline: "BUILT FOR A STRONGER TOMORROW",
  phone: "+91 9342466860",
  phoneRaw: "91 9342466860",
  whatsappUrl: "https://wa.me/919342466860",
  business: {
    name: "A.H HOLDINGS",
    addressLines: [
      "E-45, Sidco Industrial Estate,",
      "Coimbatore - 641021,",
      "Tamil Nadu, India",
    ],
    fullAddress:
      "E-45, Sidco Industrial Estate, Coimbatore - 641021, Tamil Nadu, India",
  },
  businessHours: [
    { day: "Mon", hours: "09:00 am – 05:00 pm" },
    { day: "Tue", hours: "09:00 am – 05:00 pm" },
    { day: "Wed", hours: "09:00 am – 05:00 pm" },
    { day: "Thu", hours: "09:00 am – 05:00 pm" },
    { day: "Fri", hours: "09:00 am – 05:00 pm" },
    { day: "Sat", hours: "Closed" },
    { day: "Sun", hours: "Closed" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Categories",
    href: "/categories",
    subItems: [
      {
        label: "High Pressure Washer",
        href: "/products/high-pressure-washer",
      },
      {
        label: "Air Compressor",
        href: "/products/air-compressor",
      },
      {
        label: "Power Tools",
        href: "/products/power-tools",
      },
      {
        label: "High Pressure Washer Accessories",
        href: "/products/high-pressure-washer-accessories",
      },
      {
        label: "Auto Detailing",
        href: "/products/auto-detailing",
      },
      {
        label: "Power Tools Accessories",
        href: "/products/power-tools-accessories",
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "E-Catalog", href: "#catalog" },
];

export const TRUST_FEATURES = [
  {
    title: "Durable & Reliable",
    description: "Built to last in tough conditions",
    icon: "shield",
  },
  {
    title: "Wide Product Range",
    description: "For professionals & DIY users",
    icon: "cog",
  },
  {
    title: "High Quality Standards",
    description: "Trusted by industries",
    icon: "diamond",
  },
  {
    title: "Expert Support",
    description: "Service and maintenance you can rely on",
    icon: "support",
  },
];

export const CATEGORIES = [
  {
    id: "high-pressure-washers",
    name: "High Pressure Washer",
    image: "/images/cat-pressure-washer.png",
    href: "/products/high-pressure-washer",
  },
  {
    id: "air-compressors",
    name: "Air Compressor",
    image: "/images/cat-air-compressor.png",
    href: "/products/air-compressor",
  },
  {
    id: "power-tools",
    name: "Power Tools",
    image: "/images/cat-power-tools.png",
    href: "/products/power-tools",
  },
  {
    id: "high-pressure-washer-accessories",
    name: "High Pressure Washer Accessories",
    image: "/images/cat-accessories.png",
    href: "/products/high-pressure-washer-accessories",
  },
  {
    id: "auto-detailing",
    name: "Auto Detailing",
    image: "/images/cat-foam-dispenser.png",
    href: "/products/auto-detailing",
  },
  {
    id: "power-tools-accessories",
    name: "Power Tools Accessories",
    image: "/images/cat-accessories.png",
    href: "/products/power-tools-accessories",
  },
];

export * from "./products";
```
