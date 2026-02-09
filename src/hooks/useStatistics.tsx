/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from "react";

export function useStatistics() {
    const [mistakes, setMistakes] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [accuracy, setAccuracy] = useState<number>(100);
    const [totalAttempts, setTotalAttempts] = useState<number>(0);

    const intervalRef = useRef<any | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const handleMistake = useCallback((): void => {
        setMistakes(prev => prev + 1);
    }, []);

    const handleCorrect = useCallback((): void => {
        setTotalAttempts(prev => prev + 1);
    }, []);

    const startTimer = useCallback((): void => {
        if (!isActive) {
            setIsActive(true);
            startTimeRef.current = Date.now() - time * 1000;

            intervalRef.current = setInterval(() => {
                setTime(Math.floor((Date.now() - (startTimeRef.current || 0)) / 1000));
            }, 1000);
        }
    }, [isActive, time]);

    const pauseTimer = useCallback((): void => {
        if (isActive) {
            setIsActive(false);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [isActive]);

    const resetTimer = useCallback((): void => {
        setIsActive(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setTime(0);
    }, []);

    const resetStatistics = useCallback((): void => {
        setMistakes(0);
        setTime(0);
        setAccuracy(100);
        setTotalAttempts(0);
        setIsActive(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);

    useEffect(() => {
        if (totalAttempts + mistakes > 0) {
            const newAccuracy = (totalAttempts / (totalAttempts + mistakes)) * 100;
            setAccuracy(parseFloat(newAccuracy.toFixed(2)));
        }
    }, [totalAttempts, mistakes]);

    const calculateSpeed = useCallback((totalItems: number): number => {
        if (time === 0) return 0;
        return Math.floor((totalItems / time) * 60);
    }, [time]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return {
        mistakes,
        time,
        accuracy,
        totalAttempts,
        isActive,
        handleMistake,
        handleCorrect,
        startTimer,
        pauseTimer,
        resetTimer,
        resetStatistics,
        calculateSpeed,
        getStatistics: () => ({
            mistakes,
            time,
            accuracy: `${accuracy}%`,
            totalAttempts: totalAttempts + mistakes,
            correctAttempts: totalAttempts,
        })
    };
}