export class Digimon {
    #name
    #img
    #level

    setName(name) { this.#name = name; }
    getName() { return this.#name; }

    setLevel(level) { this.#level = level; }
    getLevel() { return this.#level; }

    setImg(img) { this.#img = img; }
    getImg() { return this.#img; }
    
}
