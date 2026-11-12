// A chess diagram in the style of a printed book: hatched dark squares, outlined White pieces,
// solid Black pieces, coordinates in the margin. It reads only the piece-placement part of a FEN.
// A White piece is the outline glyph drawn over a paper-colored solid glyph, so it stays opaque.
const SOLID: Record<string, string> = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
const OUTLINE: Record<string, string> = { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" };
const FILES = [..."abcdefgh"];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

type Props = {
  fen: string;
  /** Squares to mark, such as the last move's from and to squares. */
  highlight?: string[];
  /** What the position shows, for screen readers. */
  label: string;
  caption: React.ReactNode;
};

export default function ChessDiagram({ fen, highlight = [], label, caption }: Props) {
  const squares = fen.split(" ")[0].split("/").flatMap((rank, row) => {
    const pieces = [...rank].flatMap((char) => (/\d/.test(char) ? Array<string>(Number(char)).fill("") : [char]));
    return pieces.map((piece, col) => ({ piece, name: `${FILES[col]}${8 - row}`, dark: (row + col) % 2 === 1 }));
  });

  return (
    <figure className="diagram">
      <div className="diagram__plate" role="img" aria-label={label}>
        <div className="diagram__ranks" aria-hidden="true">
          {RANKS.map((rank) => <span key={rank}>{rank}</span>)}
        </div>
        <div className="diagram__board">
          {squares.map(({ piece, name, dark }) => {
            const kind = piece.toLowerCase();
            const white = piece !== "" && piece === piece.toUpperCase();
            return (
              <span key={name} className={`diagram__sq${dark ? " is-dark" : ""}${highlight.includes(name) ? " is-hl" : ""}`}>
                {piece && (
                  <span className="diagram__pc">
                    {white && <span className="diagram__fill">{SOLID[kind]}</span>}
                    <span>{white ? OUTLINE[kind] : SOLID[kind]}</span>
                  </span>
                )}
              </span>
            );
          })}
        </div>
        <div className="diagram__files" aria-hidden="true">
          {FILES.map((file) => <span key={file}>{file}</span>)}
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

// A real position: Jev (White) has just played 16. Qd7#, from a recorded game in the jev-plays-chess repo.
export const JEV_MATE = {
  fen: "4k2r/2pQ1ppp/1pP5/4PB2/1B6/8/PPP2PPP/R3K2R",
  highlight: ["d1", "d7"],
  label: "Chess diagram. White queen on d7 gives checkmate to the Black king on e8, supported by the pawn on c6 and the bishops on f5 and b4.",
};
