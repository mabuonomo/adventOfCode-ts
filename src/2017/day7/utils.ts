export type NodeWeight = { name: string; weight: number; childs: Array<string> };

export function findWeightFrom(name: string, left: Array<NodeWeight>) {
  let sum = 0;
  let node = left.find((value, index, array) => value.name == name);
  let weight = node.weight;
  sum += weight;

  node.childs.forEach((element) => {
    sum += findWeightFrom(element, left);
  });

  return sum;
}
