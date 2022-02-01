const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

//local storage

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

//add transaction
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e) {
     e.preventDefault()

     if (text.value === '' || amount.value === '') {
          alert('please enter both inputs')
     }
     else {
          newTrans = {
               id: generateID(),
               text: text.value,
               amount: +amount.value,
          }

          transactions.push(newTrans)

          console.log(transactions)

          updateLocalStorage();
          init();


          text.value = ''

          amount.value = ''


     }

}





// Generate random ID
function generateID() {
     return Math.floor(Math.random() * 100000000);
}



//add transactions to dom list

function addTransactionDOM(transaction) {
     // get sign 
     const sign = transaction.amount > 0 ? '+' : '-';

     const item = document.createElement('li')

     item.classList.add(transaction.amount > 0 ? 'plus' : 'minus')

     item.innerHTML = `${transaction.text}<span> ${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="remove(${transaction.id})">x</button> `;

     list.appendChild(item);






}

function remove(id) {
     transactions = transactions.filter(item => {
          return item.id !== id
     })

     updateLocalStorage();

     init();

}

//init app
function init() {

     list.innerHTML = ''

     transactions.forEach(item => addTransactionDOM(item))

     updateValues();
}



//update the balance income and epence

function updateValues() {
     const amounts = transactions.map(item => item.amount)

     console.log(amounts)

     const total = amounts.reduce((a, b) => (a += b), 0).toFixed(2);

     console.log(total)

     const income = amounts.filter(item => item > 0)
          .reduce((a, b) => (a += b), 0).toFixed(2)


     console.log(income)

     const expense = (amounts.filter(item => item < 0)
          .reduce((a, b) => (a += b), 0) * -1).toFixed(2);
     console.log(expense);

     balance.innerText = `$${total}`
     moneyPlus.innerText = `+$${income}`
     moneyMinus.innerText = `-$${expense}`
}

// getting transactions

form.addEventListener('submit', addTransaction);


//set local storage

function updateLocalStorage() {
     localStorage.setItem('transactions', JSON.stringify(transactions));
}

init();