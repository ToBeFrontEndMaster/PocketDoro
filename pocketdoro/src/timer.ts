export class Timer {
    private currentTime: number = 0;
    private targetTime: number = 0;
    // FIXME: any type
    private timerId: any;
    constructor(public hour: number) {
        this.targetTime = this.hour * 3600;
        this.timerId = null;
    }

    public reset() {
        this.hour = 0;
    }

    public start() {
        if (this.timerId) {
            return;
        }
        this.timerId = setInterval(() => this.tick(), 1000);
    }

    public fireTimeEvent() {
        clearInterval(this.timerId);
    }

    private tick() {
        this.currentTime += 1;
        console.log('timer', this.currentTime);
        if (this.currentTime === this.targetTime) {
            this.fireTimeEvent();
        }
    }
}
