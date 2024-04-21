import { ExtrinsicConfigBuilderV2 } from '@galacticcouncil/xcm-core';
import {
  XcmVersion,
  ExtrinsicConfig,
  Parents,
} from '@moonbeam-network/xcm-builder';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import {
  toAsset,
  toAssets,
  toBeneficiary,
  toDest,
  toTransactMessage,
} from './polkadotXcm.utils';
import {
  getAccount,
  getExtrinsicAccount,
  getExtrinsicArgumentVersion,
} from '../ExtrinsicBuilder.utils';

const pallet = 'polkadotXcm';

const limitedReserveTransferAssets = () => {
  const func = 'limitedReserveTransferAssets';
  return {
    here: (): ExtrinsicConfigBuilderV2 => ({
      build: ({ address, amount, destination }) =>
        new ExtrinsicConfig({
          module: pallet,
          func,
          getArgs: (ext) => {
            const version = getExtrinsicArgumentVersion(ext);
            const account = getExtrinsicAccount(address);
            return [
              toDest(version, destination),
              toBeneficiary(version, account),
              toAssets(version, 0, 'Here', amount),
              0,
              'Unlimited',
            ];
          },
        }),
    }),
    X1: (): ExtrinsicConfigBuilderV2 => ({
      build: ({ address, amount, destination }) =>
        new ExtrinsicConfig({
          module: pallet,
          func,
          getArgs: () => {
            const version = XcmVersion.v1;
            const account = getExtrinsicAccount(address);
            return [
              toDest(version, destination),
              toBeneficiary(version, account),
              toAssets(version, 0, 'Here', amount),
              0,
              'Unlimited',
            ];
          },
        }),
    }),
    X2: (): ExtrinsicConfigBuilderV2 => ({
      build: ({ address, amount, asset, destination, fee, source }) =>
        new ExtrinsicConfig({
          module: pallet,
          func,
          getArgs: () => {
            const assetId = source.getAssetId(asset);
            const palletInstance = source.getAssetPalletInstance(asset);
            const version = XcmVersion.v3;
            const account = getExtrinsicAccount(address);
            const isAssetDifferent = !!fee && asset.key !== fee.key;
            const assets = [
              toAsset(
                0,
                {
                  X2: [
                    {
                      PalletInstance: palletInstance,
                    },
                    {
                      GeneralIndex: assetId,
                    },
                  ],
                },
                amount
              ),
            ];

            if (isAssetDifferent) {
              const feeAssetId = source.getAssetId(fee);
              assets.push(
                toAsset(
                  0,
                  {
                    X2: [
                      {
                        PalletInstance: palletInstance,
                      },
                      {
                        GeneralIndex: feeAssetId,
                      },
                    ],
                  },
                  fee.amount
                )
              );
            }

            return [
              toDest(version, destination),
              toBeneficiary(version, account),
              {
                [version]: assets,
              },
              isAssetDifferent ? 1 : 0,
              'Unlimited',
            ];
          },
        }),
    }),
  };
};

const limitedTeleportAssets = (parent: Parents) => {
  const func = 'limitedTeleportAssets';
  return {
    here: (): ExtrinsicConfigBuilderV2 => ({
      build: ({ address, amount, destination }) =>
        new ExtrinsicConfig({
          module: pallet,
          func,
          getArgs: () => {
            const version = XcmVersion.v2;
            const account = getExtrinsicAccount(address);
            return [
              toDest(version, destination),
              toBeneficiary(version, account),
              toAssets(version, parent, 'Here', amount),
              0,
              'Unlimited',
            ];
          },
        }),
    }),
  };
};

const reserveTransferAssets = () => {
  const func = 'reserveTransferAssets';
  return {
    here: (): ExtrinsicConfigBuilderV2 => ({
      build: ({ address, amount, destination }) =>
        new ExtrinsicConfig({
          module: pallet,
          func,
          getArgs: () => {
            const version = XcmVersion.v3;
            const account = getExtrinsicAccount(address);
            return [
              toDest(version, destination),
              toBeneficiary(version, account),
              toAssets(version, 0, 'Here', amount),
              0,
            ];
          },
        }),
    }),
  };
};

const send = () => {
  const func = 'send';
  return {
    transact: (executionCost: number): ExtrinsicConfigBuilderV2 => ({
      build: (params) => {
        const { destination, fee, source, transact, transactVia } = params;
        return new ExtrinsicConfig({
          module: pallet,
          func,
          getArgs: () => {
            if (!transact) {
              throw new Error('Ethereum transact not provided');
            }

            const version = XcmVersion.v3;
            const feePalletInstance = source.getAssetPalletInstance(fee);
            const account = getAccount(params);
            return [
              toDest(version, transactVia ?? destination),
              toTransactMessage(
                version,
                account,
                { X1: { PalletInstance: feePalletInstance } },
                transact.call,
                transact.weight,
                toBigInt(executionCost, fee.decimals)
              ),
            ];
          },
        });
      },
    }),
  };
};

export const polkadotXcm = () => {
  return {
    limitedReserveTransferAssets,
    limitedTeleportAssets,
    reserveTransferAssets,
    send,
  };
};
