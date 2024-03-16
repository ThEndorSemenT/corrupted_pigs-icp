import React, { useEffect, useState } from "react";
import { Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { corrupted_pigs_backend } from "declarations/corrupted_pigs_backend";
import { Button } from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

const WalletConnect = () => {

  const [authClient, setAuthClient] = useState(null);
  const [principalId, setPrincipalId] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    async function init() {
      const client = await AuthClient.create();
      setAuthClient(client);
    }
    init();
  }, []);

  const handleSuccess = async () => {
    const identity = authClient.getIdentity();
    console.log(identity);
    const principal = await identity.getPrincipal().toString();
    setPrincipalId(principal);
    setisLoading(false);

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

  return (
    <div>
      {!principalId ? (
        <Button isLoading={isLoading} onClick={handleLogin} rightIcon={<UnlockIcon />} colorScheme='blue'>
          Login Wallet
        </Button>
      ) : (
        <Button isLoading={isLoading} onClick={handleLogin} rightIcon={<LockIcon />} colorScheme='blue' variant='outline'>
          Logout
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
