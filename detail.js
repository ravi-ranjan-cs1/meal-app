

let id = JSON.parse(localStorage.getItem("showMore"));

let showMoreContainer = document.querySelector("#show-detail-contaier")
console.log(showMoreContainer)

async function showMoreData() {

    let content = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let foodData = await content.json();

    showMoreContainer.innerHTML = `

        <div class="container my-5 w-100 h-75 border p-5">

            <h2 class="fs-2 text-center letter-spacing1 fw-bold mb-5"> Food Details </h2>

            <div class = "">
                <img src= ${foodData.meals[0].strMealThumb} alt="" class="rounded mx-auto d-block">
                <div class="p-2">
                    <p> <b>Name : </b> <span class="name"> ${foodData.meals[0].strMeal}  </span> </p>
                    <p><b> Category : </b> ${foodData.meals[0].strCategory}  </p>
                    <p><b> Country : </b>  ${foodData.meals[0].strArea} </p>
                    <p>${foodData.meals[0].strInstructions} </p>
                </div>
                <button class="btn "><a href="/index.html" onclick=clear()>Go to home page </a></button>
            </div>

        </div>
    
    `

}

showMoreData(id);

function clear() {
    localStorage.removeItem("showMore")
}


