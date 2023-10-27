import "./FormRegisterComponent.css"
import {useState} from "react"
import liff from '@line/liff'
import axios from "axios"

const FormRegisterComponent = ()=>{

    const[userLineId, setUserLineId] = useState("")
    const[userName, setUserName] = useState("")
    const[userSurname, setUserSurname] = useState("")
    const[userId, setUserId] = useState("")
    const[userPhoneNumber, setUserPhoneNumber] = useState("")

    const[errorUserName, setErrorUserName] = useState("")
    const[errorUserSurname, setErrorUserSurname] = useState("")
    const[errorUserId, setErrorUserId] = useState("")
    const[errorUserPhoneNumber, setErrorUserPhoneNumber] = useState("")

    const [userNameColor, setUserNameColor] = useState("")
    const [userSurnameColor, setUserSurnameColor] = useState("")
    const [userIdColor, setUserIdColor] = useState("")
    const [userPhoneNumberColor, setUserPhoneNumberColor] = useState("")

    const validateForm = (e)=>{
        e.preventDefault();
        if(userName.replace(/[^A-Za-z]/ig, '')){
            setErrorUserName("")
            setUserNameColor("green")
        }else{
            setErrorUserName("กรุณาป้อนชื่อเป็นภาษาอังกฤษ")
            setUserNameColor("red")
        }
        if(userSurname.replace(/[^A-Za-z]/ig, '')){
            setErrorUserSurname("")
            setUserSurnameColor("green")
        }else{
            setErrorUserSurname("กรุณาป้อนนามสกุลเป็นภาษาอังกฤษ")
            setUserSurnameColor("red")
        }
        if(userId.length === 5){
            setErrorUserId("")
            setUserIdColor("green")
        }else{
            setErrorUserId("รูปแบบไม่ถูกต้อง")
            setUserIdColor("red")
        }
        if(userPhoneNumber.match(/^0[0-9]{9}$/)){
            setErrorUserPhoneNumber("")
            setUserPhoneNumberColor("green")
        }else{
            setErrorUserPhoneNumber("รูปแบบไม่ถูกต้อง")
            setUserPhoneNumberColor("red")
        }
        if(userName.replace(/[^A-Za-z]/ig, '') && userSurname.replace(/[^A-Za-z]/ig, '') && userId.length === 5 && userPhoneNumber.match(/^0[0-9]{9}$/)){
            console.log(userPhoneNumber)
            const data = {
                Line_ID: userLineId,
                ID: userId,
                Name: userName,
                Surname: userSurname,
                Phone_Number: userPhoneNumber
            }
            axios.post("https://sheet.best/api/sheets/5918aa35-7d94-406c-ad28-a665ddffeade", data).then((res)=>{
            console.log(res)
            setUserLineId("")
            setUserName("")
            setUserSurname("")
            setUserId("")
            setUserPhoneNumber("")
        })
        }
    }

    async function getUserProfile() {
        const profile = await liff.getProfile()
        document.getElementById("user-line-id-input").value(profile.userId)
        return profile.userId
      }

    async function main() {
        await liff.init({ liffId: "2001224156-kwr9NAEL"})
        if(liff.isLoggedIn()){
          setUserLineId = getUserProfile()
        }else{
          liff.login()
        }
      }
    
    main()

    return (
        <div className='container'>
            <h2>แบบฟอร์มลงทะเบียน</h2>
            <form className='form' id='form' onSubmit={validateForm}>
                <div className='form-control' id='user-line-id'>
                    <label>Line User ID</label>
                    <p id="user-line-id-input"><b></b></p>
                </div>
                <div className='form-control' id='user-name'>
                    <label>ชื่อ</label>
                    <input type='text' value={userName} onChange={(e)=>setUserName(e.target.value)} style={{borderColor:userNameColor}}/>
                    <small style={{color:userNameColor}}>{errorUserName}</small>
                </div>
                <div className='form-control' id='user-surname'>
                    <label>นามสกุล</label>
                    <input type='text'value={userSurname} onChange={(e)=>setUserSurname(e.target.value)} style={{borderColor:userSurnameColor}}/>
                    <small style={{color:userSurnameColor}}>{errorUserSurname}</small>
                </div>
                <div className='form-control' id='user-id'>
                    <label>รหัสผนักงาน</label>
                    <input type='number'value={userId} onChange={(e)=>setUserId(e.target.value)} style={{borderColor:userIdColor}}/>
                    <small style={{color:userIdColor}}>{errorUserId}</small>
                </div>
                <div className='form-control' id='user-phone-number'>
                    <label>เบอร์โทรศัพท์</label>
                    <input type='number'value={userPhoneNumber} onChange={(e)=>setUserPhoneNumber(e.target.value)} style={{borderColor:userPhoneNumberColor}}/>
                    <small style={{color:userPhoneNumberColor}}>{errorUserPhoneNumber}</small>
                </div>
                <button type='submit' id='register-btn'>ลงทะเบียน</button>
            </form>
        </div>
    )
}

export default FormRegisterComponent