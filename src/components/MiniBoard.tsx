// A small, decorative chessboard drawn from the piece-placement part of a FEN.
// Both sides use the solid glyphs; CSS colors them, which reads better than the outline set.
const GLYPHS: Record<string, string> = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };

export default function MiniBoard({ fen, highlight = [] }: { fen: string; highlight?: string[] }) {
  const squares = fen.split("/").flatMap((rank, row) => {
    const cells: { piece: string; name: string }[] = [];
    for (const char of rank) {
      if (/\d/.test(char)) for (let i = 0; i < Number(char); i++) cells.push({ piece: "", name: "" });
      else cells.push({ piece: char, name: "" });
    }
    return cells.map((cell, col) => ({ ...cell, name: `${"abcdefgh"[col]}${8 - row}`, dark: (row + col) % 2 === 1 }));
  });

  return (
    <div className="mini-board" aria-hidden="true">
      {squares.map((square) => (
        <span
          key={square.name}
          className={`mini-board__sq${square.dark ? " is-dark" : ""}${highlight.includes(square.name) ? " is-hl" : ""}`}
          data-color={square.piece ? (square.piece === square.piece.toUpperCase() ? "w" : "b") : undefined}
        >
          {GLYPHS[square.piece.toLowerCase()] ?? ""}
        </span>
      ))}
    </div>
  );
}
