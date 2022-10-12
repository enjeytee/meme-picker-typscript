import { catsData } from "./catsData.js";
import { itfCatsData } from "./interface.js";
const emotionRadios = document.getElementById("emotion-radios") as HTMLDivElement;
const gifsOnlyOption = document.getElementById("gifs-only-option") as HTMLInputElement;
const memeModal = document.getElementById("meme-modal") as HTMLDivElement;
const memeModalInner = document.getElementById("meme-modal-inner") as HTMLDivElement;
const getEmotionsArray = (cats: itfCatsData[]): string[] => {
    const emotionsArray: string[] = [];
    cats.map(cat => cat.emotionTags.map(emotion => emotionsArray.push(emotion)));
    const filteredEmotionsArray = [ ...new Set(emotionsArray)];
    return filteredEmotionsArray;
};
export const renderEmotionsRadio = (cats: itfCatsData[]) => {
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
        `
        return htmlString
    }, "");
};
export const highlightCheckedOption = (event: Event | { target: Element}) => {
    const emotionArray = document.getElementsByClassName("radio") as HTMLCollectionOf<Element>;
    for (let emotion of emotionArray) {
        emotion.classList.remove("highlight");
    };
    document.getElementById((event.target as Element).id)?.parentElement?.classList.add("highlight");
};
const getMatchingCatsArray = () => {
    const checkedEmotion = document.querySelector(`input[type="radio"]:checked`) as HTMLInputElement;
    const isGif = gifsOnlyOption.checked;
    if (checkedEmotion) {
        const selectedEmotion = checkedEmotion.value;
        const matchingCatsArray = isGif ?
        catsData.filter(cat => cat.emotionTags.includes(selectedEmotion) && cat.isGif) :
        catsData.filter(cat => cat.emotionTags.includes(selectedEmotion));
        return matchingCatsArray;
    } ;      
};
const getSingleCatObject = () => {
    const catsArray = getMatchingCatsArray();
    if (!catsArray) return null;
    if (catsArray.length === 1) {
        return catsArray[0];
    } else {
        return catsArray[Math.floor(Math.random() * catsArray.length + 1)];
    }
};
export const renderCat = () => {
    const catObject = getSingleCatObject();
    if (!catObject) return null;
    memeModal.style.display = "flex";
    memeModalInner.innerHTML = `
    <img 
    src="./images/${catObject.image}"
    class="cat-img"
    alt="${catObject.alt}"
    >
    `
};  
export const closeModal = () => {
    memeModal.style.display = "none";
};