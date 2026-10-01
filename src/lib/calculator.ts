// Calculator state machine. Pure, so it can be tested without a browser.

export type Operator = "+" | "-" | "×" | "÷";
export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type Key = Digit | "." | Operator | "=" | "AC" | "C" | "±" | "%";

export type CalcState = {
  display: string;
  stored: number | null;       // left-hand value waiting for an operator to apply
  operator: Operator | null;
  fresh: boolean;              // next digit starts a new number instead of appending
  repeat: { operator: Operator; operand: number } | null; // lets "=" repeat the last operation
};

export const initialState: CalcState = { display: "0", stored: null, operator: null, fresh: true, repeat: null };

const MAX_DIGITS = 9;

const isDigit = (key: Key): key is Digit => key.length === 1 && key >= "0" && key <= "9";

function apply(a: number, operator: Operator, b: number): number {
  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "×": return a * b;
    case "÷": return b === 0 ? NaN : a / b;
  }
}

// Fits a number into the display, falling back to exponent form for very large or small values.
export function format(value: number): string {
  if (!Number.isFinite(value)) return "Error";
  const rounded = Number.parseFloat(value.toPrecision(MAX_DIGITS));
  const text = String(rounded);
  if (text.replace(/[-.]/g, "").length <= MAX_DIGITS && !text.includes("e")) return text;
  return rounded.toExponential(4).replace(/\.?0+e/, "e");
}

export function press(state: CalcState, key: Key): CalcState {
  if (state.display === "Error" && key !== "AC" && key !== "C") return state;
  const current = Number(state.display);

  if (isDigit(key)) {
    if (state.fresh) return { ...state, display: key, fresh: false };
    if (state.display.replace(/[-.]/g, "").length >= MAX_DIGITS) return state;
    return { ...state, display: state.display === "0" ? key : state.display + key };
  }

  switch (key) {
    case ".":
      if (state.fresh) return { ...state, display: "0.", fresh: false };
      return state.display.includes(".") ? state : { ...state, display: state.display + "." };
    case "AC":
      return initialState;
    case "C":
      return { ...state, display: "0", fresh: true };
    case "±":
      if (state.display === "0") return state;
      return { ...state, display: state.display.startsWith("-") ? state.display.slice(1) : `-${state.display}` };
    case "%":
      return { ...state, display: format(current / 100), fresh: true };
    case "=": {
      if (state.operator && state.stored !== null) {
        const operand = state.fresh ? state.stored : current;
        const result = apply(state.stored, state.operator, operand);
        return { display: format(result), stored: null, operator: null, fresh: true, repeat: { operator: state.operator, operand } };
      }
      if (state.repeat) {
        return { ...state, display: format(apply(current, state.repeat.operator, state.repeat.operand)), fresh: true };
      }
      return { ...state, fresh: true };
    }
    default: {
      // An operator. Pressing one right after another just swaps it.
      if (state.operator && state.stored !== null && !state.fresh) {
        const result = format(apply(state.stored, state.operator, current));
        return { display: result, stored: Number(result), operator: key, fresh: true, repeat: null };
      }
      return { ...state, stored: state.fresh && state.stored !== null ? state.stored : current, operator: key, fresh: true, repeat: null };
    }
  }
}
