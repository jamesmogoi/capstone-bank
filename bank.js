class BankAccount {
    constructor(accountNumber, accountHolder) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = 0.0;
        this.transactions = [];
    }

    deposit(amount) {
        if (amount <= 0) {
            alert("Deposit amount must be positive.");
            return;
        }
        this.balance += amount;
        this.transactions.push({ type: "Deposit", amount, balance: this.balance });
        updateDisplay();
        addTransactionToHistory("Deposit", amount);
    }

    withdraw(amount) {
        if (amount <= 0) {
            alert("Withdrawal amount must be positive.");
            return;
        }
        if (amount > this.balance) {
            alert("Insufficient funds.");
            return;
        }
        this.balance -= amount;
        this.transactions.push({ type: "Withdrawal", amount, balance: this.balance });
        updateDisplay();
        addTransactionToHistory("Withdrawal", amount);
    }

    getBalance() {
        return this.balance;
    }

    getTransactionHistory() {
        return this.transactions;
    }
}

let account = new BankAccount("2334734", "Henry");

function updateDisplay() {
    document.getElementById("balance").innerText = account.getBalance().toFixed(2);
    document.getElementById("account-number").innerText = account.accountNumber;
    document.getElementById("account-holder").innerText = account.accountHolder;
}

function addTransactionToHistory(type, amount) {
    const historyList = document.getElementById("transaction-history");
    const listItem = document.createElement("li");
    listItem.textContent = `${type} of $${amount.toFixed(2)}`;
    historyList.appendChild(listItem);
}

function deposit() {
    const amount = parseFloat(document.getElementById("deposit-amount").value);
    if (!isNaN(amount)) {
        account.deposit(amount);
        document.getElementById("deposit-amount").value = '';
    }
}

function withdraw() {
    const amount = parseFloat(document.getElementById("withdraw-amount").value);
    if (!isNaN(amount)) {
        account.withdraw(amount);
        document.getElementById("withdraw-amount").value = '';
    }
}


function transfer() {
    const transferAmount = parseFloat(document.getElementById("transfer-amount").value);
    const toAccount = document.getElementById("transfer-account").value;

    if (isNaN(transferAmount) || transferAmount <= 0) {
        alert("Please enter a valid transfer amount.");
        return;
    }

    if (!toAccount) {
        alert("Please enter a valid account number to transfer to.");
        return;
    }

    if (transferAmount > account.getBalance()) {
        alert("Insufficient funds for transfer.");
        return;
    }

    account.withdraw(transferAmount);
    addTransactionToHistory(`Transfer to ${toAccount}`, transferAmount);
    document.getElementById("transfer-amount").value = '';
    document.getElementById("transfer-account").value = '';
}


updateDisplay();
