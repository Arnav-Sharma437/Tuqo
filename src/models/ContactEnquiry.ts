import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactEnquiry extends Document {
  fullName: string;
  phone: string;
  email?: string;
  enquiryType: string;
  message: string;
  status: "New" | "Contacted" | "Closed";
  createdAt: Date;
  updatedAt: Date;
}

const ContactEnquirySchema = new Schema<IContactEnquiry>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
    enquiryType: {
      type: String,
      required: [true, "Enquiry type is required"],
      trim: true,
      default: "Product Information",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

const ContactEnquiry: Model<IContactEnquiry> =
  mongoose.models.ContactEnquiry ||
  mongoose.model<IContactEnquiry>("ContactEnquiry", ContactEnquirySchema);

export default ContactEnquiry;
