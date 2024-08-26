import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Heading, IconButton, Flex } from '@chakra-ui/react';
import { AiFillHome as HomeIcon } from 'react-icons/ai';
import { TbChecklist as OrdersIcon } from 'react-icons/tb';
import { BsFillGearFill as SettingsIcon } from 'react-icons/bs';
import { FaUserCircle as UserProfileIcon } from 'react-icons/fa';
import NavItem from './NavItem';

const navList = [
  {
    name: "Home",
    to: "/",
    icon: HomeIcon,
  },
  {
    name: "Orders",
    to: "/",
    icon: OrdersIcon,
  },
  {
    name: "Settings",
    to: "/",
    icon: SettingsIcon,
  },
]

export function NavDrawer({ isNavOpen, setIsNavOpen }: { isNavOpen: boolean; setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>; }) {

  function onNavClick() {
    setIsNavOpen(false);
  }

  return <Drawer placement='left' onClose={() => {
    setIsNavOpen(false);
  }} isOpen={isNavOpen}>
    <DrawerOverlay />
    <DrawerContent
      maxWidth={'70vw'}

    >
      <DrawerHeader borderBottomWidth='2px'
        p={7}
        bgColor={'inherit'}
      >
        <Flex
          height="100%"
          width="100%"
          align="center"
          justify="space-between"
        >
          <Heading as='h4' size="small">
            Shopply
          </Heading>
          <IconButton
            aria-label='user profile'
          >
            <UserProfileIcon />
          </IconButton>
        </Flex>
      </DrawerHeader>
      <DrawerBody
        p={0}

      >
        <Flex
          direction="column"
          role="group"
        >
          {
            navList.map((v,i ) => 
              
          <NavItem
          key={i}
          onClick={onNavClick}
          icon={v.icon}
          to={v.to}
          >
            {v.name}
          </NavItem>
            )
        }
          
        </Flex>
      </DrawerBody>
    </DrawerContent>
  </Drawer>;
}
