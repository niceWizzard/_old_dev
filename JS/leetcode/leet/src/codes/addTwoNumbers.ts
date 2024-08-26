class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  toArray() {
    let result = [];
    let current: ListNode | null = this;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }

  toString(): string {
    let list: string[] = [];
    let current: ListNode | null = this;
    do {
      list.push(current.val.toString());
      current = current.next;
    } while (current);

    return list.toReversed().join("");
  }
}

function generateListNode(num: number[]): ListNode {
  var numStr = num.toReversed();
  let head = new ListNode(numStr[numStr.length - 1]);
  let current: ListNode = head;
  for (let i = numStr.length - 2; i >= 0; i--) {
    const node = new ListNode(Number(numStr[i]));
    current.next = node;
    current = node;
  }
  return head;
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const list1: number[] = [];
  const list2: number[] = [];
  let current1: ListNode | null = l1;
  let current2: ListNode | null = l2;
  while (current1 !== null || current2 !== null) {
    if (current1) {
      list1.push(current1.val);
      current1 = current1.next;
    }
    if (current2) {
      list2.push(current2.val);
      current2 = current2.next;
    }
  }
  const biggerLength = Math.max(list1.length, list2.length);
  const head = new ListNode();
  let current: ListNode | null = head;
  let carry = 0;
  for (let i = 0; i < biggerLength; i++) {
    const sum =
      (i >= list1.length ? 0 : list1[i]) +
      (i >= list2.length ? 0 : list2[i]) +
      carry;
    carry = 0;
    const digit = sum % 10;
    carry = Math.floor(sum / 10);
    current.val = digit;
    if (i + 1 < biggerLength) {
      const node = new ListNode();
      current.next = node;
      current = node;
    }
  }
  if (carry != 0) {
    const node = new ListNode(carry);
    current.next = node;
  }

  return head;
}

export default function main() {
  var l1 = generateListNode([
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1,
  ]);
  var l2 = generateListNode([5, 6, 4]);
  console.log(addTwoNumbers(l1, l2)?.toArray());
}
