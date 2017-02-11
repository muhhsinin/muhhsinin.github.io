/**
 * Created by kawnayeen on 2/11/17.
 */
"use strict";

export default class AyatReciter {
    constructor(viewManager) {
        this.index = 0;
        this.ayats = null;
        this.viewManager = viewManager;
    }

    reciteAyats(ayats) {
        this.ayats = ayats;
        this.index = 0;
        this.processSingleAyat();
    }

    processSingleAyat() {
        if (!this.isRecitationEnded()) {
            this.reciteSingleAyat();
        } else {
            this.viewManager.setContentAtAyatArea('');
        }
    }

    reciteSingleAyat() {
        let ayat = this.ayats[this.index];
        let htmlContent = `<audio src="${ayat.getRecitationUrl()}" autoplay id="recitation"></audio>`;
        htmlContent += `<p>Ayat # ${ayat.getAyatNumber()}</p>`;
        htmlContent += `<p>${ayat.getArabicText()}</p>`;
        htmlContent += `<p>${ayat.getEnglishTranslation()}</p>`;
        this.viewManager.setContentAtAyatArea(htmlContent);
        this.index++;
        let recitationNode = document.getElementById('recitation');
        recitationNode.addEventListener('ended', () => this.processSingleAyat());
    }

    isRecitationEnded() {
        return this.ayats == null || this.index >= this.ayats.length;
    }
}