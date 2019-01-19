---
id: design-principles
title: Design Principles
---

#### Wide coverage of features

ZMAPI attempts to support as wide coverage of features available in the universe of vendor APIs as possible as long as it can be standardized.

#### Ease of use is preferred over performance

ZMAPI seeks to minimize development time even though that may mean small losses in performance. Good example of this is use of middlewares. Middlewares bring additional hops in the message routing that has a tiny performance penalty. However that will also massively reduce code duplication and improve code quality.

#### High performance use cases are supported

ZMAPI supports high performance use cases with binary encoding such as SBE. When combined with optimized middleware compiled to native binaries it should be fast enough for everyone except the most performance critical HFT systems. If latency loss of couple hundred microseconds is too much for you then you may want to drop the middleware components out.

#### Simplicity is strictly preferred over complexity

The official FIX standard has many duplicate features with many inconsistencies. For example there are many kinds of rejection messages for different kinds of situations. Sometimes a failure condition is not even returned in a rejection message but instead in a normal message typically associated with success, stored in a field that indicates an error. Different kinds of failure messages have different datatypes for error types: some are char, some are int. This is very confusing to say at least. ZMAPI simply returns all error conditions in a ZMReject message that defines further details of the error condition.
