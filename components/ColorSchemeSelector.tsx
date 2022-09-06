import styles from '@styles/ColorSchemeSelector.module.css';
import Dark from '@components/SVGIcons/dark.svg';
import Light from '@components/SVGIcons/light.svg';
import Contrast from '@components/SVGIcons/contrast.svg';
import { useState, useEffect, useCallback, useMemo } from 'react';

export default function ColorSchemeSelector()
{
    const modeNames = useMemo(() => ["dark", "light", "os"] as const, []);
    type mode = typeof modeNames[number];
    const [colorScheme, setColorScheme] = useState<mode>("dark");

    // MediaQueryList object
    const useLight = useMemo(() =>
    {
        if(typeof window !== 'undefined')
        {
            return window.matchMedia("(prefers-color-scheme: light)");
        }
    }, []);

    // Toggles the "light_mode" class
    const toggleLightMode = useCallback((state: "dark" | "light") =>
    {
        if(typeof window !== 'undefined')
        {
            document.documentElement.classList.toggle("light_mode", state === "light");
        }
    }, []);

    // Sets localStorage state
    const setColorSchemeLocalStorage = useCallback((state: mode) =>
    {
        localStorage.setItem("colorScheme", state);
    }, []);

    // get "dark" or "light" from os 
    const getOSPreference = useCallback(() =>
    {
        return useLight!.matches ? "light" : "dark";
    }, [useLight]);

    // Toggles the "light_mode" class on click and sets localStorage state
    const changePreference = useCallback((preference: mode) =>
    {
        let newMode: "dark" | "light";
        if(preference === "os")
        {
            newMode = getOSPreference();
        }
        else
        {
            newMode = preference;
        }

        toggleLightMode(newMode);
        setColorSchemeLocalStorage(preference);
        setColorScheme(preference);
    }, [toggleLightMode, setColorSchemeLocalStorage, getOSPreference]);

    // Initial setting
    useEffect(() =>
    {
        let storageValue: any = localStorage.getItem("colorScheme") ?? "dark";
        if(!modeNames.includes(storageValue))
        {
            storageValue = "dark";
        }

        setColorScheme(storageValue);

        if(storageValue === "os")
        {
            storageValue = getOSPreference();
        }

        toggleLightMode(storageValue);

    }, [modeNames, getOSPreference, toggleLightMode, setColorScheme]);

    // Listen for changes in the OS settings.
    useEffect(() =>
    {
        // TODO remove previous event listeners?

        useLight!.addEventListener("change", (evt) =>
        {
            if(colorScheme === "os")
            {
                toggleLightMode(evt.matches ? "light" : "dark");
            }
        });
    }, [useLight, colorScheme, toggleLightMode]);

    return (
        <>
            <button className={styles.button} aria-label="Color Scheme"><Contrast /></button>
            <dialog open className={styles.dialog}>
                <ul className={styles.selection}>
                    <li><button onClick={() => changePreference("dark")} ><Dark />Dark</button></li>
                    <li><button onClick={() => changePreference("light")} ><Light />Light</button></li>
                    <li className={styles.active} onClick={() => changePreference("os")} ><button><Contrast /> OS Default</button></li>
                </ul>
            </dialog>
        </>
    );
};