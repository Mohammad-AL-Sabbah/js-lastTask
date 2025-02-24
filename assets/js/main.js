const MainData = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products/categories");
  return data;
};
MainData();

const DisplayDataHeadings = async () => {
  const data2 = await MainData();
  const result = data2.map((ele) => {
    return `<li><a href="./Products.html?category=${ele}">${ele}</a></li>`;
  }).join("");
  document.querySelector(".links .jscome").innerHTML = result;
  document.querySelector(".loader-cont").style.display = "none";
};
DisplayDataHeadings();

const fetchAndDisplayData = async (category, containerSelector) => {
  const { data } = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
  const result = data.map((ele) => {
    return `
      <button class="elect-hero-btn">
        <div class="brand-cont jselect" data-description="${ele.description}" data-title="${ele.title}" data-price="${ele.price}" data-image="${ele.image}">
          <div class="img-brad jsimge">
            <img src="${ele.image}" alt="" class="modal-imgs">
          </div>
          <div class="brand-name jsname">
            <h3 class="product-title">${ele.title}</h3>
          </div>
          <div class="brand-name" style="display: none">
            <h3 class="modal-price">${ele.price}</h3>
          </div>
        </div>
      </button>
    `;
  }).join("");

  document.querySelector(containerSelector).innerHTML = result;
  modal_func();
};

fetchAndDisplayData("electronics", ".elect-heros .public-content");
fetchAndDisplayData("jewelery", ".Jwelary-heros .public-content");
fetchAndDisplayData("men's clothing", ".clothes-heros .public-content");
fetchAndDisplayData("women's clothing", ".clothes-heros .audate .public-content");


/*modal main function */
const modal_func = () => {
  const modal = document.querySelector(".my-modal");
  const close_btn = document.querySelector(".x-btn");
  const Right_btn = document.querySelector(".right-btn");
  const leftbtn = document.querySelector(".left-btn");
  let currentIndex = 0;

  const imges_modal = Array.from(document.querySelectorAll(".modal-imgs"));
  const modal_img = modal.querySelector("img");
  const modal_title = modal.querySelector("h2");
  const modal_price = modal.querySelector(".modal-price");
  const modal_desc = modal.querySelector(".modal-description");

  const updateModalContent = (index) => {
    const productContainer = imges_modal[index].closest(".brand-cont");
    modal_img.src = productContainer.dataset.image;
    modal_title.innerHTML = `Product Name: ${productContainer.dataset.title}`;
    modal_price.innerHTML = `Product Price: $${productContainer.dataset.price}`;
    modal_desc.innerHTML = `Description: ${productContainer.dataset.description}`;
  };

  imges_modal.forEach((ele, index) => {
    ele.addEventListener("click", (e) => {
      modal.classList.remove("d-none-modal");
      currentIndex = index;
      updateModalContent(currentIndex);
    });
  });

  /*close button - modal */
  close_btn.addEventListener("click", () => {
    modal.classList.add("d-none-modal");
  });
  /*right button - modal */

  Right_btn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % imges_modal.length;
    updateModalContent(currentIndex);
  });

  /*left button - modal */
  leftbtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imges_modal.length) % imges_modal.length;
    updateModalContent(currentIndex);
  });

};
