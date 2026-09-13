# NADI BILLING — WEBSITE FEATURE SOURCE

> Ringkasan sumber-kebenaran untuk Frontend Engineer & Marketing Team. Detail evidence teknis lengkap ada di `NADI_BILLING_PRODUCT_FEATURE_REPORT.md`. Status: I=Implemented, P=Partial, PL=Planned.

## PRODUCT DESCRIPTION

**Short Description:** NADI Billing adalah platform SaaS manajemen bisnis ISP yang menyatukan billing pelanggan, manajemen jaringan (router/RADIUS/GIS/OLT/ONT), CRM, reseller, dan layanan pelanggan — dengan integrasi nyata ke perangkat jaringan, bukan sekadar pencatatan manual.

**Target User:** Operator ISP kecil-menengah (RT/RW Net, Mini ISP, ISP FTTH, penyedia hotspot/voucher) dan tim operasional mereka (NOC, finance/kasir, CS, teknisi lapangan, reseller).

**Core Capabilities:** Manajemen router MikroTik & RADIUS nyata, deteksi gangguan jaringan otomatis, billing pelanggan otomatis, voucher hotspot end-to-end, CRM dengan deteksi churn, ekosistem reseller, dan 4 portal terintegrasi (Console, Teknisi, Agen, Pelanggan).

---

## MAIN FEATURES

### Manajemen Jaringan (Network Core)

**Feature:** Manajemen Router MikroTik
**Short Marketing Description:** Kelola semua router MikroTik dari satu dashboard — test koneksi, sinkronisasi resource, backup otomatis.
**Proof:** Diuji nyata ke simulator CHR; via `evilfreelancer/routeros-api-php`.
**Status:** I

**Feature:** Server RADIUS
**Short Marketing Description:** Pantau sesi aktif PPPoE/Hotspot dan putuskan sesi bermasalah langsung dari dashboard.
**Proof:** Diuji nyata ke FreeRADIUS (auth + accounting + CoA Disconnect).
**Status:** I

**Feature:** VPN Bridge Multi-Protokol
**Short Marketing Description:** Kelola tunnel OpenVPN/L2TP/WireGuard dengan pengecekan status nyata.
**Proof:** Pengecekan konektivitas real per-protokol.
**Status:** I

**Feature:** Profil Bandwidth & QoS
**Short Marketing Description:** Atur rate-limit dan prioritas bandwidth, langsung diterapkan ke router.
**Proof:** Push konfigurasi nyata ke RouterOS.
**Status:** I

**Feature:** Backup Router Otomatis
**Short Marketing Description:** Konfigurasi router dicadangkan otomatis setiap hari ke server.
**Proof:** Trigger backup + unduh via FTP ke storage Laravel, terjadwal harian.
**Status:** I

### GIS & Infrastruktur FTTH

**Feature:** Peta Jaringan Spasial
**Short Marketing Description:** Peta interaktif seluruh topologi jaringan fiber — router, ODC, ODP, pelanggan.
**Proof:** Leaflet/OSM dengan data node & jalur kabel nyata.
**Status:** I

**Feature:** Manajemen ODP/ODC & OLT/PON
**Short Marketing Description:** CRUD infrastruktur fiber dengan monitoring status OLT via SNMP.
**Proof:** Polling SNMP diuji nyata ke agent lokal.
**Status:** I

**Feature:** Inventaris Logistik
**Short Marketing Description:** Kelola stok perangkat gudang dengan peringatan stok rendah otomatis.
**Proof:** Mutasi in/out tercatat, validasi stok berlebih.
**Status:** I

### Deteksi Gangguan (Fault Engine)

**Feature:** Lokalisasi Gangguan Otomatis 3-Level
**Short Marketing Description:** Sistem otomatis menyimpulkan penyebab gangguan — dari 1 pelanggan sampai jalur cascading.
**Proof:** Algoritma threshold berbasis pola redaman ODP/ODC.
**Status:** I

**Feature:** Deteksi Dini / Prediktif
**Short Marketing Description:** Peringatan dini sebelum kualitas sinyal jatuh ke level kritis.
**Proof:** Analisis tren 7 hari + proyeksi hari sampai kritis.
**Status:** I

**Feature:** Laporan SLA (MTTD/MTTR)
**Short Marketing Description:** Ukur kecepatan deteksi dan pemulihan gangguan secara otomatis.
**Proof:** Dihitung dari data insiden nyata.
**Status:** I

### CPE & TR-069

**Feature:** Integrasi GenieACS
**Short Marketing Description:** Kendali penuh perangkat ONT/modem pelanggan dari jarak jauh.
**Proof:** Diuji nyata — task reboot tercatat di GenieACS asli.
**Status:** I

**Feature:** Self-Service WiFi Pelanggan
**Short Marketing Description:** Pelanggan ganti nama/password WiFi dan restart modem sendiri.
**Proof:** Tersambung langsung ke ONT via ACS, dibatasi 3x ganti password/hari.
**Status:** I

### Voucher & Payment

**Feature:** Generator Voucher Hotspot
**Short Marketing Description:** Generate ratusan voucher sekali klik, siap cetak dan jual.
**Proof:** Kode unik, mode username=password, maks 500/batch.
**Status:** I

**Feature:** Cetak Voucher (A4/Thermal)
**Short Marketing Description:** Cetak voucher ke printer A4 atau thermal 58/80mm.
**Proof:** Layout print siap pakai.
**Status:** I

**Feature:** Toko Voucher Online
**Short Marketing Description:** Etalase publik penjualan voucher tanpa perlu login.
**Proof:** Katalog & storefront aktif; **checkout publik masih menunggu payment gateway (belum end-to-end)**.
**Status:** P

**Feature:** Payment Gateway Otomatis (QRIS/VA/dll)
**Short Marketing Description:** —
**Proof:** Belum ada implementasi.
**Status:** PL — *jangan promosikan*

### Billing & Finance

**Feature:** Generate Tagihan Bulanan Otomatis
**Short Marketing Description:** Tagihan pelanggan terbit otomatis sesuai siklus masing-masing.
**Proof:** Job terjadwal harian, idempotent.
**Status:** I

**Feature:** Kasir Manual & Laporan Arus Kas
**Short Marketing Description:** Catat pembayaran manual dan pantau arus kas operasional.
**Proof:** Void pembayaran audit-safe (bukan hapus).
**Status:** I

### CRM

**Feature:** CRM Pipeline & Deteksi Churn
**Short Marketing Description:** Kelola prospek jadi pelanggan, dan dapat peringatan otomatis pelanggan berisiko berhenti.
**Proof:** Tagging berbasis aturan (histori telat bayar & komplain).
**Status:** I

### Reseller

**Feature:** Portal Agen & Komisi Otomatis
**Short Marketing Description:** Mitra jual voucher & bayar tagihan pakai saldo deposit, komisi terhitung otomatis.
**Proof:** Skema komisi persen/flat per transaksi.
**Status:** I

### Notifikasi

**Feature:** Notifikasi Otomatis (Invoice, Isolir, Pembayaran, Teknisi)
**Short Marketing Description:** Template & jadwal notifikasi siap pakai di 4 titik trigger utama.
**Proof:** Pipeline lengkap (antrian, retry, log) — **pengiriman WhatsApp/SMS nyata masih menunggu pemilihan provider**.
**Status:** P (arsitektur I, pengiriman nyata PL)

### Support & CS

**Feature:** Ticket Desk & Auto-Assign Teknisi
**Short Marketing Description:** Tiket gangguan otomatis dibuat dari deteksi jaringan, teknisi disarankan otomatis.
**Proof:** Terhubung ke Fault Engine.
**Status:** I

**Feature:** Live Chat & Knowledge Base
**Short Marketing Description:** Chat real-time dengan CS dan FAQ mandiri untuk pelanggan.
**Proof:** Polling 4 detik, pencarian kata kunci.
**Status:** I

### Security & Administration

**Feature:** RBAC Granular & Audit Log
**Short Marketing Description:** 4 peran staf dengan hak akses spesifik dan jejak audit yang tidak bisa dihapus.
**Proof:** 11 hak akses granular per modul.
**Status:** I

---

## INTEGRATIONS

| Integrasi | Status | Catatan |
|---|---|---|
| MikroTik RouterOS API | I | Diuji nyata |
| FreeRADIUS | I | Diuji nyata |
| GenieACS (TR-069) | I | Diuji nyata |
| SNMP (OLT) | I | Diuji nyata |
| Payment Gateway (Midtrans/Xendit/dll) | PL | Belum ada |
| WhatsApp/SMS Gateway | PL | Stub log-only |
| SMTP Email | P | Kode lengkap, `.env.example` masih `MAIL_MAILER=log` |

---

## AUTOMATIONS

16 proses terjadwal otomatis lintas modul — lihat detail lengkap di Bagian 7 laporan utama. Sorotan: deteksi gangguan real-time, generate tagihan bulanan, backup router harian, siklus billing SaaS (trial/renewal/dunning), polling & rollup data redaman optik.

---

## WEBSITE PROOF POINTS

- Integrasi nyata ke MikroTik, FreeRADIUS, GenieACS, SNMP — bukan simulasi/mock.
- 16 automation terjadwal berjalan lintas modul.
- RBAC granular dengan 11 hak akses spesifik per modul + audit log immutable.
- Kredensial sensitif (password router, API key) terenkripsi di database.

---

## SAFE MARKETING CLAIMS

- "Terintegrasi nyata dengan MikroTik, FreeRADIUS, dan GenieACS"
- "Deteksi gangguan otomatis melokalisasi penyebab masalah jaringan"
- "Tagihan pelanggan terbit otomatis setiap siklus"
- "Voucher hotspot bisa digenerate dan dicetak dalam hitungan detik"
- "Pelanggan bisa ganti WiFi dan restart modem sendiri"
- "Komisi reseller terhitung otomatis setiap transaksi"
- "4 portal terintegrasi: Console, Teknisi, Agen, Pelanggan"

## FEATURES NOT READY TO PROMOTE

- Pembayaran otomatis via payment gateway (QRIS/VA/gerai retail) — belum diimplementasikan
- Notifikasi WhatsApp/SMS terkirim nyata — masih stub log-only
- Buka isolir otomatis pasca-bayar — tidak ditemukan bukti implementasi
- Checkout toko voucher online publik end-to-end — macet di status pending
- Push voucher otomatis ke MikroTik Hotspot — belum ada
- 2FA, cloud backup database, health monitoring server — sengaja ditunda
- Cetak invoice PDF — belum ada (menunggu approval dependency)
- Angka harga plan spesifik — masih data placeholder development
