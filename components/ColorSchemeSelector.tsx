import styles from '@styles/ColorSchemeSelector.module.css';
import Dark from '@components/SVGIcons/dark.svg';
import Light from '@components/SVGIcons/light.svg';
import Contrast from '@components/SVGIcons/contrast.svg';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

export default function ColorSchemeSelector()
{
    const modeNames = useMemo(() => ["dark", "light", "os"] as const, []);
    type mode = typeof modeNames[number];
    const [colorScheme, setColorScheme] = useState<mode>("dark");
    const ref_dialog = useRef(null);

    // dialog button function
    const changeOpenState = useCallback(() =>
    {
        const dialog: any = ref_dialog.current;
        dialog.showModal();
    }, [ref_dialog]);

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
        const listener = (evt: any) =>
        {
            if((localStorage.getItem("colorScheme") ?? "dark") === "os")
            {
                toggleLightMode(evt.matches ? "light" : "dark");
            }
        };
  
        useLight!.addEventListener("change", listener);
    }, [useLight, toggleLightMode]);
    
    const Icons =
    {
        dark: <Dark/>,
        light: <Light/>,
        os: <Contrast/>,
    };

    return (
        <>
            <button type='button' onClick={changeOpenState} className={styles.button} aria-label="Color Scheme">{Icons[`${colorScheme}`]}</button>
            <dialog ref={ref_dialog} className={styles.dialog}>
                <ul className={styles.selection}>
                    <li><button type='button' disabled={colorScheme === "dark"} onClick={() => changePreference("dark")} ><Dark/> Dark</button></li>
                    <li><button type='button' disabled={colorScheme === "light"} onClick={() => changePreference("light")} ><Light />Light</button></li>
                    <li><button type='button' disabled={colorScheme === "os"} onClick={() => changePreference("os")}><Contrast /> OS Default</button></li>
                </ul>
            </dialog>
        </>
    );
};