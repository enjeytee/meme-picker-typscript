import { catsData } from "./catsData.js";
const emotionRadios = document.getElementById("emotion-radios");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const getEmotionsArray = (cats) => {
    const emotionsArray = [];
    cats.map(cat => cat.emotionTags.map(emotion => emotionsArray.push(emotion)));
    const filteredEmotionsArray = [...new Set(emotionsArray)];
    return filteredEmotionsArray;
};
export const renderEmotionsRadio = (cats) => {
    const emotions = getEmotionsArray(cats);
    emotionRadios.innerHTML = emotions.reduce((htmlString, emotion) => {
        htmlString += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotions"
                >
            </div>
        `;
        return htmlString;
    }, "");
};
export const highlightCheckedOption = (event) => {
    var _a, _b;
    const emotionArray = document.getElementsByClassName("radio");
    for (let emotion of emotionArray) {
        emotion.classList.remove("highlight");
    }
    ;
    (_b = (_a = document.getElementById(event.target.id)) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("highlight");
};
const getMatchingCatsArray = () => {
    const checkedEmotion = document.querySelector(`input[type="radio"]:checked`);
    const isGif = gifsOnlyOption.checked;
    if (checkedEmotion) {
        const selectedEmotion = checkedEmotion.value;
        const matchingCatsArray = isGif ?
            catsData.filter(cat => cat.emotionTags.includes(selectedEmotion) && cat.isGif) :
            catsData.filter(cat => cat.emotionTags.includes(selectedEmotion));
        return matchingCatsArray;
    }
    ;
};
const getSingleCatObject = () => {
    const catsArray = getMatchingCatsArray();
    if (!catsArray)
        return null;
    if (catsArray.length === 1) {
        return catsArray[0];
    }
    else {
        return catsArray[Math.floor(Math.random() * catsArray.length + 1)];
    }
};
export const renderCat = () => {
    const catObject = getSingleCatObject();
    if (!catObject)
        return null;
    memeModal.style.display = "flex";
    memeModalInner.innerHTML = `
    <img 
    src="./images/${catObject.image}"
    class="cat-img"
    alt="${catObject.alt}"
    >
    `;
};
export const closeModal = () => {
    memeModal.style.display = "none";
};
