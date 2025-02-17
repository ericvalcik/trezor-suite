import type { BuyInfo } from 'src/actions/wallet/coinmarketBuyActions';
import type { ExchangeInfo } from 'src/actions/wallet/coinmarketExchangeActions';
import type { SellInfo } from 'src/actions/wallet/coinmarketSellActions';
import type {
    Option,
    Trade,
    TradeBuy,
    TradeExchange,
    TradeSell,
    TradeType,
} from 'src/types/wallet/coinmarketCommonTypes';
import {
    BuyCryptoPaymentMethod,
    BuyProviderInfo,
    BuyTrade,
    BuyTradeStatus,
    CryptoId,
    ExchangeProviderInfo,
    ExchangeTrade,
    ExchangeTradeStatus,
    FiatCurrencyCode,
    SellCryptoPaymentMethod,
    SellFiatTrade,
    SellProviderInfo,
    SellTradeStatus,
    WatchBuyTradeResponse,
    WatchExchangeTradeResponse,
    WatchSellTradeResponse,
} from 'invity-api';
import { Account } from '@suite-common/wallet-types';
import { AnyAction, Dispatch } from 'redux';
import { State } from 'src/reducers/wallet/coinmarketReducer';
import { WithSelectedAccountLoadedProps } from 'src/components/wallet';
import { AccountType } from '@suite-common/wallet-config';
import { ExtendedMessageDescriptor, TrezorDevice } from 'src/types/suite';
import { Timer } from '@trezor/react-utils';
import { AccountsState } from '@suite-common/wallet-core';
import { TokenDefinitionsState } from '@suite-common/token-definitions';
import { AssetLogoProps } from '@trezor/components';

export type UseCoinmarketProps = WithSelectedAccountLoadedProps;
export type UseCoinmarketCommonProps = UseCoinmarketProps & {
    type: CoinmarketTradeType;
};
export interface UseCoinmarketCommonReturnProps {
    callInProgress: boolean;
    account: Account;
    timer: Timer;
    device: TrezorDevice | undefined;
    setCallInProgress: (state: boolean) => void;
    checkQuotesTimer: (callback: () => Promise<void>) => void;
}
export type CoinmarketPageType = 'form' | 'offers' | 'confirm';
export type UseCoinmarketFormProps = UseCoinmarketProps & {
    /**
     * Difference between form and offers is that on the offers page are used all data filled in the form
     * but on the form page we prefill form with only some data from draft
     *
     * default value is 'form'
     */
    pageType?: CoinmarketPageType;
};

export type CoinmarketTradeBuyType = 'buy';
export type CoinmarketTradeSellType = 'sell';
export type CoinmarketTradeExchangeType = 'exchange';
export type CoinmarketTradeType =
    | CoinmarketTradeBuyType
    | CoinmarketTradeSellType
    | CoinmarketTradeExchangeType;
export type CoinmarketTradeBuySellType = Exclude<CoinmarketTradeType, CoinmarketTradeExchangeType>;
export type CoinmarketTradeSellExchangeType = Exclude<CoinmarketTradeType, CoinmarketTradeBuyType>;
export type CoinmarketTradeBuyExchangeType = Exclude<CoinmarketTradeType, CoinmarketTradeSellType>;

export type CoinmarketTradeMapProps = {
    buy: TradeBuy;
    sell: TradeSell;
    exchange: TradeExchange;
};

export type CoinmarketTradeDetailType = BuyTrade | SellFiatTrade | ExchangeTrade;
export type CoinmarketTradeDetailBuySellType = BuyTrade | SellFiatTrade;

export type CoinmarketTradeDetailMapProps = {
    buy: BuyTrade;
    sell: SellFiatTrade;
    exchange: ExchangeTrade;
};
export type CoinmarketTradeBuySellDetailMapProps = Omit<CoinmarketTradeDetailMapProps, 'exchange'>;

export type CoinmarketTradeInfoMapProps = {
    buy: BuyInfo;
    sell: SellInfo;
    exchange: ExchangeInfo;
};

export type CoinmarketWatchTradeResponseMapProps = {
    buy: WatchBuyTradeResponse;
    sell: WatchSellTradeResponse;
    exchange: WatchExchangeTradeResponse;
};

export interface CoinmarketGetTypedTradeProps {
    trades: Trade[];
    tradeType: CoinmarketTradeType;
    transactionId: string | undefined;
}

export type CoinmarketTradeStatusType = BuyTradeStatus | SellTradeStatus | ExchangeTradeStatus;

export interface CoinmarketGetDetailDataProps {
    coinmarket: State;
    tradeType: TradeType;
}

export interface CoinmarketGetTypedInfoTradeProps {
    coinmarket: State;
    tradeType: CoinmarketTradeType;
}

export interface CoinmarketUseWatchTradeProps<T extends CoinmarketTradeType> {
    account: Account | undefined;
    trade: CoinmarketTradeMapProps[T] | undefined;
}

export interface CoinmarketWatchTradeProps<T extends CoinmarketTradeType> {
    trade: CoinmarketTradeMapProps[T];
    account: Account;
    refreshCount: number;
    dispatch: Dispatch<AnyAction>;
    removeDraft: (key: string) => void;
}

export type CoinmarketPaymentMethodProps = BuyCryptoPaymentMethod | '';

export interface CoinmarketPaymentMethodListProps extends Option {
    value: CoinmarketPaymentMethodProps;
    label: string;
}

export interface CoinmarketCryptoListProps {
    value: CryptoId;
    label: string; // token shortcut
    cryptoName: string | undefined; // full name
}

export type CoinmarketUtilsProvidersProps = {
    [name: string]: {
        logo: string;
        companyName: string;
        brandName?: string;
    };
};

export interface CoinmarketInfoProps {
    cryptoIdToPlatformName: (cryptoId: CryptoId) => string | undefined;
    cryptoIdToCoinSymbol: (cryptoId: CryptoId) => string | undefined;
    buildCryptoOptions: (
        cryptoIds: Set<CryptoId>,
        excludedCryptoIds?: Set<CryptoId>,
    ) => CoinmarketOptionsGroupProps[];
    buildDefaultCryptoOption: (cryptoId: CryptoId) => CoinmarketCryptoListProps;
}

export interface CoinmarketCoinLogoProps {
    cryptoId: CryptoId;
    size?: 20 | 24;
    margin?: AssetLogoProps['margin'];
    className?: string;
}

export interface CoinmarketOptionsGroupProps {
    translationId: ExtendedMessageDescriptor['id'];
    networkName?: string;
    options: CoinmarketCryptoListProps[];
}

export interface CoinmarketGetSortedAccountsProps {
    accounts: AccountsState;
    deviceState: string | undefined;
}

export interface CoinmarketBuildAccountOptionsProps extends CoinmarketGetSortedAccountsProps {
    accountLabels: Record<string, string | undefined>;
    defaultAccountLabelString: ({
        accountType,
        symbol,
        index,
    }: {
        accountType: Account['accountType'];
        symbol: Account['symbol'];
        index?: number;
    }) => string;
    supportedCryptoIds: Set<CryptoId> | undefined;
    tokenDefinitions: Partial<TokenDefinitionsState>;
}

export interface CoinmarketAccountOptionsGroupOptionProps extends CoinmarketCryptoListProps {
    balance: string;
    descriptor: string;
    decimals: number;
    contractAddress?: string;
    accountType?: AccountType;
}

export interface CoinmarketAccountsOptionsGroupProps {
    label: string;
    options: CoinmarketAccountOptionsGroupOptionProps[];
}

export type CoinmarketFiatCurrenciesProps = Map<FiatCurrencyCode, string>;

export interface CoinmarketGetAmountLabelsProps {
    type: CoinmarketTradeType;
    amountInCrypto: boolean;
}

export type CoinmarketPayGetLabelType =
    | Extract<ExtendedMessageDescriptor['id'], `TR_COINMARKET_YOU_${'PAY' | 'GET' | 'RECEIVE'}`>
    | 'TR_COINMARKET_EXCHANGE'
    | 'TR_COINMARKET_EXCHANGE_AMOUNT';

export interface CoinmarketGetAmountLabelsReturnProps {
    inputLabel: CoinmarketPayGetLabelType;
    offerLabel: CoinmarketPayGetLabelType;
    labelComparatorOffer: Extract<
        ExtendedMessageDescriptor['id'],
        `TR_COINMARKET_YOU_WILL_${'PAY' | 'GET'}`
    >;
    sendLabel: CoinmarketPayGetLabelType;
    receiveLabel: CoinmarketPayGetLabelType;
}

export type CoinmarketGetProvidersInfoProps =
    | {
          [name: string]: BuyProviderInfo | SellProviderInfo | ExchangeProviderInfo;
      }
    | undefined;

export type CoinmarketExchangeProvidersInfoProps = {
    [key: string]: ExchangeProviderInfo;
};

export interface CoinmarketGetFiatCurrenciesProps {
    supportedFiatCurrencies: Set<string> | undefined;
    defaultAmountsOfFiatCurrencies?: Map<FiatCurrencyCode, string>;
}

export interface CoinmarketGetCryptoQuoteAmountProps {
    amountInCrypto?: boolean | undefined;
    sendAmount: string;
    sendCurrency: CryptoId | string | undefined;
    receiveAmount: string;
    receiveCurrency: CryptoId | undefined;
}

export interface CoinmarketGetPaymentMethodProps {
    paymentMethod?: BuyCryptoPaymentMethod | SellCryptoPaymentMethod;
    paymentMethodName?: string;
}
