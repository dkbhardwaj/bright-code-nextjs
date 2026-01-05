import Image from "next/image";
import styles from "../styles/contactSection.module.scss";

interface Intro {
    darkThemePettern: string;
    lightThemePettern: string;
    title: string;
    blurb: string;
    ctaTxt: string;
}

interface Card {
    icon: string;
    alt: string;
    title: string;
    blurb: string;
}

interface Props {
    data: {
        introWithPettern: Intro;
        cards: Card[];
    };
    theme?: "light" | "dark";
    rightSlot?: React.ReactNode; // form / calendly
}

const ContactSection: React.FC<Props> = ({
    data,
    theme = "light",
    rightSlot,
}) => {
    const { introWithPettern, cards } = data;
    const pattern =
        theme === "dark"
            ? introWithPettern.darkThemePettern
            : introWithPettern.lightThemePettern;

    return (
        <section className={`${styles.contactSection} ${styles[theme]}`}>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.left}>
                        <div className="imgWrap w-[166px] h-[5.6px] ">
                          <Image className="w-auto" src={pattern} alt="pattern"  width={100} height={100} />
                        </div>
                        <h2 className="mt-[20px]">{introWithPettern.title}</h2>
                        <p className="mb-[20px]">{introWithPettern.blurb}</p>

                        <button className={`${styles.cta}`}>
                            {introWithPettern.ctaTxt}
                        </button>
                    </div>

                    <div className={styles.right}>
                        {rightSlot}
                    </div>
                </div>

                <div className={styles.cards}>
                    {cards.map((card, idx) => (
                        <div key={idx} className={styles.card}>
                            <Image src={card.icon} alt={card.alt} width={24} height={24} />
                            <h4 className="mt-[10px]">{card.title}</h4>
                            <p>{card.blurb}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
