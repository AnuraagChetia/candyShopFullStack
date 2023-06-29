const form = document.getElementById("myForm");
const name = document.getElementById("name");
const description = document.getElementById("description");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");

form.addEventListener("submit", onSubmit);

async function getData() {
  const candies = await axios.get("http://localhost:3000/get-candy");
  for (let i = 0; i < candies.data.length; i++) {
    display(candies.data[i]);
  }
}

window.addEventListener("DOMContentLoaded", getData);

//function to run on form submit
async function onSubmit(e) {
  e.preventDefault();
  try {
    if (
      name.value === "" ||
      description.value === "" ||
      price.value === "" ||
      quantity.value === ""
    ) {
      alert("Please enter all fields");
    } else {
      let newData = {
        name: name.value,
        description: description.value,
        price: price.value,
        quantity: quantity.value,
      };
      console.log(newData);
      const res = await axios.post("http://localhost:3000/add-candy", newData);
      console.log(res);
      display(res.data);
      name.value = "";
      description.value = "";
      price.value = "";
      quantity.value = "";
    }
  } catch (error) {
    console.log(error);
  }
}
function display(data) {
  const parentNode = document.getElementById("display");
  const childHTML = `<li id="listItem">${data.name}-${data.description}-₹${data.price}- <span id="${data.id}">${data.quantity} </span>
  <button type="button" onclick="buyOne(${data.id})">Buy One</button>
  <button type="button" onclick="buyTwo(${data.id})">Buy Two</button>
  <button type="button" onclick="buyThree(${data.id})">Buy Three</button></li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
async function buyOne(id) {
  try {
    await axios.put(`http://localhost:3000/put-candy/${id}/1`);
    count(id, 1);
  } catch (error) {
    console.log(error);
  }
}
async function buyTwo(id) {
  try {
    await axios.put(`http://localhost:3000/put-candy/${id}/2`);
    count(id, 2);
  } catch (error) {
    console.log(error);
  }
}
async function buyThree(id) {
  try {
    await axios.put(`http://localhost:3000/put-candy/${id}/3`);
    count(id, 3);
  } catch (error) {
    console.log(error);
  }
}

function count(id, amount) {
  const quantity = document.getElementById(id);
  quantity.innerHTML = quantity.innerHTML - amount;
}
