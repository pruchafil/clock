import { Canvas, Colors } from "simply2d";

const width = 800;
const height = 800;
const midX = width/2;
const midY = height/2;
const hoursLen = 150;
const minutesLen = 300;
const secondsLen = 75;
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
        let fromX = Math.sin(toRad(i)) * (i % fiveMunutesAngle === 0.0 ?  bigR : smallR);
        let fromY = Math.cos(toRad(i)) * (i % fiveMunutesAngle === 0.0 ?  bigR : smallR);
        let toX = Math.sin(toRad(i)) * r;
        let toY = Math.cos(toRad(i)) * r;

        fromX += midX;
        fromY += midY;
        toX += midX;
        toY += midY;

        canvas.drawLine(Colors.WHITE, { x:fromX, y:fromY }, { x:toX, y: toY });
    }
}

function drawClockHands() {
    let time = new Date();

    const hours = time.getHours();
    const minutes = time.getMinutes();    
    const seconds = time.getSeconds();

    const toHoursX = Math.sin(toRad((hours) * -fiveMunutesAngle + 180)) * hoursLen;
    const toHoursY = Math.cos(toRad((hours) * -fiveMunutesAngle + 180)) * hoursLen;
    const toMinutesX = Math.sin(toRad((minutes) * -minutesAngle + 180)) * minutesLen;
    const toMinutesY = Math.cos(toRad((minutes) * -minutesAngle + 180)) * minutesLen;
    const toSecondsX = Math.sin(toRad((seconds) * -minutesAngle + 180)) * secondsLen;
    const toSecondsY = Math.cos(toRad((seconds) * -minutesAngle + 180)) * secondsLen;

    canvas.drawLine(Colors.YELLOW, {x: midX, y: midY}, {x: toHoursX + midX, y: toHoursY + + midY}); // hours
    canvas.drawLine(Colors.YELLOW, {x: midX, y: midY}, {x: toMinutesX + midX, y: toMinutesY + + midY}); // minutes
    canvas.drawLine(Colors.RED, {x: midX, y: midY}, {x: toSecondsX + midX, y: toSecondsY + + midY}); // seconds
}

canvas.loop(() => {
    drawClock();
    drawClockHands();
});