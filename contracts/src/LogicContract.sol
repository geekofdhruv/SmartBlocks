// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract LogicContract is IERC721Receiver, Ownable {
    // --- State Variables for the NFT Trigger -> Token Transfer Logic ---
    address public nftCollectionAddress;
    address public rewardTokenAddress;
    uint256 public rewardAmount;

    event LogicExecuted(address indexed triggerWallet, string action);

    // The 'initialOwner' will be the user who deploys this contract
    constructor(address initialOwner, address _nftAddress, address _tokenAddress, uint256 _amount)
        Ownable(initialOwner)
    {
        nftCollectionAddress = _nftAddress;
        rewardTokenAddress = _tokenAddress;
        rewardAmount = _amount; // We'll handle decimals on the deployment script
    }

    /**
     * @notice This is the TRIGGER function, called when an ERC721 is received.
     */
    function onERC721Received(address, /* operator */ address from, uint256, /* tokenId */ bytes memory /* data */ )
        public
        virtual
        override
        returns (bytes4)
    {
        // Security Check: Only trigger if the NFT is from the correct collection
        require(msg.sender == nftCollectionAddress, "Invalid NFT Collection");

        // The ACTION: Perform the token transfer
        IERC20(rewardTokenAddress).transfer(from, rewardAmount);

        emit LogicExecuted(from, "Transferred ERC20 Token");

        return this.onERC721Received.selector;
    }
}
