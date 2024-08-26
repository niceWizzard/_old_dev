import { Icon, Link, Flex, LinkProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Link as RouterLink } from 'react-router-dom';


interface NavItemProps extends LinkProps {
  icon: IconType;
  to: string;
}

export default function NavItem({ to, icon, children, ...rest }: NavItemProps) {
  return (
    <Link _focus={{
      bg: 'cyan.400',
      color: 'white',
    }}
      as={RouterLink}
      to={to}
      p={0}
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}

      {...rest}
    >
      <Flex
        align="center"
        justify="start"
        p="4"
        //   mx="4"
        boxSizing='border-box'
        borderRadius="lg"
        role="group"
        cursor="pointer"
        width="100%"
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="1.25rem"
            as={icon} />
        )}
        {children}
      </Flex>
    </Link>
  );
}
