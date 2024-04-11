document.addEventListener("DOMContentLoaded", ()=>{
  function getDrink(){
  fetch("http://localhost:3000/drinks")
  .then(res => res.json())
  .then(listDrink => listDrink.forEach(drink => renderDrink(drink)));

  }
  getDrink()
})

function renderDrink(drink){

  const output = document.querySelector(".container")
  const div = document.createElement("div")

  div.innerHTML = 
  `<div class="card" style="width: 18rem;">
          <img src="${drink.img}" class="card-img-top" alt="drinkpic">
          <div class="card-body">

            <h5 class="card-name">${drink.name}</h5>
            <h5 class="card-title" id= "category">Category: ${drink.category}</h5>
            <p class="card-text">${drink.description}</p>
            <p class="card-text" id="inventory">${drink.inventory} Bottles Left</p>
            <a class="btn btn-primary">Ksh.${drink.price}</a>
            <a href="#" class="btn btn-primary">Add to Cart</a>
          </div>
        </div>`;
        
        
        output.appendChild(div)

        const imageOver = document.querySelector(".card-img-top")
        imageOver.addEventListener("mouseover", ()=>{
          imageOver.style.transform = "scale(0.7)";
          imageOver.style.transition = "transform 0.3s";
        })
        imageOver.addEventListener("mouseout", ()=>{
          imageOver.style.transform = "scale(1.0)";
          imageOver.style.transition = "transform 0.3s";
        })
}
const form = document.getElementById("comment-form")
const input = document.querySelector(".comment-input")
const commentList = document.getElementById("comment-list")
form.addEventListener("submit", (e)=>{
  e.preventDefault()
  const comment = input.value
  const newComment = document.createElement("li")
  newComment.innerHTML = comment

  
  commentList.appendChild(newComment)
  input.value = ""
})

const imageOver = document.querySelector(".card-img-top")
imageOver.addEventListener("mouseenter", ()=>{
  imageOver.style.transform = "scale(0.5)";
  imageOver.style.transition = "transform 0.3s";
})

const cart = document.querySelector(".btn btn-primary")
cart.addEventListener("click", ()=>{
  alert ("Added to")

})




// function postData(drinkObj){
//   fetch("http://localhost:3000/drinks",{
//     method: "POST",
//     headers:{
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(drinkObj)
//   })
//   .then(res => res.json())
//   .then(drink => renderDrink(newComment))
//   }
  









