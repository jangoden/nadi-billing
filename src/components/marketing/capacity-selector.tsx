"use client";

import { useId, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { capacityOptions } from "@/data/demo";

export function CapacitySelector() {
  const [capacity, setCapacity] = useState<string>("500");
  const groupId = useId();

  return (
    <div className="mb-8 space-y-6">
      <fieldset>
        <legend className="mb-3 w-full text-center text-xs font-bold tracking-wider text-slate-600 uppercase">
          Pilih kapasitas pelanggan aktif
        </legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 rounded-2xl bg-slate-100/80 p-1.5 border border-slate-200/80">
          {capacityOptions.map((value) => (
            <label key={value} className="relative cursor-pointer">
              <input
                type="radio"
                name={groupId}
                value={value}
                checked={capacity === value}
                onChange={() => setCapacity(value)}
                className="peer sr-only"
              />
              <span className="label flex min-h-11 items-center justify-center rounded-xl font-bold text-xs text-slate-600 transition-all hover:text-slate-900 peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm peer-checked:border peer-checked:border-slate-200/80 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-container">
                {value}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 via-blue-50/20 to-slate-50 p-6 shadow-xs sm:flex-row sm:items-center sm:p-7">
        <div aria-live="polite" aria-atomic="true">
          <p className="label mb-1 text-[11px] font-bold tracking-wider text-slate-600 uppercase">
            Kapasitas Pilihan Anda
          </p>
          <p className="font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {capacity === "Custom" ? "Kapasitas Custom" : `${capacity} pelanggan`}
          </p>
          <p className="mt-1.5 text-xs font-medium text-secondary">
            Yang berubah hanya jumlah pelanggan aktif. Semua fitur tetap lengkap.
          </p>
        </div>

        <ButtonLink
          href={`/demo?kapasitas=${encodeURIComponent(capacity)}`}
          className="w-full shrink-0 shadow-md shadow-primary/20 sm:w-auto"
        >
          JELAJAHI DEMO
        </ButtonLink>
      </div>
    </div>
  );
}

