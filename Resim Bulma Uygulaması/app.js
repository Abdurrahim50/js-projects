const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");

runEventListeners();

function runEventListeners() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clear);
}

function clear() {
  const value = searchInput.value.trim();
  const hasImages = imageListWrapper.children.length > 0;

  if (!hasImages) {
    alert("Temizlenecek resim bulunmamaktadır.");
    return;
  }

  // Resimler varsa temizle
  Array.from(imageListWrapper.children).forEach((child) => child.remove());

  // Input varsa önce arama yaptır
  if (value) {
    alert("Lütfen önce arama yapınız")
  }
}

function search(e) {
  e.preventDefault();

  const value = searchInput.value.trim();
  if (!value) {
    alert("Lütfen bir kelime girin.");
    return;
  }

  // Önce eski görselleri temizle
  Array.from(imageListWrapper.children).forEach((child) => child.remove());

  fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID C-ZwMdVfZLUqf2EUV6lJeOB9k0_1CVGHsXaUfwJRamU",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((image) => {
        addImageToUI(image.urls.small);
      });
      searchInput.value = "";
    })
    .catch((err) => console.log(err));
}

function addImageToUI(url) {
  /*
 <div class="card">
                <img src="" alt="">
            </div>
    */
  console.log(imageListWrapper);
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.height = "400";
  img.width = "400";

  div.append(img);
  imageListWrapper.append(div);
}
