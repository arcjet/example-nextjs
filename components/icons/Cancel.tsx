import { forwardRef } from "react";

interface Props {
  classes?: string[];
}

const Cancel = forwardRef<SVGSVGElement, Props>((props: Props, ref) => {
  let cls = "icon icon-cancel";
  if (props.classes) cls += " " + props.classes.join(" ");

  return (
    <svg ref={ref} viewBox="0 0 128 128" className={cls} stroke="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
        d="M64.6097 63.5059L30.611 29.5072L29.9039 30.2143L63.9026 64.213L30.1169 97.9987L30.824 98.7058L64.6097 64.9202L97.7861 98.0966L98.4932 97.3895L65.3168 64.213L98.7063 30.8236L97.9992 30.1165L64.6097 63.5059Z"
      />
    </svg>
  );
});
Cancel.displayName = "Cancel";

export default Cancel;
