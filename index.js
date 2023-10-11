function funninizeText() {
    randomizeText()
    setInterval(() => {
        randomizeText()
    }, 4000);

    setInterval(() => {
        document.getElementsByClassName("titlecontainer")[0].style.filter = `blur(0px)`
    }, 500);
}

function randomizeText() {
    const text = document.querySelectorAll(".titlecontainer span")

    text.forEach((letter, _) => {
        const random = Math.random() * 60 + 1;

        letter.style.transform = `translate(${random / 30}px, ${30 - random}px)`;

        const randomRotation = Math.random() * 15 + 1;

        letter.style.transform += `rotate(${15 / 2 - randomRotation}deg)`;
    });
}