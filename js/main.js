const dailyButton = document.getElementById("daily-button");
const weeklyButton = document.getElementById("weekly-button");
const monthlyButton = document.getElementById("monthly-button");
const categoryContainer = document.getElementById("category-container");
const cardCategories = categoryContainer.getElementsByClassName(
    "card card__category"
);
const loadingCards = categoryContainer.getElementsByClassName("loading__card");
const buttonsContainer = document.getElementById("buttons-container");

const removeLoadingCards = () => {
    Array.from(loadingCards).forEach((card) =>
        categoryContainer.removeChild(card)
    );
};

const showLoadingCard = (boolean) => {
    if (boolean) {
        const cards = new Array(6).fill("data");
        console.log(cards);
        cards.map(() => {
            categoryContainer.innerHTML += `
    <article class="loading__card">
        <div class="loading__card--header">
            <span class="loading__card--text"></span>
            <span class="loading__card--text"></span>
        </div>
        <div class="loading__card--body"></div>
    </article>
    `;
        });
    } else {
        removeLoadingCards();
    }
};

const addCard = (data) => {
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
    showLoadingCard(true);
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
    showLoadingCard(false);
    data.forEach((d) => addCard(d));
};

const setActiveView = (id) => {
    const allButtons = document.querySelectorAll(".card__user--button");
    const buttons = Array.from(allButtons);
    buttons.map((button) => button.classList.remove("active"));

    const [clickedButton] = buttons.filter((button) => button.id === id);
    clickedButton.classList.add("active");
};

const removeCategoryCards = () => {
    Array.from(cardCategories).forEach((card) =>
        categoryContainer.removeChild(card)
    );
};

document.addEventListener("click", (e) => {
    if (e.target.matches(".active")) return;
    if (e.target.matches(".card__user--button")) {
        removeCategoryCards();
        setActiveView(e.target.id);
        addData(e.target.value);
    }
});

addData("weekly");
