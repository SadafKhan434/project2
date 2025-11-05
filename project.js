document.addEventListener('DOMContentLoaded',() => {
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseDescriptionInput = document.getElementById('expenseDescription');
const expenseCategorySelect = document.getElementById('expenseCategory');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseList = document.getElementById('expenseList');
let expenses = [];
const renderExpenses = () => {
    expenseList.innerHTML = '';
    expenses.forEach((expense , index) =>  {
         const expenseItem  = document.createElement('div');
         expenseItem.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center';
         expenseItem.innerHTML =`
         <span>$${expense.amount} -${expense.description} -${expense.category}</span>
         <div>
         <button class="btn btn-sm btn-warning edit-btn me-2" data-index="${index}">Edit Expense</button>
         <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete Expense</button>
         </div>      
         `;
         expenseList.appendChild(expenseItem);

    });
};
const addExpense = () => {
    const amount= expenseAmountInput.value;
    const description = expenseDescriptionInput.value;
    const category = expenseCategorySelect.value;
    if(amount && description){
        expenses.push({amount,description,category });
        renderExpenses();
        expenseAmountInput.value = '';
        expenseDescriptionInput.value = '';
    }
    else{
        alert('Please enter both amount and description.');
    }
};
const deleteExpense = (index) => {
    expenses.splice(index,1);
    renderExpenses();
};
const editExpense = (index) => {
    const expense = expense[index];
    expenseAmountInput.value = expense.amount;
    expenseDescriptionInput.value = expense.description;
    expenseCategorySelect.value = expense.category;
    deleteExpense(index);
};
addExpenseBtn.addEventListener('click',addExpense);
expenseList.addEventListener('click',(e) => {
    if(e.target.classList.contains('delete-btn')){
        const index = e.target.getAttributes('data-index');
        deleteExpense(index);
    }
    if(e.target.classList.contains('edit-btn')){
        const index = e.target.getAttributes('data-index');
        editExpense(index);
    }
});
renderExpenses();
});