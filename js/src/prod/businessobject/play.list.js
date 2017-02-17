/**
 * Created by kawnayeen on 2/17/17.
 */
"use strict";

import Selection from "./selection";

export default class PlayList {
    constructor(name = 'random') {
        this.name = name;
        this.selections = [];
        let selection = new Selection(1, 1, 1);
        this.selections.push(selection);
    }

    addSelection(selection) {
        if (selection.getSurahNumber() === 1 && selection.getStartingAyat() === 1)
            selection.startAyat = 2;
        this.selections.push(selection);
        this.selections.sort((a, b) => a.getSurahNumber() - b.getSurahNumber());
    }

    getSelections() {
        return this.selections;
    }
}