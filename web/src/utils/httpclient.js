import request from "superagent"

let baseUrl = "http://10.3.136.24:1010";


function filterUrl(url){
    return url.startsWith('http') ? url : baseUrl+url;
}

export default{
    baseUrl,
    get(url,params){
        return new Promise((resolve,reject)=>{
            request
            .get(filterUrl(url))
            .query(params || {})
            .set('Authorization',window.sessionStorage.getItem('token'))
            .end((err,res)=>{
                if(err){
                    reject(err);
                }else if(!res.body.status && res.body.error == "unauthorized"){
                    this.props.router.push('/login');
                    return false;
                }else{
                    resolve(res.body);
                }
            })
        })
    },
    post(url,params){
        console.log(url,params)
        return new Promise((resolve,reject)=>{
            request
            .post(filterUrl(url))
            .send(params || {})
            
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Authorization',window.sessionStorage.getItem('token'))
            .end((err, res) => {
                if(err){
                    reject(err);
                }else if(!res.body.status && res.body.error == "unauthorized"){
                    this.props.router.push('/login');
                    return false;
                }else{
                    resolve(res.body);
                }
            })
        })
    }
}