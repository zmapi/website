---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
---

## Why ZMAPI?

ZMAPI provides a single API for financial market data, executions and account information. Writing code against single API has massive benefits in terms of development time and quality of the source code. Many financial applications, such as order algorithms or risk management middleware, have to be completely bug free and need to be tested for long time in variety of environments. You don't want to change this kind of code when switching to a different market data vendor or execution venue.

ZMAPI-like solutions have been written in-house in financial institutions over and over again with great accumulated cost. Financial world is ran by greed and such frameworks are never published for free for that reason. There can be a way to monetize such a framework by making it proprietary and other reason could be the fear that competitors would gain from such publications.

Software space is quickly getting dominated by high-quality open-source projects and even the biggest proponents of proprietary software have been forced to get more flexible with their approaches in order to survive. Financial applications are one of the last remaining domains where proprietary software is still considered the gold standard. Many financial firms boast with proprietary technologies and somehow the word proprietary has a highly positive connotation. It's time for the old fashioned financial industry to wake up to the reality and investigate how they can benefit from open collaboration.

## Why ZMQ?

TODO: write about rationale choosing ZMQ.


## Is ZMAPI suitable for HFT?

Performance of ZMAPI is very good when zero-copy binary encoding, such as SBE, is used with native and optimized middleware modules. Middleware modules introduce a tiny latency in the message processing. If your HFT software cannot tolerate a latency increase of couple hundred microseconds then you probably should look for a solution without middleware modules. Most clearing firms require pre-order risk management from traders for a good reason so risk managing middleware modules may be required anyway, making it impossible to drop the middleware modules of the picture. ZMQ sockets have been performance tested and they don't seem to introduce any noticeable latency increase or throughput decrease over the native socket libraries.

TODO: publish the performance test results.

## What has ZMAPI to do with FIX?

ZMAPI is using messaging format that is adapted from FIX. It's taking all the applicable elements of FIX messaging to ZMAPI and leaving some unnecessary or redundant elements out. ZMAPI messages can be conveniently described with help of a [FIX dictionary](https://fixplorer.zmapi.org). Check out [this page](difference-between-fix-and-zmapi) for more information.

## Why ZMTickerID?

ZMInstrumentID is arbitrary string that can be sometimes quite long. Sending long strings in every market data PUB message is a performance/bandwidth killer. ZMTickerID is simply an intereger, typically quite small one. It's very compact and quick to handle. Middleware modules are expecting to get ZMTickerID instead of ZMInstrumentID so it must be provided by connector.


