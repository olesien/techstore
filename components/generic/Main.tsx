import Nav from "../nav/Nav";
import styles from "../../styles/Main.module.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {
    faBox,
    faChessBoard,
    faFan,
    faFloppyDisk,
    faGaugeHigh,
    faMemory,
    faMicrochip,
    faMusic,
    faPalette,
    faPlug,
} from "@fortawesome/free-solid-svg-icons";
import useComputerBuilder from "../../hooks/useComputerBuilder";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import AdvancedNav from "../nav/AdvancedNav";

export const maxQuantity: { [key: string]: number } = {
    "1": 1,
    "2": 1,
    "3": 3,
    "4": 3,
    "5": 2,
    "6": 1,
    "7": 1,
    "8": 1,
    "9": 1,
    "10": 10,
};

export const requiredCategories = [1, 2, 4, 5, 6, 7, 9];

export default function Main({
    showNav,
    noNav = false,
    children,
}: {
    showNav: boolean;
    noNav?: boolean;
    children: JSX.Element;
}) {
    const { width } = useWindowDimensions();

    const showChildren = !showNav || Number(width) > 768;

    const links = [
        {
            title: "Datorchassi",
            link: "/category/1",
            icon: faBox,
            required: true,
            categoryId: 1,
        },
        {
            title: "Grafikkort",
            link: "/category/2",
            icon: faPalette,
            required: true,
            categoryId: 2,
        },
        {
            title: "Hårddisk Mekanisk",
            link: "/category/3",
            icon: faFloppyDisk,
            required: false,
            categoryId: 3,
        },
        {
            title: "Hårddisk SSD",
            link: "/category/4",
            icon: faGaugeHigh,
            required: true,
            categoryId: 4,
        },
        {
            title: "Internminne/RAM",
            link: "/category/5",
            icon: faMemory,
            required: true,
            categoryId: 5,
        },
        {
            title: "Processor/CPU",
            link: "/category/6",
            icon: faMicrochip,
            required: true,
            categoryId: 6,
        },
        {
            title: "Moderkort",
            link: "/category/7",
            icon: faChessBoard,
            required: true,
            categoryId: 7,
        },
        {
            title: "Ljudkort",
            link: "/category/8",
            icon: faMusic,
            required: false,
            categoryId: 8,
        },
        {
            title: "Nätaggregat",
            link: "/category/9",
            icon: faPlug,
            required: true,
            categoryId: 9,
        },
        {
            title: "Kylning/Moddning",
            link: "/category/10",
            icon: faFan,
            required: false,
            categoryId: 10,
        },
    ];

    const { isActive, setIsActive } = useComputerBuilder();
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        if (newAlignment === "datorbyggare") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };

    return (
        <div className={styles.main}>
            {!noNav && (
                <span id={showNav ? "" : "hide-nav"}>
                    <ToggleButtonGroup
                        color="primary"
                        value={isActive ? "datorbyggare" : "standard"}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        size="small"
                    >
                        <ToggleButton value="standard">Standard</ToggleButton>
                        <ToggleButton value="datorbyggare">
                            Datorbyggare
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {isActive ? (
                        <AdvancedNav links={links} />
                    ) : (
                        <Nav links={links} />
                    )}
                </span>
            )}

            {showChildren || noNav ? <div>{children}</div> : <div />}
        </div>
    );
}
