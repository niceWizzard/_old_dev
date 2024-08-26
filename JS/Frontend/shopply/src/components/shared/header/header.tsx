import styles from './header.module.css';
import { ReactText, useState } from 'react';
import { Heading, Icon, IconButton, List, ListItem, MenuIcon, Text, LinkBox, LinkOverlay, Link, Flex, FlexProps, LinkProps, Container, DrawerProps, Box, } from '@chakra-ui/react';
import {AiOutlineMenu} from 'react-icons/ai'
import {IoMdArrowRoundBack} from 'react-icons/io'
import {BsCart4 as CartIcon} from 'react-icons/bs';
import { IconType } from 'react-icons';
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import { NavDrawer } from './NavDrawer';




function Header() {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const location = useLocation();
    const navigatePage = useNavigate();
    const isInProductsPage = location.pathname.includes('/products/');

    return <Box
    bgColor="cyan.400"
    as={'header'}
    color="white"
    className={styles.header}
    p={0}
    minHeight="5vh"  
    boxShadow="lg"
    position={isInProductsPage ? 'sticky' : 'initial'}
    zIndex="10"
    top="0"
    >
        <Flex
        justify="space-between"
        width="100%"
        paddingInline="0.5rem"
        >
            <Flex
            align="center"
            gap="1rem"
            
            >
                {
                    !isInProductsPage &&
                    <IconButton
                        aria-label='Open Nav'
                        bgColor={'transparent'}
                        _hover={{
                        bg: "cyan.500",
                    }}
                        icon={<Icon as={AiOutlineMenu} fontSize="1.25rem" />}
                        onClick={() => setIsNavOpen(true)}
                    />
                }
                {
                    isInProductsPage && 
                    <IconButton
                        aria-label='Go back'
                        bgColor={'transparent'}
                        _hover={{
                        bg: "cyan.500",
                        }}
                        icon={<Icon as={IoMdArrowRoundBack} fontSize="1.25rem"
                        
                        />}
                        onClick={() => navigatePage(-1)}
                    />

                }

            
            <Heading
            as='h2' size="md"
            >Shopply</Heading>
            </Flex>
            <Link
            as={RouterLink}
                to="/"
                p={2.5}
                borderRadius={6}
                _hover={{
                    bg: "cyan.500",
                }}
                
            >
                    <CartIcon
                    fontSize="1.25rem"
                    
                    />
            </Link>
        </Flex>
        <NavDrawer
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
        />
    </Box>;

    

}


export default Header;
