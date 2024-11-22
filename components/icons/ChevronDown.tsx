import { forwardRef } from "react";

interface Props {
  classes?: string[];
}

const ChevronDown = forwardRef<SVGSVGElement, Props>((props: Props, ref) => {
  let cls = "icon icon-chevron-down";
  if (props.classes) cls += " " + props.classes.join(" ");

  return (
    <svg ref={ref} viewBox="0 0 128 128" className={cls} stroke="currentColor">
      <path
        d="M22 47L64 89L106 47"
        fill="none"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  );
});
ChevronDown.displayName = "ChevronDown";

export default ChevronDown;
