---
id: difference-between-fix-and-zmapi
title: Difference Between FIX and ZMAPI
sidebar_label: FIX vs ZMAPI
---

## Traditional FIX

Traditionally FIX is used with software libraries called FIX engines. There is one FIX engine on the client side and one FIX engine on the server side.

FIX engines have several responsibilities, such as:
- Manage session:
	- Increment message counters on each message and notify when messages are being dropped.
	- Servers need to store all the messages so that they can send them again if client requests a resend.
- Encode and decode FIX messages
	- When decoding, message integrity is checked with the checksum that is included as the last field of the message.
- Servers need to manage subscriptions based on request identifiers
	- Subscriptions are managed based on request identifiers. One subscription can include many different data streams. Different subscription may include the same data streams.
- Bidirectional heartbeats are sent to keep the connection alive. Missed heartbeats will declare the client dead.
- Servers need to be able to manage many simultaneous client connections and remove subscriptions from dead clients.
- All the messages are processed using one socket. There is no well defined messaging pattern. Client needs to know what to expect from server to know which message is response to their message and which one is simply a published data coming from an active subscription.

If middlewares are required then each middleware must run a server FIX engine and a client FIX engine.

Many FIX engine implementations are proprietary and some of them are quite expensive. FIX engines are available only to a limited subset of mainstream computer languages.

## ZMAPI

ZMAPI is not using FIX engines. ZMQ sockets are used with well defined messaging patterns and message types.

This approach has several advantages:
- Vastly simplified middleware modules. Middleware modules are the foundational feature of ZMAPI. If each middleware had to run FIX engine and FIX client that would introduce massive amounts of complexity and performance loss.
- Simplified connectors and client applications. FIX engine is quite a heavy requirement that can discourage people from getting involved.
- Request/reply pattern is using one socket, pub/sub pattern is using another socket. Client automatically knows which message is a response to a request and which message is published data coming from an active subscription. Client can filter subscriptions based on topic. Request/reply is using msg_id identifier to match requests to their responses.
- ZMQ manages sending arbitrary sized messages in all-or-nothing fashion. The receiving party will receive the full message or nothing. This completely eliminates the message level checksum checking and message framing/splitting requirement.
- Subsriptions are managed based on datastream identifiers (i.e. ZMInstrumentID). This greatly simplifies the design of the connectors. Most non-FIX vendor APIs simply don't provide capability to make multi-datastream subscriptions. This would be complicated to simulate in all such connectors.
- A middleware module (*submgr*) keeps track of all the subscriptions and removes subscriptions from dead clients. Therefore connectors don't need to bother checking the status of clients; it's done at the middleware level. Clients are expected to send heartbeat messages (or any other messages) to signal that they are still active.

ZMAPI modules (middleware and connectors) always handle multiple simultaneous client connections.
