const ProductsLinksList = async () => {
  const data2 = await axios.get("https://fakestoreapi.com/products/categories");
  const result = data2.data;
  return result;
};
ProductsLinksList();
const DisplayDataHeadings = async () => {
  const data2 = await ProductsLinksList();
  const result = data2
    .map((ele) => {
      return `
    <li><a href="./Products.html?category=${ele}">${ele}</a></li>
    `;
    })
    .join("");
  document.querySelector(".links .jscome").innerHTML = result;
};

DisplayDataHeadings();
const displayCategory = async () => {
  try {
    const getUrl = new URLSearchParams(window.location.search);
    const category = getUrl.get("category");
    const { data } = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );

    document.querySelector(".titleChanger").innerHTML = category;
    document.querySelector(".path h2").innerHTML =
      "<a class='path-title' href='./index.html'>Category / </a>" +
      `<a class='path-category' href='./Products.html?category=${category}'>${category}</a>`;
    return data;
  } catch (error) {
    document.querySelector(".error-handle").style.display = "block";
  }
};
displayCategory();
const display_products = async () => {
  const data = await displayCategory();
  try {
    const result = data
      .map(
        (ele, index) =>
          `
      <div class="card-info" data-index="${index}" data-image="${ele.image}" data-title="${ele.title}" data-price="${ele.price}" data-description="${ele.description}">
        <div class="img-info">
          <img src="${ele.image}" alt="" class="modal-imgs">
        </div>
        <div class="card-title">
          <h2 class="title-info">${ele.title}</h2>
        </div>
        <div class="card-price">
          <h5 class="${ele.price} modal-price">Price is :${ele.price}$</h5>
        </div>
      </div>    
      `
      )
      .join("");
    document.querySelector(".card").innerHTML = result;
    document.querySelector(".loader-cont").style.display = "none";

    const cardInfos = document.querySelectorAll(".card-info");
    cardInfos.forEach((card) => {
      card.addEventListener("click", () => {
        const modal = document.querySelector(".my-modal");
        modal.classList.remove("d-none-modal");

        const image = card.dataset.image;
        const title = card.dataset.title;
        const price = card.dataset.price;
        const description = card.dataset.description;

        const modal_img = modal.querySelector("img");
        const modal_title = modal.querySelector("h2");
        const modal_price = modal.querySelector(".modal-price");
        const modal_desc = modal.querySelector(".modal-description");

        modal_img.src = image;
        modal_title.innerHTML = `Product Name: ${title}`;
        modal_price.innerHTML = `Product Price: $${price}`;
        modal_desc.innerHTML = `Description: ${description}`;

        currentIndex = parseInt(card.dataset.index);
      });
    });
  } catch (error) {
    document.querySelector(".error-handle").style.display = "block";
  }
};
display_products();
/*modal main function*/
let currentIndex = 0;
const modal_func = () => {
  const modal = document.querySelector(".my-modal");
  const close_btn = document.querySelector(".x-btn");
  const Right_btn = document.querySelector(".right-btn");
  const leftbtn = document.querySelector(".left-btn");

  const modal_img = modal.querySelector("img");
  const modal_title = modal.querySelector("h2");
  const modal_price = modal.querySelector(".modal-price");
  const modal_desc = modal.querySelector(".modal-description");

  const updateModalContent = (index) => {
    const cardInfos = document.querySelectorAll(".card-info");
    const productContainer = cardInfos[index];
    modal_img.src = productContainer.dataset.image;
    modal_title.innerHTML = `Product Name: ${productContainer.dataset.title}`;
    modal_price.innerHTML = `Product Price: $${productContainer.dataset.price}`;
    modal_desc.innerHTML = `Description: ${productContainer.dataset.description}`;
  };

  Right_btn.addEventListener("click", () => {
    currentIndex =
      (currentIndex + 1) % document.querySelectorAll(".card-info").length;
    updateModalContent(currentIndex);
  });

  leftbtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + document.querySelectorAll(".card-info").length) %
      document.querySelectorAll(".card-info").length;
    updateModalContent(currentIndex);
  });

  close_btn.addEventListener("click", () => {
    modal.classList.add("d-none-modal");
  });
  document.addEventListener("keydown", (e) => {
    if (e.code == "ArrowRight") {
      currentIndex =
        (currentIndex + 1) % document.querySelectorAll(".card-info").length;
      updateModalContent(currentIndex);
    } else if (e.code == "ArrowLeft") {
      currentIndex =
        (currentIndex - 1 + document.querySelectorAll(".card-info").length) %
        document.querySelectorAll(".card-info").length;
      updateModalContent(currentIndex);
    } else if (e.code == "Escape") {
      const close_modal = document.querySelector(".my-modal");
      close_modal.classList.add("d-none-modal");
    }
  });
};
modal_func();
