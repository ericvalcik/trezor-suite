import {
    CoinmarketAccountOptionsGroupOptionProps,
    CoinmarketCryptoListProps,
    CoinmarketGetCryptoQuoteAmountProps,
    CoinmarketGetProvidersInfoProps,
    CoinmarketPaymentMethodListProps,
    CoinmarketPaymentMethodProps,
    CoinmarketTradeBuyType,
    CoinmarketTradeDetailMapProps,
    CoinmarketTradeDetailType,
    CoinmarketTradeExchangeType,
    CoinmarketTradeSellExchangeType,
    CoinmarketTradeSellType,
    CoinmarketTradeType,
} from 'src/types/coinmarket/coinmarket';
import type { Account } from 'src/types/wallet';
import { Network, NetworkCompatible } from '@suite-common/wallet-config';
import type { BuyInfo } from 'src/actions/wallet/coinmarketBuyActions';
import type { FieldValues, UseFormReturn, FieldPath } from 'react-hook-form';
import type {
    BankAccount,
    BuyCryptoPaymentMethod,
    BuyTrade,
    CryptoId,
    ExchangeTrade,
    ExchangeTradeQuoteRequest,
    FiatCurrencyCode,
    SellCryptoPaymentMethod,
    SellFiatTrade,
} from 'invity-api';
import { Timer } from '@trezor/react-utils';
import { AppState } from 'src/reducers/store';
import { ExtendedMessageDescriptor } from 'src/types/suite';
import { PropsWithChildren } from 'react';
import {
    AmountLimits,
    CryptoAmountLimits,
    Option,
    TradeSell,
} from 'src/types/wallet/coinmarketCommonTypes';
import {
    FeeInfo,
    FormState,
    PrecomposedLevels,
    PrecomposedLevelsCardano,
} from '@suite-common/wallet-types';
import { FeeLevel } from '@trezor/connect';
import { SendContextValues } from 'src/types/wallet/sendForm';
import { SellInfo } from 'src/actions/wallet/coinmarketSellActions';
import {
    CoinmarketExchangeStepType,
    CoinmarketSellStepType,
} from 'src/types/coinmarket/coinmarketOffers';
import { AccountsState } from '@suite-common/wallet-core';
import { ExchangeInfo } from 'src/actions/wallet/coinmarketExchangeActions';
import {
    FORM_EXCHANGE_CEX,
    FORM_EXCHANGE_DEX,
    FORM_RATE_FIXED,
    FORM_RATE_FLOATING,
} from 'src/constants/wallet/coinmarket/form';

export interface CoinmarketBuyFormProps {
    fiatInput?: string;
    cryptoInput?: string;
    currencySelect: Option;
    cryptoSelect: CoinmarketCryptoListProps;
    countrySelect: Option;
    paymentMethod?: CoinmarketPaymentMethodListProps;
    amountInCrypto: boolean;
}

export interface CoinmarketBuyFormDefaultValuesProps {
    defaultValues: CoinmarketBuyFormProps;
    defaultCountry: Option;
    defaultCurrency: Option;
    defaultPaymentMethod: CoinmarketPaymentMethodListProps;
    suggestedFiatCurrency: FiatCurrencyCode;
}

export interface CoinmarketSellFormProps extends FormState {
    sendCryptoSelect: CoinmarketAccountOptionsGroupOptionProps | undefined;
    paymentMethod?: CoinmarketPaymentMethodListProps;
    countrySelect: Option;
    amountInCrypto: boolean;
}

export type RateType = typeof FORM_RATE_FIXED | typeof FORM_RATE_FLOATING;
export type ExchangeType = typeof FORM_EXCHANGE_CEX | typeof FORM_EXCHANGE_DEX;

export interface CoinmarketExchangeFormProps extends FormState {
    receiveCryptoSelect: CoinmarketCryptoListProps | null;
    sendCryptoSelect: CoinmarketAccountOptionsGroupOptionProps | undefined;
    amountInCrypto: boolean;
    rateType: RateType;
    exchangeType: ExchangeType;
}

export type CoinmarketBuySellFormProps = CoinmarketBuyFormProps | CoinmarketSellFormProps;
export type CoinmarketSellExchangeFormProps = CoinmarketSellFormProps | CoinmarketExchangeFormProps;
export type CoinmarketAllFormProps =
    | CoinmarketBuyFormProps
    | CoinmarketSellFormProps
    | CoinmarketExchangeFormProps;

export interface CoinmarketSellFormDefaultValuesProps {
    defaultValues: CoinmarketSellFormProps;
    defaultCountry: Option;
    defaultCurrency: Option;
    defaultPaymentMethod: CoinmarketPaymentMethodListProps;
}

export interface CoinmarketExchangeFormDefaultValuesProps {
    defaultValues: CoinmarketExchangeFormProps;
    defaultCurrency: Option;
}

interface CoinmarketFormStateProps {
    isFormLoading: boolean;
    isFormInvalid: boolean;
    isLoadingOrInvalid: boolean;

    toggleAmountInCrypto: () => void;
}

export interface CoinmarketCommonFormProps {
    device: AppState['device']['selectedDevice'];
    callInProgress: boolean;
    timer: Timer;
    account: Account;
    network: Network;

    goToOffers: () => Promise<void>;
}

export interface CoinmarketCommonFormBuySellProps {
    defaultCountry: Option;
    defaultCurrency: Option;
    defaultPaymentMethod: CoinmarketPaymentMethodListProps;
    paymentMethods: CoinmarketPaymentMethodListProps[];
    amountLimits?: AmountLimits;
}

export interface CoinmarketBuyFormContextProps
    extends UseFormReturn<CoinmarketBuyFormProps>,
        CoinmarketCommonFormProps,
        CoinmarketCommonFormBuySellProps {
    type: CoinmarketTradeBuyType;
    buyInfo?: BuyInfo;
    cryptoInputValue?: string;
    quotesRequest: AppState['wallet']['coinmarket']['buy']['quotesRequest'];
    quotes: AppState['wallet']['coinmarket']['buy']['quotes'];
    selectedQuote: BuyTrade | undefined;
    addressVerified: string | undefined;
    // form - additional helpers for form
    form: {
        state: CoinmarketFormStateProps;
    };

    selectQuote: (quote: BuyTrade) => Promise<void>;
    confirmTrade: (address: string) => void;
    verifyAddress: (account: Account, address?: string, path?: string) => Promise<void>;
    removeDraft: (key: string) => void;
    setAmountLimits: (limits?: AmountLimits) => void;
}

export interface CoinmarketSellFormContextProps
    extends UseFormReturn<CoinmarketSellFormProps>,
        CoinmarketCommonFormProps,
        CoinmarketCommonFormBuySellProps {
    type: CoinmarketTradeSellType;
    isComposing: boolean;
    sellInfo?: SellInfo;
    localCurrencyOption: { label: string; value: string };
    composedLevels?: PrecomposedLevels | PrecomposedLevelsCardano;
    quotesRequest: AppState['wallet']['coinmarket']['sell']['quotesRequest'];
    feeInfo: FeeInfo;
    quotes: AppState['wallet']['coinmarket']['sell']['quotes'];
    selectedQuote?: SellFiatTrade;
    trade?: TradeSell;
    suiteReceiveAccounts?: AppState['wallet']['accounts'];
    sellStep: CoinmarketSellStepType;
    // form - additional helpers for form
    form: {
        state: CoinmarketFormStateProps;
        helpers: CoinmarketUseFormActionsReturnProps;
    };
    shouldSendInSats: boolean | undefined;
    changeFeeLevel: (level: FeeLevel['label']) => void;
    composeRequest: SendContextValues<CoinmarketSellExchangeFormProps>['composeTransaction'];
    setAmountLimits: (limits?: AmountLimits) => void;

    setSellStep: (step: CoinmarketSellStepType) => void;
    addBankAccount: () => void;
    confirmTrade: (bankAccount: BankAccount) => void;
    sendTransaction: () => void;
    needToRegisterOrVerifyBankAccount: (quote: SellFiatTrade) => boolean;
    selectQuote: (quote: SellFiatTrade) => void;
}

export interface CoinmarketExchangeFormContextProps
    extends UseFormReturn<CoinmarketExchangeFormProps>,
        CoinmarketCommonFormProps {
    type: CoinmarketTradeExchangeType;
    // form - additional helpers for form
    form: {
        state: CoinmarketFormStateProps;
        helpers: CoinmarketUseFormActionsReturnProps;
    };

    selectedQuote?: ExchangeTrade;
    trade?: TradeSell;
    suiteReceiveAccounts?: AccountsState;
    exchangeStep: CoinmarketExchangeStepType;
    feeInfo: FeeInfo;

    exchangeInfo?: ExchangeInfo;
    defaultCurrency: Option;
    amountLimits?: CryptoAmountLimits;
    composedLevels?: PrecomposedLevels | PrecomposedLevelsCardano;
    quotes: ExchangeTrade[] | undefined;
    dexQuotes: ExchangeTrade[] | undefined;
    quotesRequest: ExchangeTradeQuoteRequest | undefined;
    receiveAccount?: Account;
    addressVerified: string | undefined;
    shouldSendInSats: boolean | undefined;
    setReceiveAccount: (account?: Account) => void;
    setAmountLimits: (limits?: CryptoAmountLimits) => void;
    composeRequest: SendContextValues<CoinmarketSellExchangeFormProps>['composeTransaction'];
    changeFeeLevel: (level: FeeLevel['label']) => void;
    removeDraft: (key: string) => void;

    setExchangeStep: (step: CoinmarketExchangeStepType) => void;
    confirmTrade: (address: string, extraField?: string, trade?: ExchangeTrade) => Promise<boolean>;
    sendTransaction: () => void;
    selectQuote: (quote: ExchangeTrade) => void;
    verifyAddress: (account: Account, address?: string, path?: string) => Promise<void>;
}

export type CoinmarketFormMapProps = {
    buy: CoinmarketBuyFormContextProps;
    sell: CoinmarketSellFormContextProps;
    exchange: CoinmarketExchangeFormContextProps;
};

export type CoinmarketFormContextValues<T extends CoinmarketTradeType> = CoinmarketFormMapProps[T];

export type CoinmarketPaymentMethodHookProps<T extends CoinmarketTradeType> = {
    paymentMethods: CoinmarketPaymentMethodListProps[];
    getPaymentMethods: (
        quotes: CoinmarketTradeDetailMapProps[T][],
    ) => CoinmarketPaymentMethodListProps[];
    getQuotesByPaymentMethod: (
        quotes: CoinmarketTradeDetailMapProps[T][] | undefined,
        currentPaymentMethod: CoinmarketPaymentMethodProps,
    ) => CoinmarketTradeDetailMapProps[T][] | undefined;
};

export interface CoinmarketFormInputLabelProps extends PropsWithChildren {
    label?: ExtendedMessageDescriptor['id'];
}

export interface CoinmarketFormInputCommonProps {}

export interface CoinmarketFormInputDefaultProps
    extends CoinmarketFormInputLabelProps,
        CoinmarketFormInputCommonProps {}

export type CoinmarketFormStateMapProps = {
    buy: CoinmarketBuyFormProps;
    sell: CoinmarketSellFormProps;
    exchange: CoinmarketExchangeFormProps;
};

export interface CoinmarketFormInputCryptoSelectProps<TFieldValues extends FieldValues>
    extends CoinmarketFormInputDefaultProps {
    cryptoSelectName: FieldPath<TFieldValues>;
    supportedCryptoCurrencies: Set<CryptoId> | undefined;
    methods: UseFormReturn<TFieldValues>;
    openMenuOnInput?: boolean;
}

export interface CoinmarketFormInputFiatCryptoProps<TFieldValues extends FieldValues> {
    methods: UseFormReturn<TFieldValues>;
    cryptoInputName: FieldPath<TFieldValues>;
    fiatInputName: FieldPath<TFieldValues>;
    cryptoSelectName: FieldPath<TFieldValues>;
}

export interface CoinmarketFormInputFiatCryptoWrapProps<TFieldValues extends FieldValues> {
    showLabel?: boolean;
    methods: UseFormReturn<TFieldValues>;
    cryptoInputName: FieldPath<TFieldValues>;
    fiatInputName: FieldPath<TFieldValues>;
    cryptoSelectName: FieldPath<TFieldValues>;
    cryptoCurrencyLabel?: CryptoId;
    currencySelectLabel?: string;
}

export interface CoinmarketFormInputAccountProps<TFieldValues extends FieldValues> {
    label?: ExtendedMessageDescriptor['id'];
    accountSelectName: FieldPath<TFieldValues>;
    methods: UseFormReturn<TFieldValues>;
}

export interface CoinmarketFormInputCurrencyProps extends CoinmarketFormInputCommonProps {
    isClean?: boolean;
    size?: 'small' | 'large';
    isDarkLabel?: boolean;
}

export interface CoinmarketUseFormActionsProps<T extends CoinmarketSellExchangeFormProps> {
    account: Account;
    methods: UseFormReturn<T>;
    isNotFormPage: boolean;
    draftUpdated: CoinmarketSellExchangeFormProps | null;
    type: CoinmarketTradeSellExchangeType;
    handleChange: (offLoading?: boolean) => Promise<void>;
    setAmountLimits: (limits?: AmountLimits) => void;
    changeFeeLevel: (level: FeeLevel['label']) => void;
    composeRequest: SendContextValues<CoinmarketSellExchangeFormProps>['composeTransaction'];
    setAccountOnChange: (account: Account) => void;
}

export interface CoinmarketUseFormActionsReturnProps {
    isBalanceZero: boolean;

    onCryptoCurrencyChange: (selected: CoinmarketAccountOptionsGroupOptionProps) => Promise<void>;
    onFiatCurrencyChange: (value: FiatCurrencyCode) => void;
    setRatioAmount: (divisor: number) => void;
    setAllAmount: () => void;
}

export interface CoinmarketUseComposeTransactionProps<T extends CoinmarketSellExchangeFormProps> {
    account: Account;
    network: Network;
    methods: UseFormReturn<T>;
    values: T;
}

export interface CoinmarketUseComposeTransactionStateProps {
    account: Account;
    network: NetworkCompatible;
    feeInfo: FeeInfo;
}

export interface CoinmarketUseComposeTransactionReturnProps
    extends CoinmarketUseComposeTransactionStateProps {
    isComposing: boolean;
    composedLevels: PrecomposedLevels | PrecomposedLevelsCardano | undefined;
    feeInfo: FeeInfo;
    changeFeeLevel: (level: FeeLevel['label']) => void;
    composeRequest: SendContextValues<CoinmarketSellExchangeFormProps>['composeTransaction'];
}

export interface CoinmarketOfferCommonProps {
    account?: Account;
    selectedQuote: CoinmarketTradeDetailType;
    providers: CoinmarketGetProvidersInfoProps;
    type: CoinmarketTradeType;
    quoteAmounts: CoinmarketGetCryptoQuoteAmountProps | null;
    paymentMethod?: BuyCryptoPaymentMethod | SellCryptoPaymentMethod;
    paymentMethodName?: string;
}

export interface CoinmarketOfferBuyProps extends CoinmarketOfferCommonProps {
    selectedQuote: BuyTrade;
}

export interface CoinmarketOfferExchangeProps
    extends Omit<CoinmarketOfferCommonProps, 'paymentMethod' | 'paymentMethodName'> {
    selectedQuote: ExchangeTrade;
}

export interface CoinmarketSelectedOfferInfoProps extends CoinmarketOfferCommonProps {
    selectedAccount?: Account;
    transactionId?: string;
}
