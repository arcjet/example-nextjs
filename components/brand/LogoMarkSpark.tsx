"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const darkVisualData = {
  sparkD:
    "M82.0598 54.0454C93.8845 57.0669 103.658 59.489 124 64C103.658 68.511 93.8845 70.9331 82.0598 73.9546C78.081 74.9713 74.971 78.0809 73.9541 82.0597C70.9328 93.881 68.5107 103.659 64 124C59.4893 103.659 57.0672 93.881 54.0459 82.0597C53.029 78.0809 49.919 74.9713 45.9402 73.9546C34.1155 70.9331 24.3423 68.511 4 64C24.3423 59.489 34.1155 57.0669 45.9402 54.0454C49.919 53.0287 53.029 49.9191 54.0459 45.9403C57.0672 34.119 59.4893 24.3412 64 4C68.5107 24.3412 70.9328 34.119 73.9541 45.9403C74.971 49.9191 78.081 53.0287 82.0598 54.0454Z",
};

const lightVisualData = {
  sparkD:
    "M83.2638 53.3818C95.8768 56.6047 106.302 59.1883 128 64C106.302 68.8117 95.8768 71.3953 83.2638 74.6182C79.0197 75.7027 75.7024 79.0196 74.6177 83.2637C71.395 95.8731 68.8114 106.303 64 128C59.1886 106.303 56.605 95.8731 53.3823 83.2637C52.2976 79.0196 48.9803 75.7027 44.7362 74.6182C32.1232 71.3953 21.6984 68.8117 0 64C21.6984 59.1883 32.1232 56.6047 44.7362 53.3818C48.9803 52.2973 52.2976 48.9804 53.3823 44.7363C56.605 32.1269 59.1886 21.6973 64 0C68.8114 21.6973 71.395 32.1269 74.6177 44.7363C75.7024 48.9804 79.0197 52.2973 83.2638 53.3818Z",
};

interface Props {
  className?: string;
}

function LogoMarkSpark(props: Props) {
  const theme = useTheme();

  const [visualData, setVisualData] = useState<
    typeof darkVisualData | typeof lightVisualData
  >(darkVisualData);

  useEffect(() => {
    if (theme.resolvedTheme && theme.resolvedTheme == "light")
      setVisualData(lightVisualData);
    else setVisualData(darkVisualData);
  }, [theme.resolvedTheme, setVisualData]);

  let cls = "brand brand-logo-mark-spark";
  cls += " " + props.className;

  return (
    <svg viewBox="0 0 128 128" className={cls}>
      <path
        d={visualData.sparkD}
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
}

export default LogoMarkSpark;
