let counted = document.getElementById("countStr")
let recording = document.getElementById("record")
let count = 0
// add
function addition() {
    count +=1
    countStr.textContent = count
}
// sub

function subtrack() {
    count -=1
    countStr.textContent = count
}
function savebtn() {
    let countSave = count + " - "
    recording.textContent += countSave
    counted.textContent = 0
    count = 0
}

function resetbtn() {
    count = 0
    countStr.textContent = count
}


