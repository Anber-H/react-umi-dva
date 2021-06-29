
// umi 已经为我们写好了一些类型的定义，包括Reducer、Effect、Subscription
import { Reducer,Effect,Subscription } from 'umi';
import { getRemoteList, editRecord, addRecord } from './service';
import { message } from 'antd';
import { SingleUserType } from './data.d';


// service.ts的后端接口返回数据的格式有data和meta（可以看mock数据）
export interface UserState {
  data: SingleUserType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  }
}

interface UserModelType {
  namespace: 'users';
  state: UserState;
  reducers: {
    getList: Reducer<UserState>;
  };
  effects: {
    getRemote: Effect;
    edit: Reducer;
    add: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}
// 在我们学习redux的时候，dispatch(action)，知道action 是一个对象object 
// 这个对象就是：
// {
//   type:'getList',
//   payload:{}
// }
// 所以看到action我们可以改成type和payload的一个对象
const UserModel: UserModelType = {
  // model的唯一标识
  namespace:'users',
  // 数据，初始值
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1
    }
  },
  // reducers、effects、subscriptions的写法、参数可参考：https://dvajs.com/api/#state
  // 里面是多个函数
  reducers: {
    // effect中getRemote返回的data会put到这里，就是payload
    getList(state, { payload }) {
      // state:获取的数据
      // return newState;
      return payload
    }
  },
  // 里面是多个函数,并且函数前面都要加*，也就是generate函数
  effects: {
    // *getRemote(action, effects) {
    *getRemote(action, { put, call }) {
      // 返回的是一个void，所以是不需要返回的
      // effects给到reducer用的put
      // yield put()
      const data = yield call(getRemoteList);
      
      // 请求真实接口后可能会返回类似这种数据{data:[],meta:{}},那么这时候拿到的data就不是裸数据了，所以下面payload可以写成payload：data
      // put：发出一个 Action，类似于 dispatch
      if (data) {
        yield put({
          type: 'getList',
          payload: data
        });
      }
    },
    *edit({payload:{id, values}}, { put, call }) {
      const data = yield call(editRecord, {id, values});
      if (data) {
        message.success('编辑成功');
        yield put ({
          type: 'getRemote' // 再次调用上面的getRemote刷新列表
        });
      } else {
        message.error('编辑失败');
      }
    },
    *add({payload:{values}}, { put, call }) {
      const data = yield call(addRecord, {values});
      console.log(data,'data');
      if (data) {
        message.success('添加成功');
        yield put ({
          type: 'getRemote' // 再次调用上面的getRemote刷新列表
        });
      } else {
        message.error('添加失败');
      }
    },
  },
  // 里面是多个函数
  // history的写法：https://github.com/ReactTraining/history/blob/master/docs/getting-started.md
  // let unlisten = history.listen(({ location, action }) => {
  //   console.log(action, location.pathname, location.state);
  // });
  subscriptions: {
    setup({ dispatch, history }){
      // history.listen((location, action) => {
      //   if(location.pathname === '/users'){
          // dispatch({
          //   type: xxx,
          //   payload: xxx
          // });
      //   }
      // })
      // 可以写成下面的形式
      return history.listen(({pathname}) => {
        if(pathname === '/users'){
          dispatch({
            type: 'getRemote'
          });
        }
      });
    }
  }
};
export default UserModel;