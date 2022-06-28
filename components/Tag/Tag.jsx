import React from 'react';
import TagCSS from './Tag.module.css';

export default function Tag({children, ...rest})
{
    return (
        <span className={TagCSS.main}>
            {children}
        </span>
    );
};