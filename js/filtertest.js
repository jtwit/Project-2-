// console.log(data)

const recipes = data.hits
console.log(recipes)

// returns blank array, why?

const highcalories = recipes.filter(recipe => recipe.calories >= 1000);

console.log(highcalories);

// not working undefined

// const filteredhealthLabels = recipes.filter(recipe => {
//     return recipe.label.includes("pie")

// })
// console.log(filteredhealthLabels)


// working

const hicals = recipes.filter(function (i) {
    return i.recipe.calories > 3000;
});

console.log(hicals);


const vegetarianFilter = recipes.filter(function (i) {
    return i.recipe.healthLabels.includes("Vegetarian");
});

console.log(vegetarianFilter);

// checkbox



// checkbox.addEventListener('change', function () {
//     if (this.checked) {
//         console.log("is checked");
//     } else {
//         console.log("isn't checked");
//     }
// });


// const checkbox = document.getElementById("Vegetarian")

// checkbox.addEventListener('change', function () {
//     if (this.checked) {
//         const healthlabelFilter = recipes.filter(function (i) {
//             return i.recipe.healthLabels.includes("Vegetarian");
//         });
//         console.log(healthlabelFilter);
//     } else {
//         console.log(recipes);
//     }
// });


// create elements for filtering

// const filterContainer = document.getElementById("filterContainer")

// recipes.forEach((recipe, i) => {
//     const p input = document.createElement("p")
//     p.innerHTML = "text"
// })

// filterContainer.appendChild(p)


// for (var i = 0; i < recipes.length; i++) {
//     const checkBox = document.createElement("input");
//     const label = document.createElement("label");
//     checkBox.type = "checkbox";
//     checkBox.value = recipes[i]; {
//         for (var i = 0; j < recipes.length; i++)
//     }
//     checkboxesDiv.appendChild(checkBox);
//     checkboxesDiv.appendChild(label);
//     label.appendChild(document.createTextNode(recipes[i]));
// }

// CREATING CHECKBOXES DYNAMICALLY

// function createCheckbox() {
//     const checkboxesDiv = document.getElementById("cboxes");
//     const health = recipes[0].recipe.healthLabels
//     console.log(health)

//     health.forEach((healthLabel, i) => {
//         const healthLabelDiv = document.createElement("div");
//         healthLabelDiv.className = "allergyType"
//         const checkBox = document.createElement("input");
//         const label = document.createElement("label");
//         checkBox.type = "checkbox";
//         checkBox.id = "checkBox"
//         checkBox.value = health[i];
//         checkBox.className = "form-check-input rounded-circle";
//         // console.log(checkBox)
//         checkBox.addEventListener('change', createCheckedArray)
//         checkboxesDiv.appendChild(healthLabelDiv)
//         healthLabelDiv.appendChild(checkBox);
//         healthLabelDiv.appendChild(label);
//         label.appendChild(document.createTextNode(health[i]));
//     })
// }

// createCheckbox()

function createCheckedArray() {
    let CheckedBoxes = Array.from(
        document.querySelectorAll("input[type='checkbox']:checked")
    ).map((checked) => checked.value);
    console.log(CheckedBoxes);
}
createCheckedArray()

// FILTERING
const healthLabelcheckBoxes = document.querySelectorAll("input[type='checkbox']")
console.log(healthLabelcheckBoxes)

// healthLabelcheckBoxes.forEach((box) => {
//     box.checked = false;
//     box.addEventListener("change", () => console.log("hello"));
// });



// function testFunction() {
//     healthLabelcheckBoxes.addEventListener('change', function () {
//         if (this.checked) {
//             const healthlabelFilter = recipes.filter(function (i) {
//                 return i.recipe.healthLabels.includes("Vegetarian");
//             });
//             console.log(healthlabelFilter);
//         } else {
//             console.log(recipes);
//         }
//     });
// }



// health.forEach((healthLabel, i) => {
//     const healthValue = checkBox.value
//     console.log(healthValue)
//     if healthValue === health
// })


// Search bar...

function searchFunction() {
    const input = document.getElementById('ingredientInput');
    const filter = input.value.toUpperCase();
    const checkBox = document.getElementById("checkBox");
    console.log(checkBox)

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < checkBox.length; i++) {
        a = checkBox.value[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            checkBox[i].style.display = "";
        } else {
            checkBox[i].style.display = "none";
        }
    }
}

const Array1 = [1, 3, 5]
const Array2 = [1, 2, 3]

let intersection = Array1.filter(x => Array2.includes(x));
console.log(intersection)


const health = recipes[0].recipe.healthLabels
const CheckedBoxes = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
).map((checked) => checked.value);
const arr1 = health
const arr2 = CheckedBoxes

const filteredRecipes = recipes.filter(recipe => {
    let intersection = health.filter(x => CheckedBoxes.includes(x));
    console.log(intersection)
    return (intersection)
})

// create drop down
// function createDropDown() {
//     const dish = recipes[0].recipe.dishType
//     console.log(dish)

//     dish.forEach((dishType, i) => {
//         const dropdown = document.getElementById("dishTypeDropdown")
//         const dropdownList = document.createElement("option")
//         dropdownList.innerHTML = dishType
//         dropdownList.value = dishType
//         dropdown.appendChild(dropdownList);
//     })
// }

// createDropDown()

// map 

const test = recipes.map(element => {
    return element;
})

console.log(test)

// create dropdown of dishType

function createDropDown() {
    const dishTypes = recipes.map(element => element.recipe.dishType[0]);
    console.log(dishTypes)
    const unique = [... new Set(dishTypes)]
    unique.forEach((dishType, i) => {
        const dropdown = document.getElementById("dishTypeDropdown")
        const dropdownList = document.createElement("option")
        dropdownList.innerHTML = dishType
        dropdownList.value = dishType
        dropdown.appendChild(dropdownList);
    })
}

createDropDown()


// create array of healthLabels

const healthLabels = recipes.map(element => element.recipe.healthLabels);
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
simplifyArray(healthLabels)


// CREATING CHECKBOXES DYNAMICALLYs

function createCheckbox() {
    const checkboxesDiv = document.getElementById("cboxes");
    const healthLabelArray = simplifyArray(healthLabels)
    console.log('healthLabelArray', healthLabelArray)

    healthLabelArray.forEach((healthLabel, i) => {
        const healthLabelDiv = document.createElement("div");
        healthLabelDiv.className = "allergyType"
        const checkBox = document.createElement("input");
        const label = document.createElement("label");
        checkBox.type = "checkbox";
        checkBox.id = "checkBox"
        checkBox.value = healthLabelArray[i];
        checkBox.className = "form-check-input rounded-circle";
        checkBox.addEventListener('change', createCheckedArray)
        checkboxesDiv.appendChild(healthLabelDiv)
        healthLabelDiv.appendChild(checkBox);
        healthLabelDiv.appendChild(label);
        label.appendChild(document.createTextNode(healthLabelArray[i]));
    })
}
// console.log(simplifyArray(healthLabels))
createCheckbox()


const filterByDropDown = (recipes) => {
    const dropDownValue = document.querySelector("#dishTypeDropdown").value
    console.log('dropDownValue', dropDownValue)
    const filteredReceipes = recipes.filter(recipe => recipe.recipe.dishType)
    console.log('filteredReceipes', filteredReceipes)
}

const dropdownEventlistener = (recipes) => {
    document.querySelector("#dishTypeDropdown")
        .addEventListener("change", event => {
            filterByDropDown(recipes)
        })
}

dropdownEventlistener(recipes)