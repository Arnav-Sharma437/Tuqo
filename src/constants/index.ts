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
    fullAddress: "E-45, Sidco Industrial Estate, Coimbatore - 641021, Tamil Nadu, India",
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
    label: "Products",
    href: "/products",
    subItems: [
      { label: "High Pressure Washer", href: "/products/high-pressure-washer" },
      { label: "Vacuum Cleaner", href: "/products/vacuum-cleaner" },
      { label: "Air Compressor", href: "/products/air-compressor" },
      { label: "Foam Dispenser", href: "/products/foam-dispenser" },
      { label: "Power Tools", href: "/products/power-tools" },
      { label: "Power Tools Accessories", href: "/products/power-tools-accessories" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "E-Catalog", href: "/catalog" },
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
    name: "High Pressure Washers",
    image: "/images/cat-pressure-washer.png",
    href: "/products/high-pressure-washer",
  },
  {
    id: "vacuum-cleaners",
    name: "Vacuum Cleaners",
    image: "/images/cat-vacuum-cleaner.png",
    href: "/products/vacuum-cleaner",
  },
  {
    id: "air-compressors",
    name: "Air Compressors",
    image: "/images/cat-air-compressor.png",
    href: "/products/air-compressor",
  },
  {
    id: "foam-dispenser",
    name: "Foam Dispenser",
    image: "/images/cat-foam-dispenser.png",
    href: "/products/foam-dispenser",
  },
  {
    id: "power-tools",
    name: "Power Tools",
    image: "/images/cat-power-tools.png",
    href: "/products/power-tools",
  },
  {
    id: "power-tools-accessories",
    name: "Power Tools Accessories",
    image: "/images/cat-accessories.png",
    href: "/products/power-tools-accessories",
  },
];
