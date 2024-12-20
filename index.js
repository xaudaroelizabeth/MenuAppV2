import {menuArray}  from './data.js'

const menuItemsEl = document.getElementById("menu-items")
const paymentModalEl = document.getElementById("payment-modal")

let newArray = menuArray.map(item => {
          return`<div class="item" data-id="${item.id}">
                <div class="item-img">${item.emoji}
                </div>
                <div class="item-description">
                    <div class="item-name">${item.name}</div>
                    <div class="ingredients">${item.ingredients}</div>
                    <p class="price">$${item.price}</p>
                </div>
                <button data-button="${item.id}" class="add-item">+
                </button>
            </div>
            <hr>`
            })
            
let cart = [ ]

menuItemsEl.innerHTML = newArray.join(' ')


document.addEventListener('click', function(e){
    if(e.target.dataset.button){
        let itemId = e.target.dataset.button
        const newItem = menuArray.filter(menuItem => menuItem.id == itemId)[0]
        cart.push(newItem)
        render(cart)
    }
     if(e.target.dataset.remove){
        let removeIndex = (e.target.dataset.remove)
        cart = cart.filter((item,i) => i != removeIndex)
        render(cart)
     }
     
     if(e.target.id === 'submit-btn'){
       paymentModalEl.style.display = "block"  
     }
     
     if(e.target.id === 'payment-btn'){
       paymentModalEl.style.display = "none"
       const paymentConfirmationEl = document.getElementById("payment-confirmation")
       paymentConfirmationEl.style.display = "block"
       const mainContainerEl = document.getElementById("main-container")
       mainContainerEl.style.display = "none"
     }
     
    
})

function render(cart){
    let arrHtml = cart.map((item,i) => {
        return `<div class="ticket-container">
                    <div class="item-ordered">${item.name}</div>
                    <button data-remove="${i}" class="remove-btn">remove</button>
                    <div class="item-price">$${item.price}</div>
                </div>`
    })
    
    document.getElementById("container-items").innerHTML = arrHtml.join(' ')
    
    const totalPrice = cart.reduce((total, currentObj) => total + currentObj.price, 0)
    console.log(totalPrice)
    
    document.getElementById("total-price").innerHTML = `$${totalPrice}`  
}



