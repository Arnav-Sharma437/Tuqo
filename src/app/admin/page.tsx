"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TuqoLogo } from "@/components/common/TuqoLogo";
import { BannerManager, BannerItem } from "@/components/admin/BannerManager";
import { CategoryManager, CategoryItem } from "@/components/admin/CategoryManager";
import { SubcategoryManager, SubcategoryItem } from "@/components/admin/SubcategoryManager";
import { ProductManager, ProductItem } from "@/components/admin/ProductManager";
import { CatalogManager, CatalogItem } from "@/components/admin/CatalogManager";

type TabType = "banners" | "categories" | "subcategories" | "products" | "catalogs";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("banners");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [subcategories, setSubcategories] = useState<SubcategoryItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [catalogs, setCatalogs] = useState<CatalogItem[]>([]);

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Check auth session
  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session");
      if (!res.ok) {
        router.push("/admin/login");
        return false;
      }
      const data = await res.json();
      setUser(data.user);
      return true;
    } catch {
      router.push("/admin/login");
      return false;
    }
  }, [router]);

  // Fetch all dashboard data
  const fetchData = useCallback(async () => {
    setRefreshing(true);
    try {
      const [bannersRes, catRes, subcatRes, prodRes, catlogRes] = await Promise.all([
        fetch("/api/admin/banners"),
        fetch("/api/admin/categories"),
        fetch("/api/admin/subcategories"),
        fetch("/api/admin/products"),
        fetch("/api/admin/catalogs"),
      ]);

      if (bannersRes.ok) {
        const b = await bannersRes.json();
        setBanners(b.banners || []);
      }
      if (catRes.ok) {
        const c = await catRes.json();
        setCategories(c.categories || []);
      }
      if (subcatRes.ok) {
        const s = await subcatRes.json();
        setSubcategories(s.subcategories || []);
      }
      if (prodRes.ok) {
        const p = await prodRes.json();
        setProducts(p.products || []);
      }
      if (catlogRes.ok) {
        const cl = await catlogRes.json();
        setCatalogs(cl.catalogs || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      showNotification("Failed to refresh some data from server", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    checkSession().then((authenticated) => {
      if (authenticated) {
        fetchData();
      }
    });
  }, [checkSession, fetchData]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0c] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d31820] border-t-transparent" />
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Loading Tuqo Admin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold shadow-2xl transition-all ${
            notification.type === "success"
              ? "bg-emerald-600 text-white border border-emerald-400"
              : "bg-red-600 text-white border border-red-400"
          }`}
        >
          <span>{notification.type === "success" ? "✓" : "⚠"}</span>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#121418]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <TuqoLogo variant="white" width={110} />
              <span className="rounded bg-[#d31820] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                CMS
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => setActiveTab("banners")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "banners"
                    ? "bg-[#d31820] text-white shadow-md shadow-red-900/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Banners ({banners.length})
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "categories"
                    ? "bg-[#d31820] text-white shadow-md shadow-red-900/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Categories ({categories.length})
              </button>
              <button
                onClick={() => setActiveTab("subcategories")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "subcategories"
                    ? "bg-[#d31820] text-white shadow-md shadow-red-900/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Subcategories ({subcategories.length})
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "products"
                    ? "bg-[#d31820] text-white shadow-md shadow-red-900/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab("catalogs")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "catalogs"
                    ? "bg-[#d31820] text-white shadow-md shadow-red-900/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                E-Catalog ({catalogs.length})
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={refreshing}
              title="Refresh live data"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-gray-300 hover:bg-white/10 disabled:opacity-50"
            >
              <span className={refreshing ? "animate-spin" : ""}>🔄</span>
              <span className="hidden md:inline">Refresh</span>
            </button>

            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-white">{user?.name || "Admin"}</span>
              <span className="text-[10px] text-gray-500 font-mono">{user?.email}</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white"
            >
              View Site ↗
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Secondary / Mobile Navigation Bar */}
        <div className="flex lg:hidden border-t border-white/5 px-4 py-2 gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("banners")}
            className={`rounded-lg px-3 py-1 text-xs font-bold whitespace-nowrap ${
              activeTab === "banners" ? "bg-[#d31820] text-white" : "text-gray-400"
            }`}
          >
            Banners ({banners.length})
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`rounded-lg px-3 py-1 text-xs font-bold whitespace-nowrap ${
              activeTab === "categories" ? "bg-[#d31820] text-white" : "text-gray-400"
            }`}
          >
            Categories ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab("subcategories")}
            className={`rounded-lg px-3 py-1 text-xs font-bold whitespace-nowrap ${
              activeTab === "subcategories" ? "bg-[#d31820] text-white" : "text-gray-400"
            }`}
          >
            Subcategories ({subcategories.length})
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`rounded-lg px-3 py-1 text-xs font-bold whitespace-nowrap ${
              activeTab === "products" ? "bg-[#d31820] text-white" : "text-gray-400"
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("catalogs")}
            className={`rounded-lg px-3 py-1 text-xs font-bold whitespace-nowrap ${
              activeTab === "catalogs" ? "bg-[#d31820] text-white" : "text-gray-400"
            }`}
          >
            E-Catalog ({catalogs.length})
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {activeTab === "banners" && (
          <BannerManager
            banners={banners}
            onRefresh={() => {
              fetchData();
              showNotification("Banner updated successfully");
            }}
          />
        )}
        {activeTab === "categories" && (
          <CategoryManager
            categories={categories}
            onRefresh={() => {
              fetchData();
              showNotification("Category updated successfully");
            }}
          />
        )}
        {activeTab === "subcategories" && (
          <SubcategoryManager
            subcategories={subcategories}
            categories={categories}
            onRefresh={() => {
              fetchData();
              showNotification("Subcategory updated successfully");
            }}
          />
        )}
        {activeTab === "products" && (
          <ProductManager
            products={products}
            categories={categories}
            subcategories={subcategories}
            onRefresh={() => {
              fetchData();
              showNotification("Product catalog updated successfully");
            }}
          />
        )}
        {activeTab === "catalogs" && (
          <CatalogManager
            catalogs={catalogs}
            onRefresh={() => {
              fetchData();
              showNotification("Catalogue updated successfully");
            }}
          />
        )}
      </main>
    </div>
  );
}
