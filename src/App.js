import React, { useState, useEffect } from "react";
import md5 from "md5";
import './App.css';

function App() {
  
  let [characters, setCharacters] = useState([]);
  let publicKey = "cf5deb3f5cd0b8e7c3bfb5673b91e35a";
  let privateKey = "1bedafde63b34252cf1a234a3745fc4c5726c5a4";
  const url = new URL("https://gateway.marvel.com/v1/public/characters?");
  let ts = "Hola Mundo"
  let hashed = md5(ts+privateKey+publicKey);
  let params = {
      ts:ts,
      hash: hashed,
      apikey: publicKey
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  useEffect(()=>{
    if(!navigator.onLine){
        if(localStorage.getItem("characters") === null) {
            setCharacters("Loading...")
            console.log("no guardado")
        } else {
            setCharacters(JSON.parse(localStorage.getItem("characters")));
            console.log("guardado")
            console.log(localStorage.getItem("characters"))
        }
    } else {
        fetch(url).then(res=>res.json()).then(res=>{
            setCharacters(res.data.results);
            localStorage.setItem("characters", JSON.stringify(res.data.results));
        })
    }
    }, []);

  return (
    <div>
      <h1>Marvel characters</h1>
      <hr></hr>
      <ul>
        {characters != "Loading..." && characters.map((item) => (
          <React.Fragment key={item.id}>
            <dt>{item.name}</dt>
            {item.description != "" &&
              <dd>{item.description}</dd>
            }
            {item.description == "" &&
              <dd>No description provided</dd>
            }
            <br></br>
        </React.Fragment>
        ))}
        {characters === "Loading..." &&
          <h2>{characters}</h2>
        }
      </ul>
    </div>
  );
}

export default App;
