# Scratch Assay Analysis / 划痕分析

A fully client-side tool for pairing start-time and end-time scratch assay gap-mask images, aligning them by gap center, and highlighting the migrated area on the end-time image.

## Features

- English by default, with a Chinese toggle
- Pair a start-time image with an end-time image
- Extract the green gap mask automatically
- Detect side-by-side images and use the right green-mask panel when appropriate
- Center-align the start-time gap to the end-time gap before subtraction
- Use orange to show `start-time gap - end-time gap`
- Use a green boundary to show the remaining end-time gap
- Fine-tune the end-time horizontal position with left / right nudge buttons
- Download the overlay as PNG

## Usage

Open `index.html` directly in a browser.

For GitHub Pages:

1. Commit this folder to a GitHub repository
2. Open `Settings -> Pages`
3. Choose the deploy branch, such as `main`
4. Open the generated Pages URL

All image processing runs locally in the browser. Images are not uploaded.

## Input Images

Recommended input: PNG, JPG, or WebP images that already contain a green gap mask.

Supported layouts:

- Single panel: the whole image contains the green mask
- Side-by-side panel: the original image is on the left and the green mask is on the right

Most browsers cannot read `.tif` directly. Export TIF images as PNG first.

## Method

The migrated area is defined as:

```text
migration_area = gap_start AND NOT gap_end
```

Processing steps:

1. Extract green pixels: `G - max(R, B) > threshold`
2. Estimate the left and right gap boundary on each row
3. Merge row segments so small dots or breaks do not split the mask
4. Interpolate missing rows and lightly smooth the boundary
5. Center-align the start-time mask to the end-time mask
6. Apply the optional end-time horizontal nudge
7. Compute `start-time gap - end-time gap`
8. Render the migrated area in orange and the remaining end-time gap boundary in green

## Advanced Settings

Manual tuning is usually unnecessary. Advanced settings are collapsed by default and are mainly for difficult masks:

- Green threshold: default `4`
- Minimum run width: default `5 px`

## Notes

- The tool assumes a vertical scratch gap that can be described by left and right boundaries on each row.
- If the two images are from different fields of view, or if rotation / scale differs strongly, register the images first.
- Poor mask quality still needs manual review.
