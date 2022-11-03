import React from "react";
import styles from "@styles/Tag.module.css";

export default function Tag({ children, ...rest } : any)
{
    return (
        <span className={styles.main}>
            {children}
        </span>
    );
};
