import pokemonApi from '@/api/pokemonApi';

describe('api/pokemonApi',()=>{
    test('base url por defecto: https://pokeapi.co/api/v2/pokemon',()=>{
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon');
    })
})