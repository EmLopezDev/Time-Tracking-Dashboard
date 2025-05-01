const dailyButton = document.getElementById("daily-button");
const weeklyButton = document.getElementById("weekly-button");
const monthlyButton = document.getElementById("monthly-button");
const allButtons = document.querySelectorAll(".card__user--button");

const addActiveState = (id) => {
    const buttons = Array.from(allButtons);
    buttons.map((btn) => btn.classList.remove("active"));

    const [clickedButton] = buttons.filter((button) => button.id === id);
    clickedButton.classList.add("active");
};

dailyButton.addEventListener("click", (e) => {
    addActiveState(e.target.id);
});

weeklyButton.addEventListener("click", (e) => {
    addActiveState(e.target.id);
});

monthlyButton.addEventListener("click", (e) => {
    addActiveState(e.target.id);
});
