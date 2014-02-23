
describe('Dnt.define', function(){

    var output = [];

    beforeEach(function() {
        output.length = 0;
    });

    // some class definitions that are used throughout the tests
    Dnt.define('Foo.bar.A', {
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
        }
    });

    Dnt.define('Foo.bar.B', Foo.bar.A, {
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

    Dnt.define('Foo.bar.C', Foo.bar.B, {
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

    // the actual tests
    it('should call entirely up the class method chain', function() {
        var c = new Foo.bar.C();
        c.foo();

        output.should.eql(['a#constructor', 'b#constructor', 'c#constructor', 'a#foo', 'b#foo', 'c#foo']);
    });

    it('should call inherited methods that are not overridden', function() {
        var c = new Foo.bar.C();
        c.bar();
        c.baz();

        output.should.eql(['a#constructor', 'b#constructor', 'c#constructor', 'a#bar', 'b#bar', 'a#baz', 'c#baz']); 
    });

    it('should set class properties', function() {
        var c = new Foo.bar.C(1, 2, '3');

        c.a.should.equal(1);
        c.b.should.equal(2);
        c.c.should.equal('3');
    })

    it('should give a helpful error message, maybe?', function() {
        var c = new Foo.bar.C();
        var yikes = c.yikes.bind(c);
        
        yikes.should.throw(/No parent class method found for/);
    });

    it('callParent should return the original value', function() {
        var c = new Foo.bar.C();

        c.baz().should.equal('a#baz-c#baz');
    });
});
