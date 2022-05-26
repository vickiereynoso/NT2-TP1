<template>

  <section class="src-components-http-client">
    <div class="jumbotron">
      <h2>Http Client</h2>
      <hr>
      <hr>
      <br>
      
      <button class="btn btn-warning my-3 mr-3" @click="getPostsXHRcb()">
        Pedir XHR(cb)
      </button>

      <button class="btn btn-success my-3 mr-3" @click="getPostsFetch()">
        Pedir fetch(promise)
      </button>

      <button class="btn btn-success my-3 mr-3" @click="getPostsAxios()">
        Pedir Axios(promise)
      </button>

      <button class="btn btn-danger my-3 mr-3" @click="posts = []">
        Clear
      </button> <!-- BOTÓN PARA BORRAR: posts es ahora un array vacío -->
      

      <br>
      <div v-if="posts.length" class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
          <tr v-for="(post,index) in posts" :key="index">
            <td>{{post.name}} </td>
            <td>{{post.email}} </td>
            <td>{{post.telephone}} </td>
          </tr>
        </table>
      </div>    
      <h4 v-else class="alert alert-danger text-center">
        No se encontraron datos.
      </h4>

    </div>
  </section>

</template>

<script>

  export default  {
    name: 'src-components-http-client',
    props: [],
    mounted () {

    },
    data () {
      return {
        url: 'https://6286b3bce9494df61b2c3c62.mockapi.io/posts',
        posts:[]
      }
    },
    methods: {
      async getPostsAxios(){
        //--------- Axios con async/await:
        try {
          let { data:respuesta } =  await this.axios(this.url)
          this.posts = respuesta 
        }
        catch(error){
          console.error('Error en Axios: ', error)
        }
      },
      getPostsXHRcb(){
        const xhr = new XMLHttpRequest()
        xhr.open('get',this.url) //get para hacer la petición
        xhr.addEventListener('load', () => {
          if(xhr.status == 200){ 
            let respuesta = JSON.parse(xhr.response) //Y puedo cargar mi respuesta. El parse me decodifica los datos y los muestra como objetos con las llaves {} sino se serían como strings de json.
            //console.log(respuesta) 
            this.posts = respuesta //Con esto ya lo pasamos a la tabla.
          }
          else {
            console.error('Error en XHR status:', xhr.status)
          }
        })
        xhr.send() //acá hacemos la petición a la url
      }
    ,
    async getPostsFetch(){
      try {
        let response = await fetch(this.url)
        let respuesta = await response.json()
        this.posts = respuesta 
      }  
      catch(error){
        console.error('Error en Fetch: ',error)
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-http-client {

  }
</style>
