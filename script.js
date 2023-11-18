let counters = []
let currentCounterIndex = 0
let countStr = document.getElementById("countStr")
let counterList = document.getElementById("counterList")

function addition() {

    // create counter if nothing is there
    const savedCounters = localStorage.getItem("counters")
    if (savedCounters === "[]" || !savedCounters) {
        console.log(savedCounters)
        addCounter()
        loadCounters()
    }


    counters[currentCounterIndex].count += 1
    countStr.textContent = counters[currentCounterIndex].count

    // Save counters to local storage
    saveCounters()
}

function subtrack() {
    counters[currentCounterIndex].count -= 1
    countStr.textContent = counters[currentCounterIndex].count

    // Save counters to local storage
    saveCounters()
}

function resetbtn() {
    counters[currentCounterIndex].count = 0
    countStr.textContent = counters[currentCounterIndex].count

    // Save counters to local storage
    saveCounters()
}

function addCounter() {
    const counter = {
        id: "Counter " + (counters.length + 1),
        count: 0
    }
    counters.push(counter)

    // Save counters to local storage
    saveCounters()

    // Update counter list
    updateCounterList()

    // Update current counter
    currentCounterIndex = counters.length - 1
    updateCurrentCounter()
}
function deleteCounter(index) {
    // Remove the counter from the counters array
    counters.splice(index, 1)

    // Save counters to local storage
    saveCounters()

    // Update counter list
    updateCounterList()

    // If the deleted counter was the current counter, update the current counter
    if (index === currentCounterIndex) {
        // If there are remaining counters, set the current counter to the first one
        if (counters.length > 0) {
            currentCounterIndex = 0
        }
        // Otherwise, reset the current counter
        else {
            currentCounterIndex = -1
        }

        // Update the URL to remove the counter parameter if necessary
        if (counters.length > 0) {
            history.pushState(null, '', `?id=counter-${currentCounterIndex + 1}`)
        } else {
            history.pushState(null, '', '/')
        }

        // Update the current counter
        updateCurrentCounter()
    }
}
function updateCounterList() {
    counterList.innerHTML = ""

    counters.forEach((counter, index) => {
        const listItem = document.createElement("li")
        listItem.classList.add('flex', 'justify-between', 'border-b', 'border-stone-700');
        listItem.innerHTML = `<a href="?id=counter-${index + 1}" onclick="loadCounter(${index})" class="block w-full px-4 py-4  cursor-pointer focus:outline-none focus:ring-2 border-gray-600 hover:bg-gray-800 hover:text-white focus:ring-gray-500 focus:text-white">${counter.id} <span class="bg-stone-900 rounded-lg px-2 py-1 font-bold ml-2"> ${counter.count}</span></a>
        
        <button class=" text-red-500 px-6 border-l border-stone-700" onclick="deleteCounter(${index})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
      </button>`

        counterList.appendChild(listItem)
    })
}

function loadCounter(index) {
    currentCounterIndex = index
    updateCurrentCounter()

    // Update the URL with the counter's ID
    history.pushState(null, '', `?id=counter-${index + 1}`)
}

function updateCurrentCounter() {
    const counter = counters[currentCounterIndex]
    countStr.textContent = counter.count

    // Highlight the selected counter
    const links = counterList.getElementsByTagName("a")
    Array.from(links).forEach((link, index) => {
        if (index === currentCounterIndex) {
            link.classList.add("bg-stone-700", "other-class")
        } else {
            link.classList.remove("bg-stone-700", "other-class")
        }
    })

    // Save counters to local storage
    saveCounters()


}

function saveCounters() {
    localStorage.setItem("counters", JSON.stringify(counters))
}

function loadCounters() {
    const savedCounters = localStorage.getItem("counters")
    if (savedCounters === "[]" || !savedCounters) {
        console.log(savedCounters)
        addCounter()
        loadCounters()
    }
    if (savedCounters) {
        counters = JSON.parse(savedCounters)
        updateCounterList()

        // Find current counter from URL parameter
        const urlParams = new URLSearchParams(window.location.search)
        const counterId = urlParams.get('id')
        if (counterId) {

            const counterIndex = parseInt(counterId.split('-')[1]) - 1
            if (!isNaN(counterIndex) && counterIndex >= 0 && counterIndex < counters.length) {
                currentCounterIndex = counterIndex
            }
        }
    }

    // Update current counter
    updateCurrentCounter()
}

// Load counters on page load
loadCounters()
