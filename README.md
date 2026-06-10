# Scratch Assay Visualizer / 划痕面积变化可视化

配合 SWEET 使用的划痕实验面积变化可视化工具。

先用 SWEET 处理原始显微图，导出绿色 gap 蒙版；再把开始时间和结束时间两张绿色蒙版导入本网页，即可生成面积变化图。

Scratch Assay Visualizer works with green gap masks exported from SWEET. Process the raw microscope images in SWEET first, then import one start-time mask and one end-time mask to generate an overlap area-change map.

## 一键打开 / Quick Links

- [打开在线工具 / Open Web Tool](https://baijinming97.github.io/scratch-assay-visualizer/)
- [查看使用教程 / View Guide](https://baijinming97.github.io/scratch-assay-visualizer/guide.html)
- [打开演示数据 / Try Demo Data](https://baijinming97.github.io/scratch-assay-visualizer/?demo=1)

## 适合做什么 / What It Is For

- 比较不同处理组的划痕迁移差异
- 把开始时间和结束时间的 gap 变化直接画出来
- 把结果图下载为 PNG，放入实验记录、汇报 PPT 或论文草图
- Compare scratch migration across treatment groups
- Visualize the gap change between start time and end time
- Download the overlap PNG for lab notes, slides, or draft figures

## Workflow

```text
SWEET 识别划痕 gap
        ↓
导出绿色 gap 蒙版
        ↓
导入 Start-time image 和 End-time image
        ↓
生成 overlap 面积变化图
        ↓
下载 overlap PNG
```

## Step 1. 在 SWEET 中导出绿色蒙版 / Export Green Masks From SWEET

在 SWEET 中完成划痕区域识别后，保存带绿色 gap mask 的图片。每个视野需要两张图：

- `Start-time image`：开始时间的绿色 gap 蒙版
- `End-time image`：结束时间的绿色 gap 蒙版

建议两张图来自同一视野、同一倍率、同一裁剪范围。推荐导出为 PNG、JPG 或 WebP。如果显微镜软件导出的是 TIF，请先另存为 PNG。

After identifying the scratch gap in SWEET, export images with a green gap mask. For each field of view, prepare two images:

- `Start-time image`: green gap mask at the start time
- `End-time image`: green gap mask at the end time

Use the same field of view, magnification, and crop. PNG, JPG, or WebP is recommended. If the microscope software exports TIF, save it as PNG first.

## Step 2. 导入两张图片 / Import Two Images

打开网页后，分别选择开始时间和结束时间图片。选择完成后，`Generate` 按钮会变成可点击状态。

Open the web tool and choose the start-time and end-time images. After both are selected, the `Generate` button becomes available.

![Home screen](docs/screenshots/home.png)

## Step 3. 生成 overlap 面积变化图 / Generate the Overlap Map

点击 `Generate`。网页会自动：

- 提取两张图中的绿色 gap mask
- 将开始时间和结束时间的 gap 居中对齐
- 计算 `开始时间 gap - 结束时间 gap`
- 在下方生成 overlap 结果图

Click `Generate`. The page will:

- Extract green gap masks from both images
- Center-align the start-time and end-time gaps
- Compute `start-time gap - end-time gap`
- Render the overlap result below the two mask previews

![Demo result](docs/screenshots/demo-result.png)

## 结果怎么看 / How to Read the Result

- 上方左图：`Start-time mask`，用于检查开始时间绿色蒙版
- 上方右图：`End-time mask`，用于检查结束时间绿色蒙版
- 下方大图：`Overlap result`，是真正要下载和汇报的结果图
- 橙色区域：开始时间 gap 中已经减少的部分，也就是迁移面积变化
- 绿色线：结束时间剩余 gap 的边界
- `Migration ratio`：橙色面积占开始时间 gap 的比例，可用于比较不同处理组
- Top left: `Start-time mask`, used to check the start-time green mask
- Top right: `End-time mask`, used to check the end-time green mask
- Bottom: `Overlap result`, the result image for download and reporting
- Orange region: the part of the start-time gap that decreased, i.e. migration area change
- Green line: the remaining end-time gap boundary
- `Migration ratio`: orange area divided by start-time gap area, useful for comparing groups

## 左右微调什么时候用 / When to Use Horizontal Nudge

大多数情况下不用调。

如果 overlap 图里橙色几乎只在一侧，而你确认实际实验中两侧都有迁移，可以使用 `End-time position` 的左右箭头微调。每点一次移动 `2 px`，网页会自动重新生成结果。

微调的目标不是让左右面积完全相等，而是让绿色边界和结束时间图里的 gap 边缘更合理。如果怎么调都不合理，通常说明两张图不是同一视野，或 SWEET 输出的绿色蒙版需要重新检查。

Most of the time, no adjustment is needed.

If the orange region appears almost only on one side, but the experiment should have migration on both sides, use the `End-time position` arrows. Each click moves 2 px and regenerates the result.

The goal is not to force equal left/right areas. The goal is to make the green boundary match the end-time gap edge more reasonably. If no nudge works, the images may not share the same field of view, or the SWEET mask may need checking.

## 下载结果 / Download the Result

点击 `Download overlap PNG`。下载内容只包含下方的 overlap 结果图，不包含上方两个 mask 检查图。

Click `Download overlap PNG`. The downloaded file contains only the lower overlap result, not the two mask preview panels.

## 常见问题 / FAQ

### 可以直接导入原始显微图吗？

不建议。本工具假设输入已经是 SWEET 等软件处理后的绿色 gap 蒙版。

Not recommended. This tool expects green gap masks processed by SWEET or similar software.

### 为什么提示没有检测到绿色 mask？

请检查 SWEET 导出的 gap 是否是明显绿色。如果绿色很浅，可以展开 `Advanced settings`，稍微降低 `Green threshold`。

Check whether the exported gap is clearly green. If the green is very light, open `Advanced settings` and slightly lower `Green threshold`.

### 为什么 start 和 end 尺寸不一致？

两张图必须使用同一倍率和同一裁剪范围。如果一张图被裁掉或缩放过，建议回到 SWEET 或显微镜软件重新导出。

Both images must use the same magnification and crop. If one image was cropped or resized differently, export them again from SWEET or the microscope software.

### 统计时应该记录什么？

建议记录 `Migration ratio`，并且所有处理组都使用相同的 SWEET 设置和相同的本工具参数。

Record `Migration ratio`, and keep the same SWEET settings and tool parameters across all treatment groups.
