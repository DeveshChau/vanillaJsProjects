const submit = document.getElementById("submit");
const search = document.getElementById("search");
const resultHeading = document.getElementById("result-heading");
const mealsEl = document.getElementById("meals");
search.focus();
function searchMeal(e) {
  e.preventDefault();
  const term = search.value.trim();
  if (term) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Result for search Term: ${term.toUpperCase()}</h2>`;
        mealsEl.innerHTML = data.meals.map((meal) => {
          return `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>`;
        }).join('');
      });
  } else {
    alert("Please Enter Search Term");
  }
}

submit.addEventListener("submit", searchMeal);
