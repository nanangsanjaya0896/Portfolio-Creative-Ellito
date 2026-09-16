# Sejuk Rumah
Landing page responsif jasa AC rumahan Karawang, dibangun menggunakan HTML, CSS, JavaScript dan Vite. Arsip asli Elito.zip tetap utuh.

## Menjalankan
```sh
npm install
npm run dev
npm run build
npm run preview
```

## Sebelum publikasi
- Isi `whatsapp` dan `phone` di `src/settings.js` dengan nomor resmi berformat `62...`, tanpa `+`/spasi. Kosong berarti mode demo: pesan dapat dipratinjau dan disalin, tidak dikirim.
- Verifikasi nama brand, cakupan kecamatan, jam kerja, harga, isi paket, pengingat gratis dan komitmen layanan di `index.html`.
- Tetapkan ketentuan garansi. FAQ saat ini secara eksplisit menyatakan belum tersedia.
- Ganti cerita ilustratif dengan testimoni nyata hanya dengan izin pelanggan. Tidak ada rating atau angka pelanggan yang dikarang.
- Gambar hero adalah visual AI, diberi label ilustrasi. Ganti dengan dokumentasi asli bila tersedia.
- Sesudah semua diverifikasi, sesuaikan penanda demo pada footer, harga, catatan tim dan FAQ.

## Konten dan alur
`COPYWRITING.md` adalah salinan editorial per section; perubahan manual perlu diterapkan juga di `index.html`. CSS: `src/style.css`. Interaksi: `src/main.js`.

CTA mengarah ke formulir nama, area, layanan dan keluhan. Setelah validasi, tombol membuka WhatsApp berisi pesan siap kirim. Tidak ada database/backend: submit bukan konfirmasi jadwal, dan pesan belum terkirim sampai pengguna mengirimkannya sendiri di WhatsApp. Nomor telepon valid mengaktifkan `tel:`.

## Tracking
DataLayer siap untuk `booking_start`, `lead_form_submit`, `whatsapp_click`, `phone_click`. Mode demo hanya mencatat `demo_booking_prepared`, bukan lead aktual. Nama dan keluhan tidak dikirim ke analytics. Event klik bukan bukti pesan diterima atau pekerjaan terjual. Slot komentar di head tersedia untuk GA4/Meta Pixel; belum ada tracker pihak ketiga yang diaktifkan. Tambahkan persetujuan sesuai kebijakan privasi sebelum menjalankan tracking.

## Aksesibilitas & performa
Navigasi anchor, menu mobile, label form, native validation, dialog keyboard, FAQ native details, reduced-motion, hero eager dan CSS tanpa framework UI. Google Fonts memiliki fallback sans-serif.
