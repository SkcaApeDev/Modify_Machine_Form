import "./FormRequestComponent.css"

const FormRequestComponent = ()=>{
    return (
        <div className='container'>
            <h2>แบบฟอร์มลงทะเบียน</h2>
            <form className='form'>
                <div className='form-control' id='user-line-id'>
                    <label>Line ID</label>
                    <input type='text' id="user-line-id-input"/>
                </div>
                <div className='form-control' id='user-name'>
                    <label>ชื่อ</label>
                    <input type='text'/>
                    <small></small>
                </div>
                <div className='form-control' id='user-surname'>
                    <label>นามสกุล</label>
                    <input type='text'/>
                    <small></small>
                </div>
                <div className='form-control' id='user-id'>
                    <label>รหัสผนักงาน</label>
                    <input type='text'/>
                    <small></small>
                </div>
                <div className='form-control' id='user-phone-number'>
                    <label>เบอร์โทรศัพท์</label>
                    <input type='text'/>
                    <small></small>
                </div>
                <button type='submit' id='register-btn'>ลงทะเบียน</button>
            </form>
        </div>
    )
}

export default FormRequestComponent