function threeSum(nums: number[]): number[][] {
  var sorted = nums.toSorted();
  const output: number[][] = [];
  debugger;

  const middleIndex = Math.ceil(sorted.length / 2);
  for (let i = 0; i < sorted.length; i++) {
    const fixed = sorted[i];
    if (fixed == 0) {
      continue;
    }
  }

  return output;
}

export default function main() {
  console.log("Three sum", threeSum([-1, 0, 1, 2, -1, -4]));
}
