
    Memory  = "0";      // initialise memory variable
    Current = "0";      //   and value of Display ("current" value)
    Operation = 0;      // Records code for eg * / etc.
    MAXLENGTH = 30;     // maximum number of digits before decimal!

function AddDigit(dig)          //ADD A DIGIT TO DISPLAY (keep as 'Current')
 { if (Current.indexOf("!") == -1)  //if not already an error
    { if (    (Number(Current) == 0)
              && (Current.indexOf(".") == -1)
         ) { Current = dig;
           } else
           { Current = Current + dig;
           };
      Current = Current.toLowerCase(); //FORCE LOWER CASE
    } else
    { Current = "Hint! Press 'AC'";  //Help out, if error present.
    };
   if (Current.indexOf("e0") != -1)
     { var epos = Current.indexOf("e");
       Current = Current.substring(0,epos+1) + Current.substring(epos+2);
     };
  if (Current.length > MAXLENGTH)
     { Current = "Aargh! Too long"; //don't allow over MAXLENGTH digits before "." ???
     };
   document.Calculator.Display.value = Current;
 }

function Dot()                  //PUT IN "." if appropriate.
 {
  if ( Current.length == 0)     //no leading ".", use "0."
    { Current = "0.";
    } else
    {  if (   ( Current.indexOf(".") == -1)
            &&( Current.indexOf("e") == -1)
          )
         { Current = Current + ".";
    };   };
  document.Calculator.Display.value = Current;
 }

function DoExponent()
 {
  if ( Current.indexOf("e") == -1 )
       { Current = Current + "e0";
         document.Calculator.Display.value = Current;
       };
 }

function PlusMinus()
 {
  if  (Current.indexOf("e") != -1)
    { var epos = Current.indexOf("e-");
      if (epos != -1)
         { Current = Current.substring(0,1+epos) + Current.substring(2+epos); //clip out -ve exponent 
         } else
         { epos = Current.indexOf("e");
           Current = Current.substring(0,1+epos) + "-" + Current.substring(1+epos); //insert -ve exponent
         };
    } else
    {  if ( Current.indexOf("-") == 0 )
         { Current = Current.substring(1);
         } else
         { Current = "-" + Current;
         };
       if (    (Number(Current) == 0)
            && (Current.indexOf(".") == -1 )
          ) { Current = "0"; };
    };
  document.Calculator.Display.value = Current;
 }

function Clear()                //CLEAR ENTRY
 { Current = "0";
   document.Calculator.Display.value = Current;
 }

function AllClear()             //Clear ALL entries!
 { Current = "0";
   Operation = 0;                //clear operation
   Memory = "0";                  //clear memory
   document.Calculator.Display.value = Current;
 }

function Operate(op)            //STORE OPERATION e.g. + * / etc.
 {
 if (Operation != 0) { Calculate(); }; //'Press "=" if pending operation!
 // note that design is not good for showing *intermediate* results.

  if (op.indexOf("*") > -1) { Operation = 1; };       //codes for *
  if (op.indexOf("/") > -1) { Operation = 2; };       // slash (divide)
  if (op.indexOf("+") > -1) { Operation = 3; };       // sum
  if (op.indexOf("-") > -1) { Operation = 4; };       // difference

  Memory = Current;                 //store value
  // note how e.g. Current.value gives neither error nor value! ***
  Current = "";
  document.Calculator.Display.value = Current;
 }

function Calculate()            //PERFORM CALCULATION (= button)
 { 
  if (Operation == 1) { Current = Number(Memory) * Number(Current); };
  if (Operation == 2)
    { if (Number(Current) != 0)
      { Current = Number(Memory) / Number(Current)
      } else
      { Current = "Aargh! Divide by zero"; //don't allow over MAXLENGTH digits before "." ???
      }
    };
  if (Operation == 3) { Current = Number(Memory) + Number(Current); };
  if (Operation == 4) { Current = Number(Memory) - Number(Current); };
  Operation = 0;                //clear operation
  Memory = "0";                  //clear memory
  Current = Current + "";       //FORCE A STRING!
  if (Current.indexOf("Infinity") != -1)        //eg "1e320" * 1
    { Current = "Aargh! Value too big";
    };
  if (Current.indexOf("NaN") != -1)        //eg "1e320" / "1e320"
    { Current = "Aargh! I don't understand";
    };
  document.Calculator.Display.value = Current;
  // NOTE: if no operation, nothing changes, Current is left the same!
 }

function FixCurrent()
 {
  Current = document.Calculator.Display.value;
  Current = "" + parseFloat(Current);
  if (Current.indexOf("NaN") != -1)
    { Current = "Aargh! I don't understand";
    };
  document.Calculator.Display.value = Current;
 }


document.addEventListener('DOMContentLoaded', function () {
  var list=document.querySelectorAll('input[type=button]');
  for(var i=0;i<list.length;i++) {
    list[i].addEventListener('click', function() { 
        var name=this.getAttribute('name');
        if(name=='plusmin') PlusMinus();
        else if(name=='dot') Dot();
        else if(name=='clear') Clear();
        else if(name=='AC') AllClear();
        else if(name=='mul') Operate('*');
        else if(name=='div') Operate('/');
        else if(name=='add') Operate('+');
        else if(name=='sub') Operate('-');
        else if(name=='result') Calculate();
        else if(name=='button') DoExponent();
        else AddDigit(this.getAttribute('value').trim());
      });
  }
  
   document.Calculator.Display.addEventListener('change', FixCurrent);
});

