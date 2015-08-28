angular.module('starter.services')

    .factory('MapsService', function ($q) {

	var maps = ""
	return {
		getMaps: function(){ 
				
        		//var db = openDatabase("nicky3db", "01", "nicky3", 5 *1024*1024);
				var db = window.sqlitePlugin.openDatabase({name: "my.db"});
				var defer = $q.defer();
				var res = '[';
				db.transaction(function (tx) {
					tx.executeSql("select * from tMaps;", [], function(tx, result) {
						
						for(var i = 0; i < result.rows.length; i++) {
							res += '{\"RecID\":\"'+result.rows.item(i).RecID+'\",\"Name\":\"'+result.rows.item(i).Name+'\",\"Image\":\"'+result.rows.item(i).Image+'\",\"Name\":\"'+result.rows.item(i).Description+'\"}';
							(i != result.rows.length-1) && (res +=',');
						
						};
						res += ']'
						console.log(res)
						defer.resolve(res);
					})
				}) 
				
				//var temp = localStorage.getItem('tMaps')
    			//data = JSON.parse(temp)
				//maps = data
				return defer.promise
				
				//return maps
		},
		checkMapsFav: function(){ 
		
			var fav = localStorage.getItem('mapsFavorites')
			favdata = JSON.parse(fav)
			console.log(favdata)
			if(favdata != null){
				   for (d = 0; d < favdata.length; d++) {
					  // alert(favdata[d].type)
						if(favdata[d].ID == data[i].RecID && favdata[d].type == 'maps') {
							//alert("match")
							var icon = "-filled"
							onClick = 'onclick="deleteFavorites(\'' + favdata[d].ID + '\',\''+ favdata[d].type+'\')"'
						}
					 }
			   }

			maps = data
		
		return maps
		},
		getMap: function(id){
			var temp = localStorage.getItem('tMaps')
			map = JSON.parse(temp)
				
			for(i=0;i<map.length;i++){
				//console.log("test")
				if(map[i].RecID == id){
					//console.log(requests[i])
					return map[i];
				}
			}
		},  
	}
});
