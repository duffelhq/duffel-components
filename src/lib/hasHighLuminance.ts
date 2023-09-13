/*
 * Use relative-luminance to determine whether the color is dark enough or not.
 * See also: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export const hasHighLuminance = (accentColor: string) => {
  const rgb = accentColor.split(", ").map((x) => parseInt(x));
  const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return luminance > 0.5;
};
