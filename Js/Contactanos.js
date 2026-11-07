document.addEventListener("DOMContentLoaded", () => {
    const emailLinks = document.querySelectorAll('.seccion-contacto a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const email = link.textContent.trim();
            navigator.clipboard.writeText(email);
            
            const originalText = link.textContent;
            link.textContent = "¡Correo copiado al portapapeles!";
            link.classList.add("text-success");
            
            setTimeout(() => {
                link.textContent = originalText;
                link.classList.remove("text-success");
            }, 2000);
        });
    });

    const contactImages = document.querySelectorAll(".seccion-contacto img");
    contactImages.forEach(img => {
        img.addEventListener("mouseenter", () => {
            img.style.transform = "scale(1.08)";
            img.style.transition = "transform 0.3s ease";
        });
        
        img.addEventListener("mouseleave", () => {
            img.style.transform = "scale(1)";
        });
    });
});