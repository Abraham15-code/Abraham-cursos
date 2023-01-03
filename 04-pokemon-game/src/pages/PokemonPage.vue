<template>
  <div class="center">
    <h1 v-if="!pokemon">Espere un momento ...</h1>
    <div v-else class="container-pokemon">
      <section>
        <h2>¿Te consideras un maestro pokemón?</h2>
        <ul>
          <li>Se presentarán pokemones al azar</li>
          <li>Elije una opción</li>
          <li>Tienes cinco vidas</li>
          <li>Después de elejir, se cambian de pokemones automaticamente</li>
          <li>¡Suerte!</li>
        </ul>
        <span><strong>Dato curioso:</strong> Si tienes suerte se presentarán pokemones legendarios</span>
        <hr>
        <article>
          <div class="card">
            <label>Vidas:</label>
            <label for="">{{ life }}</label>
          </div>
          <div class="card card-info">
            <label>Total pokemones :</label>
            <label for=""> {{ totalCorrectAnswer + totalIncorrectAnswer }}</label>
          </div>
          <div class="card" :class="totalCorrectAnswer>0 ?'card-correct':''">
            <label>Aciertos :</label>
            <label for="">{{ totalCorrectAnswer }}</label>
          </div>
          <div class="card" :class="totalIncorrectAnswer>0?'card-incorrect':''">
            <label>Desaciertos :</label>
            <label for="">{{ totalIncorrectAnswer }}</label>
          </div>
        </article>
      </section>
      <section>
        <h1>¿Quien es este pokemón?</h1>
        <!--componente imagen-->
        <PokemonImage :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
        <!--componente mensaje-->
        <PokemonOptions v-if="life > 0" :options-arr="arrayPokemons" @selected-pokemon="checkPokemon($event)"
          :answered="showAnswer" :correctAnswer="correctAnswer" :yourAnswer="yourAnswer" />
        <template v-else-if="!showAnswer">
          <button @click="resetGame" class="btn">Nuevo juego</button>
        </template>

        <template v-if="showAnswer">
          <h1 class="fade-in">{{ message }}</h1>
          <b style="color: skyBlue">Espera ...</b>
          <div class="charging"></div>
        </template>
      </section>
    </div>
  </div>
</template>

<style scoped>
.center {
  width: 100% !important;
  height: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.charging {
  height: 30px !important;
  width: 30px !important;
  border: 2px dashed rgb(44, 73, 165);
  border-radius: 50%;
  animation: charg 500ms ease-in-out infinite;
  margin: 20px auto;
}

.container-pokemon {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
}

.container-pokemon div:first-child,
.container-pokemon div::nth-child(2) {
  padding: 0px 20px;
}

article {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

article .card {
  display: flex;
  margin: 0px 10px !important;
  width: auto;
  height: auto;
  padding: 15px 18px;
  border-radius: 5px;
  background-color: white;
}

article .card b,
article .card label {
  margin: 0px 2px;
  color: #273746;
  font-weight: bold;
}
.card-incorrect{
  background-color: #E74C3C !important;
}
.card-correct{
  background-color: #52BE80 !important;
}
.card-info{
  background-color: #A9CCE3 !important;
}
/* article .card:nth-child(2) {
  background-color: #A9CCE3;
}

article .card:nth-child(3) {
  background-color: #52BE80;
}

article .card:nth-child(4) {
  background-color: #E74C3C;
} */

.btn{
  background-color:#52BE80;
  border-radius:5px;
  margin:30px 20px;
  padding: 15px 20px;
  border:0px solid white;
  outline:none;
  transition:.2s ease-in-out;
  color:white;
  font-size:13px;
  cursor:pointer;
}
.btn:hover{
  box-shadow: 0.5px 1px 10px #273746ae;
  transform:scale(1.1);
}
h2 {
  font-size: 35px;
  color: #E74C3C;
  text-align: start;
}

ul {
  list-style: none;
  text-align: start;
  margin: 50px 0px;
}

ul li {
  color: #273746;
  font-size: 18px;
  margin: 5px 0px;
}

span {
  display: inline-block;
  margin: 20px 0px !important;
  font-size: 18px;
}

strong {
  color: #3498DB;
}

@keyframes charg {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(180deg);
  }
}

@media screen and (max-width:1200px) {
  .container-pokemon {
    display: block;
  }

  h2,
  h1 {
    font-size: 25px;
  }

  .container-pokemon div,
  h2,
  ul {
    text-align: center;
  }

  .container-pokemon div:first-child {
    margin-bottom: 50px;
  }
}
</style>

<script>
import PokemonImage from "@/components/PokemonImage";
import PokemonOptions from "@/components/PokemonOptions";
import getPokemonsOptions from "@/helpers/getPokemonsOptions";

export default {
  name: "PokemonPage",
  components: {
    PokemonImage,
    PokemonOptions,
  },
  data() {
    return {
      pokemon: null,
      arrayPokemons: [],
      showPokemon: false,
      message: "",
      showAnswer: false,
      correctAnswer: 0,
      yourAnswer: 0,
      life: 5,
      totalCorrectAnswer: 0,
      totalIncorrectAnswer: 0
    };
  },
  methods: {
    async getArrayPokemons() {
      this.arrayPokemons = await getPokemonsOptions();
      const random = Math.floor(Math.random() * this.arrayPokemons.length);
      this.pokemon = this.arrayPokemons[random];
    },
    checkPokemon(id) {
      this.showPokemon = true;
      this.correctAnswer = this.pokemon.id;
      this.yourAnswer = id;
      if (this.pokemon.id === id) {
        this.message = `¡Correcto!, el pokemón es ${this.pokemon.name}`;
        this.totalCorrectAnswer++;
      } else {
        this.life--;
        this.totalIncorrectAnswer++;
        this.message = `Opps!!!, era ${this.pokemon.name}`;
      }
      this.showAnswer = true;
      setTimeout(() => {
        if (this.life == 0) {
          this.showAnswer = false;
        } else {
          this.newGame();
        }
      }, 3000);
    },
    newGame() {
      this.pokemon = null;
      this.arrayPokemons = [];
      this.showPokemon = false;
      this.message = "";
      this.showAnswer = false;
      this.correctAnswer = 0;
      this.yourAnswer = 0;
      this.getArrayPokemons();
    },
    resetGame() {
      this.newGame();
      this.life = 5;
      this.totalCorrectAnswer = 0;
      this.totalIncorrectAnswer = 0;
    }
  },
  mounted() {
    //ciclo de vida del componente cuando se compila
    this.getArrayPokemons();
  },
};
</script>