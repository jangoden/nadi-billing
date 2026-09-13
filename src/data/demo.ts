import { billingFlow, customerJourney, voucherFlow } from "./marketing";
import type { IconName } from "@/components/ui/icon";

export const capacityOptions = ["100", "500", "1.000", "2.500", "5.000+", "Custom"] as const;

export const demoFlows: {
  id: string;
  name: string;
  icon: IconName;
  steps: string[];
  descriptions: string[];
}[] = [
  {
    id: "voucher",
    name: "Voucher & Payment",
    icon: "store",
    steps: voucherFlow,
    descriptions: [
      "Operator memilih paket durasi/kecepatan dan menentukan jumlah voucher yang ingin diterbitkan.",
      "Sistem menerbitkan hingga 500 kode unik instan dengan mode username=password dan QR code.",
      "Voucher dicetak rapi langsung dari browser dalam layout printer thermal 58/80mm atau A4 kisi.",
      "Voucher didistribusikan ke outlet langsung atau dijual oleh mitra reseller via portal agen.",
      "Pelanggan memasukkan kredensial voucher pada captive portal hotspot untuk login.",
      "Sesi pelanggan terhubung secara real-time dan tercatat di server RADIUS serta router.",
    ],
  },
  {
    id: "billing",
    name: "Billing & Finance",
    icon: "receipt",
    steps: billingFlow,
    descriptions: [
      "Sistem memeriksa tanggal siklus tagih pelanggan dan menerbitkan invoice otomatis (idempotent).",
      "Antrian pengingat tagihan disiapkan menjelang jadwal jatuh tempo masing-masing pelanggan.",
      "Batas waktu pembayaran tagihan dipantau untuk memastikan ketertiban arus kas operasional.",
      "Pembayaran diselesaikan melalui kasir kantor atau loket pembayaran agen mitra.",
      "Kasir mencatat pembayaran secara audit-safe ke arus kas masuk operasional (tersedia fitur void).",
      "Seluruh riwayat pembayaran tersimpan dalam audit log permanen dan laporan arus kas terupdate seketika.",
    ],
  },
  {
    id: "network",
    name: "Network Intelligence",
    icon: "network",
    steps: [
      "Telemetri Jaringan",
      "Monitoring RX Power",
      "Lokalisasi 3-Level",
      "Auto-Task Teknisi",
      "Laporan SLA (MTTD/MTTR)",
    ],
    descriptions: [
      "Sistem memantau resource router MikroTik, sesi aktif RADIUS, dan polling OLT/ONU secara rutin.",
      "Sensor redaman optik mendeteksi penurunan kualitas sinyal ONU dan tren degradasi >3dB dalam 7 hari.",
      "Algoritma melokalisasi akar masalah secara otomatis: dropcore 1 pelanggan, kabel ODP, atau jalur cascading.",
      "Tiket gangguan darurat dan penugasan teknisi terdekat langsung dibuat otomatis oleh sistem.",
      "Waktu deteksi (MTTD) dan waktu pemulihan (MTTR) dihitung otomatis untuk evaluasi performa SLA tim.",
    ],
  },
  {
    id: "crm",
    name: "CRM",
    icon: "users",
    steps: customerJourney,
    descriptions: [
      "Prospek pelanggan baru masuk ke kanban pipeline untuk kualifikasi dan penjadwalan.",
      "Teknisi memvalidasi titik koordinat GPS dan ketersediaan kapasitas port ODP pada peta spasial GIS.",
      "Pemasangan ONT di rumah pelanggan selesai dan perangkat terdaftar ke GenieACS TR-069.",
      "Pelanggan aktif dapat menikmati internet dan mengganti password WiFi sendiri melalui portal mandiri.",
      "Sistem secara otomatis menandai pelanggan berisiko churn berdasarkan histori keluhan dan keterlambatan bayar.",
    ],
  },
];
