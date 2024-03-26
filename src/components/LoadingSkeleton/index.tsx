import { 
    Stack,
    Skeleton
} from "@chakra-ui/react";
import { CSSProperties } from "react";

const LoadingSkeleton = (props: {
    justifyContent: "center" | "flex-start" | "flex-end",
    height?: number,
    width?: number
}) => {

    const { justifyContent, height, width } = props; 

    let biggerBoxHeight = 300;
    let smallerBoxHeight = 50;

    if (height) {
        biggerBoxHeight = height * 0.86; 
        smallerBoxHeight = height * 0.14;
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: justifyContent,
            paddingTop: "20px"
        }}>
            <Stack w={width || "800px"}>
                <Skeleton height={`${smallerBoxHeight}px`} />
                <Skeleton height={`${biggerBoxHeight}px`} />
            </Stack>

        </div>
    )
}

export default LoadingSkeleton;