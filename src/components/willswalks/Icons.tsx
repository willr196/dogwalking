import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number; color?: string };

const Icon = ({ d, size = 20, color = "currentColor", ...props }: IconProps & { d: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d={d} />
  </svg>
);

export const Icons = {
  Calendar: (p: IconProps) => (
    <Icon
      d="M3 6h18M3 6v14a2 2 0 002 2h14a2 2 0 002-2V6M3 6l0-2a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2M8 2v4M16 2v4M12 12h.01M8 12h.01M16 12h.01M12 16h.01M8 16h.01M16 16h.01"
      {...p}
    />
  ),
  Check: (p: IconProps) => <Icon d="M20 6L9 17l-5-5" {...p} />,
  Star: ({ size = 20, filled }: { size?: number; filled?: boolean }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "#E8956A" : "none"}
      stroke="#E8956A"
      strokeWidth="2"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  ArrowLeft: (p: IconProps) => <Icon d="M19 12H5M12 19l-7-7 7-7" {...p} />,
  Send: (p: IconProps) => <Icon d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" {...p} />,
  Dog: (p: IconProps) => (
    <Icon
      d="M10 5.172C10 3.782 8.884 2.5 7.5 2.5 6.116 2.5 5 3.782 5 5.172 5 6.562 6.116 8 7.5 8 8.884 8 10 6.562 10 5.172zM14 5.172C14 3.782 15.116 2.5 16.5 2.5 17.884 2.5 19 3.782 19 5.172 19 6.562 17.884 8 16.5 8 15.116 8 14 6.562 14 5.172zM12 22c-4 0-8-3-8-8 0-3 2-5 4-6h8c2 1 4 3 4 6 0 5-4 8-8 8z"
      {...p}
    />
  ),
  MapPin: (p: IconProps) => (
    <Icon
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z"
      {...p}
    />
  ),
  Clock: (p: IconProps) => (
    <Icon d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" {...p} />
  ),
  Shield: (p: IconProps) => (
    <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" {...p} />
  ),
  Camera: (p: IconProps) => (
    <Icon d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z" {...p} />
  ),
  Heart: ({ size = 20, filled }: { size?: number; filled?: boolean }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "#E8956A" : "none"}
      stroke="#E8956A"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  Menu: (p: IconProps) => <Icon d="M3 12h18M3 6h18M3 18h18" {...p} />,
  X: (p: IconProps) => <Icon d="M18 6L6 18M6 6l12 12" {...p} />,
  User: (p: IconProps) => (
    <Icon d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" {...p} />
  ),
  Settings: (p: IconProps) => (
    <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" {...p} />
  ),
  Trash: (p: IconProps) => (
    <Icon d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" {...p} />
  ),
  Phone: (p: IconProps) => (
    <Icon d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" {...p} />
  ),
  Mail: (p: IconProps) => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" {...p} />,
};
