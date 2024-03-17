import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { corrupted_pigs_backend } from "declarations/corrupted_pigs_backend";
import { Button } from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

const WalletConnect = ({authClient, setAuthClient, principalId, setPrincipalId}) => {
  
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    async function checkUserLoggedIn() {
      const userSession = Cookies.get("userSession");
      if (userSession) {
        // Set the user session data (e.g., authentication token) in your app
        // You can use this information to keep the user logged in
        setPrincipalId(userSession);
      }
    }

    async function setWalletAuthClient() {
      const client = await AuthClient.create();
      setAuthClient(client);
    }

    setWalletAuthClient();
    checkUserLoggedIn();
  }, []);

  const handleSuccess = async () => {
    const identity = authClient.getIdentity();
    const principal = await identity.getPrincipal().toString();
    setPrincipalId(principal);
    setisLoading(false);

    Cookies.set("userSession", principal, { expires: 3600 });

    Actor.agentOf(corrupted_pigs_backend).replaceIdentity(identity);
  }

  const handleLogin = async () => {
    if (!authClient) throw new Error("AuthClient not initialized");
    setisLoading(true);

    const APP_NAME = "NFID example";
    const APP_LOGO = "https://nfid.one/icons/favicon-96x96.png";
    const CONFIG_QUERY = `?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;

    const identityProvider = `https://nfid.one/authenticate${CONFIG_QUERY}`;

    authClient.login({
      identityProvider,
      onSuccess: handleSuccess,
      windowOpenerFeatures: `
        left=${window.screen.width / 2 - 525 / 2},
        top=${window.screen.height / 2 - 705 / 2},
        toolbar=0,location=0,menubar=0,width=525,height=705
      `,
    });
  };

  const handleLogout = () => {
    setPrincipalId(null);
    Cookies.remove("userSession");
  };

  return (
    <div>
      {!principalId ? (
        <Button isLoading={isLoading} onClick={handleLogin} rightIcon={<UnlockIcon />} colorScheme='blue'>
          Login Wallet
        </Button>
      ) : (
        <Button isLoading={isLoading} onClick={handleLogout} rightIcon={<LockIcon />} colorScheme='blue' variant='outline'>
          Logout
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
