const guideTranslations = {
  zh: {
    documentTitle: "Scratch Assay Visualizer 使用教程",
    title: "Scratch Assay Visualizer 使用教程",
    intro:
      "这个网页用于配合 SWEET 等工具输出的绿色划痕蒙版。你只需要导入开始时间和结束时间两张处理后的绿色蒙版，就可以生成面积变化可视化图。",
    openTool: "打开分析工具",
    workflowTitle: "一句话流程",
    workflow1: "SWEET 输出绿色蒙版",
    workflow2: "导入开始时间图片",
    workflow3: "导入结束时间图片",
    workflow4: "生成面积变化图",
    workflow5: "下载 overlap PNG",
    step1Title: "第 1 步：先在 SWEET 中处理图片",
    step1Body:
      "在 SWEET 中完成划痕区域识别后，导出带绿色 gap mask 的图片。建议每个视野保存两张：一张是开始时间，一张是结束时间。两张图应来自同一个视野、同一倍率、同一裁剪范围。",
    step1Item1: "推荐格式：PNG、JPG 或 WebP。",
    step1Item2: "如果 SWEET 或显微镜软件导出的是 TIF，请先另存为 PNG。",
    step1Item3: "绿色区域应覆盖划痕空白区域，也就是 gap。",
    step1Item4:
      '文件名建议写清楚条件、重复编号和时间，例如 <code>Control_rep1_start.png</code>、<code>Control_rep1_end.png</code>。',
    step2Title: "第 2 步：导入两张绿色蒙版",
    step2Body:
      "打开分析网页后，点击 <strong>Start-time image</strong> 选择开始时间图片，点击 <strong>End-time image</strong> 选择结束时间图片。选好两张图以后，按钮会变成可点击状态。",
    homeCaption: "初始界面：只需要先选两张 SWEET 处理后的绿色蒙版。",
    step3Title: "第 3 步：生成 overlap 面积变化图",
    step3Body:
      "点击 <strong>Generate</strong> 后，网页会自动把开始时间和结束时间的 gap 居中配准，再计算 <code>开始时间 gap - 结束时间 gap</code>。生成结果中，橙色区域就是 gap 减少的部分，可以理解为本视野内的迁移面积变化。",
    resultCaption: "演示结果：上方并排检查开始时间和结束时间 mask，下方显示合并后的 overlap 面积变化图。",
    interpretTitle: "怎么看结果",
    interpret1Title: "橙色区域",
    interpret1Body: "开始时间 gap 中已经被细胞填上的部分，即迁移面积变化。",
    interpret2Title: "绿色线",
    interpret2Body: "结束时间剩余 gap 的边界，用来确认最终划痕边缘是否合理。",
    interpret3Title: "Migration ratio",
    interpret3Body: "橙色面积占开始时间 gap 的比例，用于快速比较不同处理组。",
    interpret4Title: "Left / right",
    interpret4Body: "橙色区域在左侧和右侧的分布。若明显只偏一边，先检查图片是否同视野。",
    nudgeTitle: "什么时候需要左右微调",
    nudgeBody1:
      "正常情况下不用调。如果结果图里橙色几乎只出现在一侧，而你确认实验中两边都有迁移，可以用 <strong>End-time position</strong> 的左右箭头微调结束时间位置。每点一次移动 2 px，网页会自动重新生成结果。",
    nudgeBody2:
      "微调的目标不是让左右面积完全相等，而是让绿色边界和显微图中的结束时间 gap 边缘更合理。如果怎么调都不合理，通常说明两张图片不是同一个视野，或 SWEET 输出的绿色蒙版质量需要重新检查。",
    downloadTitle: "第 4 步：下载结果图",
    downloadBody:
      "结果满意后，点击 <strong>Download overlap PNG</strong>。下载的 PNG 只包含下方 overlap 面积变化图，可以直接放入 PPT、论文草图或实验记录。",
    faqTitle: "常见问题",
    faq1Q: "为什么按钮不能点？",
    faq1A: "通常是还没有同时选择开始时间和结束时间两张图片。",
    faq2Q: "为什么提示没有检测到绿色 mask？",
    faq2A: "请检查 SWEET 导出的 gap 是否为明显绿色。如果颜色很浅，可以展开 Advanced settings，稍微降低 Green threshold。",
    faq3Q: "可以直接导入原始显微图吗？",
    faq3A: "不建议。本工具假设输入已经带有绿色 gap mask。原始显微图应先在 SWEET 中完成划痕区域识别。",
    faq4Q: "橙色区域是否就是最终统计值？",
    faq4A: "橙色区域是可视化的迁移面积变化。定量比较时优先记录网页下方的 Migration ratio，并保持所有条件使用同一套处理流程。",
    demoTitle: "快速体验演示数据",
    demoBody: "如果第一次使用，可以先打开演示数据看看效果。演示图只是教学用的模拟图片，不代表真实实验。",
    openDemo: "打开演示数据",
  },
  en: {
    documentTitle: "Scratch Assay Visualizer Guide",
    title: "Scratch Assay Visualizer Guide",
    intro:
      "This page explains how to use green scratch gap masks exported from SWEET. Import one start-time mask and one end-time mask to generate a visual overlap map of gap area change.",
    openTool: "Open tool",
    workflowTitle: "Workflow",
    workflow1: "Export green masks from SWEET",
    workflow2: "Import the start-time image",
    workflow3: "Import the end-time image",
    workflow4: "Generate the area-change map",
    workflow5: "Download overlap PNG",
    step1Title: "Step 1. Process images in SWEET",
    step1Body:
      "After identifying the scratch gap in SWEET, export images with a green gap mask. For each field of view, prepare two images: one for the start time and one for the end time. They should use the same field of view, magnification, and crop.",
    step1Item1: "Recommended formats: PNG, JPG, or WebP.",
    step1Item2: "If SWEET or microscope software exports TIF, save it as PNG first.",
    step1Item3: "The green region should cover the scratch empty area, also called the gap.",
    step1Item4:
      'Use clear file names with condition, replicate, and time, such as <code>Control_rep1_start.png</code> and <code>Control_rep1_end.png</code>.',
    step2Title: "Step 2. Import two green masks",
    step2Body:
      "Open the analysis page, choose the start-time image with <strong>Start-time image</strong>, and choose the end-time image with <strong>End-time image</strong>. After both files are selected, the Generate button becomes available.",
    homeCaption: "Home screen: select the two green masks processed by SWEET.",
    step3Title: "Step 3. Generate the overlap area-change map",
    step3Body:
      "Click <strong>Generate</strong>. The page center-aligns the start-time and end-time gaps, then computes <code>start-time gap - end-time gap</code>. The orange region represents the gap area that decreased in this field of view.",
    resultCaption: "Demo result: check the two masks side by side on top, then inspect the merged overlap result below.",
    interpretTitle: "How to read the result",
    interpret1Title: "Orange region",
    interpret1Body: "The part of the start-time gap that has been filled by cells, i.e. the migration area change.",
    interpret2Title: "Green line",
    interpret2Body: "The remaining end-time gap boundary, used to confirm whether the final scratch edge is reasonable.",
    interpret3Title: "Migration ratio",
    interpret3Body: "The orange area divided by the start-time gap area, useful for comparing treatment groups.",
    interpret4Title: "Left / right",
    interpret4Body: "The left and right distribution of the orange area. If it is strongly one-sided, first check whether the images are from the same field of view.",
    nudgeTitle: "When to use horizontal nudge",
    nudgeBody1:
      "Usually you do not need to adjust it. If the orange region appears almost only on one side, but the experiment should show migration on both sides, use the <strong>End-time position</strong> arrows to nudge the end-time position. Each click moves 2 px and regenerates the result.",
    nudgeBody2:
      "The goal is not to force equal left and right areas. The goal is to make the green boundary match the end-time gap edge more reasonably. If no nudge works, the two images may not share the same field of view, or the green mask from SWEET may need checking.",
    downloadTitle: "Step 4. Download the result",
    downloadBody:
      "When the result looks reasonable, click <strong>Download overlap PNG</strong>. The downloaded PNG contains only the lower overlap area-change map, ready for slides, draft figures, or experiment notes.",
    faqTitle: "FAQ",
    faq1Q: "Why is the button disabled?",
    faq1A: "Usually because the start-time and end-time images have not both been selected.",
    faq2Q: "Why does it say no green mask was detected?",
    faq2A: "Check whether the gap exported from SWEET is clearly green. If the green is very light, open Advanced settings and slightly lower Green threshold.",
    faq3Q: "Can I import raw microscope images directly?",
    faq3A: "Not recommended. This tool expects images that already contain a green gap mask. Raw microscope images should first be processed in SWEET.",
    faq4Q: "Is the orange region the final quantitative value?",
    faq4A: "The orange region is the visualized migration area change. For quantitative comparison, record Migration ratio and keep the same processing workflow for all groups.",
    demoTitle: "Try the demo data",
    demoBody: "If this is your first time using the tool, open the demo data first. The demo images are simulated for teaching and are not real experiments.",
    openDemo: "Open demo data",
  },
};

const guideState = { lang: "zh" };

const guideEls = {
  zhButton: document.getElementById("guideZhButton"),
  enButton: document.getElementById("guideEnButton"),
};

guideEls.zhButton.addEventListener("click", () => setGuideLanguage("zh"));
guideEls.enButton.addEventListener("click", () => setGuideLanguage("en"));
setGuideLanguage("zh");

function setGuideLanguage(lang) {
  guideState.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = guideTranslations[lang].documentTitle;

  document.querySelectorAll("[data-guide-i18n]").forEach((node) => {
    const key = node.dataset.guideI18n;
    node.innerHTML = guideTranslations[lang][key];
  });

  [guideEls.zhButton, guideEls.enButton].forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
