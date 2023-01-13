export default {
"abi":[
{"inputs":[],"name":"gasLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"gaslimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MultiCall.Call[]","name":"calls","type":"tuple[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MultiCall.Call[]","name":"calls","type":"tuple[]"}],"name":"multicallWithGas","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"},{"internalType":"uint256[]","name":"gasUsed","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"components":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MultiCall.Call[]","name":"calls","type":"tuple[]"},{"internalType":"uint256","name":"gasBuffer","type":"uint256"}],"name":"multicallWithGasLimitation","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"},{"internalType":"uint256","name":"lastSuccessIndex","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}
],
"bytecode":"608060405234801561001057600080fd5b506108bd806100206000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c8063489dba1611610050578063489dba1614610092578063caa5c23f146100b3578063d699fe15146100d357610067565b80632a7228391461006c5780632ddb301b1461008a575b600080fd5b6100746100f4565b6040516100819190610827565b60405180910390f35b6100746100f8565b6100a56100a036600461067c565b610100565b6040516100819291906107bc565b6100c66100c136600461067c565b610280565b60405161008191906107a2565b6100e66100e13660046106b7565b61039a565b604051610081929190610805565b4590565b60005a905090565b606080825167ffffffffffffffff8111801561011b57600080fd5b5060405190808252806020026020018201604052801561014f57816020015b606081526020019060019003908161013a5790505b509150825167ffffffffffffffff8111801561016a57600080fd5b50604051908082528060200260200182016040528015610194578160200160208202803683370190505b50905060005b835181101561027a5760005a90508482815181106101b457fe5b60200260200101516000015173ffffffffffffffffffffffffffffffffffffffff168583815181106101e257fe5b6020026020010151602001516040516101fb9190610786565b6000604051808303816000865af19150503d8060008114610238576040519150601f19603f3d011682016040523d82523d6000602084013e61023d565b606091505b50905084838151811061024c57fe5b60200260200101819052505a810383838151811061026657fe5b60209081029190910101525060010161019a565b50915091565b6060815167ffffffffffffffff8111801561029a57600080fd5b506040519080825280602002602001820160405280156102ce57816020015b60608152602001906001900390816102b95790505b50905060005b8251811015610394578281815181106102e957fe5b60200260200101516000015173ffffffffffffffffffffffffffffffffffffffff1683828151811061031757fe5b6020026020010151602001516040516103309190610786565b6000604051808303816000865af19150503d806000811461036d576040519150601f19603f3d011682016040523d82523d6000602084013e610372565b606091505b50905082828151811061038157fe5b60209081029190910101526001016102d4565b50919050565b60606000835167ffffffffffffffff811180156103b657600080fd5b506040519080825280602002602001820160405280156103ea57816020015b60608152602001906001900390816103d55790505b50915060005b84518110156104bf5784818151811061040557fe5b60200260200101516000015173ffffffffffffffffffffffffffffffffffffffff1685828151811061043357fe5b60200260200101516020015160405161044c9190610786565b6000604051808303816000865af19150503d8060008114610489576040519150601f19603f3d011682016040523d82523d6000602084013e61048e565b606091505b50905083828151811061049d57fe5b6020026020010181905250835a10156104b75790506104e6565b6001016103f0565b505082517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff015b9250929050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461051157600080fd5b92915050565b600082601f830112610527578081fd5b813567ffffffffffffffff8082111561053e578283fd5b602061054d8182850201610830565b838152935080840185820160005b858110156105e957813588016040807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0838d0301121561059a57600080fd5b6105a381610830565b6105af8c8885016104ed565b81529082013590878211156105c357600080fd5b6105d18c88848601016105f5565b8188015285525050918301919083019060010161055b565b50505050505092915050565b600082601f830112610605578081fd5b813567ffffffffffffffff81111561061b578182fd5b61064c60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610830565b915080825283602082850101111561066357600080fd5b8060208401602084013760009082016020015292915050565b60006020828403121561068d578081fd5b813567ffffffffffffffff8111156106a3578182fd5b6106af84828501610517565b949350505050565b600080604083850312156106c9578081fd5b823567ffffffffffffffff8111156106df578182fd5b6106eb85828601610517565b95602094909401359450505050565b60008282518085526020808601955080818302840101818601855b84811015610779577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe080878503018a528251805180865261075b81888801898501610857565b9a86019a601f01909116939093018401925090830190600101610715565b5090979650505050505050565b60008251610798818460208701610857565b9190910192915050565b6000602082526107b560208301846106fa565b9392505050565b6000604082526107cf60408301856106fa565b828103602084810191909152845180835285820192820190845b81811015610779578451835293830193918301916001016107e9565b60006040825261081860408301856106fa565b90508260208301529392505050565b90815260200190565b60405181810167ffffffffffffffff8111828210171561084f57600080fd5b604052919050565b60005b8381101561087257818101518382015260200161085a565b83811115610881576000848401525b5050505056fea264697066735822122038188577bc73d7ea653cd6bc91d375c262525e1d20443ee89fee3f2ab6125aab64736f6c634300060c0033"
}