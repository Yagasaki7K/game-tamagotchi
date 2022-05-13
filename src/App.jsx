import {useState} from 'react'
import TamaDetails from './components/TamaDetails'

import stayalive from './assets/stayalive.gif';
import crying from './assets/crying.gif';
import dead from './assets/dead.png'

import './App.css'

function App() {

    const [lifeTama, setLifeTama] = useState(0)
    const [hungerTama, setHungerTama] = useState(100)
    const [sleepTama, setSleepTama] = useState(false)
    const [ageTama, setAgeTama] = useState(0)

    const [isAlive, setIsAlive] = useState(true)
    const [isSleeping, setIsSleeping] = useState(false)
    const [isEating, setIsEating] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHappy, setIsHappy] = useState(true)
    const [statsTama, setStatsTama] = useState('bem!');

    const [avatar, setAvatar] = useState(stayalive);
    

    if (isAlive != true) {
        setAvatar(crying);
    }

    if (lifeTama <= 0) {
        setIsAlive(false);
    }

    // Condition of Hunger
    if (hungerTama > 1 && hungerTama < 35 ) {
        if (isEating === false) {
            setTimeout(function(){
                setAvatar(crying);
                setStatsTama('com fome!')
                setLifeTama(lifeTama - 10)
        }, 2000);
        }   
    }

    if (hungerTama > 50) {
        setTimeout(function(){
        setAvatar(stayalive);
        setStatsTama('bem!')
        }, 1000);
    }

    if (hungerTama > 1) {
        if (isEating === false) {
            setTimeout(function(){
                setHungerTama(hungerTama - 1)
        }, 5000);
        }
    }

    function eatingTamagotchi() {
        setHungerTama(hungerTama + 25)
        setIsEating(true)

        if (hungerTama === 100) {
            setIsEating(false)
        }
        
        setTimeout(function(){
            setIsEating(false)
        }, 10000)
    }

    // Condition of Life
    
    if (lifeTama === 0) {
        console.log('Dead')
    }

    if (lifeTama === 40) {
        setIsHappy(false);
    }
    
    return (
        <div className="App">
            <header className="App-header">
                <TamaDetails>
                <img src={avatar} className="App-logo" alt="logo" />

                <div className="console">
                    <p>Seu Tamagotchi está {statsTama}</p>
                </div>
                
                <div className="stats">
                    <div className="life">
                        <p>Vida: {lifeTama}%</p>
                        <p>Fome: {hungerTama}%</p>
                        <p>Idade: {ageTama} anos</p>
                    </div>
                    <div className="buttons">
                        <button onClick={eatingTamagotchi}>Comer</button>
                        <button>Dormir</button>
                        <button>Jogar</button>
                        <button>Limpar</button>
                    </div>
                </div>

                
                </TamaDetails>
            </header>
        </div>
    )
}

export default App
