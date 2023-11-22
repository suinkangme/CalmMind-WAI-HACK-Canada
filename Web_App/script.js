const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      signupButton = document.getElementById("signup-button")
      login = document.querySelector(".login-link");

//  javascript code to show/hide password and change eye icon
pwShowHide.forEach(eyeIcon =>{
    eyeIcon.addEventListener("click", ()=>{
        pwFields.forEach(pwFields =>{
            if(pwFields.type === "password"){
                pwFields.type = "text";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            }else{
                pwFields.type = "password";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})

const getElementValue = (elementId) => {
    const element = document.getElementById(elementId)

    return element.value
}

const setInnerHTMLOfElement = (elementId, innerHTML) => {
    const element = document.getElementById(elementId)

    element.innerHTML = innerHTML
}

const validatePasswords = (password, confirmPassword) => {
    if(password !== confirmPassword){
        setInnerHTMLOfElement('error-password', 'Your passwords do not match!')
    } else {
        setInnerHTMLOfElement('error-password', '')
    }
}

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailValid = re.test(String(email).toLowerCase());
    if(!email || !isEmailValid){
        setInnerHTMLOfElement('error-email', 'Please enter a valid email address!')
    } else {
        setInnerHTMLOfElement('error-email', '')
    }
}

const validateName = (name) => {
    if(!name){
        setInnerHTMLOfElement('error-name', 'Your name is invalid!')
    } else {
        setInnerHTMLOfElement('error-name', '')
    }
}

const validateSignupInformation = (e) => {
    const nameValue = getElementValue('signup-name')
    const emailValue = getElementValue('signup-email')
    const passwordValue = getElementValue('signup-password')
    const confirmPasswordValue = getElementValue('signup-password2')

    validatePasswords(passwordValue, confirmPasswordValue)
    validateEmail(emailValue)
    validateName(nameValue)

    console.log(nameValue, emailValue, passwordValue, confirmPasswordValue)
}

signupButton.addEventListener('click', validateSignupInformation)

// javascript code to display signup and login form
signUp.addEventListener("click", ( )=>{
    container.classList.add("active");
});
login.addEventListener("click", ( )=>{
    container.classList.remove("active");
});