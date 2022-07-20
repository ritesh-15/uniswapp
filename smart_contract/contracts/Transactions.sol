//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

contract Transactions {
    uint256 transactionCount;

    constructor() {
        transactionCount = 0;
    }

    event Transfer(
        address sender,
        address receiver,
        uint256 amount,
        string message,
        string keyword,
        uint256 timestamp
    );

    function publishTransaction(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCount++;

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            keyword,
            block.timestamp
        );
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
