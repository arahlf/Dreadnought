
DreadTests.DreadTestFixture = function() {

    var output = [];

    // some class definitions that are used throughout the tests
    Dread.define('DreadTests.DreadTestFixture.ClassA', {
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
        run: Dread.abstractFn
    });

    Dread.define('DreadTests.DreadTestFixture.ClassB', DreadTests.DreadTestFixture.ClassA, {
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

    Dread.define('DreadTests.DreadTestFixture.ClassC', DreadTests.DreadTestFixture.ClassB, {
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

    this.ClassA = DreadTests.DreadTestFixture.ClassA;
    this.ClassB = DreadTests.DreadTestFixture.ClassB;
    this.ClassC = DreadTests.DreadTestFixture.ClassC;

    this.output = output;
}