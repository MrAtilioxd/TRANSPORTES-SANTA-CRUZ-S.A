angular.module('appSoporte')
    .factory('BotService', ['$q', '$timeout', function($q, $timeout) {
        function enviarMensaje(mensajeUsuario) {
            var diferido = $q.defer();
            
            $timeout(function() {
                var respuesta = "";
                var msg = mensajeUsuario.toLowerCase();

                if (msg.includes("historia") || msg.includes("nosotros") || msg.includes("fundacion") || msg.includes("origen")) {
                    respuesta = "Historia: Transportes Santa Cruz S.A. se constituyó inicialmente como el Comité de Microbuses 13M el 11 de octubre de 1965. Se formalizó como empresa el 28 de febrero de 1986, inscrita en los Registros Públicos de Lima, celebrando 60 años al servicio del transporte urbano.";
                } 
                else if (msg.includes("ruta") || msg.includes("recorrido") || msg.includes("paradero") || msg.includes("destino")) {
                    respuesta = "Rutas: Operamos la ruta concesionada 1217. Salida: Punchauca (Av. Túpac Amaru Km 24.5 - Carabayllo). Llegada: Jr. Huánuco - La Victoria, transitando por Av. Universitaria y Panamericana Norte.";
                } 
                else if (msg.includes("contacto") || msg.includes("telefono") || msg.includes("correo") || msg.includes("email") || msg.includes("administrador") || msg.includes("secretaria")) {
                    respuesta = "Teléfono de la empresa: (01) 5234705 / 941418880.\n\nCorreos de contacto:\n- Administrador: administrador@transportessantacruz.com\n- Contabilidad: contabilidad@transportessantacruz.com\n- Secretaria: secretaria@transportessantacruz.com";
                } 
                else {
                    respuesta = "Hola, puedo ayudarte con información sobre nuestra historia, rutas o contactos (teléfonos y correos). ¿Qué deseas consultar?";
                }

                diferido.resolve(respuesta);
            }, 800);

            return diferido.promise;
        }

        return {
            enviarMensaje: enviarMensaje
        };
    }]);