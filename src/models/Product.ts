import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductSpec {
  label: string;
  value: string;
}

export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  model: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  subcategorySlug?: string;
  image: string;
  images: string[];
  shortDesc: string;
  description: string;
  tag: string;
  features: string[];
  specs: IProductSpec[];
  applications: string[];
  inStock: boolean;
  featured: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    model: { type: String, default: "" },
    category: { type: String, required: true },
    categorySlug: { type: String, required: true },
    subcategory: { type: String, default: "" },
    subcategorySlug: { type: String, default: "" },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    shortDesc: { type: String, default: "" },
    description: { type: String, default: "" },
    tag: { type: String, default: "" },
    features: { type: [String], default: [] },
    specs: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    applications: { type: [String], default: [] },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
