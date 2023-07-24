// Load expenses from local storage
function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    return expenses;
  }
  
  // Save expenses to local storage
  function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
  
  // Display expenses in the table
  function displayExpenses() {
    const expenses = loadExpenses();
    const expenseTable = document.getElementById('expenseTable');
  
    // Clear the table body before re-populating
    expenseTable.innerHTML = `
      <tr>
        <th>Expense_Name</th>
        <th>Amount</th>
        <th>Delete</th>
        <th>Edit</th>
      </tr>
    `;
  
    expenses.forEach((expense) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.amount}</td>
      `;
      expenseTable.appendChild(row);
    });
  }
  
  // Add a new expense
  function addExpense(name, amount) {
    const expenses = loadExpenses();
    expenses.push({ name, amount });
    saveExpenses(expenses);
  }
  
  // Handle the form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    const expenseNameInput = document.getElementById('expenseName');
    const expenseAmountInput = document.getElementById('expenseAmount');
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
  
    if (name && amount) {
      addExpense(name, amount);
      expenseNameInput.value = '';
      expenseAmountInput.value = '';
      displayExpenses();
    } else {
      alert('Please enter valid Expense Name and Amount.');
    }
  }
  
  // Initialize the app
  function init() {
    const expenseForm = document.getElementById('expenseForm');
    expenseForm.addEventListener('submit', handleFormSubmit);
    displayExpenses();
  }
  
  // Call the init function after the DOM is loaded
  document.addEventListener('DOMContentLoaded', init);

  // ... (Existing code)

// Delete an expense
function deleteExpense(index) {
    const expenses = loadExpenses();
    expenses.splice(index, 1);
    saveExpenses(expenses);
    displayExpenses();
  }
  
  // Edit an expense
  function editExpense(index, name, amount) {
    const expenses = loadExpenses();
    expenses[index].name = name;
    expenses[index].amount = amount;
    saveExpenses(expenses);
    displayExpenses();
  }
  
  // Display expenses with delete and edit buttons
  function displayExpenses() {
    const expenses = loadExpenses();
    const expenseTable = document.getElementById('expenseTable');
  
    // Clear the table body before re-populating
    expenseTable.innerHTML = `
      <tr>
        <th>Expense Name</th>
        <th>Amount</th>
        <th>Delete</th>
        <th>Edit</th>
      </tr>
    `;
  
    expenses.forEach((expense, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.amount}</td>
        <td><button onclick="deleteExpense(${index})">Delete</button></td>
        <td><button onclick="editExpensePrompt(${index})">Edit</button></td>
      `;
      expenseTable.appendChild(row);
    });
  }
  
  // Prompt the user to edit an expense
  function editExpensePrompt(index) {
    const expenses = loadExpenses();
    const expense = expenses[index];
    const newName = prompt('Enter the new expense name:', expense.name);
    const newAmount = parseFloat(prompt('Enter the new amount:', expense.amount));
  
    if (newName !== null && newAmount !== null && !isNaN(newAmount)) {
      editExpense(index, newName, newAmount);
    } else {
      alert('Invalid input. Expense not updated.');
    }
  }
  
  // ... (Existing code)
  