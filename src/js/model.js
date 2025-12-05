class AppModel {
    constructor() {
        this.homeData = {};
        this.eggData = {};
        this.settingData = {};
    }


    subscribe(listener) {
        this.listeners.push(listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener());
    }
}

const model = new AppModel();