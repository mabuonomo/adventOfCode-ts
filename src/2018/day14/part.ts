const findScore = (iterations: number) => {
  const recipeBoard = [3, 7];
  let [firstElf, secondElf] = [0, 1];
  while (recipeBoard.length < iterations + 10) {
    const firstElfRecipe = recipeBoard[firstElf];
    const secondElfRecipe = recipeBoard[secondElf];
    const newRecipe = firstElfRecipe + secondElfRecipe;
    if (newRecipe > 9) {
      recipeBoard.push(1);
      recipeBoard.push(newRecipe - 10);
    } else {
      recipeBoard.push(newRecipe);
    }
    firstElf = (firstElf + firstElfRecipe + 1) % recipeBoard.length;
    secondElf = (secondElf + secondElfRecipe + 1) % recipeBoard.length;
  }
  return recipeBoard.slice(iterations, iterations + 10).join('');
};

const findRecipesToSequence = (sequence: string) => {
  const recipeBoard = [3, 7];
  let [firstElf, secondElf, last] = [0, 1, ''];
  while (true) {
    const firstElfRecipe = recipeBoard[firstElf];
    const secondElfRecipe = recipeBoard[secondElf];
    const newRecipe = firstElfRecipe + secondElfRecipe;
    if (newRecipe > 9) {
      recipeBoard.push(1);
      recipeBoard.push(newRecipe - 10);
    } else {
      recipeBoard.push(newRecipe);
    }
    firstElf = (firstElf + firstElfRecipe + 1) % recipeBoard.length;
    secondElf = (secondElf + secondElfRecipe + 1) % recipeBoard.length;

    last = last + newRecipe;
    const foundIndex = last.indexOf(sequence);
    if (foundIndex > -1) {
      return recipeBoard.length - last.length + foundIndex;
    } else if (last.length > sequence.length) {
      last = last.slice(last.length - sequence.length);
    }
  }
};

console.log(findScore(846021));
console.log(findRecipesToSequence('846021'));
