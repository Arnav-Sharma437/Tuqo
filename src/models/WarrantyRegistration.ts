import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWarrantyProduct {
  model: string;
  serialNumber: string;
  productName?: string;
  warrantyMonths?: number;
}

export interface IWarrantyRegistration extends Document {
  registrationId: string;
  customerName: string;
  mobile: string;
  email?: string;
  pincode: string;
  city?: string;
  state?: string;
  address?: string;
  products: IWarrantyProduct[];
  purchaseDate: string;
  source: string;
  dealerName?: string;
  dealerCity?: string;
  invoiceUrl?: string;
  status: "Active" | "Pending" | "Verified" | "Rejected";
  warrantyExpiryDate?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WarrantyProductSchema = new Schema<IWarrantyProduct>(
  {
    model: { type: String, required: true },
    serialNumber: { type: String, required: true },
    productName: { type: String, default: "" },
    warrantyMonths: { type: Number, default: 12 },
  },
  { _id: false }
);

const WarrantyRegistrationSchema = new Schema<IWarrantyRegistration>(
  {
    registrationId: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    mobile: { type: String, required: true, index: true },
    email: { type: String, default: "" },
    pincode: { type: String, required: true },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    address: { type: String, default: "" },
    products: { type: [WarrantyProductSchema], required: true },
    purchaseDate: { type: String, required: true },
    source: { type: String, default: "Authorized Dealer" },
    dealerName: { type: String, default: "" },
    dealerCity: { type: String, default: "" },
    invoiceUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Active", "Pending", "Verified", "Rejected"],
      default: "Active",
    },
    warrantyExpiryDate: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const WarrantyRegistration: Model<IWarrantyRegistration> =
  mongoose.models.WarrantyRegistration ||
  mongoose.model<IWarrantyRegistration>("WarrantyRegistration", WarrantyRegistrationSchema);

export default WarrantyRegistration;
