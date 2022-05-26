<template>

  <section class="src-components-formulario">
    <div class="jumbotron">
    <h2>Formulario</h2>
    <hr>
    <hr>
    <br>

    <vue-form :state="formState" @submit.prevent="enviar()">


        <!-- Campo Nombre: -->
        <validate tag="div">
          <label for="nombre">Nombre</label>
          <input 
          type="text" 
          id="nombre" 
          name="nombre" 
          class="form-control"
          v-model.trim="formData.nombre"
          autocomplete="off"
          required
          :minlength="nombreMinLength"
          :maxlength="nombreMaxLength"
          no-espacios
          > 
             
        <!--Mensaje de validación para el campo nombre:-->
        <field-messages name="nombre" show="$dirty"> 

            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido.
            </div>

            <!--Validador personalizado:-->
            <div slot="no-espacios" class="alert alert-danger mt-1">
              No se permiten espacios intermedios en este campo.
            </div>

            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo requiere como mínimo {{nombreMinLength}} caracteres.
            </div>
            <!--A continuación se usa div con v-if. El slot no aplica.-->
            <div v-if="formData.nombre.length == nombreMaxLength" class="alert alert-danger mt-1">
              Este campo debe poseer como máximo {{nombreMaxLength}} caracteres.
            </div>
        </field-messages>
        <!--show="$dirty" significa "mostrá esto si el campo está sucio"-->
        <!--slot="required" va con su validador required.
          Si el validador genera el aviso de que el campo tiene que ser requerido, el slot se va a activar y hará que el cartel se muestre llegado el caso.  -->
        </validate>




        <!-- Campo Edad: -->
        <validate tag="div">
          <label for="edad">Edad</label>
          <input 
          type="number" 
          id="edad" 
          name="edad" 
          class="form-control"
          v-model.number="formData.edad"
          autocomplete="off"
          required
          :min="edadMin"
          :max="edadMax"
          > 
          <!-- Con el modificador .number en v-model.number="formData.edad" parseo un string a numero -->

          <!--Mensaje de validación para el campo edad:-->
          <field-messages name="edad" show="$dirty"> 
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido.
            </div>
            <div slot="min" class="alert alert-danger mt-1">
              La edad mínima es de {{edadMin}} años.
            </div>
            <div slot="max" class="alert alert-danger mt-1">
              La edad máxima es de {{edadMax}} años.
            </div>
          </field-messages>
        </validate>      
        



        <!-- Campo email: -->
        <validate tag="div">
          <label for="email">Email</label>
          <input 
          type="email" 
          id="email" 
          name="email" 
          class="form-control"
          v-model.trim="formData.email"
          autocomplete="off"
          required
          > 

          <!--Mensaje de validación para el campo email:-->
          <field-messages name="email" show="$dirty"> 
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido.
            </div>
            <div slot="email" class="alert alert-danger mt-1">
              Email no válido.
            </div>
          </field-messages>
        </validate>
        <!--slot="email" valida que sea un email. En el caso de activarse me mostrará el correspondiente mensaje de error.-->


        <!--BOTÓN DE ENVÍO:-->
  
        <button class="btn btn-success my-3" :disabled="formState.$invalid">Enviar</button>
        <!--Deshabilito el botón si alguna validación required no se cumple. -->
  
      </vue-form>
  
      <br>
      <br>
        
      <!--Tabla dinámica:-->
      <div class="table-responsive">
          <table class="table table-dark">
                <tr>
                    <td>Nombre</td>
                    <td>Edad</td>
                    <td>Email</td>
                </tr>
                <tr>
                    <td>{{formData.nombre}}</td>
                    <td>{{formData.edad}}</td>
                    <td>{{formData.email}}</td>
               </tr>
          </table>
      </div>
    

  </div>
  </section>

</template>






<script lang="js">

  export default  {
    name: 'src-components-formulario',
    props: [],
    mounted () {

    },
    data () {
      return {
        formData : { // formData contendrá todos los campos del formulario (pueden ser vacíos ‘ ’ o bien, null):
        nombre: '', 
        edad: '',
        email: '',
        },
        formState: { 

        },
        nombreMinLength : 5,
        nombreMaxLength: 15,
        edadMin: 18,
        edadMax: 120,
      }
    },
    methods: {
        getInicialData(){
          return{
            nombre: '',
            edad: '',
            email: '',
          }
        },
        enviar(){
          //SPREAD OPERATOR: me permite clonar un objeto y simplificar su expresión:
          //console.log({...this.formData})
          //agrego corchetes y 3 puntos.
          //le saca los literales a ese objeto, se queda con la parte de adentro y forma un nuevo objeto con las llaves corchetes.  
          //Así, solamente se expondrán las CLAVES y no todo el choclo de otras propiedades y métodos nativos del objeto.

          this.formData = this.getInicialData() //resetea los valores.
          this.formState._reset() //resetea los estados del formState. Así no salen $dirty aún despúes de enviar el formulario.
        }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-formulario {

  }
</style>
