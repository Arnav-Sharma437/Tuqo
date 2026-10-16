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
  | "warranties"
  | "warranty_models"
  | "products"
  | "categories"
  | "subcategories"
  | "banners"
  | "catalogs"
  | "faqs";

interface TabConfig {
  id: TabType;
  label: string;
  icon: string;
  count: number;
  description?: string;
}

interface NavSection {
  title: string;
  tabs: TabType[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  // Default to warranties tab so customer registration data is shown front-and-center!
  const [activeTab, setActiveTab] = useState<TabType>("warranties");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Sync tab with URL search parameter if provided (e.g. /admin?tab=warranties)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as TabType;
      const validTabs: TabType[] = [
        "warranties",
        "warranty_models",
        "products",
        "categories",
        "subcategories",
        "banners",
        "catalogs",
        "faqs",
      ];
      if (tabParam && validTabs.includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tabId);
      window.history.replaceState({}, "", url.toString());
    }
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

  // Tab configurations
  const tabMap: Record<TabType, TabConfig> = {
    warranties: {
      id: "warranties",
      label: "Warranty Registrations",
      icon: "🛡️",
      count: warranties.length,
      description: "Customer registrations, invoices & verification",
    },
    warranty_models: {
      id: "warranty_models",
      label: "Equipment Models",
      icon: "⚙️",
      count: warrantyModels.length,
      description: "Manage warranty dropdown models & coverage",
    },
    products: {
      id: "products",
      label: "Product Catalog",
      icon: "⚡",
      count: products.length,
      description: "Machinery, specs & inventory status",
    },
    categories: {
      id: "categories",
      label: "Categories",
      icon: "📁",
      count: categories.length,
      description: "Primary product equipment categories",
    },
    subcategories: {
      id: "subcategories",
      label: "Subcategories",
      icon: "🗂️",
      count: subcategories.length,
      description: "Sub-divisions for equipment line",
    },
    banners: {
      id: "banners",
      label: "Hero Banners",
      icon: "🖼️",
      count: banners.length,
      description: "Homepage slideshow graphics & banners",
    },
    catalogs: {
      id: "catalogs",
      label: "E-Catalogs",
      icon: "📄",
      count: catalogs.length,
      description: "Downloadable PDF technical brochures",
    },
    faqs: {
      id: "faqs",
      label: "FAQs",
      icon: "❓",
      count: faqs.length,
      description: "Help center questions & answers",
    },
  };

  const navSections: NavSection[] = [
    {
      title: "Warranty & Customers",
      tabs: ["warranties", "warranty_models"],
    },
    {
      title: "Inventory & Catalog",
      tabs: ["products", "categories", "subcategories"],
    },
    {
      title: "Website Content",
      tabs: ["banners", "catalogs", "faqs"],
    },
  ];

  const currentTab = tabMap[activeTab];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090a0d] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-[#d31820] border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Initializing TUQO Enterprise CMS...
          </p>
        </div>
      </div>
    );
  }

  // Sidebar Component JSX
  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between">
      {/* Top Brand Header */}
      <div>
        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 transition hover:opacity-90"
            >
              <TuqoLogo variant="white" width={110} />
              <div className="flex flex-col">
                <span className="rounded-md bg-[#d31820] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-xs shadow-red-900/40">
                  CMS PRO
                </span>
              </div>
            </Link>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live DB
            </span>
          </div>
          <p className="mt-2 text-[11px] text-gray-400">
            Industrial Tools &amp; Machinery Console
          </p>
        </div>

        {/* Navigation Sections */}
        <nav className="p-3 space-y-5">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.tabs.map((tabKey) => {
                  const tab = tabMap[tabKey];
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#d31820] text-white shadow-md shadow-red-950/50 font-bold"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-base shrink-0">{tab.icon}</span>
                        <span className="truncate">{tab.label}</span>
                      </div>
                      <span
                        className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black transition ${
                          isActive
                            ? "bg-black/30 text-white"
                            : "bg-white/10 text-gray-400 group-hover:bg-white/15 group-hover:text-gray-200"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer & User Profile */}
      <div className="border-t border-white/10 p-4 space-y-3 bg-[#0a0b0e]">
        <Link
          href="/"
          target="_blank"
          className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
        >
          <span className="flex items-center gap-2">
            <span>🌐</span>
            <span>View Live Website</span>
          </span>
          <span className="text-xs text-gray-500">↗</span>
        </Link>

        <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 p-2.5">
          <div className="flex items-center gap-2.5 truncate">
            <div className="h-7 w-7 shrink-0 rounded-full bg-[#d31820] flex items-center justify-center text-xs font-black text-white shadow-sm shadow-red-900/50">
              {user?.name ? user.name[0].toUpperCase() : "A"}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate leading-tight">
                {user?.name || "Administrator"}
              </div>
              <div className="text-[10px] text-gray-400 font-mono truncate leading-tight">
                {user?.email || "admin@tuqotools.com"}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out of Admin CMS"
            className="shrink-0 rounded-lg p-1.5 text-xs text-red-400 hover:bg-red-500/20 hover:text-red-300 transition"
          >
            🚪
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#090a0d] text-white selection:bg-[#d31820] selection:text-white">
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

      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 flex-col border-r border-white/10 bg-[#0d0f14] sticky top-0 h-screen overflow-y-auto z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0d0f14] border-r border-white/10 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-4 right-3">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg bg-white/5 p-1.5 text-xs text-gray-400 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* Main Right Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen bg-[#090a0d]">
        {/* Sticky CMS Top Navigation Header */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0f1115]/95 backdrop-blur-md px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile hamburger & Tab Header title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden rounded-xl border border-white/10 bg-white/5 p-2 text-gray-300 hover:bg-white/10 hover:text-white transition"
                aria-label="Open CMS Menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center gap-2.5">
                <span className="text-xl">{currentTab.icon}</span>
                <div>
                  <h1 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{currentTab.label}</span>
                    <span className="rounded-full bg-white/10 border border-white/15 px-2 py-0.5 text-[10px] font-mono text-gray-300">
                      {currentTab.count}
                    </span>
                  </h1>
                  <p className="hidden md:block text-[11px] text-gray-400">
                    {currentTab.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Quick actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={fetchData}
                disabled={refreshing}
                title="Refresh and sync all MongoDB data"
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
              >
                <span className={`text-xs ${refreshing ? "animate-spin" : ""}`}>🔄</span>
                <span className="hidden sm:inline">{refreshing ? "Syncing..." : "Sync DB"}</span>
              </button>

              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition"
              >
                <span>Live Site</span>
                <span className="text-[10px]">↗</span>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Quick Customer Warranty Registration Alert if on another tab */}
        {warranties.length > 0 && activeTab !== "warranties" && (
          <div className="px-4 sm:px-6 lg:px-8 pt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-3.5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    {warranties.length} Customer Warranty Registrations in Database
                  </div>
                  <div className="text-xs text-gray-300 mt-0.5">
                    Latest: <span className="font-bold text-white">{warranties[0]?.customerName}</span> ({warranties[0]?.registrationId}) — {warranties[0]?.products?.[0]?.model || "Equipment"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleTabChange("warranties")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500 transition whitespace-nowrap self-start sm:self-auto shadow-md"
              >
                <span>View Registrations ({warranties.length}) →</span>
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Manager Tab Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {activeTab === "warranties" && (
            <WarrantyManager
              warranties={warranties}
              onRefresh={() => {
                fetchData();
                showNotification("Warranty registrations refreshed");
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
          {activeTab === "banners" && (
            <BannerManager
              banners={banners}
              onRefresh={() => {
                fetchData();
                showNotification("Hero banners updated");
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
        </main>
      </div>
    </div>
  );
}
