const Diploma = artifacts.require("Diploma");

module.exports = async function(deployer, network, accounts) {
  // Déployer le contrat
  await deployer.deploy(Diploma);

  // Obtenir une instance du contrat déployé
  const instance = await Diploma.deployed();

  // Initialiser un diplôme avec des valeurs par défaut
  const university = "Sample University";
  const diplomaHash = web3.utils.keccak256("Sample Diploma");
  await instance.registerDiploma(university, diplomaHash, { from: accounts[0] });

  console.log(`Diploma registered for ${university} with hash ${diplomaHash}`);
};
