import menuArray from "./data.js";

const menuItems = document.querySelector(".menu-items");
const form = document.querySelector("form");

let order = [];
let isPaid = false;
document.addEventListener("click", (e) => {
  if (document.body.classList.contains("form-open")) return;

  if (e.target.classList.contains("add-item-btn")) {
    addItem(Number(e.target.dataset.orderedItem));
  } else if (e.target.classList.contains("remove-item-btn")) {
    removeItem(Number(e.target.dataset.removeIndex));
  } else if (e.target.classList.contains("complete-order-btn")) {
    if (order.length === 0) {
      alert("You can't put an empty order");
      return;
    }
    showForm();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  isPaid = true;
  renderOrder();
  renderOrderSuccess();
});

function addItem(orderedItemID) {
  const item = menuArray.find((i) => i.id === orderedItemID);
  order.push(item);
  renderOrder();
}

function removeItem(removeItemID) {
  order.splice(removeItemID, 1);
  renderOrder();
}

function renderItems() {
  const items = menuArray
    .map(function (item) {
      return `<section class="items-section border-b py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <p class="text-2xl">${item.emoji}</p>
            <div class="flex flex-col">
              <div>
                <p class="item-name font-bold">${item.name}</p>
                <p class="item-ingredients text-gray">${item.ingredients.join(
                  ", "
                )}</p>
              </div>

              <p class="item-price mt-2">$${item.price}</p>
            </div>
          </div>
          <button
            class="add-item-btn rounded-full border text-lg flex items-center justify-center"
            
            data-ordered-item=${item.id}
          >
            +
          </button>
        </div>
        
      </section>
      
      `;
    })
    .join("");

  return items;
}

function showForm() {
  form.classList.remove("hidden");
  document.body.classList.add("form-open");
}

function getTotal() {
  let Total = 0;
  order.forEach((i) => (Total += i.price));
  return Total;
}

function pageLoad() {
  menuItems.innerHTML = renderItems();
}

pageLoad();

function renderOrder() {
  const orderSection = document.querySelector(".order-section");

  if (isPaid) {
    orderSection.classList.add("hidden");
    return;
  }

  orderSection.innerHTML = `
            <p class="text-xl text-center mt-4">Your order</p>
            ${order
              .map(
                (item, index) => `
                <div class="flex justify-between mb-4 text-xl">
                    <p>${item.name}
                       <span class="remove-item-btn text-sm" data-remove-index="${index}">
                          remove
                       </span>
                    </p>
                    <p>$${item.price}</p>
                </div>
            `
              )
              .join("")}
            <div class="flex justify-between text-xl mb-7 border-t-2">
                <p>Total price:</p>
                <p>$${getTotal()}</p>
            </div>
            <button class="complete-order-btn">Complete order</button>
        `;
}

function renderOrderSuccess() {
  const formData = new FormData(form);
  const name = formData.get("name");
  const sucessMessageDiv = document.querySelector(".success-message-div");
  const sucessMessageParagraph = document.querySelector(".success-message");
  form.classList.add("hidden");
  sucessMessageDiv.classList.remove("hidden");

  sucessMessageParagraph.textContent = `Thanks, ${name}! Your order is on its way!`;
}
