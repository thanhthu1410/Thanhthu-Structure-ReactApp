import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Outlet } from 'react-router-dom'
import { counterActions } from '../../stores/slices/counterSlice.slice'
import Loading from '../../components/Loadings/Loading'

export default function About() {
  const counterStore = useSelector(store => store.counterStore)
  const dispatch = useDispatch()
  return (
    <div>
      {
       counterStore.loading ? <Loading/> : <></>}
      <p>About my information</p>
     <button onClick={()=>dispatch(counterActions.findAllUsers())}>Find All Users </button>
      <Outlet/>
    </div>
    
  )
}
