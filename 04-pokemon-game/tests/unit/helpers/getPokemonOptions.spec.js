import getPokemonsOptions, {
  getPokemons,
  getNames,
} from "@/helpers/getPokemonsOptions";
describe("helpers/getPokemonOptions.js", () => {
  test('evaluar que sea un "arreglo", de "600 valores" y todos "numeros"', () => {
    expect(getPokemons()).toBeInstanceOf(Array);
    expect(getPokemons().length).toBe(600);
    expect(getPokemons()[0]).toBe(1);
    expect(getPokemons()[200]).toBe(201);
  });
  test("debe retornar un arreglo de 4 elementos con nombres de pokemones", async () => {
    const misPokemones = await getNames([1, 2, 3, 4]);
    //comparación de objetos
    expect(misPokemones).toStrictEqual([
      {
        name: "bulbasaur",
        id: 1,
      },
      {
        name: "ivysaur",
        id: 2,
      },
      {
        name: "venusaur",
        id: 3,
      },
      {
        name: "charmander",
        id: 4,
      },
    ]);
  });
  test("debe retornar un arreglo mezclado de 4 valores", async () => {
    const misPokemones = await getPokemonsOptions();

    expect(misPokemones.length).toBe(4);
    // cuando no sabemos el valor exacto (porque puede ser cambiante)
    // entonces evaluamos el tipo de dato
    expect(misPokemones).toEqual([
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
      {
        name: expect.any(String),
        id: expect.any(Number),
      },
    ]);
  });
});
