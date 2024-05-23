import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import single_bell from "../../assets/single_bell.mp3";
import double_bell from "../../assets/double_bell.mp3";
import skip from "../../assets/skip.mp3";

const Timer = ({ tasks, resetDisplay }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [audio, setAudio] = useState(null);
  const intervalRef = useRef();
  const tasksSize = tasks.length;

  useEffect(() => {
    if (currentTaskIndex >= 0 && currentTaskIndex < tasksSize) {
      setTime(tasks[currentTaskIndex].time * 60);
    }
  }, [currentTaskIndex, tasks]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const playAudio = (audioFile) => {
    const newAudio = new Audio(audioFile);
    newAudio.play();
    setAudio(newAudio);

    newAudio.addEventListener("ended", () => {
      setAudio(null);
    });
  };

  const deleteTask = async () => {
    const taskToDeleteId = tasks[currentTaskIndex]._id;
    try {
      await axios.delete(
        `${window.location.origin}/api/v2/deleteTask/${taskToDeleteId}`,
        {
          data: { id: sessionStorage.getItem("id") },
        },
      );
    } catch (error) {}
  };

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          handleTaskCompletion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const skipTask = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    deleteTask();
    playAudio(skip);
    setCurrentTaskIndex((prevIndex) => prevIndex + 1);
    if (currentTaskIndex === tasksSize - 1) {
      setCurrentTaskIndex(0);
      playAudio(double_bell);
      resetDisplay();
    } else {
      resetTimer();
    }
  };

  const handleTaskCompletion = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    deleteTask();
    playAudio(single_bell);
    if (currentTaskIndex === tasksSize - 1) {
      playAudio(double_bell);
      resetDisplay();
    } else {
      setCurrentTaskIndex((prevIndex) => prevIndex + 1);
      resetTimer();
    }
  };

  const resetTimer = () => {
    setTime(tasks[currentTaskIndex].time * 60);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  if (!tasks[currentTaskIndex]) return null;

  return (
    <div className="timer-container">
      <>
        <h1>{tasks[currentTaskIndex].type}</h1>
        <div className="circular-progress-bar-container">
          <CircularProgressbar
            value={(time / (tasks[currentTaskIndex].time * 60)) * 100}
            text={formatTime(time)}
            styles={{
              path: {
                stroke:
                  tasks[currentTaskIndex].type === "Break"
                    ? "rgb(255, 255, 0)"
                    : "rgba(240, 0, 0, 0.87)",
                strokeLinecap: "round",
              },
              trail: {
                stroke: "#f2f2f2",
              },
              text: {
                dominantBaseline: "middle",
                fill: "#000",
              },
            }}
          />
        </div>
        <div className="timer-controls">
          <button onClick={isRunning ? pauseTimer : startTimer}>
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={skipTask}>
            <FaStepForward />
          </button>
        </div>
      </>
    </div>
  );
};

export default Timer;
