const getContrastingColor = (rgbString: string): "0,0,0" | "255,255,255" => {
  const [red, green, blue] = rgbString
    .split(",")
    .map((value) => parseInt(value, 10));

  // Use relative-luminance to determine whether the color is dark enough or not.
  // See also: https://www.w3.org/WAI/GL/wiki/Relative_luminance
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  return luminance > 0.5 ? "0,0,0" : "255,255,255";
};

export { getContrastingColor };
