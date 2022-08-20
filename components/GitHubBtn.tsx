import React from 'react';
import ExtBtn from '@components/ExtBtn';
import GitHubSVG from '@components/SVGIcons/github.svg';

export default function GitHubBtn({href}:{href : string})
{
    return (
        <>
        <ExtBtn icon={<GitHubSVG/>} label={"View code on GitHub"} color={'hsla(215, 21%, 33%)'} href={href}></ExtBtn>
        </>
    );
};