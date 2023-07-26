
// fetching favourite food container
let showFavouriteFoodContainer = document.querySelector(".show-favourite-food")

// creating a empty array
let FavouriteFoodId = [];



// fetching food id from localStorage
function getFavouriteFoodId() {

    let foodItemId = JSON.parse(localStorage.getItem("favouriteFood"))

    // pushing all food id to FavouriteFoodId in line 6
    FavouriteFoodId = foodItemId
}

// calling function to food id
getFavouriteFoodId();


// get api call by id
async function showData(id) {


    let content = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)

    let foodData = await content.json();


    if(foodData.meals.length === 0){
        showFavouriteFoodContainer.innerHTML = ""
    }
    
    // appending html data to food item container
    showFavouriteFoodContainer.innerHTML += `

    <div class="food-card">
        <img src= ${foodData.meals[0].strMealThumb}
            alt="" class="img-thumbnail">
        <div class="p-2">
            <p > <b>Name : </b> <span class = "name"> ${foodData.meals[0].strMeal} </span>  </p>
            <p><b> Category : </b>  ${foodData.meals[0].strCategory}  </p>
            <p><b> Country : </b>  ${foodData.meals[0].strArea}  </p>
            <p> ${foodData.meals[0].strInstructions.substring(0, 50)}...  </p>
        </div>

        <div class="btn btn-danger mb-2" onclick=removeItem(${foodData.meals[0].idMeal})>
            Remove Item
        </div>
   
    </div> 
    
    `

}


// looping food id and sending it to showData in line 24
function utility() {
    if (FavouriteFoodId.length > 0) {
        for (let i = 0; i < FavouriteFoodId.length; i++) {
            showData(FavouriteFoodId[i])
        }
    }
}

utility()


// deleting item from favourite food 
function removeItem(id) {

    let foodItemId = JSON.parse(localStorage.getItem("favouriteFood"))

    let newFoodItems = foodItemId.filter(item => item !== id);

    localStorage.setItem("favouriteFood", JSON.stringify(newFoodItems))

    getFavouriteFoodId()

    utility()

    showFavouriteFoodContainer.innerHTML = ""

}



