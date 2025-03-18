let currentScenario = 0;
let scenarios = [
    {
        question: "Where do you want to extract raw materials for your tech product?",
        choices: [
            { text: "Democratic Republic of the Congo", fact: "Congo supplies over 70% of the world's cobalt, but mining conditions are often dangerous, with child labor and low wages being common." },
            { text: "Australia", fact: "Australia follows stricter labor laws, making mining more ethical but also more expensive." }
        ]
    },
    {
        question: "Where will you manufacture your tech product?",
        choices: [
            { text: "China", fact: "China offers lower costs but has faced criticism over poor working conditions and long hours." },
            { text: "Germany", fact: "Germany enforces strong labor laws, ensuring ethical treatment but increasing production costs." }
        ]
    },
    {
        question: "How will you transport your materials?",
        choices: [
            { text: "Cargo Ships", fact: "Cargo ships produce large amounts of CO2 emissions, contributing to climate change." },
            { text: "Rail Transport", fact: "Rail transport is more environmentally friendly but can be slower and less flexible." }
        ]
    },
    {
        question: "What packaging will you use?",
        choices: [
            { text: "Plastic", fact: "Plastic packaging is cheap but creates long-lasting environmental waste." },
            { text: "Biodegradable Materials", fact: "Biodegradable materials are sustainable but more costly." }
        ]
    },
    {
        question: "How will you handle electronic waste?",
        choices: [
            { text: "Landfill Disposal", fact: "Electronic waste in landfills releases toxic chemicals into the environment." },
            { text: "Recycling Programs", fact: "Recycling programs recover valuable materials but require investment in proper infrastructure." }
        ]
    }
];

function loadScenario() {
    if (currentScenario < scenarios.length) {
        let scenario = scenarios[currentScenario];
        document.getElementById("scenarioText").textContent = scenario.question;
        document.getElementById("choice1").textContent = scenario.choices[0].text;
        document.getElementById("choice2").textContent = scenario.choices[1].text;
        document.getElementById("fact").style.display = "none";
    } else {
        document.getElementById("scenarioText").textContent = "Game Over! You've completed all scenarios.";
        document.querySelector(".choices").style.display = "none";
        document.querySelector("button[onclick='nextScenario()']").style.display = "none";
    }
}

function makeChoice(choiceIndex) {
    let factElement = document.getElementById("fact");
    let scenario = scenarios[currentScenario];

    factElement.textContent = scenario.choices[choiceIndex].fact;
    factElement.style.display = "block";

    document.getElementById("choice1").classList.remove("selected");
    document.getElementById("choice2").classList.remove("selected");

    document.getElementById("choice" + (choiceIndex + 1)).classList.add("selected");
}

function nextScenario() {
    if (currentScenario < scenarios.length) {
        currentScenario++;
        updateProgressBar();
        loadScenario();
    }
}

function updateProgressBar() {
    let progressBar = document.getElementById("progressBar");
    let progressPercentage = (currentScenario / scenarios.length) * 100;
    progressBar.style.width = progressPercentage + "%";
    progressBar.textContent = `${currentScenario}/${scenarios.length}`;
}

// Load the first scenario on page load
loadScenario();
