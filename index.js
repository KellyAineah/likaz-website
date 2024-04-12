//Read
document.addEventListener("DOMContentLoaded", ()=>{
  const baseUrl= "http://localhost:3000/drinks"
  //a function to fetch and render drinks
  function getDrink(){
  fetch(`${baseUrl}`)
  .then(res => res.json())
  .then(listDrink => listDrink.forEach(drink => renderDrink(drink)));

  }
  //call the function to fetch and render drinks when the DOM content is loaded
  getDrink()
})
//created a function to render individual drink cards
function renderDrink(drink){
//container where drink cards will be appended
  const output = document.querySelector(".container")
  //created a new div element to hold the drink card
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
        
        //append the new card to output container
        output.appendChild(div)

        const imageOver = div.querySelector(".card-img-top")
        //added mouseover event listener to scale image when hovered
        imageOver.addEventListener("mouseover", ()=>{
          imageOver.style.transform = "scale(0.7)";
          imageOver.style.transition = "transform 0.3s";
        })
        //added mouseout event listener to reset the image scale
        imageOver.addEventListener("mouseout", ()=>{
          imageOver.style.transform = "scale(1.0)";
          imageOver.style.transition = "transform 0.3s";
        })
}
const form = document.getElementById("comment-form")
const input = document.querySelector(".comment-input")
const commentList = document.getElementById("comment-list")

//added submit event listener to te comment form 

form.addEventListener("submit", (e)=>{
  e.preventDefault()
  //got value of the comment input field
  const comment = input.value
  const newComment = document.createElement("li")
  newComment.innerHTML = comment
  commentList.appendChild(newComment)
  //clear the input field after submitting the comment 
  input.value = ""
})

function postData(commentObj) {
  fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentObj),
  })
    .then((res) => res.json())
   
}

  









