import { Box, Flex, HStack, Heading, Image, Spacer, useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

export interface HeaderProps {
  title: string;
  children: React.ReactNode;
  onClick: () => void;
}

const YourLogoImage = () => {
  const { colorMode } = useColorMode();
  const logoSrc = colorMode === 'dark' ? '../../icon.png' : '../../icon.png';

  return (
    <Image src={logoSrc} alt="24hbook" boxSize="24px"  />
  );
};

const Header: React.FC<HeaderProps> = ({ title, children, onClick }) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const [bgColor, setBgColor] = React.useState('transparent');
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!inView) {
      setBgColor(colorMode === 'light' ? 'white' : 'blue.900');
    } else {
      setBgColor('transparent');
    }
  }, [inView, colorMode]);

  return (
    <>
      <Flex
        px={{ base: 4, md: 8 }}
        py={3}
        mb={import.meta.env.VITE_TAURI === '1' ? 0 : 2}
        w="full"
        position="sticky"
        top={0}
        zIndex="sticky"
        transition="background-color 0.2s ease-in-out"
        bgColor={bgColor}
        boxShadow={!inView ? 'sm' : 'none'}
      >
        <HStack spacing={1} align="center">
          <YourLogoImage />
          <Heading
            cursor="pointer"
            onClick={onClick}
            as="h1"
            fontSize="xl"
            my={import.meta.env.VITE_TAURI === '1' ? 0 : 2}
          >
            {title}
          </Heading>
        </HStack>
        <Spacer />
        <Box>{children}</Box>
      </Flex>
      <Box ref={ref} />
    </>
  );
};

export default Header;