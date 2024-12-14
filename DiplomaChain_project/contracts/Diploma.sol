// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Diploma {
    struct DiplomaData {
        string university;
        bytes32 diplomaHash;
        uint256 timestamp;
    }

    mapping(bytes32 => DiplomaData) private diplomas;

    event DiplomaRegistered(bytes32 indexed diplomaId, string university, uint256 timestamp);
    event DiplomaVerified(bytes32 indexed diplomaId, bool valid);

    function registerDiploma(string memory _university, bytes32 _diplomaHash) public {
        bytes32 diplomaId = keccak256(abi.encodePacked(_university, _diplomaHash));
        require(diplomas[diplomaId].timestamp == 0, "Diploma already registered");

        diplomas[diplomaId] = DiplomaData({
            university: _university,
            diplomaHash: _diplomaHash,
            timestamp: block.timestamp
        });

        emit DiplomaRegistered(diplomaId, _university, block.timestamp);
    }

    function verifyDiploma(string memory _university, bytes32 _diplomaHash) public view returns (bool) {
        bytes32 diplomaId = keccak256(abi.encodePacked(_university, _diplomaHash));
        return diplomas[diplomaId].timestamp != 0;
    }
}
