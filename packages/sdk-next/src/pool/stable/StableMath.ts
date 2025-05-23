import {
  calculate_in_given_out,
  calculate_out_given_in,
  calculate_amplification,
  calculate_add_one_asset,
  calculate_liquidity_out_one_asset,
  calculate_pool_trade_fee,
  calculate_shares,
  calculate_shares_for_amount,
  calculate_spot_price_with_fee,
  pool_account_name,
} from '@galacticcouncil/math-stableswap';

export class StableMath {
  static getPoolAddress(assetId: number): Uint8Array {
    return pool_account_name(assetId);
  }

  static calculateAmplification(
    initialAmp: string,
    finalAmp: string,
    initialBlock: string,
    finalBlock: string,
    currentBlock: string
  ) {
    return calculate_amplification(
      initialAmp,
      finalAmp,
      initialBlock,
      finalBlock,
      currentBlock
    );
  }

  static calculateInGivenOut(
    reserves: string,
    assetIn: number,
    assetOut: number,
    amountOut: string,
    amplification: string,
    fee: string
  ): string {
    return calculate_in_given_out(
      reserves,
      assetIn,
      assetOut,
      amountOut,
      amplification,
      fee
    );
  }

  static calculateAddOneAsset(
    reserves: string,
    shares: string,
    assetIn: number,
    amplification: string,
    shareIssuance: string,
    fee: string
  ) {
    return calculate_add_one_asset(
      reserves,
      shares,
      assetIn,
      amplification,
      shareIssuance,
      fee
    );
  }

  static calculateSharesForAmount(
    reserves: string,
    assetIn: number,
    amount: string,
    amplification: string,
    shareIssuance: string,
    fee: string
  ) {
    return calculate_shares_for_amount(
      reserves,
      assetIn,
      amount,
      amplification,
      shareIssuance,
      fee
    );
  }

  static calculateOutGivenIn(
    reserves: string,
    assetIn: number,
    assetOut: number,
    amountIn: string,
    amplification: string,
    fee: string
  ): string {
    return calculate_out_given_in(
      reserves,
      assetIn,
      assetOut,
      amountIn,
      amplification,
      fee
    );
  }

  static calculateLiquidityOutOneAsset(
    reserves: string,
    shares: string,
    assetOut: number,
    amplification: string,
    shareIssuance: string,
    withdrawFee: string
  ) {
    return calculate_liquidity_out_one_asset(
      reserves,
      shares,
      assetOut,
      amplification,
      shareIssuance,
      withdrawFee
    );
  }

  static calculateShares(
    reserves: string,
    assets: string,
    amplification: string,
    shareIssuance: string,
    fee: string
  ) {
    return calculate_shares(
      reserves,
      assets,
      amplification,
      shareIssuance,
      fee
    );
  }

  static calculateSpotPriceWithFee(
    poolId: string,
    reserves: string,
    amplification: string,
    assetIn: string,
    assetOut: string,
    shareIssuance: string,
    fee: string
  ): string {
    return calculate_spot_price_with_fee(
      poolId,
      reserves,
      amplification,
      assetIn,
      assetOut,
      shareIssuance,
      fee
    );
  }

  static calculatePoolTradeFee(
    amount: string,
    feeNumerator: number,
    feeDenominator: number
  ): string {
    return calculate_pool_trade_fee(amount, feeNumerator, feeDenominator);
  }
}
