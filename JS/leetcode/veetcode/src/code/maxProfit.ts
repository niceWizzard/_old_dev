function maxProfit(prices: number[]): number {
  let largestProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    for (let j = prices.length - 1; j > i; j--) {
      const potentialProfit = Math.min(price - prices[j], 0);
      largestProfit = Math.min(largestProfit, potentialProfit);
    }
  }

  return Math.abs(largestProfit);
}

export default function main() {
  const arr = [7, 6, 4, 3, 1];
}
