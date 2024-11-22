/**
 * Convenience hook to create media queries.
 *
 * @example
 * ```
 * // returns true/false depending on window width
 * let isLargerThanMaxWidth = useMediaQuery({w: maxWidth, op: "min"});
 * ```
 *
 * @returns the 'result' property of the query.
 */
import { useLayoutEffect, useState } from "react";

interface Query {
  op: "min" | "max";
  w: number;
  undefAtInit?: boolean;
}

/**
 * Use Media Query
 * Custom width media query hook.
 *
 * @param op the desired operation
 * @param w the reference width
 * @param undefAtInit returns undefined at default init.
 */
export default function useMediaQuery(query: Query) {
  const [result, setResult] = useState<undefined | boolean>(
    query.undefAtInit ? undefined : false,
  );

  useLayoutEffect(() => {
    const test = () => {
      let state: boolean = false;

      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      );

      if (query.op == "min") state = vw >= query.w;
      if (query.op == "max") state = vw <= query.w;

      setResult(state);
    };
    window.addEventListener("resize", test);
    test();
    return () => window.removeEventListener("resize", test);
  }, [result, query]);

  return result;
}
