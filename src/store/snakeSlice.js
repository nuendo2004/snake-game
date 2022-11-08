import { createSlice } from "@reduxjs/toolkit";

class LinkListNode {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}
class Snake {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail || head;
  }
}

const find2ndLast = (node) => {
  let cur = node;
  while (cur.next.next != null) cur = cur.next;
  return cur;
};

const initSnake = new Snake(new LinkListNode([-1, -1]));

const moveSnake = (state, ver, hor) => {
  const newHead = new LinkListNode([
    state.head.value[0] + ver,
    state.head.value[1] + hor,
  ]);
  if (state.head.next != null) {
    console.log(state.head);
    state.tail = find2ndLast(state.head);
    state.tail.next = null;
    newHead.next = state.head;
  }
  return new Snake(newHead, state.tail);
};

const snakeSlice = createSlice({
  name: "snake",
  initialState: initSnake,
  reducers: {
    grow(state, action) {
      console.log("grow");
      let dir = { ver: 0, hor: 0 };
      switch (action.payload.dir) {
        case "ArrowLeft":
          dir.hor = -1;
          break;
        case "ArrowRight":
          dir.hor = 1;
          break;
        case "ArrowUp":
          dir.ver = -1;
          break;
        case "ArrowDown":
          dir.ver = 1;
          break;

        default:
          break;
      }

      const newHead = new LinkListNode([
        state.head.value[0] + dir.ver,
        state.head.value[1] + dir.hor,
      ]);
      newHead.next = state.head;
      return new Snake(newHead, state.tail);
    },
    // shrink(state, payload) {},
    moveLeft(state) {
      return moveSnake(state, 0, -1);
    },
    moveRight(state) {
      return moveSnake(state, 0, 1);
    },
    moveUp(state) {
      return moveSnake(state, -1, 0);
    },
    moveDown(state) {
      return moveSnake(state, 1, 0);
    },
    spawn(state, action) {
      return new Snake(new LinkListNode([action.payload.y, action.payload.x]));
    },
  },
});

export const { grow, shrink, spawn, moveUp, moveDown, moveLeft, moveRight } =
  snakeSlice.actions;
export default snakeSlice.reducer;
