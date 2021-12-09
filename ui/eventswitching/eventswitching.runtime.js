/* global TW */
TW.Runtime.Widgets.eventswitching = function () {
  var thisWidget = this;

  this.runtimeProperties = function () {
    return {
      'needsDataLoadingAndError': false
    };
  };

  this.renderHtml = function () {
    var html = '';
    html = '<div class="widget-content widget-eventswitching" style="display:none;"></div>';
    return html;
  };

  this.afterRender = function () {
  };

  this.serviceInvoked = function (serviceName) {
  };

  this.updateProperty = function (updatePropertyInfo) {
    if (updatePropertyInfo.TargetProperty === 'input') {
      this.setProperty("input", updatePropertyInfo.RawSinglePropertyValue);

      var inputValue = thisWidget.getProperty('input');
      var inputType = thisWidget.getProperty('inputType');
      var debugMode = thisWidget.getProperty('debugMode');
      var numberOfCases = thisWidget.getProperty('numberOfCases');

      if (debugMode) {
        console.log("EventSwitching -> Start");
        console.log("EventSwitching -> inputType = " + inputType);
        console.log("EventSwitching -> inputValue = " + inputValue);
        console.log("EventSwitching -> numberOfCases = " + numberOfCases);
      }

      switch (inputType) {
        case "STRING":
          this.findCase(inputValue, debugMode, numberOfCases, (inputValue, value) => inputValue === value);
          break;
        case "INTEGER":
          this.findCase(parseInt(inputValue, 10), debugMode, numberOfCases, (inputValue, value) => {
            return eval("var x = inputValue;" + value);
          });
          break;
        case "NUMBER":
          this.findCase(parseFloat(inputValue), debugMode, numberOfCases, (inputValue, value) => {
            return eval("var x = inputValue;" + value);
          });
          break;
        case "DATETIME":
          this.findCase(new Date(inputValue), debugMode, numberOfCases, (inputValue, value) => {
            return eval("var x = inputValue;" + value);
          });
          break;
        case "BOOLEAN":
          this.jqElement.triggerHandler('Case' + (inputValue === 'true' || inputValue === true ? "True" : "False"));
          break;
      }

      if (debugMode) {
        console.log("EventSwitching -> Stop");
      }
    } else if (updatePropertyInfo.TargetProperty.startsWith("case")) {
      this.setProperty(updatePropertyInfo.TargetProperty, updatePropertyInfo.RawSinglePropertyValue);
    }
  };

  this.findCase = function (inputValue, debugMode, numberOfCases, predicate) {
    var found = false;
    for (var caseN = 1; caseN <= numberOfCases && !found; caseN++) {
      var value = this.getProperty('case' + caseN);
      if (predicate(inputValue, value)) {
        found = true;
        if (debugMode) {
          console.log("EventSwitching -> found Case N. " + caseN);
        }
        this.jqElement.triggerHandler('Case' + caseN);
      }
    }

    if (!found) {
      if (debugMode) {
        console.log("EventSwitching -> Case Default");
      }
      this.jqElement.triggerHandler('CaseDefault');
    }
  };
};