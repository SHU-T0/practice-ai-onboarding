const pptxgen = require("pptxgenjs");

// ============================================
// Design Constants
// ============================================
const C = {
  DARK_BG: "0F172A",
  DARK_NAVY: "1E293B",
  BLUE: "3B82F6",
  BLUE_DARK: "2563EB",
  BLUE_LIGHT: "DBEAFE",
  BLUE_LIGHTER: "EFF6FF",
  WHITE: "FFFFFF",
  GRAY_50: "F8FAFC",
  GRAY_100: "F1F5F9",
  GRAY_200: "E2E8F0",
  GRAY_400: "94A3B8",
  GRAY_500: "64748B",
  GRAY_600: "475569",
  GRAY_700: "334155",
  GREEN: "10B981",
  ORANGE: "F59E0B",
  RED: "EF4444",
  AMBER_BG: "FEF3C7",
};

const FONT = "Yu Gothic";
const W = 10;
const H = 5.625;
const M = 0.6; // margin
const CW = W - M * 2; // content width

// Factory for shadows (never reuse objects - pptxgenjs mutates them)
const cardShadow = () => ({
  type: "outer", color: "000000", blur: 6, offset: 1, angle: 135, opacity: 0.08,
});

// ============================================
// Helpers
// ============================================
function topBar(slide) {
  slide.addShape("rect", { x: 0, y: 0, w: W, h: 0.06, fill: { color: C.BLUE } });
}

function title(slide, text, opts = {}) {
  slide.addText(text, {
    x: M, y: opts.y || 0.35, w: CW, h: 0.55,
    fontSize: 28, fontFace: FONT, color: opts.dark ? C.WHITE : C.DARK_NAVY,
    bold: true, margin: 0,
  });
}

function pageNum(slide, n) {
  slide.addText(String(n), {
    x: W - 0.8, y: H - 0.4, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: FONT, color: C.GRAY_400, align: "right", margin: 0,
  });
}

function card(slide, x, y, w, h, accent, side = "left") {
  slide.addShape("rect", {
    x, y, w, h, fill: { color: C.WHITE },
    shadow: cardShadow(), line: { color: C.GRAY_200, width: 0.5 },
  });
  if (accent) {
    if (side === "left") slide.addShape("rect", { x, y, w: 0.06, h, fill: { color: accent } });
    if (side === "top") slide.addShape("rect", { x, y, w, h: 0.06, fill: { color: accent } });
  }
}

function numCircle(slide, x, y, n, color = C.BLUE) {
  slide.addShape("ellipse", { x, y, w: 0.45, h: 0.45, fill: { color } });
  slide.addText(String(n), {
    x, y, w: 0.45, h: 0.45, fontSize: 16, fontFace: FONT,
    color: C.WHITE, bold: true, align: "center", valign: "middle", margin: 0,
  });
}

// ============================================
// Slides
// ============================================
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "AI Onboarding Program";
  pres.title = "AI\u99c6\u52d5\u578b\u30e2\u30d0\u30a4\u30eb\u958b\u767a\u7814\u4fee";

  // --- Slide 1: Cover ---
  {
    const s = pres.addSlide();
    s.background = { color: C.DARK_BG };
    s.addShape("rect", { x: 0, y: 0, w: 0.12, h: H, fill: { color: C.BLUE } });
    s.addShape("ellipse", { x: 7.5, y: -1, w: 4, h: 4, fill: { color: C.BLUE, transparency: 90 } });
    s.addShape("ellipse", { x: 8.5, y: 3, w: 3, h: 3, fill: { color: C.BLUE, transparency: 93 } });

    s.addText("AI\u99c6\u52d5\u578b\n\u30e2\u30d0\u30a4\u30eb\u958b\u767a\u7814\u4fee", {
      x: 0.8, y: 0.9, w: 7, h: 2.0, fontSize: 42, fontFace: FONT,
      color: C.WHITE, bold: true, lineSpacingMultiple: 1.2, margin: 0,
    });
    s.addText("3\u9031\u9593\u3067\u30bc\u30ed\u304b\u3089\u30a2\u30d7\u30ea\u958b\u767a\u8005\u3078", {
      x: 0.8, y: 2.9, w: 7, h: 0.6, fontSize: 20, fontFace: FONT, color: C.BLUE, margin: 0,
    });
    s.addShape("rect", { x: 0.8, y: 3.8, w: 3, h: 0.003, fill: { color: C.GRAY_500 } });
    s.addText("\u5bfe\u8c61: \u55b6\u696d\u30fb\u30d3\u30b8\u30cd\u30b9\u8077\uff085\u540d\uff09  |  \u671f\u9593: 3\u9031\u9593  |  \u5f62\u5f0f: \u5bfe\u9762\u96c6\u4e2d", {
      x: 0.8, y: 4.0, w: 7, h: 0.4, fontSize: 12, fontFace: FONT, color: C.GRAY_400, margin: 0,
    });
  }

  // --- Slide 2: Promise ---
  {
    const s = pres.addSlide();
    s.background = { color: C.WHITE };
    topBar(s); title(s, "\u3053\u306e\u7814\u4fee\u306e\u7d04\u675f"); pageNum(s, 2);

    const items = [
      { t: "\u30b3\u30fc\u30c9\u306f\u66f8\u304b\u306a\u3044", d: "AI\u304c\u30b3\u30fc\u30c9\u3092\u66f8\u304d\u307e\u3059\u3002\n\u7686\u3055\u3093\u306f\u300c\u4f55\u3092\u4f5c\u308a\u305f\u3044\u304b\u300d\n\u3092\u8003\u3048\u308b\u3060\u3051", c: C.BLUE },
      { t: "3\u9031\u9593\u3067\u914d\u5e03\u307e\u3067", d: "\u5b9f\u969b\u306bApp Store\u306b\u4e26\u3076\n\u30a2\u30d7\u30ea\u3092\u81ea\u5206\u306e\u624b\u3067\n\u4f5c\u308a\u4e0a\u3052\u307e\u3059", c: C.GREEN },
      { t: "\u30a8\u30e9\u30fc\uff1d\u5b66\u3073", d: "\u30a8\u30e9\u30fc\u306f\u5931\u6557\u3067\u306f\u306a\u304f\n\u300cAI\u3068\u306e\u4f1a\u8a71\u306e\u304d\u3063\u304b\u3051\u300d\n\u3067\u3059", c: C.ORANGE },
      { t: "\u5168\u54e1\u5b8c\u8d70", d: "\u30da\u30a2\u30ef\u30fc\u30af\uff0b\u8b1b\u5e2b\n\u30b5\u30dd\u30fc\u30c8\u3067\n\u8ab0\u3082\u7f6e\u3044\u3066\u3044\u304d\u307e\u305b\u3093", c: C.BLUE_DARK },
    ];

    const cw = 2.0, gap = 0.2;
    const sx = (W - (cw * 4 + gap * 3)) / 2;
    items.forEach((p, i) => {
      const x = sx + i * (cw + gap), y = 1.35, h = 3.3;
      card(s, x, y, cw, h, p.c, "top");
      numCircle(s, x + (cw - 0.45) / 2, y + 0.25, i + 1, p.c);
      s.addText(p.t, {
        x: x + 0.15, y: y + 0.85, w: cw - 0.3, h: 0.5,
        fontSize: 15, fontFace: FONT, color: C.DARK_NAVY, bold: true, align: "center", margin: 0,
      });
      s.addText(p.d, {
        x: x + 0.15, y: y + 1.45, w: cw - 0.3, h: 1.5,
        fontSize: 11, fontFace: FONT, color: C.GRAY_600, align: "center", valign: "top", margin: 0,
      });
    });
  }

  // --- Slide 3: Goals ---
  {
    const s = pres.addSlide();
    s.background = { color: C.GRAY_50 };
    topBar(s); title(s, "\u7814\u4fee\u306e\u30b4\u30fc\u30eb"); pageNum(s, 3);

    const goals = [
      { t: "\u52d5\u304f\u30a2\u30d7\u30ea", items: ["\u5b9f\u969b\u306e\u30d3\u30b8\u30cd\u30b9\u8ab2\u984c\u3092\u89e3\u6c7a", "TestFlight\u3067\u5b9f\u6a5f\u914d\u5e03", "5\u540d\u4ee5\u4e0a\u306e\u30e6\u30fc\u30b6\u30fc\u30c6\u30b9\u30c8"], c: C.BLUE },
      { t: "\u6280\u8853\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa", items: ["GitHub\u30ea\u30dd\u30b8\u30c8\u30ea", "\u8981\u4ef6\u5b9a\u7fa9\u301c\u6700\u7d42\u5831\u544a", "\u958b\u767a\u30d7\u30ed\u30bb\u30b9\u306e\u8a18\u9332"], c: C.GREEN },
      { t: "\u81ea\u8d70\u529b", items: ["AI\u30c4\u30fc\u30eb\u3092\u4f7f\u3044\u3053\u306a\u3059", "\u81ea\u5f8b\u7684\u306a\u554f\u984c\u89e3\u6c7a\u80fd\u529b", "\u6b21\u306e\u30a2\u30d7\u30ea\u3092\u4e00\u4eba\u3067\u4f5c\u308c\u308b"], c: C.ORANGE },
    ];

    const cw = 2.7, gap = 0.25;
    const sx = (W - (cw * 3 + gap * 2)) / 2;
    goals.forEach((g, i) => {
      const x = sx + i * (cw + gap), y = 1.2;
      card(s, x, y, cw, 3.6, g.c, "top");
      s.addShape("rect", { x, y: y + 0.06, w: cw, h: 0.85, fill: { color: g.c, transparency: 90 } });
      s.addText(g.t, {
        x: x + 0.1, y: y + 0.15, w: cw - 0.2, h: 0.6,
        fontSize: 18, fontFace: FONT, color: g.c, bold: true, align: "center", margin: 0,
      });
      const bullets = g.items.map((item, idx) => ({
        text: item,
        options: { bullet: true, breakLine: idx < g.items.length - 1, fontSize: 11, fontFace: FONT, color: C.GRAY_700, paraSpaceAfter: 8 },
      }));
      s.addText(bullets, { x: x + 0.15, y: y + 1.15, w: cw - 0.3, h: 2.0, valign: "top", margin: 0 });
    });
  }

  // --- Slide 4: Timeline ---
  {
    const s = pres.addSlide();
    s.background = { color: C.WHITE };
    topBar(s); title(s, "3\u9031\u9593\u306e\u30bf\u30a4\u30e0\u30e9\u30a4\u30f3"); pageNum(s, 4);

    const phases = [
      { lbl: "Week 0", t: "\u4e8b\u524d\u6e96\u5099", d: "\u74b0\u5883\u69cb\u7bc9\n\u30a2\u30ab\u30a6\u30f3\u30c8\u8a2d\u5b9a\nMac\u691c\u8a3c", c: C.GRAY_600 },
      { lbl: "Week 1", t: "\u57fa\u790e\u7fd2\u5f97", d: "AI\u57fa\u790e\u30fbUI\u30fbDB\n\u8a8d\u8a3c\u30fbGit\nTestFlight", c: C.BLUE },
      { lbl: "Week 2", t: "\u500b\u4eba\u958b\u767a", d: "\u8981\u4ef6\u5b9a\u7fa9\n\u30d7\u30ed\u30c8\u30bf\u30a4\u30d7\n\u5b9f\u88c5", c: C.GREEN },
      { lbl: "Week 3", t: "\u4ed5\u4e0a\u3052\u30fb\u767a\u8868", d: "\u30d5\u30a3\u30fc\u30c9\u30d0\u30c3\u30af\n\u6539\u5584\u30fb\u914d\u5e03\n\u6700\u7d42\u30d7\u30ec\u30bc\u30f3", c: C.ORANGE },
    ];

    const lineY = 2.55;
    s.addShape("rect", { x: 1.0, y: lineY, w: 8.0, h: 0.04, fill: { color: C.GRAY_200 } });

    const pw = 1.8, pgap = 0.55;
    const totalPW = pw * 4 + pgap * 3;
    const psx = (W - totalPW) / 2;

    phases.forEach((p, i) => {
      const cx = psx + i * (pw + pgap) + pw / 2;
      const x = psx + i * (pw + pgap);
      s.addShape("ellipse", { x: cx - 0.22, y: lineY - 0.2, w: 0.44, h: 0.44, fill: { color: p.c } });
      if (i < 3) {
        s.addText("\u2192", {
          x: x + pw, y: lineY - 0.15, w: pgap, h: 0.35,
          fontSize: 18, color: C.GRAY_400, align: "center", valign: "middle", margin: 0,
        });
      }
      s.addText(p.lbl, {
        x, y: 1.45, w: pw, h: 0.35, fontSize: 12, fontFace: FONT, color: p.c, bold: true, align: "center", margin: 0,
      });
      s.addText(p.t, {
        x, y: 1.8, w: pw, h: 0.4, fontSize: 16, fontFace: FONT, color: C.DARK_NAVY, bold: true, align: "center", margin: 0,
      });
      s.addText(p.d, {
        x, y: 3.15, w: pw, h: 1.5, fontSize: 11, fontFace: FONT, color: C.GRAY_600, align: "center", valign: "top", margin: 0,
      });
    });
  }

  // --- Slide 5: Week 1 Detail ---
  {
    const s = pres.addSlide();
    s.background = { color: C.WHITE };
    topBar(s); title(s, "Week 1: \u57fa\u790e\u7fd2\u5f97\uff08Day 1-5\uff09"); pageNum(s, 5);

    const hdrOpt = (text) => ({ text, options: { fill: { color: C.BLUE }, color: C.WHITE, bold: true, fontSize: 11, fontFace: FONT, align: text === "Day" ? "center" : "left" } });
    const cellOpt = (text, alt, opts = {}) => ({ text, options: { fontSize: 11, fontFace: FONT, color: opts.bold ? C.BLUE : C.DARK_NAVY, bold: !!opts.bold, fill: alt ? { color: C.GRAY_50 } : undefined, align: opts.center ? "center" : "left" } });

    const rows = [
      [hdrOpt("Day"), hdrOpt("\u30c6\u30fc\u30de"), hdrOpt("\u4f5c\u308b\u3082\u306e")],
      [cellOpt("1", false, { bold: true, center: true }), cellOpt("AI\u57fa\u790e + \u30c4\u30fc\u30eb\u4f53\u9a13", false), cellOpt("Hello World\u30a2\u30d7\u30ea + \u30dc\u30bf\u30f3\u30a2\u30d7\u30ea", false)],
      [cellOpt("2", true, { bold: true, center: true }), cellOpt("Cursor + Expo\u5165\u9580\uff08UI\u30fbstate\uff09", true), cellOpt("\u30ab\u30a6\u30f3\u30bf\u30fc\u30a2\u30d7\u30ea + ToDo\u30a2\u30d7\u30ea", true)],
      [cellOpt("3", false, { bold: true, center: true }), cellOpt("Supabase\uff08DB\u8aad\u307f\u66f8\u304d\uff09+ \u30c7\u30d0\u30c3\u30b0", false), cellOpt("CRUD\u64cd\u4f5c\u30a2\u30d7\u30ea", false)],
      [cellOpt("4", true, { bold: true, center: true }), cellOpt("Supabase Auth\uff08\u8a8d\u8a3c\uff09+ Router\u79fb\u884c", true), cellOpt("\u30ed\u30b0\u30a4\u30f3\u4ed8\u304d\u30e1\u30e2\u30a2\u30d7\u30ea", true)],
      [cellOpt("5", false, { bold: true, center: true }), cellOpt("Git + \u30bb\u30ad\u30e5\u30ea\u30c6\u30a3 + TestFlight", false), cellOpt("GitHub\u306bpush + TestFlight\u914d\u5e03", false)],
    ];

    s.addTable(rows, {
      x: M, y: 1.15, w: CW, colW: [0.6, 4.0, 4.2],
      border: { pt: 0.5, color: C.GRAY_200 }, rowH: [0.5, 0.6, 0.6, 0.6, 0.6, 0.6],
      margin: [4, 8, 4, 8],
    });

    s.addText("\u203b \u6bce\u65e5\u300c\u5ea7\u5b6615\u5206 \u2192 \u5373\u5b9f\u8df5\u300d\u306e\u30b5\u30a4\u30af\u30eb\u3067\u9032\u884c\u3002\u30a8\u30e9\u30fc\u304c\u51fa\u305f\u3089 AI \u2192 \u30da\u30a2 \u2192 \u8b1b\u5e2b \u306e\u9806\u3067\u89e3\u6c7a\u3002", {
      x: M, y: 4.4, w: CW, h: 0.35, fontSize: 10, fontFace: FONT, color: C.GRAY_500, margin: 0,
    });
  }

  // --- Slide 6: Personal Projects ---
  {
    const s = pres.addSlide();
    s.background = { color: C.WHITE };
    topBar(s); title(s, "\u500b\u4eba\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\uff08Week 2-3\uff09"); pageNum(s, 6);

    const steps = ["\u30a2\u30a4\u30c7\u30a2", "\u8981\u4ef6\u5b9a\u7fa9", "\u958b\u767a", "\u914d\u5e03", "\u767a\u8868"];
    const sw = 1.4, sgap = 0.2;
    const ssx = (W - (sw * 5 + sgap * 4)) / 2;
    steps.forEach((st, i) => {
      const x = ssx + i * (sw + sgap);
      s.addShape("rect", { x, y: 1.25, w: sw, h: 0.6, fill: { color: i === 2 ? C.BLUE : C.BLUE_LIGHT } });
      s.addText(st, {
        x, y: 1.25, w: sw, h: 0.6, fontSize: 13, fontFace: FONT,
        color: i === 2 ? C.WHITE : C.BLUE, bold: true, align: "center", valign: "middle", margin: 0,
      });
      if (i < 4) s.addText("\u2192", {
        x: x + sw, y: 1.25, w: sgap, h: 0.6,
        fontSize: 16, color: C.GRAY_400, align: "center", valign: "middle", margin: 0,
      });
    });

    s.addText("\u63a8\u5968\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u30c6\u30fc\u30de", {
      x: M, y: 2.2, w: CW, h: 0.4, fontSize: 16, fontFace: FONT, color: C.DARK_NAVY, bold: true, margin: 0,
    });

    const themes = [
      "\u55b6\u696d\u65e5\u5831\u30fb\u9867\u5ba2\u7ba1\u7406\u30a2\u30d7\u30ea", "\u793e\u5185\u5099\u54c1\u30fb\u5728\u5eab\u7ba1\u7406\u30a2\u30d7\u30ea",
      "\u30c1\u30fc\u30e0\u30bf\u30b9\u30af\u7ba1\u7406\u30a2\u30d7\u30ea", "\u30a4\u30d9\u30f3\u30c8\u51fa\u6b20\u7ba1\u7406\u30a2\u30d7\u30ea",
      "\u793e\u5185FAQ\u30fb\u30ca\u30ec\u30c3\u30b8\u30d9\u30fc\u30b9", "\u7d4c\u8cbb\u7533\u8acb\u30fb\u627f\u8a8d\u30d5\u30ed\u30fc\u30a2\u30d7\u30ea",
    ];
    const colW = CW / 2 - 0.1;
    themes.forEach((t, i) => {
      const col = i < 3 ? 0 : 1, row = i % 3;
      const x = M + col * (colW + 0.2), y = 2.75 + row * 0.65;
      card(s, x, y, colW, 0.55, C.BLUE);
      s.addText(t, {
        x: x + 0.2, y, w: colW - 0.35, h: 0.55,
        fontSize: 12, fontFace: FONT, color: C.DARK_NAVY, valign: "middle", margin: 0,
      });
    });

    s.addText("\u30b9\u30b3\u30fc\u30d7\u5236\u9650: \u753b\u97623\u3064\u4ee5\u5185 \u30fb \u30c6\u30fc\u30d6\u30eb2\u3064\u4ee5\u5185 \u30fb MVP\u6700\u512a\u5148", {
      x: M, y: 4.85, w: CW, h: 0.35, fontSize: 11, fontFace: FONT, color: C.ORANGE, bold: true, margin: 0,
    });
  }

  // --- Slide 7: Tools ---
  {
    const s = pres.addSlide();
    s.background = { color: C.GRAY_50 };
    topBar(s); title(s, "\u4f7f\u7528\u30c4\u30fc\u30eb"); pageNum(s, 7);

    const tools = [
      { n: "Cursor Pro", d: "AI\u652f\u63f4\u30b3\u30fc\u30c7\u30a3\u30f3\u30b0", cost: "~3,000\u5186/\u6708" },
      { n: "Claude Pro", d: "\u58c1\u6253\u3061\u30fb\u6587\u66f8\u751f\u6210", cost: "~3,000\u5186/\u6708" },
      { n: "v0 Premium", d: "Web UI\u751f\u6210", cost: "~3,000\u5186/\u6708" },
      { n: "Expo", d: "\u30e2\u30d0\u30a4\u30eb\u30a2\u30d7\u30ea\u57fa\u76e4", cost: "\u7121\u6599" },
      { n: "Supabase", d: "DB\u30fb\u8a8d\u8a3c\u30d0\u30c3\u30af\u30a8\u30f3\u30c9", cost: "\u7121\u6599" },
      { n: "GitHub", d: "\u30d0\u30fc\u30b8\u30e7\u30f3\u7ba1\u7406", cost: "\u7121\u6599" },
      { n: "Xcode", d: "iOS\u30d3\u30eb\u30c9\u74b0\u5883", cost: "\u7121\u6599" },
      { n: "TestFlight", d: "\u30a2\u30d7\u30ea\u914d\u5e03", cost: "\u7121\u6599" },
    ];
    const tw = 2.0, th = 1.55, tgx = 0.2, tgy = 0.2;
    const tsx = (W - (tw * 4 + tgx * 3)) / 2;
    tools.forEach((t, i) => {
      const col = i % 4, row = Math.floor(i / 4);
      const x = tsx + col * (tw + tgx), y = 1.2 + row * (th + tgy);
      card(s, x, y, tw, th);
      s.addShape("ellipse", { x: x + (tw - 0.4) / 2, y: y + 0.12, w: 0.4, h: 0.4, fill: { color: C.BLUE, transparency: 85 } });
      s.addText(t.n.charAt(0), {
        x: x + (tw - 0.4) / 2, y: y + 0.12, w: 0.4, h: 0.4,
        fontSize: 14, fontFace: FONT, color: C.BLUE, bold: true, align: "center", valign: "middle", margin: 0,
      });
      s.addText(t.n, {
        x: x + 0.1, y: y + 0.58, w: tw - 0.2, h: 0.3,
        fontSize: 13, fontFace: FONT, color: C.DARK_NAVY, bold: true, align: "center", margin: 0,
      });
      s.addText(t.d, {
        x: x + 0.1, y: y + 0.88, w: tw - 0.2, h: 0.25,
        fontSize: 10, fontFace: FONT, color: C.GRAY_500, align: "center", margin: 0,
      });
      s.addText(t.cost, {
        x: x + 0.1, y: y + 1.15, w: tw - 0.2, h: 0.25,
        fontSize: 10, fontFace: FONT, color: C.BLUE, bold: true, align: "center", margin: 0,
      });
    });

    s.addText("\u6708\u984d\u5408\u8a08: \u7d0410,000\u5186/\u4eba\uff08\u6709\u6599\u30c4\u30fc\u30eb3\u3064\uff09+ \u4f1a\u793e\u8ca0\u62c5\u306eEAS/Apple Developer", {
      x: M, y: 5.0, w: CW, h: 0.3, fontSize: 10, fontFace: FONT, color: C.GRAY_500, margin: 0,
    });
  }

  // --- Slide 8: 3 Principles ---
  {
    const s = pres.addSlide();
    s.background = { color: C.WHITE };
    topBar(s); title(s, "\u5b66\u7fd2\u306e3\u539f\u5247"); pageNum(s, 8);

    const ps = [
      { t: "AI \u2192 \u30da\u30a2 \u2192 \u8b1b\u5e2b", d: "\u8a70\u307e\u3063\u305f\u3089\u307e\u305aAI\u306b\u8cea\u554f\u3002\n\u6b21\u306b\u96a3\u306e\u4eba\u3068\u76f8\u8ac7\uff085\u5206\uff09\u3002\n\u305d\u308c\u3067\u3082\u30c0\u30e1\u306a\u3089\u8b1b\u5e2b\u3092\u547c\u3076\u3002", c: C.BLUE },
      { t: "\u5ea7\u5b66\u306f15\u5206\u4ee5\u5185", d: "\u9577\u6642\u9593\u306e\u5ea7\u5b66\u306f\u884c\u3044\u307e\u305b\u3093\u3002\n\u300c\u5ea7\u5b66\u2192\u5373\u5b9f\u8df5\u300d\u306e\u30b5\u30a4\u30af\u30eb\u3067\n\u624b\u3092\u52d5\u304b\u3057\u306a\u304c\u3089\u5b66\u3073\u307e\u3059\u3002", c: C.GREEN },
      { t: "AI\u306b\u6307\u793a\u3092\u51fa\u3059", d: "\u30d7\u30ed\u30b0\u30e9\u30df\u30f3\u30b0\u8a00\u8a9e\u3092\u899a\u3048\u308b\n\u5fc5\u8981\u306f\u3042\u308a\u307e\u305b\u3093\u3002\n\u300c\u4f55\u3092\u4f5c\u308a\u305f\u3044\u304b\u300d\u306b\u96c6\u4e2d\u3002", c: C.ORANGE },
    ];
    const cw = 2.7, gap = 0.25;
    const sx = (W - (cw * 3 + gap * 2)) / 2;
    ps.forEach((p, i) => {
      const x = sx + i * (cw + gap), y = 1.2;
      card(s, x, y, cw, 3.6, p.c);
      numCircle(s, x + 0.25, y + 0.3, i + 1, p.c);
      s.addText(p.t, {
        x: x + 0.85, y: y + 0.3, w: cw - 1.1, h: 0.45,
        fontSize: 15, fontFace: FONT, color: C.DARK_NAVY, bold: true, valign: "middle", margin: 0,
      });
      s.addShape("rect", { x: x + 0.2, y: y + 0.95, w: cw - 0.4, h: 0.015, fill: { color: C.GRAY_200 } });
      s.addText(p.d, {
        x: x + 0.2, y: y + 1.2, w: cw - 0.4, h: 2.0,
        fontSize: 12, fontFace: FONT, color: C.GRAY_600, valign: "top", margin: 0,
      });
    });
  }

  // --- Slide 9: Daily Rhythm ---
  {
    const s = pres.addSlide();
    s.background = { color: C.WHITE };
    topBar(s); title(s, "1\u65e5\u306e\u30ea\u30ba\u30e0"); pageNum(s, 9);

    const sched = [
      { time: "9:00 - 9:15", act: "\u671d\u4f1a\u30fb\u524d\u65e5\u306e\u5fa9\u7fd2", type: "all" },
      { time: "9:15 - 9:30", act: "\u30df\u30cb\u5ea7\u5b66\uff0815\u5206\u53b3\u5b88\uff09", type: "lecture" },
      { time: "9:30 - 11:00", act: "\u5348\u524d\u306e\u5b9f\u8df5\u30bb\u30c3\u30b7\u30e7\u30f3", type: "practice" },
      { time: "11:00 - 11:15", act: "\u4f11\u61a9", type: "break" },
      { time: "11:15 - 12:00", act: "\u5348\u524d\u306e\u5b9f\u8df5\u30bb\u30c3\u30b7\u30e7\u30f3\uff08\u7d9a\u304d\uff09", type: "practice" },
      { time: "12:00 - 13:00", act: "\u663c\u4f11\u307f", type: "break" },
      { time: "13:00 - 13:15", act: "\u30df\u30cb\u5ea7\u5b66", type: "lecture" },
      { time: "13:15 - 15:00", act: "\u5348\u5f8c\u306e\u5b9f\u8df5\u30bb\u30c3\u30b7\u30e7\u30f3", type: "practice" },
      { time: "15:00 - 15:45", act: "\u30c1\u30e3\u30ec\u30f3\u30b8\u8ab2\u984c\uff08\u500b\u4eba\u4f5c\u696d\uff09", type: "challenge" },
      { time: "15:45 - 16:00", act: "\u6210\u679c\u767a\u8868 + \u632f\u308a\u8fd4\u308a", type: "all" },
    ];
    const tColors = { all: C.BLUE, lecture: C.ORANGE, practice: C.GREEN, break: C.GRAY_400, challenge: C.BLUE_DARK };
    const sy = 1.15, rh = 0.37;
    sched.forEach((item, i) => {
      const y = sy + i * (rh + 0.04);
      const col = tColors[item.type];
      s.addShape("rect", { x: M, y, w: 0.08, h: rh, fill: { color: col } });
      s.addText(item.time, {
        x: M + 0.2, y, w: 1.8, h: rh,
        fontSize: 11, fontFace: FONT, color: C.GRAY_600, bold: true, valign: "middle", margin: 0,
      });
      s.addText(item.act, {
        x: M + 2.1, y, w: CW - 2.2, h: rh,
        fontSize: 12, fontFace: FONT, color: C.DARK_NAVY, valign: "middle", margin: 0,
      });
    });

    const legend = [
      { l: "\u5168\u4f53", c: C.BLUE }, { l: "\u5ea7\u5b66", c: C.ORANGE },
      { l: "\u5b9f\u8df5", c: C.GREEN }, { l: "\u4f11\u61a9", c: C.GRAY_400 },
      { l: "\u500b\u4eba", c: C.BLUE_DARK },
    ];
    let lx = M;
    legend.forEach((lg) => {
      s.addShape("rect", { x: lx, y: 5.15, w: 0.2, h: 0.2, fill: { color: lg.c } });
      s.addText(lg.l, { x: lx + 0.25, y: 5.15, w: 0.55, h: 0.2, fontSize: 9, fontFace: FONT, color: C.GRAY_600, valign: "middle", margin: 0 });
      lx += 0.95;
    });
  }

  // --- Slide 10: Deliverables & Evaluation ---
  {
    const s = pres.addSlide();
    s.background = { color: C.WHITE };
    topBar(s); title(s, "\u6210\u679c\u7269\u3068\u8a55\u4fa1"); pageNum(s, 10);

    // Left
    s.addText("\u6700\u7d42\u6210\u679c\u7269", {
      x: M, y: 1.1, w: 4.2, h: 0.4, fontSize: 16, fontFace: FONT, color: C.BLUE, bold: true, margin: 0,
    });
    const deliverables = [
      "\u500b\u4eba\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u30a2\u30d7\u30ea\uff08TestFlight\u914d\u5e03\u6e08\u307f\uff09",
      "GitHub\u30ea\u30dd\u30b8\u30c8\u30ea\uff08\u30b3\u30fc\u30c9\u4e00\u5f0f\uff09",
      "\u8981\u4ef6\u5b9a\u7fa9\u66f8",
      "\u30c6\u30b9\u30c8\u30d5\u30a3\u30fc\u30c9\u30d0\u30c3\u30af\u30ec\u30dd\u30fc\u30c8\uff085\u4ef6\u4ee5\u4e0a\uff09",
      "\u6700\u7d42\u30d7\u30ec\u30bc\u30f3\u30c6\u30fc\u30b7\u30e7\u30f3",
    ];
    const bullets = deliverables.map((d, i) => ({
      text: d,
      options: { bullet: true, breakLine: i < deliverables.length - 1, fontSize: 11, fontFace: FONT, color: C.GRAY_700, paraSpaceAfter: 6 },
    }));
    s.addText(bullets, { x: M, y: 1.6, w: 4.2, h: 2.8, valign: "top", margin: 0 });

    // Right
    s.addText("\u8a55\u4fa1\u306e3\u8ef8", {
      x: 5.2, y: 1.1, w: 4.2, h: 0.4, fontSize: 16, fontFace: FONT, color: C.BLUE, bold: true, margin: 0,
    });
    const criteria = [
      { t: "\u5b9f\u6280\u30c6\u30b9\u30c8\uff0860%\uff09", d: "\u304a\u984c\u30a2\u30d7\u30ea\u309260\u5206\u3067\u4f5c\u6210\uff08AI\u5229\u7528\u81ea\u7531\uff09" },
      { t: "\u30d7\u30ed\u30bb\u30b9\u8a55\u4fa1\uff0825%\uff09", d: "\u30d7\u30ed\u30f3\u30d7\u30c8\u5c65\u6b74\u306e\u8cea\u30fb\u554f\u984c\u89e3\u6c7a\u30a2\u30d7\u30ed\u30fc\u30c1" },
      { t: "\u81ea\u5df1\u30fb\u76f8\u4e92\u8a55\u4fa1\uff0815%\uff09", d: "\u81ea\u5df1\u8a55\u4fa1\u30b7\u30fc\u30c8 + \u53d7\u8b1b\u8005\u9593\u30d5\u30a3\u30fc\u30c9\u30d0\u30c3\u30af" },
    ];
    criteria.forEach((c, i) => {
      const y = 1.6 + i * 1.0;
      card(s, 5.2, y, 4.2, 0.85, C.BLUE);
      s.addText(c.t, {
        x: 5.4, y: y + 0.05, w: 3.8, h: 0.35,
        fontSize: 13, fontFace: FONT, color: C.DARK_NAVY, bold: true, margin: 0,
      });
      s.addText(c.d, {
        x: 5.4, y: y + 0.42, w: 3.8, h: 0.3,
        fontSize: 10, fontFace: FONT, color: C.GRAY_600, margin: 0,
      });
    });

    s.addText("\u203b \u30da\u30fc\u30d1\u30fc\u30c6\u30b9\u30c8\u306f\u884c\u3044\u307e\u305b\u3093\u3002\u300c\u52d5\u304f\u3082\u306e\u3092\u4f5c\u308c\u308b\u304b\u300d\u304c\u5168\u3066\u3067\u3059\u3002", {
      x: M, y: 4.85, w: CW, h: 0.35, fontSize: 10, fontFace: FONT, color: C.GRAY_500, margin: 0,
    });
  }

  // --- Slide 11: Post-Training Support ---
  {
    const s = pres.addSlide();
    s.background = { color: C.WHITE };
    topBar(s); title(s, "\u7814\u4fee\u5f8c\u30b5\u30dd\u30fc\u30c8"); pageNum(s, 11);

    const supports = [
      { when: "\u6bce\u9031\u91d1\u66dc", t: "\u3082\u304f\u3082\u304f\u4f1a", d: "30\u5206\u306e\u81ea\u4e3b\u5236\u4f5c+\u8cea\u554f\u30bf\u30a4\u30e0\u3002\u81ea\u7531\u53c2\u52a0\u3002", c: C.BLUE },
      { when: "2\u9031\u9593\u5f8c", t: "\u696d\u52d9\u6539\u5584\u30a2\u30d7\u30ea\u4f01\u753b\u767a\u8868", d: "\u81ea\u5206\u306e\u696d\u52d9\u6539\u5584\u30a2\u30a4\u30c7\u30a2\u3092\u30a2\u30d7\u30ea\u4f01\u753b\u306b\u307e\u3068\u3081\u3066\u767a\u8868\u3002", c: C.GREEN },
      { when: "1\u30f6\u6708\u5f8c", t: "\u500b\u52251on1", d: "\u3064\u307e\u305a\u304d\u30fb\u4e0d\u5b89\u306e\u30d2\u30a2\u30ea\u30f3\u30b0\u3002\u30d5\u30a9\u30ed\u30fc\u8a08\u753b\u306e\u518d\u7b56\u5b9a\u3002", c: C.ORANGE },
      { when: "2\u30f6\u6708\u5f8c", t: "\u30df\u30cb\u30cf\u30c3\u30ab\u30bd\u30f3", d: "2-3\u4eba\u30c1\u30fc\u30e0\u3067\u534a\u65e5\u306e\u30a2\u30d7\u30ea\u5236\u4f5c\u30c1\u30e3\u30ec\u30f3\u30b8\u3002", c: C.BLUE_DARK },
      { when: "3\u30f6\u6708\u5f8c", t: "\u6210\u679c\u767a\u8868\u4f1a", d: "\u7d4c\u55b6\u5c64\u5411\u3051\u306b\u7814\u4fee\u5f8c\u306e\u6210\u679c\u30fb\u6210\u9577\u3092\u767a\u8868\u3002", c: C.BLUE },
    ];
    supports.forEach((sup, i) => {
      const y = 1.15 + i * 0.82;
      s.addShape("ellipse", { x: M + 1.0, y: y + 0.12, w: 0.32, h: 0.32, fill: { color: sup.c } });
      if (i < supports.length - 1) {
        s.addShape("rect", { x: M + 1.13, y: y + 0.44, w: 0.04, h: 0.5, fill: { color: C.GRAY_200 } });
      }
      s.addText(sup.when, {
        x: M, y: y + 0.02, w: 0.9, h: 0.45, fontSize: 10, fontFace: FONT, color: sup.c, bold: true, align: "right", valign: "middle", margin: 0,
      });
      s.addText(sup.t, {
        x: M + 1.55, y: y - 0.02, w: 3.0, h: 0.35, fontSize: 14, fontFace: FONT, color: C.DARK_NAVY, bold: true, valign: "middle", margin: 0,
      });
      s.addText(sup.d, {
        x: M + 1.55, y: y + 0.33, w: 6.5, h: 0.3, fontSize: 11, fontFace: FONT, color: C.GRAY_600, margin: 0,
      });
    });
  }

  // --- Slide 12: Prerequisites ---
  {
    const s = pres.addSlide();
    s.background = { color: C.WHITE };
    topBar(s); title(s, "\u4e8b\u524d\u6e96\u5099\uff08\u5fc5\u9808\uff09"); pageNum(s, 12);

    s.addText("\u4f5c\u6210\u3059\u308b\u30a2\u30ab\u30a6\u30f3\u30c8\uff085\u3064\uff09", {
      x: M, y: 1.1, w: 4.5, h: 0.35, fontSize: 15, fontFace: FONT, color: C.BLUE, bold: true, margin: 0,
    });
    const accts = [
      { n: "GitHub", u: "github.com" },
      { n: "Supabase", u: "supabase.com" },
      { n: "Expo", u: "expo.dev" },
      { n: "Claude Pro", u: "claude.ai" },
      { n: "Apple ID\u78ba\u8a8d", u: "2FA\u6709\u52b9\u5316" },
    ];
    accts.forEach((a, i) => {
      const y = 1.55 + i * 0.58;
      numCircle(s, M, y, i + 1, C.BLUE);
      s.addText(a.n, {
        x: M + 0.55, y, w: 2.0, h: 0.45, fontSize: 13, fontFace: FONT, color: C.DARK_NAVY, bold: true, valign: "middle", margin: 0,
      });
      s.addText(a.u, {
        x: M + 2.5, y, w: 2.0, h: 0.45, fontSize: 11, fontFace: FONT, color: C.GRAY_500, valign: "middle", margin: 0,
      });
    });

    // Mac requirements (right)
    s.addText("Mac\u8981\u4ef6", {
      x: 5.3, y: 1.1, w: 4.1, h: 0.35, fontSize: 15, fontFace: FONT, color: C.BLUE, bold: true, margin: 0,
    });
    card(s, 5.3, 1.55, 4.1, 3.0, C.BLUE);
    const reqs = [
      { l: "macOS", v: "Sonoma 14.x \u4ee5\u4e0a" },
      { l: "RAM", v: "16GB \u4ee5\u4e0a" },
      { l: "\u7a7a\u304d\u5bb9\u91cf", v: "50GB \u4ee5\u4e0a" },
      { l: "\u7ba1\u7406\u8005\u6a29\u9650", v: "\u5fc5\u9808" },
      { l: "Apple ID", v: "2FA\u6709\u52b9" },
    ];
    reqs.forEach((r, i) => {
      const y = 1.75 + i * 0.5;
      s.addText(r.l, {
        x: 5.55, y, w: 1.5, h: 0.35, fontSize: 11, fontFace: FONT, color: C.GRAY_600, bold: true, valign: "middle", margin: 0,
      });
      s.addText(r.v, {
        x: 7.1, y, w: 2.1, h: 0.35, fontSize: 12, fontFace: FONT, color: C.DARK_NAVY, valign: "middle", margin: 0,
      });
    });

    // Warning
    s.addShape("rect", { x: M, y: 4.8, w: CW, h: 0.5, fill: { color: C.AMBER_BG }, line: { color: C.ORANGE, width: 0.5 } });
    s.addText("  \u521d\u65e5\u306e\u5b66\u7fd2\u6642\u9593\u3092\u74b0\u5883\u69cb\u7bc9\u3067\u6d88\u8cbb\u3057\u306a\u3044\u305f\u3081\u3001Week 0\u3067\u5b8c\u74a7\u306a\u74b0\u5883\u3092\u7528\u610f\u3057\u3066\u304f\u3060\u3055\u3044", {
      x: M + 0.1, y: 4.8, w: CW - 0.2, h: 0.5,
      fontSize: 11, fontFace: FONT, color: C.ORANGE, bold: true, valign: "middle", margin: 0,
    });
  }

  // --- Slide 13: FAQ ---
  {
    const s = pres.addSlide();
    s.background = { color: C.GRAY_50 };
    topBar(s); title(s, "\u3088\u304f\u3042\u308b\u8cea\u554f\uff08FAQ\uff09"); pageNum(s, 13);

    const faqs = [
      { q: "\u30d7\u30ed\u30b0\u30e9\u30df\u30f3\u30b0\u7d4c\u9a13\u304c\u306a\u304f\u3066\u3082\u5927\u4e08\u592b\uff1f", a: "\u306f\u3044\u3002AI\u304c\u30b3\u30fc\u30c9\u3092\u66f8\u304f\u306e\u3067\u3001\u7d4c\u9a13\u306f\u4e0d\u8981\u3067\u3059\u3002" },
      { q: "\u30b3\u30fc\u30c9\u306e\u610f\u5473\u304c\u5206\u304b\u3089\u306a\u3044\u3068\u304d\u306f\uff1f", a: "\u6700\u521d\u306f\u5206\u304b\u3089\u306a\u304f\u3066OK\u3002\u4f5c\u308a\u7d9a\u3051\u308b\u3046\u3061\u306b\u81ea\u7136\u3068\u5206\u304b\u308a\u307e\u3059\u3002" },
      { q: "\u30a8\u30e9\u30fc\u304c\u51fa\u305f\u3089\u3069\u3046\u3059\u308b\uff1f", a: "\u30a8\u30e9\u30fc\u3092\u30b3\u30d4\u30fc\u2192AI\u306b\u8cbc\u308a\u4ed8\u3051\u2192\u300c\u89e3\u6c7a\u3057\u3066\u300d\u3068\u6307\u793a\u3002" },
      { q: "\u7814\u4fee\u5f8c\u3082\u30b5\u30dd\u30fc\u30c8\u306f\u3042\u308b\uff1f", a: "\u6bce\u9031\u306e\u3082\u304f\u3082\u304f\u4f1a\u30011on1\u3001Slack\u3067\u306e\u7d99\u7d9a\u30b5\u30dd\u30fc\u30c8\u3042\u308a\u3002" },
      { q: "\u4f5c\u3063\u305f\u30a2\u30d7\u30ea\u306f\u5b9f\u969b\u306b\u4f7f\u3048\u308b\uff1f", a: "\u306f\u3044\u3002TestFlight\u3067\u914d\u5e03\u3057\u3001\u5b9f\u969b\u306e\u30e6\u30fc\u30b6\u30fc\u30c6\u30b9\u30c8\u307e\u3067\u884c\u3044\u307e\u3059\u3002" },
    ];
    faqs.forEach((faq, i) => {
      const y = 1.1 + i * 0.85;
      s.addText("Q", {
        x: M, y, w: 0.35, h: 0.35, fontSize: 14, fontFace: FONT,
        color: C.WHITE, bold: true, align: "center", valign: "middle", fill: { color: C.BLUE }, margin: 0,
      });
      s.addText(faq.q, {
        x: M + 0.45, y, w: CW - 0.45, h: 0.35,
        fontSize: 13, fontFace: FONT, color: C.DARK_NAVY, bold: true, valign: "middle", margin: 0,
      });
      s.addText("A", {
        x: M + 0.45, y: y + 0.38, w: 0.3, h: 0.3,
        fontSize: 12, fontFace: FONT, color: C.GREEN, bold: true, valign: "middle", margin: 0,
      });
      s.addText(faq.a, {
        x: M + 0.75, y: y + 0.38, w: CW - 0.75, h: 0.3,
        fontSize: 11, fontFace: FONT, color: C.GRAY_600, valign: "middle", margin: 0,
      });
    });
  }

  // --- Slide 14: Day 1 Checklist ---
  {
    const s = pres.addSlide();
    s.background = { color: C.WHITE };
    topBar(s); title(s, "\u521d\u65e5\u306e\u6301\u3061\u7269\u30fb\u96c6\u5408\u6848\u5185"); pageNum(s, 14);

    // Left: checklist
    s.addText("\u6301\u3061\u7269\u30c1\u30a7\u30c3\u30af\u30ea\u30b9\u30c8", {
      x: M, y: 1.1, w: 5.0, h: 0.4, fontSize: 16, fontFace: FONT, color: C.BLUE, bold: true, margin: 0,
    });
    const items = [
      "Mac\uff08\u5145\u96fb\u5668\u3082\u5fd8\u308c\u305a\u306b\uff09",
      "Apple ID\u30fb\u30d1\u30b9\u30ef\u30fc\u30c9\uff082FA\u7528\u7aef\u672b\u3082\uff09",
      "\u5404\u30a2\u30ab\u30a6\u30f3\u30c8\u306e\u30ed\u30b0\u30a4\u30f3\u60c5\u5831\u30e1\u30e2",
      "\u7b46\u8a18\u7528\u5177\u30fb\u30ce\u30fc\u30c8",
      "\u30a4\u30e4\u30db\u30f3\uff08\u52d5\u753b\u8996\u8074\u7528\uff09",
    ];
    items.forEach((item, i) => {
      const y = 1.6 + i * 0.55;
      s.addShape("rect", { x: M, y: y + 0.05, w: 0.28, h: 0.28, fill: { color: C.WHITE }, line: { color: C.BLUE, width: 1.5 } });
      s.addText(item, {
        x: M + 0.42, y, w: 4.5, h: 0.38,
        fontSize: 13, fontFace: FONT, color: C.DARK_NAVY, valign: "middle", margin: 0,
      });
    });

    // Right: time & place
    card(s, 5.5, 1.1, 3.9, 1.9, C.BLUE, "top");
    s.addText("\u96c6\u5408\u6642\u523b", {
      x: 5.7, y: 1.35, w: 3.5, h: 0.3, fontSize: 13, fontFace: FONT, color: C.GRAY_500, margin: 0,
    });
    s.addText("9:00\uff088:45\u5165\u5ba4\u53ef\u80fd\uff09", {
      x: 5.7, y: 1.65, w: 3.5, h: 0.5, fontSize: 20, fontFace: FONT, color: C.DARK_NAVY, bold: true, margin: 0,
    });
    s.addText("\u7d42\u4e86: 16:00\u4e88\u5b9a", {
      x: 5.7, y: 2.2, w: 3.5, h: 0.3, fontSize: 12, fontFace: FONT, color: C.GRAY_500, margin: 0,
    });

    card(s, 5.5, 3.3, 3.9, 1.4, C.GREEN, "top");
    s.addText("\u5834\u6240", {
      x: 5.7, y: 3.55, w: 3.5, h: 0.3, fontSize: 13, fontFace: FONT, color: C.GRAY_500, margin: 0,
    });
    s.addText("\uff08\u4f1a\u5834\u540d\u3092\u8a18\u5165\uff09", {
      x: 5.7, y: 3.85, w: 3.5, h: 0.5, fontSize: 16, fontFace: FONT, color: C.DARK_NAVY, bold: true, margin: 0,
    });
  }

  // --- Slide 15: Closing ---
  {
    const s = pres.addSlide();
    s.background = { color: C.DARK_BG };
    s.addShape("rect", { x: 0, y: 0, w: 0.12, h: H, fill: { color: C.BLUE } });
    s.addShape("ellipse", { x: 7.5, y: -1, w: 4, h: 4, fill: { color: C.BLUE, transparency: 90 } });
    s.addShape("ellipse", { x: 8.5, y: 3, w: 3, h: 3, fill: { color: C.BLUE, transparency: 93 } });

    s.addText("Day 1 \u3067\u304a\u4f1a\u3044\u3057\u307e\u3057\u3087\u3046", {
      x: 0.8, y: 1.2, w: 7, h: 1.0, fontSize: 36, fontFace: FONT, color: C.WHITE, bold: true, margin: 0,
    });
    s.addText("\u307e\u305a\u306fAI\u3092\u4f53\u611f\u3059\u308b\u3053\u3068\u304b\u3089\u59cb\u3081\u307e\u3057\u3087\u3046", {
      x: 0.8, y: 2.2, w: 7, h: 0.5, fontSize: 16, fontFace: FONT, color: C.BLUE, margin: 0,
    });
    s.addShape("rect", { x: 0.8, y: 3.1, w: 2.5, h: 0.003, fill: { color: C.GRAY_500 } });
    s.addText([
      { text: "Slack:  #ai-builders", options: { breakLine: true, fontSize: 13, color: C.GRAY_400 } },
      { text: "", options: { breakLine: true, fontSize: 6 } },
      { text: "\u8cea\u554f\u30fb\u76f8\u8ac7\u306f\u304a\u6c17\u8efd\u306b Slack \u307e\u3067", options: { fontSize: 13, color: C.GRAY_400 } },
    ], { x: 0.8, y: 3.3, w: 7, h: 1.2, fontFace: FONT, margin: 0 });
    pageNum(s, 15);
  }

  // Write
  await pres.writeFile({ fileName: "onboarding-guide.pptx" });
  console.log("Generated: slides/onboarding-guide.pptx");
}

main().catch(console.error);
