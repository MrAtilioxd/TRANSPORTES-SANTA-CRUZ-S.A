let mapa;
let marcadorUsuario;
let circuloPrecision;
let controlRutaIda;
let controlRutaVuelta;

const puntosIda = [
    L.latLng(-11.8350, -77.0350),
    L.latLng(-11.8560, -77.0390),
    L.latLng(-11.8800, -77.0440),
    L.latLng(-11.9000, -77.0500),
    L.latLng(-11.9230, -77.0550),
    L.latLng(-11.9400, -77.0580),
    L.latLng(-11.9520, -77.0610),
    L.latLng(-11.9650, -77.0620),
    L.latLng(-11.9800, -77.0640),
    L.latLng(-11.9955, -77.0600),
    L.latLng(-12.0065, -77.0595),
    L.latLng(-12.0185, -77.0580),
    L.latLng(-12.0390, -77.0350),
    L.latLng(-12.0510, -77.0360),
    L.latLng(-12.0520, -77.0310),
    L.latLng(-12.0610, -77.0230),
    L.latLng(-12.0570, -77.0190),
    L.latLng(-12.0650, -77.0150)
];

const puntosVuelta = [
    L.latLng(-12.0650, -77.0150),
    L.latLng(-12.0620, -77.0170),
    L.latLng(-12.0610, -77.0230),
    L.latLng(-12.0580, -77.0270),
    L.latLng(-12.0520, -77.0310),
    L.latLng(-12.0490, -77.0340),
    L.latLng(-12.0430, -77.0350),
    L.latLng(-12.0440, -77.0380),
    L.latLng(-12.0400, -77.0430),
    L.latLng(-12.0310, -77.0470),
    L.latLng(-12.0230, -77.0540),
    L.latLng(-12.0185, -77.0580),
    L.latLng(-12.0065, -77.0595),
    L.latLng(-11.9955, -77.0600),
    L.latLng(-11.9850, -77.0630),
    L.latLng(-11.9690, -77.0610),
    L.latLng(-11.9540, -77.0545),
    L.latLng(-11.9430, -77.0520),
    L.latLng(-11.9350, -77.0530),
    L.latLng(-11.9230, -77.0550),
    L.latLng(-11.9000, -77.0500),
    L.latLng(-11.8800, -77.0440),
    L.latLng(-11.8560, -77.0390),
    L.latLng(-11.8350, -77.0350)
];

const opcionesRuta = {
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    show: false,
    routeWhileDragging: false,
    createMarker: function () { return null; }
};

const busesCercanos = [
    { id: "BUS-1301 (Ida)", lat: -11.9950, lon: -77.0600, sentido: "Ida", estado: "En ruta cerca a MegaPlaza" },
    { id: "BUS-1302 (Ida)", lat: -12.0460, lon: -77.0420, sentido: "Ida", estado: "Aproximándose a Plaza Dos de Mayo" },
    { id: "BUS-1303 (Vuelta)", lat: -12.0185, lon: -77.0580, sentido: "Vuelta", estado: "En Av. Eduardo de Habich" },
    { id: "BUS-1304 (Vuelta)", lat: -11.9350, lon: -77.0650, sentido: "Vuelta", estado: "En Av. Universitaria (Comas)" }
];

function crearIcono(color) {
    return L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-' + color + '.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}

document.addEventListener("DOMContentLoaded", function () {
    mapa = L.map('mapa').setView([-11.95, -77.04], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapa);

    controlRutaIda = L.Routing.control({
        ...opcionesRuta,
        waypoints: puntosIda,
        lineOptions: {
            styles: [{ color: '#1b5e20', weight: 5, opacity: 0.9 }]
        }
    }).addTo(mapa);

    controlRutaVuelta = L.Routing.control({
        ...opcionesRuta,
        waypoints: puntosVuelta,
        lineOptions: {
            styles: [{ color: '#6a1b9a', weight: 4, opacity: 0.9, dashArray: '8, 8' }]
        }
    }).addTo(mapa);

    const puntosClic = [];
    mapa.on('click', function (e) {
        puntosClic.push('    L.latLng(' + e.latlng.lat.toFixed(5) + ', ' + e.latlng.lng.toFixed(5) + ')');
        console.log('[\n' + puntosClic.join(',\n') + '\n]');
    });

    busesCercanos.forEach(bus => {
        const colorIcono = bus.sentido === "Ida" ? "green" : "violet";
        L.marker([bus.lat, bus.lon], { icon: crearIcono(colorIcono) })
            .addTo(mapa)
            .bindPopup("<b>Unidad: " + bus.id + "</b><br>Sentido: " + bus.sentido + "<br>Estado: " + bus.estado);
    });
});

function obtenerUbicacion() {
    const contenedorResultado = document.getElementById("resultado-ubicacion");

    if (!("geolocation" in navigator)) {
        if (contenedorResultado) {
            contenedorResultado.textContent = "Tu navegador no soporta geolocalización.";
        }
        return;
    }

    if (contenedorResultado) {
        contenedorResultado.textContent = "Calculando tu posición y cercanía...";
    }

    const opciones = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;
            const precision = position.coords.accuracy;

            mapa.setView([latitud, longitud], 15);

            if (marcadorUsuario) {
                mapa.removeLayer(marcadorUsuario);
            }

            if (circuloPrecision) {
                mapa.removeLayer(circuloPrecision);
            }

            marcadorUsuario = L.marker([latitud, longitud], { icon: crearIcono("red") })
                .addTo(mapa)
                .bindPopup("<b>¡Tú estás aquí!</b>")
                .openPopup();

            circuloPrecision = L.circle([latitud, longitud], {
                color: '#d32f2f',
                fillColor: '#d32f2f',
                fillOpacity: 0.15,
                radius: precision
            }).addTo(mapa);

            let menorDistancia = Infinity;
            let sentidoBusCercano = "";
            let busCercanoId = "";

            busesCercanos.forEach(bus => {
                const distancia = mapa.distance([latitud, longitud], [bus.lat, bus.lon]);
                if (distancia < menorDistancia) {
                    menorDistancia = distancia;
                    busCercanoId = bus.id;
                    sentidoBusCercano = bus.sentido;
                }
            });

            if (contenedorResultado && busCercanoId) {
                const distanciaTexto = menorDistancia > 1000
                    ? (menorDistancia / 1000).toFixed(2) + " km"
                    : Math.round(menorDistancia) + " metros";
                contenedorResultado.textContent = "El bus más cercano es el " + busCercanoId + " (" + sentidoBusCercano + ") a una distancia de " + distanciaTexto + ".";
            }
        },
        function (error) {
            if (!contenedorResultado) return;
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    contenedorResultado.textContent = "Permiso de ubicación denegado por el usuario.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    contenedorResultado.textContent = "La información de ubicación no está disponible.";
                    break;
                case error.TIMEOUT:
                    contenedorResultado.textContent = "La petición para obtener la ubicación ha caducado.";
                    break;
                default:
                    contenedorResultado.textContent = "Ocurrió un error desconocido.";
                    break;
            }
        },
        opciones
    );
}