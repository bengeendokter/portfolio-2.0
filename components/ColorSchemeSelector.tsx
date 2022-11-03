import styles from "@styles/ColorSchemeSelector.module.css";
import Dark from "@components/SVGIcons/dark.svg";
import Light from "@components/SVGIcons/light.svg";
import Contrast from "@components/SVGIcons/contrast.svg";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

export default function ColorSchemeSelector({ homeData }: { homeData: { dark: string, light: string, os_default: string } })
{
  const modeNames = useMemo(() => ["dark", "light", "os"] as const, []);
  type mode = typeof modeNames[number];
  const [colorScheme, setColorScheme] = useState<mode>("dark");
  const [isOpen, setOpen] = useState(false);
  const ref_dialog: any = useRef(null);
  const ref_button: any = useRef(null);

  // Dialog functions
  const toggleDialog = useCallback(() =>
  {
    setOpen(!isOpen);
  }, [setOpen, isOpen]);

  const closeDialog = useCallback(() =>
  {
    setOpen(false);
  }, [setOpen]);

  const handleEsc = useCallback((event) =>
  {
    if(event.key === "Escape")
    {
      closeDialog();
    }
  }, [closeDialog]);

  useEffect(() =>
  {
    if(typeof window !== "undefined")
    {
      window.addEventListener("keydown", handleEsc);
    }

    function handleClickOutside(event: any)
    {
      if(!ref_dialog.current.contains(event.target) && !ref_button.current.contains(event.target))
      {
        closeDialog();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
    {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  // MediaQueryList object
  const useLight = useMemo(() =>
  {
    if(typeof window !== "undefined")
    {
      return window.matchMedia("(prefers-color-scheme: light)");
    }
  }, []);

  // Toggles the "light_mode" class
  const toggleLightMode = useCallback((state: "dark" | "light") =>
  {
    if(typeof window !== "undefined")
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
    dark: <Dark />,
    light: <Light />,
    os: <Contrast />,
  };

  return (
    <>
      <button ref={ref_button} type='button' onClick={() => toggleDialog()} className={styles.button} aria-label="Color Scheme">{Icons[`${colorScheme}`]}</button>
      <dialog ref={ref_dialog} open={isOpen} className={styles.dialog}>
        <ul className={styles.selection}>
          <li><button type='button' disabled={colorScheme === "dark"} onClick={() => changePreference("dark")} ><Dark /> {homeData.dark}</button></li>
          <li><button type='button' disabled={colorScheme === "light"} onClick={() => changePreference("light")} ><Light /> {homeData.light}</button></li>
          <li><button type='button' disabled={colorScheme === "os"} onClick={() => changePreference("os")}><Contrast /> {homeData.os_default}</button></li>
        </ul>
      </dialog>
    </>
  );
};
