const inputValue = document.getElementById("search");
const btnSearch = document.getElementById("btn");
const imgContainer = document.querySelector(".img-container");
const moreBtn = document.querySelector("#more-btn");
const accessKey = "b_j6HTXecKjQ6V2wCFv0txhwsJLABYvILO4-m1JmTSc";
let pageNumber = 1;
let imgDiv;

function showImg(data) {
  //   console.log(data);
  data.results.forEach((photo) => {
    imgDiv = document.createElement("div");
    imgDiv.innerHTML = `<img src="${photo.urls.regular}"/>`;
    imgDiv.classList.add("img-card");
    imgContainer.appendChild(imgDiv);
    // console.log(photo);
  });
}

moreBtn.addEventListener("click", async () => {
  searchImagesFun(++pageNumber);
});

async function searchImagesFun(pageNumber) {
  if (pageNumber === 1) {
    imgDiv.innerHTML = "";
  }
  let query = inputValue.value.trim();
  //   console.log(query);
  if (pageNumber <= 1) {
    pageNumber = 1;
  }
  let URL = `https://api.unsplash.com/search/photos?client_id=${accessKey}&per_page=27&page=${pageNumber}&query=${query}`;

  try {
    // make a request to the API
    const response = await fetch(URL);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // parse the response

    const data = await response.json();
    showImg(data);
    // console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
