import { PageIntro } from "@/components/marketing/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { NetworkIntelligenceSection } from "@/components/sections/network-intelligence-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import {
  FtthArchitectureExplorer,
  FtthMttrCalculator,
} from "@/components/solutions/ftth-solution-interactive";

export const metadata = pageMetadata(
  "Solusi Jaringan & FTTH",
  "Arsitektur jaringan ISP terpadu: Dual-Mode MikroTik, RADIUS CoA, pemetaan GIS ODP/ODC, telemetri SNMP OLT, GenieACS TR-069, dan mesin pelokalisir kabel putus.",
  "/solutions/network-ftth"
);

const metricStats = [
  { value: "< 3 Detik", label: "Lokalisasi Gangguan", desc: "Isolasi titik putus kabel otomatis" },
  { value: "50.000+", label: "Kapasitas Sesi", desc: "Throughput RADIUS CoA terdistribusi" },
  { value: "Dual-Mode", label: "Orkestrasi MikroTik", desc: "Fleksibel Local API atau RADIUS" },
  { value: "Zero-Touch", label: "Provisioning ONT", desc: "Auto-konfigurasi via GenieACS TR-069" },
];

const compatibilityList = [
  {
    category: "Router & Gateway",
    devices: "MikroTik RouterOS v6.4x & v7.x",
    models: "CCR1009/1016/1036/1072, CCR2004/2116/2216, RB Series, Cloud Hosted Router (CHR)",
    protocols: "MikroTik REST API, Winbox API (port 8728), FreeRADIUS RFC-2865 & CoA RFC-3576",
  },
  {
    category: "Optical Line Terminal (OLT)",
    devices: "ZTE, Huawei, VSOL, HIOSO, BDCOM",
    models: "ZTE C300/C320, Huawei SmartAX MA5608T/MA5800, VSOL V1600 Series, HIOSO HA7304/08",
    protocols: "SNMP v2c/v3 MIB Polling, Telnet/SSH CLI Bridge, Optical Diagnostics SFP+",
  },
  {
    category: "Customer Premise (CPE ONT)",
    devices: "ZTE, Huawei, Fiberhome, Raisecom, GMAC",
    models: "F609/F670L, HG8245H5/EG8145V5, AN5506, dan seluruh ONT bersertifikasi TR-069",
    protocols: "CWMP TR-069, TR-098 & TR-181 Data Models, GenieACS v1.2+ JSON-RPC",
  },
];

const technicalFaqs = [
  {
    question: "Apakah NADI mendukung MikroTik RouterOS v7 dan arsitektur REST API terbarunya?",
    answer:
      "Ya. NADI Billing mendukung penuh RouterOS v6 maupun RouterOS v7 (termasuk v7.14+). Sistem kami memanfaatkan REST API native pada ROS v7 untuk kecepatan dan kompatibilitas Winbox API (port 8728/8729 TLS) untuk ROS v6.",
  },
  {
    question: "Kapan waktu yang tepat bagi ISP untuk beralih dari Mode Local API ke Mode RADIUS CoA?",
    answer:
      "Mode Local sangat ideal untuk RT/RW Net atau ISP rintisan dengan 1-5 router dan hingga 1.000 pelanggan aktif karena mudah tanpa server terpisah. Jika jaringan Anda telah melayani ribuan pelanggan atau memiliki multi-core router, beralihlah ke Mode RADIUS CoA untuk meng-offload beban CPU router dan mengeksekusi isolir instan tanpa delay koneksi API.",
  },
  {
    question: "Bagaimana jika dalam satu jaringan ISP terdapat beberapa merek OLT yang berbeda?",
    answer:
      "NADI dirancang vendor-agnostic. Anda dapat menghubungkan OLT ZTE di area barat dan OLT Huawei atau VSOL di area timur secara bersamaan. Poller telemetri kami menstandarisasi metrik suhu, PON power, dan status ONU ke dalam format data terpadu.",
  },
  {
    question: "Apakah pengelolaan TR-069 membutuhkan instalasi server GenieACS mandiri?",
    answer:
      "NADI Billing dapat dihubungkan ke server GenieACS v1.2+ yang sudah Anda miliki (on-premise) melalui API token, atau Anda dapat menggunakan opsi GenieACS terkelola dari NADI Cloud tanpa perlu repot mengelola container dan MongoDB.",
  },
  {
    question: "Bisakah data koordinat tiang, ODC, dan ODP diimpor dari Google Earth KML / KMZ?",
    answer:
      "Tentu. NADI mendukung impor massal berkas KML, KMZ, dan GeoJSON. Sistem akan memetakan koordinat tiang, jalur bentangan kabel fiber, serta otomatis mengasosiasikan nomor port ODP dengan data pelanggan aktif.",
  },
];

export default function NetworkFtthPage() {
  return (
    <>
      {/* 1. Standard PageIntro Header matching all other site pages */}
      <PageIntro
        eyebrow="Solusi Jaringan & FTTH"
        title="Visibilitas Total Jaringan Fiber Optic & Routing Skala Ribuan Pelanggan."
        description="NADI mengintegrasikan seluruh rantai infrastruktur ISP Anda—dari routing core MikroTik (Dual-Mode Local API & RADIUS CoA), pemetaan spasial GIS ODP/ODC, telemetri redaman OLT via SNMP, hingga remote control modem ONT GenieACS TR-069 dalam satu sistem terpusat."
      />

      {/* 2. Key Metrics Strip */}
      <section className="relative -mt-6 mb-12 sm:mb-16" aria-label="Statistik Kunci Solusi Jaringan">
        <div className="site-container">
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4">
            {metricStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-blue-200 hover:shadow-md"
              >
                <div className="text-2xl font-extrabold text-primary sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{stat.label}</div>
                <div className="mt-1 text-xs text-slate-600">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Section 1: Architecture Blueprint */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-y border-slate-100" aria-labelledby="blueprint-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Arsitektur Jaringan"
            title="Arsitektur 4 Lapisan Tanpa Celah Topologi"
            description="Eksplorasi setiap lapisan arsitektur di bawah ini untuk melihat protokol, parameter teknis, dan keunggulan operasional yang diterapkan NADI."
          />
          <FtthArchitectureExplorer />
        </div>
      </section>

      {/* 4. Section 2: 4 Pillars Deep Dive */}
      <section className="section bg-white py-16 sm:py-24" aria-labelledby="pillars-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Pilar Infrastruktur"
            title="Fondasi Tangguh untuk Operasional ISP Bebas Masalah"
            description="Dirancang spesifik untuk memecahkan friksi harian teknisi dan network administrator di lapangan."
          />

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {/* Pillar 1: Dual-Mode MikroTik */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-primary mb-6">
                  <Icon name="router" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Dual-Mode MikroTik (Local API & RADIUS CoA)
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  NADI tidak memaksa satu arsitektur kaku. Anda bebas memilih:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Mode Local:</strong> Koneksi Winbox/REST API langsung. Cocok untuk RT/RW Net & Mini ISP tanpa konfigurasi server tambahan.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Mode RADIUS:</strong> FreeRADIUS RFC-2865 + CoA RFC-3576. Isolir instan jutaan sesi PPPoE tanpa delay antrian API.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Sync IP Pool:</strong> Manajemen alokasi IP statis dan dinamis terdistribusi antar multi-router.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-primary">
                Mendukung RouterOS v6 & v7 Native
              </div>
            </article>

            {/* Pillar 2: GIS Spasial & Logistik Gudang */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-secondary mb-6">
                  <Icon name="network" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Peta Spasial GIS & Manajemen Gudang FTTH
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Hilangkan buta peta jaringan. Petakan tiang, rute kabel distribusi, dan ODP langsung di atas peta berpresisi tinggi:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Status Port ODP Visual:</strong> Warna hijau (Available), biru (In-Use), merah (Damaged). Cegah teknisi salah colok.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Inventaris Logistik Gudang:</strong> Pelacakan rol kabel dropcore, adapter SC-UPC/APC, splitter box, dan modul SFP.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-secondary font-bold">✓</span>
                    <span><strong>Barcode Scanner:</strong> Input serial number ONT dan material saat instalasi via kamera ponsel teknisi.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-secondary">
                Dukungan Impor KML, KMZ, & GeoJSON
              </div>
            </article>

            {/* Pillar 3: Telemetri OLT & 3-Level Fault Engine */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-tertiary mb-6">
                  <Icon name="server" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Telemetri OLT & Fault Engine 3-Level
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Ketahui masalah kabel putus sebelum pelanggan sempat menelepon pusat bantuan:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>Level 1 (Dropcore):</strong> 1 Pelanggan LOS, ODP normal &rarr; teknisi langsung menuju rumah pelanggan.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>Level 2 (Kabel Distribusi):</strong> Seluruh port 1 ODP padam bersamaan &rarr; broadcast info gangguan area terkirim otomatis.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-tertiary font-bold">✓</span>
                    <span><strong>Level 3 (Kabel Feeder Hulu):</strong> Jalur ODP beruntun padam &rarr; peringatan darurat tim backbone OLT.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-tertiary">
                Auto-Ticketing dengan Koordinat Lokasi Presisi
              </div>
            </article>

            {/* Pillar 4: GenieACS TR-069 */}
            <article className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-primary mb-6">
                  <Icon name="sync" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  GenieACS TR-069 & Remote Management ONT
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Otomasi zero-touch provisioning dan remote diagnosis dari layar CS tanpa mengirim teknisi:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Zero-Touch Provisioning:</strong> Modem ONT baru langsung menerima profil VLAN & username PPPoE begitu terhubung.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Remote Reboot & WiFi Reset:</strong> Ubah SSID, password WiFi, atau reboot ONT pelanggan dalam 1 klik dari CS ticket.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary font-bold">✓</span>
                    <span><strong>Batch Firmware Upgrade:</strong> Dorong pembaruan firmware ke ribuan ONT secara terjadwal di jam dini hari.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-bold text-primary">
                Kompatibel TR-069, TR-098, & TR-181
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 5. Established Hero Network Section */}
      <NetworkIntelligenceSection />

      {/* 6. Section 3: Hardware Compatibility Matrix */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-y border-slate-100" aria-labelledby="compat-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Kompatibilitas Perangkat"
            title="Bebas Lock-in Vendor, Terbuka untuk Segala Perangkat"
            description="NADI Billing tidak mengunci Anda pada merek hardware tertentu. Manfaatkan perangkat yang sudah Anda miliki di lapangan."
          />

          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Tabel Kompatibilitas Perangkat">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-slate-200/80 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <tr>
                    <th scope="col" className="p-4 sm:p-5">Kategori</th>
                    <th scope="col" className="p-4 sm:p-5">Merek & Sistem</th>
                    <th scope="col" className="p-4 sm:p-5">Model Teruji</th>
                    <th scope="col" className="p-4 sm:p-5">Protokol Didukung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {compatibilityList.map((item) => (
                    <tr key={item.category} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">{item.category}</td>
                      <td className="p-4 sm:p-5 font-bold text-primary">{item.devices}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{item.models}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{item.protocols}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Section 4: Operational Efficiency Simulator */}
      <section className="section bg-white py-16 sm:py-24" aria-labelledby="efficiency-heading">
        <div className="site-container">
          <SectionHeading
            eyebrow="Kalkulator Efisiensi"
            title="Berapa Jam Kerja Teknisi yang Dapat Anda Hemat?"
            description="Hitung penghematan waktu MTTR dan pencegahan kunjungan lapangan salah sasaran dengan sistem deteksi otomatis NADI."
          />
          <FtthMttrCalculator />
        </div>
      </section>

      {/* 8. Technical FAQ Section */}
      <section className="section bg-slate-50/60 py-16 sm:py-24 border-t border-slate-100" aria-labelledby="faq-heading">
        <div className="site-container max-w-[900px]">
          <SectionHeading
            eyebrow="Tanya Jawab Teknis"
            title="Kerap ditanyakan seputar Jaringan & FTTH."
            description="Jawaban teknis seputar router MikroTik, OLT multi-brand, TR-069, dan pemetaan GIS."
          />

          <div className="space-y-3.5">
            {technicalFaqs.map((faq, index) => (
              <details
                key={faq.question}
                id={`faq-${index + 1}`}
                name="ftth-faq"
                className="group rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 open:border-blue-200 open:shadow-md open:shadow-blue-500/5"
              >
                <summary className="flex min-h-14 list-none items-center justify-between gap-4 rounded-2xl px-6 py-4.5 font-bold text-slate-900 transition-colors group-hover:text-primary cursor-pointer">
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 group-open:rotate-180 group-open:bg-blue-100 group-open:text-primary">
                    <Icon name="chevron" size={16} />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600 border-t border-slate-100/80 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA matching other pages */}
      <FinalCTA />
    </>
  );
}
