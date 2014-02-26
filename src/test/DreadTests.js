
describe('Dread Tests', function() {

    describe('#define', function(){

        var fixture = new DreadTests.DreadTestFixture();
        var output = fixture.output;
        var c;

        beforeEach(function() {
            fixture.output.length = 0;
            c = new fixture.ClassC(1, 2, '3');
        });

        // the actual tests
        it('should call entirely up the class method chain', function() {
            c.foo();

            output.should.eql(['a#constructor', 'b#constructor', 'c#constructor', 'a#foo', 'b#foo', 'c#foo']);
        });

        it('should call inherited methods that are not overridden', function() {
            c.bar();
            c.baz();

            output.should.eql(['a#constructor', 'b#constructor', 'c#constructor', 'a#bar', 'b#bar', 'a#baz', 'c#baz']); 
        });

        it('should set class properties', function() {
            c.a.should.equal(1);
            c.b.should.equal(2);
            c.c.should.equal('3');
        })

        it('callParent should return the original value', function() {
            c.baz().should.equal('a#baz-c#baz');
        });

        it('should provide a class meta data', function() {
            c.$className.should.equal('DreadTests.DreadTestFixture.ClassC');
            c.$parentClass.should.equal(DreadTests.DreadTestFixture.ClassB);
        });

        it('should throw an error message when callParent is executed but parent method does not exist', function() {
            var yikes = c.yikes.bind(c);
            
            yikes.should.throw(/No parent class method found for/);
        });

        it('should throw an error if abstract methods are not implemented', function() {
            var run = c.run.bind(c);

            run.should.throw(c.$className + '#run not implemented');
        });
    });
});
