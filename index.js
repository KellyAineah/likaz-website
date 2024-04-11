document.addEventListener("DOMContentLoaded", ()=>{
    function getDrink(){
    fetch("http://localhost:3000/drinks")
    .then(res => res.json())
    .then(listDrink => listDrink.forEach(drink => renderDrink(drink)));
       
    }
    getDrink()
})
     
 function renderDrink(drink){
    
    const output = document.querySelector("#output")
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
}
  const form = document.getElementById("comment-form")
  const input = document.getElementsByClassName("comment-input")
  form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const comment = input.value;
    const listItem = document.createElement("li");
    listItem.textContent = comment;
    commentList.appendChild(listItem)
    

       
  })



 




 
