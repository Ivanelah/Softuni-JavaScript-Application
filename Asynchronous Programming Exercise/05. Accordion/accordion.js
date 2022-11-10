async function solution() {
  const main = document.getElementById("main");
  const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
  const response = await fetch(url);
  const data = await response.json();

  data.forEach((element) => {
    let divAccordion = htmlGenerator("div", "", main);
    divAccordion.classList.add("accordion");
    let divHead = htmlGenerator("div", "", divAccordion);
    divHead.classList.add("head");
    let span = htmlGenerator("span", element.title, divHead);
    let button = htmlGenerator("button", "More", divHead);
    button.classList.add("button");
    button.setAttribute("id", element._id);
    button.addEventListener("click", toggle);

    let divExtra = htmlGenerator("div", "", divAccordion);
    divExtra.classList.add("extra");
    let p = htmlGenerator("p", "", divExtra);
  });

  async function toggle(e) {
    const p = e.target.parentNode.parentNode.children[1].children[0];
    const extra = e.target.parentNode.parentNode.children[1];
    const id = e.target.id;
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    p.textContent = data.content;

    if (e.target.textContent == "More") {
      extra.style.display = "block";
      e.target.textContent = "Less";
    } else if (e.target.textContent == "Less") {
      extra.style.display = "none";
      e.target.textContent = "More";
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
}

solution();
