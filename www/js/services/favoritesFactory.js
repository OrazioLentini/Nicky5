angular.module('starter.services')

    .factory('FavoritesService', function () {

	var success = ""
	return {
		checkIfFavorite: function(id) {
			
			var fav = localStorage.getItem('companyFavorites')
			favdata = JSON.parse(fav)
	
			if(favdata != null){
				for (d = 0; d < favdata.length; d++) {
					if(favdata[d].ID == id && favdata[d].type == 'company') {
						success = true
						return success
					}
					else {
						success = false
						return success
					}
				}
			}
		},
		deleteFavorite: function(location, table) {
				var x;
				var json = JSON.parse(localStorage[table + "Favorites"]);
				for (i=0;i<json.length;i++){
				//alert(json[i].ID)
				//alert(json[i].type)
				if (json[i].ID == location && json[i].type == table) {
					if (table == 'schedule') {
						x = json[i].Speaker
					}
					json.splice(i, 1);
				}
			}
			if(JSON.stringify(json) == "[]"){
				localStorage.removeItem(table + "Favorites");	
			} 
			else {
				localStorage[table + "Favorites"] = JSON.stringify(json);
			}
			/* CALL THEM ALL AGAIN */
			if(table == 'schedule'){
				//getScheduleList()
				//getScheduleFavorites()
			if (x != "") {
				//alert('speaker')
				//window.parse.unsubscribe('speaker' + location);
			}
			else {
				//alert('trivia')
				//window.parse.unsubscribe('trivia' + location);
			}
			//window.parse.unsubscribe('speaker' + location);
			}
			if(table == 'maps'){
				//getMapList()
				//getMapFavorites()
			//window.parse.unsubscribe(table + location);
			}
			if (table == 'company') {
				//getCompanyFavorites()
				//window.parse.unsubscribe('company' + location);
			}
			//getMapFavorites()
			/* REFRESHES THE LIST */
			return success
		},
		saveFavoriteCompany: function(details){
			console.log(details)	
			
			//alertify.set({ delay: 1500 });
			//alertify.success("Saved to Favorites");

			var favorite = '{"ID": \"' + details.RecID + '\", "Image": \"' + details.Logo + '\", "Company": \"' + details.Company + '\", "Location": \"' + details.Location + '\", "Description": \"' + details.Description + '\", "Video": \"' + details.Video + '\", "type": \"company\" }'
			
			var newFav = ''
			var temp = localStorage.getItem('companyFavorites')
			if (temp == null) {
				localStorage.setItem('companyFavorites', '[' + favorite + ']')
			}
			else {
				temp = temp.substring(1, temp.length - 1)
				newFav = "[" + temp + "," + favorite + "]"
				localStorage.setItem("companyFavorites", newFav)
			}
			//window.parse.subscribeToChannel("company" + ID);
			success = true	
			return success;
		}
		
	}
});
