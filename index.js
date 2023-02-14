const url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
const key = "f07788e9-0e00-4ef0-868d-fa9e0ead1c54"
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;  // input word
    fetch(`${url}${inpWord}?key=${key}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let subdirectory = ''
            let audio = data[0].hwi.prs[0].sound.audio;
            if (audio.substring(audio.length - 2) === "gg") {
                subdirectory = 'gg';
              } else if (audio.substring(audio.length - 2) === "bix") {
                subdirectory = 'bix';
              } else if (/^[0-9\W]/.test(audio)) {
                subdirectory = audio[0];
                  
              } else {
                subdirectory = audio[0];
              };
            result.innerHTML = `<div class="word">
            <h3>${inpWord}</h3>
            <button onclick="playSound()">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
        <div class="details">
            <p>${data[0].fl}</p><p>/${data[0].hwi.prs[0].mw}/</p>
        </div>
        <p class="word-meaning">${data[0].shortdef[0]}</p>`
        sound.setAttribute("src", `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${audio}.mp3`);
        })
        .catch( () => {
          result.innerHTML = '<h4 class="error">Sorry, Word not Found :(</h4>';
        })
});
function playSound() {
    sound.play();
};