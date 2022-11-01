async function getInfo() {
  const stopInfoEl = document.getElementById("stopId");
  const stopId = stopInfoEl.value;
  const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
  const stopNameEl = document.getElementById("stopName");
  const busesList = document.getElementById("buses");

  busesList.innerHTML = "";
  stopInfoEl.value = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    stopNameEl.textContent = data.name;
    Object.entries(data.buses).forEach(([busInfo, time]) => {
      const li = document.createElement("li");
      li.textContent = `Bus ${busInfo} arrives in ${time} minutes`;
      busesList.appendChild(li);
    });
  } catch (e) {
    stopNameEl.textContent = "Error";
  }
}
