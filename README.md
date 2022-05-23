# EventSwitchingWidget
An extension to generate events to be sent in switching.

**This Extension is provided as-is and without warranty or support. It is not part of the PTC product suite and there is no PTC support.**

## Description
This extension provides a widget to generate an events to be sent in switching; given a value and a set of predicates, the widget provides an event for each predicate and triggers the event of the first verified predicate.

Predicates have the following meaning:
- if inputType = STRING then the predicate must contain the string to search
- if inputType = INTEGER/NUMBER/DATETIME then the predicate must contain the predicate to search eg. x<10||x>15, x<new Date(), etc.

## Properties
- debugMode - BOOLEAN (default = false): if set to true it sends to the browser's JS console a set of information useful for debugging the widget
- input - \<inputType\> (no default value): The switch input, the type depends on the inputType property
- inputType - STRING (default = 'STRING'): The input type (options: STRING, INTEGER, NUMBER, DATETIME, BOOLEAN)
- numberOfCases - INTEGER (default = 5): The cases number
- case1, ..., case\<numberOfCases\> - STRING (no default value): dynamic properties based on the value of numberOfCases, they are the predicates

## Events
- Case1, ..., Case\<numberOfCases\>: events thrown if cases occur
- CaseDefault: event thrown if no case occurs
- CaseTrue: event thrown if case false occurs
- CaseFalse: event thrown if case true occurs
  
## Donate
If you would like to support the development of this and/or other extensions, consider making a [donation](https://www.paypal.com/donate/?business=HCDX9BAEYDF4C&no_recurring=0&currency_code=EUR).
