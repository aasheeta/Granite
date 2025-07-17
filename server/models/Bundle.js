const mongoose = require('mongoose');

const plateSchema = new mongoose.Schema({
  number: String,
  widthFt: String,
  heightFt: String,
  totalSqFt: String
}, { _id: false }); // Set _id: false to avoid MongoDB auto-generating an ID for each plate

const bundleSchema = new mongoose.Schema({
  supplier: String,
  material: String,
  quality: String,
  thickness: String,
  finish: String,
  block: String,
  bundle: String,
  isSelf: Boolean,
  priceSqMt: String,
  priceSqFt: String,
  oldPriceSqMt: String,
  oldPriceSqFt: String,
  tags: [String],
  availability: String,
  status: {
    type: String,
    enum: ['available', 'on-hold', 'sold'],
    default: 'available'
  },
  plates: [plateSchema], // ✅ Add this line to include plates
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bundle', bundleSchema);
