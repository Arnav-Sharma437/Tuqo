import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICatalog extends Document {
  title: string;
  description?: string;
  pdfUrl: string;
  coverImage?: string;
  fileSize?: string;
  category?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CatalogSchema = new Schema<ICatalog>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    pdfUrl: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    fileSize: { type: String, default: "" },
    category: { type: String, default: "General" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Catalog: Model<ICatalog> =
  mongoose.models.Catalog || mongoose.model<ICatalog>("Catalog", CatalogSchema);
export default Catalog;
