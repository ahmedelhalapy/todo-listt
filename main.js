input = document.getElementById("text");
add = document.getElementById("btn");
taskContainer = document.querySelector(".task-container .container");

arr = [];

check();

add.addEventListener("click", () => {
  if (input.value == "") {
    alert("Please enter a value");
  } else {
    // type functions here
    creatTask(input.value);
    addToLocal();
    addElementToPage(arr[arr.length - 1]);
  }
});

function creatTask(title) {
  // 1
  const task = {
    id: Date.now(),
    title: title,
    done: false,
  };

  arr.push(task);

  input.value = "";
}

function addToLocal() {
  // 2
  localStorage.setItem("tasks", JSON.stringify(arr));
}

function addElementToPage() {
  // 3
  let div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("data-task", arr[arr.length - 1].id);
  let para = document.createElement("p");
  para.innerHTML = arr[arr.length - 1].title;
  let span = document.createElement("span");
  span.classList.add("del");
  span.innerHTML = "X";
  div.appendChild(para);
  div.appendChild(span);
  taskContainer.appendChild(div);
}

function addTask() {
  arr.forEach((task) => {
    let div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("data-task", task.id);
    let para = document.createElement("p");
    para.innerHTML = task.title;
    let span = document.createElement("span");
    span.classList.add("del");
    span.innerHTML = "X";
    div.appendChild(para);
    div.appendChild(span);
    taskContainer.appendChild(div);
  });
}

function check() {
  if (localStorage.getItem("tasks")) {
    let data = JSON.parse(localStorage.getItem("tasks"));

    data.forEach((obj) => {
      arr.push(obj);
    });

    addTask();
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    deleteFromLocal(e.target.parentElement.getAttribute("data-task"));
  }
});

function deleteFromLocal(dataTask) {
  arr = arr.filter((task) => task.id != dataTask);
  addToLocal();
}
