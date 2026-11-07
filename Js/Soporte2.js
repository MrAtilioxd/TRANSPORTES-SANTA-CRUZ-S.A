angular.module('appSoporte')
    .component('chatBot', {
        template: `
            <div class="bot-widget">
                <button class="btn btn-danger rounded-circle bot-toggle-btn shadow-lg" ng-click="$ctrl.toggleChat()">
                    <i class="bi bi-chat-dots-fill fs-4"></i>
                </button>

                <div class="card card-custom bot-window shadow-lg" ng-show="$ctrl.mostrarChat">
                    <div class="card-header bg-danger text-white d-flex justify-content-between align-items-center py-2 px-3">
                        <strong><i class="bi bi-robot"></i> Asistente Santa Cruz</strong>
                        <button type="button" class="btn-close btn-close-white" ng-click="$ctrl.toggleChat()"></button>
                    </div>

                    <div class="card-body bot-messages-container p-3">
                        <div ng-repeat="msg in $ctrl.mensajes" ng-class="{'text-end': msg.emisor === 'usuario', 'text-start': msg.emisor === 'bot'}" class="mb-2">
                            <span class="d-inline-block p-2 rounded text-break" style="max-width: 85%; white-space: pre-line;"
                                ng-class="{'bg-danger text-white': msg.emisor === 'usuario', 'bg-dark text-light border border-secondary': msg.emisor === 'bot'}">
                                {{msg.texto}}
                            </span>
                        </div>
                        <div ng-if="$ctrl.cargando" class="text-start mb-2">
                            <span class="badge bg-secondary">Escribiendo...</span>
                        </div>
                    </div>

                    <div class="card-footer bg-dark border-secondary p-2">
                        <form ng-submit="$ctrl.enviar()" class="d-flex gap-2">
                            <input type="text" class="form-control bg-dark text-white border-secondary form-control-sm" 
                                placeholder="Escribe tu consulta..." ng-model="$ctrl.nuevoMensaje" ng-disabled="$ctrl.cargando">
                            <button type="submit" class="btn btn-danger btn-sm px-3" ng-disabled="$ctrl.cargando">
                                <i class="bi bi-send-fill"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `,
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