document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-bar");
  const courseList = document.querySelector("#courses");

  async function searchCourse(e) {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase().trim();
    const courses = await fetchCourses();

    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm)
    );

    renderCourses(filteredCourses);
  }

  async function fetchCourses() {
    try {
      const response = await fetch("http://localhost:3000/courses");
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function renderCourses(courses) {
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
  }

  searchForm.addEventListener("submit", searchCourse);
});
