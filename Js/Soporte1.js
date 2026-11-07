angular.module('appSoporte')
    .factory('BotService', ['$q', '$timeout', function($q, $timeout) {
        function enviarMensaje(mensajeUsuario) {
            var diferido = $q.defer();
            
            $timeout(function() {
                var respuesta = "";
                var msg = mensajeUsuario.toLowerCase().trim();

                if (msg.includes("hola") || msg.includes("buenos dias") || msg.includes("buenas tardes") || msg.includes("buenas noches") || msg.includes("saludos")) {
                    respuesta = "¡Hola! Bienvenido al centro de asistencia de Transportes Santa Cruz S.A. ¿En qué te puedo ayudar hoy? Puedes preguntarme sobre nuestra historia, rutas, horarios, grifos o contactos.";
                } 
                else if (msg.includes("gracias") || msg.includes("muchas gracias") || msg.includes("te agradezco")) {
                    respuesta = "¡De nada! Estoy aquí para ayudarte en lo que necesites. Si tienes más dudas sobre el recorrido o la empresa, solo dime.";
                }
                else if (msg.includes("chau") || msg.includes("adios") || msg.includes("hasta luego") || msg.includes("salir")) {
                    respuesta = "¡Hasta luego! Gracias por comunicarte con Transportes Santa Cruz S.A. ¡Buen viaje!";
                }
                else if (msg.includes("historia") || msg.includes("nosotros") || msg.includes("fundacion") || msg.includes("origen") || msg.includes("años")) {
                    respuesta = "📖 **Historia:** Transportes Santa Cruz S.A. se constituyó inicialmente como el Comité de Microbuses 13M el 11 de octubre de 1965. Nos formalizamos como empresa el 28 de febrero de 1986, celebrando 60 años al servicio del transporte urbano en Lima.";
                } 
                else if (msg.includes("ruta") || msg.includes("recorrido") || msg.includes("paradero") || msg.includes("destino") || msg.includes("1217") || msg.includes("llegada") || msg.includes("salida")) {
                    respuesta = "🚌 **Rutas y Recorrido:** Operamos la ruta concesionada 1217.\n**Salida:** Punchauca (Av. Túpac Amaru Km 24.5 - Carabayllo).\n**Llegada:** Jr. Paita (Rímac) / Huánuco (La Victoria).\n**Avenidas principales:** Av. Túpac Amaru, Av. Naranjal, Panamericana Norte y Av. Abancay.";
                } 
                else if (msg.includes("horario") || msg.includes("horas") || msg.includes("atencion")) {
                    respuesta = "⏰ **Horarios de Ruta:** Lunes a domingo de 05:00 a.m. a 10:30 p.m.\n\n🏛️ **Mesa de Partes / Oficina Principal:**\nLunes a viernes: 08:30 a.m. – 01:00 p.m. y 04:00 p.m. – 07:30 p.m.\nSábados: 09:00 a.m. – 01:00 p.m.";
                }
                else if (msg.includes("grifos") || msg.includes("combustible") || msg.includes("gas") || msg.includes("gnv") || msg.includes("servicios")) {
                    respuesta = "⛽ **Estaciones de Servicio (Grifos):**\n1. **Terminal de Carabayllo:** Abastecimiento interno para unidades de la empresa.\n2. **Av. Naranjal N° 299 (Independencia):** Venta al público general y convenio GNV con nuestro aliado comercial **CLEAN ENERGY**.";
                }
                else if (msg.includes("contacto") || msg.includes("telefono") || msg.includes("correo") || msg.includes("email") || msg.includes("administrador") || msg.includes("secretaria") || msg.includes("llamar")) {
                    respuesta = "📞 **Teléfonos:** (01) 5234705 / 941418880.\n\n✉️ **Correos Electrónicos:**\nAdministrador: administrador@transportessantacruz.com\nContabilidad: contabilidad@transportessantacruz.com\nSecretaria: secretaria@transportessantacruz.com";
                } 
                else if (msg.includes("donacion") || msg.includes("yape") || msg.includes("programadores") || msg.includes("apoyar")) {
                    respuesta = "💖 ¡Qué bueno que quieras apoyarnos! Puedes visitar nuestra sección de Donaciones para escanear el QR de Yape o comunicarte al 986155780 para más proyectos de desarrollo web.";
                }
                else {
                    respuesta = "Disculpa, no logré comprender exactamente tu consulta sobre ese tema. 🤖\n\nPor favor, intenta preguntar sobre alguna de las opciones disponibles:\n• Nuestra **historia** o años de servicio.\n• Las **rutas**, paraderos y horarios.\n• Los **grifos** y estaciones de combustible.\n• Los datos de **contacto** y teléfonos.\n\n¿En cuál de estas opciones te gustaría que te ayude?";
                }

                diferido.resolve(respuesta);
            }, 800);

            return diferido.promise;
        }

        return {
            enviarMensaje: enviarMensaje
        };
    }]);