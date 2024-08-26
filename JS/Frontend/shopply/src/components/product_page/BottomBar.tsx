import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {MdOutlineBorderColor} from 'react-icons/md'
import {motion} from 'framer-motion'

function BottomBar() {

    return ( 
                <Box
                as={motion.div}
                position="sticky"
                bottom="0vh"
                width="100%"
                initial={{
                    height: 0,
                }}
                animate={{
                    height: "auto",
                }}
                exit={{
                    height: 0,
                }}
                overflow="hidden"
                >
                    <ButtonGroup
                    as={Flex}
                    width="100%"
                    height="100%"
                    borderTop="1px solid grey"
                    justifyContent="flex-end"
                    p={0}
                    spacing={0}
                    >
                        <Button
                        leftIcon={<AiOutlineShoppingCart/>}
                        borderRadius="0rem"
                        flexGrow={2}
                        >
                            Add to Cart
                        </Button>
                        <Button
                        colorScheme="cyan"
                        leftIcon={<MdOutlineBorderColor/>}
                        borderRadius="0rem"
        
                        >
                            Buy Now
                        </Button>
                    </ButtonGroup>
                </Box>
    );
}

export default BottomBar;