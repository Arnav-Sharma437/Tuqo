import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWarrantyModel extends Document {
  name: string;
  code?: string;
  category?: string;
  warrantyMonths: number;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WarrantyModelSchema = new Schema<IWarrantyModel>(
  {
    name: {
      type: String,
      required: [true, "Equipment model name is required"],
      trim: true,
      unique: true,
    },
    code: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      trim: true,
      default: "Power Tools",
    },
    warrantyMonths: {
      type: Number,
      default: 6,
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const WarrantyModel: Model<IWarrantyModel> =
  mongoose.models.WarrantyModel ||
  mongoose.model<IWarrantyModel>("WarrantyModel", WarrantyModelSchema);

export default WarrantyModel;
