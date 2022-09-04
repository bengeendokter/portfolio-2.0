import React from 'react';
import ExtBtn from '@components/ExtBtn';
import GooglePlaySVG from '@components/SVGIcons/google-play.svg';

export default function GooglePlayBtn({href}:{href : string})
{
    return (
        <>
        <ExtBtn icon={<GooglePlaySVG/>} label={"Get it on Google Play"} color={'var(--clr-googleplay)'} href={href}></ExtBtn>
        </>
    );
};