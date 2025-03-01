/*!-----------------------------------------------------------
* Copyright (c) IJS Technologies. All rights reserved.
* Released under dual AGPLv3/commercial license
* https://ijs.network
*-----------------------------------------------------------*/
import * as W3 from 'web3';
import { BigNumber } from 'bignumber.js';
import { Erc20 } from './contracts/erc20';
import { IAbiDefinition, MessageTypes, TypedMessage } from './types';
export declare function toString(value: any): any;
export declare function stringToBytes32(value: string | stringArray): string | string[];
export declare function stringToBytes(value: string | stringArray, nByte?: number): string | string[];
export declare type stringArray = string | _stringArray;
export interface _stringArray extends Array<stringArray> {
}
export interface IWalletUtils {
    fromDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
    fromWei(value: any, unit?: string): string;
    hexToUtf8(value: string): string;
    sha3(value: string): string;
    stringToBytes(value: string | stringArray, nByte?: number): string | string[];
    stringToBytes32(value: string | stringArray): string | string[];
    toDecimals(value: BigNumber | number | string, decimals?: number): BigNumber;
    toString(value: any): string;
    toUtf8(value: any): string;
    toWei(value: string, unit?: string): string;
}
export interface IWalletTransaction {
    hash: string;
    nonce: number;
    blockHash: string | null;
    blockNumber: number | null;
    transactionIndex: number | null;
    from: string;
    to: string | null;
    value: string;
    gasPrice: string;
    maxPriorityFeePerGas?: number | string | BigNumber;
    maxFeePerGas?: number | string | BigNumber;
    gas: number;
    input: string;
}
export interface IWalletBlockTransactionObject {
    number: number;
    hash: string;
    parentHash: string;
    nonce: string;
    sha3Uncles: string;
    logsBloom: string;
    transactionRoot: string;
    stateRoot: string;
    receiptsRoot: string;
    miner: string;
    extraData: string;
    gasLimit: number;
    gasUsed: number;
    timestamp: number | string;
    baseFeePerGas?: number;
    size: number;
    difficulty: number;
    totalDifficulty: number;
    uncles: string[];
    transactions: IWalletTransaction[];
}
export interface ITokenInfo {
    name: string;
    symbol: string;
    totalSupply: BigNumber;
    decimals: number;
}
export interface IBatchRequestResult {
    key: string;
    result: any;
}
export interface IBatchRequestObj {
    batch: any;
    promises: Promise<IBatchRequestResult>[];
    execute: (batch: IBatchRequestObj, promises: Promise<IBatchRequestResult>[]) => Promise<IBatchRequestResult[]>;
}
export interface IWallet {
    account: IAccount;
    accounts: Promise<string[]>;
    address: string;
    balance: Promise<BigNumber>;
    balanceOf(address: string): Promise<BigNumber>;
    _call(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<any>;
    chainId: number;
    createAccount(): IAccount;
    decode(abi: any, event: Log | EventLog, raw?: {
        data: string;
        topics: string[];
    }): Event;
    decodeErrorMessage(msg: string): any;
    decodeEventData(data: Log, events?: any): Promise<Event>;
    decodeLog(inputs: any, hexString: string, topics: any): any;
    defaultAccount: string;
    getAbiEvents(abi: any[]): any;
    getAbiTopics(abi: any[], eventNames: string[]): any[];
    getBlock(blockHashOrBlockNumber?: number | string, returnTransactionObjects?: boolean): Promise<IWalletBlockTransactionObject>;
    getBlockNumber(): Promise<number>;
    getBlockTimestamp(blockHashOrBlockNumber?: number | string): Promise<number>;
    getChainId(): Promise<number>;
    getContractAbi(address: string): any;
    getContractAbiEvents(address: string): any;
    getTransaction(transactionHash: string): Promise<Transaction>;
    methods(...args: any): Promise<any>;
    privateKey: string;
    recoverSigner(msg: string, signature: string): Promise<string>;
    registerAbi(abi: any[] | string, address?: string | string[], handler?: any): string;
    registerAbiContracts(abiHash: string, address: string | string[], handler?: any): any;
    send(to: string, amount: number): Promise<TransactionReceipt>;
    _send(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<any>;
    scanEvents(fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string | string[]): Promise<Event[]>;
    scanEvents(params: {
        fromBlock: number;
        toBlock: number | string;
        topics?: any;
        events?: any;
        address?: string | string[];
    }): Promise<Event[]>;
    signMessage(msg: string): Promise<string>;
    signTransaction(tx: any, privateKey?: string): Promise<string>;
    soliditySha3(...val: any[]): string;
    toChecksumAddress(address: string): string;
    tokenInfo(address: string): Promise<ITokenInfo>;
    _txData(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<string>;
    _txObj(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<Transaction>;
    utils: IWalletUtils;
    verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
    multiCall(calls: {
        to: string;
        data: string;
    }[], gasBuffer?: string): Promise<{
        results: string[];
        lastSuccessIndex: BigNumber;
    }>;
    encodeFunctionCall<T extends IAbiDefinition, F extends Extract<keyof T, {
        [K in keyof T]: T[K] extends Function ? K : never;
    }[keyof T]>>(contract: T, methodName: F, params: string[]): string;
}
export interface IClientWallet extends IWallet {
    blockGasLimit(): Promise<number>;
    clientSideProvider: ClientSideProvider;
    connect(walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, providerOptions?: IClientProviderOptions): Promise<any>;
    disconnect(): Promise<void>;
    getGasPrice(): Promise<BigNumber>;
    getTransaction(transactionHash: string): Promise<Transaction>;
    getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;
    isConnected: boolean;
    newContract(abi: any, address?: string): IContract;
    provider: any;
    registerEvent(abi: any, eventMap: {
        [topics: string]: any;
    }, address: string, handler: any): any;
    registerSendTxEvents(eventsOptions: ISendTxEventsOptions): void;
    sendSignedTransaction(signedTransaction: string): Promise<TransactionReceipt>;
    sendTransaction(transaction: Transaction): Promise<TransactionReceipt>;
    signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string>;
    switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean>;
    transactionCount(): Promise<number>;
    getNetworkInfo(chainId: number): INetwork;
    setNetworkInfo(network: INetwork): void;
    setMultipleNetworksInfo(networks: INetwork[]): void;
}
export interface IContractMethod {
    call: any;
    estimateGas(...params: any[]): Promise<number>;
    encodeABI(): string;
}
export interface IContract {
    deploy(params: {
        data: string;
        arguments?: any[];
    }): IContractMethod;
    methods: {
        [methodName: string]: (...params: any[]) => IContractMethod;
    };
}
export interface Event {
    name: string;
    address: string;
    blockNumber: number;
    logIndex: number;
    topics: string[];
    transactionHash: string;
    transactionIndex: number;
    data: any;
    rawData: any;
}
export interface Log {
    address: string;
    data: string;
    topics: Array<string>;
    logIndex: number;
    transactionHash?: string;
    transactionIndex: number;
    blockHash?: string;
    type?: string;
    blockNumber: number;
}
export interface EventLog {
    event: string;
    address: string;
    returnValues: any;
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    raw?: {
        data: string;
        topics: string[];
    };
}
export interface TransactionReceipt {
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    from: string;
    to: string;
    contractAddress?: string;
    cumulativeGasUsed: number;
    gasUsed: number;
    logs?: Array<Log>;
    events?: {
        [eventName: string]: EventLog | EventLog[];
    };
    status: boolean;
}
export interface Transaction {
    from?: string;
    to?: string;
    nonce?: number;
    gas?: number;
    gasPrice?: BigNumber;
    data?: string;
    value?: BigNumber;
}
export interface TransactionOptions {
    from?: string;
    nonce?: number;
    gas?: number;
    gasLimit?: number;
    gasPrice?: BigNumber | number;
    data?: string;
    value?: BigNumber | number;
}
export interface IKMS {
}
export interface IAccount {
    address: string;
    privateKey?: string;
    kms?: IKMS;
    sign?(): Promise<string>;
    signTransaction?(): Promise<any>;
}
export interface ITokenOption {
    address: string;
    symbol: string;
    decimals: number;
    image?: string;
}
export interface INetwork {
    chainId: number;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[];
}
export interface IClientSideProviderEvents {
    onAccountChanged?: (account: string) => void;
    onChainChanged?: (chainId: string) => void;
    onConnect?: (connectInfo: any) => void;
    onDisconnect?: (error: any) => void;
}
export declare type NetworksMapType = {
    [chainId: number]: INetwork;
};
export declare const DefaultNetworksMap: NetworksMapType;
export declare enum WalletPlugin {
    MetaMask = "metamask",
    Coin98 = "coin98",
    TrustWallet = "trustwallet",
    BinanceChainWallet = "binancechainwallet",
    ONTOWallet = "onto",
    WalletConnect = "walletconnect",
    BitKeepWallet = "bitkeepwallet"
}
export declare type WalletPluginConfigType = {
    [key in WalletPlugin]?: {
        provider: () => any;
        installed: () => boolean;
        homepage?: () => string;
    };
};
export declare const WalletPluginConfig: WalletPluginConfigType;
export interface IClientProviderOptions {
    infuraId?: string;
    callWithDefaultProvider?: boolean;
    [key: string]: any;
}
export declare class ClientSideProvider {
    protected wallet: Wallet;
    protected _events?: IClientSideProviderEvents;
    protected _options?: IClientProviderOptions;
    protected _isConnected: boolean;
    provider: any;
    readonly walletPlugin: WalletPlugin;
    onAccountChanged: (account: string) => void;
    onChainChanged: (chainId: string) => void;
    onConnect: (connectInfo: any) => void;
    onDisconnect: (error: any) => void;
    constructor(wallet: Wallet, walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, options?: IClientProviderOptions);
    get installed(): boolean;
    initEvents(): void;
    connect(): Promise<any>;
    disconnect(): Promise<void>;
    get isConnected(): boolean;
    addToken(option: ITokenOption, type?: string): Promise<boolean>;
    switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean>;
    addNetwork(options: INetwork): Promise<boolean>;
}
export declare class BinanceChainWalletProvider extends ClientSideProvider {
    switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<boolean>;
}
export declare class Web3ModalProvider extends ClientSideProvider {
    private web3Modal;
    constructor(wallet: Wallet, walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, options?: IClientProviderOptions);
    get installed(): boolean;
    private initializeWeb3Modal;
    connect(): Promise<any>;
    disconnect(): Promise<void>;
}
export declare function createClientSideProvider(wallet: Wallet, walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, providerOptions?: IClientProviderOptions): ClientSideProvider;
export interface ISendTxEventsOptions {
    transactionHash?: (error: Error, receipt?: string) => void;
    confirmation?: (receipt: any) => void;
}
export declare class Wallet implements IClientWallet {
    protected _web3: W3.default;
    protected _account: IAccount;
    private _accounts;
    private _provider;
    private _eventTopicAbi;
    private _eventHandler;
    protected _sendTxEventHandler: ISendTxEventsOptions;
    protected _contracts: {};
    protected _blockGasLimit: number;
    private _networksMap;
    chainId: number;
    clientSideProvider: ClientSideProvider;
    private _infuraId;
    private _utils;
    constructor(provider?: any, account?: IAccount | IAccount[]);
    private static readonly instance;
    static getInstance(): IWallet;
    static getClientInstance(): IClientWallet;
    static isInstalled(walletPlugin: WalletPlugin): boolean;
    get isConnected(): boolean;
    switchNetwork(chainId: number, onChainChanged?: (chainId: string) => void): Promise<any>;
    setDefaultProvider(): void;
    connect(walletPlugin: WalletPlugin, events?: IClientSideProviderEvents, providerOptions?: IClientProviderOptions): Promise<ClientSideProvider>;
    disconnect(): Promise<void>;
    get accounts(): Promise<string[]>;
    get address(): string;
    get account(): IAccount;
    set account(value: IAccount);
    get infuraId(): string;
    set infuraId(value: string);
    get networksMap(): NetworksMapType;
    getNetworkInfo(chainId: number): INetwork;
    setNetworkInfo(network: INetwork): void;
    setMultipleNetworksInfo(networks: INetwork[]): void;
    createAccount(): IAccount;
    decodeLog(inputs: any, hexString: string, topics: any): any;
    get defaultAccount(): string;
    set defaultAccount(address: string);
    getChainId(): Promise<number>;
    get provider(): any;
    set provider(value: any);
    sendSignedTransaction(tx: string): Promise<TransactionReceipt>;
    signTransaction(tx: any, privateKey?: string): Promise<string>;
    registerSendTxEvents(eventsOptions: ISendTxEventsOptions): void;
    private getContract;
    _call(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<any>;
    private _getMethod;
    _txObj(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<Transaction>;
    _send(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
    _txData(abiHash: string, address: string, methodName: string, params?: any[], options?: number | BigNumber | TransactionOptions): Promise<string>;
    _methods(...args: any[]): Promise<{
        to: any;
        data: any;
    }>;
    methods(...args: any): Promise<any>;
    get balance(): Promise<BigNumber>;
    balanceOf(address: string): Promise<BigNumber>;
    recoverSigner(msg: string, signature: string): Promise<string>;
    getBlock(blockHashOrBlockNumber?: number | string, returnTransactionObjects?: boolean): Promise<IWalletBlockTransactionObject>;
    getBlockNumber(): Promise<number>;
    getBlockTimestamp(blockHashOrBlockNumber?: number | string): Promise<number>;
    set privateKey(value: string);
    registerEvent(abi: any, eventMap: {
        [topics: string]: any;
    }, address: string, handler: any): void;
    private _abiHashDict;
    private _abiContractDict;
    private _abiAddressDict;
    private _abiEventDict;
    getAbiEvents(abi: any[]): any;
    getAbiTopics(abi: any[], eventNames?: string[]): any[];
    getContractAbi(address: string): any;
    getContractAbiEvents(address: string): any;
    registerAbi(abi: any[] | string, address?: string | string[], handler?: any): string;
    registerAbiContracts(abiHash: string, address: string | string[], handler?: any): void;
    decode(abi: any, event: Log | EventLog, raw?: {
        data: string;
        topics: string[];
    }): Event;
    decodeEventData(data: Log, events?: any): Promise<Event>;
    scanEvents(params: {
        fromBlock: number;
        toBlock: number | string;
        topics?: any;
        events?: any;
        address?: string | string[];
    }): Promise<Event[]>;
    scanEvents(fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string | string[]): Promise<Event[]>;
    send(to: string, amount: number | BigNumber): Promise<TransactionReceipt>;
    setBlockTime(time: number): Promise<any>;
    increaseBlockTime(value: number): Promise<any>;
    signMessage(msg: string): Promise<string>;
    signTypedDataV4(data: TypedMessage<MessageTypes>): Promise<string>;
    token(tokenAddress: string, decimals?: number): Erc20;
    tokenInfo(tokenAddress: string): Promise<ITokenInfo>;
    get utils(): IWalletUtils;
    verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
    private _gasLimit;
    blockGasLimit(): Promise<number>;
    getGasPrice(): Promise<BigNumber>;
    transactionCount(): Promise<number>;
    sendTransaction(transaction: Transaction): Promise<TransactionReceipt>;
    getTransaction(transactionHash: string): Promise<Transaction>;
    getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;
    call(transaction: Transaction): Promise<any>;
    newContract(abi: any, address?: string): IContract;
    decodeErrorMessage(msg: string): any;
    newBatchRequest(): Promise<IBatchRequestObj>;
    soliditySha3(...val: any[]): string;
    toChecksumAddress(address: string): string;
    multiCall(calls: {
        to: string;
        data: string;
    }[], gasBuffer?: string): Promise<{
        results: string[];
        lastSuccessIndex: BigNumber;
    }>;
    encodeFunctionCall<T extends IAbiDefinition, F extends Extract<keyof T, {
        [K in keyof T]: T[K] extends Function ? K : never;
    }[keyof T]>>(contract: T, methodName: F, params: string[]): string;
    get web3(): W3.default;
}
