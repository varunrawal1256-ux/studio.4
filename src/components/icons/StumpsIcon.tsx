import type { SVGProps } from "react";

const StumpsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 22V6" />
    <path d="M12 22V6" />
    <path d="M16 22V6" />
    <path d="M7 6h2" />
    <path d="M11 6h2" />
    <path d="M15 6h2" />
  </svg>
);

export default StumpsIcon;
