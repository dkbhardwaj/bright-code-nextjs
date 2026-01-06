import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import styles from "../styles/calendlyCalendar.module.scss";

interface Props {
    theme?: "light" | "dark";
}

const CalendlyCalendar: React.FC<Props> = ({ theme = "light" }) => {
    return (
        <div className={`${styles[theme]} ${styles.calandarWrap}`}>
            <div className={styles.header}>
                <div className={styles.avatar} />
                <div>
                    <h4>Meet with Stefan Jordan</h4>
                    <p>CEO, Bright Code</p>
                </div>
            </div>
            <div className={`${styles.wrapper} `}>


                <DayPicker
                    mode="single"
                    showOutsideDays
                    className={styles.calendar}
                />
            </div>
        </div>
    );
};

export default CalendlyCalendar;
