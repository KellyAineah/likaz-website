//Read
document.addEventListener("DOMContentLoaded", ()=>{
  const baseUrl= "http://localhost:3000/drinks"
  //a function to fetch and render drinks
  const cart = [];

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
// Get the comment form and other elements
const form = document.getElementById("comment-form");
const input = document.querySelector(".comment-input");
const commentList = document.getElementById("comment-list");

// Added submit event listener to the comment form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get value of the comment input field and create list item
    const comment = input.value;
    const newComment = document.createElement("li");
    newComment.textContent = comment; 
    commentList.appendChild(newComment);

    // Clear the input field after submitting the comment
    input.value = "";

    // Prepare the data object for POST
    const data = { comment: newComment.textContent };

    // Define function to post data
    function postData(data) {
        const url = "http://localhost:3000/comments"; 
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error posting data:', error));
    }

    // Call postData function with the prepared data
    postData(data);
});

const darkMode = document.querySelector(".btn-primary")
 darkMode.addEventListener("click", ()=>{
  document.body.classList.toggle("darkMode")

 })

 











