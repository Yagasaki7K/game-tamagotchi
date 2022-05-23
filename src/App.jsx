import { useState, useEffect } from 'react'
import TamaDetails from './components/TamaDetails'

import stayalive from './assets/stayalive.gif';
import crying from './assets/crying.gif';
import dead from './assets/dead.png'

import './App.css'

function App() {

    const [lifeTama, setLifeTama] = useState(100)
    const [hungerTama, setHungerTama] = useState(100)
    const [ageTama, setAgeTama] = useState(0)

    const [isAlive, setIsAlive] = useState(true)
    const [isSleeping, setIsSleeping] = useState(false)
    const [isEating, setIsEating] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHappy, setIsHappy] = useState(true)
    const [statsTama, setStatsTama] = useState('bem!');

    const [avatar, setAvatar] = useState(stayalive);

    function TamaIsHungred() {
        if (isEating === false) {
            setHungerTama(hungerTama - 10)
            
            if (hungerTama < 50) {
                setStatsTama('com fome')
                setIsHappy(false)
                setAvatar(crying)
                setLifeTama(lifeTama - 10)
            }
        } else {
            setHungerTama(hungerTama + 10)
            setIsEating(true)
            setIsHappy(true)
            setAvatar(stayalive)
        }
    }

    function TamaIsEating() {
        setIsEating(true)
        setHungerTama(hungerTama + 40)
        setStatsTama('comendo')
        sleep(10000)
        setIsEating(false)
        setIsHappy(true)
    }

    function TamaIsBoring() {
        if (isHappy === false) {
            setStatsTama('entediado')

            setInterval(() => {
                setLifeTama(lifeTama - 10)
            }, 2000)
        }
    }

    function TamaIsPlaying() {
        setIsHappy(true)
        setStatsTama('brincando')
        setHungerTama(hungerTama - 25)
        setIsPlaying(true)
        sleep(10000)
        setIsPlaying(false)
    }

    function TamaIsDepressive() {
        setIsHappy(false)
        setStatsTama('depressivo')
        setHungerTama(hungerTama - 50)
    }

    function TamaIsSleeping() {
        setIsSleeping(true)
        setStatsTama('dormindo')
        sleep(10000)
        setIsSleeping(false)
        setStatsTama('descansado!')
        setHungerTama(hungerTama - 15)
    }

    function lifeGraduateDown() {
        setHungerTama(hungerTama - 1)

        if (lifeTama <= 75) {
            TamaIsHungred();
            isEating(false)
        }

        if (lifeTama <= 50) {
            TamaIsBoring();
        }

        if (lifeTama <= 25) {
            TamaIsDepressive();
        }

        if (lifeTama === 0) {
            setIsAlive(false)
            setAvatar(dead)
        }
    }

    function gameRunning() {
        setInterval(function() {
            lifeGraduateDown();
        }, 2000);
        setInterval(function() {
            setStatsTama('comemorando seu aniversário')
            setAgeTama(ageTama + 1)
        }, 600*1000);
    }

    gameRunning()

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
                        <button onClick={TamaIsEating}>Comer</button>
                        <button onClick={TamaIsSleeping}>Dormir</button>
                        <button onClick={TamaIsPlaying}>Jogar</button>
                    </div>
                </div>

                
                </TamaDetails>
            </header>
        </div>
    )
}

export default App
