angular.module('Dreadnought')
    .directive("autoScroll", function(){
    return {
        link: function(scope, element, attr) {
            var scopeVariable = attr.autoScroll;
            var dom = element[0];

            if (!scopeVariable) {
                throw new Error('autoScroll directive requires attribute value naming scope variable to watch');
            }

            scope.$watch('messages', function() {
                dom.scrollTop = dom.scrollHeight;
            }, true);
        }
    }
});
