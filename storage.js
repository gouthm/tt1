	
var databaseName =  "BCDB";
var databaseVersion = "1.0";
var databaseDisplayName = "BCDatabase";
var databaseSize =  2 * 1024 * 1024;
var myDB = "";
 
//Accessing with HTML5 local database
myDB = window.openDatabase(databaseName, databaseVersion , databaseDisplayName, databaseSize);

//Using SQLite plugin
myDB = window.sqlitePlugin.openDatabase({name : databaseName});

// table creation

function CreateTable() {
            myDB.transaction(function(transaction) {
                transaction.executeSql('CREATE ' +
                           'TABLE IF NOT EXISTS ' +
                           'Barcode_Table (id integer primary key, content text, type text)', [],
                    function(tx, result) {
                        console.log("ANR table created successfully.");
                    }, 
                    function(error) {
                          console.log("Error occurred while creating the table.");
                    });
                });
}
// tble creation close

// insert start
function InsertData(){
	if(document.getElementById('Decode').value== "" || (document.getElementById('Type').value== "")) {
		if(document.getElementById('Decode').value== ""){
			//alert('Enter Decode');
		document.getElementById('Decode').style.border='1px solid red';
		
		}else{
			document.getElementById('Decode').style.border='1px solid white';
		}
		if(document.getElementById('Type').value== ""){
		//	alert('Enter Type');
		document.getElementById('Type').style.border='1px solid red';
		}else{
			document.getElementById('Type').style.border='1px solid white';
		}
	}else{
			
	document.getElementById('Decode').style.border='1px solid white';
	document.getElementById('Type').style.border='1px solid white';
        myDB.transaction(function(transaction) {
            // Define insert query
            var executeQuery = "INSERT INTO " +
                                "Barcode_Table" + 
                                "(content, type) "+
                                "VALUES(?,?)";
         //   Helper.log(executeQuery);      
			
			var dc=document.getElementById('Decode').value;	
	var ty=document.getElementById('Type').value;        
            transaction.executeSql(executeQuery, [dc, ty]
                , function(tx, result) {   // On success
                     console.log('ARN data inserted successfully.');
					 alert("inserted");
                },
                function(error){     // On error                               
                     console.log('Error occurred while inserting business data.'); 
                });
        });
		}
}

// insert close

//reat start
function GetData() {
	
		  document.querySelector("#idvalue").innerHTML ='';
		  document.querySelector("#namevalue").innerHTML ='';
		  document.querySelector("#sql-result").innerHTML ='';
		  myDB.transaction(function (tx) {
   tx.executeSql('SELECT * FROM Barcode_Table', [], function (tx, results) {
   var len = results.rows.length, i;
   msg = "<p>Found rows: " + len + "</p>";
   document.querySelector('#sql-result').innerHTML +=  msg;
 // alert(len);
   for (i = 0; i < len; i++){
   
	var tdc=results.rows.item(i).content;
	var tty=results.rows.item(i).type;

document.querySelector('#idvalue').innerHTML += tdc +"</br>" ;
document.querySelector('#namevalue').innerHTML += tty+"</br>";

	  console.log(results.rows.item(i).log +"ada"+ tdc);
   }
   
 // document.querySelector('#sql-result').innerHTML +=  "</table>"; 
   
 }, function(error) {
                        console.log("Error occurred while getting the data.");
                  });
	});
		
          
		  
		  
}
//red close

//update start

function UpdateBusinssTable(){
    myDB.transaction(
                    function(transaction) {
                    // Define update query
                    var executeQuery = "UPDATE " +
                                       "Business_Table " +
                                       "SET business_name = ?  WHERE  business_id =?"; 
                    transaction.executeSql(executeQuery, ['Mindfire Solutions', '1234']
                        , function(tx, result) {   // On success
                             console.log('Business updated successfully.');
                        },
                        function(error){     // On error                               
                            console.log('Error occurred while updating the business.'); 
                        });
           });
}

// update close

function DeleteBusinessTable(){
            myDB.transaction(
                function(transaction) {
                // Define delete query
                var executeQuery = "DELETE FROM Business_Table";
                transaction.executeSql(executeQuery, []
                    , function(tx, result) {   // On success
                         console.log('All business data deleted successfully.');
                    },
                    function(error){     // On error                               
                         console.log('Error occurred while deleting the business data.'); 
                    });
            });
}
 
function DropBusinessTable(){
            myDB.transaction(
                function(transaction) {
                // Define delete query
                var executeQuery = "DROP TABLE  IF EXISTS Business_Table";
                transaction.executeSql(executeQuery, []
                    , function(tx, result) {   // On success
                         console.log('Table deleted successfully.');
                    },
                    function(error){     // On error                               
                         console.log('Error occurred while droping the table.'); 
                    });
            });
}
