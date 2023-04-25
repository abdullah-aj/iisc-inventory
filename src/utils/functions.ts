export function calcAspectRatio(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number,
) {
  let ratio: number[] | number = [maxWidth / srcWidth, maxHeight / srcHeight];
  ratio = Math.max(ratio[0], ratio[1]);

  return {width: srcWidth * ratio, height: srcHeight * ratio};
}
