import { Button, Link, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
// the props is
// icon, name, link

export const NavMenuItem = (props) => {
    return (
        <Link href={props.link}>
            <Button
                as={motion.div}
                whileHover={{ scale: 1.2 }}
                _hover={{
                    textColor: "white",
                    bgColor: "blackAlpha.500",
                    boxShadow: "0 5px 3px 0 rgba(0,0,0,0.3)",
                }}
                transition={"all 0.3s ease-in-out"}
                textColor={"black"}
                bgColor={"white"}
                variant={"solid"}
                leftIcon={props.icon}
                fontSize={20}
            >
                {props.name}
            </Button>
        </Link>
    );
};

export const NavInvisibleMenuItem = (props) => {
    return (
        <Link href={props.link}>
            <Button
                size={{ base: "md", sm: "lg" }}
                as={motion.div}
                whileHover={{ scale: 1.2 }}
                leftIcon={props.icon}
                variant={"ghost"}
                color="white"
                _hover={{ bgColor: "none" }}
                _active={{ bgColor: "none" }}
            >
                {props.name}
            </Button>
        </Link>
    );
};
