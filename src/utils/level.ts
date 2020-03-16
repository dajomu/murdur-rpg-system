export function getCount(minCount: number, maxCount: number): number {
  return Math.round(Math.random() * (maxCount - minCount) + minCount);
}

export function getPlusMinusTwentyPercentInteger(integerAmount: number): number {
  const multiplyingFactor = 1 + (Math.random() * 0.4 - 0.2);
  return Math.round(integerAmount * multiplyingFactor);
}