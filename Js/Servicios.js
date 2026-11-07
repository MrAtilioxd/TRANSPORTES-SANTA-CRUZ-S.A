document.addEventListener("DOMContentLoaded", () => {
    const imagenesMapas = document.querySelectorAll(".mapa-img-fluid");

    imagenesMapas.forEach(img => {
        img.addEventListener("click", () => {
            if (img.requestFullscreen) {
                img.requestFullscreen();
            } else if (img.webkitRequestFullscreen) {
                img.webkitRequestFullscreen();
            }
        });
    });
});