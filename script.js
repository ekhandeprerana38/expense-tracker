const form = document.getElementById("transaction-form");

const descriptionInput = document.getElementById("description");

const amountInput = document.getElementById("amount");

const typeInput = document.getElementById("type");

const categoryInput = document.getElementById("category");

const transactionList = document.getElementById("transaction-list");

const balanceElement = document.getElementById("balance");

const incomeElement = document.getElementById("income");

const expenseElement = document.getElementById("expense");

const transactionCountElement = document.getElementById("transaction-count");
const searchInput = document.getElementById("search");

const clearAllButton =
document.getElementById("clear-all");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const description = descriptionInput.value;

    const amount = Number(amountInput.value);

    const type = typeInput.value;

    const transaction = {
        description: description,
        amount: amount,
        type: type,
        category: categoryInput.value,
        date: new
    Date().toLocaleDateString()
    };

    transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();

    updateSummary();

    form.reset();

});

function displayTransactions() {

    transactionList.innerHTML = "";

    transactions
    .filter(function(transaction) {
        const searchText = searchInput.value.toLowerCase();

        return (
            (transaction.description || "").toLowerCase().includes(searchText) ||
            (transaction.category || "").toLowerCase().includes(searchText)
        );
    })
    .forEach(function(transaction) {

        const li = document.createElement("li");

        const deleteButton = document.createElement("button");

        const editButton =
        document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";

        editButton.addEventListener("click", function() {
    const newDescription = prompt("Enter new description:", transaction.description);
    const newAmount = prompt("Enter new amount:", transaction.amount);

    if (newDescription !== null && newAmount !== null) {
        transaction.description = newDescription;
        transaction.amount = Number(newAmount);

        localStorage.setItem("transactions", JSON.stringify(transactions));

        displayTransactions();
        updateSummary();
    }
});

deleteButton.textContent = "Delete";
deleteButton.className = "delete-btn";

deleteButton.addEventListener("click", function() {
    transactions.splice(transactions.indexOf(transaction), 1);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();

    updateSummary();
});

        if (transaction.type === "income") {

            li.textContent =
    transaction.description +
    " + ₹" +
    transaction.amount +
    " | 🏷️ " +
    (transaction.category || "other").charAt(0).toUpperCase() + 
    (transaction.category || "other").slice(1) + " | 📅 " +
    transaction.date;
            li.style.color = "green";

        } else {

            li.textContent =
    transaction.description +
    " - ₹" +
    transaction.amount +
    " | 🏷️ " +
    (transaction.category || "other").charAt(0).toUpperCase() + 
    (transaction.category || "other").slice(1) + 
    " | 📅 " +
    transaction.date;

            li.style.color = "red";

        }
        const buttonContainer = document.createElement("div");

buttonContainer.appendChild(editButton);
buttonContainer.appendChild(deleteButton);

li.appendChild(buttonContainer);

        transactionList.appendChild(li);
        
    });
}

function updateSummary() {

    let income = 0;

    let expense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            income = income + transaction.amount;

        } else {

            expense = expense + transaction.amount;

        }

    });

    const balance = income - expense;

    incomeElement.textContent = "₹" + income;

    expenseElement.textContent = "₹" + expense;

    balanceElement.textContent = "₹" + balance;

    transactionCountElement.textContent = transactions.length;

}

displayTransactions();
updateSummary();

searchInput.addEventListener("input",function() {
    displayTransactions()
});

clearAllButton.addEventListener("click", function() {
    transactions = [];

localStorage.removeItem("transactions");

    displayTransactions();
    updateSummary();
});


    