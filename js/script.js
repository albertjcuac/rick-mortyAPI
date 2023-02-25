const searchInput = document.getElementById('search');
const resultsSection = document.getElementById('results');



function debounce(func, wait = 500) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
function searchCharacters() {
    const searchTerm = searchInput.value.trim();
    let url = 'https://rickandmortyapi.com/api/character/';
        if (searchTerm.length >= 2) {
            url += `?name=${searchTerm}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {

                resultsSection.innerHTML = '';

                data.results.forEach(character => {
                    const characterArticle = document.createElement('article');
                    const characterName = document.createElement('h2');
                    const characterImage = document.createElement('img');
                    const characterStatus = document.createElement('h3');

                    characterName.textContent = character.name;
                    characterStatus.textContent = character.status;
                    characterImage.src = character.image;
                    characterImage.alt = `${character.name} image`;

                    characterArticle.appendChild(characterName);
                    characterArticle.appendChild(characterImage);
                    characterArticle.appendChild(characterStatus);
                    resultsSection.appendChild(characterArticle);
                });
            })
            .catch(error => {
                console.error(error);
                resultsSection.innerHTML = '<p>nothing found.</p>';
            });

}
const processChange = debounce(() =>{
    searchCharacters();
});

searchInput.addEventListener('input', processChange);


//Para que se muestren todos los personajes al entrar en la página
document.addEventListener('DOMContentLoaded', () => {
    searchCharacters();
});
