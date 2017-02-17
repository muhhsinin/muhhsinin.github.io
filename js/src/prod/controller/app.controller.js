/**
 * Created by kawnayeen on 2/12/17.
 */
export default class AppController {
    constructor(ayatFetcher, ayatReciter) {
        this.ayatFetcher = ayatFetcher;
        this.ayatReciter = ayatReciter;
    }

    startRecitation(playList) {
        let ayatFetchingTask = this.ayatFetcher.getAyats(playList);
        ayatFetchingTask.then(x => this.ayatReciter.reciteAyats(x));
    }
}