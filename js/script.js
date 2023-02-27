const searchInput = document.getElementById('search');
const resultsSection = document.getElementById('results');


const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const apiUrl = 'https://rickandmortyapi.com/api/character/';

const statusFilter= document.getElementById('select');

let currentPage = 1;
let totalPages;


function debounce(func, wait = 500) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function updatePageButtons() {
    //desactivar prevBtn en la primera página
    if (currentPage === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    //desactivar nextBtn en la última página
    if (currentPage === totalPages) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}
function searchCharacters() {
        const searchTerm = searchInput.value.trim();
        const status = statusFilter.value;
        let url = apiUrl;
        if(searchTerm !== ""){
            if (searchTerm.length >= 2) {
                url += `?name=${searchTerm}`;
            }
            if (status !== 'all') {
                url +=`&status=${status}` ;
            }
            url += `&page=${currentPage}`;

        }
        else{
            if (status !== 'all') {
                url +=`?status=${status}` ;
                url += `&page=${currentPage}`;
            }
            else{
                url += `?page=${currentPage}`;
            }

        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                resultsSection.innerHTML = '';
                totalPages = data.info.pages;
                updatePageButtons();

                data.results.forEach(character => {
                    const characterArticle = document.createElement('article');
                    const characterName = document.createElement('h3');
                    const characterImage = document.createElement('img');
                    const characterStatus = document.createElement('span');
                    const informationContainer=document.createElement('div');
                    characterArticle.classList.add('card')
                    informationContainer.classList.add('container')
                    characterName.textContent = character.name;
                    characterStatus.textContent = character.status;
                    characterStatus.classList.add(character.status)
                    characterStatus.classList.add('statusLabel')
                    characterImage.src = character.image;
                    characterImage.alt = `${character.name} image`;


                    characterArticle.appendChild(characterImage);
                    characterArticle.appendChild(informationContainer);

                    informationContainer.appendChild(characterName)
                    informationContainer.appendChild(characterStatus);

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
prevBtn.addEventListener('click', () => {
    currentPage--;
    searchCharacters();
});
nextBtn.addEventListener('click', () => {
    currentPage++;
    searchCharacters();
});

//Para que se muestren todos los personajes al entrar en la página
document.addEventListener('DOMContentLoaded', () => {
    searchCharacters();
});



statusFilter.addEventListener('change', () =>{
    searchCharacters();
});