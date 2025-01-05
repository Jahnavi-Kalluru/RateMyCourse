const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});

iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});
document
  .querySelector(".btnLogin-popup")
  .addEventListener("click", function () {
    document.querySelector(".overlay").classList.add("active");
    document.querySelector(".wrapper").classList.add("active-popup");
  });

document.querySelector(".icon-close").addEventListener("click", function () {
  document.querySelector(".overlay").classList.remove("active");
  document.querySelector(".wrapper").classList.remove("active-popup");
});

// JavaScript to highlight the current page
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll("nav a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Get the form and the close button elements // for refreshing the form after closing
const closeBtn = document.getElementById("closeBtn");
const signupForm = document.getElementById("signupForm");

// Add event listener to close button
closeBtn.addEventListener("click", function () {
  // Reset the form when the cross button is clicked
  signupForm.reset();

  // Optionally, you can hide or close the form
  // signupForm.style.display = 'none';
});

// JavaScript for resetting the form when the close button is clicked
document.getElementById("closeBtn").addEventListener("click", function () {
  document.login_form.reset(); // Reset the login form
  document.querySelector(".overlay").style.display = "none"; // Hide the overlay
});

// javascript for signup form

$("form[name=signup_form").submit(function (e) {
  var $form = $(this);
  var $error = $form.find(".error");
  var data = $form.serialize();

  $.ajax({
    url: "/user/signup",
    type: "POST",
    data: data,
    dataType: "json",
    success: function (resp) {
      alert("Registration successful!");
      window.location.href = "/dashboard.html";
    },
    error: function (resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    },
  });

  e.preventDefault();
});

// JavaScript for login form

$("form[name=login_form").submit(function (e) {
  var $form = $(this);
  var $error = $form.find(".error");
  var data = $form.serialize();

  $.ajax({
    url: "/user/login",
    type: "POST",
    data: data,
    dataType: "json",
    success: function (resp) {
      alert("Login successful!");
      window.location.href = "/dashboard.html";
    },
    error: function (resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    },
  });

  e.preventDefault();
});

document.getElementById("signoutBtn").addEventListener("click", function () {
  fetch("/user/signout", { method: "GET" })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        alert("Signout failed.");
      }
    })
    .catch((error) => console.error("Error during signout:", error));
});

//javascript for feedback form

$(document).ready(function() {
  $('#feedback-form').on('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      $.ajax({
          type: 'POST',
          url: '/feedback',
          data: $(this).serialize(),
          success: function(response) {
              alert(response.message);
              $('#feedback-form')[0].reset(); // Reset the form after submission
          },
          error: function(xhr) {
              alert(xhr.responseJSON.error || "Failed to submit feedback.");
          }
      });
  });
});