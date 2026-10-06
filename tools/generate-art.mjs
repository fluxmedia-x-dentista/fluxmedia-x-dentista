/**
 * Generates the original SVG artwork used across the public site.
 *
 *   public/images/automations/<slug>.svg   — 11 distinct 16:9 thumbnails
 *   public/images/backgrounds/<page>.svg   — 4 page background scenes
 *
 * Everything is drawn from primitives in the FLUXMEDIA brand language
 * (deep navy -> indigo -> violet gradients, dot grid, glowing nodes, thin
 * sky/violet line work). No text, no stock photography, no third-party art.
 *
 * Run with:  node tools/generate-art.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SKY = "#4FA9FF";
const BLUE = "#0A84FF";
const INDIGO = "#2F5BFB";
const VIOLET = "#6C2BFB";
const ORCHID = "#C084FC";

/* -------------------------------------------------------------------------- */
/* Shared building blocks                                                      */
/* -------------------------------------------------------------------------- */

function defs({ dotSize = 22, dotOpacity = 0.16 } = {}) {
  return `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#050816" />
      <stop offset="55%" stop-color="#0B1030" />
      <stop offset="100%" stop-color="#160B3A" />
    </linearGradient>
    <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${SKY}" />
      <stop offset="100%" stop-color="${VIOLET}" />
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.10" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
    </linearGradient>
    <radialGradient id="orbBlue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.55" />
      <stop offset="100%" stop-color="${BLUE}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="orbViolet" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${VIOLET}" stop-opacity="0.55" />
      <stop offset="100%" stop-color="${VIOLET}" stop-opacity="0" />
    </radialGradient>
    <pattern id="dots" width="${dotSize}" height="${dotSize}" patternUnits="userSpaceOnUse">
      <circle cx="1.6" cy="1.6" r="1.6" fill="${SKY}" fill-opacity="${dotOpacity}" />
    </pattern>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="7" />
    </filter>
  </defs>`;
}

function backdrop(w, h, orbs = []) {
  const orbShapes = orbs
    .map(
      ([cx, cy, r, kind]) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${
          kind === "violet" ? "orbViolet" : "orbBlue"
        })" />`,
    )
    .join("\n    ");
  return `
  <rect width="${w}" height="${h}" fill="url(#bg)" />
  <rect width="${w}" height="${h}" fill="url(#dots)" />
  ${orbShapes}`;
}

/** Rounded glass panel. */
function panel(x, y, w, h, r = 12, opacity = 1) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"
    fill="url(#glass)" stroke="${SKY}" stroke-opacity="${0.35 * opacity}" stroke-width="1.5" />`;
}

/** Glowing connector node. */
function node(cx, cy, r = 7, color = SKY) {
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${r * 2.6}" fill="${color}" fill-opacity="0.14" filter="url(#soft)" />
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="2" />
    <circle cx="${cx}" cy="${cy}" r="${r / 2.6}" fill="${color}" />
  </g>`;
}

function link(x1, y1, x2, y2, { dashed = true, color = "url(#stroke)" } = {}) {
  return `<path d="M ${x1} ${y1} L ${x2} ${y2}" stroke="${color}" stroke-width="1.6"
    stroke-opacity="0.75" fill="none" ${dashed ? 'stroke-dasharray="6 7"' : ""} stroke-linecap="round" />`;
}

function curve(x1, y1, cx, cy, x2, y2, color = "url(#stroke)", dashed = false) {
  return `<path d="M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}" stroke="${color}" stroke-width="1.8"
    fill="none" stroke-opacity="0.8" ${dashed ? 'stroke-dasharray="7 8"' : ""} stroke-linecap="round" />`;
}

/** Chat bubble with an optional tail. */
function bubble(x, y, w, h, { flip = false, color = SKY, lines = 2 } = {}) {
  const tail = flip
    ? `M ${x + w - 16} ${y + h} l 0 14 l -16 -14 z`
    : `M ${x + 16} ${y + h} l 0 14 l 16 -14 z`;
  const rows = Array.from({ length: lines }, (_, i) => {
    const lw = i === lines - 1 ? w * 0.42 : w * 0.66;
    return `<rect x="${x + 14}" y="${y + 14 + i * 12}" width="${lw}" height="5" rx="2.5"
      fill="${color}" fill-opacity="0.42" />`;
  }).join("");
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(14, h / 2)}"
      fill="url(#glass)" stroke="${color}" stroke-opacity="0.5" stroke-width="1.5" />
    <path d="${tail}" fill="${color}" fill-opacity="0.10" stroke="${color}" stroke-opacity="0.5" stroke-width="1.5" />
    ${rows}
  </g>`;
}

function textRow(x, y, w, color = SKY, opacity = 0.4, h = 5) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${color}" fill-opacity="${opacity}" />`;
}

function svg(w, h, body, { dotSize, dotOpacity } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
${defs({ dotSize, dotOpacity })}
${body}
</svg>
`;
}

/* -------------------------------------------------------------------------- */
/* Automation thumbnails (640 x 360)                                           */
/* -------------------------------------------------------------------------- */

const W = 640;
const H = 360;

const thumbnails = {
  /** Instagram DM — chat bubbles orbiting a central node. */
  "instagram-dm-automation": () => {
    const cx = 320;
    const cy = 180;
    const ring = `<rect x="${cx - 40}" y="${cy - 40}" width="80" height="80" rx="24"
      fill="none" stroke="url(#stroke)" stroke-width="2.4" />
      <circle cx="${cx}" cy="${cy}" r="17" fill="none" stroke="${ORCHID}" stroke-width="2.4" />
      <circle cx="${cx + 22}" cy="${cy - 22}" r="3.6" fill="${ORCHID}" />`;
    return [
      backdrop(W, H, [
        [120, 90, 150, "blue"],
        [520, 280, 170, "violet"],
      ]),
      curve(150, 110, 240, 120, cx - 44, cy - 20, "url(#stroke)", true),
      curve(150, 250, 240, 240, cx - 44, cy + 20, "url(#stroke)", true),
      curve(cx + 44, cy - 18, 420, 110, 492, 112, "url(#stroke)", true),
      curve(cx + 44, cy + 22, 420, 250, 492, 252, "url(#stroke)", true),
      bubble(56, 78, 118, 54, { lines: 2 }),
      bubble(56, 218, 118, 54, { lines: 2 }),
      bubble(474, 82, 118, 54, { flip: true, color: ORCHID, lines: 2 }),
      bubble(474, 222, 118, 54, { flip: true, color: ORCHID, lines: 2 }),
      ring,
    ].join("\n");
  },

  /** Form to CRM — a form card feeding a database cylinder. */
  "form-to-crm-pipeline": () => {
    const db = (x, y) => `<g>
      <ellipse cx="${x}" cy="${y}" rx="62" ry="20" fill="url(#glass)" stroke="${VIOLET}" stroke-opacity="0.75" stroke-width="2" />
      <path d="M ${x - 62} ${y} v 68 a 62 20 0 0 0 124 0 v -68" fill="url(#glass)" stroke="${VIOLET}" stroke-opacity="0.75" stroke-width="2" />
      <ellipse cx="${x}" cy="${y + 34}" rx="62" ry="20" fill="none" stroke="${VIOLET}" stroke-opacity="0.45" stroke-width="1.4" />
    </g>`;
    return [
      backdrop(W, H, [
        [110, 300, 150, "blue"],
        [540, 80, 170, "violet"],
      ]),
      panel(52, 72, 196, 216, 16),
      textRow(74, 100, 110, SKY, 0.55, 7),
      ...[0, 1, 2].map((i) =>
        [
          `<rect x="74" y="${128 + i * 46}" width="152" height="30" rx="8" fill="#0B1030" fill-opacity="0.75" stroke="${SKY}" stroke-opacity="0.35" stroke-width="1.3" />`,
          textRow(86, `${141 + i * 46}`, 76, SKY, 0.35),
        ].join(""),
      ),
      `<rect x="74" y="266" width="86" height="22" rx="11" fill="url(#stroke)" fill-opacity="0.85" />`,
      link(254, 180, 356, 180, { dashed: true }),
      node(305, 180, 7),
      `<path d="M 340 172 l 14 8 l -14 8 z" fill="${SKY}" fill-opacity="0.9" />`,
      db(462, 112),
      textRow(430, 150, 64, ORCHID, 0.5),
      textRow(430, 186, 48, ORCHID, 0.35),
    ].join("\n");
  },

  /** WhatsApp Business — phone chat plus a bot head. */
  "whatsapp-business-automation": () =>
    [
      backdrop(W, H, [
        [140, 100, 160, "blue"],
        [500, 300, 170, "violet"],
      ]),
      `<rect x="78" y="56" width="200" height="248" rx="26" fill="url(#glass)" stroke="${SKY}" stroke-opacity="0.45" stroke-width="2" />
     <rect x="118" y="68" width="60" height="8" rx="4" fill="${SKY}" fill-opacity="0.4" />`,
      bubble(98, 98, 128, 46, { lines: 2 }),
      bubble(132, 160, 128, 46, { flip: true, color: ORCHID, lines: 2 }),
      bubble(98, 222, 110, 42, { lines: 1 }),
      curve(292, 180, 340, 150, 392, 150, "url(#stroke)", true),
      `<g>
      <rect x="400" y="104" width="136" height="110" rx="26" fill="url(#glass)" stroke="url(#stroke)" stroke-width="2.4" />
      <circle cx="436" cy="152" r="9" fill="${SKY}" />
      <circle cx="500" cy="152" r="9" fill="${SKY}" />
      <path d="M 432 184 q 36 20 72 0" stroke="${ORCHID}" stroke-width="2.4" fill="none" stroke-linecap="round" />
      <path d="M 468 104 v -22" stroke="${ORCHID}" stroke-width="2" />
      <circle cx="468" cy="76" r="7" fill="none" stroke="${ORCHID}" stroke-width="2" />
      <path d="M 400 136 h -16 v 42 h 16" stroke="${SKY}" stroke-opacity="0.6" stroke-width="2" fill="none" />
      <path d="M 536 136 h 16 v 42 h -16" stroke="${SKY}" stroke-opacity="0.6" stroke-width="2" fill="none" />
    </g>`,
      node(468, 252, 7, ORCHID),
      link(468, 214, 468, 244, { dashed: true }),
    ].join("\n"),

  /** CRM pipeline — kanban board with moving deal cards. */
  "crm-pipeline-automation": () => {
    const cols = [0, 1, 2, 3].map((i) => {
      const x = 56 + i * 136;
      const cards = Array.from({ length: 3 - (i % 2) }, (_, j) => {
        const y = 118 + j * 52;
        return `<rect x="${x + 12}" y="${y}" width="96" height="40" rx="9"
          fill="#0B1030" fill-opacity="0.85" stroke="${i > 1 ? VIOLET : SKY}" stroke-opacity="0.55" stroke-width="1.4" />
          ${textRow(x + 24, y + 12, 58, i > 1 ? ORCHID : SKY, 0.45)}
          ${textRow(x + 24, y + 24, 34, i > 1 ? ORCHID : SKY, 0.25)}`;
      }).join("");
      return `<g>
        ${panel(x, 76, 120, 212, 14)}
        ${textRow(x + 14, 92, 52, i > 1 ? ORCHID : SKY, 0.6, 6)}
        ${cards}
      </g>`;
    });
    return [
      backdrop(W, H, [
        [90, 80, 150, "blue"],
        [560, 300, 160, "violet"],
      ]),
      ...cols,
      `<path d="M 180 302 h 300" stroke="url(#stroke)" stroke-width="1.6" stroke-dasharray="6 8" />`,
      `<path d="M 474 296 l 14 6 l -14 6 z" fill="${ORCHID}" />`,
      node(180, 302, 6),
    ].join("\n");
  },

  /** Email sequences — envelopes along a timeline. */
  "email-follow-up-sequences": () => {
    const env = (
      x,
      y,
      s,
      color,
    ) => `<g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-34" y="-24" width="68" height="48" rx="8" fill="url(#glass)" stroke="${color}" stroke-opacity="0.75" stroke-width="2" />
      <path d="M -34 -18 L 0 8 L 34 -18" stroke="${color}" stroke-opacity="0.9" stroke-width="2" fill="none" stroke-linejoin="round" />
    </g>`;
    return [
      backdrop(W, H, [
        [120, 280, 150, "blue"],
        [520, 90, 160, "violet"],
      ]),
      `<path d="M 60 230 Q 200 150 320 198 T 584 150" stroke="url(#stroke)" stroke-width="2"
        fill="none" stroke-dasharray="7 9" stroke-linecap="round" />`,
      env(104, 206, 1, SKY),
      env(248, 174, 1.1, SKY),
      env(400, 190, 1.1, VIOLET),
      env(540, 142, 1, ORCHID),
      node(176, 190, 5),
      node(324, 182, 5),
      node(470, 166, 5, ORCHID),
      ...[104, 248, 400, 540].map((x, i) =>
        textRow(x - 22, 258 + (i % 2) * 10, 44, SKY, 0.25),
      ),
    ].join("\n");
  },

  /** AI customer support — assistant bubble inside a headset arc. */
  "ai-customer-support": () =>
    [
      backdrop(W, H, [
        [160, 120, 160, "blue"],
        [480, 260, 170, "violet"],
      ]),
      `<path d="M 196 230 a 124 124 0 0 1 248 0" stroke="url(#stroke)" stroke-width="3" fill="none" stroke-linecap="round" />
     <rect x="176" y="214" width="34" height="62" rx="16" fill="url(#glass)" stroke="${SKY}" stroke-opacity="0.7" stroke-width="2" />
     <rect x="430" y="214" width="34" height="62" rx="16" fill="url(#glass)" stroke="${ORCHID}" stroke-opacity="0.7" stroke-width="2" />`,
      bubble(246, 128, 150, 70, { lines: 3, color: SKY }),
      `<circle cx="320" cy="252" r="26" fill="none" stroke="${ORCHID}" stroke-width="2" />
     <path d="M 310 248 h 20 M 310 258 h 12" stroke="${ORCHID}" stroke-width="2" stroke-linecap="round" />`,
      node(130, 150, 6),
      node(512, 150, 6, ORCHID),
      link(142, 156, 240, 170, { dashed: true }),
      link(404, 170, 500, 156, { dashed: true }),
    ].join("\n"),

  /** Appointment booking — calendar grid with a clock. */
  "appointment-booking-system": () => {
    const cells = [];
    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 5; c += 1) {
        const x = 96 + c * 46;
        const y = 136 + r * 38;
        const active = r === 2 && c === 3;
        cells.push(
          `<rect x="${x}" y="${y}" width="34" height="26" rx="6"
            fill="${active ? VIOLET : "#0B1030"}" fill-opacity="${active ? 0.8 : 0.7}"
            stroke="${active ? ORCHID : SKY}" stroke-opacity="${active ? 0.95 : 0.3}" stroke-width="1.3" />`,
        );
      }
    }
    return [
      backdrop(W, H, [
        [110, 90, 150, "blue"],
        [540, 290, 160, "violet"],
      ]),
      panel(74, 72, 300, 224, 18),
      `<path d="M 74 112 h 300" stroke="${SKY}" stroke-opacity="0.3" stroke-width="1.3" />`,
      `<circle cx="100" cy="92" r="5" fill="${SKY}" /><circle cx="118" cy="92" r="5" fill="${ORCHID}" />`,
      ...cells,
      `<g>
        <circle cx="472" cy="184" r="64" fill="url(#glass)" stroke="url(#stroke)" stroke-width="2.4" />
        <circle cx="472" cy="184" r="52" fill="none" stroke="${SKY}" stroke-opacity="0.25" stroke-width="1.2" />
        <path d="M 472 184 V 146 M 472 184 L 500 198" stroke="${ORCHID}" stroke-width="3" stroke-linecap="round" />
        <circle cx="472" cy="184" r="5" fill="${ORCHID}" />
      </g>`,
      link(380, 184, 404, 184, { dashed: true }),
    ].join("\n");
  },

  /** Abandoned cart — shopping cart with a return arrow. */
  "abandoned-cart-recovery": () =>
    [
      backdrop(W, H, [
        [140, 280, 150, "blue"],
        [500, 90, 170, "violet"],
      ]),
      `<g transform="translate(150 150)">
      <path d="M -52 -36 h 24 l 22 92 h 92 l 20 -64 h -116" stroke="url(#stroke)" stroke-width="3"
        fill="none" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="4" cy="72" r="11" fill="none" stroke="${SKY}" stroke-width="2.6" />
      <circle cx="70" cy="72" r="11" fill="none" stroke="${SKY}" stroke-width="2.6" />
    </g>`,
      `<path d="M 268 150 q 86 -92 178 -8" stroke="${ORCHID}" stroke-width="2.4" fill="none"
      stroke-dasharray="8 9" stroke-linecap="round" />
     <path d="M 440 132 l 10 18 l -20 4 z" fill="${ORCHID}" />`,
      bubble(392, 170, 150, 68, { flip: true, color: ORCHID, lines: 3 }),
      node(268, 150, 6),
      node(356, 96, 6, ORCHID),
      textRow(100, 268, 120, SKY, 0.3),
      textRow(100, 284, 72, SKY, 0.18),
    ].join("\n"),

  /** Content repurposing — one document splitting into many. */
  "content-repurposing-pipeline": () => {
    const doc = (x, y, w, h, color, rows = 3) => `<g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="url(#glass)"
        stroke="${color}" stroke-opacity="0.7" stroke-width="1.8" />
      ${Array.from({ length: rows }, (_, i) => textRow(x + 12, y + 16 + i * 13, w - 34, color, 0.35)).join("")}
    </g>`;
    return [
      backdrop(W, H, [
        [120, 170, 160, "blue"],
        [520, 180, 170, "violet"],
      ]),
      doc(64, 108, 136, 150, SKY, 6),
      curve(206, 170, 272, 120, 352, 94, "url(#stroke)", true),
      curve(206, 184, 272, 184, 352, 166, "url(#stroke)", true),
      curve(206, 198, 272, 248, 352, 240, "url(#stroke)", true),
      node(278, 184, 8),
      doc(358, 66, 112, 62, ORCHID, 2),
      doc(358, 146, 112, 62, ORCHID, 2),
      doc(358, 226, 112, 62, ORCHID, 2),
      `<rect x="496" y="96" width="76" height="164" rx="14" fill="url(#glass)" stroke="${VIOLET}" stroke-opacity="0.6" stroke-width="1.6" />
       ${textRow(510, 118, 48, ORCHID, 0.45)}${textRow(510, 134, 32, ORCHID, 0.25)}
       ${textRow(510, 176, 48, ORCHID, 0.45)}${textRow(510, 192, 32, ORCHID, 0.25)}
       ${textRow(510, 232, 48, ORCHID, 0.45)}`,
    ].join("\n");
  },

  /** Internal AI assistant — processor chip over a document stack. */
  "internal-ai-assistant": () => {
    const pins = [];
    for (let i = 0; i < 4; i += 1) {
      const o = i * 26;
      pins.push(
        `<path d="M ${180 + o} 92 v -22" stroke="${SKY}" stroke-opacity="0.7" stroke-width="2.4" stroke-linecap="round" />`,
        `<path d="M ${180 + o} 212 v 22" stroke="${SKY}" stroke-opacity="0.7" stroke-width="2.4" stroke-linecap="round" />`,
        `<path d="M 150 ${124 + o} h -22" stroke="${ORCHID}" stroke-opacity="0.7" stroke-width="2.4" stroke-linecap="round" />`,
        `<path d="M 288 ${124 + o} h 22" stroke="${ORCHID}" stroke-opacity="0.7" stroke-width="2.4" stroke-linecap="round" />`,
      );
    }
    return [
      backdrop(W, H, [
        [160, 160, 160, "violet"],
        [520, 240, 160, "blue"],
      ]),
      `<rect x="150" y="92" width="138" height="120" rx="20" fill="url(#glass)" stroke="url(#stroke)" stroke-width="2.4" />
       <rect x="178" y="120" width="82" height="64" rx="12" fill="none" stroke="${ORCHID}" stroke-opacity="0.8" stroke-width="2" />
       <circle cx="219" cy="152" r="9" fill="${ORCHID}" fill-opacity="0.9" />`,
      ...pins,
      ...[0, 1, 2].map(
        (i) => `<g transform="translate(${372 + i * 10} ${118 + i * 34})">
          <rect width="150" height="74" rx="12" fill="url(#glass)" stroke="${SKY}" stroke-opacity="${0.35 + i * 0.15}" stroke-width="1.6" />
          ${textRow(16, 18, 104, SKY, 0.35)}${textRow(16, 34, 76, SKY, 0.22)}${textRow(16, 50, 92, SKY, 0.18)}
        </g>`,
      ),
      link(300, 152, 366, 152, { dashed: true }),
    ].join("\n");
  },

  /** Weekly reporting — bar + line chart with a digest card. */
  "automated-weekly-reporting": () => {
    const bars = [48, 96, 70, 126, 104, 150, 118].map((h, i) => {
      const x = 86 + i * 38;
      return `<rect x="${x}" y="${250 - h}" width="22" height="${h}" rx="7"
        fill="url(#stroke)" fill-opacity="${0.45 + i * 0.07}" />`;
    });
    return [
      backdrop(W, H, [
        [110, 110, 150, "blue"],
        [520, 270, 160, "violet"],
      ]),
      panel(58, 70, 300, 220, 18),
      ...bars,
      `<path d="M 97 196 L 135 162 L 173 178 L 211 126 L 249 148 L 287 104 L 325 122"
        stroke="${ORCHID}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />`,
      ...[97, 135, 173, 211, 249, 287, 325].map(
        (x, i) =>
          `<circle cx="${x}" cy="${[196, 162, 178, 126, 148, 104, 122][i]}" r="3.4" fill="${ORCHID}" />`,
      ),
      `<path d="M 58 250 h 300" stroke="${SKY}" stroke-opacity="0.3" stroke-width="1.3" />`,
      panel(390, 104, 192, 152, 16),
      textRow(410, 126, 110, SKY, 0.55, 7),
      textRow(410, 150, 150, SKY, 0.25),
      textRow(410, 166, 124, SKY, 0.25),
      textRow(410, 182, 142, SKY, 0.25),
      `<rect x="410" y="206" width="90" height="26" rx="13" fill="url(#stroke)" fill-opacity="0.85" />`,
      link(362, 180, 386, 180, { dashed: true }),
    ].join("\n");
  },
};

/* -------------------------------------------------------------------------- */
/* Page backgrounds (1600 x 900)                                               */
/* -------------------------------------------------------------------------- */

const BW = 1600;
const BH = 900;

function networkBackground() {
  const points = [
    [160, 200],
    [360, 120],
    [560, 260],
    [760, 150],
    [980, 280],
    [1200, 160],
    [1400, 300],
    [240, 460],
    [470, 520],
    [700, 430],
    [920, 560],
    [1150, 470],
    [1360, 600],
    [320, 740],
    [560, 680],
    [820, 770],
    [1060, 700],
    [1300, 800],
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [0, 7],
    [7, 8],
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [7, 13],
    [13, 14],
    [14, 15],
    [15, 16],
    [16, 17],
    [2, 8],
    [4, 10],
    [6, 12],
    [9, 3],
    [11, 5],
  ];
  const lines = edges
    .map(([a, b]) =>
      link(points[a][0], points[a][1], points[b][0], points[b][1], {
        dashed: true,
      }),
    )
    .join("\n  ");
  const nodes = points
    .map(([x, y], i) =>
      node(x, y, i % 3 === 0 ? 9 : 6, i % 4 === 0 ? ORCHID : SKY),
    )
    .join("\n  ");
  const chips = [
    [420, 330],
    [900, 380],
    [1180, 630],
  ]
    .map(
      ([x, y]) => `<g>
        <rect x="${x}" y="${y}" width="150" height="96" rx="20" fill="url(#glass)" stroke="url(#stroke)" stroke-width="2" />
        <rect x="${x + 28}" y="${y + 24}" width="94" height="48" rx="12" fill="none" stroke="${ORCHID}" stroke-opacity="0.65" stroke-width="1.8" />
      </g>`,
    )
    .join("\n  ");
  return [
    backdrop(BW, BH, [
      [240, 180, 420, "blue"],
      [1280, 260, 480, "violet"],
      [760, 820, 420, "blue"],
    ]),
    lines,
    chips,
    nodes,
  ].join("\n");
}

function socialBackground() {
  const calendar = [];
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 6; c += 1) {
      const x = 150 + c * 78;
      const y = 240 + r * 70;
      const on = (r + c) % 5 === 0;
      calendar.push(
        `<rect x="${x}" y="${y}" width="58" height="50" rx="10"
          fill="${on ? VIOLET : "#0B1030"}" fill-opacity="${on ? 0.65 : 0.55}"
          stroke="${on ? ORCHID : SKY}" stroke-opacity="${on ? 0.9 : 0.26}" stroke-width="1.4" />`,
      );
    }
  }
  const tiles = [0, 1, 2].map(
    (i) => `<g transform="translate(${700 + i * 190} ${180 + (i % 2) * 90})">
      <rect width="168" height="200" rx="22" fill="url(#glass)" stroke="${SKY}" stroke-opacity="0.4" stroke-width="2" />
      <rect x="16" y="16" width="136" height="104" rx="14" fill="url(#stroke)" fill-opacity="0.22" />
      ${textRow(16, 136, 120, SKY, 0.35, 7)}${textRow(16, 154, 86, SKY, 0.22, 7)}
      <circle cx="28" cy="180" r="7" fill="none" stroke="${ORCHID}" stroke-width="1.8" />
      <circle cx="54" cy="180" r="7" fill="none" stroke="${ORCHID}" stroke-width="1.8" />
    </g>`,
  );
  const bars = [70, 120, 90, 160, 130, 190].map((h, i) => {
    const x = 1180 + i * 54;
    return `<rect x="${x}" y="${760 - h}" width="30" height="${h}" rx="10" fill="url(#stroke)" fill-opacity="${0.35 + i * 0.09}" />`;
  });
  return [
    backdrop(BW, BH, [
      [300, 220, 420, "blue"],
      [1240, 200, 460, "violet"],
      [820, 840, 420, "violet"],
    ]),
    panel(120, 160, 520, 360, 28),
    `<path d="M 120 220 h 520" stroke="${SKY}" stroke-opacity="0.26" stroke-width="1.4" />`,
    ...calendar,
    ...tiles,
    bubble(200, 640, 260, 92, { lines: 3 }),
    bubble(520, 700, 230, 82, { flip: true, color: ORCHID, lines: 2 }),
    ...bars,
    node(1000, 620, 9, ORCHID),
    node(880, 120, 8),
  ].join("\n");
}

function cardsBackground() {
  const perspective = [];
  for (let i = 0; i <= 14; i += 1) {
    const x = i * (BW / 14);
    perspective.push(
      `<path d="M ${x} 900 L ${BW / 2 + (x - BW / 2) * 0.22} 560" stroke="${ORCHID}" stroke-opacity="0.14" stroke-width="1.4" />`,
    );
  }
  for (let i = 1; i <= 7; i += 1) {
    const y = 560 + Math.pow(i / 7, 2.2) * 340;
    perspective.push(
      `<path d="M 0 ${y} H ${BW}" stroke="${ORCHID}" stroke-opacity="0.12" stroke-width="1.4" />`,
    );
  }
  const card = (
    x,
    y,
    rot,
    accent,
  ) => `<g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="-150" y="-94" width="300" height="188" rx="22" fill="url(#glass)" stroke="${accent}" stroke-opacity="0.8" stroke-width="2.4" />
    <rect x="-150" y="-94" width="300" height="188" rx="22" fill="url(#stroke)" fill-opacity="0.08" />
    ${textRow(-118, -50, 140, accent, 0.4, 8)}
    ${textRow(-118, -26, 92, accent, 0.25, 7)}
    <circle cx="96" cy="52" r="22" fill="none" stroke="${accent}" stroke-opacity="0.55" stroke-width="1.8" />
  </g>`;
  const waves = [40, 72, 106, 142].map(
    (r, i) =>
      `<path d="M ${1180 + r * 0.0} ${400} m ${-r} 0 a ${r} ${r} 0 0 1 ${r * 2} 0"
        transform="rotate(-90 1180 400)" stroke="${ORCHID}" stroke-opacity="${0.55 - i * 0.1}"
        stroke-width="${3 - i * 0.4}" fill="none" stroke-linecap="round" />`,
  );
  return [
    backdrop(BW, BH, [
      [320, 260, 420, "violet"],
      [1240, 320, 460, "blue"],
      [800, 860, 400, "violet"],
    ]),
    ...perspective,
    card(430, 330, -9, SKY),
    card(760, 430, 6, ORCHID),
    ...waves,
    node(1180, 400, 10, ORCHID),
    node(260, 640, 7),
    node(1420, 720, 7, ORCHID),
  ].join("\n");
}

function homeBackground() {
  return [
    backdrop(BW, BH, [
      [280, 200, 440, "blue"],
      [1300, 260, 460, "violet"],
      [700, 800, 420, "blue"],
    ]),
    link(180, 300, 520, 220),
    link(520, 220, 860, 340),
    link(860, 340, 1220, 250),
    link(1220, 250, 1460, 420),
    link(240, 640, 620, 560),
    link(620, 560, 980, 680),
    link(980, 680, 1340, 580),
    node(180, 300, 8),
    node(520, 220, 7, ORCHID),
    node(860, 340, 9),
    node(1220, 250, 7, ORCHID),
    node(1460, 420, 6),
    node(240, 640, 6, ORCHID),
    node(620, 560, 8),
    node(980, 680, 7, ORCHID),
    node(1340, 580, 6),
    panel(620, 340, 360, 200, 28, 0.8),
    `<rect x="660" y="384" width="180" height="10" rx="5" fill="${SKY}" fill-opacity="0.35" />
     <rect x="660" y="410" width="120" height="10" rx="5" fill="${ORCHID}" fill-opacity="0.3" />
     <rect x="660" y="462" width="110" height="34" rx="17" fill="url(#stroke)" fill-opacity="0.8" />`,
  ].join("\n");
}

/* -------------------------------------------------------------------------- */
/* Write everything                                                            */
/* -------------------------------------------------------------------------- */

function write(relativePath, contents) {
  const target = join(ROOT, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents, "utf8");
  console.log("wrote", relativePath);
}

for (const [slug, build] of Object.entries(thumbnails)) {
  write(
    `public/images/automations/${slug}.svg`,
    svg(W, H, build(), { dotSize: 22, dotOpacity: 0.16 }),
  );
}

write(
  "public/images/backgrounds/automations.svg",
  svg(BW, BH, networkBackground(), { dotSize: 34, dotOpacity: 0.12 }),
);
write(
  "public/images/backgrounds/social-media.svg",
  svg(BW, BH, socialBackground(), { dotSize: 34, dotOpacity: 0.12 }),
);
write(
  "public/images/backgrounds/cards.svg",
  svg(BW, BH, cardsBackground(), { dotSize: 34, dotOpacity: 0.1 }),
);
write(
  "public/images/backgrounds/home.svg",
  svg(BW, BH, homeBackground(), { dotSize: 34, dotOpacity: 0.1 }),
);

console.log("\nArtwork generated.");
