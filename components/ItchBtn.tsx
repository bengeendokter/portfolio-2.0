import React from 'react';
import ExtBtn from '@components/ExtBtn';
import ItchSVG from '@components/SVGIcons/itchio.svg';

export default function ItchBtn({href}:{href : string})
{
    return (
        <>
        <ExtBtn icon={<ItchSVG/>} label={"Play on itch.io"} color={'hsla(0, 94%, 67%)'} href={href}></ExtBtn>
        </>
    );
};