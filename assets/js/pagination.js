const getData = async (page) => {
    const loader = document.querySelector(".loader-cont");
    loader.style.display = "block"; // إظهار الـ loader

    const allData = await axios.get("https://fakestoreapi.com/products").then(res => res.data);
    const totalProducts = allData.length;
    const skip = (page - 1) * 3;

    loader.style.display = "none"; // إخفاء الـ loader بعد تحميل البيانات
    return { data: allData.slice(skip, skip + 3), totalProducts };
};

const display_products = async (page = 1) => {
    const loader = document.querySelector(".loader-cont");
    loader.style.display = "block"; // إظهار الـ loader

    const { data, totalProducts } = await getData(page);
    const NumberOfPages = Math.ceil(totalProducts / 3);

    console.log(`Total Pages: ${NumberOfPages}`);

    const productContainer = document.querySelector(".card");
    productContainer.innerHTML = data.map((ele, index) => `
        <div class="card-info" 
             data-index="${index}" 
             data-image="${ele.image}" 
             data-title="${ele.title}" 
             data-price="${ele.price}" 
             data-description="${ele.description}">
          <div class="img-info">
            <img src="${ele.image}" alt="" class="modal-imgs">
          </div>
          <div class="card-title">
            <h2 class="title-info">${ele.title}</h2>
          </div>
          <div class="card-price">
            <h5 class="modal-price">Price: ${ele.price}$</h5>
          </div>
        </div>`).join(" ");

    // إخفاء الـ loader بعد إتمام عرض المنتجات
    loader.style.display = "none";

    let paginationLinks = '';
    
    // Disable previous button if it's the first page
    if (page > 1) {
        paginationLinks += `<li><a href="#" class="arrow prev" data-page="${page - 1}">&lt;</a></li>`;
    } else {
        paginationLinks += `<li><a href="#" class="arrow prev disabled">&lt;</a></li>`;
    }

    // Add page numbers
    for (let i = 1; i <= NumberOfPages; i++) {
        paginationLinks += `<li><a href="#" class="list-num ${i === page ? 'active' : ''}" data-page="${i}">${i}</a></li>`;
    }

    // Disable next button if it's the last page
    if (page < NumberOfPages) {
        paginationLinks += `<li><a href="#" class="arrow next" data-page="${page + 1}">&gt;</a></li>`;
    } else {
        paginationLinks += `<li><a href="#" class="arrow next disabled">&gt;</a></li>`;
    }

    document.querySelector(".list-pagination").innerHTML = paginationLinks;

    addPaginationEvents();
    addCardClickEvents();
    modal_func();
};

const addPaginationEvents = () => {
    document.querySelectorAll(".list-pagination a").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const newPage = parseInt(el.dataset.page);
            if (newPage > 0) {
                display_products(newPage);
            }
        });
    });
};

const addCardClickEvents = () => {
    document.querySelectorAll(".card-info").forEach((card) => {
        card.addEventListener("click", () => {
            const modal = document.querySelector(".my-modal");
            modal.classList.remove("d-none-modal");

            modal.querySelector("img").src = card.dataset.image;
            modal.querySelector("h2").textContent = `Product Name: ${card.dataset.title}`;
            modal.querySelector(".modal-price").textContent = `Product Price: $${card.dataset.price}`;
            modal.querySelector(".modal-description").textContent = `Description: ${card.dataset.description}`;

            currentIndex = parseInt(card.dataset.index);
        });
    });
};

let currentIndex = 0;

const modal_func = () => {
    const modal = document.querySelector(".my-modal");
    const close_btn = document.querySelector(".x-btn");
    const right_btn = document.querySelector(".right-btn");
    const left_btn = document.querySelector(".left-btn");

    const updateModalContent = (index) => {
        const cardInfos = document.querySelectorAll(".card-info");
        if (cardInfos.length === 0) return;
        const productContainer = cardInfos[index];

        modal.querySelector("img").src = productContainer.dataset.image;
        modal.querySelector("h2").textContent = `Product Name: ${productContainer.dataset.title}`;
        modal.querySelector(".modal-price").textContent = `Product Price: $${productContainer.dataset.price}`;
        modal.querySelector(".modal-description").textContent = `Description: ${productContainer.dataset.description}`;
    };

    right_btn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % document.querySelectorAll(".card-info").length;
        updateModalContent(currentIndex);
    });

    left_btn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + document.querySelectorAll(".card-info").length) % document.querySelectorAll(".card-info").length;
        updateModalContent(currentIndex);
    });

    close_btn.addEventListener("click", () => {
        modal.classList.add("d-none-modal");
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "ArrowRight") {
            currentIndex = (currentIndex + 1) % document.querySelectorAll(".card-info").length;
            updateModalContent(currentIndex);
        } else if (e.code === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + document.querySelectorAll(".card-info").length) % document.querySelectorAll(".card-info").length;
            updateModalContent(currentIndex);
        } else if (e.code === "Escape") {
            modal.classList.add("d-none-modal");
        }
    });
};

display_products();
