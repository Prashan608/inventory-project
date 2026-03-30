async function search() {
  const q = document.getElementById("search").value.trim();
  const category = document.getElementById("category").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;

  const container = document.getElementById("results");
  const btn = document.querySelector("button");

  // 🛑 Edge Case 1: Invalid Price Range
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    container.innerHTML = "<p style='color:red;'>Invalid price range</p>";
    return;
  }

  // 🔄 Loading State + Disable button
  container.innerHTML = "<p>Loading...</p>";
  btn.disabled = true;

  try {
    // ✅ Build URL safely
    let url = "http://localhost:5000/search?";
    let params = new URLSearchParams();

    if (q) params.append("q", q);
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    url += params.toString();

    const res = await fetch(url);

    // 🛑 Edge Case 2: API error
    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();

    // 🛑 Edge Case 3: No results
    if (data.length === 0) {
      container.innerHTML = "<p>No results found</p>";
      return;
    }

    // ✅ Render as TABLE (professional UI)
    container.innerHTML = `
      <table border="1" width="100%" cellpadding="10">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(item => `
            <tr>
              <td>${item.product_name}</td>
              <td>${item.category}</td>
              <td>₹${item.price}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

  } catch (error) {
    // 🛑 Edge Case 4: Network / server issue
    container.innerHTML = "<p style='color:red;'>Something went wrong</p>";
  } finally {
    // 🔓 Enable button again
    btn.disabled = false;
  }
}