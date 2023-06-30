import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { counterActions } from '../../stores/slices/counterSlice.slice'
import Loading from '../../components/Loadings/Loading'
import Userform from '../../components/UserForms/Userform'

export default function About() {
  const counterStore = useSelector(store => store.counterStore)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(counterActions.findAllUsers())
  }, [])
  useEffect(() => {
    console.log("counterStore.users", counterStore.users);
  }, [counterStore.users])

  // hien thi user form 
  const [showUserForm, setShowUserForm] = useState(false)
  const [dataForm, setDataForm] = useState(null)
  return (
    <div>
      {
        counterStore.loading ? <Loading /> : <></>}
      <p>About my information</p>
      <br />
      {
        counterStore.users.map((user) => (<div style={{ display: "flex", textDecoration : user.block ? "line-through" : "" }}>
        <p onContextMenu={(e)=>{
          e.preventDefault()
          dispatch(counterActions.setStatusUser({
            userId : user.id,
            patchData:{
              block : !user.block
            }
          }))
          console.log("chuot phai")}} key={user.id}>Name : {user.name}- id User : {user.id} - Email : {user.email} - PhoneNumber : {user.phone} </p>
          <i style={{ margin: "5px" }} onClick={() => dispatch(counterActions.deleUserById(user.id))} className="fa-solid fa-trash-can"></i>
          <i style={{ margin: "5px" }} className="fa-solid fa-pen"
            onClick={() => {
              setShowUserForm(true);
              setDataForm({
                functionCloseForm: setShowUserForm,
                type: "UPDATE", // loai form add , update
                functionSubmit: counterActions.updateUser ,
                preData : user
              }
              )
            }}
          ></i>
        </div>))
      }
      <br />
      <button onClick={() => {
        setShowUserForm(true); setDataForm({
          functionCloseForm: setShowUserForm,
          type: "ADD",
          functionSubmit: counterActions.createNewUsers, // loai form add , update,
          preData : null
        }
        )
      }}>ADD NEW USER </button>
      {
        showUserForm ? <Userform dataForm={dataForm} /> : <></>
      }

      <Outlet />
    </div>

  )
}
