import request from "superagent"
import './http.scss'

// loading效果
import $ from 'jquery';
let $loadingBox =  $('<div></div>');
let $icon = $('<i></i>');
// console.log($loadingBox)
// console.log($icon)
// 创建元素并添加类名
$loadingBox.addClass('loading');
$icon.addClass('fa fa-spinner fa-pulse fa-3x fa-fw loading-icon');
// 插入到页面
$('body').append($loadingBox.append($icon))
// 默认隐藏
$loadingBox.hide();




let baseUrl = "http://localhost:8080/";


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
            $loadingBox.show()
            request
            .post(filterUrl(url))
            .send(params || {})
            
            .set('Content-Type','application/x-www-form-urlencoded')
            .set('Authorization',window.sessionStorage.getItem('token'))
            .end((err, res) => {
                if(err){
                    reject(err);
                    $loadingBox.delay(500).hide(0);
                }else if(!res.body.status && res.body.error == "unauthorized"){
                    this.props.router.push('/login');
                    $loadingBox.delay(500).hide(0);
                    return false;
                }else{
                    resolve(res.body);
                    $loadingBox.delay(500).hide(0);
                }
            })
        })
    }
}