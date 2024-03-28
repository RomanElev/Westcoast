const addCourseButton = document.querySelector("#addCourseButton");
const courseForm = document.querySelector("#addCourse");

const addNewCourseHandler = async (e) => {
  e.preventDefault();

  const formInfo = new FormData(courseForm);
  const info = Object.fromEntries(formInfo.entries());

  try {
    const addedCourse = await addNewCourse(info);
    console.log("Added course:", addedCourse);
  } catch (error) {
    console.error("Error adding course:", error);
  }
};

const addNewCourse = async (courseData) => {
  const url = "http://localhost:3000/courses";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add course: ${response.statusText}`);
    }

    const newCourse = await response.json();
    return newCourse;
  } catch (error) {
    throw error;
  }
};

addCourseButton.addEventListener("click", addNewCourseHandler);
