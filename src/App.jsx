import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { toast } from 'sonner';

export default function Tamagotchi() {
    const [hunger, setHunger] = useState(() => parseInt(localStorage.getItem('hunger')) || 50);
    const [happiness, setHappiness] = useState(() => parseInt(localStorage.getItem('happiness')) || 50);
    const [energy, setEnergy] = useState(() => parseInt(localStorage.getItem('energy')) || 50);
    const [study, setStudy] = useState(() => parseInt(localStorage.getItem('study')) || 20);
    const [noteStudy, setNoteStudy] = useState('F');
    const [noteColor, setNoteColor] = useState('#e10065');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setHunger((prevHunger) => Math.max(prevHunger - 5, 0));
            setHappiness((prevHappiness) => Math.max(prevHappiness - 3, 0));
            setEnergy((prevEnergy) => Math.max(prevEnergy - 2, 0));
            setStudy((prevStudy) => Math.max(prevStudy - 1, 0));
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        localStorage.setItem('hunger', hunger);
        localStorage.setItem('happiness', happiness);
        localStorage.setItem('energy', energy);
        localStorage.setItem('study', study)
    }, [hunger, happiness, energy]);

    useEffect(() => {
        if (energy <= 0 && happiness <= 20 && hunger <= 20) {
            toast.error('Seu tamagotchi morreu!');
        }

        if (energy <= 0) {
            toast.warning('Tamagotchi está cansado e precisa dormir!');
        }

        if (happiness <= 20) {
            toast.warning('Tamagotchi está triste e precisa de atenção!');
        }

        if (hunger <= 20) {
            toast.warning('Tamagotchi está com fome e precisa de comida!');
        }

        if (hunger === 70) {
            toast.warning('Tamagotchi está satisfeito, ele pode passar mal');
        }

        if (hunger >= 90) {
            toast.error('Tamagotchi passou mal!');
            setHappiness((prevHappiness) => Math.max(prevHappiness - 30, 0));
            setHunger((prevHunger) => Math.max(prevHunger - 30, 0));
            setStudy((prevStudy) => Math.max(prevStudy - 10, 0));
            setEnergy((prevEnergy) => Math.max(prevEnergy - 20, 0));
        }

        switch (true) {
            case (study >= 95):
                setNoteStudy("A+");
                setNoteColor("#8BC34A");
                break;
            case (study >= 90):
                setNoteStudy("A")
                setNoteColor("#8BC34A");
                break;
            case (study >= 85):
                setNoteStudy("B+");
                setNoteColor("#8BC34A");
                break;
            case (study >= 80):
                setNoteStudy("B")
                setNoteColor("#8BC34A");
                break;
            case (study >= 75):
                setNoteStudy("C+");
                setNoteColor("#777774");
                break;
            case (study >= 70):
                setNoteStudy("C")
                setNoteColor("#777774");
                break;
            case (study >= 65):
                setNoteStudy("D+");
                setNoteColor("#777774");
                break;
            case (study >= 50):
                setNoteStudy("D")
                setNoteColor("#777774");
                break;
            case (study >= 45):
                setNoteStudy("E+");
                setNoteColor("#777774");
                break;
            case (study >= 40):
                setNoteStudy("E")
                setNoteColor("#e10065");
                break;
            case (study >= 35):
                setNoteStudy("F+");
                setNoteColor("#e10065");
                break;
            default:
                setNoteStudy("F")
                setNoteColor("#e10065");
                break;
        }


    }, [energy, happiness, hunger]);

    function feed() {
        setHunger((prevHunger) => Math.min(prevHunger + 10, 100));
        toast.success('Alimentado!');
    }

    function play() {
        setHappiness((prevHappiness) => Math.min(prevHappiness + 5, 100));
        setEnergy((prevEnergy) => Math.max(prevEnergy - 5, 0));
        toast.success('Ele se divertiu!');
    }

    function sleep() {
        setEnergy((prevEnergy) => Math.min(prevEnergy + 20, 100));
        toast.success('Dormindo ...!');
    }

    function studying() {
        setStudy((prevStudy) => Math.min(prevStudy + 10, 100));
        toast.success('Estudando ...!');
    }

    return (
        <Container>
            <h1>Tamagotchi</h1>
            <img src="0.gif" />

            <div className="flex">
                <p>Estudo: <StudyState color={noteColor}>{noteStudy}</StudyState></p>
                {/* <p>Idade: {age}</p>
                <p>Sexo: {gender}</p> */}
            </div>
            <div className="flex">
                <p>Fome: {hunger}</p>
                <p>Felicidade: {happiness}</p>
                <p>Energia: {energy}</p>
                <p>Estudo: {study}</p>
            </div>

            <div className="flex">
                <FeedButton onClick={feed}>Alimentar</FeedButton>
                <PlayButton onClick={play}>Brincar</PlayButton>
                <StudyButton onClick={studying}>Estudar</StudyButton>
                <SleepButton onClick={sleep}>Dormir</SleepButton>
            </div>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;

    .flex {
        display: flex;

        p {
            margin: 0 10px;
        }
    }   
`;

const Button = styled.button`
    background: #8BC34A;
    border: none;
    border-radius: 5px;
    color: #FFFFFF;
    font-size: 16px;
    margin: 10px;
    padding: 10px;
    text-align: center;
    width: 100px;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
    `;

const FeedButton = styled(Button)`
        background: #8BC34A;
    `;

const PlayButton = styled(Button)`
        background: #2196F3;
    `;

const SleepButton = styled(Button)`
        background: #9E9E9E;
    `;

const StudyButton = styled(Button)`
        background: #FF9800;
`;

const StudyState = styled.span`
    font-weight: bold;
    color: ${props => props.color}
`