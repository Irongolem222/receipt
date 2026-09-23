export const receipt = {
  height: 760,
  seed: 67,
};

// a wooden block: white box with plank lines
function crate(p, x, y, bw, bh) {
  p.stroke(0);
  p.strokeWeight(3);
  p.fill(255);
  p.rect(x, y, bw, bh);
  p.strokeWeight(1);
  for (let i = 8; i < bh; i += 8) {
    p.line(x + 3, y + i, x + bw - 3, y + i);
  }
}

// a simple pig face
function pig(p, cx, cy, r) {
  p.stroke(0);
  p.strokeWeight(3);
  p.fill(255);
  p.triangle(cx - r * 0.85, cy - r * 0.35, cx - r * 0.7, cy - r * 1.2, cx - r * 0.15, cy - r * 0.85);
  p.triangle(cx + r * 0.85, cy - r * 0.35, cx + r * 0.7, cy - r * 1.2, cx + r * 0.15, cy - r * 0.85);
  p.circle(cx, cy, r * 2);
  p.ellipse(cx, cy + r * 0.25, r * 0.9, r * 0.6);
  p.fill(0);
  p.circle(cx - r * 0.2, cy + r * 0.25, 4);
  p.circle(cx + r * 0.2, cy + r * 0.25, 4);
  p.circle(cx - r * 0.4, cy - r * 0.25, 8);
  p.circle(cx + r * 0.4, cy - r * 0.25, 8);
}

// one tower: pillars + beams, no roof
function tower(p, left, groundY, towerW, floors, pigFloor) {
  const floorH = 60;
  const pillar = 12;
  const beamH = 16;
  const pigR = Math.min(20, (towerW - pillar * 2) / 2 - 4);

  for (let f = 0; f < floors; f++) {
    const yBottom = groundY - f * (floorH + beamH);
    const x0 = left + p.random(-3, 3);
    crate(p, x0, yBottom - floorH, pillar, floorH);
    crate(p, x0 + towerW - pillar, yBottom - floorH, pillar, floorH);
    if (f === pigFloor) {
      pig(p, x0 + towerW / 2, yBottom - floorH / 2, pigR);
    }
    crate(p, x0 - 4, yBottom - floorH - beamH, towerW + 8, beamH);
  }
}

// a dashed line across the receipt
function dashes(p, x1, x2, y) {
  p.stroke(0);
  p.strokeWeight(2);
  for (let x = x1; x < x2; x += 10) {
    p.line(x, y, x + 5, y);
  }
}

export function drawReceipt(p) {
  const { width: w, height: h } = p;
  p.background(255);

  const margin = 24;

  // ---- receipt text ----
  const items = [
    ["1", "chuck", "7.00"],
    ["2", "Bubbles", "6.50"],
    ["3", "Matilda", "9.50"],
    ["4", "stella", "5.75"],
  ];

  p.noStroke();
  p.fill(0);
  p.textFont("Georgia");
  p.textStyle(p.BOLD);
  p.textSize(26);
  p.textAlign(p.CENTER, p.TOP);
  p.text("The Bad piggy store", w / 2, 24);

  dashes(p, margin, w - margin, 70);

  p.noStroke();
  p.fill(0);
  p.textSize(16);
  for (let i = 0; i < items.length; i++) {
    const y = 90 + i * 26;
    p.textAlign(p.LEFT, p.TOP);
    p.textStyle(p.NORMAL); // quantity and name stay normal
    p.text(items[i][0], margin, y);
    p.text(items[i][1], margin + 30, y);
    p.textAlign(p.RIGHT, p.TOP);
    p.textStyle(p.ITALIC); // only the price is italic
    p.text(items[i][2], w - margin, y);
  }

  dashes(p, margin, w - margin, 205);

  // ---- towers ----
  const groundY = h - 80;
  const towerCount = 3;
  const gap = 24;
  const towerW = (w - margin * 2 - gap * (towerCount - 1)) / towerCount;

  p.stroke(0);
  p.strokeWeight(4);
  p.line(margin, groundY, w - margin, groundY);

  for (let t = 0; t < towerCount; t++) {
    const left = margin + t * (towerW + gap);
    const floors = p.floor(p.random(4, 7)); // 4 to 6 floors
    const hasPig = p.random() < 0.7;
    const pigFloor = hasPig ? p.floor(p.random(0, floors)) : -1;
    tower(p, left, groundY, towerW, floors, pigFloor);
  }
}