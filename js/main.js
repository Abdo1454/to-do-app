let form = document.querySelector(".list");
let input = document.getElementById("task");
let result = document.getElementById("result");
let doneResult = document.getElementById("done-result");
form.addEventListener("submit", addTask);

function addTask(event) {
  event.preventDefault();

  let task = input.value;

  if (!task.trim()) return;

  let tasks = JSON.parse(localStorage.getItem("doTask")) || [];

  tasks.push(task);

  localStorage.setItem("doTask", JSON.stringify(tasks));

  input.value = "";
  displayDoneTask();
  displayTask();
}
function displayTask() {
  let tasks = JSON.parse(localStorage.getItem("doTask")) || [];

  result.innerHTML = tasks
    .map(
      (t, index) =>
        `<li class="list-task" > <p class="check-list" onclick="doneTask(${index})" >  </p>  <p class="font"> ${t} </P>  <button class="del" onclick="delTask(${index})"  ><img src="images/icon-cross.svg" /> </button>  </li>`,
    )
    .join("");
}

let del = document.getElementById("del");
// del.addEventListener("click",delTask);

function delTask(index) {
  let tasks = JSON.parse(localStorage.getItem("doTask")) || [];

  tasks.splice(index, 1); // حذف العنصر

  localStorage.setItem("doTask", JSON.stringify(tasks));
  displayTask();
}
function doneTask(index) {
  let tasks = JSON.parse(localStorage.getItem("doTask")) || [];
  let doneTasks = JSON.parse(localStorage.getItem("doneTask")) || [];
  let task = tasks[index];
  doneTasks.push(task);
  localStorage.setItem("doneTask", JSON.stringify(doneTasks));
  delTask(index);
  displayDoneTask();
  displayTask();
}
function displayDoneTask() {
  let doneTasks = JSON.parse(localStorage.getItem("doneTask")) || [];
  doneResult.innerHTML = doneTasks
    .map(
      (t, index) =>
        `<li class="list-task" > <p> <img src="images/icon-check.svg" /> </p> <del class="font"> ${t} </del></li>`,
    )
    .join("");
}
