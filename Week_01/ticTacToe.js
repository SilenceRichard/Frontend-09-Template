let pattern = [
  [2, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
]
let color = 1; // 控制当前行动的玩家

function show() {
  let board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.innerText =
        pattern[i][j] === 2 ? "X" :
          pattern[i][j] === 1 ? "O" : "";
      cell.addEventListener("click", () => move(j, i))
      board.appendChild(cell);
    }
    board.appendChild(document.createElement("br"));
  }
}

function move(x, y) {
  pattern[y][x] = color
  if (check(pattern)) {
    alert(color === 2 ? 'X is winner' : 'O is winner')
  }
  color = 3 - color;
  show();
  if (willWin(pattern, color)) {
    console.log(color === 2 ? "x will win" : "o will win!");
  }
}

function check(p) {
  // 三行
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (p[i][j] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  // 三列
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (p[j][i] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  {
    // 斜向2
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (p[j][2 - j] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  {
    // 斜向1
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (p[j][j] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }

  return false;
}

function clone(parttern) {
  return JSON.parse(JSON.stringify(pattern));
}

function willWin(parttern, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (parttern[i][j]) {
        continue;
      }
      let tmp = clone(parttern);
      tmp[i][j] = color;
      if (check(tmp)) {
        return true;
      }
    }
  }
  return false;
}


show();