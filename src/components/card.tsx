import { useState, useEffect } from "react";

interface PokeCardProps {
    url: string;
};
function checkResponse (id: number, setUrl: Function, curl: string): string {
    fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`)
    .then(response => {
        console.log(response.type);
        if(response.ok===false){
            fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/versions/generation-v/black-white/${id}.png`).then(response => {
                if (response.ok===false){
                    setUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/versions/generation-v/black-white/0.png`);
                    } else {
                        setUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/versions/generation-v/black-white/${id}.png`);
                    }
        });    
        } else {
            
            setUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`)
        }
    });
    return curl;
}
export default function PokeCard({url}: PokeCardProps) {
    const [pokemon, setPokemon] = useState(null);
    const [type, setType] = useState(null);
    useEffect(()=>{
        fetch(url)
        .then(response => response.json())
        .then(json => setPokemon(json))
        .catch(error => console.error(error));
    },[]);
    const [curl, setUrl] = useState("");
    return(
    <div className="w-[240px] h-[320px] bg-transparent rounded-2xl relative it</div>ems-center">
        <img src={pokemon? checkResponse(pokemon.id, setUrl, curl): "https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/versions/generation-v/black-white/0.png"} alt={pokemon?.name} className="w-[96px] h-[96px] absolute bottom-[160px] z-10 left-[72px]"/>
        <div className="w-[240px] h-[180px] absolute bottom-0 rounded-xl  inset-shadow-gray-700 inset-shadow-sm bg-gray-950 flex flex-col items-center justify-center">
            <div className="text-white text-center text-xl font-bold font-[Barlow_Condensed]">{pokemon?.name.toUpperCase()}</div>
            <div className="flex flex-row gap-1 p-2 overflow-auto absolute bottom-2">
            {pokemon?.types.map((type: {type: {name: string, url: string}}) => {
                const typeId = type.type.url.split('/').filter(Boolean).pop();
                return (
                    <div key={typeId} className="flex items-center flex-wrap">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${typeId}.png`} alt={type.type.name} className="w-[96px] rounded-md"/>
                    </div>
                );
            })}</div>
        </div>
    </div>);
}