<template>
  <div class="pokemon-container">
    <img :src="imgSrc" alt="pokemón" class="hidden-pokemon" v-if="!showPokemon"/>
    <img :src="imgSrc" alt="pokemón" class="fade-in" v-if="showPokemon" />
  </div>
</template>

<script>
export default {
  name: "PokemonImage",
  props: {
    pokemonId: {
      type: Number,
      required: true,
      default: 0,
    },
    showPokemon: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    imgSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
    },
  },
};
</script>
<style scoped>
.pokemon-container {
  height: 300px;
  position: relative;
}

img {
  height: 100%;
  /* position: absolute;
  right: calc(50% - 100px); */
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}


.hidden-pokemon {
  filter: brightness(0);
}
</style>