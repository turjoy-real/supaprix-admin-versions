import * as authActions from "./store/actions/auth";
import store from "./dist/store/main";

class Login {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateonSubmit();
  }

  validateonSubmit() {
    let self = this; // setup calls to the "this" values of the class described in the constructor

    // add a "submit" event listener to the form
    this.form.addEventListener("submit", (e) => {
      // remove default functionality
      e.preventDefault();
      var error = 0;
      // loop through the fields and check them against a function for validation
      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);

        if (self.validateFields(input) == false) {
          // if a field does not validate, auto-increment our error integer
          error++;
        }
      });
      // const stuff = document.getElementById("username").value;

      // if everything validates, error will be 0 and can continue
      if (error == 0) {
        this.signIn(0);
        //do login api here or in this case, just submit the form and set a localStorage item
        localStorage.setItem("auth", 1);
        this.form.submit();
      }
    });
  }

  // xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
  // xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
  checkUserSIEmail() {
    var userSIEmail = document.getElementById("username");
    var userSIEmailFormate =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userSIEmail.value.match(userSIEmailFormate)) {
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      document.getElementById("username").style.display = "block";
    } else {
      document.getElementById("username").style.display = "none";
    }
  }
  // xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
  checkUserSIPassword() {
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userSIPassword.value.match(userSIPasswordFormate)) {
      flag = false;
    } else {
      flag = true;
    }
    if (flag) {
      document.getElementById("userSIPasswordError").style.display = "block";
    } else {
      document.getElementById("userSIPasswordError").style.display = "none";
    }
  }
  // xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx
  signIn() {
    var userSIEmail = document.getElementById("username").value;
    var userSIPassword = document.getElementById("password").value;
    var userSIEmailFormate =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if (checkUserEmailValid == null) {
      return checkUserSIEmail();
    } else if (checkUserPasswordValid == null) {
      return checkUserSIPassword();
    } else {
      try {
        store.dispatch(authActions.login(userSIEmail, userSIPassword));
      } catch (error) {
        console.log(error);
      }
    }
  }

  validateFields(field) {
    // remove any whitespace and check to see if the field is blank, if so return false
    if (field.value.trim() === "") {
      // set the status based on the field, the field label, and if it is an error message
      this.setStatus(
        field,
        `${field.previousElementSibling.innerText} cannot be blank`,
        "error"
      );
      return false;
    } else {
      // if the field is not blank, check to see if it is password
      if (field.type == "password") {
        // if it is a password, check to see if it meets our minimum character requirement
        if (field.value.length < 8) {
          // set the status based on the field, the field label, and if it is an error message
          this.setStatus(
            field,
            `${field.previousElementSibling.innerText} must be at least 8 characters`,
            "error"
          );
          return false;
        } else {
          // set the status based on the field without text and return a success message
          this.setStatus(field, null, "success");
          return true;
        }
      } else {
        // set the status based on the field without text and return a success message
        this.setStatus(field, null, "success");
        return true;
      }
    }
  }

  setStatus(field, message, status) {
    // create variable to hold message
    const errorMessage = field.parentElement.querySelector(".error-message");

    // if success, remove messages and error classes
    if (status == "success") {
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      field.classList.remove("input-error");
    }
    // if error, add messages and add error classes
    if (status == "error") {
      errorMessage.innerText = message;
      field.classList.add("input-error");
    }
  }
}

// create a variable for the login form
const form = document.querySelector(".loginForm");
// if the form exists, run the class
if (form) {
  // setup the fields we want to validate, we only have two but you can add others
  const fields = ["username", "password"];
  // run the class
  const validator = new Login(form, fields);
}
