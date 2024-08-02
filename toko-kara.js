function tampilkandetailproduk(namaproduk, hargaproduk,
    detailproduk, gambarproduk) {
    // buat elemen notifikasi/popup
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
              <div class="popup-content">
                <span class="popup-close"
    onclick="tutuppopup()">&times;</span>
                <img src="${gambarproduk}"
    alt="${namaproduk}">
                <h2>${namaproduk}</h2>
                <p class="price">harga: ${hargaproduk}</p>
                <p>${detailproduk}</p>
                <button class="tombol-beli">beli
    sekarang</button>
             </div>
         `;
    // tambahkan notifikasi/popup ke body
    document.body.appendChild(popup);
}
function tutuppopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        document.body.removeChild(popup);
    }
}
const keranjang = [];
const totalbelanja = 0;

function tambahkanprodukkekeranjang(namaProduk, harga) {
    let produkDiTemukan = false;

    for (let i = 0; i < keranjang.length; i++) {
        if (keranjang[i].nama === namaProduk) {
            keranjang[i].jumlah++;
            produkDiTemukan = true;
            break;
        }
    }
    if (!produkDiTemukan) {
        keranjang.push({ nama: namaProduk, harga: harga, jumlah: 1 });
    }
    updateKeranjang();
}



function updateKeranjang() {
    const daftarkeranjang = document.getElementById('daftar-keranjang');
    const totalbelanjaelem = document.getElementById('total-belanja');
    daftarkeranjang.innerHTML = '';
    let total = 0;

    keranjang.forEach((produk) => {
        const item = document.createElement('li');
        const jum = produk.harga * produk.jumlah;
        item.textContent = `${produk.nama} - ${produk.jumlah} - Rp${produk.harga.toLocaleString("id-ID")} - Rp.${jum.toLocaleString("id-ID")}`;
        daftarkeranjang.appendChild(item);
        total += produk.harga * produk.jumlah;
    });

    totalbelanjaelem.textContent = `Rp.${total.toLocaleString("id-ID")}`;
    sessionStorage.setItem("keranjangBelanja", JSON.stringify(keranjang));
}
function checkout() {
    window.location.href = "checkout.html";
}

function caribarang() {
    const inputpencarian =
        document.getElementById('caribarang');
    const katakunci = inputpencarian.value.toLowerCase();
    const produk = document.querySelectorAll('.product');

    for (const produkitem of produk) {
        const namaproduk =
            produkitem.querySelector('h3').textContent.toLowerCase();
        const deskripsiproduk =
            produkitem.querySelector('p').textContent.toLowerCase();
        if (namaproduk.includes(katakunci) ||
            deskripsiproduk.includes(katakunci)) {
            produkitem.style.display = 'block';
        } else {
            produkitem.style.display = 'none';
        }

    }
}
function filterkategori(kategori) {
    const produk = document.querySelectorAll('.product');
    for (const produkitem of produk) {
        const kategoriproduk =
            produkitem.getAttribute('data-kategori');

        if (kategori === 'all' || kategori ===
            kategoriproduk) {
            produkitem.style.display = 'block';
        } else {
            produkitem.style.display = 'none';
        }
    }
}