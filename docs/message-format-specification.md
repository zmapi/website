---
id: message-format-specification
title: Message Format Specification
---

## Message Framing

### REQ/REP Messages

<img style="float: left; margin-bottom: 20px;" src="assets/msg_frames_req_rep.png"/>
<div style="clear: both;"/>

**Frames:**
- Identity frames terminated with null frame (""). One or more frames containing the identity chain of the message. Used for ZMQ routing. Client doesn't have to care about these frames if REQ ZMQ socket type is used. Client has to prepend message with null frame ("") if ROUTER ZMQ socket type is used.
- msg_id is the message id of the message. Client needs to specify msg_id for each message so that the response can be paired with the request. Response message will have the same msg_id.
- Last frame of the message is the actual payload.

### PUB Messages

<img style="float: left; margin-bottom: 20px;" src="assets/msg_frames_pub.png"/>
<div style="clear: both;"/>

**Frames:**
- First frame is the topic of the message.
- Second frame is the actual payload.

#### PUB Topic Format

Topic frame of a PUB message contains the endpoint address of the publisher connector followed by a null byte. This will be empty if there is no *hub* module in the module tree.

## Payload Encoding

Payloads are encoded with a codec specified by the first byte of the payload (codec byte).

|Byte|ASCII Value|Codec|
|-|-|-|
|0x20|" "|JSON|
|0x46|"F"|Plain FIX|
|0x53|"S"|Simple Binary Encoding (SBE)|

### JSON Codec

#### Structure:

```json
{
	"Header": {
		"MsgType": "...",
		"SendingTime": "...",
		...
	},
	"Body": {
		...
	}
}
```

#### Special Conversions:

*RepeatingGroup* with single field is simplified to a list.

```
{
	"NoMarketSegments": ["bitstamp", "bittrex", "gemini"]
}
```

*RepeatingGroup* with single char type field is simplified to string:

```
{
	"NoMDEntryTypes": "01278B"
}
```

*RepeatingGroup* with many fields is using the full syntax:

```
{
	"NoLegs: [
		{
			"ZMLegInstrumentID": "GLD",
			"Quantity": 1,
			"Side": "1"
		},
		{
			"ZMLegInstrumentID": "SLV",
			"Quantity": 50,
			"Side": "2"
		}
	]	
}
```

#### Numbers:

JSON standard specifies just one number type for a real number. There is no distinction between floating point numbers or integers. It would be technically possible to mark integers without decimal part and floating point numbers with decimal parts and indeed some parsers do make this distinction (i.e. Python's JSON parser). However such distinction cannot be relied upon because it is not a standardized feature of JSON standard and many parsers do not consider such distinction important at all (i.e. Javascript's JSON parser). If distinction between integer and floating point number is important then this information must be conveyed by some other means.

#### Extra Notes:

JSON is human readable, easy-to-use format that is recommended for prototyping and interactive development.

### Plain FIX Codec

Plain FIX has a few extra fields that have to be present in every message.
- 8 (BeginString)
- 9 (BodyLength)
- 10 (CheckSum)

#### Structure:

```text
8=ZMAPI|9={MSGLEN}|35=...|10024=...|...|10={CHECKSUM}

{MSGLEN}: calculated length of the message
{CHECKSUM}: caclculated checksum of the message
|: Delimiter byte

```

ZMAPI is used as FIX version in ZMAPI internal messages.

#### Notes:

Plain FIX is not recommended to be used in ZMAPI messaging as it is harder to use and harder to use and read than JSON and less performant than SBE.

### SBE Codec

[Simple Binary Encoding (SBE)](https://github.com/real-logic/simple-binary-encoding) is ultra fast sequential zero-copy binary codec for those who require maximum performance. SBE requires specific schemas which these can be requested from upstream (TODO: define this!).

#### Special conversions:

*RepeatingGroup* is represented as *group* element in the schema. Exception to this rule is repeating group that contains single *char* field. This kind of repeating group is be represented as *data* element.

*str* is represented as a *data* element.

*RawData* is represented as a *data* element.

TODO: find out all the special cases necessary to standardize here.

#### Example:

Schema that contains (partial) MarketDataIncrementalRefresh message type:

```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sbe:messageSchema xmlns:sbe="http://fixprotocol.io/2016/sbe"
                              package="zmapi"
                              id="1"
                              version="1"
                              semanticVersion="5.2"
                              description="ZMAPI Schema"
                              byteOrder="bigEndian">
  <types>
    <composite name="messageHeader"
      description="Message identifiers and length of message root">
      <type name="blockLength" primitiveType="uint16"/>
      <type name="templateId" primitiveType="uint16"/>
      <type name="schemaId" primitiveType="uint16"/>
      <type name="version" primitiveType="uint16"/>
    </composite>
    <composite name="groupSizeEncoding" description="Repeating group dimensions">
      <type name="blockLength" primitiveType="uint16"/>
      <type name="numInGroup" primitiveType="uint16"/>
    </composite>
    <composite name="varStringEncoding">
      <type name="length" primitiveType="uint16"/>
      <type name="varData" primitiveType="uint8" length="0" characterEncoding="UTF-8"/>
    </composite>
    <composite name="varDataEncoding">
      <type name="length" primitiveType="uint16"/>
      <type name="varData" primitiveType="uint8" length="0"/>
    </composite>
  </types>

	<types>
    <enum name="AggressorSide" encodingType="char">
			<validValue name="Buy">1</validValue>
			<validValue name="Sell">2</validValue>
    </enum>
	</types>

  <sbe:message name="MarketDataIncrementalRefresh" id="1">
		<field name="ZMSendingTime" id="10024" type="uint64"/>
		<group name="ZMNoMDIncEntries" id="10004" dimensionType="groupSizeEncoding">
      <field name="MDUpdateAction" id="279" type="char"/>
      <field name="MDEntryType" id="269" type="char"/>
      <field name="MDEntryPx" id="270" type="double"/>
      <field name="MDEntrySize" id="271" type="double"/>
			<field name="TransactTime" id="60" type="uint64"/>
      <field name="AggressorSide" id="2446" type="AggressorSide"/>
      <field name="ZMTickerID" id="10007" type="uint64"/>
			<field name="MDPriceLevel" id="1023" type="uint16"/>
		</group>
		<data name="MarketID" id="1301" type="varStringEncoding"/>
  </sbe:message>

</sbe:messageSchema>
```

Encoded message:

```text
Message in hexadecimals (104 bytes):

0008000100010001156605fbaf92080000250002303240b8a80000000000
4008f7ced916872b156605fbaea70c00310000000000000001ffff323140
b8a800000000007ff8000000000000156605fbaea70c0000000000000000
0001000100086269747374616d70

Split into pieces:

00 08                     blockLength (8)
00 01                     templateId (1)
00 01                     schemaId (1)
00 01                     version (1)

15 66 05 fb af 92 08 00   ZMSendingTime (1541926500961486848)
00 25                     blockLength (37)
00 02                     numInGroup (2)
30                        MDUpdateAction ('0')
32                        MDEntryType ('2')
40 b8 a8 00 00 00 00 00   MDEntryPx (6312.00)
40 08 f7 ce d9 16 87 2b   MDEntrySize ()
15 66 05 fb ae a7 0c 00   TransactTime (1541926500946086912)
31                        AggressorSide ('1')
00 00 00 00 00 00 00 01   ZMTickerID ('1')
ff ff                     MDPriceLevel (not set)
32                        MDUpdateAction ('2')
31                        MDEntryType('1')
40 b8 a8 00 00 00 00 00   MDEntryPx (6312.00)
7f f8 00 00 00 00 00 00   MDEntrySize (not set)
15 66 05 fb ae a7 0c 00   TransactTime (1541926500946086912)
00                        AggressorSide (not set)
00 00 00 00 00 00 00 01   ZMTickerID ('1')
00 00                     MDPriceLevel (not set)
00 08                     length (8)
62 69 74 73 74 61 6d 70   "bitstamp"
```

#### Notes:

SBE is a great option if maximum performance is needed.
