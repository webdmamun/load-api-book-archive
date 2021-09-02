// call all event handler
const searchInput = document.getElementById("search-input");
const bookContainer = document.getElementById("book-container");
const errorDiv = document.getElementById("error");
const searchResut = document.getElementById("search-result");
const spinner = document.getElementById("spinner");

// spinner display style
const toggleSpinner = (displayStyle) => {
  spinner.style.display = displayStyle;
};

// search button handler
const searchBtn = document
  .getElementById("search-btn")
  .addEventListener("click", function () {
    const searchText = searchInput.value;
    // display spinner
    toggleSpinner("block");
    if (searchText === "") {
      errorDiv.innerText = "Please! type your favorite book names 😀";
      toggleSpinner("none");
      bookContainer.innerHTML = "";
      searchResut.innerHTML = "";
      return;
    }
    // clear DOM
    bookContainer.innerHTML = "";
    searchInput.value = "";
    searchResut.innerHTML = "";
    errorDiv.innerText = "";

    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => displyBooks(data));
  });

// Display Books
const displyBooks = (data) => {
  const books = data.docs;
  // error handling
  if (data.num_found === 0) {
    errorDiv.innerText = "No Resut Found!🥺";
  } else {
    errorDiv.innerText = "";
  }
  toggleSpinner("none"); //Hide spinner

  // Total Resut handle
  const p = document.createElement("p");
  p.innerText = `Total Resut Found: ${data.numFound}`;
  searchResut.appendChild(p);

  // Display Book items
  books.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card">
    <img
      src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg"
      class="card-img-top"
      alt="Book Image"
    />
    <div class="card-body">
      <h5 class="card-title fw-bold">${item.title}</h5>
      <p class="card-text">Atuthor name: ${item.author_name[0]}</p>
      <p class="card-text">Publisher: ${item.publisher[0]}</p>
      <p class="card-text">Publish Date: ${item.publish_date[0]}</p>
    </div>
  </div>
    `;
    toggleSpinner("none"); //Hide spinner
    bookContainer.appendChild(div);
  });
};
