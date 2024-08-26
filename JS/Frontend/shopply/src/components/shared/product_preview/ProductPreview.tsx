import { Box, Fade, Flex, Heading, IconButton, Image, Skeleton, Text, Tooltip, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {BsFillCartPlusFill as AddToCartIcon} from 'react-icons/bs'
import useThrottle from "../../../utils/use_throttle";


export interface ProductInformation {
    title: string;
    coverPhoto: string;
    price: number;
    soldCount: number;
    id: string;
}

function ProductPreview({info,} : {info: ProductInformation}) {
    const toast = useToast({
        title: "Added to cart!",
        duration: 900,
        position: 'bottom-left'
    });
    const [addToCartCb, addToCartCbCancel] = useThrottle(() => {
        toast();
    }, 500);

    useEffect(() => () => {
        addToCartCbCancel();
    }, [])

    const [isLoadingPreview, setIsLoadingPreview] = useState(true);

    const minPreviewWidth = isLoadingPreview ? '8rem' : 'initial'

    const buttonSize = useBreakpointValue(['sm', null, null,'md']) as string;

    return ( 
        <Box
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        overflow="hidden"
        as={Link}
        to={`/products/${info.id}`}
        position="relative"
        role="group"
        >
            <Fade
                in={!isLoadingPreview}
                >
                <Image 
                width="100%"
                objectFit='cover'
                alt='Dan Abramov' 
                src={info.coverPhoto}
                onLoad={() => setIsLoadingPreview(false)}
                />
            </Fade>
            <Flex
            direction="column"
            p={3}
            justifyContent="space-between"
            gap="0.5rem"
            >
                <Flex
                    justifyContent="space-between"
                >
                <Heading size="sm"
                noOfLines={2}
                >{info.title}
                </Heading>
                    <Tooltip
                    label="Add to Cart"
                    >
                    <IconButton
                        aria-label="Add product to cart"
                        borderRadius="full"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            addToCartCb();
                        }}
                        fontSize={{base: '1rem', sm: '1.25rem', lg: '1.5rem'}}
                        size={buttonSize}
                        icon={
                            <Flex
                            justify="center"
                            align="center"
                            >
                                <AddToCartIcon
                                />
                            </Flex>
                        }
                        />
                    </Tooltip >
                </Flex>
                <Flex
                justifyContent="space-between"
                fontSize="lg"
                >
                    <Text
                    color="cyan.500"
                    >${info.price}</Text>
                    <Text
                    opacity={0.6}
                    >{Intl.NumberFormat('en', {notation: 'compact'}).format(info.soldCount)} sold</Text>
                </Flex>

            </Flex>
            
        </Box>
     );
}

export default ProductPreview;