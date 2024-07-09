import Header from "./components/Header/Header";
import "./index.scss";
import { API_URL, LIMIT } from "./config";
import { useEffect, useState } from "react";
import { getPokemon, getPokemonAll, getPokemonSpecies, getPokemonTypes } from "./utils/getPokemon";
import Card from "./components/Card/Card";
import Footer from "./components/Footer/Footer";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [japanese, setJapanese] = useState(false);

  useEffect(() => {
    const fetchPokemonAll = async () => {
      let res = await getPokemonAll(API_URL);

      loadPokemonData(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setPage(1)
      setLoading(false);
    };
    fetchPokemonAll();
  }, []);

  const loadPokemonData = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async(pokemon) => {
        let pokemonDetail = await getPokemon(pokemon.url);
        let speciesDetail = await getPokemonSpecies(pokemonDetail.species.url);
        if(!speciesDetail) return;

        // get Japanese name
        let japaneseNameObj = speciesDetail.names.find(name => name.language.name === "ja");
        let japaneseName = japaneseNameObj ? japaneseNameObj.name : "Unknown";

        // get Japanese types
        let resPokemonTypes = pokemonDetail.types
        let _pokemonType = await Promise.all(
          resPokemonTypes.map(async (typeURL) => {
            let typeDetail = await getPokemonTypes(typeURL.type.url)
            let typeNameObj = typeDetail.names.find(name => name.language.name === 'ja')
            return typeNameObj ? typeNameObj.name : "Unknown";
          })
        )
        let joinedTypes = _pokemonType.join(' / ')

        return {
            ...pokemonDetail,
            japaneseName: japaneseName,
            japaneseTypes: joinedTypes,
          };
        }
      )
    );
    setPokemonData(_pokemonData.filter(pokemon => pokemon !== null));
  };


  const handlePrevBtn = async () => {
    setLoading(true);
    const curPage = page - 1;
    if (!prevURL || page <= 0) return;
    let prevData = await getPokemonAll(prevURL);
    await loadPokemonData(prevData.results);
    setNextURL(prevData.next);
    setPrevURL(prevData.previous);
    setPage(curPage);
    setLoading(false);
  };

  const handleNextBtn = async () => {
    setLoading(true);
    const curPage = page + 1;
    if (!nextURL) return;
    let nextData = await getPokemonAll(nextURL);
    await loadPokemonData(nextData.results);
    setNextURL(nextData.next);
    setPrevURL(nextData.previous);
    setPage(curPage);
    setLoading(false);
  };

  const handleJapaneseBtn = (e) => {
    setJapanese(!japanese)
    const btn = e.target.closest('.btn__language');
    // btn.classList.toggle('')
  }

  return (
    <>
      <Header jaBtn={handleJapaneseBtn} isJapanese={japanese} />
      <main className="bg-gray-900">
        {loading ? (
          <div className="min-h-screen grid place-items-center">
            <p className="text-white">Loading...</p>
          </div>
        ) : (
          <>
          <div className="grid-cols-1 lg:container mx-auto grid  gap-6 p-20 min-h-screen text-white lg:grid-cols-5 md:grid-cols-3">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} data={pokemon} />;
            })}
          </div>
          <div className="pb-20 mx-auto flex gap-6 justify-center items-center lg:container">
            <button
              className="px-12 py-3 border-2 border-purple-600 text-white rounded-lg transition-all hover:bg-purple-600"
              onClick={handlePrevBtn}
              disabled={page === 1}
            >
              Prev
            </button>
            <p className="text-white">{page}</p>
            <button
              className="px-12 py-3 border-2 border-purple-600 text-white rounded-lg transition-all hover:bg-purple-600"
              onClick={handleNextBtn}
              disabled={LIMIT > pokemonData.length}
            >
              Next
            </button>
          </div>
          </>
        ) }
      </main>
      <Footer />
    </>
  );
}

export default App;
