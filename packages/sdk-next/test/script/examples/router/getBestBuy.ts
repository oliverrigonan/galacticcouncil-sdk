import { PolkadotClient } from 'polkadot-api';

import { PapiExecutor } from '../../PapiExecutor';
import { ApiUrl } from '../../types';

import { pool, sor } from '../../../../src';

class GetBestBuy extends PapiExecutor {
  async script(client: PolkadotClient) {
    const ctx = new pool.PoolContextProvider(client)
      .withOmnipool()
      .withStableswap()
      .withXyk();

    const router = new sor.TradeRouter(ctx);

    const buy = await router.getBestBuy(10, 5, 100_000_000_000n);
    console.log(buy.toHuman());

    return () => {
      ctx.destroy();
      client.destroy();
    };
  }
}

new GetBestBuy(ApiUrl.Hydration, 'Get best buy').run();
