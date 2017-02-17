/**
 * Created by kawnayeen on 2/12/17.
 */
export default class AppController {
    constructor(ayatFetcher, ayatReciter) {
        this.ayatFetcher = ayatFetcher;
        this.ayatReciter = ayatReciter;
    }

    startRecitation(selection) {
        let ayatFetchingTask = this.ayatFetcher.getAyats(selection.getSurahNumber(),
            selection.getStartingAyat(),
            selection.getEndingAyat()
        );
        ayatFetchingTask.then(x => this.ayatReciter.reciteAyats(x));
    }
}