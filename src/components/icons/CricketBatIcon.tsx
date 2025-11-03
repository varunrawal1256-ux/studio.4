import type { SVGProps } from "react";

const CricketBatIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="m10.5 19.5-6-6" />
    <path d="m15.5 14.5 2-2L14 9l-2 2-10-10 6-6 6 6" />
    <path d="m14 15 5-5" />
  </svg>
);

export default CricketBatIcon;
