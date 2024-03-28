const addNewStudent = async (student) => {
  const url = "http://localhost:3000/students";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    if (response.ok) {
      const newStudent = await response.json();
      return newStudent;
    } else {
      throw new Error(`Failed to add student: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

const getStudents = async () => {
  const url = "http://localhost:3000/students";

  try {
    const response = await fetch(url);

    if (response.ok) {
      const students = await response.json();
      return students;
    } else {
      throw new Error(`Failed to fetch students: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export { addNewStudent, getStudents };
