let currentScenario = 0;
let budget = 3000;
let mentalHealth = 100;
let workerDeaths = 0; // Ajout pour éviter une erreur

let scenarios = [
    {
        question: "Where do you want to extract raw materials for your tech product?",
        choices: [
            { text: "Democratic Republic of the Congo", fact: "Congo supplies over 70% of the world's cobalt...", cost: -500, mentalImpact: -10 },
            { text: "Australia", fact: "Australia follows stricter labor laws...", cost: -800, mentalImpact: 5 }
        ]
    },
    {
        question: "Where will you manufacture your tech product?",
        choices: [
            { text: "China", fact: "China offers lower costs but has faced criticism...", cost: -300, mentalImpact: -5 },
            { text: "Germany", fact: "Germany enforces strong labor laws...", cost: -700, mentalImpact: 10 }
        ]
    },
    {
        question: "How will you transport your materials?",
        choices: [
            { text: "Cargo Ships", fact: "Cargo ships produce large amounts of CO2 emissions...", cost: -200, mentalImpact: -5 },
            { text: "Rail Transport", fact: "Rail transport is more environmentally friendly...", cost: -400, mentalImpact: 5 }
        ]
    },
    {
        question: "What packaging will you use?",
        choices: [
            { text: "Plastic", fact: "Plastic packaging is cheap but creates long-lasting waste...", cost: -100, mentalImpact: -5 },
            { text: "Biodegradable Materials", fact: "Biodegradable materials are sustainable but more costly.", cost: -300, mentalImpact: 10 }
        ]
    },
    {
        question: "How will you handle electronic waste?",
        choices: [
            { text: "Landfill Disposal", fact: "Electronic waste in landfills releases toxic chemicals...", cost: -400, mentalImpact: -10 },
            { text: "Recycling Programs", fact: "Recycling programs recover valuable materials...", cost: -600, mentalImpact: 15 }
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
        showResults();
    }
}

function makeChoice(choiceIndex) {
    let scenario = scenarios[currentScenario];
    let choice = scenario.choices[choiceIndex];

    budget += choice.cost || 0;
    mentalHealth = Math.max(0, Math.min(100, mentalHealth + (choice.mentalImpact || 0)));

    document.getElementById("fact-contain").style.display = "flex";
    document.getElementById("fact").textContent = choice.fact;
    document.getElementById("fact").style.display = "block";

    updateUI();
}

function updateUI() {
    document.getElementById("money").textContent = "💰 Money: $" + budget;
    document.getElementById("mentalHealthFill").style.width = mentalHealth + "%";
    document.getElementById("mentalHealthFill").style.backgroundColor =
        mentalHealth > 50 ? "green" : (mentalHealth > 20 ? "orange" : "red");
}

function showResults() {
    document.getElementById("game").style.display = "none";
    document.getElementById("results-container").style.display = "block";
    let ctx = document.getElementById("resultsChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Profit ($)", "Mental Health (%)", "Worker Deaths"],
            datasets: [{
                label: "Final Results",
                data: [budget, mentalHealth, workerDeaths],
                backgroundColor: ["green", "blue", "red"]
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
}

function nextScenario() {
    if (currentScenario < scenarios.length) {
        currentScenario++;
        updateProgressBar();
        loadScenario();
        document.getElementById("fact").style.display = "none";
        document.getElementById("fact-contain").style.display = "none";
    } else {
        showResults();
    }
}

function updateProgressBar() {
    let progressBar = document.getElementById("progressBar");
    progressBar.style.width = (currentScenario / scenarios.length) * 100 + "%";
    progressBar.textContent = `${currentScenario}/${scenarios.length}`;
}
function restartGame() {
    currentScenario = 0;
    budget = 3000;
    mentalHealth = 100;
    workerDeaths = 0;

    document.getElementById("results-container").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("fact-contain").style.display = "none";

    updateProgressBar();
    updateUI();
    loadScenario();
}

loadScenario();
