import ExtLink from "@components/ExtLink";
import styles from "@styles/ExtBtn.module.css";

interface IExtBtn {icon : any, label : string, color : string, href : string};

export default function ExtBtn({ icon = "", label = "Open link", color = "var(--clr-github)", href } : IExtBtn)
{
    return (
        <>
        <ExtLink className={styles.ext_btn} style={{ "--clr-btn": color }} href={href}>{icon}{label}</ExtLink>
        </>
    );
};
