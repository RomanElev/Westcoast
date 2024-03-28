import { addNewStudent, getStudents } from "./index.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector("#login-button");
  const addStudentButton = document.querySelector("#addStudentButton");
  const studentForm = document.querySelector("#addStudent");

  const addNewStudentHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(studentForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const addedStudent = await addNewStudent(data);
      console.log(addedStudent);
      studentForm.reset();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("logging in");

    try {
      const students = await getStudents();
      const loginEmail = document.getElementById("login-email").value;
      console.log("Email Input:", loginEmail);

      const found = students.find((student) => student.email === loginEmail);

      if (found) {
        console.log("Email exists");
        showWarningMessage("Email already exists. Please log in.", true);
        clearWarningMessages();
      } else {
        console.log("Email not found");
        showWarningMessage("Email not registered. Please sign up.", true);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const clearWarningMessages = () => {
    const warningElement = document.getElementById("warning-message");
    if (warningElement) {
      warningElement.remove();
    }
  };

  const showWarningMessage = (message, isError) => {
    const warningElement = document.createElement("div");
    warningElement.id = "warning-message";
    warningElement.classList.add("warning");
    warningElement.textContent = message;
    if (isError) {
      warningElement.classList.add("fel");
    }

    document.querySelector("form").appendChild(warningElement);

    setTimeout(() => {
      clearWarningMessages();
    }, 3000);
  };

  addStudentButton.addEventListener("click", addNewStudentHandler);
  loginButton.addEventListener("click", loginHandler);
});
