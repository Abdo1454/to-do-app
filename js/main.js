let form = document.querySelector(".list");
let input = document.getElementById("task");
let result = document.getElementById("result");
let doneResult = document.getElementById("done-result");
let resultPage = document.querySelector(".result-page");
let numTasks = document.getElementById("num-tasks");
let btnMode = document.getElementById("btn-mode");
let currentModeAll = document.getElementById("current-mode");
let choose=document.getElementById("choose");
// let idList=document.querySelectors(".id-list")

// جلب الوضع من localStorage أو الافتراضي light
let currentMode = localStorage.getItem("mode") || "light";

// 🔥 function واحدة تتحكم في كل حاجة
function applyMode(mode) {
  if (mode === "dark") {
    currentModeAll.classList.remove("container-light");
    resultPage.classList.remove("list-task");
    choose.classList.remove("choose-light");
    resultPage.classList.add("list-dark");
    choose.classList.add("choose-dark");
    currentModeAll.classList.add("container-dark");
    document.body.classList.add("body-dark");
    btnMode.setAttribute("src", "images/icon-sun.svg");
  } else {
    currentModeAll.classList.remove("container-dark");
    resultPage.classList.remove("list-dark");
    choose.classList.remove("choose-dark");
    choose.classList.add("choose-light");
    resultPage.classList.add("list-task");
    currentModeAll.classList.add("container-light");
    document.body.classList.remove("body-dark");
    btnMode.setAttribute("src", "images/icon-moon.svg");
  }
}

// تطبيق الوضع عند تحميل الصفحة
applyMode(currentMode);

// تغيير الوضع عند الضغط
btnMode.addEventListener("click", changeMode);

function changeMode() {
  currentMode = currentMode === "light" ? "dark" : "light";

  applyMode(currentMode);

  // حفظ الوضع
  localStorage.setItem("mode", currentMode);
}
form.addEventListener("submit", addTask);
let currentView = "all";
function addTask(event) {
  event.preventDefault();

  let task = input.value;

  if (!task.trim()) return;

  let tasks = JSON.parse(localStorage.getItem("doTask")) || [];

  tasks.push(task);

  localStorage.setItem("doTask", JSON.stringify(tasks));

  input.value = "";
  render();
  attachControls();
}

// 🎯 render حسب الحالة
function render() {
  let tasks = JSON.parse(localStorage.getItem("doTask")) || []; // ✅ مهم
  let doneTasks = JSON.parse(localStorage.getItem("doneTask")) || [];
  if (currentView === "all") {
    displayTask();
    displayDoneTask();
  } else if (currentView === "active") {
    displayTask();
    doneResult.innerHTML = "";
  } else {
    result.innerHTML = "";
    displayDoneTask();
  }
  if (tasks.length == 0 && doneTasks.length == 0) {
    resultPage.classList.add("hidden");
  } else {
    resultPage.classList.remove("hidden");
  }
  numTasks.innerHTML = `${tasks.length} items left`;
  // attachControls(); // 🔥 أهم سطر ناقص
}
function displayTask() {
  let tasks = JSON.parse(localStorage.getItem("doTask")) || [];

  result.innerHTML = tasks
    .map(
      (t, index) =>
        `<li class="list-task" class="id-list" > <p class="check-list" data-done= "${index}">  </p>  <p class="font"> ${t} </P>
        <button class="del" data-del="${index}" ><img src="images/icon-cross.svg" /> </button>  </li>`,
    )
    .join("");
  /* result.innerHTML += `<li class="choose">  <p>${tasks.length} items left</p>
    <span class="control">
    <p  id="all-items" >All</p> <p id="active" >Active</p>  <p id="completed" >completed</p> 
    </span>
   <p id="btn-clear" >clear</p> </li>`;
   */
}

let del = document.getElementById("del");
// del.addEventListener("click",delTask);

function delTask(index) {
  let tasks = JSON.parse(localStorage.getItem("doTask")) || [];

  tasks.splice(index, 1); // حذف العنصر

  localStorage.setItem("doTask", JSON.stringify(tasks));
  render();
  attachControls();
}
function doneTask(index) {
  let tasks = JSON.parse(localStorage.getItem("doTask")) || [];
  let doneTasks = JSON.parse(localStorage.getItem("doneTask")) || [];
  let task = tasks[index];
  doneTasks.push(task);
  localStorage.setItem("doneTask", JSON.stringify(doneTasks));

  delTask(index);
  render();
  attachControls();
}
function displayDoneTask() {
  let doneTasks = JSON.parse(localStorage.getItem("doneTask")) || [];
  doneResult.innerHTML = doneTasks
    .map(
      (t, index) =>
        `<li class="list-task" > <p class="icon-check"> <img src="images/icon-check.svg" /> </p> <del class="font"> ${t} </del></li>`,
    )
    .join("");
}
function clearAll() {
  localStorage.setItem("doTask", JSON.stringify([]));
  localStorage.setItem("doneTask", JSON.stringify([]));
  render();
  attachControls();
}
// 🎛 controls
function attachControls() {
  document.getElementById("btn-clear")?.addEventListener("click", clearAll);

  document.getElementById("all-items")?.addEventListener("click", () => {
    currentView = "all";
    render();
  });

  document.getElementById("active")?.addEventListener("click", () => {
    currentView = "active";
    render();
  });

  document.getElementById("completed")?.addEventListener("click", () => {
    currentView = "completed";
    render();
    attachControls();
  });
}
function displayAll() {
  displayDoneTask();
  displayTask();
}

// ⚡ event delegation
result.addEventListener("click", (e) => {
  let delBtn = e.target.closest("[data-del]");
  let doneBtn = e.target.closest("[data-done]");

  if (delBtn) delTask(delBtn.dataset.del);
  if (doneBtn) doneTask(doneBtn.dataset.done);
});

// أول تشغيل
render();
attachControls();
// let btnClear=document.getElementById("btn-clear")
// btnClear.addEventListener("click",clearAll);
