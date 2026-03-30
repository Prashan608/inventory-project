// routes/supplierRoutes.js

const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier");

// ✅ POST /supplier
router.post("/", async (req, res) => {
  try {
    const { name, city } = req.body;

    // Basic validation
    if (!name || !city) {
      return res.status(400).json({ message: "Name and city required" });
    }

    const supplier = new Supplier({ name, city });
    await supplier.save();

    res.status(201).json(supplier);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;