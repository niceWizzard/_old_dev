function lookFor(char: string, lookIn: string, skip = 0): number {
  let output = -1;
  for (let i = skip; i < lookIn.length; i++) {
    if (char == lookIn[i]) {
      return i;
    }
  }
  return output;
}

function isSubsequence(s: string, t: string): boolean {
  let searchIndex = 0;
  let output = true;
  debugger;
  for (const char of s) {
    const lookResults = lookFor(char, t, searchIndex);
    if (lookResults == -1) {
      return false;
    }
    searchIndex = lookResults + 1;
  }
  return output;
}
export default function main() {
  const s = "aaaaaa";
  const t = "bbaaaa";
  console.log(isSubsequence(s, t));
}
