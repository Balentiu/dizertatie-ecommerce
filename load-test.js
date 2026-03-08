import http from 'k6/http'
import {sleep} from 'k6'

export const options = {
    vus: 50,
    duration: '15s',
};

export default function (){
    const res = http.get('http://localhost:3000'); //SSR Shop
    sleep(1);
}