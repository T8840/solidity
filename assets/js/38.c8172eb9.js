(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{442:function(e,n,t){"use strict";t.r(n);var a=t(2),s=Object(a.a)({},(function(){var e=this,n=e._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"_12-合约部署合约"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_12-合约部署合约"}},[e._v("#")]),e._v(" 12.合约部署合约")]),e._v(" "),n("h2",{attrs:{id:"_1️⃣-通过-new-创建合约-create"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1️⃣-通过-new-创建合约-create"}},[e._v("#")]),e._v(" 1️⃣ 通过 "),n("code",[e._v("new")]),e._v(" 创建合约 / "),n("code",[e._v("create")])]),e._v(" "),n("p",[e._v("使用关键字 "),n("code",[e._v("new")]),e._v(" 可以创建一个新合约。待创建合约的完整代码必须事先知道，因此递归的创建依赖是不可能的。"),n("code",[e._v("create")]),e._v("主要有以下三种表现形式。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("// SPDX-License-Identifier: MIT\npragma solidity ^0.8.17;\n\ncontract D {\n    uint x;\n    function D(uint a) payable {\n        x = a;\n    }\n}\n\ncontract C {\n    // 1.将作为合约的一部分执行\n    D d = new D(4);\n\n    // 2.方法内创建\n    function createD1(uint arg) public {\n        D newD = new D(arg);\n    }\n\n    // 3.方法内创建，并转账\n    function createD2(uint arg, uint amount) public payable {\n        //随合约的创建发送 ether\n        D newD = (new D){value:amount}(arg);\n    }\n}\n")])])]),n("p",[e._v("如示例中所示，通过使用 "),n("code",[e._v("value")]),e._v(" 选项创建 "),n("code",[e._v("D")]),e._v(" 的实例时可以附带发送 Ether，但是不能限制 gas 的数量。 如果创建失败（可能因为栈溢出，或没有足够的余额或其他问题），会引发异常。")]),e._v(" "),n("p",[e._v("这种方式也被称为 Factory 创建。工厂合约部署，也被称为 "),n("code",[e._v("create")]),e._v("，批量创建的时候使用，比如批量创建交易池，DeFi 类产品中批量创建借贷池等。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("// SPDX-License-Identifier: MIT\npragma solidity ^0.8.17;\n\ncontract Account {\n    address public deployer;\n    address public owner;\n\n    constructor(address _owner) payable {\n        owner = _owner;\n        deployer = msg.sender;\n    }\n\n    function getBalance() external view returns (uint256) {\n        return address(this).balance;\n    }\n}\n\ncontract AccountFactory {\n    Account[] public accounts;\n\n    function deploy(address _owner) external payable {\n        Account account = new Account{value: msg.value}(_owner);\n        accounts.push(account);\n    }\n}\n")])])]),n("h2",{attrs:{id:"_2️⃣-通过-salt-创建合约-create2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2️⃣-通过-salt-创建合约-create2"}},[e._v("#")]),e._v(" 2️⃣ 通过 "),n("code",[e._v("salt")]),e._v(" 创建合约 / "),n("code",[e._v("create2")])]),e._v(" "),n("p",[e._v("在创建合约时，将根据创建合约的地址和每次创建合约交易时的 "),n("code",[e._v("nonce")]),e._v(" 来计算合约的地址。如果你指定了一个可选的 "),n("code",[e._v("salt")]),e._v(" （一个 bytes32 值），那么合约创建将使用另一种机制("),n("code",[e._v("create2")]),e._v(")来生成新合约的地址：它将根据给定的 "),n("code",[e._v("salt")]),e._v(" ，创建合约的字节码和构造函数参数来计算创建合约的地址。特别注意，这里不再使用 "),n("code",[e._v("nonce")]),e._v("。")]),e._v(" "),n("p",[e._v("create2 的意义：可以在创建合约时提供更大的灵活性：你可以在创建新合约之前就推导出将要创建的合约地址。 甚至是还可以依赖此地址（即便它还不存在）来创建其他合约。一个主要用例场景是"),n("strong",[e._v("充当链下交互仲裁合约，仅在有争议时才需要创建。")])]),e._v(" "),n("h3",{attrs:{id:"案例演示-1"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#案例演示-1"}},[e._v("#")]),e._v(" 案例演示 1")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("// SPDX-License-Identifier: MIT\npragma solidity ^0.8.17;\n\ncontract D {\n    uint256 public x;\n\n    constructor(uint256 a) {\n        x = a;\n    }\n}\n\ncontract C {\n    function createDSalted(bytes32 salt, uint256 arg) public {\n        // 最新的语法\n        D d = new D{salt: salt}(arg);\n\n        // 之前的写法\n        // 这个复杂的表达式只是告诉我们，如何预先计算地址。\n        // 这里仅仅用来说明。 实际上，现在仅需要使用 `new D{salt: salt}(arg)` 即可.\n        address predictedAddress = address(\n            uint160(\n                uint256(\n                    keccak256(\n                        abi.encodePacked(\n                            bytes1(0xff),\n                            address(this),\n                            salt,\n                            keccak256(\n                                abi.encodePacked(type(D).creationCode, arg)\n                            )\n                        )\n                    )\n                )\n            )\n        );\n\n        require(address(d) == predictedAddress);\n    }\n}\n")])])]),n("p",[e._v("使用 "),n("code",[e._v("create2")]),e._v(" 创建合约还有一些特别之处。 合约销毁后可以在同一地址重新创建。不过，即使创建字节码（creation bytecode）相同（这是要求，因为否则地址会发生变化），该新创建的合约也可能有不同的部署字节码（deployed bytecode）。 这是因为构造函数可以使用两次创建合约之间可能已更改的外部状态，并在存储合约时将其合并到部署字节码中。")]),e._v(" "),n("h3",{attrs:{id:"小结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[e._v("#")]),e._v(" 小结")]),e._v(" "),n("p",[e._v("这种也被称为操作码部署，"),n("code",[e._v("create")]),e._v(" 可以通过加入 salt，来预测即将生成的地址。这种创建就能预测生成地址的方式也被称为 "),n("code",[e._v("create2")]),e._v(" 创建。")]),e._v(" "),n("ul",[n("li",[e._v("加 salt ,salt 决定了合约地址，不能重复使用\n"),n("ul",[n("li",[e._v("除非之前 salt 生成的合约被销毁了。")])])]),e._v(" "),n("li",[e._v("即将部署的合约地址计算\n"),n("ul",[n("li",[n("code",[e._v("uint160")]),e._v(" 格式就是地址格式了")])])])]),e._v(" "),n("p",[e._v("下面是两者的简短总结：")]),e._v(" "),n("ul",[n("li",[n("strong",[e._v("普通合约")]),e._v("的地址生成方式: 部署者的"),n("code",[e._v("地址")]),e._v(" + "),n("code",[e._v("地址 nonce")])]),e._v(" "),n("li",[n("strong",[e._v("预测合约地址的方式")]),e._v(":")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("bytes32 hash = keccak256(\n    abi.encodePacked(\n        bytes1(0xff), // 固定字符串\n        address(this), // 当前工厂合约地址，固定写法\n        _salt, // salt\n        keccak256(bytecode) //部署合约的 bytecode\n    )\n);\nreturn address(uint160(uint256(hash)));\n")])])]),n("h3",{attrs:{id:"案例代码-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#案例代码-2"}},[e._v("#")]),e._v(" 案例代码 2")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("// SPDX-License-Identifier: MIT\npragma solidity ^0.8.17;\n\ncontract DeployWithCreate2 {\n    address public deployer;\n    address public owner;\n\n    constructor(address _owner) payable {\n        owner = _owner;\n        deployer = msg.sender;\n    }\n\n    function getBalance() external view returns (uint256) {\n        return address(this).balance;\n    }\n}\n\ncontract AccountFactory {\n    DeployWithCreate2[] public accounts;\n\n    function deploy(uint256 _salt) external payable {\n        DeployWithCreate2 account = new DeployWithCreate2{\n            salt: bytes32(_salt), // uint256 需要转为 bytes32\n            value: msg.value\n        }(msg.sender);\n        accounts.push(account);\n    }\n\n    // 获取即将部署的地址\n    function getAddress(bytes memory bytecode, uint256 _salt)\n        external\n        view\n        returns (address)\n    {\n        bytes32 hash = keccak256(\n            abi.encodePacked(\n                bytes1(0xff), // 固定字符串\n                address(this), // 当前工厂合约地址\n                _salt, // salt\n                keccak256(bytecode) //部署合约的 bytecode\n            )\n        );\n        return address(uint160(uint256(hash)));\n    }\n\n    // 获取合约的 bytecode\n    function getBytecode(address _owner) external pure returns (bytes memory) {\n        bytes memory bytecode = type(DeployWithCreate2).creationCode;\n        // 连接的参数使用 abi.encode\n        return abi.encodePacked(bytecode, abi.encode(_owner));\n    }\n}\n")])])]),n("h3",{attrs:{id:"合约测试"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#合约测试"}},[e._v("#")]),e._v(" 合约测试")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("address1")]),e._v(" 部署合约\n"),n("ul",[n("li",[e._v("address1: "),n("code",[e._v("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")])])])]),e._v(" "),n("li",[e._v("使用 "),n("code",[e._v("address1")]),e._v(" 作为参数，获取 "),n("code",[e._v("getBytecode")]),e._v(" 返回值。")]),e._v(" "),n("li",[e._v("调用 getAddress\n"),n("ul",[n("li",[e._v("bytecode 参数是 "),n("code",[e._v("getBytecode")]),e._v(" 返回值")]),e._v(" "),n("li",[e._v("salt 参数是 1")]),e._v(" "),n("li",[e._v("计算结果是: "),n("code",[e._v("0x0022172A008CEdf60B1770dDD987888e5663D1Cc")])])])]),e._v(" "),n("li",[e._v("调用 deploy，salt 参数是 1")]),e._v(" "),n("li",[e._v("调用 accounts[0]\n"),n("ul",[n("li",[e._v("返回的合约地址是 "),n("code",[e._v("0x0022172A008CEdf60B1770dDD987888e5663D1Cc")]),e._v("，和计算的完全一样。")])])]),e._v(" "),n("li",[e._v("再次调用 deploy，salt 参数是 1\n"),n("ul",[n("li",[e._v("返回失败 "),n("code",[e._v("transact to AccountFactory.deploy errored: VM error: revert.")])])])])]),e._v(" "),n("h2",{attrs:{id:"_3️⃣-用-assembly-做-create"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3️⃣-用-assembly-做-create"}},[e._v("#")]),e._v(" 3️⃣ 用 assembly 做 create")]),e._v(" "),n("h3",{attrs:{id:"create-部署"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#create-部署"}},[e._v("#")]),e._v(" create 部署")]),e._v(" "),n("ul",[n("li",[e._v("Proxy: 部署合约的方法，和修改 owner")]),e._v(" "),n("li",[e._v("Helper: 生成部署用的 bytecode 和修改 owner 的 data")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('// SPDX-License-Identifier: MIT\npragma solidity ^0.8.17;\n\ncontract Test1 {\n    address public owner = msg.sender;\n\n    function setOwner(address _owner) public {\n        require(msg.sender == owner, "now owner");\n        owner = _owner;\n    }\n}\n\ncontract Test2 {\n    address public owner = msg.sender;\n    uint256 public value = msg.value;\n    uint256 public x;\n    uint256 public y;\n\n    constructor(uint256 _x, uint256 _y) {\n        x = _x;\n        y = _y;\n    }\n}\n\n// contract Proxy {\n//     function depolyTest1() external {\n//         new Test1();\n//     }\n\n//     function depolyTest2() external payable {\n//         new Test2(1, 2);\n//     }\n// }\n\n// assembly 部署\ncontract Proxy {\n    event Depoly(address);\n\n    // fallback() external payable {}\n\n    function depoly(bytes memory _code)\n        external\n        payable\n        returns (address adds)\n    {\n        assembly {\n            // create(v,p,n);\n            // v 是 发送的ETH值\n            // p 是 内存中机器码开始的位置\n            // n 是 内存中机器码的大小\n            // msg.value 不能使用，需要用 callvalue()\n            adds := create(callvalue(), add(_code, 0x20), mload(_code))\n        }\n\n        require(adds != address(0), "Depoly Failed");\n        emit Depoly(adds);\n    }\n\n    // 跳用\n    function execute(address _target, bytes memory _data) external payable {\n        (bool success, ) = _target.call{value: msg.value}(_data);\n        require(success, "Failed");\n    }\n}\n\ncontract Helper {\n    // 生成 type(contract).creationCode\n    function getBytescode1() external pure returns (bytes memory bytecode) {\n        bytecode = type(Test1).creationCode;\n    }\n\n    // 生成构造函数带有参数的 bytecode，参数连接后面就可以了\n    function getBytescode2(uint256 _x, uint256 _y)\n        external\n        pure\n        returns (bytes memory)\n    {\n        bytes memory bytecode = type(Test2).creationCode;\n        // abi 全局变量\n        return abi.encodePacked(bytecode, abi.encode(_x, _y));\n    }\n\n    // 调用合约方法的calldata，使用 abi.encodeWithSignature\n    function getCalldata(address _owner) external pure returns (bytes memory) {\n        return abi.encodeWithSignature("setOwner(address)", _owner);\n    }\n}\n')])])]),n("h3",{attrs:{id:"测试部署"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#测试部署"}},[e._v("#")]),e._v(" 测试部署")]),e._v(" "),n("p",[e._v("前提条件：部署 Helper 和 Proxy 合约。")]),e._v(" "),n("ol",{attrs:{start:"0"}},[n("li",[e._v("通过 getBytescode1 ，获取 Test1 需要的 bytecode")]),e._v(" "),n("li",[e._v("部署 Test1")]),e._v(" "),n("li",[e._v("获取 Test1 合约地址")]),e._v(" "),n("li",[e._v("At Test1 Address")]),e._v(" "),n("li",[e._v("获取 Test1 owner 地址")]),e._v(" "),n("li",[e._v("通过 getCalldata ，获取 Test1 setOwner 需要的 bytecode。参数是想要设置的 Owner 地址。")]),e._v(" "),n("li",[e._v("执行 execute(),参数是 Test1 合约地址 和 getCalldata 返回值。")])]),e._v(" "),n("p",[e._v("合约 2")]),e._v(" "),n("ol",{attrs:{start:"0"}},[n("li",[e._v("通过 getBytescode2 ，获取 Test2 需要的 bytecode")]),e._v(" "),n("li",[e._v("部署 Test2，需要设置 x, y 的值，可以选择支付 ETH。")]),e._v(" "),n("li",[e._v("获取 Test2 合约地址")]),e._v(" "),n("li",[e._v("At Test2 Address")]),e._v(" "),n("li",[e._v("查看 Test2 的值")])]),e._v(" "),n("h2",{attrs:{id:"_4️⃣-用-assembly-做-create2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4️⃣-用-assembly-做-create2"}},[e._v("#")]),e._v(" 4️⃣ 用 assembly 做 create2")]),e._v(" "),n("p",[e._v("UniswapV2Factory 的创建 pair 代码如下")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("function createPair(address tokenA, address tokenB) external returns (address pair) {\n    require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');\n    (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);\n    require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');\n\n    // single check is sufficient\n    require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); \n    bytes memory bytecode = type(UniswapV2Pair).creationCode;\n    bytes32 salt = keccak256(abi.encodePacked(token0, token1));\n    assembly {\n        pair := create2(0, add(bytecode, 32), mload(bytecode), salt)\n    }\n    IUniswapV2Pair(pair).initialize(token0, token1);\n    getPair[token0][token1] = pair;\n    getPair[token1][token0] = pair; // populate mapping in the reverse direction\n    allPairs.push(pair);\n    emit PairCreated(token0, token1, pair, allPairs.length);\n}\n")])])]),n("h2",{attrs:{id:"_5️⃣-创建合约的扩展"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5️⃣-创建合约的扩展"}},[e._v("#")]),e._v(" 5️⃣ 创建合约的扩展")]),e._v(" "),n("p",[e._v("可以通过以太坊交易"),n("strong",[e._v("从外部")]),e._v("或从 Solidity 合约内部创建合约。")]),e._v(" "),n("p",[e._v("一些集成开发环境，例如 Remix, 通过使用一些 UI 用户界面使创建合约的过程更加顺畅。 在以太坊上通过编程创建合约最好使用 JavaScript API web3.js。 现在，我们已经有了一个叫做 "),n("code",[e._v("web3.eth.Contract")]),e._v(" 的方法能够更容易的创建合约。")]),e._v(" "),n("p",[e._v("创建合约时， 合约的构造函数 (一个用关键字 constructor 声明的函数)会执行一次。 构造函数是可选的。只允许有一个构造函数，这意味着不支持重载。构造函数执行完毕后，合约的最终代码将部署到区块链上。此代码包括所有公共和外部函数以及所有可以通过函数调用访问的函数。 部署的代码没有 包括构造函数代码或构造函数调用的内部函数。")]),e._v(" "),n("p",[e._v("在内部，构造函数参数在合约代码之后通过 ABI 编码 传递，但是如果你使用 web3.js 则不必关心这个问题。")]),e._v(" "),n("h2",{attrs:{id:"️⃣-问答题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#️⃣-问答题"}},[e._v("#")]),e._v(" #️⃣ 问答题")]),e._v(" "),n("ul",[n("li",[n("p",[e._v("通过 "),n("code",[e._v("new")]),e._v(" 创建合约 / "),n("code",[e._v("create")]),e._v("的方法")]),e._v(" "),n("ul",[n("li",[e._v("1 将作为合约的一部分执行 "),n("code",[e._v("D d = new D(4);")])]),e._v(" "),n("li",[e._v("2 方法内创建"),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("function createD(uint arg) public {\n    D newD = new D(arg);\n}\n")])])])]),e._v(" "),n("li",[e._v("2 方法内创建，并转账"),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("function createD2(uint arg, uint amount) public payable {\n    //随合约的创建发送 ether\n    D newD = (new D){value:amount}(arg);\n}\n")])])])])])]),e._v(" "),n("li",[n("p",[e._v("create / create2 区别")]),e._v(" "),n("ul",[n("li",[e._v("在创建合约时，将根据创建合约的地址和每次创建合约交易时的 "),n("code",[e._v("nonce")]),e._v(" 来计算合约的地址。如果你指定了一个可选的 "),n("code",[e._v("salt")]),e._v(" （一个 bytes32 值），那么合约创建将使用另一种机制("),n("code",[e._v("create2")]),e._v(")来生成新合约的地址：它将根据给定的 "),n("code",[e._v("salt")]),e._v(" ，创建合约的字节码和构造函数参数来计算创建合约的地址。特别注意，这里不再使用 "),n("code",[e._v("nonce")]),e._v("。")])])]),e._v(" "),n("li",[n("p",[e._v("create2 的意义")]),e._v(" "),n("ul",[n("li",[e._v("可以在创建合约时提供更大的灵活性：你可以在创建新合约之前就推导出将要创建的合约地址。甚至是还可以依赖此地址（即便它还不存在）来创建其他合约。一个主要用例场景是"),n("strong",[e._v("充当链下交互仲裁合约，仅在有争议时才需要创建。")])])])]),e._v(" "),n("li",[n("p",[e._v("create2 有什么需要注意的？")]),e._v(" "),n("ul",[n("li",[e._v("不能重复使用 salt")]),e._v(" "),n("li",[e._v("使用 "),n("code",[e._v("create2")]),e._v(" 创建合约还有一些特别之处。 合约销毁后可以在同一地址重新创建。不过，即使创建字节码（creation bytecode）相同（这是要求，因为否则地址会发生变化），该新创建的合约也可能有不同的部署字节码（deployed bytecode）。 这是因为构造函数可以使用两次创建合约之间可能已更改的外部状态，并在存储合约时将其合并到部署字节码中。")])])]),e._v(" "),n("li",[n("p",[e._v("如何预测 create2 合约地址")]),e._v(" "),n("ul",[n("li",[n("p",[e._v("核心如下")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("bytes32 hash = keccak256(\n    abi.encodePacked(\n        bytes1(0xff), // 固定字符串\n        address(this), // 当前工厂合约地址，固定写法\n        _salt, // salt\n        keccak256(bytecode) //部署合约的 bytecode\n    )\n);\nreturn address(uint160(uint256(hash)));\n")])])])]),e._v(" "),n("li",[n("p",[e._v("精确写法")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("// SPDX-License-Identifier: MIT\npragma solidity ^0.8.17;\n\ncontract D {\n    uint public x;\n    constructor(uint a) {\n        x = a;\n    }\n}\n\ncontract C {\n    function createDSalted(bytes32 salt, uint arg) public {\n        /// 这个复杂的表达式只是告诉我们，如何预先计算地址。\n        /// 这里仅仅用来说明。\n        /// 实际上，你仅仅需要 ``new D{salt: salt}(arg)``.\n        address predictedAddress = address(uint160(uint(keccak256(abi.encodePacked(\n            bytes1(0xff), // 固定字符串\n            address(this), // 当前工厂合约地址，固定写法\n            salt, // salt\n            //部署合约的 bytecode\n            keccak256(abi.encodePacked(\n                type(D).creationCode,\n                arg\n            ))\n        )))));\n\n        D d = new D{salt: salt}(arg);\n        require(address(d) == predictedAddress);\n    }\n}\n")])])])])])])])])}),[],!1,null,null,null);n.default=s.exports}}]);