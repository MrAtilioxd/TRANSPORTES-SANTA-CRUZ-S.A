document.addEventListener("DOMContentLoaded", () => {
    const tarjetas = document.querySelectorAll(".card-custom");

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("mouseenter", () => {
            tarjeta.style.boxShadow = "0 15px 35px rgba(211, 47, 47, 0.25)";
        });

        tarjeta.addEventListener("mouseleave", () => {
            tarjeta.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.45)";
        });
    });
});