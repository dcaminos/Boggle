var _ = require("lodash");

const dices = [
  "aaafrs",
  "aaeeee",
  "aafirs",
  "adennn",
  "aeeeem",
  "aeegmu",
  "aegmnn",
  "afirsy",
  "bjkqxz",
  "ccenst",
  "ceiilt",
  "ceilpt",
  "ceipst",
  "ddhnot",
  "dhhlor",
  "dhlnor",
  "dhlnor",
  "eiiitt",
  "emottt",
  "ensssu",
  "fiprsy",
  "gorrvw",
  "iprrry",
  "nootuw",
  "ooottu",
];

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const runDice = (diceIndex) => {
  if (diceIndex >= 0 && diceIndex < 25) {
    return dices[diceIndex][randomInt(0, 5)];
  } else {
    return "";
  }
};

export const createBoard = () => {
  const board = [];
  const dices = [];
  for (let i = 0; i < 25; i++) {
    dices.push(i);
  }
  shuffle(dices);

  let diceIndex = 0;
  for (let i = 0; i < 5; i++) {
    const line = [];
    for (let j = 0; j < 5; j++) {
      line.push(runDice(dices[diceIndex]));
      diceIndex++;
    }
    board.push(line);
  }
  return board;
};

export const resolveClick = (state, click) => {
  if (state.lastSelected === null) {
    return { ...state, lastSelected: click, list: [click] };
  } else {
    if (!isSelected(state.list, click)) {
      if (isClose(state.lastSelected, click)) {
        const list = [...state.list];
        list.push(click);
        return { ...state, lastSelected: click, list: list };
      }
    }
  }
  return state;
};

const isSelected = (list, click) =>
  list.find((e) => e.x === click.x && e.y === click.y) !== undefined;

const isClose = (lastSelected, click) => {
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (!(x === 0 && y === 0)) {
        if (click.x === lastSelected.x + x && click.y === lastSelected.y + y) {
          return true;
        }
      }
    }
  }
  return false;
};

export const resolveSubmit = (state) => {
  const word = listToString(state);
  if (state.dictionary.includes(word)) {
    let newScore = 0;
    if (word.length < 5) {
      newScore = 1;
    } else if (word.length < 6) {
      newScore = 2;
    } else if (word.length < 7) {
      newScore = 3;
    } else if (word.length < 8) {
      newScore = 5;
    } else {
      newScore = 11;
    }

    const newWords = [...state.words];
    newWords.push({
      score: newScore,
      word,
    });

    return {
      ...state,
      words: newWords,
      list: [],
      lastSelected: null,
      score: state.score + newScore,
    };
  } else {
    const newWords = [...state.words];
    newWords.push({
      score: -2,
      word,
    });

    return {
      ...state,
      words: newWords,
      list: [],
      lastSelected: null,
      score: state.score - 2,
    };
  }
};

const listToString = (state) => {
  return state.list
    .map((value) => state.board[value.y][value.x])
    .join("")
    .toUpperCase();
};
