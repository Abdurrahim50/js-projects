let araba1 = {
    marka: "Volkswagen",
    isim: "Passat",
    fiyat: 1260000
};
let araba2 = {
    marka: "Hyundai",
    isim: "i10",
    fiyat: 382000 
};
let araba3 = {
    marka: "Skoda",
    isim: "Superb",
    fiyat: 1200000 
};
let araba4 = {
    marka: "Fiat",
    isim: "Egea",
    fiyat: 715000
};

let arabalar = [araba1, araba2, araba3, araba4];
let secilenArabalar = [];

let kullaniciUrunİsmi = prompt("Bir araba ismi veya modeli seçiniz:");

FiltreliUrunleriDoldur(arabalar);
FiltreliUrunleriYazdir(secilenArabalar);

function FiltreliUrunleriDoldur(urunler) {
    urunler.forEach(function(urun) {
        // Burada, hem isim hem de marka karşılaştırmasını yapıyoruz.
        if (urun.isim.toUpperCase().includes(kullaniciUrunİsmi.toUpperCase()) || urun.marka.toUpperCase().includes(kullaniciUrunİsmi.toUpperCase())) {
            secilenArabalar.push(urun);
        }
    });
}

function FiltreliUrunleriYazdir(urunler) {
    if (urunler.length > 0) {
        urunler.forEach(function(urun) {
            console.log("------------------------------------------");
            console.log("|" + urun.marka + " | " + urun.isim + " | " + urun.fiyat);
            console.log("------------------------------------------");
        });
    } else {
        console.log("Seçilen araca uygun sonuç bulunamadı.");
    }
}
