function summaryRanges(nums: number[]): string[] {
  if (nums.length == 0) {
    return [];
  }
  const ranges: string[] = [];
  let rangeStart = nums[0];
  debugger;
  for (let i = 0; i < nums.length; i++) {
    const curNum = nums[i];
    if (i + 1 >= nums.length) {
      ranges.push(
        rangeStart == curNum ? curNum.toString() : `${rangeStart}->${curNum}`
      );
      continue;
    }
    const nextNum = nums[i + 1];
    if (curNum + 1 !== nextNum) {
      const range =
        rangeStart == curNum ? curNum.toString() : `${rangeStart}->${curNum}`;
      ranges.push(range);
      rangeStart = nextNum;
      continue;
    }
  }

  return ranges;
}

export default function main() {
  const nums = [0, 2, 3, 4, 6, 8, 9];
  console.log(summaryRanges(nums));
}
