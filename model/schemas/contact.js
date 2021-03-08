const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      unique: false,
    },
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.virtual("strNameAge").get(function () {
  return `${this.name}  ${this.phone}`;
});

contactSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactSchema);

module.exports = Contact;
