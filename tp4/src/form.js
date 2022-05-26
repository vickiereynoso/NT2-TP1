import Vue from 'vue'
import VueForm from 'vue-form'

var options = {
    validators : {
        'no-espacios' : function(value){
            return !value.includes(' ') 
            //si hay espacio retorna true, y al negarlo lo tornamos a false para que se lea como que el no-espacios justamente es false y "tire la alarma" por así decir.
        }
    }
}
//los validators se expresan como objetos y se les pone nombres como por ejem: 'no-espacios'. 
//Esto se representará con una función que recibe el valor a validar.
//El validador devolvera true si es válido.
//Se pueden poner todos los validators que queramos.

Vue.use(VueForm, options)
