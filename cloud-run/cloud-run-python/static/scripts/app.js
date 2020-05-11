// Use the values from the HTML template
const formMeasurement  = document.querySelector('form');
const inputMeasurement = document.querySelector('input');
const paraConversion   = document.querySelector('#conversion');

// Remove any existing content
paraConversion.textContent = '';

// Watch for submit and update the form
formMeasurement.addEventListener('submit', (event) => {
  event.preventDefault();

  if (parseInt(inputMeasurement.value)){
    const conversion = (inputMeasurement.value /25.4).toFixed(2);
    paraConversion.textContent = inputMeasurement.value.toString() + " millimeters is " + conversion.toString() + " inches"; 
  } else {
     paraConversion.textContent = "Please enter a valid number";
  }
})
