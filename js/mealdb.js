document.getElementById('error-message').style.display = 'none';
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // display spinner
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('meal-details').style.display = 'none';
    console.log(searchText);
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText === '') {
        document.getElementById('error-message').style.display = 'block';
        searchText.textContent = '';
        document.getElementById('search-result').innerText = '';
        document.getElementById('spinner').style.display = 'none';
    }
    else {
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error));
        searchText.textContent = '';
        document.getElementById('spinner').style.display = 'block';
    }

}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}
const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (meals.length === 0) {
        document.getElementById('error').innerText = 'block';
        document.getElementById('spinner').style.display = 'none';
    }
    meals?.forEach(meal => {
        console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div onclick="loadMealDetail(${meal.idMeal})" class="card h-100 mt-4">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p>${meal.strIngredient18 ? meal.strIngredient18 : ''}</p>
            <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
        </div>
        </div>`;
        searchResult.appendChild(div);
    });
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('meal-details').style.display = 'block';
}
const loadMealDetail = mealId => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
}
const displayMealDetail = meal => {
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>`
    mealDetails.appendChild(div);

}