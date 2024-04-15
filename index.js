

document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000/drinks";
  const cart = [];

  function getDrink() {
    fetch(`${baseUrl}`)
      .then(res => res.json())
      .then(listDrink => listDrink.forEach(drink => renderDrink(drink)));
  }

  getDrink();

  function renderDrink(drink) {
    const output = document.querySelector(".container");
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${drink.img}" class="card-img-top" alt="drink picture">
        <div class="card-body">
          <h5 class="card-name">${drink.name}</h5>
          <h5 class="card-title">Category: ${drink.category}</h5>
          <p class="card-text">${drink.description}</p>
          <p class="card-text" id="inventory-${drink.id}">${drink.inventory} Bottles Left</p>
          <button class="btn btn-primary add-to-cart" data-id="${drink.id}" data-name="${drink.name}" data-price="${drink.price}" data-inventory="${drink.inventory}">Add to Cart <br> Ksh.${drink.price}</button>
        </div>
      </div>`;

    output.appendChild(div);
    const imageOver = div.querySelector(".card-img-top");
  //added mouseover event listener to scale image when hovered
  imageOver.addEventListener("mouseover", () => {
    imageOver.style.transform = "scale(0.7)";
    imageOver.style.transition = "transform 0.3s";
  });
  //added mouseout event listener to reset the image scale
  imageOver.addEventListener("mouseout", () => {
    imageOver.style.transform = "scale(1.0)";
    imageOver.style.transition = "transform 0.3s";
  });
  

    document.querySelector(`[data-id="${drink.id}"]`).addEventListener('click', function (event) {
      const buttonClicked = event.target;
      const itemId = buttonClicked.getAttribute('data-id');
      const itemName = buttonClicked.getAttribute('data-name');
      const itemPrice = parseFloat(buttonClicked.getAttribute('data-price'));
      let itemInventory = parseInt(buttonClicked.getAttribute('data-inventory'));

      if (buttonClicked.classList.contains('add-to-cart')) {
        if (itemInventory > 0) {
          itemInventory--;
          buttonClicked.setAttribute('data-inventory', itemInventory);
          document.getElementById(`inventory-${itemId}`).textContent = `${itemInventory} Bottles Left`;
          addItemToCart(itemId, itemName, itemPrice);
        } else {
          alert("Sold Out!");
        }
      }
    });
  }

  function addItemToCart(id, name, price) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
  }

  function removeItemFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      updateCartUI();
    }
  }

  function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear cart items
    let totalItems = 0;  // This will store the sum of all quantities

    cart.forEach(item => {
      const itemElement = document.createElement('li');
      itemElement.textContent = `${item.name} - ${item.quantity} x Ksh.${item.price}`;
      const removeButton = document.createElement('button');
      removeButton.innerHTML = '<span style="margin-left: 10px; font-weight: bold; color: blue;">Remove</span>';
      removeButton.addEventListener('click', () => removeItemFromCart(item.id));
      itemElement.appendChild(removeButton);
      cartContainer.appendChild(itemElement);
      totalItems += item.quantity;
    });

    const totalPrice = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    document.getElementById('cart-total-price').textContent = `Ksh. ${totalPrice}`;
    document.querySelector('.nav-items span').textContent = totalItems;
  }
});
const darkMode = document.querySelector(".btn-primary");
darkMode.addEventListener("click", () => {
  document.body.classList.toggle("darkMode");
});



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