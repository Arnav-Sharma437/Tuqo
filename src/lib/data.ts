import connectToDatabase from "@/lib/db/mongodb";
import Banner, { IBanner } from "@/models/Banner";
import Category, { ICategory } from "@/models/Category";
import Product, { IProduct } from "@/models/Product";
import { CATEGORIES as STATIC_CATEGORIES } from "@/constants";
import { ALL_PRODUCTS, Product as StaticProduct } from "@/constants/products";

export interface UnifiedBanner {
  _id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  desktopImage: string;
  mobileImage: string;
  buttonText?: string;
  buttonLink?: string;
  active: boolean;
  order: number;
}

export interface UnifiedCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  href: string;
  order?: number;
  featured?: boolean;
}

// 1. Fetch live active banners from MongoDB with fallback to default hero banners
export async function getLiveBanners(): Promise<UnifiedBanner[]> {
  try {
    await connectToDatabase();
    const docs = await Banner.find({ active: true }).sort({ order: 1, createdAt: -1 }).lean();
    if (docs && docs.length > 0) {
      return docs.map((b: any) => ({
        _id: String(b._id),
        title: b.title,
        subtitle: b.subtitle || "",
        badge: b.badge || "",
        desktopImage: b.desktopImage,
        mobileImage: b.mobileImage,
        buttonText: b.buttonText || "Explore Products",
        buttonLink: b.buttonLink || "/categories",
        active: b.active,
        order: b.order || 0,
      }));
    }
  } catch (err) {
    console.error("Failed to load live banners from DB:", err);
  }

  // Fallback defaults
  return [
    {
      title: "TUQO Professional Machinery & Power Tools",
      subtitle: "Engineered for heavy-duty commercial and industrial performance.",
      badge: "PROFESSIONAL MACHINERY & POWER TOOLS",
      desktopImage: "/images/hero-banner-bg.png",
      mobileImage: "/images/hero-products.png",
      buttonText: "Explore Products",
      buttonLink: "/categories",
      active: true,
      order: 0,
    },
    {
      title: "Built For A Stronger Tomorrow",
      subtitle: "Discover high-performance washers, air compressors, and industrial tools.",
      badge: "COMMERCIAL & INDUSTRIAL GRADE",
      desktopImage: "/images/hero-bg.jpg",
      mobileImage: "/images/hero-products.png",
      buttonText: "Explore Products",
      buttonLink: "/categories",
      active: true,
      order: 1,
    },
  ];
}

// 2. Fetch all categories merging MongoDB categories with static categories
export async function getLiveCategories(): Promise<UnifiedCategory[]> {
  const map = new Map<string, UnifiedCategory>();

  // Add default static categories
  for (const c of STATIC_CATEGORIES) {
    map.set(c.id, {
      id: c.id,
      name: c.name,
      slug: c.href.replace("/products/", ""),
      image: c.image,
      href: c.href,
      featured: true,
      order: 0,
    });
  }

  try {
    await connectToDatabase();
    const docs = await Category.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs) {
      for (const d of docs as any[]) {
        const slug = d.slug || d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        map.set(slug, {
          id: String(d._id),
          name: d.name,
          slug: slug,
          image: d.image,
          description: d.description || "",
          href: `/products/${slug}`,
          featured: d.featured !== false,
          order: d.order || 0,
        });
      }
    }
  } catch (err) {
    console.error("Failed to load categories from DB:", err);
  }

  return Array.from(map.values());
}

// 3. Fetch products merging MongoDB products with static catalog
export async function getLiveProducts(categorySlug?: string): Promise<StaticProduct[]> {
  const map = new Map<string, StaticProduct>();

  // Load static products
  const staticList = categorySlug
    ? ALL_PRODUCTS.filter((p) => p.categorySlug === categorySlug)
    : ALL_PRODUCTS;

  for (const p of staticList) {
    map.set(p.slug, p);
  }

  try {
    await connectToDatabase();
    const query = categorySlug ? { categorySlug } : {};
    const docs = await Product.find(query).sort({ order: 1, createdAt: -1 }).lean();
    if (docs) {
      for (const d of docs as any[]) {
        map.set(d.slug, {
          id: String(d._id),
          slug: d.slug,
          name: d.name,
          model: d.model || "",
          category: d.category,
          categorySlug: d.categorySlug,
          image: d.image,
          shortDesc: d.shortDesc || "",
          description: d.description || "",
          tag: d.tag || "",
          features: Array.isArray(d.features) ? d.features : [],
          specs: Array.isArray(d.specs)
            ? d.specs.map((s: any) => ({ label: s.label, value: s.value }))
            : [],
          applications: Array.isArray(d.applications) ? d.applications : [],
          inStock: d.inStock !== false,
        });
      }
    }
  } catch (err) {
    console.error("Failed to load products from DB:", err);
  }

  return Array.from(map.values());
}

// 4. Fetch single product by slug (checks MongoDB first, then static catalog)
export async function getLiveProductBySlug(slug: string): Promise<StaticProduct | null> {
  try {
    await connectToDatabase();
    const doc = await Product.findOne({ slug }).lean();
    if (doc) {
      const d = doc as any;
      return {
        id: String(d._id),
        slug: d.slug,
        name: d.name,
        model: d.model || "",
        category: d.category,
        categorySlug: d.categorySlug,
        image: d.image,
        shortDesc: d.shortDesc || "",
        description: d.description || "",
        tag: d.tag || "",
        features: Array.isArray(d.features) ? d.features : [],
        specs: Array.isArray(d.specs)
          ? d.specs.map((s: any) => ({ label: s.label, value: s.value }))
          : [],
        applications: Array.isArray(d.applications) ? d.applications : [],
        inStock: d.inStock !== false,
      };
    }
  } catch (err) {
    console.error("Failed to load product from DB by slug:", err);
  }

  const staticProduct = ALL_PRODUCTS.find((p) => p.slug === slug);
  return staticProduct || null;
}
