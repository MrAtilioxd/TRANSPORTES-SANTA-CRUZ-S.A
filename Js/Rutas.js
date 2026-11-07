document.addEventListener("DOMContentLoaded", () => {
    const cajas = document.querySelectorAll(".caja-mockup");

    cajas.forEach(caja => {
        caja.addEventListener("mouseenter", () => {
            caja.style.boxShadow = "0 15px 35px rgba(211, 47, 47, 0.25)";
        });

        caja.addEventListener("mouseleave", () => {
            caja.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.45)";
        });
    });
});