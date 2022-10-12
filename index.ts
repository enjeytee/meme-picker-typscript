import { catsData } from "./catsData.js";
import { highlightCheckedOption, renderCat, closeModal, renderEmotionsRadio } from "./utils.js";
const emotionRadios = document.getElementById("emotion-radios") as HTMLDivElement;
const getImageBtn = document.getElementById("get-image-btn") as HTMLButtonElement;
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn") as HTMLButtonElement;
renderEmotionsRadio(catsData);
emotionRadios.addEventListener("change", highlightCheckedOption)
getImageBtn.addEventListener("click", renderCat);
memeModalCloseBtn.addEventListener("click", closeModal);