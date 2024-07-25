if (!localStorage.getItem("tasks")) {
	localStorage.setItem("tasks", JSON.stringify([]));
}
var counter = 0;

let dateInput = document.querySelector(".task-date-input");
let titleInput = document.querySelector(".task-title-input");
let descInput = document.querySelector(".task-desc-input");

let submitInput = document.querySelector(".submit");

submitInput.addEventListener("click", () => {
	let date = dateInput.value;
	let title = titleInput.value;
	let desc = descInput.value;
	let tasksArray = JSON.parse(localStorage.getItem("tasks"));
    console.log(date);
	let dateArray = date.split("-");


    var temp = dateArray[2]
    dateArray[2] = dateArray[1]
    dateArray[1] = temp

    for(let  i= 0 ; i< dateArray.length ; i++){
        dateArray[i] = dateArray[i].replace(/^0+/ ,"")
    }
	let task = {
		id: counter++,
		title: title,
		date: dateArray.reverse().join(""),
		description: desc,
	};

	tasksArray.push(task);

	localStorage.setItem("tasks", JSON.stringify(tasksArray));

	console.log(dateInput.value, titleInput.value, descInput.value, dateArray);
});
