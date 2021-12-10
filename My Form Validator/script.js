const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Error
function isError(input, msg) {
  const inputContainer = input.parentElement;
  inputContainer.className = "inputContainer error";
  const small = inputContainer.querySelector('small');
  small.innerText = msg;
}

// Valid
function isValid(input) {
  const inputContainer = input.parentElement;
  inputContainer.className = "inputContainer valid";
}  

// Check if there are any blanks
  function checkBlank(array) {
    array.forEach(function(currentItem) {
      if (currentItem.value.trim() === "") {
        isError(currentItem, `${isCap(currentItem.id)} is missing.`)
      } else {
        isValid(currentItem);
      }
    })
  }

  function isCap(input) {
    return input.slice(0,1).toUpperCase() + input.slice(1);
  }

  // Email Authentication
  function emailAuth(email) {
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // test if email passes re. boolean result  
    if (re.test(email.value.trim())) {
      isValid(email);
    } else {
      isError(email, "Not a valid email.")
    }
  }

  // Check Length (min and max)
  function checkLength(input, min, max) {
    if (input.value.length < min) {
      isError(input, `Need at least ${min} characters.`);
    } else if (input.value.length > max) {
      isError(input, `Can't have more than ${max} characters.`);
    };
  }

  function passwordMatch(pass1, pass2) {
    if (pass1.value.trim() === pass2.value.trim() && pass1.value.trim() !== "") {
      isValid(password2);
    } else {
      isError(password2, "Passwords don't match.")
    }
  }

  // If all fields are green, extra message.
  function extraMessage(array) {
    let counter = 0;
    array.forEach(item => {
      if (item.parentElement.className.includes('valid')) {
        counter += 1;
      }
      })
    if (counter === 4) {
      document.getElementById('msg').className = 'valid';
    }
  }  



form.addEventListener("submit", function(e) {
  e.preventDefault();


  checkBlank([username, email, password, password2]);
  emailAuth(email);
  checkLength(username, 3, 15);
  checkLength(password, 6, 12);
  passwordMatch(password, password2);
  extraMessage([username, email, password, password2]);

})