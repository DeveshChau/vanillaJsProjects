const submit = document.getElementById("submit");
const search = document.getElementById("search");
const resultHeading = document.getElementById("result-heading");
const mealsEl = document.getElementById("meals");
const singleMealEl = document.getElementById("single-meal");
const random = document.getElementById("random");
search.focus();
function searchMeal(e) {
  e.preventDefault();
  singleMealEl.innerHTML = "";

  const term = search.value.trim();
  if (term) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Result for search Term: ${term.toUpperCase()}</h2>`;
        mealsEl.innerHTML = data.meals
          .map((meal) => {
            return `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>`;
          })
          .join("");
      });
    search.value = "";
  } else {
    alert("Please Enter Search Term");
  }
}

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      meal = data.meals[0];
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];
  for (let index = 1; index < 21; index++) {
    if (meal[`strIngredient${index}`]) {
      ingredients.push(
        `${meal[`strIngredient${index}`]} - ${meal[`strMeasure${index}`]}`
      );
    } else {
      break;
    }
  }
  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

function getRandomMeal() {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealId");
    getMealById(mealId);
  }
});

random.addEventListener("click", getRandomMeal);
