import * as W3 from 'web3';
import { BigNumber } from 'bignumber.js';
import { Erc20 } from './contracts/erc20';
declare module Wallet {
    interface IWalletUtils {
        fromWei(value: any, unit?: string): string;
        hexToUtf8(value: string): string;
        toUtf8(value: any): string;
        toWei(value: string, unit?: string): string;
    }
    interface IWalletTransaction {
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
    interface IWalletBlockTransactionObject {
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
    interface ITokenInfo {
        name: string;
        symbol: string;
        totalSupply: BigNumber;
        decimals: number;
    }
    interface IWallet {
        account: IAccount;
        accounts: Promise<string[]>;
        address: string;
        balance: Promise<BigNumber>;
        balanceOf(address: string): Promise<BigNumber>;
        chainId: number;
        createAccount(): IAccount;
        decode(abi: any, event: Log | EventLog, raw?: {
            data: string;
            topics: string[];
        }): Event;
        decodeEventData(data: Log, events?: any): Promise<Event>;
        decodeLog(inputs: any, hexString: string, topics: any): any;
        defaultAccount: string;
        getAbiEvents(abi: any[]): any;
        getAbiTopics(abi: any[], eventNames?: string[]): any[];
        getBlock(blockHashOrBlockNumber?: number | string, returnTransactionObjects?: boolean): Promise<IWalletBlockTransactionObject>;
        getBlockNumber(): Promise<number>;
        getBlockTimestamp(blockHashOrBlockNumber?: number | string): Promise<number>;
        getChainId(): Promise<number>;
        getContractAbi(address: string): any;
        getContractAbiEvents(address: string): any;
        methods(...args: any): Promise<any>;
        privateKey: string;
        provider: any;
        recoverSigner(msg: string, signature: string): Promise<string>;
        registerAbi(abi: any[] | string, address?: string | string[], handler?: any): string;
        registerAbiContracts(abiHash: string, address: string | string[], handler?: any): any;
        send(to: string, amount: number): Promise<TransactionReceipt>;
        scanEvents(fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string | string[]): Promise<Event[]>;
        signMessage(msg: string): Promise<string>;
        signTransaction(tx: any, privateKey?: string): Promise<string>;
        tokenInfo(address: string): Promise<ITokenInfo>;
        utils: IWalletUtils;
        verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
    }
    interface Event {
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
    interface Log {
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
    interface EventLog {
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
    interface TransactionReceipt {
        transactionHash: string;
        transactionIndex: number;
        blockHash: string;
        blockNumber: number;
        from: string;
        to: string;
        contractAddress: string;
        cumulativeGasUsed: number;
        gasUsed: number;
        logs?: Array<Log>;
        events?: {
            [eventName: string]: EventLog | EventLog[];
        };
        status: string;
    }
    interface Transaction {
        to: string;
        gas: number;
        data: string;
    }
    const Networks: {
        1: {
            chainId: number;
            chainName: string;
        };
        3: {
            chainId: number;
            chainName: string;
        };
        4: {
            chainId: number;
            chainName: string;
        };
        42: {
            chainId: number;
            chainName: string;
        };
        56: {
            chainId: string;
            chainName: string;
            rpcUrls: string[];
            blockExplorerUrls: string[];
            nativeCurrency: {
                decimals: number;
                name: string;
                symbol: string;
            };
        };
        97: {
            chainId: string;
            chainName: string;
            rpcUrls: string[];
            blockExplorerUrls: string[];
            nativeCurrency: {
                decimals: number;
                name: string;
                symbol: string;
            };
        };
        1287: {
            chainId: string;
            chainName: string;
            rpcUrls: string[];
            blockExplorerUrls: string[];
            nativeCurrency: {
                decimals: number;
                name: string;
                symbol: string;
            };
        };
    };
    interface IKMS {
    }
    interface IAccount {
        address: string;
        privateKey?: string;
        kms?: IKMS;
        sign?(): Promise<string>;
        signTransaction?(): Promise<any>;
    }
    interface ITokenOption {
        address: string;
        symbol: string;
        decimals: number;
        image?: string;
    }
    interface INetworkOption {
        chainId: string;
        chainName: string;
        nativeCurrency: {
            name: string;
            symbol: string;
            decimals: 18;
        };
        rpcUrls: string[];
        blockExplorerUrls?: string[];
        iconUrls?: string[];
    }
    class MetaMask {
        private wallet;
        constructor(wallet: Wallet);
        connect(): Promise<void>;
        get installed(): boolean;
        get provider(): any;
        addToken(option: ITokenOption, type?: string): Promise<boolean>;
        switchNetwork(chainId: number): Promise<boolean>;
        addNetwork(options: INetworkOption): Promise<boolean>;
    }
    interface ISendTxEventsOptions {
        transactionHash?: (error: Error, receipt?: string) => void;
        confirmation?: (confNumber: number, receipt: any) => void;
    }
    class Wallet implements IWallet {
        private _web3;
        private _account;
        private _accounts;
        private _kms;
        private _provider;
        private _abiHashDict;
        private _abiAddressDict;
        private _abiEventDict;
        private _eventHandler;
        private _sendTxEventHandler;
        private _contracts;
        private _blockGasLimit;
        private _metaMask;
        isMetaMask: boolean;
        chainId: number;
        onAccountChanged: (account: string) => void;
        onChainChanged: (chainId: string) => void;
        onConnect: (connectInfo: any) => void;
        onDisconnect: (error: any) => void;
        constructor(provider?: any, account?: IAccount | IAccount[]);
        get accounts(): Promise<string[]>;
        get address(): string;
        get account(): IAccount;
        set account(value: IAccount);
        createAccount(): IAccount;
        decodeLog(inputs: any, hexString: string, topics: any): any;
        get defaultAccount(): string;
        set defaultAccount(address: string);
        getChainId(): Promise<number>;
        get metaMask(): MetaMask;
        get provider(): any;
        sendSignedTransaction(tx: string): Promise<any>;
        signTransaction(tx: any, privateKey?: string): Promise<string>;
        registerSendTxEvents(eventsOptions: ISendTxEventsOptions): void;
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
        initKMS(value?: IKMS): Promise<void>;
        private get kms();
        set privateKey(value: string);
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
        scanEvents(fromBlock: number, toBlock: number | string, topics?: any, events?: any, address?: string | string[]): Promise<Event[]>;
        send(to: string, amount: number): Promise<TransactionReceipt>;
        setBlockTime(time: number): Promise<any>;
        signMessage(msg: string): Promise<string>;
        token(tokenAddress: string, decimals?: number): Erc20;
        tokenInfo(tokenAddress: string): Promise<ITokenInfo>;
        get utils(): IWalletUtils;
        verifyMessage(account: string, msg: string, signature: string): Promise<boolean>;
        get web3(): W3.default;
    }
}
export = Wallet;
