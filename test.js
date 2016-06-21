defineClass("JSViewController", {
  //instance method definitions
  viewDidLoad: function() {
    
    self.array = ["asdf","86868686","1993ja9d"];
    var alertView = require('UIAlertView').alloc().init();
 	alertView.setTitle('提示');
 	alertView.setMessage(array[1]); 
 	alertView.addButtonWithTitle('OK');
 	alertView.show(); 


    }
  }
}, {})
