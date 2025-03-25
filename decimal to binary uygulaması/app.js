let binary ="1011";

function convert(binary){
    let toplam=0;
    for(let i=binary.length-1;i>=0;i--){
        toplam+=Math.pow(i,2);
    }
    return toplam;
}
convert();