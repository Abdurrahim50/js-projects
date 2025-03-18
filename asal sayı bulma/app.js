let sayi = Number(prompt("BİR SAYI GİRİNİZ"));
let sonuc = true;

// 0 ve 1 asal sayı değildir
if (sayi === 0 || sayi === 1) {
    sonuc = false;
} else {
    for (let i = 2; i < sayi; i++) {
        if (sayi % i == 0) {
            // Asal değildir
            sonuc = false;
            break;
        }
    }
}

if (sonuc) {
    alert(sayi + " ASALDIR");
} else {
    alert(sayi + " ASAL DEĞİLDİR");
}
