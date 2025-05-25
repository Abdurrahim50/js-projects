// HTML Elemanları (tek seferde tanımlandı)
const searchBar = document.getElementById("searchBar");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const minmax = document.querySelector(".minmax");

// API bilgileri
const url = "https://api.openweathermap.org/data/2.5";
const key = "c424cc1650e053b39f2784bf361826f3";

// Kullanıcı Enter tuşuna basarsa hava durumu verisini al
const setQuery = (e) => {
  if (e.key === "Enter") {
    getResult(searchBar.value);
  }
};

// API'den şehir verisini al
const getResult = (cityName) => {
  const query = `${url}/weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;

  fetch(query)
    .then((weather) => weather.json())
    .then(displayResult)
    .catch((err) => {
      alert("Veri alınırken bir hata oluştu.");
      console.error("API Hatası:", err);
    });
};

// Gelen hava durumu verilerini sayfaya yazdır
const displayResult = (result) => {
  if (result.cod !== 200) {
    let userMessage = result.message;
    if (userMessage === "city not found") {
      userMessage = "Şehir bulunamadı. Lütfen doğru yazdığınızdan emin olun.";
    } else if (userMessage === "Invalid API key") {
      userMessage = "API anahtarınız geçersiz.";
    }
    Swal.fire({
      icon: "error",
      title: "Hata..",
      text: userMessage,
    });
    return;
  }
  city.innerText = `${result.name}, ${result.sys.country}`;
  temp.innerText = `${Math.round(result.main.temp)}°C`;
  desc.innerText = result.weather[0].description;
  minmax.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(
    result.main.temp_max
  )}°C`;
};

// Arama kutusunda Enter'a basıldığında setQuery çalışsın
searchBar.addEventListener("keypress", setQuery);
