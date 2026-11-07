document.addEventListener("DOMContentLoaded", () => {
    const tarjeta = document.querySelector(".card-custom");
    const qrContainer = document.querySelector(".qr-container");

    if (tarjeta) {
        tarjeta.addEventListener("mouseenter", () => {
            tarjeta.style.boxShadow = "0 15px 35px rgba(211, 47, 47, 0.25)";
        });

        tarjeta.addEventListener("mouseleave", () => {
            tarjeta.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.45)";
        });
    }

    if (qrContainer) {
        qrContainer.addEventListener("click", () => {
            alert("¡Gracias por apoyar el desarrollo de Transportes Santa Cruz!");
        });
    }
});