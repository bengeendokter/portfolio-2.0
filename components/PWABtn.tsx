import React from 'react';
import ExtBtn from '@components/ExtBtn';
import PWASVG from '@components/SVGIcons/pwa.svg';

export default function PWABtn({href}:{href : string})
{
    return (
        <>
        <ExtBtn icon={<PWASVG/>} label={"Open PWA"} color={'hsla(278, 35%, 47%)'} href={href}></ExtBtn>
        </>
    );
};