import { useEffect, useRef, useState } from "react";

type Template = { id: string; name: string; url: string; width: number; height: number };

const FALLBACK: Template = { id: "61579", name: "One Does Not Simply", url: "https://i.imgflip.com/1bij.jpg", width: 568, height: 335 };

// Draws classic white-on-black meme text, shrinking it until it fits in the top or bottom third.
function drawCaption(ctx: CanvasRenderingContext2D, text: string, width: number, height: number, top: boolean) {
  if (!text.trim()) return;
  const maxWidth = width * 0.92;
  let size = Math.round(width / 9);
  let lines: string[] = [];
  for (; size > 12; size -= 2) {
    ctx.font = `800 ${size}px Impact, "Anton", "Arial Black", sans-serif`;
    lines = [];
    let line = "";
    for (const word of text.toUpperCase().split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width > maxWidth && line) { lines.push(line); line = word; } else line = next;
    }
    lines.push(line);
    const fits = lines.length * size * 1.1 <= height * 0.32 && lines.every((l) => ctx.measureText(l).width <= maxWidth);
    if (fits) break;
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(2, size / 8);
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#fff";
  const lineHeight = size * 1.1;
  const startY = top ? height * 0.03 : height * 0.97 - lines.length * lineHeight;
  lines.forEach((line, i) => {
    ctx.strokeText(line, width / 2, startY + i * lineHeight);
    ctx.fillText(line, width / 2, startY + i * lineHeight);
  });
}

export default function MemePage() {
  const [templates, setTemplates] = useState<Template[]>([FALLBACK]);
  const [template, setTemplate] = useState<Template>(FALLBACK);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState("One does not simply");
  const [bottomText, setBottomText] = useState("Write CSS without Bootstrap");
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const list: Template[] = data.data.memes.filter((meme: Template & { box_count: number }) => meme.box_count <= 2);
        setTemplates(list.some((t) => t.id === FALLBACK.id) ? list : [FALLBACK, ...list]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => { if (!cancelled) setImage(img); };
    img.src = template.url;
    return () => { cancelled = true; };
  }, [template]);

  useEffect(() => {
    const el = canvas.current;
    if (!el || !image) return;
    const width = Math.min(image.naturalWidth, 1000);
    const height = Math.round(width * (image.naturalHeight / image.naturalWidth));
    el.width = width;
    el.height = height;
    const ctx = el.getContext("2d")!;
    ctx.drawImage(image, 0, 0, width, height);
    drawCaption(ctx, topText, width, height, true);
    drawCaption(ctx, bottomText, width, height, false);
  }, [image, topText, bottomText]);

  function randomTemplate() {
    const others = templates.filter((t) => t.id !== template.id);
    if (others.length) setTemplate(others[Math.floor(Math.random() * others.length)]);
  }

  function download() {
    canvas.current?.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${template.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
      link.click();
      URL.revokeObjectURL(link.href);
    }, "image/png");
  }

  return (
    <section className="wrap page-head">
      <p className="eyebrow">Lab</p>
      <h1>Meme Generator</h1>
      <p className="lede">Originally a React course project. Now it draws to a canvas, so you can download what you make.</p>
      <div className="meme">
        <div className="meme__controls">
          <label className="field">
            <span>Template</span>
            <select value={template.id} onChange={(e) => setTemplate(templates.find((t) => t.id === e.target.value) ?? FALLBACK)}>
              {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Top text</span>
            <input value={topText} onChange={(e) => setTopText(e.target.value)} />
          </label>
          <label className="field">
            <span>Bottom text</span>
            <input value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
          </label>
          <div className="meme__buttons">
            <button className="button button--ghost" onClick={randomTemplate}>Random template</button>
            <button className="button" onClick={download} disabled={!image}>Download PNG</button>
          </div>
        </div>
        <canvas ref={canvas} className="meme__canvas" role="img" aria-label={`${template.name} meme: ${topText} / ${bottomText}`} />
      </div>
    </section>
  );
}
