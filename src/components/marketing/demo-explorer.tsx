"use client";

import { useId, useState } from "react";
import { demoFlows } from "@/data/demo";
import { Icon } from "@/components/ui/icon";

export function DemoExplorer({ initialFlow = "voucher" }: { initialFlow?: string }) {
  const [flowId, setFlowId] = useState(initialFlow);
  const [step, setStep] = useState(0);
  const groupId = useId();
  const flow = demoFlows.find((item) => item.id === flowId) ?? demoFlows[0];
  const finished = step === flow.steps.length - 1;

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-10">
      {/* Flow Selector */}
      <fieldset className="mb-8">
        <legend className="mb-4 text-xs font-bold tracking-wider text-slate-600 uppercase">
          Pilih alur yang ingin Anda jelajahi
        </legend>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {demoFlows.map((item) => (
            <label className="cursor-pointer" key={item.id}>
              <input
                className="peer sr-only"
                type="radio"
                name={groupId}
                value={item.id}
                checked={flowId === item.id}
                onChange={() => {
                  setFlowId(item.id);
                  setStep(0);
                }}
              />
              <span className="flex h-full min-h-14 items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-xs font-bold text-slate-700 transition-all hover:border-slate-300 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-md peer-checked:shadow-primary/20 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-container">
                <Icon name={item.icon} size={20} />
                <span>{item.name}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Progress Milestone Pills */}
      <ol className="mb-6 flex flex-wrap gap-2" aria-label="Tahap simulasi">
        {flow.steps.map((item, index) => {
          const isCurrent = index === step;
          const isDone = index < step;
          return (
            <li
              key={item}
              aria-current={isCurrent ? "step" : undefined}
              className={`label rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                isCurrent
                  ? "bg-primary text-white shadow-xs"
                  : isDone
                  ? "bg-blue-100/70 text-primary"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              <span className="mr-1">{index + 1}.</span>
              {item}
              {isDone && <span className="ml-1 text-emerald-600" aria-label="selesai">✓</span>}
            </li>
          );
        })}
      </ol>

      {/* Step Details Active Card */}
      <div
        className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50/80 to-blue-50/20 p-6 sm:p-8"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="eyebrow mb-3 font-bold text-secondary">
          Simulasi · Langkah {step + 1} dari {flow.steps.length}
        </p>
        <h2 className="section-heading mb-3 text-slate-900 text-2xl sm:text-3xl">
          {flow.steps[step]}
        </h2>
        <p className="section-copy min-h-16 text-slate-600 text-sm sm:text-base leading-relaxed">
          {flow.descriptions[step]}
        </p>
        {finished && (
          <p className="mt-4 flex items-center gap-2 font-bold text-emerald-600 text-sm">
            <Icon name="checkCircle" size={18} />
            Alur selesai. Jelajahi alur lainnya.
          </p>
        )}
      </div>

      {/* Control Buttons */}
      <div className="mt-8 flex flex-wrap justify-between gap-4 border-t border-slate-100 pt-6">
        <button
          type="button"
          className="button button-secondary shadow-xs hover:shadow-sm"
          onClick={() => setStep(0)}
        >
          <Icon name="sync" size={16} />
          Ulangi simulasi
        </button>
        <button
          type="button"
          className="button button-primary shadow-lg shadow-primary/25 disabled:transform-none disabled:opacity-50"
          disabled={finished}
          onClick={() => setStep(Math.min(step + 1, flow.steps.length - 1))}
        >
          {finished ? "Simulasi selesai" : "Langkah berikutnya"}
          <Icon name="arrow" size={16} />
        </button>
      </div>
    </div>
  );
}

