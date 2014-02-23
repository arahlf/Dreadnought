(function() {

    function DntBaseClass() {}

    DntBaseClass.prototype.constructor = function() {};

    DntBaseClass.prototype.callParent = function(args) {
        var method = arguments.callee.caller;
        var parentClassMethod = method.$owner.$parentClass.prototype[method.$name];

        if (!parentClassMethod) {
            throw new Error('No parent class method found for ' + method.$owner.$className + '#' + method.$name);
        }

        return parentClassMethod.apply(this, args);
    };


    window.Dnt = {

        WIDTH: 600,
        HEIGHT: 400,

        abstractFn: function() {
            throw new Error('Dnt.abstractFn called directly.');
        },

        define: function(className, parentClass, members) {

            if (arguments.length == 2) {
                members = parentClass;
                parentClass = DntBaseClass;
            }

            var namespaces = className.split('.');
            var namespace = window;
            var simpleName = namespaces[namespaces.length - 1];

            for (var i = 0 ; i < namespaces.length - 1; i++) {
                var nextNamespaceName = namespaces[i];

                if (!namespace[nextNamespaceName]) {
                    namespace[nextNamespaceName] = {};
                }

                namespace = namespace[nextNamespaceName];
            }

            eval('function ' + simpleName + '() { this.constructor.apply(this, arguments); }');

            var classFunction = eval(simpleName);

            namespace[simpleName] = classFunction;

            if (parentClass) {
                classFunction.prototype = Object.create(parentClass.prototype);
            }

            classFunction.prototype.$parentClass = parentClass;
            classFunction.prototype.$className = className;

            window[className] = classFunction;

            var name, member;
            var prototype = classFunction.prototype;

            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];

                    if (typeof member === 'function') {
                        member.$name = name;
                        member.$owner = prototype;
                    }

                    prototype[name] = member;
                }
            }
        }
    };
})();
