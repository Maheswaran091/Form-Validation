const form = document.querySelector('#form')
const email = document.querySelector('#Email')
const password = document.querySelector('#password')

form.addEventListener('submit', (e) => {
    e.preventDefault() // check the form  is -> all inputs are valid
    if (Validateform()) {
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        const userData = localStorage.getItem(emailValue);

        if (!userData) {
            alert("Account not registered");
            return;
        }

        const user = JSON.parse(userData);

        if (user.password === passwordValue) {
            alert("Login Successful");
            window.location.href = "index.html";
        } else {
            alert("Incorrect Password");
        }
    }
})

function Validateform() {
    // Trim the Value Like "Spaces Remove"
    const emailvalue = email.value.trim()
    const passwordvalue = password.value.trim()

    let success = true; // form submission check used for this variables
    // Validates

    // Email
    if (emailvalue === '') {
        success = false;
        setError(email, 'Email is Required')
    }
    else if (!validateEmail(emailvalue)) {
        success = false;
        setError(email, "Plese Enter the valid Email")
    }
    else {
        setSuccess(email)
    }
    // Password
    if (passwordvalue === '') {
        success = false;
        setError(password, "Password is Required")
    }
    else if (!isValidPassword(passwordvalue)) {
        success = false;
        setError(password, "Minimum 8 characters in length At, least one lowercase letter,At least one uppercase letter,At least one digit,At least one special character from the set !@#$%^&*")
    }
    else {
        setSuccess(password)
    }
    return success
}

// Set the Error -> Show the Require field
// Element is -> email,password,username etc..
// Message is -> send the "Password is Required"
function setError(element, message) {
    // Get
    const inputGroup = element.parentElement; // find the child to parent Element
    const errorElement = inputGroup.querySelector('.error') // find the "Error Id"

    // Show
    errorElement.innerText = message  // Show the Error Message
    inputGroup.classList.add('error')   // Add the Error classs -> This is show the Error Box color "Red"
    inputGroup.classList.remove("success") // Remove the Success class -This is not Showing for Error Function

}

// Set The Success -> 
// Element is -> email,password,username etc..
// Message is -> ""
function setSuccess(element, message) {
    // Get
    const inputGroup = element.parentElement; // find the child to parent Element
    const errorElement = inputGroup.querySelector('.error') // find the "Error Id"

    // Show
    errorElement.innerText = ''  // Remove the Error Message
    inputGroup.classList.add('success')   // Add the Sucess classs -> This is show the Error Box color "Green"
    inputGroup.classList.remove("error") // Remove the Error class -This is not Showing for Error Function

}

// Regular Expression  for Email
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Regular Expression for Password
function isValidPassword(password) {
    // Regex pattern using positive lookahead assertions
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // The test() method returns true if the string matches the regex, false otherwise
    return passwordRegex.test(password);
}