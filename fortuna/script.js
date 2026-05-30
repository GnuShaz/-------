const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultText = document.getElementById("result");

const options = ["Да", "Нет"];
const colors = ["#93c5fd", "#c4b5fd"];

let currentRotation = 0;

function drawWheel() {
    const radius = canvas.width / 2;
    const angle = (2 * Math.PI) / options.length;

    for (let i = 0; i < options.length; i++) {
        ctx.beginPath();
        ctx.moveTo(radius, radius);

        ctx.arc(
            radius,
            radius,
            radius,
            i * angle,
            (i + 1) * angle
        );

        ctx.fillStyle = colors[i];
        ctx.fill();

        ctx.save();

        ctx.translate(radius, radius);
        ctx.rotate(i * angle + angle / 2);

        ctx.fillStyle = "#111";
        ctx.font = "bold 36px Arial";
        ctx.textAlign = "center";

        ctx.fillText(options[i], radius * 0.65, 12);

        ctx.restore();
    }
}

drawWheel();

spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    resultText.textContent = "";

    const winner = Math.floor(Math.random() * 2);

    const targetAngle =
        winner === 0
            ? 90
            : 270;

    const extraSpins = 360 * 12;

    const finalRotation =
        currentRotation +
        extraSpins +
        targetAngle +
        Math.random() * 20 - 10;

    currentRotation = finalRotation;

    canvas.style.transform = `rotate(${finalRotation}deg)`;

    setTimeout(() => {
        resultText.textContent = `Результат: ${options[winner]}`;
        spinBtn.disabled = false;
    }, 10000);
});