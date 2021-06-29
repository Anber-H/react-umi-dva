// 异步函数写法
// async function name(params) {}
// const name = async (params) => {}
import request, { extend } from 'umi-request';
import { message } from 'antd';
import { FormValues } from './data.d';

const errorHandler = function(error:any) {
  if (error.response) {
    // error.response.status:  code  503  
    // error.data:  body  Random Error Response. 
    if (error.response.status > 400) {
      message.error(error.data.message ? error.data.message : error.data);
    }
  } else {
    // 请求已发送但没有回复
    message.error('Network Error');
  }
};
const extendRequest = extend({ errorHandler });


export const getRemoteList = async () => {
  // 接口获取数据写法（get请求）
  // return request('/api/v1/xxx', {
  //   method: 'get',
  //   params: { id: 1 },
  // })
    // .then(function(response) {
    //   console.log(response)
    //   return response;
    // })
    // .catch(function(error) {
    //   console.log(error);
    // });

  //   return extendRequest('/api/v1/user', {
  //   method: 'get',
  // })
  //   .then(function(response) {
  //     return response;
  //   })
  //   .catch(function(error) {
  //     return false;
  //   });

  // mock数据
  const data = {
    "data": [
      {
        id: '111',
        name: 'baixiangguo',
        create_time: '2020-06-01',
        email: 'anber_99@163.com',
        status: 1
      },
      {
        id: '112',
        name: 'wangyibo',
        create_time: '2020-07-02',
        email: 'wangyibo@163.com',
        status: 2
      },
      {
        id: '113',
        name: 'xiaozhan',
        create_time: '2020-08-03',
        email: 'xiaozhan@163.com',
        status: 2
      },
    ],
    "meta": {
      "total": 2,
      "per_page": 10,
      "page": 1
    }
  }
  return data;
}
export const editRecord = async({id, values}:{id: number; values: FormValues}) => {
  // post请求写法
  // request('/api/v1/user', {
  //   method: 'post',
  //   data: {
  //     name: 'Mike',
  //   },
  // })
    // .then(function(response) {
    //   console.log(response);
    // })
    // .catch(function(error) {
    //   console.log(error);
    // });

  //编辑接口
  // return extendRequest(`/api/v1/user/${id}`, {
  //   method: 'put',
  //   data: values,
  // })
  //   .then(function(response) {
  //     return true;
  //   })
  //   .catch(function(error) {
  //     return false;
  //   });
}
export const addRecord = async({values}:{values:FormValues}) => {
  //新增接口
  // return extendRequest(`/api/v1/user`, {
  //   method: 'post',
  //   data: values,
  // })
  //   .then(function(response) {
  //     return true;
  //   })
  //   .catch(function(error) {
  //     return false;
  //   });
}
