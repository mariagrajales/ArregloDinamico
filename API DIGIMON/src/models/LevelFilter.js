export class LevelFilter {
    constructor(digimons) {
        this.digimons = digimons || [];
        this.filteredDigimons = [];
    }

    filterByLevel(level) {
        this.filteredDigimons = this.digimons.filter(digimon => digimon.getLevel() === level);
    }

    getFilteredDigimons() {
        return this.filteredDigimons;
    }
}
