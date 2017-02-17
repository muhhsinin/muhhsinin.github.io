/**
 * Created by kawnayeen on 2/11/17.
 */
"use strict";

export default class AyatReciter {
    constructor(viewManager, dataManager) {
        this.index = 0;
        this.ayats = null;
        this.viewManager = viewManager;
        this.dataManager = dataManager;
    }

    reciteAyats(ayats) {
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
        let surah = this.dataManager.findSurahBySurahNumber(ayat.surahNumber);
        htmlContent += `<p class="englishText">${surah.englishName}, ayat # ${ayat.getAyatNumber()}</p>`;
        htmlContent += `<p class="arabicText">${ayat.getArabicText()}</p>`;
        htmlContent += `<p class="englishText">${ayat.getEnglishTranslation()}</p>`;
        this.viewManager.setContentAtAyatArea(htmlContent);
        this.index++;
        let recitationNode = document.getElementById('recitation');
        recitationNode.addEventListener('ended', () => this.processSingleAyat());
    }

    isRecitationEnded() {
        return this.ayats == null || this.index >= this.ayats.length;
    }
}