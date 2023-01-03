<template>
  <div class="options-container">
    <ul>
      <li
        v-for="{ name, id } in optionsArr"
        :key="id"
        @click="$emit('selectedPokemon', id)"
        :class="yourAnswer>0 ? correctAnswer==id ?'correct':correctAnswer!=id && yourAnswer==id?'incorrect':'disabled':''">
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    optionsArr: {
      type: Array,
      required: true,
    },
    answered: {
      type: Boolean,
      required: true,
      default: false,
    },
    correctAnswer: {
      type: Number,
      default: 0,
    },
    yourAnswer: {
      type: Number,
      default: 0,
    },
  },
  methods: {

  },
};
</script>
<style scoped>
ul {
  list-style-type: none;
}
li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
  padding: 5px;
}
li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.disabled, .correct, .incorrect{
  pointer-events: none !important;
}
.disabled {
  background-color: rgb(206, 205, 205);
}
.correct{
  background-color: rgba(0, 128, 0, 0.507) !important;
  color:white;
}
.incorrect{
  background-color: rgba(255, 0, 0, 0.567) !important;
  color:white;
  transform: scale(1.05);
}
.options-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>