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
import { FaqManager, FaqItem } from "@/components/admin/FaqManager";
import { WarrantyManager, WarrantyItem } from "@/components/admin/WarrantyManager";
import { WarrantyModelManager, WarrantyModelItem } from "@/components/admin/WarrantyModelManager";

type TabType =
  | "banners"
  | "categories"
  | "subcategories"
  | "products"
  | "catalogs"
  | "faqs"
  | "warranty_models"
  | "warranties";

interface TabConfig {
  id: TabType;
  label: string;
  icon: string;
  count: number;
}

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
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [warrantyModels, setWarrantyModels] = useState<WarrantyModelItem[]>([]);
  const [warranties, setWarranties] = useState<WarrantyItem[]>([]);

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
      const [
        bannersRes,
        catRes,
        subcatRes,
        prodRes,
        catlogRes,
        faqsRes,
        modelsRes,
        warrantiesRes,
      ] = await Promise.all([
        fetch("/api/admin/banners"),
        fetch("/api/admin/categories"),
        fetch("/api/admin/subcategories"),
        fetch("/api/admin/products"),
        fetch("/api/admin/catalogs"),
        fetch("/api/admin/faqs"),
        fetch("/api/admin/warranty-models"),
        fetch("/api/admin/warranties"),
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
      if (faqsRes.ok) {
        const f = await faqsRes.json();
        setFaqs(f.faqs || []);
      }
      if (modelsRes.ok) {
        const m = await modelsRes.json();
        setWarrantyModels(m.models || []);
      }
      if (warrantiesRes.ok) {
        const w = await warrantiesRes.json();
        setWarranties(w.warranties || []);
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

  const tabs: TabConfig[] = [
    { id: "banners", label: "Hero Banners", icon: "🖼️", count: banners.length },
    { id: "categories", label: "Categories", icon: "📁", count: categories.length },
    { id: "subcategories", label: "Subcategories", icon: "🗂️", count: subcategories.length },
    { id: "products", label: "Product Catalog", icon: "⚡", count: products.length },
    { id: "catalogs", label: "E-Catalogs", icon: "📄", count: catalogs.length },
    { id: "faqs", label: "FAQs", icon: "❓", count: faqs.length },
    { id: "warranty_models", label: "Equipment Models", icon: "⚙️", count: warrantyModels.length },
    { id: "warranties", label: "Warranty Claims", icon: "🛡️", count: warranties.length },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0c] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#d31820] border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Initializing TUQO Enterprise CMS...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090a0d] text-white selection:bg-[#d31820] selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs font-bold shadow-2xl transition-all ${
            notification.type === "success"
              ? "bg-emerald-600 text-white border border-emerald-400 shadow-emerald-950/50"
              : "bg-red-600 text-white border border-red-400 shadow-red-950/50"
          }`}
        >
          <span className="text-sm">{notification.type === "success" ? "✓" : "⚠"}</span>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Enterprise CMS Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1115]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
          {/* Brand & CMS status */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2.5 hover:opacity-90 transition">
              <TuqoLogo variant="white" width={115} />
              <div className="flex items-center gap-1.5">
                <span className="rounded-md bg-[#d31820] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-xs shadow-red-900/40">
                  CMS PRO
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
            </Link>
          </div>

          {/* User profile & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={fetchData}
              disabled={refreshing}
              title="Refresh all database data"
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
            >
              <span className={`text-xs ${refreshing ? "animate-spin" : ""}`}>🔄</span>
              <span className="hidden md:inline">{refreshing ? "Syncing..." : "Sync Data"}</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              <span>View Site</span>
              <span className="text-[10px]">↗</span>
            </Link>

            <div className="hidden lg:flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5">
              <div className="h-6 w-6 rounded-full bg-[#d31820] flex items-center justify-center text-[11px] font-black text-white">
                {user?.name ? user.name[0].toUpperCase() : "A"}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-tight">{user?.name || "Administrator"}</span>
                <span className="text-[10px] text-gray-400 font-mono leading-tight">{user?.email || "admin@tuqotools.com"}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* CMS Tab Navigation Bar */}
        <div className="border-t border-white/5 bg-[#14161d]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#d31820] text-white shadow-md shadow-red-900/30 ring-1 ring-red-400/30"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                    }`}
                  >
                    <span className="text-sm">{tab.icon}</span>
                    <span>{tab.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-black transition ${
                        isActive
                          ? "bg-black/30 text-white"
                          : "bg-white/10 text-gray-300 group-hover:bg-white/15"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {activeTab === "banners" && (
          <BannerManager
            banners={banners}
            onRefresh={() => {
              fetchData();
              showNotification("Hero banners updated");
            }}
          />
        )}
        {activeTab === "categories" && (
          <CategoryManager
            categories={categories}
            onRefresh={() => {
              fetchData();
              showNotification("Category saved successfully");
            }}
          />
        )}
        {activeTab === "subcategories" && (
          <SubcategoryManager
            subcategories={subcategories}
            categories={categories}
            onRefresh={() => {
              fetchData();
              showNotification("Subcategory saved successfully");
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
              showNotification("E-Catalogue updated successfully");
            }}
          />
        )}
        {activeTab === "faqs" && (
          <FaqManager
            faqs={faqs}
            onRefresh={() => {
              fetchData();
              showNotification("FAQs updated successfully");
            }}
          />
        )}
        {activeTab === "warranty_models" && (
          <WarrantyModelManager
            models={warrantyModels}
            onRefresh={() => {
              fetchData();
              showNotification("Equipment models updated successfully");
            }}
          />
        )}
        {activeTab === "warranties" && (
          <WarrantyManager
            warranties={warranties}
            onRefresh={() => {
              fetchData();
              showNotification("Warranty registrations refreshed");
            }}
          />
        )}
      </main>
    </div>
  );
}
