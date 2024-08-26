function merge(intervals: number[][]): number[][] {
  if (intervals.length == 1) {
    return intervals;
  }
  const output: number[][] = [];
  let [startingRange, checkingRange] = intervals[0];
  const lastIndex = intervals.length - 1;
  debugger;
  for (let i = 1; i < intervals.length; i++) {
    const [intervalStart, intervalEnd] = intervals[i];
    if (checkingRange >= intervalStart) {
      checkingRange = Math.max(intervalEnd, checkingRange);
      startingRange = Math.min(intervalStart, startingRange);
      if (i == lastIndex) {
        output.push([startingRange, checkingRange]);
        break;
      }
      continue;
    }
    output.push([startingRange, checkingRange]);
    if (i + 1 < intervals.length) {
      startingRange = intervals[i][0];
      checkingRange = intervals[i][1];
      // if(i + 1 == intervals.length-1) {
      //     output.push([startingRange, checkingRange]);
      // }
    } else {
      output.push(intervals[i]);
    }
  }
  return output;
}

export default function main() {
  const intervals = [
    [1, 4],
    [0, 0],
  ];
  console.log(merge(intervals));
}
