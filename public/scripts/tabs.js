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
    createTabs(tabs);
    console.log(tabs);
  } catch (error) {
    console.error(error.message);
  }
}

function createTabs(tabs) {
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

function setup() {
  fetchAllTabs();
}

setup();
