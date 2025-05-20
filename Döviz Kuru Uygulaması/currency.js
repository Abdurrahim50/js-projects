class Currency {
  constructor() {
    this.baseUrl = "https://api.frankfurter.app";
  }

  async exchange(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;

    const response = await fetch(
      `${this.baseUrl}/latest?from=${fromCurrency}&to=${toCurrency}`
    );
    const result = await response.json();

    const rate = result.rates[toCurrency];
    return amount * rate;
  }

  async getLast7DaysRates(fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
      // Aynı para birimi seçilirse, 1 değer döner 7 gün için
      const rates = {};
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        rates[dateStr] = 1;
      }
      return rates;
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6); // son 7 gün

    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];

    const url = `${this.baseUrl}/${startDateStr}..${endDateStr}?from=${fromCurrency}&to=${toCurrency}`;

    const response = await fetch(url);
    const data = await response.json();

    // API dönen data.rates objesi şöyle: { "2025-05-14": { "TRY": 19.2 }, ...}
    // Biz onu { date: rate } formatına çevirelim
    const rates = {};
    for (const [date, rateObj] of Object.entries(data.rates)) {
      rates[date] = rateObj[toCurrency];
    }

    return rates;
  }
}
