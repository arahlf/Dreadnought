
DntTests.DntDefineTestFixture = function() {

    var output = [];

    // some class definitions that are used throughout the tests
    Dnt.define('DntTests.DntDefineTestFixture.ClassA', {
        constructor: function(a) {
            output.push('a#constructor');
            this.a = a;
        },
        foo: function() {
            output.push('a#foo');
        },
        bar: function() {
            output.push('a#bar');
        },
        baz: function() {
            output.push('a#baz');
            return 'a#baz';
        },
        yikes: function() {
            this.callParent();
        },
        run: Dnt.abstractFn
    });

    Dnt.define('DntTests.DntDefineTestFixture.ClassB', DntTests.DntDefineTestFixture.ClassA, {
        constructor: function(a, b) {
            this.callParent([a]);
            output.push('b#constructor');
            this.b = b;
        },
        foo: function() {
            this.callParent();
            output.push('b#foo');
        },
        bar: function() {
            this.callParent();
            output.push('b#bar');
        }
    });

    Dnt.define('DntTests.DntDefineTestFixture.ClassC', DntTests.DntDefineTestFixture.ClassB, {
        constructor: function(a, b, c) {
            this.callParent([a, b]);
            output.push('c#constructor');
            this.c = c;
        },
        foo: function() {
            this.callParent();
            output.push('c#foo');
        },
        baz: function() {
            var originalBaz = this.callParent();
            output.push('c#baz');
            return originalBaz + '-' + 'c#baz';
        }
    });

    this.ClassA = DntTests.DntDefineTestFixture.ClassA;
    this.ClassB = DntTests.DntDefineTestFixture.ClassB;
    this.ClassC = DntTests.DntDefineTestFixture.ClassC;

    this.output = output;
}