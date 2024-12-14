import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import DiplomaContract from './Diploma.json';

const DiplomaApp = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [diplomaHash, setDiplomaHash] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const initBlockchain = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = DiplomaContract.networks[networkId];

        if (deployedNetwork) {
          const instance = new web3.eth.Contract(
            DiplomaContract.abi,
            deployedNetwork.address
          );
          setContract(instance);
        } else {
          alert('Smart contract not deployed to detected network.');
        }
      } else {
        alert('Please install MetaMask to use this application.');
      }
    };

    initBlockchain();
  }, []);

  const handleVerify = async () => {
    if (contract) {
      const result = await contract.methods.verifyDiploma(diplomaHash).call();
      setIsVerified(result);
    }
  };

  return (
    <div>
      <h2>Vérification de Diplôme</h2>
      <p>Compte connecté : {account}</p>
      <input
        type="text"
        placeholder="Entrez le hash du diplôme"
        value={diplomaHash}
        onChange={(e) => setDiplomaHash(e.target.value)}
      />
      <button onClick={handleVerify}>Vérifier</button>
      {isVerified && <p>Le diplôme est authentique.</p>}
      {!isVerified && diplomaHash && <p>Le diplôme n'est pas valide.</p>}
    </div>
  );
};

export default DiplomaApp;