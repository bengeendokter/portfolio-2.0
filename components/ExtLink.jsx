import React from 'react';

export default function ExtLink({children, href="test", target="_blank", ...rest})
{
    return (
        <a href={href} target={target} rel="noopener noreferrer" {...rest}>
            {children}
        </a>
    );
};