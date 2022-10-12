import { catsData } from "./catsData.js";
import { highlightCheckedOption, renderCat, closeModal, renderEmotionsRadio } from "./utils.js";
const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");
renderEmotionsRadio(catsData);
emotionRadios.addEventListener("change", highlightCheckedOption);
getImageBtn.addEventListener("click", renderCat);
memeModalCloseBtn.addEventListener("click", closeModal);
