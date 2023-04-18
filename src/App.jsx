import React, { useState, useEffect } from "react";
import styled from 'styled-components';

export default function Tamagotchi() {
    const [hunger, setHunger] = useState(50);
    const [happiness, setHappiness] = useState(50);
    const [energy, setEnergy] = useState(50);

    // Define um temporizador que decrementa os valores de fome,
    // felicidade e energia a cada 5 segundos
    useEffect(() => {
        const intervalId = setInterval(() => {
            setHunger((prevHunger) => prevHunger - 5);
            setHappiness((prevHappiness) => prevHappiness - 3);
            setEnergy((prevEnergy) => prevEnergy - 2);
        }, 5000);

        // Limpa o temporizador quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, []);

    // Verifica o estado do Tamagotchi e atualiza a animação ou som de acordo
    useEffect(() => {
        if (energy <= 0) {
            // Tamagotchi está cansado e precisa dormir
            // Exibe animação de Tamagotchi dormindo
        }
        if (happiness <= 20) {
            // Tamagotchi está triste e precisa de atenção
            // Toca som de felicidade
        }
        if (hunger >= 80) {
            // Tamagotchi está com fome e precisa comer
            // Exibe animação de Tamagotchi comendo
        }
    }, [energy, happiness, hunger]);

    // Funções para interagir com o Tamagotchi
    function feed() {
        setHunger((prevHunger) => prevHunger + 10);
    }

    function play() {
        setHappiness((prevHappiness) => prevHappiness + 5);
        setEnergy((prevEnergy) => prevEnergy - 5);
    }

    function sleep() {
        setEnergy((prevEnergy) => prevEnergy + 20);
    }

    return (
        <div>
            <p>Hunger: {hunger}</p>
            <p>Happiness: {happiness}</p>
            <p>Energy: {energy}</p>
            <FeedButton onClick={feed}>Feed</FeedButton>
            <PlayButton onClick={play}>Play</PlayButton>
            <SleepButton onClick={sleep}>Sleep</SleepButton>
        </div>
    );
}

const FeedButton = styled.button`
  background-color: #8BC34A;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 16px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  width: 100px;
  
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const PlayButton = styled.button`
  background-color: #2196F3;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 16px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  width: 100px;
  
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const SleepButton = styled.button`
  background-color: #9E9E9E;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 16px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  width: 100px;
  
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
