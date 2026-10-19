import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { ALL_PRODUCTS, Product as StaticProduct } from "@/constants/products";
import { CATEGORIES as STATIC_CATEGORIES } from "@/constants";

export const dynamic = "force-dynamic";

export interface SearchProductResult {
  id: string;
  name: string;
  model: string;
  slug: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  image: string;
  shortDesc?: string;
  tag?: string;
  url: string;
}

export interface SearchCategoryResult {
  name: string;
  slug: string;
  image: string;
  url: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get("q") || "";
    const query = rawQuery.trim();
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 8, 1), 25);

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        query,
        products: [],
        categories: [],
        total: 0,
      });
    }

    // Escape regex special characters
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedQuery, "i");

    let dbProducts: any[] = [];
    let dbCategories: any[] = [];

    try {
      await connectToDatabase();

      // Search DB Products
      dbProducts = await Product.find({
        $or: [
          { name: regex },
          { model: regex },
          { slug: regex },
          { category: regex },
          { categorySlug: regex },
          { subcategory: regex },
          { description: regex },
          { shortDesc: regex },
          { tag: regex },
          { features: regex },
          { "specs.label": regex },
          { "specs.value": regex },
        ],
      })
        .sort({ order: 1, featured: -1, createdAt: -1 })
        .limit(limit)
        .lean();

      // Search DB Categories
      dbCategories = await Category.find({
        $or: [{ name: regex }, { slug: regex }, { description: regex }],
      })
        .sort({ order: 1 })
        .limit(4)
        .lean();
    } catch (dbErr) {
      console.warn("MongoDB search error, falling back to static catalog:", dbErr);
    }

    // Map DB products
    const productResults: SearchProductResult[] = (dbProducts || []).map((p: any) => ({
      id: String(p._id || p.id),
      name: p.name,
      model: p.model || "",
      slug: p.slug,
      category: p.category,
      categorySlug: p.categorySlug,
      subcategory: p.subcategory || "",
      image: p.image || p.images?.[0] || "/images/cat-accessories.png",
      shortDesc: p.shortDesc || "",
      tag: p.tag || "",
      url: `/products/${p.categorySlug}/${p.slug}`,
    }));

    // If fewer than limit from DB, supplement from static ALL_PRODUCTS without duplicates
    if (productResults.length < limit) {
      const existingSlugs = new Set(productResults.map((p) => p.slug));
      const qLower = query.toLowerCase();

      const matchedStatic = ALL_PRODUCTS.filter((sp: StaticProduct) => {
        if (existingSlugs.has(sp.slug)) return false;
        return (
          sp.name.toLowerCase().includes(qLower) ||
          (sp.model && sp.model.toLowerCase().includes(qLower)) ||
          sp.category.toLowerCase().includes(qLower) ||
          (sp.subcategory && sp.subcategory.toLowerCase().includes(qLower)) ||
          (sp.shortDesc && sp.shortDesc.toLowerCase().includes(qLower)) ||
          (sp.description && sp.description.toLowerCase().includes(qLower)) ||
          sp.features?.some((f) => f.toLowerCase().includes(qLower)) ||
          sp.specs?.some(
            (s) => s.label.toLowerCase().includes(qLower) || s.value.toLowerCase().includes(qLower)
          )
        );
      });

      for (const sp of matchedStatic) {
        if (productResults.length >= limit) break;
        productResults.push({
          id: sp.id,
          name: sp.name,
          model: sp.model || "",
          slug: sp.slug,
          category: sp.category,
          categorySlug: sp.categorySlug,
          subcategory: sp.subcategory || "",
          image: sp.image || "/images/cat-accessories.png",
          shortDesc: sp.shortDesc || "",
          tag: sp.tag || "",
          url: `/products/${sp.categorySlug}/${sp.slug}`,
        });
      }
    }

    // Map Categories
    const categoryResults: SearchCategoryResult[] = (dbCategories || []).map((c: any) => ({
      name: c.name,
      slug: c.slug,
      image: c.image || "/images/cat-accessories.png",
      url: `/products/${c.slug}`,
    }));

    // Supplement categories from STATIC_CATEGORIES if empty
    if (categoryResults.length === 0) {
      const qLower = query.toLowerCase();
      const matchedStaticCat = STATIC_CATEGORIES.filter(
        (sc) =>
          sc.name.toLowerCase().includes(qLower) ||
          sc.href.toLowerCase().includes(qLower)
      );
      for (const sc of matchedStaticCat) {
        const slug = sc.href.replace("/products/", "");
        categoryResults.push({
          name: sc.name,
          slug,
          image: sc.image,
          url: sc.href,
        });
      }
    }

    return NextResponse.json({
      success: true,
      query,
      products: productResults,
      categories: categoryResults,
      total: productResults.length + categoryResults.length,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Search failed";
    console.error("Search API exception:", err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
