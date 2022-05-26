new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {

        getSalud(salud) {
            return `${salud}%`
        },

        empezarPartida: function () {
            this.turnos = []; //vacío el log
            this.hayUnaPartidaEnJuego =true;
            this.saludJugador=100;
            this.saludMonstruo=100;
        },

        atacar: function () {
          var herida = this.calcularHeridas(this.rangoAtaque[0],this.rangoAtaque[1]);
          this.saludMonstruo -= herida;
          this.turnos.unshift({ //unshift mete elementos nuevos al principio del array. Mientras que push lo hace al final.
              esJugador: true,
              text:'El jugador golpea al monstruo por '+ herida
          })
          if(this.verificarGanador()){
            return;
          }
          this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
          var herida = this.calcularHeridas(this.rangoAtaqueEspecial[0],this.rangoAtaqueEspecial[1]);
          this.saludMonstruo -= herida;
          this.turnos.unshift({ 
            esJugador: true,
            text:'El jugador golpea con ataque especial al monstruo por '+ herida
        })
          if(this.verificarGanador()){
              return;
            }
          this.ataqueDelMonstruo();
        },

        curar: function () {
            if(this.saludJugador <= 90){
                this.saludJugador += 10;
                this.turnos.unshift({ 
                    esJugador: true,
                    text:'El jugador es curado y recupera '+ 10
                })
            } else {
                this.saludJugador = 100;
                this.turnos.unshift({ 
                    esJugador: true,
                    text:'El jugador es curado '
                })
            }
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego=false;
        },

        ataqueDelMonstruo: function () {
            var herida = this.calcularHeridas(this.rangoAtaqueDelMonstruo[0],this.rangoAtaqueDelMonstruo[1]);
            this.saludJugador -= herida;
            this.turnos.unshift({ 
                esJugador: false,
                text:'El monstruo golpea al jugador en '+ herida
            })
            this.verificarGanador();
        },

        calcularHeridas: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) +1, min);
        },

        verificarGanador: function () {
            if(this.saludMonstruo <= 0){
                if(confirm('Ganaste! Jugar de nuevo?')){
                    this.empezarPartida();
                }else{
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            } else if(this.saludJugador <= 0){
                if(confirm('Perdiste! Jugar de nuevo?')){
                    this.empezarPartida();
                }else{
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }
            return false;
        },

        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});






/*
The confirm() method is used to display a modal dialog with an optional message and two buttons, OK and Cancel. It returns true if the user clicks “OK”, and false otherwise. It prevents the user from accessing other parts of the page until the box is closed.


La función Math.max() devuelve el mayor de cero o más números.
Ej.:
Math.max(10, 20);   //  20
Math.max(-10, -20); // -10
Math.max(-10, 20);  //  20 

La función Math.floor() redondea un número dado hacia el número entero anterior. O sea, devuelve el máximo entero menor o igual a un número.
Math.floor(0.9)  //  0
Math.floor(1.3)  //  1
Math.floor(0.5)  //  0
Math.floor(-0.9) // -1
Math.floor(-1.3) // -2
Para los números negativos esto significa que el número será redondeado "lejos de 0".
*/