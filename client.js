console.log('in js');

$(ready);

function ready() {
  console.log('in jq');

  // add event listeners here
  $(`#submit_button`).on(`click`, addEmployee);
}

function addEmployee() {
  console.log(`in add e`);

  // grab the inputs and save to object
}
