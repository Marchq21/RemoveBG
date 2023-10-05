const addCard = document.getElementById("addCard");
const displayCard = document.getElementById("displayCard");
const loadingCard = document.getElementById("loadingCard");
const downloadCard = document.getElementById("downloadCard");
const fileInput = document.getElementById("fileInput");
const displayImage = document.getElementById("display-img");
const startBtn = document.getElementById("startBtn");
const afterImage = document.querySelector(".image-after");
const beforeImage = document.querySelector(".image-before");
const uploadAnother = document.getElementById("uploadAnother");
const downloadImage = document.getElementById("downloadImage");
const API_URL = "https://api.remove.bg/v1.0/removebg";
const API_KEY = "sXCA4uVR3UtRaT2yfbuYyBxB";

const activeCard = (card) => {
  addCard.style.display = "none";
  displayCard.style.display = "none";
  loadingCard.style.display = "none";
  downloadCard.style.display = "none";
  card.style.display = "flex";
};

activeCard(addCard);

const reader = new FileReader();
let file = null;
fileInput.addEventListener("input", () => {
  file = fileInput.files[0];
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    displayImage.src = reader.result;
    beforeImage.src = reader.result;
  };
  activeCard(displayCard);
});

const formData = new FormData();

startBtn.addEventListener("click", () => {
  formData.append("size", "auto");
  formData.append("image_file", file);
  activeCard(loadingCard);
  fetch(API_URL, {
    method: "POST",
    headers: {
      "X-Api-Key": API_KEY,
    },
    body: formData,
  })
    .then((response) => {
      return response.blob();
    })
    .then((data) => {
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        afterImage.src = reader.result;
        downloadImage.setAttribute("href", reader.result);
      };
      activeCard(downloadCard);
    })
    .catch((error) => {
      console.log(error);
    });
});

uploadAnother.addEventListener("click", () => {
  activeCard(addCard);
});
