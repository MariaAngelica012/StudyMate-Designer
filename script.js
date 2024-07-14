    //Open and close cart
    const cartIcon = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const closeCart = document.querySelector("#close-cart");

    cartIcon.addEventListener("click", () => {
        cart.classList.add("active");
    });

    closeCart.addEventListener("click", () => {
        cart.classList.remove("active");
    });

    //Start when the document is ready
    if(document.readyState == "loading"){
        document.addEventListener("DOMContentLoaded", start);
    } else{
        start();
    }

    //------------ Start ----------------//
    function start(){
        addEvents();

    }

    //----------- Update and Rerender -----------//
    function update(){
        addEvents();
        updateTotal();
    }

    //------------ Add Events -------------//
    function addEvents(){
        //Remove items from cart
        let cartRemove_btns = document.querySelectorAll(".cart-remove");
        console.log(cartRemove_btns);
        cartRemove_btns.forEach((btn) => {
            btn.addEventListener("click", handle_removeCartItems);
        });

    //------------- Change item quantity ------------//
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    //------------- Add items to cart --------------//
    let addcart_btns = document.querySelectorAll(".add-cart");
    addcart_btns.forEach(btn => {
        btn.addEventListener("click", handle_addCartItem);
    });

    //Buy Order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
    }


    //------------ Handle events functions ----------------
    let itemsAdded = []
    function handle_addCartItem() {
        let product = this.parentElement;
        let title = product.querySelector(".product-title").innerHTML;
        let price = product.querySelector(".price").innerHTML;
        let imgSrc = product.querySelector(".product-img").src;
        console.log(title, price, imgSrc);

        let newToAdd = {
            title,
            price,
            imgSrc,
        };

        //Item is already exist
        if(itemsAdded.find(el => el.title == newToAdd.title)){
            alert("This item is already exist on cart.");
            return;
        }else{
            itemsAdded.push(newToAdd);
            alert("Added successfully!");
        }


        //Add product to cart
        let cartBoxElement = cartBoxComponents(title, price, imgSrc);
        let newNode = document.createElement("div");
        newNode.innerHTML = cartBoxElement;
        const cartContent = cart.querySelector(".cart-content");
        cartContent.appendChild(newNode);

         // Insert the new node at the top of the cart content
    const firstChild = cartContent.firstChild;
    cartContent.insertBefore(newNode, firstChild);

        update();
    }
    
    function handle_removeCartItems(){
        this.parentElement.remove();
     itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector(".cart-product-title").innerHTML);

        update();
    }


    function handle_changeItemQuantity(){
        if(isNaN(this.value) || this.value < 1){
            this.value = 1;
        }
        this.value = Math.floor(this.value);
        update();
    }

    function handle_buyOrder() {
        if (itemsAdded.length <= 0) {
            alert("There is NO order to placed yet.");
            return;
        }
        const cartContent = cart.querySelector(".cart-content");
        cartContent.innerHTML = ""; // Clear cart items only
        alert("Placed Order!");
        itemsAdded = []; // Clear the itemsAdded array
        updateTotal(); // Update the total
    }
    

    //----------- Update and Rerender Function -----------//
    function updateTotal(){
        let cartBoxes = document.querySelectorAll(".cart-box");
        const totalElement = cart.querySelector(".total-price");
        let total = 0;
        cartBoxes.forEach(cartBox => {
            let priceElement = cartBox.querySelector(".cart-price");
            let price = parseFloat(priceElement.innerHTML.replace("₱", ""));
            let quantity = cartBox.querySelector(".cart-quantity").value;
            total += price * quantity;
        });

        //keep 2 decimal
        total = total.toFixed(2);

        

        totalElement.innerHTML = "₱" + total;
    }



    //-------------- HTML Components ---------------//
    function cartBoxComponents(title, price, imgSrc){
        return `
          <div class="cart-box">
            <!-- Test -->
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
            <!-- Remove -->
            <i class="fa-solid fa-trash cart-remove"></i>
        </div>`;
    }
             



y