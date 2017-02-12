/**
 * Created by kawnayeen on 2/11/17.
 */
"use strict";

export default class AyatReciter {
    constructor(viewManager) {
        this.index = 0;
        this.ayats = null;
        this.surah = null;
        this.viewManager = viewManager;
    }

    reciteAyats(surah, ayats) {
        this.surah = surah;
        this.ayats = ayats;
        this.index = 0;
        this.viewManager.hideSelectionArea();
        this.processSingleAyat();
    }

    processSingleAyat() {
        if (!this.isRecitationEnded()) {
            this.reciteSingleAyat();
        } else {
            this.viewManager.setContentAtAyatArea('');
            this.viewManager.appearSelectionArea();
            this.viewManager.resetSelectionArea();
        }
    }

    reciteSingleAyat() {
        let ayat = this.ayats[this.index];
        let htmlContent = `<audio src="${ayat.getRecitationUrl()}" autoplay id="recitation"></audio>`;
        htmlContent += `<p>${this.surah.englishName}, ayat # ${ayat.getAyatNumber()}</p>`;
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