angular.module('starter.services')

    .factory('MapsService', function () {

	var maps = ""
	return {
		getMaps: function(){ 
				
				var temp = localStorage.getItem('tMaps')
    			data = JSON.parse(temp)
				maps = data
				
				return maps
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
