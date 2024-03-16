import React, { useEffect } from 'react'
import { IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Flex, HStack, VStack, Box } from '@chakra-ui/react';
import WalletConnect from './WalletConnect';
import { HamburgerIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);


  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginSuccess = (identity) => {
    console.log('Logged in!', identity);
    // Redirect to a different page or update your app state
  };

  return (
    <>
      {/* Hamburger Icon (Visible on Small Screens) */}
      <Box display={{ base: 'block', md: 'none' }}>
        <IconButton
          aria-label="Open navigation"
          icon={<HamburgerIcon />}
          onClick={toggleDrawer}
        />
      </Box>

      {/* Navigation Links (Visible on Large Screens) */}
      <Flex display={{ base: 'none', md: 'flex' }} alignItems="start">
        <HStack spacing={4} style={{paddingLeft: "20px"}}>
          {/* Add your navigation links here */}
          <a href="/">Corrupted Pigs</a>
          <a style={{fontSize: "0.6em"}} href="https://docs.google.com/document/d/1wGX5geCcxdMx3N30Nfax9tT9HyjhmE62cJdymyF9xAk/edit?usp=sharing">White Paper</a>
          {/* ... */}
          <WalletConnect />
        </HStack>
      </Flex>

      {/* Drawer (Hidden on Large Screens) */}
      <Drawer isOpen={isOpen} placement="left" onClose={toggleDrawer}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Corrupted Pigs</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4}>
                {/* Add your navigation links here */}
                <a href="/">Home</a>
                <a href="https://docs.google.com/document/d/1wGX5geCcxdMx3N30Nfax9tT9HyjhmE62cJdymyF9xAk/edit?usp=sharing">White Paper</a>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default Navbar
