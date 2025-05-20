//? Elementleri Seçelim.

const amountInput = document.querySelector("#amount");
const firstOption = document.querySelector("#firstCurrencyOption");
const secondOption = document.querySelector("#secondCurrencyOption");
const resultInput = document.querySelector("#result");
const chartCanvas = document.getElementById("last7DaysChart");
let chart = null;
const currency = new Currency();

let chartInstance = null;

runEventListeners();

function runEventListeners() {
  amountInput.addEventListener("input", exchange);
  firstOption.addEventListener("change", exchange);
  secondOption.addEventListener("change", exchange);
  swapButton.addEventListener("click", swapCurrencies);
  window.addEventListener("load", exchange);
}

function swapCurrencies() {
  // İlk ve ikinci seçili dövizleri takasla
  const temp = firstOption.value;
  firstOption.value = secondOption.value;
  secondOption.value = temp;

  exchange(); // Takas sonrası sonucu güncelle
}

async function exchange() {
  const amount = Number(amountInput.value.trim());
  const fromCurrency = firstOption.value;
  const toCurrency = secondOption.value;

  const exchangedAmount = await currency.exchange(amount, fromCurrency, toCurrency);
  resultInput.value = exchangedAmount.toFixed(3);

  const rates = await currency.getLast7DaysRates(fromCurrency, toCurrency);
  drawLast7DaysChart(rates, fromCurrency, toCurrency);
}

function drawLast7DaysChart(rates, fromCurrency, toCurrency) {
  const ctx = document.getElementById("last7DaysChart").getContext("2d");

  // Önceki grafik varsa yok et
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Tarih etiketleri ve değer dizileri
  const labels = Object.keys(rates);
  const dataPoints = Object.values(rates);

  // Başlangıç ve bitiş değeri
  const startValue = dataPoints[0];
  const endValue   = dataPoints[dataPoints.length - 1];

  // Renkleri belirle
  const isRise = endValue >= startValue;
  const borderClr     = isRise ? "rgba(75, 192, 75, 1)"   : "rgba(192, 75, 75, 1)";
  const backgroundClr = isRise ? "rgba(75, 192, 75, 0.2)" : "rgba(192, 75, 75, 0.2)";

  // Yeni grafik
  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: `${fromCurrency} → ${toCurrency} (Son 7 Gün)`,
        data: dataPoints,
        fill: true,
        borderColor: borderClr,
        backgroundColor: backgroundClr,
        borderWidth: 3,
        tension: 0.3,
        pointBackgroundColor: borderClr,
        pointRadius: 5,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        spanGaps: true,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
          grid: { color: "rgba(0,0,0,0.1)" },
          title: {
            display: true,
            text: "Kur Değeri",
          },
        },
        x: {
          grid: { color: "rgba(0,0,0,0.05)" },
          ticks: { maxRotation: 45, minRotation: 45 },
          title: {
            display: true,
            text: "Tarih",
          },
        },
      },
      plugins: {
        legend: { display: false }, // İstersen kapatabilirsin
        tooltip: {
          cornerRadius: 4,
          titleFont: { weight: "bold" },
        },
      },
    },
  });
}


