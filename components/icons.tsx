import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.25 8.25l6.75 7.5 6.75-7.5" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 5.25l7.5 6.75-7.5 6.75" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15M13.5 5.25L19.5 12l-6 6.75" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.94-.26-.1-.46-.15-.65.15-.19.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.9-2.15-.24-.57-.48-.5-.65-.5-.17 0-.36-.02-.55-.02-.19 0-.51.07-.77.36-.26.29-1.01.99-1.01 2.41 0 1.42 1.04 2.79 1.18 2.98.15.19 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34z" />
      <path d="M12.02 2.5a9.5 9.5 0 0 0-8.2 14.28L2.5 21.5l4.86-1.27a9.5 9.5 0 1 0 4.66-17.73zm0 17.24a7.7 7.7 0 0 1-3.93-1.08l-.28-.17-2.88.76.77-2.81-.18-.29a7.74 7.74 0 1 1 6.5 3.59z" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 9v4.5m0 3h.008M10.61 3.66 2.4 18a1.8 1.8 0 0 0 1.54 2.7h16.12A1.8 1.8 0 0 0 21.6 18L13.39 3.66a1.6 1.6 0 0 0-2.78 0Z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="2" />
      <path d="M8.25 10.5v6M8.25 8.25v.008M12 16.5v-3.75c0-1.24 1-2.25 2.25-2.25s2.25 1.01 2.25 2.25v3.75M12 12.75v3.75" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.25 21v-7.5h2.25l.5-3h-2.75V8.5c0-.83.25-1.5 1.5-1.5h1.4V4.35A18 18 0 0 0 14.9 4.2c-2.3 0-3.9 1.4-3.9 4v2.3H8.75v3H11V21" />
    </svg>
  );
}
