console.log('in js');
// store employees in an array
const employees = [];
// monthly costs, a total of all employee salaries
let monthlyCosts = 0;
// this uses the Intl global object to format the monthly costs
const formatInUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'narrowSymbol',
});

// document is loaded, run ready()
$(ready);

function ready() {
  console.log('in jq');

  // add event listeners here
  // listen to clicks on the submit button to create new employee
  $(`#submit_button`).on(`click`, addEmployee);
  // listen to clicks on possible delete buttons to remove employees from the list
  $(`#table_body`).on(`click`, `.delete_button`, removeEmployee);
}

function addEmployee() {
  // grab the inputs and save to object
  let employee = grabInputs();

  // create a unique ID for the employee using Symbol()
  // can't trust the user input for the employee number
  employee.symbolID = Symbol();

  // push this employee to the employees array
  employees.push(employee);

  // empty inputs and set focus to first name
  emptyInputsAndFocus();
  updateTableDOM();
}

function removeEmployee() {
  console.log(`in remove`);

  // grab the row that was clicked on
  let currentRow = $(this).closest(`tr`);

  // retrieve the salary and symbol ID of this employee
  // using destructuring
  // the salary and symbol ID have been stored using the jQuery .data method
  let { symbolID } = currentRow.data('data');
  console.log('here it is');

  // find the index of the employee with this symbol in the employees array
  let index = employees.findIndex((employee) => {
    return employee.symbolID === symbolID;
  });

  // remove the employee at the index from the array
  employees.splice(index, 1);

  // delete the whole row from the DOM
  // no need to call updateTableDOM() because this removes the entry
  currentRow.remove();
  updateTotalCostsDOM();
}

// grabs the inputs from the input values
function grabInputs() {
  return {
    firstName: $(`#input_first_name`).val(),
    lastName: $(`#input_last_name`).val(),
    id: $(`#input_id`).val(),
    title: $(`#input_title`).val(),
    salary: Number($(`#input_salary`).val()),
  };
}

function emptyInputsAndFocus() {
  $(`.input`).val('');
  $(`#input_first_name`).focus();
}

function updateTableDOM() {
  let tableBody = $(`#table_body`);
  // clear the table body
  tableBody.empty();
  // display to the DOM
  for (let employee of employees) {
    // add each employee to the DOM
    // first construct the table row
    let row = $(`
    <tr>
      <td class="first_name">${employee.firstName}</td>
      <td class="last_name">${employee.lastName}</td>
      <td class="id">${employee.id}</td>
      <td class="title">${employee.title}</td>
      <td class="salary">${employee.salary}</td>
      <td><button class="delete_button btn btn-danger">DELETE</button></td>
    </tr>
    `);

    // add jQuery data to this employee entry containing the unique ID of the employee
    row.data('data', { symbolID: employee.symbolID });

    // append row to the table body
    tableBody.append(row);
  } // end for..let loop
  updateTotalCostsDOM();
}

function updateTotalCostsDOM() {
  // calculate the total monthly costs
  calcMonthlyCosts();

  // format the number for USD
  let formattedCosts = formatInUSD.format(monthlyCosts);

  // use the montlyCosts variable to update the total monthly
  $(`#total`).text(formattedCosts);

  // if the total montly costs exceeds $20,000, add red background to total monthly cost
  if (monthlyCosts > 20000) {
    $(`#total_monthly_message`).addClass(`redBackground`);
  } else {
    $(`#total_monthly_message`).removeClass(`redBackground`);
  }
}

function calcMonthlyCosts() {
  // not sure if this is actually easier to read than the for loop
  // but maybe more extensible?
  // .reduce() has to return an object with the key and value being counted
  monthlyCosts = employees.reduce((acc, cur) => {
    return { salary: acc.salary + cur.salary };
  }).salary;
}
