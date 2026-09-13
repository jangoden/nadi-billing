import type { ReactNode } from "react";

const shapes = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12 4 4L19 6" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  receipt: <><path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3ZM8 7h8M8 11h8M8 15h4" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
  network: <><rect x="8" y="2" width="8" height="6" rx="1" /><path d="M12 8v5M4 13h16M4 13v3M20 13v3" /><rect x="1" y="16" width="6" height="6" rx="1" /><rect x="17" y="16" width="6" height="6" rx="1" /></>,
  folder: <path d="M3 7V4h6l3 3h9v13H3V7ZM8 13h8M8 16h5" />,
  store: <><path d="M3 10h18l-2-7H5l-2 7ZM5 10v11h14V10M9 21v-7h6v7M8 3l-1 7M16 3l1 7" /></>,
  wallet: <><path d="M20 8V5H4a2 2 0 0 0 0 4h17v12H4a2 2 0 0 1-2-2V7" /><path d="M21 12h-6v5h6M18 14.5h.01" /></>,
  chart: <><path d="M3 3v18h18M6 15l4-5 4 3 6-8M16 5h4v4" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  chat: <><path d="M3 3h18v14H8l-5 4V3ZM7 7h10M7 11h7" /></>,
  shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" /><path d="m8 11 3 3 5-5" /></>,
  bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z" />,
  server: <><rect x="3" y="3" width="18" height="7" rx="1" /><rect x="3" y="14" width="18" height="7" rx="1" /><path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6" /></>,
  router: <><rect x="3" y="14" width="18" height="7" rx="2" /><path d="M7 17.5h.01M11 17.5h.01M17 14V8M8 6a6 6 0 0 1 8 0M5 3a10 10 0 0 1 14 0M11 9h2" /></>,
  hub: <><circle cx="12" cy="12" r="3" /><circle cx="12" cy="3" r="2" /><circle cx="3" cy="16" r="2" /><circle cx="21" cy="16" r="2" /><path d="M12 5v4M5 15l4-2M15 13l4 2M12 15v6" /></>,
  send: <path d="m22 2-7 20-4-9-9-4L22 2ZM11 13 22 2" />,
  warning: <><path d="M10.3 3.4a2 2 0 0 1 3.4 0l9 15.6a2 2 0 0 1-1.7 3H3a2 2 0 0 1-1.7-3l9-15.6Z" /><path d="M12 8v5M12 17h.01" /></>,
  users: <><circle cx="9" cy="7" r="4" /><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 4a4 4 0 0 1 0 8M22 21v-3a6 6 0 0 0-4-5" /></>,
  user: <><circle cx="12" cy="7" r="4" /><path d="M4 22v-3a8 8 0 0 1 16 0v3" /></>,
  sync: <><path d="M20 7A9 9 0 0 0 5 4L2 7M2 2v5h5M4 17a9 9 0 0 0 15 3l3-3M17 17h5v5" /></>,
  book: <><path d="M12 5C8 2 3 3 2 4v16c3-2 7-2 10 0 3-2 7-2 10 0V4c-1-1-6-2-10 1ZM12 5v15" /></>,
  support: <><path d="M3 14v-3a9 9 0 0 1 18 0v3M21 17v2c0 2-3 3-7 3" /><rect x="2" y="11" width="4" height="7" rx="2" /><rect x="18" y="11" width="4" height="7" rx="2" /></>,
  cloud: <><path d="M6 18a5 5 0 1 1 0-10 7 7 0 0 1 13-2 6 6 0 0 1-1 12M12 12v10M8 18l4 4 4-4" /></>,
  code: <path d="m8 5-6 7 6 7M16 5l6 7-6 7M14 3l-4 18" />,
  migrate: <><path d="M4 20V4h7M9 12h12M16 7l5 5-5 5" /></>,
  sliders: <><path d="M4 6h7M15 6h5M4 12h2M10 12h10M4 18h10M18 18h2M11 3v6M6 9v6M14 15v6" /></>,
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof shapes;

export function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={`shrink-0 ${className}`}>{shapes[name]}</svg>;
}
