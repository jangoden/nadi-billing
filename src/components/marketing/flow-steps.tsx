export function FlowSteps({ steps }: { steps: string[] }) {
  return <ol className="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-6" aria-label="Urutan proses">
    {steps.map((step, index) => <li key={step} className="text-center"><span className={`label mx-auto flex size-7 items-center justify-center rounded-full font-bold ${index === steps.length - 1 ? "bg-secondary text-white" : "bg-surface-container text-primary"}`}>{index + 1}</span><span className="label mt-1.5 block text-[10px] text-muted">{step}</span></li>)}
  </ol>;
}
