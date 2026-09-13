# NADI BILLING
## Product & Feature Analysis Report

> **Metodologi:** Laporan ini disusun dari pembacaan langsung source code (routes, controller, service, model, migration, config), bukan dari asumsi nama menu. Setiap klaim ditandai **VERIFIED** (ada bukti kode), **INFERENCE** (kesimpulan dari pola kode), atau **NEEDS CONFIRMATION** (belum bisa dipastikan). Dokumen internal `todo/admin/**/*.md` dipakai sebagai peta awal, tapi setiap status di sana **di-cross-check ulang ke kode aktual** — beberapa ditemukan sudah kadaluarsa (lihat Bagian 22, Gap Analysis).
>
> Tanggal analisis: 2026-09-12. Branch: `bezethade/dev`.

---

### 1. Executive Summary

**NADI BILLING** adalah platform **SaaS B2B untuk operator ISP kecil-menengah** (RT/RW Net, Mini ISP, ISP FTTH, Hotspot). Modelnya dua lapis:

1. **Lapis SaaS** — NADI Billing (sebagai vendor) menjual langganan platform ini ke operator ISP (disebut **Organization/tenant**), dengan plan berbayar, invoice, dan pembayaran manual transfer bank. **VERIFIED** — `app/Models/{Plan,Subscription,Invoice,Organization}.php`, `routes/admin.php`, `routes/web.php` (prefix `/billing`).
2. **Lapis Operasional ISP** — setiap tenant memakai satu **Console back-office** (`/console/*`) untuk menjalankan bisnis ISP mereka sendiri: kelola pelanggan, router MikroTik, RADIUS, voucher hotspot, billing pelanggan internet, jaringan FTTH/GIS, deteksi gangguan, reseller, notifikasi, dan tiket support — plus 3 portal eksternal (Teknisi, Agen/Reseller, Pelanggan). **VERIFIED** — `routes/console-web.php` (395 baris, 11 grup modul), `routes/{technician,agent,portal}.php`.

Dari 60+ fitur yang diinventarisasi, **mayoritas modul operasional ISP (11 dari 13 blueprint modul) sudah IMPLEMENTED penuh** dengan bukti pengujian nyata ke simulator infrastruktur lokal (MikroTik CHR, FreeRADIUS, GenieACS, SNMP OLT — lihat Bagian 4 & 22). Dua gap besar yang **secara sadar ditunda** (bukan lupa): **Payment Gateway otomatis** (Midtrans/Xendit dkk — masih 100% simulasi) dan **provider WhatsApp/SMS nyata** (arsitekturnya siap, tapi client-nya masih stub log-only). Kedua ini adalah keputusan bisnis yang menunggu approval user, bukan keterbatasan teknis.

---

### 2. Product Overview — NADI BILLING

| Aspek | Detail |
|---|---|
| **Kategori Produk** | SaaS manajemen bisnis ISP (ISP Business Management Platform / Billing + NOC + CRM terpadu) |
| **Target Market** | Operator RT/RW Net, Mini ISP, ISP FTTH skala kecil-menengah, penyedia Hotspot & voucher |
| **Primary Users** | Owner/Admin ISP, staf NOC jaringan, staf finance/kasir, staf customer service, teknisi lapangan, reseller/agen/mitra, pelanggan akhir internet |
| **Core Problem Solved** | Operator ISP kecil biasanya pakai kombinasi tool terpisah (Mikhmon/Mixradius/Sisbro untuk billing dasar, WhatsApp manual untuk notifikasi, Excel untuk pelanggan) tanpa integrasi ke perangkat jaringan nyata. NADI Billing menyatukan billing, manajemen jaringan (router/RADIUS/OLT/ONU), CRM, dan reseller dalam satu console dengan integrasi langsung ke perangkat **INFERENCE** — disimpulkan dari cakupan modul & referensi eksplisit ke "migrasi dari Mikhmon/Mixradius/Sisbro" di `todo/admin/isp-platform/menu-structure.md:38`. |
| **Main Product Capabilities** | Manajemen router MikroTik & RADIUS nyata, voucher hotspot, billing pelanggan otomatis, GIS jaringan FTTH, deteksi gangguan otomatis (fault engine), integrasi CPE TR-069 (GenieACS), portal reseller & pelanggan, sistem tiket & live chat |
| **Technical Architecture** | Monolith Laravel, multi-tenant **single-database** (kolom `organization_id` di hampir semua tabel operasional) — bukan database-per-tenant. **VERIFIED** — puluhan migration dengan `organization_id` fk cascade. |
| **Frontend Stack** | Blade (server-rendered) + Tailwind CSS v4 + Vite. Tidak ada SPA framework (React/Vue) — **VERIFIED**, `package.json` cuma punya Tailwind/Vite, tidak ada `react`/`vue`. Peta pakai Leaflet via CDN (bukan npm package). |
| **Backend Stack** | Laravel 13 (`composer.json: laravel/framework ^13.17`), PHP 8.3, Pest 4 untuk testing |
| **Database** | MySQL (default `saas-nadi-billing`) + koneksi terpisah `radius` ke skema FreeRADIUS (`radcheck`/`radacct`/`radpostauth`) — **VERIFIED** `config/database.php:119-133` |
| **Infrastructure** | Queue via database driver, cache via database driver, session via database — semua driver bawaan Laravel, belum ada Redis di-set default (tersedia sebagai opsi) |
| **Third-Party Services** | GenieACS (TR-069 ACS server), FreeRADIUS, evilfreelancer/routeros-api-php (client API MikroTik) — **VERIFIED** `composer.json`. Belum ada payment gateway, WA/SMS gateway, PDF generator, atau storage cloud terpasang. |
| **Authentication** | 3 guard terpisah: `web` (User — pemilik/staf organisasi), `admin` (Admin — staf internal NADI), `customer` (Customer — pelanggan akhir ISP) — **VERIFIED** `config/auth.php`. Ditambah middleware role-based untuk portal teknisi/agen/console. |
| **Multi-Tenant** | Ya — model `Organization` sebagai tenant, relasi many-to-many ke `User` lewat pivot `organization_user` (kolom `role` + `console_role` + `seat_status`). Isolasi data lewat `organization_id` scoping di setiap query, bukan skema/DB terpisah. **VERIFIED** |

---

### 3. User Roles

| Role | Fungsi | Modul yang Dapat Diakses | Evidence |
|---|---|---|---|
| **Admin NADI (internal)** | Staf NADI Billing sendiri — kelola plan SaaS, rekening bank, voucher promo SaaS, approve/reject bukti transfer pembayaran langganan tenant | `/admin/*` (guard `admin`, model `Admin`) | `routes/admin.php`, `app/Http/Controllers/Admin/**` |
| **Owner (organisasi)** | Pemilik tenant ISP — akses penuh semua modul, satu-satunya yang bisa hapus organisasi/ubah billing tanpa batasan | Semua console + billing portal + agen/teknisi (kalau merangkap) | `OrganizationPolicy.php` — `hasRole($user,$org,['owner'])` lolos semua ability |
| **Admin (organisasi)** | Staf senior tenant — akses `manageMembers`, bisa masuk console kalau punya `console_role`, bisa masuk portal teknisi/agen | Bervariasi tergantung `console_role` | `OrganizationPolicy.php` |
| **Billing (organisasi)** | Staf yang khusus urus langganan SaaS NADI (bukan billing pelanggan ISP) — akses billing portal (`/billing/*`) penuh | Billing Portal SaaS | `OrganizationPolicy::manageBilling()` |
| **Super Admin (console_role)** | Kepala operasional ISP — akses penuh semua 11 modul console | Semua `/console/*` | `OrganizationPolicy.php` — lolos semua `manage*` |
| **Admin Jaringan/NOC (`network_noc`)** | Staf teknis jaringan | Core Jaringan, GIS/OLT, CPE/TR-069, Fault Detection | `manageNetworkCore`, `manageFaultEngine` |
| **Finance/Kasir (`finance_kasir`)** | Staf keuangan & kasir | Pelanggan (read/update), Voucher, Billing ISP, Reseller | `manageVouchers`, `manageIspFinance`, `manageResellers` |
| **Customer Service (`cs_support`)** | Staf layanan pelanggan | Pelanggan (read/update), Support Desk (tiket/chat/KB) | `manageCustomers`, `manageSupportDesk` |
| **Teknisi Lapangan (`role=technician`)** | Petugas instalasi/maintenance lapangan | Portal Teknisi (`/technician/*`) | `EnsureTechnicianAccess.php` |
| **Reseller/Agen (`role=agent`)** | Mitra penjual voucher & loket PPOB | Portal Agen (`/agent/*`) | `EnsureAgentAccess.php` |
| **Pelanggan** | End-user internet ISP tenant | Portal Pelanggan (`/portal/*`) — guard `customer` terpisah | `routes/portal.php`, `app/Models/Customer.php` |

> **VERIFIED** — matriks role di atas sama persis dengan `app/Policies/OrganizationPolicy.php` (11 metode `manage*`) dan migration `add_console_role_to_organization_user_table.php`. Cocok dengan blueprint PDF bagian 7 (`todo/admin/isp-platform/menu-structure.md:226-242`), dan sengaja dipetakan 1:1 oleh tim pengembang sendiri.

---

### 4. Module Inventory

#### MODULE: SaaS Subscription & Billing (Plan, Organization, Subscription, Invoice)
**Purpose:** Mesin langganan NADI Billing sendiri — operator ISP berlangganan platform ini per-bulan/kuartal/tahun.
**Target User:** Admin NADI (approve pembayaran), Owner/Billing staf tenant (kelola langganan sendiri).
**Features:** Plan bertingkat (Free/Pro/Business) dengan harga per siklus, trial, upgrade/downgrade otomatis, add-on & seat billing (prorata harian), kode voucher/promo, invoice otomatis + pajak, pembayaran manual transfer + verifikasi admin, grace period & dunning reminder email, portal self-service penuh (ganti plan, undang member, upload bukti bayar, cancel/pause/resume), referral/affiliate.
**Main Workflow:** Registrasi → pilih plan → (opsional trial) → invoice terbit otomatis → transfer manual → upload bukti → admin NADI approve → status aktif → siklus berulang otomatis via scheduler.
**Integration:** Email (Mailable Laravel, saat ini `MAIL_MAILER=log`), tidak ada payment gateway.
**Implementation Status:** **IMPLEMENTED** (fondasi inti), 1 sub-fitur **PARTIAL** (harga per-seat masih placeholder Rp0), 1 **PARTIAL** (referral belum tersambung ke form registrasi publik).
**Technical Evidence:** `app/Models/{Plan,PlanPrice,PlanLimit,Organization,Subscription,SubscriptionEvent,Invoice,InvoiceItem,Payment,BankAccount,TaxRate,Voucher,Affiliate}.php`, `app/Services/{SubscriptionService,InvoiceService,PaymentService,OrganizationMembershipService,AffiliateService}.php`, `routes/web.php` (prefix `billing.*`), `routes/admin.php`.
**Product Value:** Operator ISP bisa mulai pakai platform tanpa kartu kredit (trial tanpa payment method), bayar manual transfer sesuai kebiasaan UMKM Indonesia.

#### MODULE: Core Jaringan & Autentikasi (Modul A)
**Purpose:** Mengelola infrastruktur jaringan inti ISP — router, VPN, profil bandwidth, RADIUS, backup.
**Target User:** Super Admin, Admin Jaringan/NOC.
**Features:** CRUD Router MikroTik + test connection + sync resource usage terjadwal (5 menit), sesi RADIUS aktif + disconnect/CoA nyata, VPN Bridge multi-protokol (OpenVPN/L2TP/WireGuard) dengan pengecekan konektivitas nyata per-protokol, profil Bandwidth/QoS yang di-push langsung ke MikroTik, backup router terjadwal harian + unduh file ke storage Laravel via FTP.
**Main Workflow:** Admin daftarkan router → test connection ke device asli → sistem polling resource usage tiap 5 menit → admin bisa disconnect sesi PPPoE pelanggan via RADIUS CoA → backup router berjalan otomatis tiap hari, file diunduh ke server.
**Integration:** MikroTik RouterOS API (`evilfreelancer/routeros-api-php`), FreeRADIUS (koneksi DB terpisah), VPN CLI tools (shell-out).
**Implementation Status:** **IMPLEMENTED** — divalidasi nyata ke simulator CHR (MikroTik) dan FreeRADIUS Docker, bukan mock.
**Technical Evidence:** `app/Services/Network/{MikrotikRouterConnectionService,SqlRadiusSessionService,VpnConnectionServiceResolver,OpenVpnConnectionService,L2tpVpnConnectionService,WireguardVpnConnectionService}.php`, `app/Http/Controllers/Console/{RouterController,RadiusController,VpnTunnelController,BandwidthProfileController,RouterBackupController}.php`, commit `b93b98f`/`ecdaf17`/`ebe3327`.
**Product Value:** Admin bisa kelola banyak router dari satu dashboard, tanpa perlu login manual ke tiap perangkat; downtime jaringan berkurang karena backup config otomatis dan bisa disconnect sesi bermasalah langsung dari console.

#### MODULE: RBAC & Peran Staf Console (sebagian Modul O)
**Purpose:** Kontrol akses granular per staf di console back-office.
**Target User:** Owner/Super Admin (yang mengatur), semua staf console (yang diatur).
**Features:** 4 peran console (`super_admin`/`network_noc`/`finance_kasir`/`cs_support`), 11 hak akses (`manage*`) per-modul, halaman assign role per staf, guard supaya staf tidak bisa menaikkan hak akses dirinya sendiri.
**Main Workflow:** Owner assign `console_role` ke user staf → user login → middleware `console.ability:<nama>` cek hak akses per grup route.
**Integration:** Menjadi gate untuk seluruh 11 modul console lainnya.
**Implementation Status:** **IMPLEMENTED** — 357 test passed pada saat modul ini selesai (dokumentasi internal, dicek silang: file `OrganizationPolicy.php` & `EnsureConsoleAbility.php` ada dan wired ke semua route group).
**Technical Evidence:** `app/Policies/OrganizationPolicy.php`, `app/Http/Middleware/EnsureConsoleAbility.php`, `app/Http/Controllers/Console/StaffController.php`, migration `add_console_role_to_organization_user_table.php`.
**Product Value:** Operator bisa mendelegasikan operasional ke staf tanpa risiko staf mengakses data keuangan atau pengaturan sistem yang bukan wewenangnya.

#### MODULE: Manajemen Pelanggan & CRM (Modul B & K)
**Purpose:** CRUD pelanggan ISP + pipeline penjualan + deteksi risiko churn.
**Target User:** Finance/Kasir, CS Support, Admin Jaringan (read terbatas), Super Admin.
**Features:** CRUD pelanggan dengan detail 360° (data diri, ODP, paket, riwayat invoice & tiket), paket layanan sebagai entity terpisah (harga di-snapshot ke pelanggan agar histori tak berubah), FUP & Night Booster (kolom siap, job otomatisnya masih tertunda), CRM pipeline kanban (Lead→Survei→Instalasi→Aktif, drag via dropdown), riwayat interaksi pelanggan, deteksi risiko churn otomatis berbasis aturan (bukan ML), impor CSV massal pelanggan.
**Main Workflow:** Lead masuk → interaksi tercatat → convert jadi Customer → assign paket & ODP → job harian tag ulang risiko churn berdasarkan histori telat bayar & tiket.
**Integration:** Modul Voucher (snapshot paket), Modul Billing (invoice per pelanggan), Modul GIS (ODP).
**Implementation Status:** **IMPLEMENTED** dengan 2 gap kecil **NOT IMPLEMENTED**: (1) job otomatis Night Booster (terhambat karena `Customer` belum punya relasi langsung ke `Router` — gap desain data, bukan sekadar belum dikerjakan), (2) peta prospek visual (sengaja ditunda, dianggap nilai tambah marjinal).
**Technical Evidence:** `app/Models/{Customer,ServicePackage,CustomerLead,CustomerInteraction,CustomerTag}.php`, `app/Services/Crm/ChurnRiskService.php`, `app/Http/Controllers/Console/{CustomerController,CustomerLeadController,ChurnRiskController,CustomerMigrationController}.php`.
**Product Value:** Operator dapat gambaran 360° tiap pelanggan dalam satu layar, dan sistem otomatis memberi peringatan dini pelanggan berisiko berhenti berlangganan.

#### MODULE: Voucher Hotspot & Prepaid — Admin (Modul C)
**Purpose:** Menerbitkan dan mengelola voucher hotspot/prepaid untuk dijual ke pelanggan/tamu.
**Target User:** Super Admin, Finance/Kasir.
**Features:** Generator voucher batch (kode unik, mode username=password), template & editor voucher dengan QR code (client-side, tanpa dependency PHP baru), stok & filter status (available/used/expired/disabled), cetak voucher (A4 grid & thermal 58/80mm via CSS print), laporan penjualan harian/mingguan/bulanan + ekspor CSV.
**Main Workflow:** Admin pilih paket & jumlah → generate batch kode → cetak → jual manual/lewat reseller → pelanggan aktivasi kode → masa berlaku dihitung sejak dipakai (bukan sejak dicetak).
**Integration:** Portal Agen (reseller jual voucher yang sama), Portal Pelanggan (beli voucher tambahan), Toko Online.
**Implementation Status:** **IMPLEMENTED** untuk siklus penuh generate→jual→laporan. **NOT IMPLEMENTED**: push kredensial voucher ke MikroTik Hotspot user secara otomatis (voucher tercatat di database NADI, tapi belum ada method yang mendaftarkannya sebagai hotspot-user nyata di router) — ekspor Excel juga belum (CSV cukup untuk saat ini).
**Technical Evidence:** `app/Services/Voucher/HotspotVoucherService.php`, `app/Models/{VoucherPackage,HotspotVoucher,VoucherTemplate}.php`, `app/Http/Controllers/Console/Voucher*Controller.php` (6 controller).
**Product Value:** Operator hotspot bisa cetak ratusan voucher siap jual dalam hitungan detik, dengan laporan omset otomatis tanpa hitung manual.

#### MODULE: GIS, Topologi FTTH & Inventaris (Modul L)
**Purpose:** Visualisasi & manajemen infrastruktur fisik jaringan FTTH.
**Target User:** Admin Jaringan/NOC, Super Admin, Teknisi (view saja).
**Features:** Peta spasial interaktif (Leaflet/OSM) dengan marker router/ODC/ODP/pelanggan + polyline jalur kabel fiber (Feeder/Distribusi/Dropcore), CRUD ODP/ODC dengan hierarki parent-child & rasio port terpakai/rusak, CRUD OLT + polling SNMP real (shell-out ke `snmpget`), daftar ONU/ONT dengan badge redaman optik 4 ambang (Normal/Perhatian/Waspada/Kritis), inventaris logistik gudang (stok FO/ONT/adaptor + mutasi in/out + alert stok rendah).
**Main Workflow:** Teknisi pasang ODP baru → dicatat di sistem dengan lokasi GPS → OLT dipoll SNMP tiap interval → ONU baru muncul di daftar → admin otorisasi → status redaman termonitor otomatis.
**Integration:** Modul Fault Detection (data redaman sama dipakai untuk deteksi gangguan), Portal Teknisi (peta yang sama).
**Implementation Status:** **IMPLEMENTED** — SNMP OLT divalidasi nyata ke Net-SNMP agent lokal (bukan mock), termasuk skenario timeout perangkat tidak terjangkau.
**Technical Evidence:** `app/Services/Network/SnmpOltService.php`, `app/Models/{NetworkNode,NetworkCablePath,Olt,PonPort,OnuDevice,InventoryItem}.php`, `app/Http/Controllers/Console/{NetworkMapController,NetworkNodeController,OltController,OnuDeviceController,InventoryItemController}.php`.
**Product Value:** Operator bisa lihat seluruh topologi fiber dalam satu peta, tahu ODP mana yang portnya penuh sebelum pasang pelanggan baru, dan dapat peringatan dini kalau stok logistik menipis.

#### MODULE: CPE & TR-069 GenieACS (Modul I)
**Purpose:** Kendali jarak jauh perangkat pelanggan (ONT/modem) via protokol TR-069.
**Target User:** Admin Jaringan/NOC (console), Teknisi (tools lapangan), Pelanggan (self-service WiFi).
**Features:** Klien GenieACS NBI REST (real HTTP, toleran ke 2 skema device TR-098/TR-181), daftar perangkat TR-069 dengan sinkronisasi terjadwal 5 menit, reboot/reset ONT jarak jauh (individual & massal/batch per-wilayah), tes redaman optik dari data SNMP asli (bukan simulasi), audit log semua perubahan SSID/password/reboot, self-service ganti WiFi pelanggan (maks 3x ganti password/hari).
**Main Workflow:** Perangkat ONT terdaftar di ACS → sistem sync data (firmware/WAN IP/SSID/uptime) tiap 5 menit → admin/teknisi kirim perintah reboot → job async terkirim ke ACS → tercatat di audit log.
**Integration:** GenieACS NBI, Modul GIS (data ONU sama), Portal Pelanggan & Teknisi.
**Implementation Status:** **IMPLEMENTED** — divalidasi nyata: task reboot beneran tercatat di instance GenieACS lokal dan bisa dikonfirmasi lewat API ACS.
**Technical Evidence:** `app/Services/Cpe/GenieAcsClient.php`, `app/Jobs/SendCpeCommand.php`, `app/Console/Commands/SyncGenieAcsDevices.php`, `app/Http/Controllers/Console/{CpeDeviceController,CpeAuditLogController,CpeMassActionController}.php`, `app/Http/Controllers/Technician/{CpeToolController,OpticalToolController}.php`, `app/Http/Controllers/Portal/WifiController.php`.
**Product Value:** Pelanggan bisa restart modem sendiri lewat aplikasi tanpa telepon CS; teknisi bisa cek redaman & status ONT dari jarak jauh sebelum berangkat ke lokasi, menghemat waktu kunjungan yang tidak perlu.

#### MODULE: Mesin Deteksi Gangguan Otomatis / Fault Engine (Modul M)
**Purpose:** Deteksi & lokalisasi gangguan jaringan fiber secara otomatis dan proaktif.
**Target User:** Super Admin, Admin Jaringan/NOC.
**Features:** Lokalisasi gangguan 3 level otomatis (1 pelanggan LOS→dropcore putus; 1 ODP LOS bareng→kabel distribusi putus; multi-ODP→jalur cascading hulu putus), riwayat redaman time-series (polling 15-30 menit, interval per-organisasi), deteksi dini/prediktif (turun >3dB dalam 7 hari → alert dengan proyeksi hari sampai kritis), laporan SLA (MTTD/MTTR), retensi data (rollup jam→hari, data mentah dihapus setelah 30 hari), auto-membuat tugas teknisi & tiket support dari insiden yang terdeteksi, auto-broadcast notifikasi ke pelanggan area terdampak.
**Main Workflow:** Sensor redaman ONU dipoll rutin → algoritma bandingkan pola across ODP/ODC → insiden terdeteksi & diklasifikasi root cause-nya → otomatis buat tugas teknisi + tiket pelanggan + broadcast notifikasi ke area terdampak → teknisi selesaikan → SLA (MTTD/MTTR) terekam untuk laporan.
**Integration:** Modul GIS (data node/redaman), Modul Support (auto-ticketing), Modul Notifikasi (auto-broadcast), Portal Teknisi (auto-assign tugas).
**Implementation Status:** **IMPLEMENTED PENUH** — ini modul paling kompleks di seluruh platform, algoritma threshold-based (bukan ML, sesuai keputusan produk).
**Technical Evidence:** `app/Services/Fault/{FaultLocalizationService,PredictiveDegradationService,SlaMetricsService}.php`, `app/Models/{FaultIncident,DegradationAlert,RxPowerReading,RxPowerHourlyRollup,RxPowerDailyRollup}.php`, `app/Console/Commands/{PollOnuRxPower,RollupRxPowerReadings}.php`.
**Product Value:** Operator tahu ada gangguan **sebelum** pelanggan menelepon komplain, dan sistem otomatis menentukan penyebabnya (kabel putus di mana) tanpa teknisi harus menelusuri manual — ini yang paling berpotensi jadi **differentiator produk** dibanding kompetitor billing-only.

#### MODULE: Billing, Invoice & Keuangan ISP (Modul D)
**Purpose:** Penagihan pelanggan internet oleh operator ISP (beda dari billing SaaS NADI).
**Target User:** Finance/Kasir, Super Admin.
**Features:** CRUD invoice pelanggan + item penyesuaian (diskon/denda/biaya instalasi/sewa perangkat), generate tagihan bulanan otomatis per siklus tagih masing-masing pelanggan (idempotent), kasir manual (catat pembayaran tunai/transfer) + void pembayaran (bukan hapus, demi audit), laporan arus kas sederhana (bukan akuntansi double-entry) + pencatatan biaya operasional + ekspor CSV.
**Main Workflow:** Job harian generate invoice sesuai `billing_cycle_day` pelanggan → pelanggan/kasir bayar → dicatat sebagai `CustomerPayment` → laporan arus kas terupdate otomatis.
**Integration:** Modul Notifikasi (trigger invoice jatuh tempo), Modul Reseller (loket pembayaran agen memakai tabel yang sama).
**Implementation Status:** **IMPLEMENTED** untuk siklus invoice-kas manual penuh. **NOT IMPLEMENTED**: cetak invoice PDF (butuh approval dependency baru).
**Technical Evidence:** `app/Models/{CustomerInvoice,CustomerInvoiceItem,CustomerPayment,OperationalExpense}.php`, `app/Services/Billing/AccountingReportService.php`, `app/Console/Commands/GenerateMonthlyCustomerInvoices.php`, `app/Http/Controllers/Console/{CustomerInvoiceController,CustomerPaymentController,AccountingReportController}.php`.
**Product Value:** Admin tidak perlu bikin tagihan pelanggan satu-satu tiap bulan; semua tercatat otomatis dan bisa dilaporkan kapan saja.

#### MODULE: Payment Gateway ISP (Modul E)
**Purpose:** Otomasi penerimaan pembayaran pelanggan lewat gateway pembayaran digital (bukan transfer manual).
**Target User:** (Rencana) Finance/Kasir, Pelanggan.
**Features:** — *(belum ada implementasi apa pun)*.
**Main Workflow:** — *belum ada*.
**Integration:** — *belum ada*.
**Implementation Status:** **PLANNED** — bahkan migration schema-nya (`payment_gateway_settings`) belum dibuat. Pembayaran pelanggan saat ini (`Portal\BillingController::pay()`, `Agent\BillingController::pay()`) **100% simulasi**: klik bayar langsung set status `paid` tanpa validasi pihak ketiga apa pun.
**Technical Evidence:** Tidak ada file `app/Http/Controllers/Webhooks/*`, tidak ada `routes/webhooks.php`, tidak ada kredensial Midtrans/Xendit/dkk di `config/services.php` atau `.env.example`. **VERIFIED (ketiadaan)**.
**Product Value:** *(potensial ke depan)* — pembayaran instan otomatis buka isolir tanpa menunggu verifikasi manual kasir.

#### MODULE: Reseller & Keagenan — Admin (Modul G)
**Purpose:** Pengawasan admin atas jaringan mitra reseller/agen penjual voucher & loket PPOB.
**Target User:** Super Admin, Finance/Kasir (sisi admin); Reseller/Agen (sisi portal sendiri).
**Features:** Daftar mitra + saldo + status aktif/nonaktif, riwayat deposit & mutasi saldo + koreksi manual (dengan alasan wajib), skema komisi otomatis (persen/flat, per voucher atau per tagihan), laporan penjualan reseller + ekspor CSV.
**Main Workflow:** Reseller top-up saldo (masih simulasi) → jual voucher/bayar tagihan pelanggan pakai saldo → komisi otomatis terhitung sesuai skema aktif → admin bisa suspend reseller bermasalah.
**Integration:** Portal Agen (`/agent/*`), Modul Voucher, Modul Billing ISP.
**Implementation Status:** **IMPLEMENTED** sisi admin & portal agen. Top-up saldo agen masih simulasi (menunggu Payment Gateway Modul E).
**Technical Evidence:** `app/Models/{AgentWallet,AgentTransaction,CommissionScheme}.php`, `app/Services/Reseller/CommissionCalculationService.php`, `app/Http/Controllers/Console/{ResellerController,CommissionSchemeController,ResellerReportController}.php`, `app/Http/Controllers/Agent/**`.
**Product Value:** Operator ISP bisa membangun jaringan penjualan lewat mitra/agen tanpa perlu buka cabang, dengan komisi terhitung otomatis dan transparan.

#### MODULE: Toko Voucher Online (Modul J)
**Purpose:** Etalase publik untuk penjualan voucher hotspot langsung ke konsumen, tanpa perlu login.
**Target User:** Super Admin (kelola), Pengunjung publik (beli).
**Features:** Katalog produk toko (harga publik bisa beda dari harga internal), storefront publik per-operator (`/shop/{slug}`, path-based bukan subdomain), sistem anti-fraud (rate limit per nomor HP/IP, deteksi order duplikat), pengaturan tema/logo toko.
**Main Workflow:** Pengunjung buka link toko → pilih paket voucher → checkout → order dibuat status `pending` → *(berhenti di sini — menunggu Payment Gateway)*.
**Integration:** Modul Voucher (`VoucherPackage`), Modul Payment Gateway (dependency yang belum ada).
**Implementation Status:** **PARTIAL** — katalog, storefront, dan anti-fraud **IMPLEMENTED** penuh; logika penerbitan voucher otomatis pasca-bayar (`markPaidAndIssueVoucher()`) **sudah ditulis & teruji**, tapi **tidak bisa terpakai** karena belum ada webhook payment gateway yang memanggilnya — order publik akan selalu berhenti di status "menunggu pembayaran".
**Technical Evidence:** `app/Models/{StoreProduct,StoreOrder}.php`, `app/Http/Controllers/Store/{StorefrontController,CheckoutController}.php`, `app/Http/Controllers/Console/{StoreProductController,StoreOrderController,StorefrontSettingsController,StoreAntiFraudController}.php`, `routes/store.php`.
**Product Value:** Operator dapat kanal penjualan voucher 24 jam tanpa staf jaga — begitu payment gateway aktif, jalur pembelian akan otomatis end-to-end.

#### MODULE: Notifikasi & Broadcast (Modul F)
**Purpose:** Mengirim notifikasi otomatis (WhatsApp/SMS/Email) ke pelanggan dan broadcast massal.
**Target User:** Super Admin (kelola), semua pelanggan (penerima).
**Features:** Pengaturan gateway per-channel (WA/SMS/SMTP) per organisasi, template notifikasi dengan placeholder dinamis, dispatch otomatis di 4 titik pemicu (invoice jatuh tempo H-3/H-1, isolir, pembayaran sukses, tugas teknisi baru), broadcast massal manual + otomatis dari Fault Engine ke pelanggan area terdampak, antrian & log pengiriman dengan retry otomatis dan rate-limit anti-blokir.
**Main Workflow:** Event terjadi (misal invoice jatuh tempo) → `NotificationDispatchService` render template → job dikirim ke antrian → job panggil gateway client → hasil (sukses/gagal) tercatat di log, retry manual tersedia untuk yang gagal.
**Integration:** Dipicu dari Modul Billing, Modul CPE, Modul Fault Detection.
**Implementation Status:** **Arsitektur pipeline IMPLEMENTED penuh** (settings, template, dispatch, antrian, log, retry, broadcast, 4 titik trigger — semua berjalan & teruji). **NAMUN pengiriman WhatsApp/SMS sesungguhnya BELUM IMPLEMENTED** — client yang terpasang saat ini (`NullWhatsAppGatewayClient`, `NullSmsGatewayClient`) **hanya mencatat log, tidak benar-benar mengirim pesan**, karena provider belum dipilih user. Email juga masih `MAIL_MAILER=log` (tidak benar-benar terkirim).
**Technical Evidence:** `app/Services/Notification/{NotificationDispatchService,NullWhatsAppGatewayClient,NullSmsGatewayClient,WhatsAppGatewayClientContract,SmsGatewayClientContract}.php` — **VERIFIED** dibaca langsung, method `send()` cuma `Log::info(...); return true;`. `app/Jobs/{SendNotificationJob,SendBroadcastJob}.php`.
**Product Value:** Begitu provider WA/SMS dipasang, seluruh pipeline (template, jadwal, retry, broadcast) langsung berfungsi tanpa perlu desain ulang — hanya ganti satu binding.

#### MODULE: Customer Service & Tiket (Modul N & Q)
**Purpose:** Desk tiket, live chat, dan basis pengetahuan untuk layanan pelanggan.
**Target User:** CS Support, Super Admin, Pelanggan.
**Features:** Ticket desk admin (assign teknisi dengan saran otomatis berdasar beban kerja & area), auto-ticketing dari Fault Engine, live chat polling 4 detik (bukan websocket) + canned response, knowledge base + FAQ search kata kunci (bukan AI), laporan SLA CS (First Response Time, Resolution Time) + survei kepuasan pelanggan.
**Main Workflow:** Pelanggan buat tiket/chat → CS balas atau assign teknisi → tiket selesai → survei kepuasan muncul otomatis di portal pelanggan → data masuk laporan SLA.
**Integration:** Modul Fault Detection (auto-ticketing), Portal Teknisi (assignment), Portal Pelanggan.
**Implementation Status:** **IMPLEMENTED PENUH**.
**Technical Evidence:** `app/Services/Support/{TechnicianAssignmentService,SlaCsReportService}.php`, `app/Models/{CustomerSupportTicket,SupportChatThread,SupportChatMessage,KnowledgeBaseArticle,TicketSatisfactionSurvey}.php`, `app/Http/Controllers/Console/{SupportTicketController,SupportChatController,KnowledgeBaseArticleController,SlaCsReportController}.php`.
**Product Value:** Pelanggan bisa lacak progres komplain secara real-time, dan tiket gangguan darurat otomatis dibuat sebelum pelanggan sempat mengeluh.

#### MODULE: Keamanan Sistem & Tenant (sisa Modul O & P)
**Purpose:** Keamanan platform (enkripsi, rate-limit, audit) dan identitas tenant.
**Target User:** Super Admin.
**Features:** Vault enkripsi kredensial sensitif (password router, SNMP community, API key gateway notifikasi — semua ter-`encrypted` cast), rate limiting login (5x/menit per identitas+IP), log audit sistem immutable (perubahan paket pelanggan, isolir manual, penghapusan data), pengaturan identitas tenant (nama bisnis, NIB, mata uang, bahasa).
**Main Workflow:** Setiap aksi sensitif (ubah paket, hapus pelanggan) otomatis tercatat ke audit log yang tidak bisa diedit/dihapus siapa pun.
**Integration:** Melekat ke semua modul lain (kredensial mereka yang dienkripsi).
**Implementation Status:** **IMPLEMENTED** untuk vault, rate-limit, dan audit log. **PLANNED (ditunda sengaja)**: 2FA, monitoring kesehatan server, cloud backup database — ketiganya menunggu approval package/keputusan bisnis dari user, bukan lupa dikerjakan.
**Technical Evidence:** `app/Services/Audit/AuditLogger.php`, `app/Models/AuditLog.php`, `app/Http/Controllers/Console/{AuditLogController,TenantSettingsController}.php`. **Catatan desain sengaja:** `Customer.pppoe_password` **sengaja tidak dienkripsi** karena FreeRADIUS butuh membaca plaintext untuk autentikasi PAP — dikonfirmasi user, bukan celah keamanan yang terlewat.
**Product Value:** Data sensitif (password perangkat jaringan) aman di database, dan setiap perubahan penting punya jejak audit yang tak bisa dimanipulasi.

#### MODULE: Portal Multi-Role (Teknisi, Agen, Pelanggan)
**Purpose:** Antarmuka self-service untuk 3 peran eksternal di luar staf console.
**Target User:** Teknisi lapangan, Reseller/Agen, Pelanggan.
**Features (Teknisi):** Daftar tugas (darurat/preventif/pasang baru), peta kerja GIS, tools tes redaman optik, remote reboot/reset ONT, input survey topologi baru, form penyelesaian tugas.
**Features (Agen):** Dashboard saldo, jual/cetak voucher, kios toko pribadi (subdomain sendiri, markup sendiri), loket bayar tagihan PPOB, laporan komisi.
**Features (Pelanggan):** Beranda status koneksi, bayar tagihan (simulasi), self-service WiFi (ganti SSID/password/reboot mandiri, maks 3x/hari), beli voucher tambahan/booster FUP, live chat & tiket support + FAQ, profil akun.
**Main Workflow:** Login sesuai guard masing-masing (`web`+role pivot untuk teknisi/agen, guard `customer` terpisah untuk pelanggan) → akses fitur sesuai peran.
**Integration:** Semua modul console terhubung ke portal-portal ini (voucher, CPE, billing, support).
**Implementation Status:** **IMPLEMENTED PENUH** ketiga portal.
**Technical Evidence:** `routes/{technician,agent,portal}.php`, `app/Http/Controllers/{Technician,Agent,Portal}/**`, `app/Http/Middleware/{EnsureTechnicianAccess,EnsureAgentAccess}.php`.
**Product Value:** Mengurangi beban kontak langsung ke CS — pelanggan dan mitra bisa self-service untuk kebutuhan rutin.

---

### 5. Master Feature List

> ID mengikuti prefix modul. Status: **I**=Implemented, **P**=Partial, **U**=UI Only, **B**=Backend Only, **PL**=Planned, **UNK**=Unknown.

| ID | Module | Feature | Description | User | Status | Evidence |
|---|---|---|---|---|---|---|
| SAAS-001 | SaaS Billing | Manajemen Plan & Harga | Plan bertingkat, harga per siklus/currency, batasan (limit) per plan | Admin NADI | I | `app/Models/Plan.php`, `Admin/Billing/PlanController.php` |
| SAAS-002 | SaaS Billing | Manajemen Organisasi (Tenant) | CRUD organisasi, invite member, seat status | Owner, Admin NADI | I | `app/Models/Organization.php` |
| SAAS-003 | SaaS Billing | Siklus Hidup Langganan | Trial, upgrade/downgrade, pause/resume, cancel-at-period-end | Owner/Billing | I | `app/Services/SubscriptionService.php` |
| SAAS-004 | SaaS Billing | Kode Voucher/Promo SaaS | Diskon percent/fixed, durasi once/repeating/forever | Admin NADI | I | `app/Models/Voucher.php`, `admin/billing/vouchers` |
| SAAS-005 | SaaS Billing | Add-on & Seat Billing | Add-on per subscription, seat bertambah otomatis prorata | Owner/Billing | P | Harga per-seat masih placeholder Rp0 |
| SAAS-006 | SaaS Billing | Invoice, Pajak & Bayar Manual | Invoice otomatis, pajak exclusive, upload bukti transfer, approval admin | Owner/Billing, Admin NADI | I | `app/Services/{InvoiceService,PaymentService}.php` |
| SAAS-007 | SaaS Billing | Grace Period & Dunning | Reminder email H-1/H+1/H+5, downgrade otomatis ke Free | Owner/Billing | I | `config/billing.php`, `SendPaymentReminders` |
| SAAS-008 | SaaS Billing | Portal Billing Self-Service | Kelola plan/member/add-on/voucher/invoice/lifecycle sendiri | Owner/Billing | I | `app/Http/Controllers/App/Billing/**` |
| SAAS-009 | SaaS Billing | Referral/Affiliate | Kode referral, komisi otomatis, approval manual payout | Admin NADI | P | Belum tersambung ke form registrasi publik |
| RBAC-001 | RBAC | Peran & Console Role Granular | 4 role console + 11 hak akses per modul | Owner, Super Admin | I | `OrganizationPolicy.php` |
| NET-001 | Network Core | Manajemen Router MikroTik | CRUD, test connection, sync resource usage terjadwal | Admin Jaringan | I | `MikrotikRouterConnectionService.php` |
| NET-002 | Network Core | Server RADIUS | Sesi aktif, log auth, disconnect/CoA nyata | Admin Jaringan | I | `SqlRadiusSessionService.php` |
| NET-003 | Network Core | VPN Bridge Multi-Protokol | OpenVPN/L2TP/WireGuard + cek konektivitas nyata | Admin Jaringan | I | `VpnConnectionServiceResolver.php` |
| NET-004 | Network Core | Profil Bandwidth & QoS | Rate-limit/burst/priority, push langsung ke MikroTik | Admin Jaringan | I | `BandwidthProfileController.php` |
| NET-005 | Network Core | Backup Router Otomatis | Backup terjadwal harian + unduh file via FTP ke storage | Admin Jaringan | I | commit `b93b98f`, `ecdaf17` |
| GIS-001 | GIS/FTTH | Peta Jaringan Spasial | Leaflet, marker node/router/pelanggan, polyline kabel FO | Admin Jaringan | I | `NetworkMapController.php` |
| GIS-002 | GIS/FTTH | Manajemen ODP/ODC | Hierarki parent-child, rasio port | Admin Jaringan | I | `NetworkNodeController.php` |
| GIS-003 | GIS/FTTH | Manajemen OLT & PON | CRUD + polling SNMP nyata | Admin Jaringan | I | `SnmpOltService.php` |
| GIS-004 | GIS/FTTH | Daftar ONU/ONT | Status registrasi, badge redaman 4 ambang | Admin Jaringan | I | `OnuDeviceController.php` |
| GIS-005 | GIS/FTTH | Inventaris Logistik | Stok + mutasi in/out + alert stok rendah | Admin Jaringan | I | `InventoryItemController.php` |
| CPE-001 | CPE/TR-069 | Klien GenieACS | Integrasi NBI REST real, toleran 2 skema TR-069 | Admin Jaringan | I | `GenieAcsClient.php` |
| CPE-002 | CPE/TR-069 | Kontrol Remote ONT | Reboot/reset individual & massal per-wilayah | Admin Jaringan, Teknisi | I | `CpeMassActionController.php` |
| CPE-003 | CPE/TR-069 | Audit Log Perubahan CPE | Jejak siapa-ubah-apa-kapan-dari-mana | Admin Jaringan | I | `CpeAuditLogController.php` |
| CPE-004 | CPE/TR-069 | Self-Service WiFi Pelanggan | Ganti SSID/password/reboot mandiri (maks 3x/hari) | Pelanggan | I | `Portal/WifiController.php` |
| FLT-001 | Fault Engine | Lokalisasi Gangguan 3-Level | Deteksi otomatis dropcore/distribusi/cascading | Admin Jaringan | I | `FaultLocalizationService.php` |
| FLT-002 | Fault Engine | Monitoring Redaman RX Power | Polling 15-30 menit, badge 4 ambang | Admin Jaringan | I | `PollOnuRxPower` command |
| FLT-003 | Fault Engine | Deteksi Dini/Prediktif | Tren turun >3dB/7 hari + proyeksi hari kritis | Admin Jaringan | I | `PredictiveDegradationService.php` |
| FLT-004 | Fault Engine | Laporan SLA (MTTD/MTTR) | Rata-rata waktu deteksi & pemulihan | Admin Jaringan | I | `SlaMetricsService.php` |
| FLT-005 | Fault Engine | Retensi & Rollup Data Optik | Mentah 30 hari → rollup jam 1 tahun → rollup harian permanen | Sistem (otomatis) | I | `RollupRxPowerReadings` command |
| FLT-006 | Fault Engine | Auto-Task & Auto-Ticket | Insiden otomatis buat tugas teknisi + tiket pelanggan | Sistem (otomatis) | I | `FaultLocalizationService::createEmergencyTask()` |
| CRM-001 | CRM | CRUD Pelanggan 360° | Data diri, ODP, paket, riwayat invoice/tiket dalam 1 layar | Finance/CS | I | `CustomerController.php` |
| CRM-002 | CRM | Paket Layanan & FUP/Booster | Entity paket terpisah, snapshot harga | Finance | P | Job night-booster belum otomatis |
| CRM-003 | CRM | CRM Pipeline (Kanban) | Lead→Survei→Instalasi→Aktif, riwayat interaksi | CS/Sales | I | `CustomerLeadController.php` |
| CRM-004 | CRM | Deteksi Risiko Churn | Tagging otomatis berbasis aturan (bukan ML) | Super Admin | I | `ChurnRiskService.php` |
| CRM-005 | CRM | Impor Data Pelanggan | Upload CSV massal dengan validasi per baris | Super Admin | P | Cuma CSV header exact-match, Excel/Word belum |
| VCH-001 | Voucher | Generator Voucher Batch | Kode unik, mode username=password, maks 500/batch | Finance/Kasir | I | `HotspotVoucherService.php` |
| VCH-002 | Voucher | Stok & Inventory Voucher | Filter available/used/expired/disabled | Finance/Kasir | I | `VoucherInventoryController.php` |
| VCH-003 | Voucher | Template & QR Voucher | Editor + preview live + QR code | Finance/Kasir | I | `VoucherTemplateController.php` |
| VCH-004 | Voucher | Cetak Voucher | A4 grid & thermal 58/80mm | Finance/Kasir | I | `VoucherPrintController.php` |
| VCH-005 | Voucher | Laporan Voucher | Rekap harian/mingguan/bulanan + ekspor CSV | Finance/Kasir | I | `VoucherReportController.php` |
| VCH-006 | Voucher | Push Voucher ke MikroTik Hotspot | Registrasi otomatis kredensial voucher sebagai hotspot-user di router | Sistem | PL | Belum ada method-nya di `RouterConnectionServiceContract` |
| BIL-001 | Billing ISP | CRUD Invoice Pelanggan | Item penyesuaian diskon/denda/instalasi/sewa | Finance/Kasir | I | `CustomerInvoiceController.php` |
| BIL-002 | Billing ISP | Generate Tagihan Bulanan | Otomatis per siklus tagih pelanggan, idempotent | Sistem (otomatis) | I | `GenerateMonthlyCustomerInvoices` |
| BIL-003 | Billing ISP | Kasir Manual & Void | Catat & batalkan pembayaran (audit-safe) | Finance/Kasir | I | `CustomerPaymentController.php` |
| BIL-004 | Billing ISP | Laporan Arus Kas | Kas masuk vs biaya operasional | Finance/Kasir | I | `AccountingReportService.php` |
| BIL-005 | Billing ISP | Cetak Invoice PDF | Export invoice ke PDF | Finance/Kasir | PL | Butuh approval package PDF |
| PAY-001 | Payment Gateway | Gateway Terpusat/Custom (Midtrans dkk) | Charge otomatis, webhook, QRIS dinamis | Pelanggan | PL | Schema & kode belum ada sama sekali |
| RSL-001 | Reseller | Manajemen Mitra | List, detail, suspend/aktifkan reseller | Finance/Super Admin | I | `ResellerController.php` |
| RSL-002 | Reseller | Deposit & Mutasi Saldo | Riwayat top-up + koreksi manual | Finance | I | `AgentWallet.php` |
| RSL-003 | Reseller | Skema Komisi Otomatis | Persen/flat per voucher/tagihan | Finance | I | `CommissionCalculationService.php` |
| RSL-004 | Reseller | Laporan Penjualan Reseller | Omset voucher + loket per agen | Finance | I | `ResellerReportController.php` |
| RSL-005 | Reseller | Portal Agen Lengkap | Dashboard, jual voucher, kios pribadi, loket PPOB, komisi | Reseller/Agen | I | `routes/agent.php` |
| STR-001 | Toko Online | Katalog Produk Toko | Harga publik terpisah dari harga internal | Super Admin | I | `StoreProductController.php` |
| STR-002 | Toko Online | Storefront Publik | `/shop/{slug}`, tanpa login | Publik | I | `StorefrontController.php` |
| STR-003 | Toko Online | Checkout & Order | Buat order, tunggu bayar | Publik | P | Macet di "pending" — nunggu Payment Gateway |
| STR-004 | Toko Online | Sistem Anti-Fraud | Rate limit HP/IP, deteksi order dobel | Sistem (otomatis) | I | `AppServiceProvider` RateLimiter |
| STR-005 | Toko Online | Pengaturan Storefront | Logo & tema toko | Super Admin | I | `StorefrontSettingsController.php` |
| NTF-001 | Notifikasi | Pengaturan Gateway WA/SMS/SMTP | Simpan kredensial per organisasi | Super Admin | I* | *Arsitektur siap, kredensial provider WA/SMS belum ada yang real |
| NTF-002 | Notifikasi | Template & Trigger Otomatis | 4 titik trigger (invoice, isolir, bayar, teknisi) | Sistem (otomatis) | I | `NotificationDispatchService.php` |
| NTF-003 | Notifikasi | Broadcast Massal | Manual + otomatis dari Fault Engine | Super Admin | I | `BroadcastController.php` |
| NTF-004 | Notifikasi | Antrian & Log + Retry | Rate-limit anti-blokir, retry manual | Sistem (otomatis) | I | `SendNotificationJob.php` |
| NTF-005 | Notifikasi | Pengiriman WhatsApp/SMS Nyata | Pesan benar-benar terkirim ke penerima | Pelanggan | PL | `Null*GatewayClient` cuma log, tidak kirim |
| SUP-001 | Support/CS | Ticket Desk + Auto-Assign | Saran teknisi berdasar beban kerja & area | CS Support | I | `TechnicianAssignmentService.php` |
| SUP-002 | Support/CS | Live Chat + Canned Response | Polling 4 detik | CS Support | I | `SupportChatController.php` |
| SUP-003 | Support/CS | Knowledge Base & FAQ Search | Keyword search (bukan AI) | Pelanggan | I | `KnowledgeBaseArticleController.php` |
| SUP-004 | Support/CS | Laporan SLA CS + Survei Puas | FRT, Resolution Time, rating 1-5 | CS Support | I | `SlaCsReportService.php` |
| SEC-001 | Security | Vault Enkripsi Kredensial | Password router/SNMP/gateway ter-`encrypted` | Sistem | I | `Router.php` cast `encrypted` |
| SEC-002 | Security | Rate Limiting Login | 5x/menit per identitas+IP | Sistem | I | `AppServiceProvider` RateLimiter |
| SEC-003 | Security | Audit Log Sistem | Immutable, 3 aksi sensitif tercatat | Super Admin | I | `AuditLogger.php` |
| SEC-004 | Security | Pengaturan Identitas Tenant | Nama bisnis, NIB, mata uang, bahasa | Super Admin | I | `TenantSettingsController.php` |
| SEC-005 | Security | Autentikasi Dua Faktor (2FA) | — | Semua staf | PL | Ditunda, belum approve package |
| SEC-006 | Security | Cloud Backup Database | — | Super Admin | PL | Ditunda, belum approve package |
| SEC-007 | Security | Health Monitoring Server | — | Super Admin | PL | Ditunda, direkomendasikan tool eksternal |
| POR-001 | Portal | Portal Pelanggan Lengkap | Home, billing, WiFi, voucher, support, profile | Pelanggan | I | `routes/portal.php` |
| POR-002 | Portal | Portal Teknisi Lapangan | Tugas, peta, tools optik/CPE, survey | Teknisi | I | `routes/technician.php` |
| POR-003 | Portal | Portal Agen/Reseller | Dashboard, voucher, toko, billing, laporan | Reseller | I | `routes/agent.php` |
| POR-004 | Portal | Panel Admin SaaS NADI | Plan, rekening bank, voucher SaaS, approve payment | Admin NADI | I | `routes/admin.php` |

**Tidak ditemukan sama sekali di project** (jangan dipaksakan ada di kategori manapun): **API publik/developer platform** (tidak ada `routes/api.php` terdaftar di `bootstrap/app.php`), **aplikasi mobile native** (disebut di blueprint sebagai Modul R, eksplisit di luar scope kode Laravel ini).

---

### 6. End-to-End Workflows

#### Workflow: Registrasi & Onboarding Tenant Baru
**Actor:** Calon Owner ISP
**Trigger:** Kunjungan halaman registrasi
**Flow:** Daftar akun → Buat profil organisasi → Pilih plan (opsional trial 14 hari tanpa kartu) → Preview → Organisasi aktif
**Result:** Organisasi baru dengan langganan trial/aktif, owner otomatis jadi member pertama
**Modules Involved:** SaaS Billing, RBAC
**Implementation Status:** IMPLEMENTED
**Evidence:** `app/Http/Controllers/Onboarding/OrganizationController.php`, `routes/web.php:55-66`

#### Workflow: Siklus Billing SaaS (Langganan NADI)
**Actor:** Owner/Billing staf tenant, Admin NADI
**Trigger:** Scheduler harian
**Flow:** Invoice terbit otomatis di awal siklus → Owner transfer manual → Upload bukti bayar di portal → Admin NADI verifikasi → Approve → Status `paid` → Kalau telat: masuk grace period → reminder email H-1/H+1/H+5 → kalau tetap tidak bayar, downgrade otomatis ke plan Free
**Result:** Langganan tetap aktif atau otomatis turun ke Free
**Modules Involved:** SaaS Billing
**Implementation Status:** IMPLEMENTED
**Evidence:** `InvoiceService.php`, `PaymentService.php`, `SendPaymentReminders` command, `ExpireSubscriptionsAfterGracePeriod` command

#### Workflow: Pendaftaran Pelanggan Baru ISP
**Actor:** Staf CS/Finance (via console) atau CRM pipeline
**Trigger:** Lead baru masuk atau pendaftaran langsung
**Flow:** (Opsional) Lead masuk pipeline → Survei → Convert jadi Customer → Isi data + pilih ODP + pilih paket layanan → Nomor pelanggan digenerate otomatis
**Result:** Pelanggan baru siap ditagih & dipoll status jaringannya
**Modules Involved:** CRM, GIS, Billing ISP
**Implementation Status:** IMPLEMENTED
**Evidence:** `CustomerLeadController::convert()`, `CustomerController::store()`

#### Workflow: Siklus Tagihan Pelanggan Internet
**Actor:** Sistem (otomatis), Finance/Kasir, Pelanggan
**Trigger:** Scheduler harian sesuai `billing_cycle_day` masing-masing pelanggan
**Flow:** Job generate invoice bulanan → Pelanggan bayar via portal (simulasi) atau kasir/agen catat manual → Payment tercatat → Notifikasi "pembayaran sukses" terkirim (via channel yang dikonfigurasi) → Kalau telat, notifikasi jatuh tempo H-3/H-1 terkirim otomatis
**Result:** Invoice lunas atau menunggak
**Modules Involved:** Billing ISP, Notifikasi
**Implementation Status:** IMPLEMENTED (pembayaran digital PARTIAL — masih simulasi, real gateway PLANNED)
**Evidence:** `GenerateMonthlyCustomerInvoices`, `Portal/BillingController::pay()`, `NotificationDispatchService`

#### Workflow: Pembelian Voucher Hotspot (Toko Online Publik)
**Actor:** Konsumen publik
**Trigger:** Kunjungan `/shop/{slug}`
**Flow:** Pilih produk voucher → Checkout (isi nomor HP) → Order status `pending` → *(berhenti — menunggu integrasi payment gateway)*
**Result:** Saat ini order tidak pernah otomatis lunas; logic penerbitan voucher pasca-bayar sudah ditulis dan diuji tapi tidak pernah terpanggil di alur produksi
**Modules Involved:** Toko Online, Voucher, Payment Gateway (belum ada)
**Implementation Status:** PARTIAL — jangan promosikan sebagai "beli otomatis", lihat Bagian 21 (Klaim yang Harus Dihindari)
**Evidence:** `CheckoutController::markPaidAndIssueVoucher()` — ada tapi tidak dipanggil webhook manapun

#### Workflow: Deteksi & Penanganan Gangguan Jaringan
**Actor:** Sistem (otomatis), Admin Jaringan/NOC, Teknisi, Pelanggan
**Trigger:** Polling redaman ONU rutin
**Flow:** Redaman ONU terpoll → Pola LOS terdeteksi across topologi → `FaultLocalizationService` klasifikasi level & root cause → Otomatis: buat `FaultIncident` + `TechnicianTask` (prioritas darurat) + `CustomerSupportTicket` terkait + broadcast notifikasi ke pelanggan area terdampak → Teknisi kerjakan tugas → Tiket ditutup → SLA (MTTD/MTTR) terekam
**Result:** Gangguan tertangani dengan jejak lengkap dari deteksi sampai pemulihan
**Modules Involved:** Fault Detection, GIS, Support/CS, Notifikasi, Portal Teknisi
**Implementation Status:** IMPLEMENTED PENUH — ini alur paling matang di seluruh platform
**Evidence:** `FaultLocalizationService::createIfNew()`, `createEmergencyTask()`

#### Workflow: Reaktivasi Pasca-Isolir
**Actor:** Pelanggan, Sistem
**Trigger:** Invoice overdue melewati batas
**Flow:** Invoice `past_due` → *(catatan: mekanisme isolir otomatis PPPoE/RADIUS berbasis status tagihan tidak ditemukan bukti eksplisitnya menyambung ke `Customer.status=isolated` secara otomatis)* → Notifikasi peringatan isolir terkirim → Pelanggan bayar → Payment tercatat → status kembali aktif
**Result:** Lihat catatan
**Modules Involved:** Billing ISP, Notifikasi, Network Core
**Implementation Status:** **NEEDS CONFIRMATION** — job/observer yang secara otomatis mengubah `Customer.status` menjadi `isolated` berdasarkan tagihan overdue tidak ditemukan dalam daftar `app/Console/Commands/` yang diperiksa; yang ada hanya trigger notifikasi `isolir_warning` di `Console\CustomerController::update()` (perubahan manual oleh staf). **Klaim blueprint "Fitur Buka Isolir Otomatis 10 detik pasca bayar" (menu-structure.md:179) TIDAK ditemukan buktinya di kode — jangan dipakai sebagai klaim marketing.**
**Evidence:** Tidak ditemukan file job pemicu isolir otomatis berbasis overdue

#### Workflow: Penjualan via Reseller/Agen
**Actor:** Reseller/Agen
**Trigger:** Pelanggan datang ke loket/kios agen
**Flow:** Agen generate & jual voucher (markup sendiri) ATAU bayarkan tagihan pelanggan pakai saldo deposit → Saldo agen berkurang → Komisi otomatis terhitung sesuai skema aktif → Tercatat di laporan agen
**Result:** Transaksi tercatat, komisi otomatis masuk saldo agen
**Modules Involved:** Reseller, Voucher, Billing ISP
**Implementation Status:** IMPLEMENTED
**Evidence:** `Agent/VoucherController::issue()`, `CommissionCalculationService::apply()`

---

### 7. Automation Inventory

| Automation | Trigger | Action | Result | Module | Evidence |
|---|---|---|---|---|---|
| Konversi Trial Kedaluwarsa | Scheduler harian | Cek `trial_ends_at` lewat | Status → `expired` | SaaS Billing | `subscriptions:convert-expired-trials` |
| Terapkan Perubahan Plan Tertunda | Scheduler harian | `current_period_end` lewat | `pending_plan_id` diterapkan | SaaS Billing | `subscriptions:apply-pending-plan-changes` |
| Finalisasi Pembatalan Tertunda | Scheduler harian | Periode habis + `pending_cancellation` | Status → `canceled` | SaaS Billing | `subscriptions:finalize-pending-cancellations` |
| Perpanjangan Langganan | Scheduler harian | `current_period_end` lewat, status `active` | Invoice periode baru dibuat | SaaS Billing | `subscriptions:renew` |
| Tandai Invoice Lewat Tempo | Scheduler harian | Invoice `open` lewat `due_date` | Status → `past_due` | SaaS Billing | `billing:mark-overdue-invoices-past-due` |
| Downgrade Pasca Grace Period | Scheduler harian | Grace period habis, masih menunggak | Downgrade ke plan Free | SaaS Billing | `billing:expire-subscriptions-after-grace-period` |
| Pengingat Pembayaran (Dunning) | Scheduler harian | H-1/H+1/H+5 jatuh tempo | Email reminder terkirim | SaaS Billing | `billing:send-payment-reminders` |
| Polling Resource Router | Setiap 5 menit | — | CPU/RAM/uptime router terupdate | Network Core | `console:poll-router-resource-usage` |
| Backup Router Harian | Scheduler harian | — | File backup dibuat + diunduh ke storage | Network Core | `console:backup-all-routers` |
| Tagging Risiko Churn | Scheduler harian | — | Pelanggan berisiko ditandai otomatis | CRM | `customers:apply-churn-risk-tagging` |
| Sinkronisasi Perangkat GenieACS | Setiap 5 menit | — | Data ONT (firmware/IP/SSID) terupdate | CPE/TR-069 | `console:sync-genieacs-devices` |
| Polling Redaman ONU | Setiap 5 menit (per-org interval bisa beda) | — | `RxPowerReading` baru dicatat | Fault Engine | `console:poll-onu-rx-power` |
| Rollup Data Redaman | Scheduler harian | Data > 30 hari | Agregat per jam/hari, data mentah dihapus | Fault Engine | `console:rollup-rx-power-readings` |
| Generate Tagihan Bulanan Pelanggan | Scheduler harian | Sesuai `billing_cycle_day` pelanggan | Invoice baru dibuat (idempotent) | Billing ISP | `console:generate-monthly-customer-invoices` |
| Notifikasi Jatuh Tempo | Scheduler harian | H-3/H-1 sebelum due | Notifikasi WA/SMS/Email terkirim (via channel aktif) | Billing ISP + Notifikasi | `console:check-invoice-due-notifications` |
| Deteksi Gangguan Real-time | Setiap polling redaman | Pola LOS terdeteksi | Insiden + tugas + tiket + broadcast otomatis dibuat | Fault Engine | `FaultLocalizationService::createIfNew()` |
| Prediksi Degradasi | Bersamaan polling redaman | Delta redaman > 3dB/7 hari | Alert prediktif + proyeksi hari kritis | Fault Engine | `PredictiveDegradationService::detect()` |
| Kirim Perintah CPE Async | User klik reboot/reset | — | Task terkirim ke antrian job, dieksekusi oleh ACS | CPE/TR-069 | `SendCpeCommand` job |
| Retry Notifikasi Gagal | Job gagal kirim | Admin klik retry (atau retry otomatis job) | Percobaan ulang pengiriman | Notifikasi | `NotificationLogController::retry()` |

> **INFERENCE:** Ini adalah salah satu kekuatan produk paling jelas — **16 proses terjadwal otomatis** berjalan lintas modul (billing, jaringan, deteksi gangguan) tanpa campur tangan manual, jauh melebihi tool billing ISP konvensional yang umumnya cuma otomatisasi invoice.

---

### 8. Integration Inventory

| Integration | Category | Purpose | Status | Configuration/Evidence |
|---|---|---|---|---|
| MikroTik RouterOS API | NETWORK | Kelola router (CRUD config, resource usage, backup, bandwidth profile) | **VERIFIED IMPLEMENTED** — diuji nyata ke simulator CHR | `evilfreelancer/routeros-api-php` (`composer.json`), `MikrotikRouterConnectionService.php` |
| FreeRADIUS (koneksi SQL) | NETWORK | Autentikasi & accounting sesi PPPoE/Hotspot, disconnect via CoA | **VERIFIED IMPLEMENTED** — diuji nyata ke FreeRADIUS Docker | `config/database.php` koneksi `radius`, `SqlRadiusSessionService.php` |
| VPN (OpenVPN/L2TP/WireGuard CLI) | NETWORK | Cek konektivitas tunnel nyata | **VERIFIED IMPLEMENTED** | `app/Services/Network/{OpenVpnConnectionService,L2tpVpnConnectionService,WireguardVpnConnectionService}.php` |
| SNMP (Net-SNMP `snmpget` shell-out) | NETWORK | Polling status & redaman OLT | **VERIFIED IMPLEMENTED** — diuji nyata ke agent SNMP lokal | `SnmpOltService.php` |
| GenieACS (TR-069 NBI REST) | NETWORK | Kelola ONT/modem pelanggan jarak jauh | **VERIFIED IMPLEMENTED** — diuji nyata, task tercatat di ACS | `GenieAcsClient.php`, `config/services.php: genieacs.nbi_url` |
| Payment Gateway (Midtrans/Xendit/dkk) | PAYMENT | Pembayaran digital otomatis pelanggan & langganan SaaS | **NOT IMPLEMENTED** — tidak ada kode/schema sama sekali | Tidak ada di `config/services.php`, tidak ada `routes/webhooks.php` |
| WhatsApp Business API | COMMUNICATION | Kirim notifikasi WA ke pelanggan | **NOT IMPLEMENTED (stub)** — hanya log | `NullWhatsAppGatewayClient.php` |
| SMS Gateway | COMMUNICATION | Kirim notifikasi SMS | **NOT IMPLEMENTED (stub)** — hanya log | `NullSmsGatewayClient.php` |
| SMTP Email | COMMUNICATION | Kirim invoice, reminder, notifikasi | **PARTIAL** — kode Mailable lengkap, tapi `.env.example` masih `MAIL_MAILER=log` (belum benar-benar terkirim di konfigurasi contoh) | `app/Mail/*.php` (6 Mailable class) |
| Slack (notifications) | COMMUNICATION | — | **CONFIGURED, TIDAK DIPAKAI** — kredensial ada di config tapi tidak ditemukan pemanggilan aktif di kode aplikasi | `config/services.php: slack` |
| AWS S3 / Postmark / Resend | INFRASTRUCTURE | Storage/email alternatif | **CONFIGURED, TIDAK AKTIF** — hanya skeleton default Laravel, tidak ada kredensial di `.env.example` | `config/services.php` |

> **PENTING — Anti-hallucination check:** Keberadaan `config/services.php: genieacs` dan koneksi `radius` di `config/database.php` BUKAN sekadar konfigurasi kosong — keduanya benar-benar dipanggil di service layer (`GenieAcsClient`, `SqlRadiusSessionService`) dan sudah diuji terhadap instance sungguhan. Sebaliknya, `slack`/`postmark`/`resend`/`ses` di `config/services.php` **hanya skeleton bawaan Laravel** — tidak ditemukan pemanggilan aktif di controller/service manapun, jadi statusnya **NOT ACTIVE**, bukan implemented.

---

### 9. Reporting & Analytics

| Report | Data Shown | User | Business Value | Status |
|---|---|---|---|---|
| Laporan Voucher | Rekap harian/mingguan/bulanan, total terjual & omset per paket | Finance/Kasir | Tahu paket voucher terlaris | IMPLEMENTED |
| Laporan Reseller | Omset voucher + omset loket per agen, per periode | Finance | Evaluasi performa mitra | IMPLEMENTED |
| Laporan Keuangan/Arus Kas | Kas masuk (pembayaran+voucher+instalasi) vs biaya operasional | Finance/Super Admin | Gambaran profitabilitas sederhana | IMPLEMENTED |
| Laporan SLA Fault Engine | MTTD, MTTR per wilayah/node | Admin Jaringan | Evaluasi kecepatan respons gangguan | IMPLEMENTED |
| Laporan SLA Customer Service | First Response Time, Resolution Time, rating kepuasan | CS Support | Evaluasi kualitas layanan CS | IMPLEMENTED |
| Dashboard Eksekutif Console | Ringkasan operasional (status pelanggan, dll — lihat catatan) | Semua staf console | Gambaran cepat kondisi bisnis | **PARTIAL/NEEDS CONFIRMATION** — `Console\DashboardController` ada, tapi rincian widget yang persis sama seperti blueprint ("Total Omset, ARPU, ODP peta live") tidak diverifikasi satu-per-satu isinya dalam analisis ini |
| Log Audit Sistem | Aksi sensitif (perubahan paket, isolir, hapus data) | Super Admin | Kepatuhan & investigasi insiden | IMPLEMENTED |

---

### 10. Product Capabilities

**CORE FEATURES** (kemampuan utama produk — bila hilang, produk kehilangan identitasnya):
- Manajemen router MikroTik & RADIUS nyata (NET-001–005)
- Billing pelanggan ISP otomatis (BIL-001–004)
- Fault Detection Engine (FLT-001–006)
- Voucher hotspot end-to-end (VCH-001–005)

**SUPPORTING FEATURES** (memperkuat operasional inti, bukan alasan utama orang membeli):
- CRM & manajemen pelanggan (CRM-001–005)
- Reseller/agen (RSL-001–005)
- Support desk & knowledge base (SUP-001–004)
- GIS & inventaris (GIS-001–005)

**DIFFERENTIATOR FEATURES** (berpotensi menjadi pembeda dari kompetitor):
- **Fault Detection Engine dengan lokalisasi otomatis 3-level + prediksi degradasi** — kombinasi deteksi real-time, klasifikasi root-cause otomatis, dan auto-ticketing/auto-broadcast ini jarang ditemukan di tool billing ISP kelas UMKM. *Berpotensi menjadi differentiator dari sisi produk.*
- **Integrasi CPE/TR-069 GenieACS + self-service WiFi pelanggan** yang benar-benar tersambung ke perangkat nyata (bukan simulasi angka). *Berpotensi menjadi differentiator dari sisi produk.*
- **RBAC granular 4 peran + audit log immutable** — lebih matang dari sekadar admin/staff biner yang umum di tool sejenis.

**TECHNICAL FEATURES** (penting tapi lebih cocok halaman integrasi/dokumentasi, bukan homepage):
- Enkripsi vault kredensial, rate limiting login
- Arsitektur contract/interface untuk gateway (memudahkan tambah provider baru)
- Multi-tenant single-database dengan scoping `organization_id`

---

### 11. Feature → Benefit Translation

| Technical Feature | What It Does | Business Benefit | Marketing Message |
|---|---|---|---|
| Fault Localization 3-Level | Sistem membandingkan pola redaman across topologi ODP/ODC dan otomatis menyimpulkan penyebab gangguan (dropcore/distribusi/cascading) | NOC tidak perlu menelusuri manual kabel mana yang putus | "Tahu di mana kabel putus, sebelum teknisi berangkat." |
| Auto-Ticketing dari Fault Engine | Insiden jaringan otomatis membuat tiket pelanggan & tugas teknisi tanpa menunggu laporan | Pelanggan merasa dilayani proaktif, beban CS berkurang | "Gangguan terdeteksi, tiket dibuat, teknisi ditugaskan — semua sebelum pelanggan sempat mengeluh." |
| Generate Tagihan Bulanan Otomatis | Sistem membuat invoice pelanggan berdasarkan siklus tagih masing-masing secara otomatis | Admin tidak perlu membuat tagihan satu-satu | "Biarkan tagihan berjalan otomatis setiap periode." |
| Self-Service WiFi Pelanggan | Pelanggan bisa ganti nama/password WiFi dan restart modem sendiri lewat portal | Mengurangi panggilan ke CS untuk hal sepele | "Ganti WiFi sendiri, tanpa perlu telepon CS." |
| Deteksi Risiko Churn Otomatis | Sistem menandai pelanggan berisiko berhenti berdasarkan pola telat bayar & komplain | Tim bisa follow-up proaktif sebelum pelanggan benar-benar berhenti | "Tahu pelanggan mana yang butuh perhatian, sebelum mereka pergi." |
| Backup Router Terjadwal | Konfigurasi router di-backup otomatis setiap hari ke server | Pemulihan cepat kalau ada kerusakan/kesalahan konfigurasi | "Konfigurasi router aman, tercadangkan tiap hari tanpa harus diingat." |
| Komisi Reseller Otomatis | Sistem menghitung komisi mitra sesuai skema aktif setiap transaksi | Operator tidak perlu hitung manual, mitra lebih percaya karena transparan | "Komisi mitra terhitung otomatis, transparan setiap transaksi." |
| RBAC Granular 4 Peran | Setiap staf hanya bisa akses modul sesuai perannya | Data sensitif (keuangan, kredensial jaringan) lebih aman dari akses berlebih | "Setiap staf hanya melihat apa yang perlu mereka lihat." |

---

### 12. Marketing Differentiators

Lihat Bagian 10 untuk kategorisasi lengkap. Ringkasan untuk tim marketing:
1. **Fault Detection Engine** — paling unik, paling teknis, paling mudah didemokan visual (peta + status warna).
2. **Integrasi jaringan nyata** (MikroTik, RADIUS, GenieACS, SNMP) — bukan sekadar pencatatan manual seperti kompetitor billing-only.
3. **Ekosistem 4 portal dalam 1 platform** (Console + Teknisi + Agen + Pelanggan) — mengurangi kebutuhan tool terpisah.

> Jangan mengklaim "unik di pasar" tanpa riset kompetitor eksternal — gunakan istilah "berpotensi menjadi differentiator dari sisi produk" sesuai instruksi analisis.

---

### 13. Website Marketing Mapping

## WEBSITE — BERANDA

### Hero — 3 Rekomendasi Headline

**Headline 1:** "Kelola Bisnis ISP Anda dari Satu Dashboard — Jaringan, Billing, dan Pelanggan."
**Supporting Copy:** Router, RADIUS, voucher, tagihan, sampai deteksi gangguan — semua terhubung, bukan sekadar catatan manual.
**Proof Point:** Terintegrasi nyata dengan MikroTik, FreeRADIUS, dan GenieACS (bukan simulasi).

**Headline 2:** "Tahu Ada Gangguan Jaringan, Sebelum Pelanggan Menelepon."
**Supporting Copy:** Mesin deteksi gangguan otomatis melokalisasi masalah — dari satu pelanggan sampai satu ODP — dan langsung menugaskan teknisi.
**Proof Point:** Auto-ticketing & auto-broadcast notifikasi ke pelanggan area terdampak.

**Headline 3:** "Satu Platform untuk Admin, Teknisi, Reseller, dan Pelanggan Anda."
**Supporting Copy:** Empat portal terintegrasi — console operasional, aplikasi lapangan teknisi, kios reseller, dan self-service pelanggan.
**Proof Point:** Self-service WiFi pelanggan tersambung langsung ke perangkat via TR-069/GenieACS.

### Main Product Pillars (5 pilar)

1. **Pillar:** Manajemen Jaringan Terpadu
   **Feature Source:** NET-001–005, GIS-001–005, CPE-001–004
   **Headline:** "Router, RADIUS, dan ONT — Terkendali dari Satu Tempat"
   **Short Description:** Kelola MikroTik, sesi RADIUS, VPN, dan perangkat pelanggan (ONT) langsung dari dashboard, dengan backup otomatis dan peta jaringan visual.

2. **Pillar:** Deteksi Gangguan Cerdas
   **Feature Source:** FLT-001–006
   **Headline:** "Deteksi Gangguan Sebelum Jadi Komplain"
   **Short Description:** Sistem memantau redaman optik, melokalisasi penyebab gangguan otomatis, dan langsung menugaskan teknisi serta memberi tahu pelanggan terdampak.

3. **Pillar:** Billing & Voucher Otomatis
   **Feature Source:** BIL-001–004, VCH-001–005
   **Headline:** "Tagihan Jalan Sendiri, Voucher Siap Jual"
   **Short Description:** Tagihan bulanan terbit otomatis, voucher hotspot bisa digenerate dan dicetak dalam hitungan detik, lengkap dengan laporan penjualan.

4. **Pillar:** Ekosistem Reseller & CRM
   **Feature Source:** RSL-001–005, CRM-001–005
   **Headline:** "Perluas Jaringan Penjualan Lewat Mitra"
   **Short Description:** Kelola mitra reseller dengan komisi otomatis, dan pantau risiko churn pelanggan lewat CRM bawaan.

5. **Pillar:** Layanan Pelanggan Mandiri
   **Feature Source:** POR-001, CPE-004, SUP-001–004
   **Headline:** "Pelanggan Bisa Urus Sendiri, Tim Anda Fokus ke yang Penting"
   **Short Description:** Portal pelanggan lengkap — ganti WiFi sendiri, beli voucher tambahan, lacak tiket, dan live chat dengan CS.

### Feature Highlights (6 untuk homepage)

1. **Feature:** Fault Detection Engine — **Marketing Heading:** "Radar Gangguan Jaringan Anda" — **Description:** Deteksi otomatis lokasi gangguan (dropcore/distribusi/cascading) plus prediksi dini penurunan kualitas sinyal. — **Suggested Visual:** Peta dengan indikator warna Hijau/Kuning/Merah — **Evidence:** FLT-001–003
2. **Feature:** Integrasi MikroTik & RADIUS Nyata — **Marketing Heading:** "Bukan Simulasi, Terhubung ke Router Anda" — **Description:** Test koneksi, sinkronisasi resource, push profil bandwidth, backup — semua ke perangkat sungguhan. — **Suggested Visual:** Screenshot dashboard router dengan status online — **Evidence:** NET-001–005
3. **Feature:** Generator & Toko Voucher Online — **Marketing Heading:** "Jual Voucher Hotspot 24 Jam" — **Description:** Generate voucher massal, cetak thermal, dan buka toko online publik. — **Suggested Visual:** Mockup voucher tercetak + halaman toko — **Evidence:** VCH-001–005, STR-001–002
4. **Feature:** Self-Service WiFi Pelanggan — **Marketing Heading:** "Pelanggan Ganti WiFi Sendiri" — **Description:** Ganti SSID, password, dan restart modem tanpa telepon CS. — **Suggested Visual:** Mockup portal pelanggan halaman WiFi — **Evidence:** CPE-004
5. **Feature:** RBAC Granular — **Marketing Heading:** "Kontrol Akses Sesuai Peran Staf" — **Description:** 4 peran staf dengan hak akses spesifik per modul. — **Suggested Visual:** Diagram peran & akses — **Evidence:** RBAC-001
6. **Feature:** CRM & Deteksi Risiko Churn — **Marketing Heading:** "Tahu Pelanggan yang Butuh Perhatian" — **Description:** Tagging otomatis pelanggan berisiko berhenti berlangganan. — **Suggested Visual:** Dashboard tag pelanggan — **Evidence:** CRM-004

### Trust / Technical Proof
- Dibangun di atas Laravel 13 / PHP 8.3 — framework matang & banyak dipakai enterprise.
- Integrasi nyata (bukan mock) ke MikroTik RouterOS API, FreeRADIUS, GenieACS, SNMP.
- Kredensial sensitif (password router, API key) terenkripsi di database.
- Audit log immutable untuk kepatuhan operasional.

---

## WEBSITE — FITUR

### SECTION 1 — Manajemen Jaringan
**Headline:** Kendali Penuh Infrastruktur Jaringan Anda
**Description:** Kelola router, RADIUS, VPN, dan bandwidth langsung dari dashboard, terhubung nyata ke perangkat.
**Features:** Manajemen Router MikroTik · Server RADIUS · VPN Bridge Multi-Protokol · Profil Bandwidth & QoS · Backup Router Otomatis
**Website copy:** "Tidak perlu login satu-satu ke tiap router — kelola semuanya dari satu dashboard, dengan backup otomatis setiap hari."
**Evidence:** NET-001–005

### SECTION 2 — GIS & Infrastruktur FTTH
**Headline:** Peta Jaringan Fiber Anda, Selalu Terkini
**Description:** Visualisasi topologi ODP/ODC/OLT, status ONT, dan inventaris logistik.
**Features:** Peta Jaringan Spasial · Manajemen ODP/ODC · OLT & Port PON · Daftar ONU/ONT · Inventaris Logistik
**Website copy:** "Tahu ODP mana yang portnya masih kosong, sebelum tim ke lapangan."
**Evidence:** GIS-001–005

### SECTION 3 — Deteksi Gangguan Otomatis
**Headline:** Mesin Deteksi Gangguan yang Bekerja 24 Jam
**Description:** Lokalisasi otomatis penyebab gangguan, prediksi dini penurunan kualitas, dan laporan SLA.
**Features:** Lokalisasi Gangguan 3-Level · Monitoring Redaman RX Power · Deteksi Dini/Prediktif · Laporan SLA (MTTD/MTTR)
**Website copy:** "Dari satu pelanggan sampai satu wilayah — sistem tahu di mana masalahnya."
**Evidence:** FLT-001–005

### SECTION 4 — CPE & Self-Service TR-069
**Headline:** Kendali Perangkat Pelanggan dari Jarak Jauh
**Description:** Integrasi GenieACS untuk kontrol ONT/modem, plus self-service WiFi untuk pelanggan.
**Features:** Klien GenieACS · Kontrol Remote Massal · Audit Log CPE · Self-Service WiFi Pelanggan
**Website copy:** "Reboot modem pelanggan tanpa perlu kunjungan lapangan."
**Evidence:** CPE-001–004

### SECTION 5 — Billing & Voucher
**Headline:** Billing Pelanggan yang Berjalan Sendiri
**Description:** Tagihan otomatis, kasir manual, laporan keuangan, dan voucher hotspot end-to-end.
**Features:** Generate Tagihan Bulanan · Kasir Manual & Void · Laporan Arus Kas · Generator & Cetak Voucher · Laporan Voucher
**Website copy:** "Fokus jualan, biarkan sistem yang menagih."
**Evidence:** BIL-001–004, VCH-001–005

### SECTION 6 — CRM & Manajemen Pelanggan
**Headline:** Kenali Pelanggan Anda Lebih Dalam
**Description:** Data 360°, pipeline penjualan, dan deteksi risiko churn otomatis.
**Features:** CRUD Pelanggan 360° · CRM Pipeline · Deteksi Risiko Churn · Impor Data Massal
**Website copy:** "Satu layar untuk semua riwayat pelanggan — dari tagihan sampai tiket."
**Evidence:** CRM-001–005

### SECTION 7 — Reseller & Keagenan
**Headline:** Perluas Jaringan Penjualan Lewat Mitra
**Description:** Portal agen lengkap dengan komisi otomatis dan laporan penjualan.
**Features:** Manajemen Mitra · Deposit & Mutasi Saldo · Skema Komisi Otomatis · Portal Agen Lengkap
**Website copy:** "Mitra jualan, sistem yang hitung komisinya."
**Evidence:** RSL-001–005

### SECTION 8 — Customer Service & Support
**Headline:** Layanan Pelanggan yang Terorganisir
**Description:** Ticket desk, live chat, knowledge base, dan laporan SLA.
**Features:** Ticket Desk + Auto-Assign · Live Chat · Knowledge Base · Laporan SLA CS
**Website copy:** "Tiket gangguan otomatis dibuat sebelum pelanggan sempat komplain."
**Evidence:** SUP-001–004

### SECTION 9 — Keamanan & Administrasi
**Headline:** Data Anda Aman, Setiap Perubahan Tercatat
**Description:** Enkripsi kredensial, rate limiting, dan audit log immutable.
**Features:** Vault Enkripsi Kredensial · Rate Limiting Login · Audit Log Sistem · Pengaturan Identitas Tenant
**Website copy:** "Setiap perubahan penting tercatat, tidak bisa dihapus siapa pun."
**Evidence:** SEC-001–004

---

## WEBSITE — SOLUSI

## RT/RW Net
**Problems NADI Can Solve:** Pencatatan pelanggan manual, kesulitan kelola voucher hotspot, tidak ada visibilitas gangguan jaringan.
**Relevant Modules:** Voucher, Network Core, Fault Detection (skala kecil)
**Relevant Features:** VCH-001–005, NET-001–002
**Possible Marketing Message:** "Kelola RT/RW Net Anda seperti ISP profesional."
**Recommended Website Sections:** Fitur Voucher, Fitur Jaringan
**Technical Proof:** Integrasi MikroTik & RADIUS nyata

## Mini ISP
**Problems NADI Can Solve:** Butuh billing terstruktur + reseller untuk ekspansi area tanpa buka cabang.
**Relevant Modules:** Billing ISP, Reseller, CRM
**Relevant Features:** BIL-001–004, RSL-001–005, CRM-001–005
**Possible Marketing Message:** "Berkembang lewat mitra, bukan lewat cabang baru."
**Recommended Website Sections:** Fitur Billing, Fitur Reseller
**Technical Proof:** Komisi otomatis, laporan penjualan reseller

## ISP FTTH
**Problems NADI Can Solve:** Kompleksitas manajemen infrastruktur fiber (ODP/ODC/OLT/ONT) dan kebutuhan deteksi gangguan cepat.
**Relevant Modules:** GIS, Fault Detection, CPE/TR-069
**Relevant Features:** GIS-001–005, FLT-001–006, CPE-001–004
**Possible Marketing Message:** "Kelola jaringan fiber Anda dengan visibilitas penuh, dari OLT sampai ONT pelanggan."
**Recommended Website Sections:** Fitur GIS, Fitur Deteksi Gangguan, Fitur CPE
**Technical Proof:** SNMP OLT real, GenieACS real, lokalisasi gangguan 3-level

## Hotspot & Voucher
**Problems NADI Can Solve:** Butuh cara cepat generate & jual voucher hotspot, termasuk kanal online.
**Relevant Modules:** Voucher, Toko Online
**Relevant Features:** VCH-001–005, STR-001–002 (STR-003 catatan: checkout publik masih menunggu payment gateway)
**Possible Marketing Message:** "Generate, cetak, dan jual voucher hotspot dalam hitungan menit."
**Recommended Website Sections:** Fitur Voucher
**Technical Proof:** Generator batch, template QR, laporan penjualan
> **Catatan jujur:** Kanal pembelian voucher online publik (`/shop/*`) baru sampai tahap "buat order" — belum bisa checkout end-to-end otomatis karena payment gateway belum terpasang. Untuk solusi ini, tonjolkan alur **voucher dijual manual/via reseller** (yang sudah lengkap), bukan alur toko online publik.

---

## WEBSITE — HARGA

> **Pricing structure tidak dapat diverifikasi dari project.** Yang ditemukan hanyalah **contoh data seed 3 tier plan (Free/Pro/Business)** dengan harga placeholder (`todo/admin/subscription-system/01-plans-and-limits.md:21`: Free Rp0, Pro Rp150rb/bulan, Business Rp500rb/bulan) — ini adalah **data contoh untuk keperluan development**, bukan harga final produk yang sudah diputuskan bisnis. Jangan gunakan angka ini di halaman harga publik tanpa konfirmasi tim produk/bisnis.
>
> Yang bisa dipastikan dari kode: sistem mendukung **plan bertingkat dengan batasan (limit) per plan** (misal `max_seats`), **3 siklus billing** (bulanan/kuartalan/tahunan), **trial tanpa kartu kredit**, dan **add-on** — struktur ini valid untuk dijadikan kerangka halaman harga, tapi **angka rupiahnya harus dikonfirmasi ulang ke tim produk**.

---

## WEBSITE — INTEGRATIONS

**Integration:** MikroTik RouterOS
**Category:** Network
**What NADI Does:** Test koneksi, sinkronisasi resource usage, push profil bandwidth, trigger & unduh backup — langsung ke router.
**Marketing Copy:** "Terhubung langsung ke router MikroTik Anda — bukan sekadar catatan manual."
**Implementation Status:** IMPLEMENTED (diuji nyata)
**Evidence:** NET-001, NET-004, NET-005

**Integration:** FreeRADIUS
**Category:** Network
**What NADI Does:** Menampilkan sesi aktif PPPoE/Hotspot, log autentikasi, dan memutus sesi via CoA/Disconnect.
**Marketing Copy:** "Pantau dan kendalikan sesi pelanggan secara real-time."
**Implementation Status:** IMPLEMENTED (diuji nyata)
**Evidence:** NET-002

**Integration:** GenieACS (TR-069)
**Category:** Network
**What NADI Does:** Sinkronisasi data perangkat ONT/modem, reboot/reset jarak jauh, self-service WiFi pelanggan.
**Marketing Copy:** "Kendalikan modem pelanggan dari jarak jauh, tanpa kunjungan lapangan."
**Implementation Status:** IMPLEMENTED (diuji nyata)
**Evidence:** CPE-001–004

**Integration:** SNMP (OLT Monitoring)
**Category:** Network
**What NADI Does:** Polling status & data PON port OLT.
**Marketing Copy:** "Pantau kesehatan OLT Anda secara otomatis."
**Implementation Status:** IMPLEMENTED (diuji nyata)
**Evidence:** GIS-003

**Integration:** Payment Gateway (Midtrans/Xendit/dkk)
**Category:** Payment
**What NADI Does:** *(rencana)* Pembayaran digital otomatis pelanggan & langganan.
**Marketing Copy:** — *jangan dipromosikan sampai implementasi selesai*
**Implementation Status:** PLANNED — belum ada implementasi
**Evidence:** PAY-001

**Integration:** WhatsApp/SMS Gateway
**Category:** Communication
**What NADI Does:** *(arsitektur siap)* Kirim notifikasi otomatis ke pelanggan.
**Marketing Copy:** — *jangan dipromosikan sebagai "kirim WA otomatis" sampai provider terpasang*
**Implementation Status:** PLANNED (arsitektur IMPLEMENTED, pengiriman nyata belum)
**Evidence:** NTF-005

---

## WEBSITE — FAQ

**Q: Apa itu NADI Billing?**
A: NADI Billing adalah platform manajemen bisnis ISP yang menggabungkan billing pelanggan, manajemen jaringan, dan layanan pelanggan dalam satu sistem. **[VERIFIED]**

**Q: Apakah NADI Billing mendukung MikroTik?**
A: Ya, terintegrasi langsung dengan RouterOS API — bisa test koneksi, sinkronisasi resource, push konfigurasi bandwidth, dan backup otomatis. **[VERIFIED]**

**Q: Apakah tersedia sistem voucher hotspot?**
A: Ya — generator voucher batch, template dengan QR code, cetak (A4/thermal), dan laporan penjualan lengkap. **[VERIFIED]**

**Q: Bagaimana pembayaran tagihan pelanggan bekerja?**
A: Saat ini pembayaran dicatat manual oleh kasir atau lewat "pembayaran instan" di portal pelanggan/agen (yang saat ini disimulasikan tanpa validasi gateway pihak ketiga). Integrasi payment gateway otomatis (QRIS/Virtual Account) sedang dalam roadmap. **[VERIFIED status saat ini; PLANNED untuk gateway]**

**Q: Apakah ada CRM?**
A: Ya — pipeline penjualan (kanban), riwayat interaksi pelanggan, dan deteksi otomatis pelanggan berisiko berhenti berlangganan. **[VERIFIED]**

**Q: Bagaimana monitoring jaringan bekerja?**
A: Sistem memantau redaman optik ONU secara berkala, otomatis melokalisasi penyebab gangguan (kabel putus di ODP/ODC mana), dan langsung menugaskan teknisi serta memberi tahu pelanggan terdampak. **[VERIFIED]**

**Q: Apakah pelanggan bisa ganti password WiFi sendiri?**
A: Ya, lewat portal pelanggan, tersambung langsung ke perangkat ONT (maksimal 3 kali ganti password per hari untuk mencegah penyalahgunaan). **[VERIFIED]**

**Q: Apakah bisa kirim notifikasi WhatsApp otomatis ke pelanggan?**
A: Infrastrukturnya sudah siap (template, jadwal, antrian pengiriman), namun koneksi ke provider WhatsApp resmi masih dalam tahap pemilihan vendor. **[VERIFIED — jangan klaim "sudah kirim WA" sebelum provider aktif]**

---

### 14. Website Content Matrix

| Website Page | Section | Product Feature | Marketing Message | Technical Proof | Status |
|---|---|---|---|---|---|
| Homepage | Hero | Fault Detection Engine | "Tahu ada gangguan sebelum pelanggan menelepon" | FLT-001–003 | READY |
| Homepage | Pillar: Manajemen Jaringan | Router/RADIUS/VPN | "Terhubung nyata ke router Anda" | NET-001–005 | READY |
| Homepage | Pillar: Billing Otomatis | Invoice bulanan otomatis | "Biarkan tagihan berjalan otomatis" | BIL-001–002 | READY |
| Fitur | Section Jaringan | Router/RADIUS/VPN/QoS/Backup | "Kendali penuh dari satu dashboard" | NET-001–005 | READY |
| Fitur | Section GIS | ODP/ODC/OLT/ONU/Inventaris | "Peta jaringan fiber selalu terkini" | GIS-001–005 | READY |
| Fitur | Section Fault Engine | Lokalisasi + prediksi + SLA | "Radar gangguan jaringan Anda" | FLT-001–005 | READY |
| Fitur | Section CPE | GenieACS + self-service WiFi | "Kendali ONT dari jarak jauh" | CPE-001–004 | READY |
| Fitur | Section Billing/Voucher | Invoice + voucher + laporan | "Fokus jualan, sistem yang menagih" | BIL/VCH | READY |
| Fitur | Section CRM | Pipeline + churn detection | "Kenali pelanggan lebih dalam" | CRM-001–005 | READY |
| Fitur | Section Reseller | Komisi otomatis + laporan | "Mitra jualan, sistem hitung komisi" | RSL-001–005 | READY |
| Fitur | Section Support | Ticket + chat + KB + SLA | "Layanan pelanggan terorganisir" | SUP-001–004 | READY |
| Solusi | RT/RW Net | Voucher + Network Core | "ISP profesional untuk RT/RW Net" | VCH/NET | READY |
| Solusi | Mini ISP | Billing + Reseller | "Berkembang lewat mitra" | BIL/RSL | READY |
| Solusi | ISP FTTH | GIS + Fault + CPE | "Visibilitas penuh jaringan fiber" | GIS/FLT/CPE | READY |
| Solusi | Hotspot & Voucher | Voucher (manual/reseller) | "Generate & jual voucher cepat" | VCH-001–005 | READY (kanal toko online publik NEEDS CONFIRMATION dulu) |
| Pricing | — | Struktur plan bertingkat | *(tanpa angka pasti)* | SAAS-001 | NEEDS PRODUCT CONFIRMATION |
| Integrations | Card MikroTik/RADIUS/GenieACS/SNMP | Integrasi nyata | "Bukan simulasi" | NET/CPE/GIS | READY |
| Integrations | Card Payment Gateway | — | — jangan tampilkan sebagai aktif | PAY-001 | NOT READY |
| Integrations | Card WhatsApp/SMS | — | — jangan tampilkan sebagai aktif | NTF-005 | NOT READY |
| FAQ | — | Semua FAQ Bagian 13 | — | — | READY (kecuali FAQ payment — perlu redaksi hati-hati) |
| Demo | — | Live Fault Detection + Router | "Lihat sistem mendeteksi gangguan secara langsung" | FLT-001, NET-001 | READY (perlu environment demo) |

---

### 15. Marketing Readiness

| Feature | Marketing Readiness | Reason |
|---|---|---|
| Fault Detection Engine (FLT-001–006) | READY FOR WEBSITE | Implementasi penuh, teruji, mudah divisualisasikan |
| Network Core (NET-001–005) | READY FOR WEBSITE | Implementasi penuh, diuji nyata ke device |
| GIS/FTTH (GIS-001–005) | READY FOR WEBSITE | Implementasi penuh |
| CPE/TR-069 (CPE-001–004) | READY FOR WEBSITE | Implementasi penuh, diuji nyata ke ACS |
| Voucher (VCH-001–005) | READY FOR WEBSITE | Implementasi penuh |
| Billing ISP (BIL-001–004) | READY FOR WEBSITE | Implementasi penuh |
| Reseller (RSL-001–005) | READY FOR WEBSITE | Implementasi penuh |
| CRM (CRM-001–004) | READY FOR WEBSITE | Implementasi penuh |
| Support/CS (SUP-001–004) | READY FOR WEBSITE | Implementasi penuh |
| Security (SEC-001–004) | READY FOR WEBSITE (sebagai trust signal, bukan headline) | Implementasi penuh tapi kurang menarik untuk headline |
| SaaS Billing Portal (SAAS-001–008) | NEEDS PRODUCT CONFIRMATION | Fitur benar ada, tapi angka harga & posisi plan perlu diputuskan tim bisnis sebelum dipublikasikan |
| Toko Online Publik (STR-001–003) | NEEDS DEVELOPER CONFIRMATION | Katalog & storefront jalan, tapi checkout tidak selesai end-to-end — perlu keputusan kapan payment gateway masuk sebelum dipromosikan sebagai kanal jual aktif |
| Payment Gateway (PAY-001) | NOT READY FOR MARKETING | Belum ada implementasi sama sekali |
| Notifikasi WA/SMS Nyata (NTF-005) | NOT READY FOR MARKETING | Masih stub log-only, provider belum dipilih |
| 2FA, Cloud Backup, Health Monitoring (SEC-005–007) | NOT READY FOR MARKETING | Masih planned, ditunda sengaja |
| Push Voucher ke MikroTik Hotspot (VCH-006) | NOT READY FOR MARKETING | Belum ada implementasi |
| Fitur Buka Isolir Otomatis Pasca Bayar | NOT READY FOR MARKETING | Disebut di blueprint tapi tidak ditemukan bukti kode — lihat Bagian 6 Workflow Reaktivasi |

---

### 16. Marketing Claims to Avoid

## MARKETING CLAIMS TO AVOID

**Claim:** "Terima pembayaran otomatis via QRIS/Virtual Account/gerai retail"
**Reason:** Payment gateway belum diimplementasikan sama sekali — pembayaran saat ini simulasi murni.
**Evidence:** Tidak ada `routes/webhooks.php`, tidak ada kredensial provider di config manapun.

**Claim:** "Notifikasi WhatsApp otomatis ke pelanggan"
**Reason:** Client WA yang terpasang hanya mencatat log, tidak benar-benar mengirim pesan — provider belum dipilih.
**Evidence:** `NullWhatsAppGatewayClient.php` — method `send()` cuma `Log::info()`.

**Claim:** "Buka isolir otomatis 10 detik setelah bayar"
**Reason:** Disebut di dokumen blueprint (menu-structure.md) tapi tidak ditemukan bukti implementasi job/observer yang mengaitkan status pembayaran dengan pembukaan isolir otomatis.
**Evidence:** Tidak ditemukan di `app/Console/Commands/` maupun service manapun.

**Claim:** "Beli voucher online, langsung dapat kode instan"
**Reason:** Alur toko online publik berhenti di status "menunggu pembayaran" — logic penerbitan voucher otomatis sudah ditulis tapi tidak pernah terpanggil karena webhook payment gateway belum ada.
**Evidence:** `CheckoutController::markPaidAndIssueVoucher()` tidak dipanggil di jalur produksi manapun.

**Claim:** "Keamanan 2FA untuk semua staf"
**Reason:** 2FA sengaja ditunda, belum ada implementasi.
**Evidence:** `todo/admin/isp-platform/13-system-security-tenant.md` Fase 1 status ditunda.

**Claim:** "Cadangan otomatis ke cloud (S3/GCS)"
**Reason:** Cloud backup database sengaja ditunda, belum ada package/implementasi.
**Evidence:** Sama seperti di atas, Fase 7.

**Claim:** "Push voucher otomatis jadi user hotspot MikroTik"
**Reason:** Voucher tercatat di database NADI tapi belum ada mekanisme yang mendaftarkannya sebagai hotspot-user nyata di router.
**Evidence:** `todo/admin/isp-platform/04-voucher-admin.md` Keputusan terbuka.

---

### 17. Gap Analysis

| Item | Documentation Says | Project Reality | Recommendation |
|---|---|---|---|
| Backup Router — unduh ke storage | `todo/01-core-network-auth.md` (versi terbaca) bilang "belum di-download ke storage" | **Sudah IMPLEMENTED** — commit `b93b98f` menambahkan unduh via FTP ke storage Laravel | Update dokumentasi todo agar tim lain tidak mengira ini masih gap |
| VPN monitoring/konektivitas nyata | Dokumen bilang "status diisi manual, monitoring otomatis nyusul" | **Sudah IMPLEMENTED** — commit `ebe3327` menambahkan pengecekan konektivitas real per-protokol | Sama seperti di atas |
| Backup router terjadwal harian | Dokumen bilang "belum diwire ke scheduler" | **Sudah IMPLEMENTED** — commit `ecdaf17` + `routes/console.php:19` `console:backup-all-routers` daily | Sama seperti di atas |
| Fitur "Buka Isolir Otomatis" (blueprint PDF) | Disebut eksplisit di `menu-structure.md:179` | Tidak ditemukan implementasi otomatisnya di kode | Klarifikasi ke tim produk: apakah ini sengaja belum dikerjakan atau memang di luar scope |
| Payment Gateway Modul E | Blueprint PDF menyebutnya sebagai bagian inti Modul D&E | Belum ada schema/kode sama sekali — keputusan bisnis (Mode Terpusat vs Custom) belum diambil | Perlu keputusan user sebelum development dimulai (dicatat eksplisit di todo) |
| Provider WhatsApp/SMS | Blueprint menyebut "Kirim kode voucher langsung ke WhatsApp" (Portal Agen) | Arsitektur siap, provider belum dipilih, client masih stub | Perlu keputusan vendor dari user |
| Nama Menu vs Route Prefix | Blueprint PDF pakai prefix `/admin/*` untuk semua modul ISP | Implementasi nyata pakai prefix `/console/*` (nama file `routes/console-web.php`) — `/admin/*` dipakai eksklusif untuk panel SaaS internal NADI | Tim frontend/marketing harus pakai peta modul di Bagian 3 & 4 laporan ini, bukan prefix URL di blueprint PDF lama |

---

### 18. Product / Developer Clarifications Needed

1. **Keputusan bisnis Payment Gateway** — Mode Terpusat (NADI jadi perantara dana) vs Mode Custom (tiap tenant pasang gateway sendiri) — ini keputusan model bisnis, bukan cuma teknis (`todo/08-billing-invoice-gateway.md`).
2. **Provider WhatsApp/SMS resmi** — perlu dipilih vendor sebelum notifikasi bisa benar-benar terkirim.
3. **Konfirmasi status "Buka Isolir Otomatis"** — apakah ini scope yang disengaja ditunda atau perlu segera dibangun (relevan untuk klaim marketing "reaktivasi instan").
4. **Angka harga plan final** — data yang ada di seeder adalah placeholder development, perlu approval tim bisnis untuk halaman Harga.
5. **Status kesiapan produksi kanal Toko Online Publik** — apakah fitur ini dipromosikan sebagai "coming soon" atau ditahan dulu dari halaman publik.
6. **Approval dependency tertunda** — beberapa fitur menunggu approval package baru (PDF invoice, 2FA, cloud backup, Excel import/export) sesuai kebijakan proyek "tidak mengubah dependency tanpa approval".

---

### 19. Final Website Content Recommendations

1. **Prioritaskan Fault Detection Engine sebagai hero product** — paling matang, paling mudah dibuat visual menarik (peta + status warna + notifikasi otomatis).
2. **Gunakan integrasi nyata (MikroTik/RADIUS/GenieACS/SNMP) sebagai trust signal**, bukan sekadar daftar logo — tunjukkan buktinya (misal: "diuji langsung ke perangkat, bukan simulasi").
3. **Tunda halaman/section yang menonjolkan Payment Gateway & WhatsApp otomatis** sampai kedua fitur ini benar-benar aktif — gunakan bahasa "segera hadir" jika tetap ingin disebut di roadmap publik.
4. **Halaman Harga tunggu konfirmasi bisnis** — jangan publikasikan angka Rp150rb/Rp500rb dari seeder tanpa persetujuan.
5. **Solusi "Hotspot & Voucher" tetap bisa dipromosikan kuat**, asal fokus ke alur voucher manual/reseller (lengkap) dan bukan checkout toko online publik (belum selesai).
6. **Section Solusi ISP FTTH paling kuat buktinya** — GIS + Fault Detection + CPE semuanya IMPLEMENTED dan teruji nyata, cocok jadi studi kasus/demo utama untuk audiens B2B teknis.

---

# NADI PRODUCT SUMMARY FOR WEBSITE TEAM

1. **NADI sebenarnya produk apa?** Platform SaaS manajemen bisnis ISP — menyatukan billing pelanggan, manajemen jaringan (router/RADIUS/GIS/OLT/ONT), CRM, reseller, dan layanan pelanggan dalam satu sistem, dengan integrasi nyata ke perangkat jaringan (bukan sekadar pencatatan).
2. **Siapa target utama NADI?** Operator ISP kecil-menengah — RT/RW Net, Mini ISP, ISP FTTH, dan penyedia hotspot/voucher.
3. **Apa modul utamanya?** Network Core, GIS/FTTH, CPE/TR-069, Fault Detection Engine, CRM, Voucher, Billing ISP, Reseller, Notifikasi, Support/CS, Toko Online, Security/Tenant — plus lapisan SaaS Billing (langganan NADI sendiri) dan 4 portal (Console, Teknisi, Agen, Pelanggan).
4. **Apa 10 fitur terpenting?** (1) Lokalisasi gangguan otomatis 3-level, (2) Integrasi MikroTik nyata, (3) Server RADIUS real dengan CoA disconnect, (4) Integrasi GenieACS/TR-069, (5) Generate tagihan bulanan otomatis, (6) Generator & toko voucher hotspot, (7) CRM dengan deteksi churn otomatis, (8) Portal reseller dengan komisi otomatis, (9) Self-service WiFi pelanggan, (10) RBAC granular + audit log.
5. **Apa 5 automation terpenting?** (1) Deteksi & lokalisasi gangguan real-time, (2) Generate tagihan bulanan, (3) Backup router harian, (4) Siklus billing SaaS (trial/renewal/dunning), (5) Polling & rollup data redaman optik.
6. **Apa integrasi utama?** MikroTik RouterOS API, FreeRADIUS, GenieACS (TR-069), SNMP (OLT) — semuanya diuji nyata ke perangkat/simulator sungguhan, bukan mock.
7. **Apa 4–6 feature pillar terbaik untuk website?** Manajemen Jaringan Terpadu, Deteksi Gangguan Cerdas, Billing & Voucher Otomatis, Ekosistem Reseller & CRM, Layanan Pelanggan Mandiri.
8. **Fitur apa yang paling layak ditonjolkan?** Fault Detection Engine (paling unik & matang) dan integrasi jaringan nyata (MikroTik/RADIUS/GenieACS) sebagai bukti teknis kredibel.
9. **Fitur apa yang belum boleh dipromosikan?** Payment gateway otomatis, notifikasi WhatsApp/SMS nyata, buka isolir otomatis, push voucher ke MikroTik hotspot, 2FA, cloud backup, checkout toko online publik end-to-end.
10. **Informasi apa yang masih perlu dikonfirmasi Developer/Product?** Keputusan model bisnis payment gateway, pemilihan vendor WA/SMS, angka harga plan final, status resmi fitur "buka isolir otomatis", dan kesiapan publikasi kanal toko online publik.
