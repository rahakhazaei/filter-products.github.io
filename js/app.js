// http://localhost:3000/items

const searchBox = document.querySelector("#searchBox");
const productWrapper = document.querySelector(".products-wrapper");
const btns = document.querySelectorAll(".btn");

let productsData = [];
let searchItems = {
  filters: "",
};

// page load
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      productsData = res.data;
      renderProduct();
    })
    .catch((err) => console.log(err));
});

// functions
function renderProduct() {
  productWrapper.innerHTML = "";
  //create product item div
  const filteredData = productsData.filter((data) => {
    return data.title.toLowerCase().includes(searchItems.filters.toLowerCase());
  });
  filteredData.forEach((item) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `<div class="image-wrapper">
        <img src=${item.image} alt="p-${item.id}" />
      </div>
      <div class="product-info">
        <span class="product-price">${item.price} $</span>
        <span class="product-name">${item.title}</span>
      </div>`;
    productWrapper.appendChild(productItem);
  });
}

searchBox.addEventListener("input", (e) => {
  // console.log(e.target.value);
  searchItems.filters = e.target.value;
  renderProduct();
});

//filter button
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    searchItems.filters = e.target.dataset.filter;
    renderProduct();
  });
});
