let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hil1 = document.getElementById('hil1');
let hil4 = document.getElementById('hil4');
let hil5 = document.getElementById('hil5');

window.addEventListener('scroll', () => {
    let value = window.scrollY;
    text.style.marginTop = value * 2.5 + 'px';
    leaf.style.top = value * -1.5 + 'px';
    leaf.style.left = value * 1.5 + 'px';
    hil5.style.left = value * 1.5 + 'px';
    hil4.style.left = value * -1.5 + 'px';
})  


// // Mendapatkan elemen footer
// const footer = document.getElementById('footer');

// // Menambahkan event listener untuk mengatur visibilitas footer saat menggulir halaman
// window.addEventListener('scroll', () => {
//     // Mendapatkan tinggi halaman
//     const windowHeight = window.innerHeight;
//     // Mendapatkan jarak yang sudah digulir
//     const scrollY = window.scrollY;

//     // Mengatur visibilitas footer berdasarkan kondisi
//     if (scrollY > windowHeight) {
//         footer.style.display = 'block';
//     } else {
//         footer.style.display = 'none';
//     }
// });
