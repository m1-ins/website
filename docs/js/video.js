const main = () => {
    let playbackConst = 500;
    let setHeight = document.getElementById("jumbotron");
    let images = [];

    fetch("assets/launch.tar").then(response => {
        return response.arrayBuffer();
    })
        .then(buffer => untar(buffer))
        .then(files => {
            files.forEach((file) => {
                let img = new Image();
                img.src = file.getBlobUrl();
                images.push(img);
            });
        });

    let jumbotronFront = document.getElementById("jumbotron-content-back");
    let jumbotronBack = document.getElementById("jumbotron-content");
    let jumbo = document.getElementById("jumbotron-sticky")

    let next = jumbotronFront;
    let other = jumbotronBack;

    let frame = () => {
        if (images.length != 300) {
            window.requestAnimationFrame(frame);
            return;
        }
        let scrolled = document.body.scrollTop;
        let jumboStart = jumbo.offsetTop;
        let jumboEnd = jumbo.offsetTop + jumbo.offsetHeight;
        let scrolledPastJumbo = (jumboStart - scrolled) / (jumboEnd - jumboStart);
        let currentFrame = Math.floor(scrolledPastJumbo * (images.length - 1));
        let img = images[currentFrame];
        img.decode().then(() => {
            next.style.backgroundImage = `url(${img.src})`;
            other.style.zIndex = 100;
            next.style.zIndex = 1000;
        });
        window.requestAnimationFrame(frame);
        next = next == jumbotronFront ? jumbotronBack : jumbotronFront; 
        other = other == jumbotronFront ? jumbotronBack : jumbotronFront; 
    }
    window.requestAnimationFrame(frame);
}

window.onload = main;
