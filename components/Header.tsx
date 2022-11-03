import ColorSchemeSelector from "@components/ColorSchemeSelector";
import styles from "@styles/Header.module.css";
import Link from "next/link";

export default function Header({ homeData }: { homeData: { skip_nav: string, projects_heading: string, cv_heading: string, dark: string, light: string, os_default: string } })
{
  return (
    <>
      <a className={styles.skip_nav} href="#main-content">{homeData.skip_nav}</a>
      <nav className={styles.main_nav}>
        <ul>
          <li><Link href="/#projecten"><a>{homeData.projects_heading}</a></Link></li>
          <li><Link href="/#CV"><a>{homeData.cv_heading}</a></Link></li>
        </ul>
      </nav>
      <ColorSchemeSelector homeData={homeData}/>
    </>
  );
};
