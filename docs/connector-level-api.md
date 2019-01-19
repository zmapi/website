---
id: connector-level-api
title: Connector Level API
---

One of the most important design principles of ZMAPI is to keep connector modules and client applications as easy as possible. Making a full conversion from vendor API to ZMAPI is a process with many steps. Some of these steps can be reused and should not be programmed again every single time when new connector is written. That is where middleware modules enter in the picture. Middleware modules provide these standardization steps automatically so the connector only has to satisfy the "connector level API". Connector level API is made as simplistic as possible while most of the standardized heavy lifting is done by the middleware modules.

### Requirements

#### Required commands:

- ZMGetStatus
	- endpoint_name and session_id must be included.
	- session_id must be unique each time the module is started.
- SecurityListRequest
	- At least search by ZMInstrumentID must be supported.
	- ZMTickerID must be returned for each returned instrument.
- MarketDataRequest
	- At least unsynchronized snapshots or subscription must be supported. If only one is supported the other one will be simulated by the middleware modules.
- ZMListCapabilities
	- The list of capabilities must be accurately specified for downstream modules to work properly.
- ZMGetSubscriptions

#### Other requirements:

- ZMInstrumentID:
	- Connector must provide a unique ZMInstrumentID for each instrument. This identifier must be deterministic: same value must be returned on each session (when connector is restarted).
- ZMTickerID:
	- Must be generated for each ZMInstrumentID that has been requested from the connector.
	- ZMTickerID is emitted instead of ZMInstrumentID on all the PUB messages.
- MsgSeqNum:
	- Must be added on each PUB message and incremented by one.

