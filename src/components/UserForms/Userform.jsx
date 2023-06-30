import React from 'react'
import "./Userform.scss"
import { useDispatch } from 'react-redux'

export default function Userform(props) {
    const dispatch = useDispatch()
    return (
        <div className='Userform-container'>
            <form action="" className='form' onSubmit={(event)=>{
                event.preventDefault(); //ngan chan hanh vi goi action 
                console.log(event.target.userName.value);
                if(event.target.userName.value == "") {
                    alert("enter your name ")
                    return
                }
                let newUser = {
                    name : event.target.userName.value,
                    email : event.target.UserEmail.value,
                    phone : event.target.phoneNumber.value,
                    block : props.dataForm.preData != null ?  props.dataForm.preData.block : false
                }
                if(props.dataForm.type == "ADD") {
                    dispatch(props.dataForm.functionSubmit(newUser))
                } 

                if(props.dataForm.type == "UPDATE") {
                    dispatch(props.dataForm.functionSubmit({
                        userId : props.dataForm.preData.id,
                        editData : newUser
                    }))
                } 
                event.target.userName.value = "";
                event.target.cancel.click();
            }}>
          {/* Input User Name */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    User Name
                    </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name='userName'
                    defaultValue={props.dataForm.preData != null ? props.dataForm.preData.name : ""}
                />
               
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    User Email
                    </span>
                </div>
                <input
                    type="email"
                    className="form-control"
                    placeholder="UserEmail"
                    aria-label="UserEmail"
                    aria-describedby="basic-addon1"
                    name='UserEmail'
                    defaultValue={props.dataForm.preData != null ? props.dataForm.preData.email : ""}
                />
               
            </div>
                {/* user phone number */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    Phone Number
                    </span>
                </div>
                <input
                    type="number"
                    className="form-control"
                    placeholder="phoneNumber"
                    aria-label="phoneNumber"
                    aria-describedby="basic-addon1"
                    name='phoneNumber'
                    defaultValue={props.dataForm.preData != null ? props.dataForm.preData.phone : ""}
                />
               
            </div>
            {/* nut add - submit */}
            <button type="submit"  className="btn btn-primary" >{props.dataForm.type == "ADD" ? "ADD" : "SAVE"}</button>
            {/* nut huy - close */}
             <button type="button" name='cancel' className="btn btn-secondary" onClick={()=>props.dataForm.functionCloseForm(false)
            }>Hủy</button>
       
            </form>

        </div>
    )
}
