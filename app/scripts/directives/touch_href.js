// Generated by CoffeeScript 1.7.1
(function(window, angular) {

  /*
  angualr 指令
  目的是链接跳转采用touch事件模拟，跳转行为响应更快
   */
  'use strict';
  var IsAndroid, IsTouch, LOC, MOVE_BUFFER_RADIUS, NA, UA, WIN, getCoordinates, ngTouchHref;
  ngTouchHref = angular.module('binnng.touch.href', []);
  WIN = window;
  IsTouch = "ontouchend" in WIN;
  if (!IsTouch) {
    return false;
  }
  LOC = location;
  NA = WIN.navigator;
  UA = NA.userAgent;
  IsAndroid = /Android|HTC/i.test(UA) || /Linux/i.test(NA.platform + "");
  MOVE_BUFFER_RADIUS = IsAndroid ? 10 : 6;
  getCoordinates = function(event) {
    var e, touches;
    touches = event.touches && (event.touches.length ? event.touches : [event]);
    e = (event.changedTouches && event.changedTouches[0]) || (event.originalEvent && event.originalEvent.changedTouches && event.originalEvent.changedTouches[0]) || touches[0].originalEvent || touches[0];
    return {
      x: e.clientX,
      y: e.clientY
    };
  };
  return ngTouchHref.directive("ngHref", function() {
    return {
      link: function(scope, element, attrs) {
        var active, lastPos, onTouchCancel, onTouchEnd, onTouchMove, onTouchStart, startCoords, totalX, totalY, _ref;
        if (((_ref = element[0]) != null ? _ref.tagName.toUpperCase() : void 0) === "A") {
          totalX = totalY = 0;
          startCoords = lastPos = null;
          active = false;
          onTouchStart = function(event) {
            startCoords = getCoordinates(event);
            active = true;
            return lastPos = startCoords;
          };
          onTouchCancel = function(event) {
            return active = false;
          };
          onTouchMove = function(event) {
            var coords;
            if (!active && !startCoords) {
              return false;
            }
            coords = getCoordinates(event);
            totalX += Math.abs(coords.x - lastPos.x);
            totalY += Math.abs(coords.y - lastPos.y);
            lastPos = coords;
            if (totalX < MOVE_BUFFER_RADIUS && totalY < MOVE_BUFFER_RADIUS) {
              return false;
            }
            if (totalY > totalX) {
              return active = false;
            } else {
              return event.preventDefault();
            }
          };
          onTouchEnd = function(event) {
            if (!active) {
              return false;
            }
            active = false;
            if (typeof event.preventDefault === "function") {
              event.preventDefault();
            }
            if (typeof event.stopPropagation === "function") {
              event.stopPropagation();
            }
            return LOC["href"] = attrs.ngHref;
          };
          element.on("touchstart", onTouchStart);
          element.on("touchcancel", onTouchCancel);
          element.on("touchmove", onTouchMove);
          return element.on("touchend", onTouchEnd);
        }
      }
    };
  });
})(window, angular);
