/**
 * Created by kawnayeen on 2/12/17.
 */
export default class AppController {
    constructor(ayatFetcher, ayatReciter) {
        this.ayatFetcher = ayatFetcher;
        this.ayatReciter = ayatReciter;
    }

    startRecitation(selection) {
        let ayatFetchingTask = this.ayatFetcher.getAyats(selection.getSurahInfo().number,
            selection.getStartingAyat(),
            selection.getEndingAyat()
        );
        ayatFetchingTask.then(x => this.ayatReciter.reciteAyats(selection.getSurahInfo(),x));
    }
}