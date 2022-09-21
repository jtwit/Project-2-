// let recipes

// const url = "https://cab-cors-anywhere.herokuapp.com/https://api.edamam.com/api/recipes/v2?app_id=f498cafe&app_key=2791ffa64cf092b17604444ea5d37046"

// 1 FETCH IN ASYNC/AWAIT
async function getAPI() {

    const searchInput = document.querySelector("[data-search]").value
    console.log('searchInput', searchInput)

    // let ingredients = searchInput.addEventListener("input", (e) => {
    //     const value = e.target.value
    //     console.log('value', value)
    //     return value
    // })
    const url = `https://cab-cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${searchInput}&app_id=a52b4d43&app_key=e0e5c667605f5e91d8275c973531b80a`

    const response = await fetch(url, {
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
            "Accept": "*/*",
        }
    })
    // console.log('response', response)
    const result = await response.json()
    recipes = result.hits
    return recipes
}

// 2 CREATE HTML TABLE/CARDS & SHOW MORE/SHOW LESS & CHECKBOXES & DROPDOWN
function displaytable(recipes) {

    const tbody = document.getElementById("tbody")
    console.log('recipes', recipes)
    tbody.innerHTML = ""
    recipes.forEach((recipe, i) => {
        const tr = document.createElement("tr")
        tr.className = "card"

        const imgDiv = document.createElement('div')
        const td1 = document.createElement("td")
        const imgElement = document.createElement('img')
        imgElement.src = recipe.recipe.image
        imgElement.className = "recipeImage"
        td1.className = "card-img-top"
        const imgText = document.createElement('p')
        imgText.innerHTML = "Recipe"
        imgText.className = "imgText"
        imgDiv.appendChild(imgText)
        // href for receipe webpage
        const recipeAnchor = document.createElement('a')
        recipeAnchor.appendChild(imgElement)
        const recipeURL = recipe.recipe.url
        recipeAnchor.href = recipeURL
        // console.log(recipeURL)
        // imgDiv for hover effect
        imgDiv.className = "imgDiv"
        td1.appendChild(recipeAnchor)
        imgDiv.appendChild(td1)

        // show more/show less Div
        const td2 = document.createElement("td")
        const div = document.createElement("div")
        div.className = "seemore"
        div.addEventListener("click", () => showcardText(i))
        const p = document.createElement('p')
        td2.innerHTML = recipe.recipe.label
        td2.className = "card-title"
        td2.appendChild(div)
        div.appendChild(p)
        p.className = "showMoreDots"
        p.innerText = "..."

        const td3 = document.createElement('td')
        td3.innerHTML = recipe.recipe.mealType
        td3.className = "card-text card-" + i
        td3.style.display = "none"

        const td4 = document.createElement('td')
        const caloriesRounded = Math.round(recipe.recipe.calories).toLocaleString()
        td4.innerHTML = "Calories " + caloriesRounded
        td4.className = "card-text card-" + i
        td4.style.display = "none"

        const td5 = document.createElement('td')
        td5.innerHTML = "Servings " + recipe.recipe.yield
        td5.className = "card-text card-" + i
        td5.style.display = "none"

        const td6 = document.createElement('td')
        td6.innerHTML = recipe.recipe.dietLabels
        td6.className = "card-text card-" + i
        td6.style.display = "none"

        tbody.appendChild(tr)
        tr.appendChild(imgDiv)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
    })

    // show more/show less function
    function showcardText(i) {
        let selectedCard = document.querySelectorAll(".card-" + i);
        console.log(selectedCard)
        selectedCard.forEach(element => {
            if (element.style.display === "none") {
                element.style.display = "block"
            }
            else {
                element.style.display = "none";
            }
        });

        selectedCard.style.display = "block"
        if (showcardtext.style.display === "none") {
            showcardtext.style.display = "block"
        }
        else {
            showtable.style.display = "none";
        }
    }
}

// Create Health label Array for creating health label checkboxes
function createHealthLabelArray(recipes) {
    const healthLabels = recipes.map(recipe => recipe.recipe.healthLabels);
    console.log(healthLabels)

    const simplifyArray = (healthLabels = []) => {
        const res = [];
        healthLabels.forEach(element => {
            element.forEach(el => {
                res.push(el);
            });
        });
        console.log(res)
        const uniquesimplifyArray = [... new Set(res)]
        console.log(uniquesimplifyArray)
        return uniquesimplifyArray
    };

    // console.log(simplifyArray(healthLabels))
    return simplifyArray(healthLabels)
}

// CREATE DROPDOWN

function createDropDown(recipes) {
    const dropdown = document.getElementById("dishTypeDropdown")
    dropdown.innerHTML = ""
    const dishTypes = recipes.map(element => element.recipe.dishType[0]);
    // console.log(dishTypes)
    const unique = [... new Set(dishTypes)]
    const allRecipes = document.createElement("option")
    allRecipes.innerHTML = "All Recipes"
    allRecipes.value = "all"
    allRecipes.className = "dropDown-content"
    dropdown.appendChild(allRecipes)
    // remove duplicates
    unique.forEach(dishType => {
        const dropdownList = document.createElement("option")
        dropdownList.innerHTML = dishType
        dropdownList.value = dishType
        dropdown.appendChild(dropdownList);
    })
}

// CREATING CHECKBOXES DYNAMICALLY

function createCheckbox(recipes) {
    const checkboxesDiv = document.getElementById("alleryTypeDiv");
    checkboxesDiv.innerHTML = ""
    const healthLabelArray = createHealthLabelArray(recipes)
    // console.log('healthLabelArray', healthLabelArray)

    healthLabelArray.forEach((healthLabel, i) => {
        const healthLabelDiv = document.createElement("div");
        healthLabelDiv.className = "allergyType"
        const checkBox = document.createElement("input");
        const label = document.createElement("label");
        checkBox.type = "checkbox";
        checkBox.id = "checkBox"
        // console.log('checkBox', checkBox)
        checkBox.value = healthLabelArray[i];
        checkBox.className = "form-check-input rounded-circle";
        checkBox.addEventListener('change', () => combineFilters(recipes))
        checkboxesDiv.appendChild(healthLabelDiv)
        healthLabelDiv.appendChild(checkBox);
        healthLabelDiv.appendChild(label);
        label.appendChild(document.createTextNode(healthLabelArray[i]));
    })
    return createHealthLabelArray(recipes)
}

//3 CONTROLLER
//main function async await
async function controller() {
    //get the data async
    const recipes = await getAPI()
    // console.log('recipes', recipes)

    // build table with all data 
    displaytable(recipes)

    //generate checkboxes
    createCheckbox(recipes)

    //generate DropDown filter options
    createDropDown(recipes)

    createHealthLabelArray(recipes)
    // createCheckedArray(recipes)

    //create checkbox filter
    // filterCards(recipes)

    // set event listeners
    setEventListeners(recipes)
    // filterByDropDown(recipes)

    combineFilters(recipes)

}
controller()

// FILTER CARDS BY CHECKBOXES

function filterCards(recipes) {
    const CheckedBoxes = Array.from(
        document.querySelectorAll("input[type='checkbox']:checked")
    ).map((checked) => checked.value.toLowerCase())
    console.log(CheckedBoxes)
    console.log('recipes', recipes)
    const filteredCards = recipes.filter(recipe => {
        console.log('recipe', recipe)
        const healthLabels = recipe.recipe.healthLabels.map(healthLabel => healthLabel.toLowerCase());
        console.log('healthLabels', healthLabels)
        let intersection = healthLabels.filter(x => CheckedBoxes.includes(x));
        console.log(intersection)
        return (intersection.length >= CheckedBoxes.length)
    })
    // console.log('filteredCards', filteredCards)
}

// UNCHECK CHECKBOXES

function uncheck(recipes) {
    const CheckBoxes = document.querySelectorAll("input[type='checkbox']")
    CheckBoxes.forEach((checkBox, i) => {
        if (CheckBoxes[i].type == "checkbox")
            CheckBoxes[i].checked = false;
    })
    // console.log('recipes', recipes)
    resetDropdown(recipes)
    displaytable(recipes)
}

function resetDropdown() {
    document.getElementById("dishTypeDropdown").selectedIndex = 0;
}

// EVENT LISTENERS
const setEventListeners = (recipes) => {
    document.querySelector("#dishTypeDropdown")
        .addEventListener("change", (event) => {
            // filterByDropDown(recipes)
            combineFilters(recipes)
        })
    document.getElementById('uncheck')
        .addEventListener("click", () => {
            uncheck(recipes)
        })
}

// Combine Filters

const combineFilters = (recipes) => {
    const dropDownValue = document.querySelector("#dishTypeDropdown").value
    const CheckedBoxes = Array.from(
        document.querySelectorAll("input[type='checkbox']:checked")
    ).map((checked) => checked.value.toLowerCase())

    const filteredAllRecipes = recipes.filter(recipe => {
        const healthLabels = recipe.recipe.healthLabels.map(healthLabel => healthLabel.toLowerCase());
        let intersection = healthLabels.filter(x => CheckedBoxes.includes(x));

        return (recipe.recipe.dishType[0] === dropDownValue || dropDownValue === "all") && (intersection.length >= CheckedBoxes.length)
    })
    console.log('filteredAllRecipes', filteredAllRecipes)
    displaytable(filteredAllRecipes)
}

// FILTER CARDS BY DROPDOWN
// const filterByDropDown = (recipes) => {
//     const dropDownValue = document.querySelector("#dishTypeDropdown").value
//     console.log('dropDownValue', dropDownValue)
//     const filteredRecipes = recipes.filter(recipe => recipe.recipe.dishType[0] === dropDownValue)
//     console.log('filteredRecipes', filteredRecipes)
// displaytable(filteredRecipes)
// }

// SEARCH BAR
// const searchInput = document.querySelector("[data-search]")

// searchInput.addEventListener("input", (e) => {
//     const value = e.target.value
//     console.log('value', value)
// })