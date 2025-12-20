import Image from "next/image";
import Link from "next/link";
import SocialBlock from "./SocialBlock";

const SubMenu = ({ data, active }: any) => {
  if (!data) return null;

  return (
    <div className={`subMenu ${data.type} ${active ? "active" : ""}`}>

      {/* GRID MENU */}
      {data.type === "grid" && (
        <div className="gridMenu">
          <ul>
            {data.items.map((item: any) => (
              <li key={item.path}>
                <Link href={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
          {data.social && <SocialBlock />}
        </div>
      )}

      {/* MEGA MENU */}
      {data.type === "mega" && (
        <div className="megaMenu">
          {data.columns.map((col: any, i: number) => (
            <div className="menuCol" key={i}>
              <h6>{col.title}</h6>
              <ul>
                {col.items.map((item: any) => (
                  <li key={item.path}>
                    <Link href={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {data.social && <SocialBlock />}
        </div>
      )}

      {/* LOGO MENU */}
      {data.type === "logos" && (
        <div className="logoMenu">
          {data.logos.map((logo: any) => (
            <Link href={logo.path} key={logo.src}>
              <Image src={logo.src} alt={logo.alt} width={90} height={40} />
            </Link>
          ))}
          {data.social && <SocialBlock />}
        </div>
      )}
    </div>
  );
};

export default SubMenu;
