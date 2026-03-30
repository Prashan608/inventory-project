const express = require("express");
const cors = require("cors");
const data = require("./data");
const connectToDb = require("./connectDb");

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Connect Database
connectToDb();

// ==========================
// 🔍 PART A: SEARCH API
// ==========================
app.get("/search", (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  let results = data;

  // 🛑 Edge Case: Invalid price range
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({ message: "Invalid price range" });
  }

  // 🔍 Product name filter
  if (q) {
    results = results.filter(item =>
      item.product_name.toLowerCase().includes(q.toLowerCase())
    );
  }

  // 📂 Category filter
  if (category) {
    results = results.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // 💰 Min price
  if (minPrice) {
    results = results.filter(item => item.price >= Number(minPrice));
  }

  // 💰 Max price
  if (maxPrice) {
    results = results.filter(item => item.price <= Number(maxPrice));
  }

  res.json(results);
});

// ==========================
// 🔥 PART B: ROUTES ADD
// ==========================

// Supplier routes
app.use("/supplier", require("./routes/supplierRoutes"));

// Inventory routes
app.use("/inventory", require("./routes/inventoryRoutes"));

// ==========================
// 🚀 SERVER START
// ==========================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});