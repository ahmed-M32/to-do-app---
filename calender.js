const weekDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"thursday",
	"friday",
	"saturday",
];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

let calneder = document.querySelector(".calender");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let table = document.querySelector(".days-table");
let year = document.querySelector(".current-year");
let month = document.querySelector(".current-month");

const currentDate = new Date();
let currentDay = currentDate.getDay();
let currentDayNum = currentDate.getDate();
currentMonth = currentDate.getMonth();
currentYear = currentDate.getFullYear();

function setMonth() {
	monthLength = new Date(currentYear, currentMonth + 1, 0).getDate();
	let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

	let paddingDays = weekDays.indexOf(weekDays[firstDayOfMonth]);

	let lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

	year.innerHTML = currentYear;
	month.innerHTML = `${months[currentMonth]}`;

	console.log(currentDay, currentDayNum);
	table.innerHTML = "";
	for (let i = paddingDays; i > 0; i--) {
		let dayBlock = document.createElement("div");
		let dateStr = new Date(currentYear, currentMonth, i)
			.toLocaleDateString()
			.split("/")
			.join("");
		dayBlock.classList.add(dateStr);
		dayBlock.className = "day";
		dayBlock.classList.add("padding");

		console.log(dateStr);
		dayBlock.innerHTML = `${lastDayOfLastMonth - i + 1}`;
		table.append(dayBlock);
	}
	for (let i = 1; i < monthLength + 1; i++) {
		let dayBlock = document.createElement("div");
		dayBlock.className = "day";
		let dateStr = new Date(currentYear, currentMonth, i)
			.toLocaleDateString()
			.split("/")
			.join("");
		console.log(dateStr);
		dayBlock.classList.add(dateStr);
		if (
			i == currentDayNum &&
			currentMonth == new Date().getMonth() &&
			currentYear == new Date().getFullYear()
		) {
			dayBlock.classList.add("current-day");
		}
		dayBlock.innerHTML = `${i}`;
		table.append(dayBlock);
	}
	for (let i = 0; i < 42 - (paddingDays + monthLength); i++) {
		let dayBlock = document.createElement("div");
		dayBlock.className = "day";
		let dateStr = new Date(currentYear, currentMonth, i)
			.toLocaleDateString()
			.split("/")
			.join("");
		console.log(dateStr);
		dayBlock.classList.add(dateStr);

		dayBlock.classList.add("padding");
		dayBlock.innerHTML = `${i + 1}`;
		table.append(dayBlock);
	}

	let days = document.querySelectorAll(".day");
	let taskContainer = document.querySelector(".task-card-container");

	days.forEach((day) => {
		day.addEventListener("click", (e) => {
			let taskCard = document.createElement("div");
			let taskCardHeader = document.createElement("div");


			taskCardHeader.innerHTML = `Day ${e.target.innerHTML} Task`;
			taskCardHeader.classList.add("task-header");
			console.log(day.classList);
			taskCard.classList.add("task-card");
			taskCard.classList.add(`${e.target.innerHTML}`);
			taskContainer.innerHTML = "";

			taskCard.append(taskCardHeader);
			let tasksArray = JSON.parse(localStorage.getItem("tasks"));
			tasksArray.forEach((task) => {
				if (day.classList.contains(task.date)) {
					let newTask = document.createElement("div");
					let taskTitle= document.createElement("div");
					let taskDescription = document.createElement("div");

					taskTitle.classList.add("task-card-title")
					taskDescription.classList.add("task-card-desc")
					taskTitle.innerHTML = task.title;
					taskDescription.innerHTML = task.description;
					newTask.classList.add("tasksss");

					newTask.append(taskTitle)
					newTask.append(taskDescription)
					taskCard.append(newTask);
				}
			});
			taskContainer.append(taskCard);
		});
	});

}
setMonth();

right.addEventListener("click", () => {
	if (currentMonth > 10) {
		currentYear += 1;
		currentMonth = 0;
	} else {
		currentMonth += 1;
	}
	setMonth();
});

left.addEventListener("click", () => {
	if (currentMonth < 1) {
		currentYear -= 1;
		currentMonth = 11;
	} else {
		currentMonth -= 1;
	}
	setMonth();
});


