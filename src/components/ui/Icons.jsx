const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
};

export const IconMail = (props) => (
  <svg {...base} width="16" height="16" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 7l10 6 10-6" />
  </svg>
);

export const IconLock = (props) => (
  <svg {...base} width="16" height="16" {...props}>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 118 0v3" />
  </svg>
);

export const IconEye = (props) => (
  <svg {...base} width="17" height="17" {...props}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconEyeOff = (props) => (
  <svg {...base} width="17" height="17" {...props}>
    <path d="M3 3l18 18M10.6 10.7a3 3 0 004.2 4.2" />
    <path d="M6.7 6.8C4.1 8.4 2 12 2 12s3.6 7 10 7c2 0 3.7-.7 5.1-1.6M21.5 13.4C22 12.7 22 12 22 12s-3.6-7-10-7c-.7 0-1.4.1-2 .2" />
  </svg>
);

export const IconChevron = (props) => (
  <svg {...base} strokeWidth="1.8" width="16" height="16" {...props}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const IconShield = (props) => (
  <svg {...base} strokeWidth="1.5" width="18" height="18" {...props}>
    <path d="M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-4z" />
  </svg>
);
