class Helper {
    static baseURL(){
        return "https://api.foursquare.com/v2";
    }

    static auth(){
        const keys = {  
            client_id:"I3QIS0W5R2DD5J4XTPHPBVM4S1TGK2F3EEDWSMBSYHV2BCJB",
            client_secret:"2DSAIDITQN2W0OONF4FNYABSGMEUQE03N3HGDSWWXXJPDVHR",
            v:"20181113"
        };
        return Object.keys(keys)
            .map(key => `${key}=${keys[key]}`)
            .join("&");
    }

    static urlBuilder(urlPrams){
        if(!urlPrams){
            return ""
        }
          return Object.keys(urlPrams)
            .map(key => `${key}=${urlPrams[key]}`)
            .join("&");
    }

    static headers() {
        return {
            Accept: "application/json"
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
          error: error,
          errorInfo: errorInfo
        });
      }

    static simpleFetch(endPoint, method, urlPrams){
        let requestData = {
            method,
            headers: Helper.headers()
        };

        return fetch(
            `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
            urlPrams
        )}`,
        requestData
        )
        .then(res => {
            
            if (res.ok) {
                return res.json();              
            }else{  
                try{
                    throw new Error('Error Caught');
                } catch (e) {
                    console.error(e.message);
                    return res.json();
                }         
                
            }
        })
    }
}


// // Register Service Worker
// if ('serviceWorker' in navigator){
//     navigator.serviceWorker
//     .register('./serviceWorker.js')
//     .catch(function(err) {
//       console.error(err);
//     });
//     console.log('service worker registered');
//   }

export default class SquareAPI {
    static search(urlPrams) {
        return Helper.simpleFetch("/venues/search", "GET", urlPrams);
    }
    static getVenueDetails(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
    }

    static getVenuePhotos(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
    }
}