pragma solidity >=0.8.1;

contract simpleContract {
    mapping(address => uint) public balances;

    mapping(address => mapping(address => uint)) public allowance;

    uint public totalSupply = 1000 * 10 ** 10;
    string public name = "simple_contract";

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    constructor() public{
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address owner) public view returns(uint){
        return balances[owner];
    }
    function transfer(address to, uint value) public returns(bool){
        require(balanceOf(msg.sender) >= value, 'Insufficent funds');
        balances[to] += value;
        balances[msg.sender] -= value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint value) public returns(bool){
        require(balanceOf(from) >= value, 'Insufficent funds');
        require(allowance[from][msg.sender] >= value, 'Insufficent funds');
        balances[to]+=value;
        balances[from]-=value;
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint value) public returns(bool){
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
}
