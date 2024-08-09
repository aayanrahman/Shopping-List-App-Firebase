const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click", () => {
    const input = inputFieldEl.value
    console.log(input)
})

