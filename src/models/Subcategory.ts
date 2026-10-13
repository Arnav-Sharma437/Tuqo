import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubcategory extends Document {
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  image?: string;
  description?: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubcategorySchema = new Schema<ISubcategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    categorySlug: { type: String, required: true },
    categoryName: { type: String, required: true },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

SubcategorySchema.index({ categorySlug: 1, slug: 1 });

export const Subcategory: Model<ISubcategory> =
  mongoose.models.Subcategory ||
  mongoose.model<ISubcategory>("Subcategory", SubcategorySchema);
export default Subcategory;
