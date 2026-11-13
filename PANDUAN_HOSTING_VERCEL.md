# 🚀 PANDUAN LENGKAP HOSTING KE VERCEL
## Proyek: SUKAREGANG DISCOVERY

Aplikasi **Sukaregang Discovery** telah dikonfigurasi secara khusus agar **100% siap di-deploy ke Vercel** dengan cepat, tanpa error, dan otomatis mendapatkan sertifikat SSL (HTTPS) serta domain gratis dari Vercel (contoh: `https://sukaregang-discovery.vercel.app`).

---

## 🛠️ Persiapan yang Sudah Dibuatkan di Proyek:
1. **`vercel.json`**: Konfigurasi rewrite SPA agar seluruh rute halaman (Explore, Sejarah, Academy, Produksi, Katalog, Syakira, Tentang) berjalan mulus tanpa error 404 saat di-refresh.
2. **`package.json`**: Script build universal yang kompatibel dengan server build Vercel.
3. **`.gitignore`**: Memastikan hanya file penting yang diunggah.

---

## 📋 CARA 1: Deploy via GitHub (Paling Direkomendasikan & Sangat Mudah)

Metode ini tidak memerlukan instalasi software apapun di laptop Anda. Cukup gunakan browser!

### Langkah 1: Buat Repository di GitHub
1. Buka [github.com](https://github.com) dan login (atau daftar gratis jika belum punya akun).
2. Di pojok kanan atas, klik tanda **`+`** lalu pilih **`New repository`**.
3. Beri nama repository, misalnya: `sukaregang-discovery`.
4. Pilih **Public** (atau Private).
5. Jangan centang "Add a README file" (karena kita sudah punya file lengkap).
6. Klik tombol hijau **`Create repository`**.

### Langkah 2: Upload File ke GitHub
1. Pada halaman repository baru Anda di GitHub, klik link **`uploading an existing file`**.
2. Buka folder proyek di komputer Anda:
   `C:\Users\ALYA ALIFIA\.gemini\antigravity\scratch\sukaregang-discovery`
3. Pilih (Select All: `Ctrl + A`) seluruh file dan folder di dalam `sukaregang-discovery`:
   - `index.html`
   - `vercel.json`
   - `package.json`
   - `README.md`
   - Folder `src/`
   - dan file lainnya.
4. Drag & drop (seret) file-file tersebut ke jendela upload di GitHub.
5. Tunggu proses upload selesai, lalu klik tombol hijau **`Commit changes`** di bagian bawah.

### Langkah 3: Hubungkan dan Deploy di Vercel
1. Buka [vercel.com](https://vercel.com) dan klik **`Sign Up`** atau **`Log In`** menggunakan akun **GitHub** Anda.
2. Di dashboard Vercel, klik tombol **`Add New...`** di pojok kanan atas, lalu pilih **`Project`**.
3. Di daftar repository GitHub yang muncul, cari **`sukaregang-discovery`**, lalu klik tombol **`Import`**.
4. Pada layar konfigurasi:
   - **Project Name**: `sukaregang-discovery` (bisa disesuaikan).
   - **Framework Preset**: Biarkan terdeteksi otomatis atau pilih **`Other`** / **`Vite`**.
   - **Root Directory**: `./` (default).
   - **Build and Output Settings**: Biarkan default (sudah ditangani oleh `vercel.json`).
5. Klik tombol biru **`Deploy`**!
6. Tunggu sekitar 20–40 detik. Vercel akan menampilkan animasi kembang api tanda sukses 🎉!
7. Klik tautan domain yang diberikan (misal: `https://sukaregang-discovery.vercel.app`) untuk membuka website Anda yang sudah online dan bisa diakses oleh siapa saja di seluruh dunia!

---

## ⚡ CARA 2: Deploy Menggunakan Vercel CLI (Jika Node.js Terpasang)

Jika Anda sudah menginstal Node.js di komputer Anda, Anda dapat mendeploy langsung dari terminal/PowerShell:

1. Buka terminal di folder proyek:
   ```powershell
   cd "C:\Users\ALYA ALIFIA\.gemini\antigravity\scratch\sukaregang-discovery"
   ```
2. Jalankan perintah instalasi Vercel CLI (hanya sekali):
   ```powershell
   npm install -g vercel
   ```
3. Login ke Vercel:
   ```powershell
   vercel login
   ```
4. Jalankan perintah deploy untuk produksi:
   ```powershell
   vercel --prod
   ```
5. Ikuti petunjuk singkat di layar (tekan Enter untuk opsi default).
6. Website Anda langsung live dalam beberapa detik!

---

## 🌐 Custom Domain (Opsional)
Jika Anda memiliki nama domain sendiri (seperti `sukaregangdiscovery.com` atau `sukaregang.id`):
1. Masuk ke dashboard proyek di Vercel.
2. Buka menu **Settings** > **Domains**.
3. Masukkan nama domain Anda dan ikuti petunjuk DNS yang diberikan oleh Vercel.
