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

const minutesAngle = 6.0;
const fiveMunutesAngle = 30.0;

const canvas = new Canvas("clock", width, height);

function toRad(degree) {
    return (degree / 180.0) * Math.PI;
}

function drawClock() {
    for (let i = 0.0; i < 360.0; i += minutesAngle) {
        const isHour = i % fiveMunutesAngle === 0.0;

        const sin = Math.sin(toRad(i));
        const cos = Math.cos(toRad(i));

        let fromX = sin * (isHour ?  bigR : smallR);
        let fromY = cos * (isHour ?  bigR : smallR);
        let toX = sin * r;
        let toY = cos * r;

        fromX += midX;
        fromY += midY;
        toX += midX;
        toY += midY;

        canvas.drawLine(isHour ? Colors.CYAN : Colors.LIGHT_BLUE, { x:fromX, y:fromY }, { x:toX, y: toY });
    }
}

function drawClockHands() {
    const time = new Date();

    const hours = time.getHours();
    const minutes = time.getMinutes();    
    const seconds = time.getSeconds();

    const toHoursX = Math.sin(toRad((hours) * -fiveMunutesAngle + 180.0)) * hoursLen;
    const toHoursY = Math.cos(toRad((hours) * -fiveMunutesAngle + 180.0)) * hoursLen;
    const toMinutesX = Math.sin(toRad((minutes) * -minutesAngle + 180.0)) * minutesLen;
    const toMinutesY = Math.cos(toRad((minutes) * -minutesAngle + 180.0)) * minutesLen;
    const toSecondsX = Math.sin(toRad((seconds) * -minutesAngle + 180.0)) * secondsLen;
    const toSecondsY = Math.cos(toRad((seconds) * -minutesAngle + 180.0)) * secondsLen;

    canvas.drawLine(Colors.YELLOW, {x: midX, y: midY}, {x: toHoursX + midX, y: toHoursY + + midY}); // hours
    canvas.drawLine(Colors.YELLOW, {x: midX, y: midY}, {x: toMinutesX + midX, y: toMinutesY + + midY}); // minutes
    canvas.drawLine(Colors.RED, {x: midX, y: midY}, {x: toSecondsX + midX, y: toSecondsY + + midY}); // seconds
}

canvas.loop(() => {
    drawClock();
    drawClockHands();
});