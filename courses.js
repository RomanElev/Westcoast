import { getStudents } from "./index.js";

document.addEventListener("DOMContentLoaded", function () {
  const courseList = document.querySelector("#courses");
  const searchInput = document.querySelector("#search-bar");
  const studentlist = document.querySelector("#students");

  async function listCourses() {
    try {
      const response = await fetch("http://localhost:3000/courses");
      if (response.ok) {
        const courses = await response.json();
        courseList.innerHTML = courses
          .map(
            (course) => `
          <div class="course-card">
            <h4>${course.title}</h4>
            <span>${course.number} ${course.duration}</span>
            <span>${course.location} ${course.date}</span>
            <button><a href="add/new-client.html">Sign up</a></button>
          </div>
        `
          )
          .join("");
      } else {
        console.log("Failed to fetch courses:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function listStudents() {
    const students = await getStudents();
    students.forEach((students) => {
      console.log(students);
      studentlist.innerHTML += `
            <div>
            <h4>${students.title}</h4>
            <span>${students.firstName}</span>
            <span>${students.lastName}</span>
            <span>${students.adress}</span>
            <span>${students.email}</span>
            <span>${students.studyStructure}</span>
            </div>
            `;
    });
  }

  async function searchStudent(e) {
    e.preventDefault();
    const students = await getStudents();

    const searchTerm = searchInput.value.toLowerCase();

    studentlist.innerHTML = "";

    const filteredStudents = students.filter((students) =>
      students.title.toLowerCase().includes(searchTerm)
    );

    filteredStudents.forEach((students) => {
      studentlist.innerHTML += `
            <div>
            <h4>${students.title}</h4>,
            <span>${students.firstName}</span>
            <span>${students.lastName}</span>
            <span>${students.adress}</span>
            <span>${students.email}</span>
            <span>${students.studyStructure}</span>
            </div>
            `;
    });
  }

  listCourses();
  listStudents();

  searchInput.addEventListener("input", searchStudent);
});
