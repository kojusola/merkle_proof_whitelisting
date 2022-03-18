//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract WhiteListing {
    IERC20 public _token;
    bytes32 public root =   0x87ae53e2b2469c1920a68f15b379ca9ff04ae072d4992f627bc1f40b6966458c;
    mapping(address=>bool) receivedToken;
      constructor(address token){
        _token = IERC20(token);
    }
    event rewards (address _receiver, uint _amount);

    function claim(bytes32[] calldata _merkleProof, uint _itemId, uint _amount) public returns (bool){
        require(receivedToken[msg.sender], "You already claimed your tokens");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, _itemId, _amount));
        require(MerkleProof.verify(_merkleProof, root, leaf), "Incorrect proof");
        bool transferred = _token.transfer(msg.sender,_amount * 10 ** 18);
        require(transferred, "Token Transfer Failed");
        receivedToken[msg.sender] = true;
        emit rewards(msg.sender, _amount * 10 ** 18);
        return true;
    }
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    fallback() external payable {
    }

}