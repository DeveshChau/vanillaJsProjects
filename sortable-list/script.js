const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

const numberList = ["one", "two", "three", "four", "five", "six"];
let listItems = [];
let startIndex;
function createList() {
  [...numberList]
    .map((num) => ({ value: num, sort: Math.random() }))
    .sort((a, b) => {
      return a.sort - b.sort;
    })
    .map((a) => a.value)
    .forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${item}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
  addEventListeners();
}

createList();

function dragStart() {
  startIndex = this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const stopEndex = this.getAttribute("data-index");
  swapItems(startIndex, stopEndex);
  this.classList.remove("over");
}

function swapItems(startIndex, stopIndex) {
  const itemOne = listItems[startIndex].querySelector(".draggable");
  const itemTwo = listItems[stopIndex].querySelector(".draggable");

  listItems[startIndex].appendChild(itemTwo);
  listItems[stopIndex].appendChild(itemOne);
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItem = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItem.forEach((item) => {
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
  });
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const itemName = item.querySelector(".draggable").innerText.trim();

    if (itemName !== numberList[index]) {
      item.classList.add("wrong");
    } else {
      item.classList.remove("wrong");
      item.classList.add("right");
    }
  });
}

checkBtn.addEventListener("click", checkOrder);
