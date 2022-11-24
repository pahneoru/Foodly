const getStartedBtn = document.getElementById('start-btn')
const homePageDiv = document.getElementById('home-div')
let recommendedContainer = document.getElementById('recommended-div')
const queryArray = ["pizza", "pasta", "chicken", "pork"]
const input = document.getElementById('food-search')
const filterBtn = document.getElementById('filter-btn-id')
const searchBtn = document.getElementById('search-btn-id')
const foods = document.getElementById('foods')
const removedTitle = document.getElementById('remove-title')
const searchFoodPage = document.getElementById('second')
const infoPage = document.getElementById('third')
let x
let i
let recDishes
let idOfElement
let theId
let ingredientsParagraph
let howToCook
let foodlyLogo


getStartedBtn.addEventListener('click', () => {
    console.log('clicked')
    document.getElementById("intro-page").style.display = "none"
    searchFoodPage.style.display = "block"
})

searchBtn.addEventListener("click", getFoodBasedOnInput)
filterBtn.addEventListener("click", function(e){
    e.preventDefault()
})

function renderRecommendedDish(food) { 
    recommendedContainer.innerHTML += `
        <div class="recommended-dish">
        <img src="${food.image}" alt="">
            <div class="recommended-dish-text">
                <p>${food.title}</p>
                <p>${food.readyInMinutes} Minutes</p>
                <h3 id="the-id" style="display: none">${food.id}</h3>
            </div>
        </div>
    `
}

 async function getAPI(query) {
     let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=e2f4bddb67f145309d59f9f2aaf5c93c&query=${query}`)
     let data = await response.json()
     return data
 }

 async function getRecipe(id) {
     let response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=e2f4bddb67f145309d59f9f2aaf5c93c`)
     let data = await response.json()
     return data
 }

function getInfo(){
    recDishes = document.querySelectorAll('.recommended-dish')
                recDishes.forEach(recDish =>{
                    recDish.addEventListener("click", () => {
                        recDish.classList.add('is-active') //HALAL CARACTER MAI ARE JS-UL ASTA
                        console.log(recDish)
                        idOfElement = document.querySelector('.is-active #the-id')
                        console.log(idOfElement)
                        theId = idOfElement.textContent
                        console.log(theId)
                        getRecipe(theId).then(data =>{
                            searchFoodPage.style.display = "none"
                            infoPage.style.display = "block"
                            console.log(data)
                            infoPage.innerHTML= `
                            <div id="reset-logo-id" class="reset-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chef-hat" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12v-7.126a4.002 4.002 0 1 1 2.092 -7.723a3.999 3.999 0 0 1 3.908 -3.151z"></path>
                                <path d="M6.161 17.009l11.839 -.009"></path>
                                </svg>
                                <h3>Foodly</h3>
                            </div>    
                            <h1>${data.title}</h1>
                            <img src="${data.image}">
                            <h3 class="cooking-time-text">Cooking time: ${data.readyInMinutes} minutes</h3>
                            <h3 class="ingredients-title">Ingredients</h3>
                            <ul id="ingredients"></ul>
                            <h3 class="how-to-cook-title">How to cook</h3>
                            <ol id="way-to-cook"></ol>
                        `
                        ingredientsParagraph = document.getElementById('ingredients')
                        for(let i=0; i<data.extendedIngredients.length; i++)
                        ingredientsParagraph.innerHTML += `<li> ${data.extendedIngredients[i].name}</li>`
                        
                        howToCook = document.getElementById('way-to-cook')
                        for(i = 0; i<data.analyzedInstructions[0].steps.length; i++)
                        howToCook.innerHTML += `<span class="step-title">Step ${i+1}</span> <li>${data.analyzedInstructions[0].steps[i].step}</li>`

                            foodlyLogo = document.getElementById('reset-logo-id')
                            foodlyLogo.addEventListener('click', () =>{
                                console.log('clicked')
                                infoPage.style.display = "none"
                                searchFoodPage.style.display = "block"
                                recDish.classList.remove('is-active')
                            })
                        })
                    })
                })
                    
}

function getFoodBasedOnInput(e) {
    e.preventDefault()
    removedTitle.remove()
    foods.innerHTML = `<div id="recommended-div" class="recommended-container"></div>`
    recommendedContainer = document.getElementById('recommended-div')
    let inputValue =  input.value
    console.log(inputValue)

    getAPI(inputValue).then(food => {
        console.log(food)
        
            for(let i=0; i<4; i++)
            getRecipe(food.results[i].id).then(foodRecipe => {
                console.log(foodRecipe)
                renderRecommendedDish(foodRecipe)
                getInfo()
            })
    })
}


function getAllRecommendedDishes(dishName){
    getAPI(dishName).then(food => {
        console.log(food)
        x = Math.floor((Math.random() * 9) + 1)
         console.log(x)
         console.log(food.results.length)
           while(x > food.results.length)
           {
           x = x - 1
           console.log(x)
           }
            getRecipe(food.results[x].id).then(foodRecipe => {
                console.log(foodRecipe)
                renderRecommendedDish(foodRecipe)
                getInfo()
            })
    })
}

for(let typeOfFood of queryArray){
    getAllRecommendedDishes(typeOfFood)
}
//  getAllRecommendedDishes(queryArray[1])
//  getAllRecommendedDishes(queryArray[2])