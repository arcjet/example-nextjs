import { forwardRef } from "react";

interface Props {
  classes?: string[];
}

const Menu = forwardRef<SVGSVGElement, Props>((props: Props, ref) => {
  let cls = "icon icon-menu";
  if (props.classes) cls += " " + props.classes.join(" ");

  return (
    <svg ref={ref} viewBox="0 0 128 128" className={cls} stroke="currentColor">
      <path
        d="M12 66H116"
        strokeLinecap="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M26 104H102"
        strokeLinecap="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M26 28H102"
        strokeLinecap="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
});
Menu.displayName = "Menu";

export default Menu;
