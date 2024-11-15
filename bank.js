// BankAccount class representing a bank account with basic operations
class BankAccount {
    // Constructor to initialize a new bank account
    constructor(accountNumber, accountHolder) {
        this.accountNumber = accountNumber;  // Account number
        this.accountHolder = accountHolder;  // Account holder's name
        this.balance = 0.0;  // Initial balance is 0.0
        this.transactions = [];  // Empty array to store transaction history
    }

    // Deposit method to add funds to the account
    deposit(amount) {
        if (amount <= 0) {  // Check if deposit amount is positive
            alert("Deposit amount must be positive.");
            return;
        }
        this.balance += amount;  // Increase balance
        this.transactions.push({ type: "Deposit", amount, balance: this.balance });  // Log transaction
        updateDisplay();  // Update UI display with new balance
        addTransactionToHistory("Deposit", amount);  // Add deposit transaction to history list
    }

    // Withdraw method to subtract funds from the account
    withdraw(amount) {
        if (amount <= 0) {  // Check if withdrawal amount is positive
            alert("Withdrawal amount must be positive.");
            return;
        }
        if (amount > this.balance) {  // Check if sufficient funds are available
            alert("Insufficient funds.");
            return;
        }
        this.balance -= amount;  // Decrease balance
        this.transactions.push({ type: "Withdrawal", amount, balance: this.balance });  // Log transaction
        updateDisplay();  // Update UI display with new balance
        addTransactionToHistory("Withdrawal", amount);  // Add withdrawal transaction to history list
    }

    // Getter method to return the current balance
    getBalance() {
        return this.balance;
    }

    // Getter method to return the transaction history
    getTransactionHistory() {
        return this.transactions;
    }
}

// Creating an instance of BankAccount
let account = new BankAccount("2334734", "Henry");

// Function to update the balance and account details in the UI
function updateDisplay() {
    document.getElementById("balance").innerText = account.getBalance().toFixed(2);  // Show current balance
    document.getElementById("account-number").innerText = account.accountNumber;  // Show account number
    document.getElementById("account-holder").innerText = account.accountHolder;  // Show account holder's name
}

// Function to add a transaction to the transaction history in the UI
function addTransactionToHistory(type, amount) {
    const historyList = document.getElementById("transaction-history");  // Get the transaction history element
    const listItem = document.createElement("li");  // Create a new list item for the transaction
    listItem.textContent = `${type} of $${amount.toFixed(2)}`;  // Set the transaction text
    historyList.appendChild(listItem);  // Add the list item to the history list
}

// Function to handle deposit action from the UI
function deposit() {
    const amount = parseFloat(document.getElementById("deposit-amount").value);  // Get deposit amount from input field
    if (!isNaN(amount)) {  // Check if the input is a valid number
        account.deposit(amount);  // Call deposit method on the account
        document.getElementById("deposit-amount").value = '';  // Clear the input field
    }
}

// Function to handle withdrawal action from the UI
function withdraw() {
    const amount = parseFloat(document.getElementById("withdraw-amount").value);  // Get withdrawal amount from input field
    if (!isNaN(amount)) {  // Check if the input is a valid number
        account.withdraw(amount);  // Call withdraw method on the account
        document.getElementById("withdraw-amount").value = '';  // Clear the input field
    }
}

// Function to handle money transfer between accounts from the UI
function transfer() {
    const transferAmount = parseFloat(document.getElementById("transfer-amount").value);  // Get transfer amount from input field
    const toAccount = document.getElementById("transfer-account").value;  // Get recipient account number from input field

    if (isNaN(transferAmount) || transferAmount <= 0) {  // Check if transfer amount is valid
        alert("Please enter a valid transfer amount.");
        return;
    }

    if (!toAccount) {  // Check if recipient account is provided
        alert("Please enter a valid account number to transfer to.");
        return;
    }

    if (transferAmount > account.getBalance()) {  // Check if there are sufficient funds for transfer
        alert("Insufficient funds for transfer.");
        return;
    }

    account.withdraw(transferAmount);  // Withdraw the transfer amount from the account
    addTransactionToHistory(`Transfer to ${toAccount}`, transferAmount);  // Log the transfer transaction
    document.getElementById("transfer-amount").value = '';  // Clear the input fields
    document.getElementById("transfer-account").value = '';
}

// Initial call to display account details when the page loads
updateDisplay();
