import * as React from 'react';

export const fetchApi = (url:string, method:string, data:any, callback: any, errorCallback:any) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.onerror = errorCallback;
    xhr.open(method, url, true);
    xhr.setRequestHeader("Pragma", "no-cache");
    xhr.setRequestHeader("Expires", "-1");
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}

export const fetchImageApi = (url:any, method:any, imageFile:any, callback:any, errorCallback:any) => {

    let imageFormData = new FormData();
    imageFormData.append('imageFile', imageFile);

    var xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.onerror = errorCallback;
    xhr.open(method, url, true);
    xhr.setRequestHeader("Pragma", "no-cache");
    xhr.setRequestHeader("Expires", "-1");
    xhr.setRequestHeader('Cache-Control', 'no-cache');

    xhr.send(imageFormData);
}

export const fetchMultipartApi = (url:string, method:string, data:any, callback: any, errorCallback:any) => {
    let formData = new FormData();
    for (let d in data) {
        if (data[d]) {
            formData.append(d, data[d]);
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.onload = callback;
    xhr.onerror = errorCallback;
    xhr.open(method, url, true);
    xhr.setRequestHeader("Pragma", "no-cache");
    xhr.setRequestHeader("Expires", "-1");
    xhr.setRequestHeader('Cache-Control', 'no-cache');

    xhr.send(formData);
}

export const isValidEmail = (emailAddress:string) => {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailAddress)) {
        return true;
    }
    return false;
}

export function capitalizeFirstLetter(text:string) {
    if (text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return '';
}

export function getSuffixDayOfMonth(day:number) {
    if (day) {
        if (day % 30 == 1) {
            return 'st';
        }
        else if (day % 30 == 2) {
            return 'nd';
        }
        else if (day % 30 == 3) {
            return 'rd';
        }
        else {
            return 'th';
        }
    }
    return '';
}

export function imageExists(imageUrl:string) {
    try {
        var http = new XMLHttpRequest();
        http.open('HEAD', imageUrl, false);
        http.send();

        return http.status == 200;
    } catch (err) {
        return false;
    }
}

export function getAnteOrPostMeridiemTime(time:string){
    if(!time){
        return '';
    }
    let timeRet = '';
    if (parseInt(time.split(':')[0]) >= 12) {
        let num = parseInt(time.split(':')[0]) - 12;
        timeRet= ((( num < 10)?'0':'') + num) + ':' + time.split(':')[1] + ' pm'
    } else {
        timeRet = time.split(':')[0] +':'+time.split(':')[1] + ' am'
    }
    return timeRet;
}

export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}