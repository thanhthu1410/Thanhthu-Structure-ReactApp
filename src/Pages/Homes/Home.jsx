import React, { useEffect } from 'react'
import "./Home.scss"
import { useDispatch, useSelector } from 'react-redux'
import { counterActions } from '../../stores/slices/counterSlice.slice'

export default function Home() {
  const counterStore = useSelector(state => state.counterStore.counter)
  const dispatch = useDispatch()
  
  return (
    <div>Home
      <p>Counter : {counterStore}</p>
      <button onClick={()=>dispatch(counterActions.increase())}>INCREASE</button> <br />
      <button onClick={()=>dispatch(counterActions.decrease())}>DECREASE</button> <br/>
      <button onClick={()=>dispatch(counterActions.setCounter({
        number : 100
      }))}>SET COUNTER</button>
    </div>
  )
}
