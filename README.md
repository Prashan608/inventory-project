# Inventory Search API + Database System

## 📌 Project Overview

This project implements an inventory search system where users can search products using multiple filters. It also includes a backend database system where suppliers can add inventory and retrieve grouped insights.

---

# 🚀 PART A: Inventory Search API + UI

## 🔹 Features

### Backend

* REST API: `GET /search`
* Supports query parameters:

  * `q` → product name (partial, case-insensitive)
  * `category`
  * `minPrice`
  * `maxPrice`
* Multiple filters can be combined
* Returns all results if no filters are applied
* Uses in-memory data (static array)

---

### Frontend

* Search input box
* Category dropdown
* Price range inputs
* Results displayed in a table
* "No results found" message
* Loading state and error handling

---

## 🧠 Search Logic

* Applied filtering step-by-step on data
* Used **case-insensitive matching** with `.toLowerCase()`
* Combined filters using **AND logic**
* Built query parameters dynamically using `URLSearchParams`

---

## ⚠️ Edge Cases Handled

* Invalid price range (minPrice > maxPrice)
* Empty search query (returns all results)
* No matching results
* API/server errors
* Network failures

---

## ⚡ Performance Improvement

* Add **database indexing**
* Implement **pagination**
* Use **caching (Redis)**

---

# 🚀 PART B: Inventory Database + APIs

## 🗄️ Database Schema

### 🔹 Suppliers Collection

* `id`
* `name`
* `city`

### 🔹 Inventory Collection

* `id`
* `supplier_id` (reference to Supplier)
* `product_name`
* `quantity`
* `price`

### 🔗 Relationship

* One Supplier → Many Inventory items

---

## 🔌 Backend APIs

### ➤ Create Supplier

POST /supplier

### ➤ Create Inventory

POST /inventory

### ➤ Get Inventory

GET /inventory

---

## ⚠️ Validation Rules

* Inventory must belong to a valid supplier
* Quantity must be ≥ 0
* Price must be > 0

---

## 💣 Complex Query (Important)

### ➤ Get Inventory Grouped by Supplier

GET /inventory/grouped

### 🧠 Logic

* Used MongoDB Aggregation Pipeline:

  * $lookup → join supplier data
  * $group → group by supplier
  * $sum → calculate total value (quantity × price)
  * $sort → sort by total value (descending)

---

## ⚡ Why MongoDB?

* Flexible schema
* Easy relationship handling with references
* Powerful aggregation framework
* Faster development for small-to-medium apps

---

## ⚡ Optimization Suggestion

* Add index on:

  * supplier_id
  * product_name
* Improves query performance for large datasets

---

# 🛠️ Tech Stack

* Backend: Node.js, Express
* Database: MongoDB (Mongoose)
* Frontend: HTML, CSS, JavaScript
* Testing: Postman

---

# ▶️ How to Run

### Backend

cd backend
npm install
node server.js

### Frontend

Open index.html in browser

---

# ✅ Status

✔ Fully implemented with all required features, validations, and edge cases
✔ Includes both search system and database APIs
✔ Ready for submission and interview discussion
