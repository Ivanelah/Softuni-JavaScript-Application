async function solve() {
    const url = "http://localhost:3030/jsonstore/collections/students";
  
    const formElement = document.getElementById("form");
    const result = document.querySelector("#results tbody");
    const response = await fetch(url);
    const data = await response.json();
  
    Object.values(data).forEach(student => {
      const tr = htmlGenerator("tr", "", result);
      htmlGenerator("td", student.firstName, tr);
      htmlGenerator("td", student.lastName, tr);
      htmlGenerator("td", student.facultyNumber, tr);
      htmlGenerator("td", student.grade, tr);
    });
  
    formElement.addEventListener("submit", onSubmit);
  
    function onSubmit(e) {
      e.preventDefault();
      let formData = new FormData(e.target);
      addNewStudent(formData);
    }
  
    async function addNewStudent(formData) {
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const facultyNumber = formData.get("facultyNumber");
      const grade = formData.get("grade");
  
      if (!firstName || !lastName || !facultyNumber || !grade) {
        return alert("Fill all field");
      }
  
      let body = {
        firstName,
        lastName,
        facultyNumber,
        grade,
      };
  
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      location.reload();
    }
  }
  
  function htmlGenerator(type, content, parent) {
    const element = document.createElement(type);
    element.textContent = content;
    if (parent) {
      parent.appendChild(element);
    }
    return element;
  }
  solve();
