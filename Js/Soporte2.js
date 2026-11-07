angular.module('appSoporte')
    .component('chatBot', {
        templateUrl: '../templates/chat-bot.html',
        controller: ['BotService', function(BotService) {
            var $ctrl = this;

            $ctrl.$onInit = function() {
                $ctrl.mostrarChat = false;
                $ctrl.cargando = false;
                $ctrl.nuevoMensaje = '';
                $ctrl.mensajes = [
                    { emisor: 'bot', texto: '¡Hola! Soy el asistente virtual de Transportes Santa Cruz. Pregúntame sobre nuestra historia, rutas o contactos.' }
                ];
            };

            $ctrl.toggleChat = function() {
                $ctrl.mostrarChat = !$ctrl.mostrarChat;
            };

            $ctrl.enviar = function() {
                if (!$ctrl.nuevoMensaje || $ctrl.nuevoMensaje.trim() === '') return;

                var textoUsuario = $ctrl.nuevoMensaje.trim();
                $ctrl.mensajes.push({ emisor: 'usuario', texto: textoUsuario });
                $ctrl.nuevoMensaje = '';
                $ctrl.cargando = true;

                BotService.enviarMensaje(textoUsuario)
                    .then(function(respuestaBot) {
                        $ctrl.mensajes.push({ emisor: 'bot', texto: respuestaBot });
                    })
                    .catch(function() {
                        $ctrl.mensajes.push({ emisor: 'bot', texto: 'Lo siento, ocurrió un error al procesar tu solicitud.' });
                    })
                    .finally(function() {
                        $ctrl.cargando = false;
                    });
            };
        }]
    });