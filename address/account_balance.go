package main
import (
    "context"
    "fmt"
    "log"
    "math"
    "math/big"

    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"
)

func main() {
    client, err := ethclient.Dial("https://cloudflare-eth.com")
    if err != nil {
        log.Fatal(err)
    }

    account := common.HexToAddress("0x71c7656ec7ab88b098defb751b7401b5f6d8976f")
	// 获取账号余额
    balance, err := client.BalanceAt(context.Background(), account, nil)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(balance) // 25893180161173005034
	// 读取该区块时的账户余额。区块号必须是big.Int类型
    blockNumber := big.NewInt(5532993)
    balanceAt, err := client.BalanceAt(context.Background(), account, blockNumber)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(balanceAt) // 25729324269165216042

	// 精度转换为ETH
    fbalance := new(big.Float)
    fbalance.SetString(balanceAt.String())
    ethValue := new(big.Float).Quo(fbalance, big.NewFloat(math.Pow10(18)))
    fmt.Println(ethValue) // 25.729324269165216041

	// 待处理的余额
    pendingBalance, err := client.PendingBalanceAt(context.Background(), account)
    fmt.Println(pendingBalance) // 25729324269165216042
}