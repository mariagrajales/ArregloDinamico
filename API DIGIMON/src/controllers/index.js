import { listDigimon } from "./dependencies.js"
import { Digimon } from "../models/Digimon.js"
import { LevelFilter } from "../models/LevelFilter.js";

let api = document.getElementById("btn-api")
api.addEventListener("click", function(){
    let url = "https://digimon-api.vercel.app/api/digimon"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            listDigimon.setPage(1);
            data.forEach(digimonData => {
                let digimon = new Digimon();
                digimon.setName(digimonData.name);
                digimon.setLevel(digimonData.level);
                digimon.setImg(digimonData.img);
                console.log(digimon);

                listDigimon.addDigimon(digimon);
            });
            document.getElementById("btn-api").disabled = true;
            document.getElementById("btn-filter").disabled = false;
        });
});

document.addEventListener("DOMContentLoaded", function() {
    const digimonContainer = document.getElementById("digimonContainer");
    const pagination = document.getElementById("pagination");
    const pageNumber = document.getElementById("pageNumber");
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");
    const digimonTemplate = document.getElementById("digimonTemplate");
    const levelFilter = new LevelFilter();

    let currentPage = 1;
    const itemsPerPage = 20;

    btnNext.addEventListener("click", () => {
        if (currentPage < totalPages()) {
            currentPage++;
            showPage(currentPage);
            updatePageNumber();
        }
    });

    btnPrev.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updatePageNumber();
        }
    });

    document.getElementById("btn-filter").addEventListener("click", () => {
        currentPage = 1;
        showPage(currentPage);
        updatePageNumber();
    });

    function showPage(page) {
        digimonContainer.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const levelInput = document.getElementById("level").value;
        let filteredDigimons = listDigimon.getDigimons();

        if (levelInput) {
            filteredDigimons = filteredDigimons.filter(digimon => digimon.getLevel() === levelInput);
        }

        const pageDigimons = filteredDigimons.slice(startIndex, endIndex);

        pageDigimons.forEach(digimon => {
            let digimonDiv = digimonTemplate.content.cloneNode(true);
            digimonDiv.querySelector("#nombre").innerText = digimon.getName();
            digimonDiv.querySelector("#imagen").src = digimon.getImg();
            digimonDiv.querySelector("#sta").innerText = `Nivel: ${digimon.getLevel()}`;
            digimonContainer.appendChild(digimonDiv);
        });

        updatePageNumber();

        pagination.style.display = "block";
    }

    function updatePageNumber() {
        pageNumber.innerText = `Página ${currentPage} de ${totalPages()}`;
    }

    function totalPages() {
        const levelInput = document.getElementById("level").value;
        let filteredDigimons = listDigimon.getDigimons();

        if (levelInput) {
            filteredDigimons = filteredDigimons.filter(digimon => digimon.getLevel() === levelInput);
        }

        return Math.ceil(filteredDigimons.length / itemsPerPage);
    }
});
