## Geth Demo

demo from：https://goethereumbook.org/zh   


- 创建客户端 client.go
- 以太坊账户 address/address.go
    1. 账号余额 account_balance.go
    2. 账户代币余额
    3. 生成新钱包 wallet_generate.go
    4. 密匙库 keystore.go
    5. 分层确定性钱包
    6. 地址验证 address_check.go    
- 交易 transaction/
    1. 查询区块 blocks.go
    2. 查询交易 transactions.go
    3. ETH转账 transfer_eth.go
    4. 代币转账 transfer_tokens.go
    5. 监听新区块 block_subscribe.go
    6. 创建裸交易 transaction_raw_create.go
    7. 发送裸交易 transaction_raw_send.go

- 智能合约
    1. 智能合约 & ABI
    2. 部署智能合约
    3. 加载智能合约
    4. 查询智能合约
    5. 写入智能合约
    6. 读取智能合约二进制码
    7. 查询ERC20代币智能合约

- 事件日志
    1. 监听事件日志
    2. 读取事件日志
    3. 读取ERC20代币的事件日志
    4. 读取0x Protocol事件日志

- 签名
    1. 生成签名
    2. 验证签名
- Swarm存储
    1. 创建 Swarm存储
    2. 上传文件到Swarm
    3. 从Swarm下载文件
- Whisper通信协议
    1. 创建Whisper客户端
    2. 生成Whisper密匙对
    3. 在Whisper上发送消息
    4. 监听Whisper消息
- 常用方法
    1. 方法集合
- 专有词汇
- 资料