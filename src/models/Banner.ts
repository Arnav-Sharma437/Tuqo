import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBanner extends Document {
  title: string;
  subtitle?: string;
  badge?: string;
  desktopImage: string;
  mobileImage: string;
  buttonText?: string;
  buttonLink?: string;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    badge: { type: String, default: "" },
    desktopImage: { type: String, required: true },
    mobileImage: { type: String, required: true },
    buttonText: { type: String, default: "Explore Products" },
    buttonLink: { type: String, default: "/categories" },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Banner: Model<IBanner> =
  mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);
export default Banner;
