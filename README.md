<h1><code>Galactic SDK</code></h1>
Galactic SDK is set of modules crafted with love to ease Basilisk & HydraDX chains integration.<br /> <br /> 

Main components: 

**Router** - off-chain optimization of orders across pools for best price execution. Router does not perform any on-chain transations.<br /> 
**Trader** - on-chain transaction executor using data from router to perform best possible swap execution across pools.

## API

### Router

```typescript
getPools(): PoolBase[]
getAllAssets(): PoolAsset[]
getAssetPairs(token: string): PoolAsset[]
getAllPaths(tokenIn: string, tokenOut: string): Hop[][]
getBestSellPrice(tokenIn: string, tokenOut: string, amountIn: BigNumber): Swap[]
getBestBuyPrice(tokenIn: string, tokenOut: string, amountOut: BigNumber): Swap[]
```

For type signature visit [types.ts](src/types.ts)<br /> 
**Note:** All amount args are formatted as bignumber 1^12!!!

### Trader

Not supported yet. ⏳

## Examples

```typescript
// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
import { PolkadotPoolService } from "@galactic/pool";
import { Router } from "@galactic/api"";

// Initialize Polkadot API
const wsProvider = new WsProvider('wss://rpc.basilisk.cloud');
const api = await ApiPromise.create({ provider: wsProvider });

// Initialize Router 
const poolService = new PolkadotPoolService(api);
const router = new Router(poolService);

// Do something
const result = await router.getAllAssets();
console.log(result;
```

To demonstrate full working example on real chain see [script](test/script/) section.

## Packaging

* api - Router & Trader impl
* client - Substrate chain based clients 
* pool - Pool specific logic, math, clients
* suggester - Route proposing, graph utils, BFS, DFS
* utils - bignumber, math, collections

## Roadmap

Component list and current status here ⬇️

- 🧪 Done
- 🛠 Work in progress
- ⏳ Planning to build

| Name     |  Type     ||
|----------|:---------:|--:|
| Router   |  API      | 🧪 |
| Trader   |  API      | ⏳ |
| Polkadot |  Client   | 🧪 |
| Capi     |  Client   | ⏳ |
| XYK      |  Pool     | 🧪 |
| LBP      |  Pool     | ⏳ |
| Stable   |  Pool     | ⏳ |
| Omni     |  Pool     | ⏳ |

## Reporting issues

In case of unexpected sdk behaviour, please create well-written issue [here](https://https://github.com/nohaapav/router-sdk/issues/new). It makes it easier to find & fix the problem accordingly.
