/* global TW */
TW.IDE.Widgets.eventswitching = function () {
  this.widgetIconUrl = function () {
    return '../Common/extensions/EventSwitchingWidget/ui/eventswitching/arrows.png';
  };

  this.widgetProperties = function () {
    return {
      'name': 'EventSwitching',
      'description': 'Widget to generate events to be sent in switching',
      'category': ['Common'],
      'iconImage': 'arrows.png',
      'properties': {
        'Width': {
          'description': 'width',
          'defaultValue': 200
        },
        'Height': {
          'description': 'height',
          'defaultValue': 28
        },
        'input': {
          'isBindingTarget': true,
          'description': 'The switch input',
          'baseType': "STRING",
          'isEditable': false
        },
        'inputType': {
          'description': 'The input type',
          'baseType': 'STRING',
          'defaultValue': 'STRING',
          'selectOptions': [
            {value: 'STRING', text: 'STRING'},
            {value: 'INTEGER', text: 'INTEGER'},
            {value: 'NUMBER', text: 'NUMBER'},
            {value: 'DATETIME', text: 'DATETIME'},
            {value: 'BOOLEAN', text: 'BOOLEAN'}
          ]
        },
        'numberOfCases': {
          'description': 'The cases number',
          'baseType': 'INTEGER',
          'defaultValue': 5
        },
        'debugMode': {
          'isVisible': true,
          'baseType': 'BOOLEAN',
          'isEditable': true,
          'defaultValue': false,
          'description': 'true to activate the debug'
        }
      }
    };
  };

  this.renderHtml = function () {
    return '<div class="widget-content widget-eventswitching">' + '<span class="eventswitching-property">Event Switching</span>' + '</div>';
  };

  this.afterRender = function () {
    this.addNewEventParameters(this.getProperty('inputType'), this.getProperty('numberOfCases'));
  };

  this.afterSetProperty = function (name, value) {
    if (name === 'inputType' || name === 'numberOfCases') {
      this.deleteOldEventParameters();

      switch (name) {
        case "inputType":
          this.addNewEventParameters(value, this.getProperty('numberOfCases'));
          break;
        case "numberOfCases":
          this.addNewEventParameters(this.getProperty('inputType'), value);
          break;
      }
    }

    return false;
  };

  this.deleteOldEventParameters = function () {
    var properties = this.allWidgetProperties().properties;

    for (var key in properties) {
      if (key.toLowerCase().startsWith("case")) {
        delete properties[key];
      }
    }
  };

  this.addNewEventParameters = function (inputType, numberOfCases) {
    var properties = this.allWidgetProperties().properties;
    properties["input"].baseType = inputType;
    properties["numberOfCases"].isVisible = inputType !== "BOOLEAN";

    if (properties["numberOfCases"].isVisible) {
      for (var caseN = 1; caseN <= numberOfCases; caseN++) {
        properties['case' + caseN] = {
          isBaseProperty: false,
          name: 'case' + caseN,
          type: 'property',
          description: 'Case N. ' + caseN + " (inputType = STRING -> it must contain the string to search, inputType = INTEGER/NUMBER/DATETIME -> it must contain the predicate to search eg. x<10||x>15, x<new Date(), etc.)",
          isBindingTarget: true,
          baseType: "STRING",
          isEditable: true,
          isVisible: true
        };

        properties['Case' + caseN] = {
          name: "Case" + caseN,
          type: "event",
          description: 'Event thrown if Case N. ' + caseN + ' occurs',
          isVisible: true
        };
      }

      properties['CaseDefault'] = {
        name: "CaseDefault",
        description: 'Event thrown if no case occurs',
        type: "event",
        isVisible: true
      };
    } else {
      properties['CaseTrue'] = {
        name: "CaseTrue",
        description: 'Event thrown if Case True occurs',
        type: "event",
        isVisible: true
      };
      properties['CaseFalse'] = {
        name: "CaseFalse",
        description: 'Event thrown if Case False occurs',
        type: "event",
        isVisible: true
      };
    }

    this.updatedProperties({
      updateUI: true
    });
  };
};