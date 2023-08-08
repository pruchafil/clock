import { Canvas, Colors } from "simply2d";

const width = 800;
const height = 800;
const midX = width/2;
const midY = height/2;
const hoursLen = 150;
const minutesLen = 250;
const secondsLen = 300;
const r = 350;
const smallR = r - 10;
const bigR = r - 40;
const circleDotsSpace = 1.0;

const minutesAngle = 6.0;
const fiveMunutesAngle = 30.0;

const canvas = new Canvas("clock", width, height);

function toRad(degree) {
    return (degree / 180.0) * Math.PI;
}

function drawClock() {
    for (let i = 0.0; i < 360.0; i += circleDotsSpace) {
        if (i % minutesAngle === 0.0 || i % fiveMunutesAngle === 0.0) { // we draw one or five minutes line
            const isHour = i % fiveMunutesAngle === 0.0;

            const sin = Math.sin(toRad(i));
            const cos = Math.cos(toRad(i));
    
            let fromX = sin * (isHour ?  bigR : smallR); // longer or shorter line
            let fromY = cos * (isHour ?  bigR : smallR);
            let toX = sin * r;
            let toY = cos * r;
    
            fromX += midX;
            fromY += midY;
            toX += midX;
            toY += midY;
    
            canvas.drawLine(isHour ? Colors.CYAN : Colors.LIGHT_BLUE, { x:fromX, y:fromY }, { x:toX, y: toY });
        } else { // we draw a dot
            const sin = Math.sin(toRad(i));
            const cos = Math.cos(toRad(i));
            let toX = sin * r;
            let toY = cos * r;
            toX += midX;
            toY += midY;

            canvas.drawPoint(Colors.WHITE, {x: toX, y: toY});
        }
    }
}

function drawClockHands() {
    const time = new Date();

    const hours = time.getHours();
    const minutes = time.getMinutes();    
    const seconds = time.getSeconds();
    const milliseconds = time.getMilliseconds();

    const fullHoursAngle = hours * -fiveMunutesAngle;               // angle pointing to line
    const partHoursAngle = (minutes / 60.0) * fiveMunutesAngle;     // angle between two lines
    const fullMinutesAngle = minutes * -minutesAngle;
    const partMinutesAngle = (seconds / 60.0) * minutesAngle;
    const fullSecondsAngle = seconds * -minutesAngle;
    const partSecondsAngle = (milliseconds / 1000.0) * minutesAngle;

    let toHoursX = Math.sin(toRad((fullHoursAngle - partHoursAngle) + 180.0)) * hoursLen;
    let toHoursY = Math.cos(toRad((fullHoursAngle - partHoursAngle) + 180.0)) * hoursLen;
    let toMinutesX = Math.sin(toRad((fullMinutesAngle - partMinutesAngle) + 180.0)) * minutesLen;
    let toMinutesY = Math.cos(toRad((fullMinutesAngle - partMinutesAngle) + 180.0)) * minutesLen;
    let toSecondsX = Math.sin(toRad((fullSecondsAngle - partSecondsAngle) + 180.0)) * secondsLen;
    let toSecondsY = Math.cos(toRad((fullSecondsAngle - partSecondsAngle) + 180.0)) * secondsLen;

    toHoursX += midX;
    toHoursY += midY;
    toMinutesX += midX;
    toMinutesY += midY;
    toSecondsX += midX;
    toSecondsY += midY;

    canvas.drawLine(Colors.YELLOW, {x: midX, y: midY}, {x: toHoursX, y: toHoursY });         // hours
    canvas.drawLine(Colors.YELLOW, {x: midX, y: midY}, {x: toMinutesX, y: toMinutesY });     // minutes
    canvas.drawLine(Colors.RED, {x: midX, y: midY}, {x: toSecondsX, y: toSecondsY });        // seconds
}

canvas.loop(() => {
    drawClock();
    drawClockHands();
});