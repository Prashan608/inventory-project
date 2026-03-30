// routes/inventoryRoutes.js

const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const Supplier = require("../models/Supplier");


// ✅ POST /inventory
router.post("/", async (req, res) => {
  try {
    const { supplier_id, product_name, quantity, price } = req.body;

    // 🔴 Validation
    if (!supplier_id || !product_name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity must be >= 0" });
    }

    if (price <= 0) {
      return res.status(400).json({ message: "Price must be > 0" });
    }

    // 🔴 Check supplier exists
    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) {
      return res.status(400).json({ message: "Invalid supplier" });
    }

    const item = new Inventory({
      supplier_id,
      product_name,
      quantity,
      price
    });

    await item.save();

    res.status(201).json(item);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET /inventory
router.get("/", async (req, res) => {
  try {
    const data = await Inventory.find().populate("supplier_id");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 💣 GET /inventory/grouped (MOST IMPORTANT)
router.get("/grouped", async (req, res) => {
  try {
    const result = await Inventory.aggregate([
      {
        $lookup: {
          from: "suppliers",
          localField: "supplier_id",
          foreignField: "_id",
          as: "supplier"
        }
      },
      { $unwind: "$supplier" },
      {
        $group: {
          _id: "$supplier.name",
          totalValue: {
            $sum: { $multiply: ["$quantity", "$price"] }
          }
        }
      },
      {
        $sort: { totalValue: -1 }
      }
    ]);

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;