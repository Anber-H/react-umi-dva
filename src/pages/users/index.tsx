// 写页面有两种方式：类组件和函数组件
// 这里用函数组件(rac)
// 下面用的是无状态组件，所以这里要用到hook：hook里面的方法useState
import React, { useState, FC } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { connect, Dispatch, Loading, UserState } from 'umi';
import UserModal from './components/UserModal';
import { SingleUserType, FormValues } from './data.d';

interface UserPageProps {
  users: UserState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

const UserListPage: FC<UserPageProps> = ({
  users,
  dispatch,
  userListLoading 
}) => {
  // const [state, setstate] = useState(initialState)
  // useState返回的是一个数组，数组的第一个参数state是这个变量的名字，第二个参数setstate是修改这个变量的函数方法。initialState是默认值

  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: SingleUserType) => (
        <span>
          {/* 方法二 */}
          {/* <a onClick={()=>{setModalVisible(true)}}>Edit</a> */}
          <a onClick={()=>{editHandler(record)}}>编辑</a>&nbsp; &nbsp;
          <Popconfirm
            title="你确定删除这条信息吗?"
            onConfirm={()=>{deleteHandler(record.id)}}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const deleteHandler = (id: number) => {
    console.log(id,'id');
  }
  
  const editHandler = (record: SingleUserType) => {
    setModalVisible(true);
    setRecord(record);
  }
  const closeHandler = () => {
    setModalVisible(false);
  }
  const onFinish = (values: FormValues) => {
    const id = record && record.id;
    
    if (id){
      dispatch({
        type: 'users/edit',// 在页面里面dispatch的时候一定要写页面文件
        payload: {
          id,
          values
        }
      });
    } else {
      dispatch({
        type: 'users/add',
        payload: {
          values
        }
      });
    }
    setModalVisible(false);
  };
  const addHandler = () => {
    setModalVisible(true);
    setRecord(undefined);
  }
  
  return (
    <div className="list-table">
      <Button type="primary" onClick={addHandler}>添加</Button>
      <Table columns={columns} dataSource={users.data} rowKey="id" loading={userListLoading}/>
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}>
      </UserModal>
    </div>
  )
}
// const mapStateToProps = (state)=>{}
// state里面有users，所以可以写成下面的形式
const mapStateToProps = ({users, loading}:{users: UserState, loading: Loading})=>{ // 此users就是model.ts中的namespace
  return {
    users, // 此users就是值
    userListLoading: loading.models.users
  }
}
// 这是标准的redux连接方法
export default connect(mapStateToProps)(UserListPage)

