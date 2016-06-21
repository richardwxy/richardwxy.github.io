defineClass("JSViewController", {
  //instance method definitions
  viewDidLoad: function() {
    require('NSArray')
    self.array = NSArray.alloc().initWithObjects("123","titi");
    var alertView = require('UIAlertView').alloc().init();
 	alertView.setTitle('提示');
 	alertView.setMessage(array.objectAtIndex(1)); 
 	alertView.addButtonWithTitle('OK');
 	alertView.show(); 


    }
  }
}, {})


