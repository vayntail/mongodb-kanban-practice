// display all tabs
async function fetchAllTabs() {
  const url = "http://localhost:5052/api/tabs";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    // get array of all tab objects
    const tabs = await response.json();
    displayTabs(tabs);
    console.log(tabs);
  } catch (error) {
    console.error(error.message);
  }
}

function displayTabs(tabs) {
  const aside = document.querySelector("aside");

  // clear all elements inside aside
  aside.innerHTML = "";

  // for each tab, create and add tab
  tabs.forEach((tab, index) => {
    console.log(index);
    // create tab element and add
    const tabEl = document.createElement("div");
    tabEl.classList.add("tab");
    tabEl.innerText = tab.name;
    aside.append(tabEl);

    // if first index, set it as active
    if (index === 0) {
      tabEl.classList.add("tab-active");
      getColumnsFromTab(tab);
    }

    // on tab click, set it to active
  });

  // create add new tab button
  const button = document.createElement("button");
  button.id = "new-tab-button";
  button.innerText = "+";
  aside.append(button);
  console.log(button);

  // if the new tab button is clicked, create new
  button.addEventListener("click", () => {
    postNewTab();
  });
}

// create new tab object to API
async function postNewTab() {
  const url = "http://localhost:5052/api/tabs";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "unnamed" }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    // display all tabs again
    fetchAllTabs();
  } catch (error) {
    console.error(error.message);
  }
}

// display all columns from tab
async function getColumnsFromTab(tab) {
  const url = `http://localhost:5052/api/tabs/${tab._id}/columns`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const columns = await response.json();
    // for each column, create and display column
    displayColumns(tab._id, columns);
  } catch (error) {
    console.error(error.message);
  }
}

function displayColumns(tabId, columns) {
  console.log(columns);
  const main = document.querySelector("main");

  // clear all elements inside main
  main.innerHTML = "";

  // for each column, create and add column
  columns.forEach((column, index) => {
    // create element and add
    const columnEl = document.createElement("div");
    columnEl.classList.add("column");
    columnEl.innerText = column.name;
    main.append(columnEl);

    // for each column, add cards
    const url = `http://localhost:5052/api/tabs/${tabId}/columns/${column._id}/cards`;
    console.log(url);
    getCardsFromColumn(url);
  });

  // create add new column button
}

async function getCardsFromColumn(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const cards = await response.json();
    console.log(cards);
  } catch (error) {
    console.error(error.message);
  }
}

// main setup
function main() {
  fetchAllTabs();
}
main();
