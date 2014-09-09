QUnit.config.scrolltop = false;


QUnit.asyncTest('test stop method', function(assert) {
  expect(1);
  var runs = 0;  
  console.log('runs', runs);
  var s = new Steady({
    conditions: {
      'min-top': 200,
    },
    handler: function(values, done) {
      console.log(values);
      runs++;
      console.log('runs', runs);
      done();
    }
  });

  window.scrollTo(0, 200);
  
  requestAnimationFrame(function() {
      console.log('vsalllllls', runs);
      s.stop();
      
      setTimeout(function() {
        assert.equal(runs, 1, 'stop is okay' );
        QUnit.start();
      }, 200);

  });
});

QUnit.asyncTest('test resume method', function(assert) {
  expect(1);
  var runs = 0;  
  console.log('runs', runs);
  var s = new Steady({
    conditions: {
      'min-top': 200,
    },
    handler: function(values, done) {
      console.log(values);
      runs++;
      console.log('runs', runs);
      done();
    }
  });

  window.scrollTo(0, 200);
  
  requestAnimationFrame(function() {

    s.stop();
    window.scrollTo(0, 300);
      
    s.resume();
      
    setTimeout(function() {

      window.scrollTo(0, 310);

      setTimeout(function() {
          assert.equal(runs, 2, 'resume method runs should equal 2' );
          s.stop();
          QUnit.start();
        }, 200);
      }, 200);

  });
});

QUnit.asyncTest('test addCondition', function(assert) {
  expect(1);
  var s = new Steady({
    conditions: {
      'max-bottom': 200,
    },
    handler: function(values, done) {
      console.log(values);
      done();
    }
  });

  s.addCondition('max-top', 200);

  s.stop();

  console.log(s);
  assert.equal(s.conditions['max-top'], 200, 'addCondition is okay' );
  QUnit.start();
});


QUnit.asyncTest('test removeCondition', function(assert) {
  expect(1);
  var s = new Steady({
    conditions: {
      'max-bottom': 200,
    },
    handler: function(values, done) {
      console.log(values);
      done();
    }
  });

  s.removeCondition('max-bottom');

  console.log(s);
  s.stop();
  assert.equal(s.conditions['max-bottom'], undefined, 'removeCondition is okay' );
  QUnit.start();
  
});


QUnit.asyncTest('test throttle', function(assert) {
  expect(1);
  var s = new Steady({
    conditions: {
      'max-bottom': 200,
    },
    throttle: 200,
    handler: function(values, done) {
      console.log(values);
      done();
    }
  });

  

  console.log(s);
  s.stop();
  assert.equal(s.throttleVal, 200, 'throttleVal is okay' );
  QUnit.start();
});

QUnit.asyncTest('test bottom tracker', function(assert) {
  expect(1);
  var s = new Steady({
    conditions: {
      'max-bottom': 200,
    },
    handler: function(values, done) {
      console.log(values);
      assert.equal(values.bottom <= 200, true, 'Bottom is okay!!' );
      QUnit.start();
      s.stop();
      done();
    }
  });

  var to = ( document.body.scrollHeight - window.innerHeight ) - 180;
  window.scrollTo(0, to);
});


QUnit.asyncTest('test top tracker', function(assert) {
  expect(1);
  var s = new Steady({
    conditions: {
      'min-top': 100,
    },
    handler: function(values, done) {
      console.log(values);
      assert.equal(values.top >= 101, true, 'top is okay' );
      QUnit.start();
      s.stop();
      done();
    }
  });

  window.scrollTo(0, 120);
});


QUnit.asyncTest('test scrollElement top tracker', function(assert) {
  expect(1);
  var scrollable = document.getElementById('scrollable');
  var s = new Steady({
    conditions: {
      'min-top': 100,
    },
    scrollElement: scrollable,
    handler: function(values, done) {
      console.log(values);
      assert.equal(values.top >= 101, true, 'top is okay' );
      QUnit.start();
      s.stop();
      done();
    }
  });

  scrollable.scrollTop += 120;
});


QUnit.asyncTest('test scrollElement scrollLeft tracker', function(assert) {
  expect(1);
  var scrollable = document.getElementById('scrollable');
  var s = new Steady({
    conditions: {
      'min-scrollLeft': 100,
    },
    scrollElement: scrollable,
    handler: function(values, done) {
      console.log(values);
      assert.equal(values.scrollLeft >= 101, true, 'scrollLeft is okay' );
      QUnit.start();
      s.stop();
      done();
    }
  });

  scrollable.scrollLeft += 120;
});




QUnit.testDone(function() {
  window.scrollTo(0, 0);
});
