console.log('in js');
// store employees in an array
const employees = [];
// document is loaded, run ready()
$(ready);

function ready() {
  console.log('in jq');

  // add event listeners here
  $(`#submit_button`).on(`click`, addEmployee);
}

function addEmployee() {
  // grab the inputs and save to object
  let employee = {
    firstName: $(`#input_first_name`).val(),
    lastName: $(`#input_last_name`).val(),
    id: $(`#input_id`).val(),
    title: $(`#input_title`).val(),
    salary: $(`#input_salary`).val(),
  };

  // push this employee to the employees array
  employees.push(employee);

  // empty inputs and set focus to first name
  $(`#input_first_name`).val('');
  $(`#input_first_name`).focus();
  $(`#input_last_name`).val('');
  $(`#input_id`).val('');
  $(`#input_title`).val('');
  $(`#input_salary`).val('');

  updateDOM();
}

function updateDOM() {
  let tableBody = $(`#table_body`);
  // clear the table body
  tableBody.empty();
  // display to the DOM
  for (let employee of employees) {
    // add each employee to the DOM
    // first construct the table row
    let row = `
    <tr>
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.id}</td>
      <td>${employee.title}</td>
      <td>${employee.salary}</td>
      <td><button class="delete_button">DELETE</button></td>
    </tr>
    `;
    // append row to the table body
    tableBody.append(row);
  } // end for..let loop
}
