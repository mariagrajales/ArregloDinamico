
export class ListDigimon {
    #digimons = [];
    #page;

    setPage(page) {
        this.#page = page;
    }

    getPage() { 
        return this.#page;
    }

    addDigimon(digimon) {
        //this.#digimons.filter((jsd) = {jsd.level === this.level})
        this.#digimons.push(digimon);
    }

    getDigimons() {
        return this.#digimons;
    }
}
