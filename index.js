

// fetching food card container
let foodCardContainer = document.querySelector("#food-card-container");

// creating a function to call api
async function AllFoodData() {
    let content = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    let foodData = await content.json();

    let foodDataArray = foodData.meals;

    foodDataArray.forEach(food => {
        foodCardContainer.innerHTML += `
                
            <div class="food-card">
                <img src= ${food.strMealThumb}
                    alt="" class="img-thumbnail">
                <div class="p-2">
                    <p > <b>Name : </b> <span class = "name"> ${food.strMeal} </span>  </p>
                    <p><b> Category : </b>  ${food.strCategory}  </p>
                    <p><b> Country : </b>  ${food.strArea}  </p>
                    <p> ${food.strInstructions.substring(0, 50)}...<a  href="./detail.html" onclick=showMore(${food.idMeal}) >Show More</a>  </p>
                </div>

                <div class="btn btn-primary mb-2" onclick=AddToFavourite(${food.idMeal})>
                    Add To Favourite
                </div>
               
            </div> 
        `
    });

}


AllFoodData();


// fetching search input tag from navbar
let search = document.querySelector("#searchfood");

search.addEventListener("keyup", () => {
    let filter = search.value.toLowerCase();
    
    let getAllTags = document.body.querySelectorAll(".food-card");

    for (let i = 0; i < getAllTags.length; i++) {
        
        // fetching item name 
        let getItemName = getAllTags[i].getElementsByTagName("span")[0];
        
        if(getItemName){
            let textValue = getItemName.textContent;
            
            if(textValue.toLowerCase().indexOf(filter) > -1){
                getAllTags[i].style.display = " ";
            }else{
                getAllTags[i].style.display = "none"
            }
            
        }

        if(filter.length <= 0){
            getAllTags[i].style.display = "";
        }
        
    }
})



let favouriteFood = [];


function AddToFavourite(id){
    favouriteFood.push(id);
    localStorage.setItem("favouriteFood",JSON.stringify(favouriteFood));
}


function showMore(id){
    localStorage.setItem("showMore",JSON.stringify(id) )
}







