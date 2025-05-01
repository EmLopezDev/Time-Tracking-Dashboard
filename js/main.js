const dailyButton = document.getElementById("daily-button");
const weeklyButton = document.getElementById("weekly-button");
const monthlyButton = document.getElementById("monthly-button");
const categoryContainer = document.getElementById("category-container");
const cardCategories = categoryContainer.querySelectorAll(".card__category");
const buttonsContainer = document.getElementById("buttons-container");

const addCard = (data) => {
    buttonsContainer.innerHTML += `
    <button
        id="daily-button"
        class="card__user--button"
        value="daily"
    >
        Daily
    </button>
    <button
        id="weekly-button"
        class="card__user--button active"
        value="weekly"
    >
        Weekly
    </button>
    <button
        id="monthly-button"
        class="card__user--button"
        value="monthly"
    >
        Monthly
    </button>
    `;

    const title =
        data.title.toLowerCase() === "self care"
            ? "self-care"
            : data.title.toLowerCase();
    categoryContainer.innerHTML += `
    <article class="card card__category bg__${title}">
        <div class="card__category--image">
            <img src="./images/icon-${title}.svg" alt="" />
        </div>
        <div class="card__category--details">
            <div class="card__category--header">
                <h2>${data.title}</h2>
                <img src="./images/icon-ellipsis.svg" alt="" />
            </div>
            <div class="card__category--hours">
                <span class="card__category--hours-current">
                    ${Object.values(data.timeframes)[0].current}hrs
                </span>
                <span class="card__category--hours-past">
                    Last Week - ${Object.values(data.timeframes)[0].previous}hrs
                </span>
            </div>
        </div>
    </article>
    `;
};

const addData = async (view) => {
    let data;
    await fetch("/data.json")
        .then((res) => res.json())
        .then((json) => {
            data = json.reduce((acc, item) => {
                const value = {
                    title: item.title,
                    timeframes: {
                        [`${view}`]: item.timeframes[`${view}`],
                    },
                };
                acc.push(value);

                return acc;
            }, []);
        })
        .catch((err) => console.error(err));
    await data.forEach((d) => addCard(d));
};

document.addEventListener("click", (e) => {
    if (e.target.matches(".card__user--button")) {
        const allButtons = document.querySelectorAll(".card__user--button");
        const buttons = Array.from(allButtons);
        buttons.map((button) => button.classList.remove("active"));

        const [clickedButton] = buttons.filter(
            (button) => button.id === e.target.id
        );
        clickedButton.classList.add("active");
        addData(e.target.value);
    }
});

addData("weekly");
