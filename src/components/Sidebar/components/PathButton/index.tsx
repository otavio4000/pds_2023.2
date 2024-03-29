import { Button } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
const PathButton = (props: {
    pathName: string,
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    selected: boolean,
    linkTo: string
}) => {
    
    const { pathName, selected, icon: Icon, linkTo } = props; 

    return (
        <Link to={linkTo} className={styles.button_container}>
            <Button 
            className={styles.button}
            leftIcon={<Icon width="30" style={
                { fill: selected ? "white" : ""}
            }/>} 
            bg={"purple.50"}
            color={"white"}
            _hover={{bgColor: "purple.100"}} 
            _active={{bgColor: "purple.200"}}
            style={{
                fontWeight: selected ? 800 : "inherit",
                justifyContent: "flex-start",
                padding: "7px 16px",
                borderRadius: "0"
            }}
            >
                { pathName }
            </Button>
        </Link>
    )

}

export default PathButton;