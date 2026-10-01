import { useEffect, useReducer } from "react";
import { initialState, press, type Key } from "../lib/calculator";

const ROWS: { key: Key; tone: "fn" | "num" | "op"; wide?: boolean }[][] = [
  [{ key: "AC", tone: "fn" }, { key: "±", tone: "fn" }, { key: "%", tone: "fn" }, { key: "÷", tone: "op" }],
  [{ key: "7", tone: "num" }, { key: "8", tone: "num" }, { key: "9", tone: "num" }, { key: "×", tone: "op" }],
  [{ key: "4", tone: "num" }, { key: "5", tone: "num" }, { key: "6", tone: "num" }, { key: "-", tone: "op" }],
  [{ key: "1", tone: "num" }, { key: "2", tone: "num" }, { key: "3", tone: "num" }, { key: "+", tone: "op" }],
  [{ key: "0", tone: "num", wide: true }, { key: ".", tone: "num" }, { key: "=", tone: "op" }],
];

const KEYBOARD: Record<string, Key> = {
  "+": "+", "-": "-", "*": "×", x: "×", "/": "÷", "=": "=", Enter: "=", ".": ".", "%": "%",
  Escape: "AC", Backspace: "C", Delete: "C",
};

export default function CalculatorPage() {
  const [state, dispatch] = useReducer(press, initialState);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = /^\d$/.test(event.key) ? (event.key as Key) : KEYBOARD[event.key];
      if (!key) return;
      event.preventDefault();
      dispatch(key);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const textSize = state.display.length > 7 ? "is-small" : "";

  return (
    <section className="wrap page-head">
      <p className="eyebrow">Lab</p>
      <h1>Calculator</h1>
      <p className="lede">An iPhone-style calculator, rebuilt from one of my first React components. Your keyboard works too.</p>
      <div className="calculator">
        <output className={`calculator__screen ${textSize}`} aria-live="polite">{state.display}</output>
        <div className="calculator__keys">
          {ROWS.flat().map(({ key, tone, wide }) => {
            const clearKey = key === "AC" && !state.fresh ? "C" : key;
            const active = tone === "op" && key !== "=" && state.operator === key && state.fresh;
            return (
              <button
                key={key}
                className={`calc-key calc-key--${tone}${wide ? " is-wide" : ""}${active ? " is-active" : ""}`}
                onClick={() => dispatch(clearKey)}
              >
                {clearKey}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
