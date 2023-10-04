const addCard = document.getElementById("addCard");
const displayCard = document.getElementById("displayCard");
const loadingCard = document.getElementById("loadingCard");
const downloadCard = document.getElementById("downloadCard");
const fileInput = document.getElementById("fileInput");
const displayImage = document.getElementById("display-img");
const startBtn = document.getElementById("startBtn");
const afterImage = document.querySelector(".image-after");
const beforeImage = document.querySelector(".image-before");
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
    console.log(reader.result);
    displayImage.src = reader.result;
    beforeImage.src = reader.result;
  };
  activeCard(displayCard);
});

const formData = new FormData();

// startBtn.addEventListener("click", () => {
//   //   formData.append("size", "auto");
//   formData.append("image_file", file);
//   activeCard(loadingCard);
//   fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "X-Api-Key": API_KEY,
//     },
//     body: formData,
//   })
//     .then((response) => {
//       console.log(response);
//       response.blob();
//     })
//     .then((data) => {
//       console.log(data);
//       activeCard(downloadCard);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

startBtn.addEventListener("click", () => {
  //   formData.append("size", "auto");
  formData.append("image_file", file);
  activeCard(loadingCard);
  axios({
    method: "post",
    url: API_URL,
    data: formData,
    headers: {
      "X-Api-Key": API_KEY,
    },
  }).then((res) => {
    console.log(res);
    reader.readAsDataURL(res.data);
    reader.onloadend = () => {
      afterImage.src = reader.result;
    };
    // afterImage.src = res.data;
    activeCard(downloadCard);
  });
});
