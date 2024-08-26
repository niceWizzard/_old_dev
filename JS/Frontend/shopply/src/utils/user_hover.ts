import { useEffect, useRef, useState } from "react";

export default function useHover() : [React.RefObject<HTMLElement>, boolean] {
    const [value, setValue] = useState(false);
    const ref = useRef<HTMLElement>(null);
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
    useEffect(
      () => {
        const node = ref.current;
        if (node) {
          node.addEventListener("mouseover", handleMouseOver);
          node.addEventListener("mouseout", handleMouseOut);
          return () => {
            node.removeEventListener("mouseover", handleMouseOver);
            node.removeEventListener("mouseout", handleMouseOut);
          };
        }
      },
      [ref] // Recall only if ref changes
    );
    return [ref, value];
  }