let sayi = Number(prompt("Bir sayı giriniz"));

let binary = decimal(sayi);
console.log("İkilik sistemde sayı (ters çevrilmiş) : " + binary);

function decimal(number) {
    let binary = "";
    while (number > 0) {
        binary += (number % 2).toString();  // Sayıyı 2'ye bölüp kalanı ekliyoruz
        number = Math.floor(number / 2);   // Sayıyı 2'ye bölüyoruz (tam sayı bölme)
    }
    let reversed = binary.split('').reverse().join('');  // Elde ettiğimiz binary'i tersine çeviriyoruz
    return reversed;  // Sonuç döndürülüyor
}
