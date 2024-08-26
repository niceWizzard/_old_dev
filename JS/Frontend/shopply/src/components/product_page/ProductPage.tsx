import { Box, Flex, Text, Image, Avatar, Icon, Table, Th, Tr, Td, Tbody, Collapse, Button, Heading, extendTheme } from "@chakra-ui/react";
import Header from "../shared/header/header";
import StarRating from "./StarRating";
import {IoEnter} from 'react-icons/io5'
import { Link } from "react-router-dom";
import BottomBar from "./BottomBar";
import useScroll from "../../utils/use_scroll";
import { useCallback, useEffect, useState } from "react";
import styles from './ProductPage.module.css'



function ProductPage() {
    const [shouldShowDetails, setShowDetails] = useState(false);

    return (  
        <>
            <Header/>
            <Flex
            as={'main'}
            direction="column"
            className={styles.css}
            >
                <Box
                position="relative"
                >
                    <Box
                        height="100%"
                        width="100%"
                        position="absolute"
                        />
                    <Image
                    src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i8yWk3WLdFLg/v1/1200x-1.jpg"
                    objectFit="contain"
                    />
                        
                </Box>
                <Flex
                direction="column"
                gap="0.15rem"
                >
                    <Flex direction="column" className={styles.niced}>
                        <Text
                        fontSize="xl"
                        className="p1"
                        >
                            $12 Mansion for sale!
                        </Text> 
                        <Text
                        marginTop="1rem"
                        fontSize="xl"
                        fontWeight="500"
                        color="cyan.500"
                        className="p1"
                        >
                            $12
                        </Text>
                        <Flex
                        className="p1"
                        gap="0.5rem"
                        fontSize="lg"
                        paddingBottom="0.5rem"
                        >
                            <Flex
                            alignItems="center"
                            gap="0.25rem"
                            >
                                <StarRating
                                maxRating={5} rating={4.9}
                                />
                                <Text>
                                    4
                                </Text>
                            </Flex>
                            |
                            <Text>
                                20.1k sold
                            </Text>
                        </Flex>

                    </Flex>
                    <Box
                    className={styles.niced}
                    paddingInline="0.5rem"
                    >
                        <Flex
                        as={Link}
                        to="/"
                        paddingTop="1rem"
                        paddingBottom="1rem"
                        gap="0.5rem"
                        alignItems="center"
                        >
                            <Avatar
                            size="md"
                            src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i8yWk3WLdFLg/v1/1200x-1.jpg"
                            />
                            <Box>
                                <Text>Shop Name</Text>
                                <Text fontSize="sm">Selling 121 Products</Text>
                            </Box>
                            <Icon
                            
                                marginLeft="auto"
                                boxSize="2rem"
                                fontSize="2xl"
                                
                            >
                                <IoEnter/>
                            </Icon>
                        </Flex>
                    </Box>
                    
                    <Flex direction="column" p={2} className={styles.niced} >
                        <Heading marginBlock="1rem" fontSize="lg">Product Description</Heading>
                        <Table 
                        marginBottom="1rem"
                        >
                            <Tbody
                            >
                                <Tr
                                >
                                    <Th
                                        paddingInline="0rem"
                                    >Date</Th>
                                    <Td paddingInline="0rem"
                                    >23 March 2021</Td>
                                </Tr>
                                <Tr>
                                    <Th
                                        paddingInline="0rem"
                                    >Stock</Th>
                                    <Td paddingInline="0rem"
                                    >2122</Td>
                                </Tr>
                                <Tr>
                                    <Th
                                        paddingInline="0rem"
                                    >Ships From</Th>
                                    <Td
                                        paddingInline="0rem"
                                    >Manila</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    <Collapse
                    in={shouldShowDetails}
                    startingHeight={110}
                    animateOpacity
                    >
                        <Text noOfLines={shouldShowDetails ? undefined : 6}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, rem non numquam distinctio eum harum nemo laudantium autem doloremque est enim ipsum nesciunt iusto adipisci eius corrupti blanditiis sed. Beatae quae culpa temporibus aliquid molestiae itaque consequuntur, quibusdam tempore facilis nisi expedita vero odio! Reiciendis alias quisquam minus delectus eum. Quam nostrum quae explicabo. Obcaecati culpa assumenda blanditiis velit ducimus pariatur expedita fugiat laborum provident deserunt magnam necessitatibus consectetur, ad, officia recusandae nulla exercitationem non ut, sint consequuntur! Placeat quidem quis ea aperiam praesentium vero maiores ducimus, rem dolorem harum nisi pariatur laboriosam quas velit. Obcaecati quam ad illum officiis?
                        </Text>
                    </Collapse >
                    <Button 
                        onClick={() => setShowDetails(!shouldShowDetails)} 
                        marginTop={shouldShowDetails ? '1rem' : 'initial'}
                        >{shouldShowDetails ? 'See less' : 'Show More'}</Button>
                    </Flex>

                    <Flex direction="column" className={styles.niced} 
                    paddingInline="0.5rem" paddingBottom="1rem"
                    >
                        <Heading marginBlock="1rem" fontSize="lg">Reviews</Heading>
                        <Flex>
                            <Text>No reviews yety.  </Text>
                        </Flex>
                    </Flex>

                </Flex>
            </Flex>
            <BottomBar 
            />
        </>
    );
}

export default ProductPage;