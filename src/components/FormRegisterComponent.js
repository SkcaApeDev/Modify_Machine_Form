import "./FormRegisterComponent.css"
import {useState, useEffect} from "react"
import liff from '@line/liff'

const FormRegisterComponent = ()=>{

    const [userLineId, setUserLineId] = useState("")
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

    const validateForm = async(e)=>{
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
        }if(userName.replace(/[^A-Za-z]/ig, '') && userSurname.replace(/[^A-Za-z]/ig, '') && userId.length === 5 && userPhoneNumber.match(/^0[0-9]{9}$/)){

            const data = {
                SheetName: 'User',
                Line_ID: userLineId,
                ID: userId,
                Name: userName,
                Surname: userSurname,
                Phone_Number: formatPhoneNumber(userPhoneNumber)
              };
              try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbx4zcuaY6kX645yBTtyKRDUkX8LlP2dEWV9bBZ9DRIthTem7rWA1Zp8YKptmrw_qeNb/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.text())
                .then(result => console.log('Result:', result),
                setUserId(""),
                setUserName(""),
                setUserSurname(""),
                setUserPhoneNumber(""))
                .catch(error => console.error('Error:', error));
                } catch (error) {
                  console.error('Error:', error);
                  // Handle general error (e.g., network issue)
                }
              }
    }

    function formatPhoneNumber(phoneNumber) {
        // Using regular expressions to add hyphens in the desired format
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }

    useEffect(() => {
        async function initLine() {
          await liff.init({ liffId: "2001224156-kwr9NAEL" });
    
          if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            const lineId = profile.userId
            setUserLineId(lineId);
            document.getElementById("user-line-id-input").value = lineId;
          } else {
            //liff.login()
          }
        }
    
        initLine();
      }, []);
    return (
        <div className='container'>
            <h2>แบบฟอร์มลงทะเบียน</h2>
            <form className='form' id='form' onSubmit={validateForm}>
                <div className='form-control' id='user-line-id'>
                    <label>Line ID</label>
                    <input type='text' id="user-line-id-input" value={userLineId} readOnly />
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
                    <input type='text'value={userId} onChange={(e)=>setUserId(e.target.value)} style={{borderColor:userIdColor}}/>
                    <small style={{color:userIdColor}}>{errorUserId}</small>
                </div>
                <div className='form-control' id='user-phone-number'>
                    <label>เบอร์โทรศัพท์</label>
                    <input type='text'value={userPhoneNumber} onChange={(e)=>setUserPhoneNumber(e.target.value)} style={{borderColor:userPhoneNumberColor}}/>
                    <small style={{color:userPhoneNumberColor}}>{errorUserPhoneNumber}</small>
                </div>
                <button type='submit' id='register-btn'>ลงทะเบียน</button>
            </form>
        </div>
    )
}

export default FormRegisterComponent