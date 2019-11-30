export type REQ = {
  name: string;
  value: number;
};
export type OP = {
  registry: string;
  op: string;
  value: number;

  // compare
  registry_compare: string;
  cond_compare: string;
  value_compare: number;
};

export function makeOP(reg_original: REQ, operation: OP): number {
  let op = operation.op;
  let value_cond = operation.value;
  let value_initial = reg_original.value;

  switch (op) {
    case 'inc':
      return value_initial + value_cond;

    case 'dec':
      return value_initial - value_cond;
  }

  return 0;
}

export function checkCondition(operation: OP, reg_compare: REQ): boolean {
  let cond = operation.cond_compare;
  let value = operation.value_compare;

  switch (cond) {
    case '<':
      return reg_compare.value < value;

    case '>':
      return reg_compare.value > value;

    case '<=':
      return reg_compare.value <= value;

    case '>=':
      return reg_compare.value >= value;

    case '==':
      return reg_compare.value == value;

    case '!=':
      return reg_compare.value != value;
  }

  return false;
}

export function findMaxRegistry(registry: Array<REQ>) {
  return Math.max(...registry.map((value, index, array) => value.value));
}
