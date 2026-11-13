# SUKAREGANG DISCOVERY
> **Digital Tourism, Leather Education & Product Exploration Web-App**
> Platform digital modern yang memperkenalkan kawasan Sukaregang, Garut, sebagai sentra kerajinan kulit terkemuka di Indonesia.

---

## 🌟 Gambaran Proyek

Sukaregang Discovery memadukan tiga pilar pengalaman utama:
1. **DIGITAL TOURISM**: Peta interaktif kawasan Sukaregang Garut dan simulasi Virtual Tour 360° yang dapat digeser dan diperbesar.
2. **LEATHER EDUCATION**: Edukasi 5 material kulit (Domba, Sapi, Kambing, Suede, Sintetis), tabel matriks perbandingan, panduan perawatan (Leather Care), dan visual storytelling 7 tahapan proses produksi.
3. **LOCAL PRODUCT DISCOVERY**: Katalog terkurasi 20 produk asli dari satu toko pilihan, yaitu **Syakira Leather** (13 Jaket Pria, 3 Sepatu Pria, 4 Sepatu Wanita), dengan tautan langsung ke Shopee resmi.

---

## 🎨 Konsep Desain & Identitas Visual

- **Tema Desain**: *Premium Heritage + Modern Digital Exploration*
- **Palet Warna**:
  - `Forest Green`: `#253B32`
  - `Leather Brown`: `#A66D43`
  - `Warm Beige`: `#D6B889`
  - `Cream`: `#F5F0E7`
  - `Dark Charcoal`: `#292B29`
- **Tipografi**:
  - Judul: Serif Elegan (*Playfair Display*)
  - Teks Konten: Sans-Serif Modern (*Plus Jakarta Sans*)

---

## 📂 Struktur Halaman & Fitur

1. **Beranda (Home)**:
   - Hero Section: *"DISCOVER THE HERITAGE OF LEATHER"*
   - Pengenalan Sukaregang & Garut sebagai kota kerajinan kulit
   - 3 Kartu Eksplorasi: *Explore the Area*, *Discover the Heritage*, *Learn the Craft*
   - Produk Unggulan Syakira Leather
   - Call-To-Action (CTA) interaktif
2. **Explore Sukaregang**:
   - **Interactive Map**: Peta Leaflet kawasan Sukaregang Garut dengan marker terverifikasi (Gerbang Sukaregang, Koridor Gagak Lumayung, Sentra Penyamakan, Toko Syakira Leather, Bengkel Kerajinan).
   - **Virtual Tour 360°**: Simulasi sudut pandang 360 derajat dengan kontrol drag, kompas heading, zoom in/out, dan pemilihan titik lokasi.
3. **Sejarah Sukaregang**:
   - Garis waktu sejarah: Era 1920-1940an, 1960-1970an, 1980-1990an, 2000-2010an, hingga Era Digital 2020-sekarang.
   - Dilengkapi catatan arsip terverifikasi.
4. **Leather Academy**:
   - 5 Material Kulit: Kulit Domba, Kulit Sapi, Kulit Kambing, Suede, Kulit Sintetis/PU.
   - Tabel matriks perbandingan material (Tekstur, Fleksibilitas, Ketebalan, Daya Tahan, Perawatan).
   - Panduan Leather Care: Pembersihan, Penyimpanan, Kelembapan & Jamur, Menjaga Bentuk, Hal-hal yang Dilarang.
5. **Proses Produksi**:
   - Visual storytelling 7 tahapan pengerjaan kerajinan kulit: Pemilihan Bahan, Persiapan Material, Pembuatan Pola, Pemotongan Bahan, Penjahitan, Perakitan, Finishing & QC.
6. **Profil Toko Syakira Leather**:
   - Halaman khusus mitra tunggal Syakira Leather dengan narasi resmi, kategori produk, dan tautan ke Shopee.
7. **Katalog Produk (20 Produk)**:
   - 13 Jaket Kulit Pria
   - 3 Sepatu Kulit Pria
   - 4 Sepatu Kulit Wanita
   - Pencarian real-time, filter kategori, sorting A-Z, modal detail produk, dan tombol "Beli di Shopee".
8. **Tentang Kami**:
   - Visi, misi, dan pilar pengembangan Sukaregang Discovery.

---

## 🚀 Cara Menjalankan

### Cara 1: Langsung Buka di Browser (Paling Praktis)
Cukup buka file `index.html` langsung dengan browser apa saja (Google Chrome, Microsoft Edge, Opera, Mozilla Firefox). 
Aplikasi akan langsung berjalan secara interaktif dengan seluruh fitur (peta interaktif, virtual tour 360, katalog produk, filter pencarian, dan modal detail).

### Cara 2: Menjalankan dengan Vite / Node.js
Jika Anda memiliki Node.js terpasang:
```bash
npm install
npm run dev
```

---

## 🛡️ Kepatuhan Ketentuan Proyek

- ✅ **Hanya Satu Toko**: Syakira Leather (Bukan marketplace multi-vendor).
- ✅ **Tepat 20 Produk**: 13 Jaket Kulit Pria, 3 Sepatu Pria, 4 Sepatu Wanita dengan tautan Shopee resmi masing-masing.
- ✅ **Tidak Mengarang Informasi**: Tidak menampilkan harga fiktif, rating fiktif, stok fiktif, atau kontak palsu.
- ✅ **Pemisahan Data**: Struktur data produk (`src/data/products.ts`), lokasi (`src/data/locations.ts`), dan materi edukasi terpisah dari komponen UI.
- ✅ **Desain Responsif**: Tampilan optimal di smartphone, tablet, dan desktop.
