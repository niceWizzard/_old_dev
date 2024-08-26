const EMPTY = "";

function commonPrefix(first: string, second: string): string {
  if (first[0] !== second[0] || first == EMPTY || second == EMPTY) {
    return EMPTY;
  }
  const shorterLength = Math.min(first.length, second.length);

  if (shorterLength == 1) {
    return first.slice(0, 1);
  }

  let prefix = first[0];
  for (let i = 1; i < shorterLength; i++) {
    const sliceOfFirst = first.slice(0, i + 1);
    const sliceOfSecond = second.slice(0, i + 1);
    if (sliceOfFirst != sliceOfSecond) {
      break;
    }
    prefix = sliceOfFirst;
  }

  return prefix;
}

function longestCommonPrefix(strs: string[]): string {
  if (strs.length == 1) {
    return strs[0];
  }

  let leftIndex = 0;
  let rightIndex = strs.length - 1;
  let prefix = commonPrefix(strs[leftIndex], strs[rightIndex]);
  if (prefix == EMPTY) {
    return EMPTY;
  }

  leftIndex++;
  rightIndex--;
  while (leftIndex < rightIndex) {
    debugger;
    const rightWord = strs[rightIndex];
    const leftWord = strs[leftIndex];
    const rightWordCommon = commonPrefix(prefix, rightWord);
    const leftWordCommon = commonPrefix(prefix, leftWord);

    if (rightWordCommon == EMPTY || leftWordCommon == EMPTY) {
      return EMPTY;
    }

    prefix =
      rightWordCommon.length < leftWordCommon.length
        ? rightWordCommon
        : leftWordCommon;

    leftIndex++;
    rightIndex--;
  }
  if (leftIndex % 2 == 1) {
    const middleWord = strs[leftIndex];
    const middleWordCommon = commonPrefix(prefix, middleWord);
    if (middleWordCommon == EMPTY) {
      return EMPTY;
    }
    prefix = middleWordCommon;
  }
  return prefix;
}

export default function main() {
  const strs = ["flower", "flow", "flight", "flour"];
  console.log("PREFIX: ", commonPrefix("car", "cir"));
}
