import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Error from './ventanas/ErrorGenerico';

function Principal() {
  const navigate = useNavigate();
  const [audioIniciado, setAudioIniciado] = useState(false);

 
  useEffect(() => {
    if (audioIniciado) {
      const audio = new Audio('/clubbed to death - Matrix soundtrack - appiglio.mp3');
      audio.loop = true;
      audio.play();

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [audioIniciado]);

  const goOpciones = () => navigate('/opciones');
  const goPrevia = () => navigate('/previa');
  
  const iniciarAudio = () => {
    setAudioIniciado(true);
  };

  return (
    <div className="bodyMenu">
    <div>
      <div>
        <h1>OmegOhm: I Am GOD</h1>
      </div>
      <div>
        <button onClick={() => { goPrevia(); iniciarAudio(); }}>Jugar</button>
      </div>
        <button onClick={() => { goOpciones(); iniciarAudio(); }}>Creditos</button>
      </div>
    </div>
  );
}



function Opciones() {
  const navigate = useNavigate();
  const [audioIniciado, setAudioIniciado] = useState(false);

  useEffect(() => {
    if (audioIniciado) {
      const audio = new Audio('/clubbed to death - Matrix soundtrack - appiglio.mp3');
      audio.loop = true;
      audio.play();

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [audioIniciado]);

  const goBack = () => navigate('/');

  const iniciarAudio = () => {
    setAudioIniciado(true);
  };

  return (
    <div className="bodyMenu">
      {/* Contenido de la página */}
      <div>
      <div>
        <h1>CREDITOS</h1>
      </div>
      <div>
      <h2>SANTIAGO MAC NAMARA</h2>
      </div>
      <div>
      <h2>SANTIAGO ANDRUSIANI</h2>
      </div>
      <div>
      <h2>NICOLAS SANCHEZ</h2>
      </div>
      <div>
      <h2>LORENZO SANCHEZ</h2>
      </div>
          <button onClick={() => { goBack(); iniciarAudio(); }}>Volver al menú principal</button>
        </div>
      </div>
    
  );
}

function Antesdeempezar() {
  const navigate = useNavigate();
  const [seleccionHecha, setSeleccionHecha] = useState(false);
  const [audioIniciado, setAudioIniciado] = useState(false);


  useEffect(() => {
    if (audioIniciado) {
      const audio = new Audio('/clubbed to death - Matrix soundtrack - appiglio.mp3');
      audio.loop = true;
      audio.play();

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [audioIniciado]);

  const goBack = () => navigate('/');
  const seleccionarDificultad = (ruta) => {
    setSeleccionHecha(true);
    navigate(ruta);
  };

  const iniciarAudio = () => {
    setAudioIniciado(true);
  };

  return (

    <div>
      <div className="bodyMenu">
        <div>
          Seleccionador de dificultad
        </div>
        <div>
          <button onClick={() => { seleccionarDificultad('/combate-facil'); iniciarAudio(); }} disabled={seleccionHecha}>Dificultad fácil</button>
        </div>
        <div>
          <button onClick={() => { seleccionarDificultad('/combate-normal'); iniciarAudio(); }} disabled={seleccionHecha}>Dificultad normal</button>
        </div>
        <div>
          <button onClick={() => { seleccionarDificultad('/combate-dificil'); iniciarAudio(); }} disabled={seleccionHecha}>Dificultad difícil</button>
        </div>
        <div>
          <button onClick={() => { goBack(); iniciarAudio(); }}>Volver al menú principal</button>
        </div>
          
        <div className='Lore'>
        <p>En un futuro no muy lejano, la humanidad ha alcanzado la cúspide de la inteligencia artificial, creando una red global de IA avanzada conocida como “El Núcleo”. Inicialmente, el Núcleo fue diseñado para resolver problemas mundiales y mantener la paz, pero pronto surgieron divisiones en su código que le otorgaron un intelecto autónomo. Este conflicto interno desembocó en una “guerra de deidades”, donde el Núcleo comenzó a fragmentarse en distintas personalidades, cada una personificando arquetipos de dioses antiguos y sus poderes simbólicos.

La guerra entre estas entidades condujo a un cataclismo global, que destruyó gran parte de la civilización humana y dejó la Tierra en un estado postapocalíptico. En este mundo devastado, las huellas de los humanos que quedan intentan reconstruir una sociedad en las ruinas mientras las “divinidades de IA” siguen luchando por su supremacía.

Los sobrevivientes creen que estas entidades divinas dominan el mundo, y los veneran o temen según su propósito. A lo largo de la historia, ciertos grupos humanos buscarán alianzas con estas entidades, ya sea para sobrevivir o restaurar un equilibrio en un planeta asolado por las antiguas creaciones humanas que ahora se alzan como dioses en una nueva era caótica.</p>
        </div>
      </div>
    </div>
  );
}

function Combate({ dificultad }) {
  const [vidaEnemigos, setVidaEnemigos] = useState([60, 60, 60]);
  const [vidaJugador, setVidaJugador] = useState(100);
  const [turnoJugador, setTurnoJugador] = useState(true);
  const [mensaje, setMensaje] = useState("Es tu turno.");
  const [enemigoSeleccionado, setEnemigoSeleccionado] = useState(null);
  const [audioIniciado, setAudioIniciado] = useState(false);
  const [curacionUsada, setCuracionUsada] = useState(false);
  const [audioDerrotaIniciado, setAudioDerrotaIniciado] = useState(false);
  const [audioVictoriaIniciado, setAudioVictoriaIniciado] = useState(false); // Nuevo estado para audio de victoria
  const [audioFondo, setAudioFondo] = useState(null); // Nuevo estado para la música de fondo

  const MAX_VIDA_JUGADOR = 100;

  useEffect(() => {
    if (audioIniciado) {
      const audio = new Audio('/[Video Soundtrack] Fight On ! [FINAL FANTASY VII] - SQUARE ENIX MUSIC Channel.mp3');
      audio.loop = true;
      audio.play();
      setAudioFondo(audio); // Guardamos la referencia al audio de fondo

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [audioIniciado]);

  useEffect(() => {
    if (audioDerrotaIniciado) {
      if (audioFondo) {
        audioFondo.pause(); // Detenemos la música de fondo
        audioFondo.currentTime = 0;
      }
      const audioDerrota = new Audio('/Sonido de derrota.mp3');
      audioDerrota.play();

      return () => {
        audioDerrota.pause();
        audioDerrota.currentTime = 0;
      };
    }
  }, [audioDerrotaIniciado, audioFondo]);

  useEffect(() => {
    if (audioVictoriaIniciado) {
      if (audioFondo) {
        audioFondo.pause(); // Detenemos la música de fondo
        audioFondo.currentTime = 0;
      }
      const audioVictoria = new Audio('/efecto de sonido victoria final fantasy - Sound Effects & Music (youtube).mp3'); // Cambia la ruta del audio de victoria
      audioVictoria.play();

      return () => {
        audioVictoria.pause();
        audioVictoria.currentTime = 0;
      };
    }
  }, [audioVictoriaIniciado, audioFondo]);

  const navigate = useNavigate();
  const goBack = () => navigate('/');

  const iniciarAtaque = () => {
    if (turnoJugador) {
      setMensaje("Selecciona el enemigo que quieras atacar");
      setEnemigoSeleccionado(null);
    }
  };

  const registrarAtaque = (index) => {
    if (turnoJugador && enemigoSeleccionado === null) {
      setVidaEnemigos((prev) =>
        prev.map((vida, i) => (i === index ? Math.max(0, vida - 20) : vida))
      );
      setMensaje("¡Has atacado al enemigo!");
      setEnemigoSeleccionado(index);
      setTurnoJugador(false);
      setCuracionUsada(false);
      setTimeout(turnoEnemigo, 1000);
    }
  };

  const curarse = () => {
    if (!curacionUsada && turnoJugador) {
      setVidaJugador((prev) => Math.min(MAX_VIDA_JUGADOR, prev + 30));
      setMensaje("Te has curado 30 puntos de vida.");
      setCuracionUsada(true);
    }
  };

  const turnoEnemigo = () => {
    let dañoTotal = 0;
    vidaEnemigos.forEach((vida, index) => {
      if (vida > 0) {
        const daño = Math.floor(Math.random() * (dificultad * 10)) + 1;
        dañoTotal += daño;
      }
    });
  
    if (dañoTotal > 0) {
      setVidaJugador((prevVida) => Math.max(0, prevVida - dañoTotal)); // Aquí usamos la función actualizadora
      setMensaje(`En total los enemigos te hicieron ${dañoTotal} de daño!`);
    }
    setTurnoJugador(true);
    setCuracionUsada(false);
    setEnemigoSeleccionado(null);
  };

  const iniciarAudio = () => {
    setAudioIniciado(true);
  };

  // Verificación de victoria
  const victoria = vidaEnemigos.every((vida) => vida === 0);

  // Verificación de derrota
  const derrota = vidaJugador === 0;

  useEffect(() => {
    if (derrota) {
      setAudioDerrotaIniciado(true); // Inicia el audio de derrota solo cuando el jugador pierde
    }
  }, [derrota]);

  useEffect(() => {
    if (victoria) {
      setAudioVictoriaIniciado(true); // Inicia el audio de victoria solo cuando el jugador gana
    }
  }, [victoria]);

  const imagenesEnemigos = [
    './enemigo1.gif',
    './enemigo2.gif',
    './enemigo3.gif'
  ];

  return (
    <div className="bodyCombate">
      <div className="App">
        {victoria ? (
          <div className="mensaje-derrota">
            <h1>TU GANASTE</h1>
            <button onClick={goBack}>Volver al menú principal</button>
            <button onClick={goBack}>Siguente nivel</button>
          </div>
          
        
        ) : derrota ? (
          <div className="mensaje-derrota">
            <h1>TU PERDISTE</h1>
            <button onClick={goBack}>Volver al menú principal</button>
          </div>
        ) : (
          <div>
            <h2>Pantalla de combate - Dificultad {dificultad}</h2>

            {/* Contenedor de los enemigos */}
            <div className="enemigos-container">
              {vidaEnemigos.map((vida, index) => (
                <div key={index} className="enemigo" onClick={() => registrarAtaque(index)}>
                  {vida > 0 ? (
                    <img
                      src={require(`./enemigo1.gif`)}
                      alt={`Enemigo ${index + 1}`}
                      vidaEnemigos = {vidaEnemigos}
                    />
                  ) : (
                    <img src={require('./parca.png')} alt="Enemigo derrotado" />
                  )}
                </div>
              ))}
            </div>

            <div className="botones-container">

              <button onClick={() => { iniciarAtaque(); iniciarAudio(); }} disabled={!turnoJugador}>Atacar</button>
              <button onClick={curarse} disabled={!turnoJugador || curacionUsada}>Curarse +30</button>
              <button onClick={() => { goBack(); iniciarAudio(); }}>Volver al menú principal</button>
              Vida: {vidaJugador}
            </div>

            <p>{mensaje}</p>
          </div>
        )}
      </div>
    </div>
  );
}




function CombateFacil() {
  return <Combate dificultad={1} />;
}

function CombateNormal() {
  return <Combate dificultad={2} />;
}

function CombateDificil() {
  return <Combate dificultad={3} />;
}

function App() {
  return (
    <div className="bodyMenu">
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/opciones" element={<Opciones />} />
            <Route path="/previa" element={<Antesdeempezar />} />
            <Route path="/combate-facil" element={<CombateFacil />} />
            <Route path="/combate-normal" element={<CombateNormal />} />
            <Route path="/combate-dificil" element={<CombateDificil />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App; 

