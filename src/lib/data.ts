import connectToDatabase from "@/lib/db/mongodb";
import Banner, { IBanner } from "@/models/Banner";
import Category, { ICategory } from "@/models/Category";
import Product, { IProduct } from "@/models/Product";
import Catalog, { ICatalog } from "@/models/Catalog";
import Subcategory, { ISubcategory } from "@/models/Subcategory";
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

// 2. Fetch categories directly from MongoDB tuqo_db with fallback
export async function getLiveCategories(): Promise<UnifiedCategory[]> {
  try {
    await connectToDatabase();
    const docs = await Category.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs && docs.length > 0) {
      return (docs as any[]).map((d) => {
        const slug = d.slug || d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return {
          id: String(d._id),
          name: d.name,
          slug: slug,
          image: d.image,
          description: d.description || "",
          href: `/products/${slug}`,
          featured: d.featured !== false,
          order: d.order || 0,
        };
      });
    }
  } catch (err) {
    console.error("Failed to load categories from DB:", err);
  }

  // Fallback if DB is completely empty
  return STATIC_CATEGORIES.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.href.replace("/products/", ""),
    image: c.image,
    href: c.href,
    featured: true,
    order: 0,
  }));
}

// 3. Fetch products directly from MongoDB tuqo_db with fallback
export async function getLiveProducts(categorySlug?: string): Promise<StaticProduct[]> {
  try {
    await connectToDatabase();
    const query = categorySlug ? { categorySlug } : {};
    const docs = await Product.find(query).sort({ order: 1, createdAt: -1 }).lean();
    if (docs && docs.length > 0) {
      return (docs as any[]).map((d) => ({
        id: String(d._id),
        slug: d.slug,
        name: d.name,
        model: d.model || "",
        category: d.category,
        categorySlug: d.categorySlug,
        subcategory: d.subcategory || "",
        subcategorySlug: d.subcategorySlug || "",
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
      }));
    }
  } catch (err) {
    console.error("Failed to load products from DB:", err);
  }

  // Fallback static products
  return categorySlug
    ? ALL_PRODUCTS.filter((p) => p.categorySlug === categorySlug)
    : ALL_PRODUCTS;
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
        subcategory: d.subcategory || "",
        subcategorySlug: d.subcategorySlug || "",
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

export interface UnifiedCatalog {
  id: string;
  title: string;
  description?: string;
  pdfUrl?: string;
  coverImage?: string;
  fileSize?: string;
  category?: string;
  order: number;
}

// 5. Fetch live E-Catalogues from MongoDB
export async function getLiveCatalogs(): Promise<UnifiedCatalog[]> {
  try {
    await connectToDatabase();
    const docs = await Catalog.find({ active: true }).sort({ order: 1, createdAt: 1 }).lean();
    if (docs && docs.length > 0) {
      return (docs as any[]).map((d) => ({
        id: String(d._id),
        title: d.title,
        description: d.description || "",
        pdfUrl: d.pdfUrl || "",
        coverImage: d.coverImage || "",
        fileSize: d.fileSize || "",
        category: d.category || "General",
        order: d.order || 0,
      }));
    }
  } catch (err) {
    console.error("Failed to load catalogs from DB:", err);
  }

  // Fallback defaults
  return [
    {
      id: "product-catalog",
      title: "TUQO PRODUCT CATALOG 2025",
      description: "Complete range of professional machinery, high pressure washers, air compressors and power tools.",
      coverImage: "/images/hero-banner-bg.png",
      category: "Machinery & Power Tools",
      pdfUrl: "",
      order: 1,
    },
    {
      id: "cleaning-accessories",
      title: "TUQO CLEANING EQUIPMENT ACCESSORIES 2025",
      description: "Explore our range of high pressure washer accessories, cleaning equipment and car detailing products.",
      coverImage: "/images/cat-accessories.png",
      category: "Accessories",
      pdfUrl: "",
      order: 2,
    },
    {
      id: "auto-detailing",
      title: "TUQO AUTO DETAILING AND CLEANING 2025",
      description: "Discover our professional auto detailing and vehicle cleaning equipment range.",
      coverImage: "/images/cat-foam-dispenser.png",
      category: "Auto Detailing",
      pdfUrl: "",
      order: 3,
    },
  ];
}

export interface UnifiedSubcategory {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  image?: string;
  description?: string;
  order: number;
}

// 6. Fetch live Subcategories from MongoDB
export async function getLiveSubcategories(categorySlug?: string): Promise<UnifiedSubcategory[]> {
  try {
    await connectToDatabase();
    const query: any = { active: true };
    if (categorySlug) {
      query.categorySlug = categorySlug;
    }
    const docs = await Subcategory.find(query).sort({ order: 1, createdAt: 1 }).lean();
    if (docs) {
      return (docs as any[]).map((d) => ({
        id: String(d._id),
        name: d.name,
        slug: d.slug,
        categorySlug: d.categorySlug,
        categoryName: d.categoryName,
        image: d.image || "",
        description: d.description || "",
        order: d.order || 0,
      }));
    }
  } catch (err) {
    console.error("Failed to load subcategories from DB:", err);
  }
  return [];
}
