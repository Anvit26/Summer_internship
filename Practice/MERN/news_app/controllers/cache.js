class CacheData{
    constructor(fetchFunction, ttl = 10){
        this.ttl = ttl*60*10000;
        this.fetchFunction = fetchFunction;
        this.cache = null;
        this.getData = this.getData.bind(this);
        this.resetCache = this.resetCache.bind(this);
        this.isCacheExpired = this.isCacheExpired.bind(this);
        this.fetchDate = new Date(0);    
    }
    isCacheExpired(){
        return (this.fetchDate.getTime() + this.ttl)<new Date().getTime();
    }
    getData(){
        if(!this.cache || this.isCacheExpired() ){
            console.log('CACHE EXPIRED');
            return this.fetchFunction()
                .then((data) =>{
                    this.cache = data;
                    this.fetchDate = new Date();
                    return data;
                });
        }else{
            console.log('RETRIVING DATA FROM CACHE');
            return Promise.resolve(this.cache);
        }
    }
    resetCache(){
        this.fetchDate = new Date(0);
    }
}

module.exports = {CacheData };