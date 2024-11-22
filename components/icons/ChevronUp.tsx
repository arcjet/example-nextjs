import { forwardRef } from "react";

interface Props {
  classes?: string[];
}

const ChevronUp = forwardRef<SVGSVGElement, Props>((props: Props, ref) => {
  let cls = "icon icon-chevron-up";
  if (props.classes) cls += " " + props.classes.join(" ");

  return (
    <svg ref={ref} viewBox="0 0 128 128" className={cls} stroke="currentColor">
      <path
        d="M106 81L64 39L22 81"
        fill="none"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  );
});
ChevronUp.displayName = "ChevronUp";

export default ChevronUp;
