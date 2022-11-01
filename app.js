function solve() {
  const departBtn = document.getElementById("depart");
  const arriveBtn = document.getElementById("arrive");
  const info = document.querySelector(".info");

  let id = "depot";

  async function depart() {
    try {
      let url = `http://localhost:3030/jsonstore/bus/schedule/${id}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Invalid bus id");
      }
      const data = await response.json();

      departBtn.disabled = true;
      arriveBtn.disabled = false;

      info.textContent = `Next stop ${data.name}`;
    } catch (err) {
      info.textContent = "Error";
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }

  async function arrive() {
    try {
      let url = `http://localhost:3030/jsonstore/bus/schedule/${id}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Invalid bus id");
      }

      const data = await response.json();

      departBtn.disabled = false;
      arriveBtn.disabled = true;
      id = data.next;

      info.textContent = `Arriving at ${data.name}`;
    } catch (err) {
      info.textContent = "Error";
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
