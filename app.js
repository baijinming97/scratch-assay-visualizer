const translations = {
  zh: {
    documentTitle: "划痕分析",
    appTitle: "划痕分析",
    subtitle: "选择开始时间和结束时间的绿色 gap mask 图，生成居中配准后的迁移区域高亮。",
    runButton: "生成",
    downloadPngButton: "下载 overlap PNG",
    guideLink: "教程",
    startImageLabel: "开始时间图片",
    endImageLabel: "结束时间图片",
    endOffsetLabel: "结束时间位置",
    endOffsetReset: "重置",
    endOffsetLeftLabel: "结束时间位置左移",
    endOffsetRightLabel: "结束时间位置右移",
    advancedSummary: "高级参数",
    thresholdLabel: "绿色阈值",
    minRunLabel: "最小连续宽度",
    startMaskHeader: "开始时间 mask",
    endMaskHeader: "结束时间 mask",
    resultHeader: "Overlap 结果",
    startGapMetric: "开始 gap",
    endGapMetric: "结束 gap",
    migrationMetric: "迁移比例",
    netMetric: "净变化",
    lrMetric: "左右分布",
    dxMetric: "中心校正",
    emptySelection: "未选择",
    initialStatus: "选择两张图片后生成迁移高亮。一般不需要手动调参；需要时展开高级参数微调绿色 mask 提取。",
    imageLoadedStatus: "图片已读取，选择另一张后即可生成。",
    readyStatus: "已选择两张图片，可以生成迁移高亮。",
    processingStatus: "正在提取 mask 并做中心配准...",
    doneStatus: "完成：下方 overlap 图中，橙色为开始时间 gap 减去结束时间 gap 的迁移区域，绿色线为结束时间剩余 gap 边界。",
    chooseImageError: "请选择 PNG、JPG 或 WebP 图片。",
    imageReadError: "图片读取失败，请换成 PNG、JPG 或 WebP。",
    missingImagesError: "请先选择开始时间和结束时间图片。",
    noMaskError: "没有检测到足够稳定的绿色 gap mask，请检查图片或展开高级参数微调阈值。",
    dimensionMismatch: ({ start, end }) =>
      `两张图的有效面板尺寸不一致：开始 ${start}，结束 ${end}。请先用同一倍率和裁剪导出。`,
  },
  en: {
    documentTitle: "Scratch Assay Analysis",
    appTitle: "Scratch Assay Analysis",
    subtitle: "Select start-time and end-time green gap-mask images to highlight the center-aligned migration area.",
    runButton: "Generate",
    downloadPngButton: "Download overlap PNG",
    guideLink: "Guide",
    startImageLabel: "Start-time image",
    endImageLabel: "End-time image",
    endOffsetLabel: "End-time position",
    endOffsetReset: "Reset",
    endOffsetLeftLabel: "Move end-time position left",
    endOffsetRightLabel: "Move end-time position right",
    advancedSummary: "Advanced settings",
    thresholdLabel: "Green threshold",
    minRunLabel: "Minimum run width",
    startMaskHeader: "Start-time mask",
    endMaskHeader: "End-time mask",
    resultHeader: "Overlap result",
    startGapMetric: "Start gap",
    endGapMetric: "End gap",
    migrationMetric: "Migration ratio",
    netMetric: "Net change",
    lrMetric: "Left / right",
    dxMetric: "Center shift",
    emptySelection: "No file selected",
    initialStatus: "Choose two images to generate the migration overlay. Manual tuning is usually unnecessary; expand advanced settings only if the green mask extraction needs adjustment.",
    imageLoadedStatus: "Image loaded. Choose the other image to generate the overlay.",
    readyStatus: "Two images selected. Ready to generate the migration overlay.",
    processingStatus: "Extracting masks and center-aligning them...",
    doneStatus: "Done: in the overlap result, orange marks the start-time gap minus the end-time gap; the green line marks the remaining end-time gap boundary.",
    chooseImageError: "Please choose a PNG, JPG, or WebP image.",
    imageReadError: "Could not read the image. Please use PNG, JPG, or WebP.",
    missingImagesError: "Please choose both start-time and end-time images first.",
    noMaskError: "No stable green gap mask was detected. Check the image or expand advanced settings to adjust the threshold.",
    dimensionMismatch: ({ start, end }) =>
      `The effective panel sizes do not match: start ${start}, end ${end}. Export both images with the same magnification and crop.`,
  },
};

const els = {
  langZhButton: document.getElementById("langZhButton"),
  langEnButton: document.getElementById("langEnButton"),
  runButton: document.getElementById("runButton"),
  downloadButton: document.getElementById("downloadButton"),
  startImageInput: document.getElementById("startImageInput"),
  endImageInput: document.getElementById("endImageInput"),
  startImageName: document.getElementById("startImageName"),
  endImageName: document.getElementById("endImageName"),
  thresholdInput: document.getElementById("thresholdInput"),
  thresholdValue: document.getElementById("thresholdValue"),
  minRunInput: document.getElementById("minRunInput"),
  minRunValue: document.getElementById("minRunValue"),
  endOffsetLeftButton: document.getElementById("endOffsetLeftButton"),
  endOffsetRightButton: document.getElementById("endOffsetRightButton"),
  endOffsetResetButton: document.getElementById("endOffsetResetButton"),
  endOffsetValue: document.getElementById("endOffsetValue"),
  startCanvas: document.getElementById("startCanvas"),
  endCanvas: document.getElementById("endCanvas"),
  resultCanvas: document.getElementById("resultCanvas"),
  startAreaMetric: document.getElementById("startAreaMetric"),
  endAreaMetric: document.getElementById("endAreaMetric"),
  migrationMetric: document.getElementById("migrationMetric"),
  netMetric: document.getElementById("netMetric"),
  lrMetric: document.getElementById("lrMetric"),
  dxMetric: document.getElementById("dxMetric"),
  status: document.getElementById("status"),
};

const state = {
  lang: "en",
  startImage: null,
  endImage: null,
  endOffset: 0,
  resultCanvas: null,
  status: { key: "initialStatus", args: null, isError: false },
};

const END_OFFSET_STEP = 2;

initialize();

function initialize() {
  els.thresholdValue.textContent = els.thresholdInput.value;
  els.minRunValue.textContent = `${els.minRunInput.value} px`;

  els.langZhButton.addEventListener("click", () => setLanguage("zh"));
  els.langEnButton.addEventListener("click", () => setLanguage("en"));
  els.startImageInput.addEventListener("change", () => handleImageChange("start"));
  els.endImageInput.addEventListener("change", () => handleImageChange("end"));
  els.endOffsetLeftButton.addEventListener("click", () => adjustEndOffset(-END_OFFSET_STEP));
  els.endOffsetRightButton.addEventListener("click", () => adjustEndOffset(END_OFFSET_STEP));
  els.endOffsetResetButton.addEventListener("click", () => setEndOffset(0));
  els.thresholdInput.addEventListener("input", () => {
    els.thresholdValue.textContent = els.thresholdInput.value;
  });
  els.minRunInput.addEventListener("input", () => {
    els.minRunValue.textContent = `${els.minRunInput.value} px`;
  });
  els.runButton.addEventListener("click", runAnalysis);
  els.downloadButton.addEventListener("click", () => {
    if (state.resultCanvas) {
      downloadCanvas(state.resultCanvas, "scratch-overlap-result.png");
    }
  });

  updateEndOffsetValue();
  setLanguage("en");
  resetMetrics();
  updateRunState();
  loadDemoIfRequested();
}

function tr(key, args = null) {
  const value = translations[state.lang][key];
  return typeof value === "function" ? value(args || {}) : value;
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = tr("documentTitle");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = tr(node.dataset.i18n);
  });

  document.querySelectorAll("[data-empty-label='true']").forEach((node) => {
    if (!node.dataset.fileName) {
      node.textContent = tr("emptySelection");
    }
  });

  [els.langZhButton, els.langEnButton].forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  els.endOffsetLeftButton.setAttribute("aria-label", tr("endOffsetLeftLabel"));
  els.endOffsetLeftButton.setAttribute("title", tr("endOffsetLeftLabel"));
  els.endOffsetRightButton.setAttribute("aria-label", tr("endOffsetRightLabel"));
  els.endOffsetRightButton.setAttribute("title", tr("endOffsetRightLabel"));

  renderStatus();
}

function setStatusKey(key, args = null, isError = false) {
  state.status = { key, args, isError };
  renderStatus();
}

function renderStatus() {
  els.status.textContent = tr(state.status.key, state.status.args);
  els.status.classList.toggle("is-error", state.status.isError);
}

function adjustEndOffset(delta) {
  setEndOffset(state.endOffset + delta);
}

function setEndOffset(value) {
  state.endOffset = clamp(Math.round(value), -120, 120);
  updateEndOffsetValue();
  if (state.startImage && state.endImage) {
    runAnalysis();
  }
}

function updateEndOffsetValue() {
  els.endOffsetValue.textContent = `${formatOffset(state.endOffset)} px`;
}

async function handleImageChange(kind) {
  const input = kind === "start" ? els.startImageInput : els.endImageInput;
  const nameEl = kind === "start" ? els.startImageName : els.endImageName;
  const file = input.files && input.files[0];

  state.resultCanvas = null;
  els.downloadButton.disabled = true;
  resetMetrics();
  clearCanvas(els.resultCanvas);
  state.endOffset = 0;
  updateEndOffsetValue();

  if (!file) {
    setImageState(kind, null);
    nameEl.dataset.fileName = "";
    nameEl.textContent = tr("emptySelection");
    updateRunState();
    return;
  }

  if (file.type && !file.type.startsWith("image/")) {
    setImageState(kind, null);
    nameEl.dataset.fileName = "";
    nameEl.textContent = tr("emptySelection");
    setStatusKey("chooseImageError", null, true);
    updateRunState();
    return;
  }

  try {
    const bitmap = await loadBitmap(file);
    setImageState(kind, { bitmap, name: file.name });
    nameEl.dataset.fileName = file.name;
    nameEl.textContent = file.name;
    drawOriginalPreview(bitmap, kind === "start" ? els.startCanvas : els.endCanvas);
    setStatusKey(state.startImage && state.endImage ? "readyStatus" : "imageLoadedStatus");
  } catch (error) {
    console.error(error);
    setImageState(kind, null);
    nameEl.dataset.fileName = "";
    nameEl.textContent = tr("emptySelection");
    setStatusKey("imageReadError", null, true);
  }

  updateRunState();
}

function setImageState(kind, imageState) {
  if (kind === "start") {
    state.startImage = imageState;
    if (!imageState) {
      clearCanvas(els.startCanvas);
    }
  } else {
    state.endImage = imageState;
    if (!imageState) {
      clearCanvas(els.endCanvas);
    }
  }
}

function updateRunState() {
  els.runButton.disabled = !(state.startImage && state.endImage);
}

async function loadBitmap(file) {
  if ("createImageBitmap" in window) {
    return createImageBitmap(file);
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image load failed"));
    };
    image.src = url;
  });
}

async function loadDemoIfRequested() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("demo") !== "1") {
    return;
  }

  try {
    setStatusKey("processingStatus");
    const [startBitmap, endBitmap] = await Promise.all([
      loadBitmapFromUrl("./samples/demo-start.png"),
      loadBitmapFromUrl("./samples/demo-end.png"),
    ]);

    state.startImage = { bitmap: startBitmap, name: "demo-start.png" };
    state.endImage = { bitmap: endBitmap, name: "demo-end.png" };
    els.startImageName.dataset.fileName = "demo-start.png";
    els.startImageName.textContent = "demo-start.png";
    els.endImageName.dataset.fileName = "demo-end.png";
    els.endImageName.textContent = "demo-end.png";
    state.endOffset = 0;
    updateEndOffsetValue();
    drawOriginalPreview(startBitmap, els.startCanvas);
    drawOriginalPreview(endBitmap, els.endCanvas);
    updateRunState();
    runAnalysis();
  } catch (error) {
    console.error(error);
    setStatusKey("imageReadError", null, true);
  }
}

async function loadBitmapFromUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load ${url}`);
  }
  const blob = await response.blob();
  return loadBitmap(blob);
}

function runAnalysis() {
  if (!state.startImage || !state.endImage) {
    setStatusKey("missingImagesError", null, true);
    return;
  }

  setStatusKey("processingStatus");

  try {
    const options = {
      threshold: Number(els.thresholdInput.value),
      minRun: Number(els.minRunInput.value),
    };
    const startPanel = getEffectivePanel(state.startImage.bitmap, options.threshold);
    const endPanel = getEffectivePanel(state.endImage.bitmap, options.threshold);

    if (startPanel.width !== endPanel.width || startPanel.height !== endPanel.height) {
      setStatusKey(
        "dimensionMismatch",
        {
          start: `${startPanel.width} x ${startPanel.height}`,
          end: `${endPanel.width} x ${endPanel.height}`,
        },
        true,
      );
      return;
    }

    const startRawMask = extractGreenMask(startPanel.imageData, options.threshold);
    const endRawMask = extractGreenMask(endPanel.imageData, options.threshold);
    const startSpans = buildStableSpans(startRawMask, startPanel.width, startPanel.height, options.minRun);
    const endSpans = buildStableSpans(endRawMask, endPanel.width, endPanel.height, options.minRun);

    ensureMaskDetected(startSpans, endSpans);

    const dxRows = smoothNumericRows(
      fillNumericRows(estimateCenterShiftRows(startSpans, endSpans), startPanel.height),
      5,
    ).map((dx) => dx + state.endOffset);
    const alignedStartSpans = shiftSpansByRows(startSpans, dxRows, startPanel.width);
    const alignedStartMask = spansToMask(alignedStartSpans, startPanel.width, startPanel.height);
    const endMask = spansToMask(endSpans, endPanel.width, endPanel.height);
    const endBoundary = spansToBoundary(endSpans, endPanel.width, endPanel.height);
    const migrationMask = subtractMask(alignedStartMask, endMask);

    drawMaskPreview(startPanel.imageData, alignedStartMask, els.startCanvas);
    drawMaskPreview(endPanel.imageData, endMask, els.endCanvas);
    const overlay = renderOverlay(endPanel.imageData, migrationMask, endBoundary);
    drawImageDataToCanvas(els.resultCanvas, overlay);

    state.resultCanvas = els.resultCanvas;
    els.downloadButton.disabled = false;
    updateMetrics(
      computeMetrics(alignedStartMask, endMask, migrationMask, alignedStartSpans, dxRows, startPanel.width, startPanel.height),
    );
    setStatusKey("doneStatus");
  } catch (error) {
    console.error(error);
    if (error.name === "NoMaskError") {
      setStatusKey("noMaskError", null, true);
    } else {
      setStatusKey("imageReadError", null, true);
    }
  }
}

function getEffectivePanel(image, threshold) {
  const canvas = document.createElement("canvas");
  const width = image.width;
  const height = image.height;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0);

  if (width / height > 1.7) {
    const mid = Math.floor(width / 2);
    const left = ctx.getImageData(0, 0, mid, height);
    const right = ctx.getImageData(mid, 0, width - mid, height);
    const leftGreen = countGreenPixels(left, threshold);
    const rightGreen = countGreenPixels(right, threshold);

    if (rightGreen > 200 && rightGreen > leftGreen * 1.25) {
      return {
        imageData: right,
        width: right.width,
        height: right.height,
      };
    }
  }

  const imageData = ctx.getImageData(0, 0, width, height);
  return { imageData, width, height };
}

function countGreenPixels(imageData, threshold) {
  const data = imageData.data;
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (isGreenPixel(data[i], data[i + 1], data[i + 2], data[i + 3], threshold)) {
      count += 1;
    }
  }
  return count;
}

function extractGreenMask(imageData, threshold) {
  const { data, width, height } = imageData;
  const mask = new Uint8Array(width * height);
  for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
    mask[p] = isGreenPixel(data[i], data[i + 1], data[i + 2], data[i + 3], threshold) ? 1 : 0;
  }
  return mask;
}

function isGreenPixel(r, g, b, a, threshold) {
  return a > 16 && g > 40 && g - Math.max(r, b) > threshold;
}

function buildStableSpans(mask, width, height, minRun) {
  const raw = extractRowSpans(mask, width, height, minRun);
  const filled = fillMissingSpans(raw, height);
  return smoothSpans(filled, width, 4);
}

function extractRowSpans(mask, width, height, minRun) {
  const spans = new Array(height).fill(null);

  for (let y = 0; y < height; y += 1) {
    let first = null;
    let last = null;
    let x = 0;

    while (x < width) {
      while (x < width && !mask[y * width + x]) {
        x += 1;
      }
      const start = x;
      while (x < width && mask[y * width + x]) {
        x += 1;
      }
      const end = x - 1;

      if (end >= start && end - start + 1 >= minRun) {
        first = first === null ? start : Math.min(first, start);
        last = last === null ? end : Math.max(last, end);
      }
    }

    if (first !== null && last !== null) {
      spans[y] = { left: first, right: last };
    }
  }

  return spans;
}

function fillMissingSpans(spans, height) {
  const filled = spans.map((span) => (span ? { ...span } : null));
  const validRows = [];

  for (let y = 0; y < height; y += 1) {
    if (spans[y]) {
      validRows.push(y);
    }
  }

  if (!validRows.length) {
    return filled;
  }

  for (let i = 0; i < validRows.length - 1; i += 1) {
    const y0 = validRows[i];
    const y1 = validRows[i + 1];
    const a = spans[y0];
    const b = spans[y1];

    for (let y = y0 + 1; y < y1; y += 1) {
      const t = (y - y0) / (y1 - y0);
      filled[y] = {
        left: Math.round(lerp(a.left, b.left, t)),
        right: Math.round(lerp(a.right, b.right, t)),
      };
    }
  }

  return filled;
}

function smoothSpans(spans, width, radius) {
  return spans.map((span, y) => {
    if (!span) {
      return null;
    }

    let leftSum = 0;
    let rightSum = 0;
    let count = 0;

    for (let yy = Math.max(0, y - radius); yy <= Math.min(spans.length - 1, y + radius); yy += 1) {
      if (spans[yy]) {
        leftSum += spans[yy].left;
        rightSum += spans[yy].right;
        count += 1;
      }
    }

    const left = clamp(Math.round(leftSum / count), 0, width - 1);
    const right = clamp(Math.round(rightSum / count), left, width - 1);
    return { left, right };
  });
}

function estimateCenterShiftRows(startSpans, endSpans) {
  return startSpans.map((start, y) => {
    const end = endSpans[y];
    if (!start || !end) {
      return null;
    }
    const startCenter = (start.left + start.right) / 2;
    const endCenter = (end.left + end.right) / 2;
    return endCenter - startCenter;
  });
}

function fillNumericRows(values, height) {
  const filled = values.slice();
  const validRows = [];

  for (let y = 0; y < height; y += 1) {
    if (Number.isFinite(values[y])) {
      validRows.push(y);
    }
  }

  if (!validRows.length) {
    return new Array(height).fill(0);
  }

  for (let y = 0; y < validRows[0]; y += 1) {
    filled[y] = values[validRows[0]];
  }
  for (let y = validRows[validRows.length - 1] + 1; y < height; y += 1) {
    filled[y] = values[validRows[validRows.length - 1]];
  }

  for (let i = 0; i < validRows.length - 1; i += 1) {
    const y0 = validRows[i];
    const y1 = validRows[i + 1];
    for (let y = y0 + 1; y < y1; y += 1) {
      const t = (y - y0) / (y1 - y0);
      filled[y] = lerp(values[y0], values[y1], t);
    }
  }

  return filled;
}

function smoothNumericRows(values, radius) {
  return values.map((value, y) => {
    let sum = 0;
    let count = 0;
    for (let yy = Math.max(0, y - radius); yy <= Math.min(values.length - 1, y + radius); yy += 1) {
      if (Number.isFinite(values[yy])) {
        sum += values[yy];
        count += 1;
      }
    }
    return count ? sum / count : value;
  });
}

function shiftSpansByRows(spans, dxRows, width) {
  return spans.map((span, y) => {
    if (!span) {
      return null;
    }
    const dx = Math.round(dxRows[y] || 0);
    const left = clamp(span.left + dx, 0, width - 1);
    const right = clamp(span.right + dx, left, width - 1);
    return { left, right };
  });
}

function spansToMask(spans, width, height) {
  const mask = new Uint8Array(width * height);
  for (let y = 0; y < height; y += 1) {
    const span = spans[y];
    if (!span) {
      continue;
    }
    const row = y * width;
    for (let x = span.left; x <= span.right; x += 1) {
      mask[row + x] = 1;
    }
  }
  return mask;
}

function spansToBoundary(spans, width, height) {
  const boundary = new Uint8Array(width * height);
  for (let y = 0; y < height; y += 1) {
    const span = spans[y];
    if (!span) {
      continue;
    }
    for (let offset = -1; offset <= 1; offset += 1) {
      const left = clamp(span.left + offset, 0, width - 1);
      const right = clamp(span.right + offset, 0, width - 1);
      boundary[y * width + left] = 1;
      boundary[y * width + right] = 1;
    }
  }
  return boundary;
}

function subtractMask(startMask, endMask) {
  const out = new Uint8Array(startMask.length);
  for (let i = 0; i < startMask.length; i += 1) {
    out[i] = startMask[i] && !endMask[i] ? 1 : 0;
  }
  return out;
}

function ensureMaskDetected(startSpans, endSpans) {
  const startRows = startSpans.filter(Boolean).length;
  const endRows = endSpans.filter(Boolean).length;
  if (startRows < startSpans.length * 0.15 || endRows < endSpans.length * 0.15) {
    const error = new Error("No stable mask");
    error.name = "NoMaskError";
    throw error;
  }
}

function drawOriginalPreview(image, canvas) {
  const preview = document.createElement("canvas");
  preview.width = image.width;
  preview.height = image.height;
  const ctx = preview.getContext("2d");
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, preview.width, preview.height);
  drawImageDataToCanvas(canvas, grayscaleImageData(imageData));
}

function drawMaskPreview(imageData, mask, canvas) {
  const preview = grayscaleImageData(imageData);
  const data = preview.data;

  for (let p = 0, i = 0; p < mask.length; p += 1, i += 4) {
    if (mask[p]) {
      blendPixel(data, i, [38, 217, 97], 0.55);
    }
  }

  drawImageDataToCanvas(canvas, preview);
}

function renderOverlay(imageData, migrationMask, boundaryMask) {
  const output = grayscaleImageData(imageData);
  const data = output.data;

  for (let p = 0, i = 0; p < migrationMask.length; p += 1, i += 4) {
    if (migrationMask[p]) {
      blendPixel(data, i, [230, 117, 47], 0.72);
    }
    if (boundaryMask[p]) {
      data[i] = 38;
      data[i + 1] = 217;
      data[i + 2] = 97;
      data[i + 3] = 255;
    }
  }

  return output;
}

function grayscaleImageData(imageData) {
  const copy = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
  const data = copy.data;

  for (let i = 0; i < data.length; i += 4) {
    const gray = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
    data[i + 3] = 255;
  }

  return copy;
}

function blendPixel(data, index, color, alpha) {
  data[index] = Math.round(data[index] * (1 - alpha) + color[0] * alpha);
  data[index + 1] = Math.round(data[index + 1] * (1 - alpha) + color[1] * alpha);
  data[index + 2] = Math.round(data[index + 2] * (1 - alpha) + color[2] * alpha);
  data[index + 3] = 255;
}

function drawImageDataToCanvas(canvas, imageData) {
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  canvas.getContext("2d").putImageData(imageData, 0, 0);
}

function clearCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.removeAttribute("width");
  canvas.removeAttribute("height");
}

function computeMetrics(startMask, endMask, migrationMask, alignedStartSpans, dxRows, width, height) {
  const totalPixels = width * height;
  const startGapPixels = countMask(startMask);
  const endGapPixels = countMask(endMask);
  const migratedPixels = countMask(migrationMask);
  let leftPixels = 0;
  let rightPixels = 0;

  for (let y = 0; y < height; y += 1) {
    const span = alignedStartSpans[y];
    const center = span ? (span.left + span.right) / 2 : width / 2;
    for (let x = 0; x < width; x += 1) {
      if (migrationMask[y * width + x]) {
        if (x < center) {
          leftPixels += 1;
        } else {
          rightPixels += 1;
        }
      }
    }
  }

  const dxAvg = dxRows.reduce((sum, value) => sum + value, 0) / dxRows.length;
  return {
    startGapPct: (startGapPixels / totalPixels) * 100,
    endGapPct: (endGapPixels / totalPixels) * 100,
    netPp: ((startGapPixels - endGapPixels) / totalPixels) * 100,
    migratedOfStartPct: startGapPixels ? (migratedPixels / startGapPixels) * 100 : 0,
    leftOfMigratedPct: migratedPixels ? (leftPixels / migratedPixels) * 100 : 0,
    rightOfMigratedPct: migratedPixels ? (rightPixels / migratedPixels) * 100 : 0,
    dxAvg,
  };
}

function updateMetrics(metrics) {
  els.startAreaMetric.textContent = `${formatNumber(metrics.startGapPct)}%`;
  els.endAreaMetric.textContent = `${formatNumber(metrics.endGapPct)}%`;
  els.migrationMetric.textContent = `${formatNumber(metrics.migratedOfStartPct)}%`;
  els.netMetric.textContent = `${formatSigned(metrics.netPp)} pp`;
  els.lrMetric.textContent = `${formatNumber(metrics.leftOfMigratedPct, 0)} / ${formatNumber(metrics.rightOfMigratedPct, 0)}%`;
  els.dxMetric.textContent = `${formatSigned(metrics.dxAvg)} px`;
}

function resetMetrics() {
  [
    els.startAreaMetric,
    els.endAreaMetric,
    els.migrationMetric,
    els.netMetric,
    els.lrMetric,
    els.dxMetric,
  ].forEach((node) => {
    node.textContent = "-";
  });
}

function countMask(mask) {
  let count = 0;
  for (let i = 0; i < mask.length; i += 1) {
    count += mask[i];
  }
  return count;
}

function formatNumber(value, digits = 1) {
  return Number.isFinite(value) ? value.toFixed(digits) : "-";
}

function formatSigned(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}`;
}

function formatOffset(value) {
  if (!Number.isFinite(value) || value === 0) {
    return "0";
  }
  return `${value > 0 ? "+" : ""}${value}`;
}

function downloadCanvas(canvas, filename) {
  canvas.toBlob((blob) => {
    if (!blob) {
      return;
    }
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, "image/png");
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
