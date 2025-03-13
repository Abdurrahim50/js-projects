//Beden kitle Endeksi hesaplama


let kilo=Number(prompt("kilonuzu giriniz"));
let boy=Number(prompt("boyunuzu metre cinsinden giriniz"));

let sonuc=kilo/(boy*2);

if(sonuc<=18.5){
    console.log("ideal kilonun altında"+sonuc);
}
else if(sonuc>=18.5 && sonuc<=24.9){
    console.log("ideal kilo da"+sonuc);
}else if(sonuc>=25 && sonuc<=29.9){
    console.log("ideal kilonun üstünde"+sonuc);
}else if(sonuc>=30 && sonuc<=39.9){
    console.log("obez"+sonuc);
}else if(sonuc>=40){
    console.log("fazla obez"+sonuc);
}

