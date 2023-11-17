let counted = document.getElementById("countStr")
let count = 0
// add
function addition() {
    count += 1
    countStr.textContent = count
}
// sub

function subtrack() {
    count -= 1
    countStr.textContent = count
}

function resetbtn() {
    count = 0
    countStr.textContent = count
}


