import Header from "./components/Header/Header";
import "./index.css";
import { API_URL, LIMIT } from "./config";
import { useEffect, useState } from "react";
import { getPokemon, getPokemonAll } from "./utils/getPokemon";
import Card from "./components/Card/Card";
import Footer from "./components/Footer/Footer";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonAll = async () => {
      let res = await getPokemonAll(API_URL);
      console.log(res);

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
      data.map((pokemon) => {
        let pokemonDetail = getPokemon(pokemon.url);
        return pokemonDetail;
      })
    );
    setPokemonData(_pokemonData);
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

  return (
    <>
      <Header />
      <main className="bg-gray-900">
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
      </main>
      <Footer />
    </>
  );
}

export default App;
