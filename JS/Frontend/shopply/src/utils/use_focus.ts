import { useEffect, useRef, useState } from "react";

export default function useFocus() : [React.RefObject<HTMLElement>, boolean] {
    const [value, setValue] = useState(false);
    const ref = useRef<HTMLElement>(null);
    const handleFocusIn = () => setValue(true);
    const handleMouseOut = () => setValue(false);
    useEffect(
      () => {
        const node = ref.current;
        if (node) {
          node.addEventListener("focusin", handleFocusIn);
          node.addEventListener("focusout", handleMouseOut);
          return () => {
            node.removeEventListener("focusin", handleFocusIn);
            node.removeEventListener("focusout", handleMouseOut);
          };
        }
      },
      [ref.current] // Recall only if ref changes
    );
    return [ref, value];
  }