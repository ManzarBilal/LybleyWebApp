import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import httpCommon from '@/http-common'
import Header from '../header'
 

const UserProfile = () => {
    const [userData, setData] = useState()
    const [userDetails, setUserDetails] = useState()
    const [file, setFile] = useState("")
    const [randomValue, setRandomValue] = useState("")
    const [load, setLoad] = useState(false)
    const [editData, setEditData] = useState({ name: userDetails?.name, email: userDetails?.email, contact: userDetails?.contact })
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = JSON.parse(localStorage.getItem("user"))
            setData(data)
        }

        getUserDetails()
    }, [randomValue])


    const getUserDetails = async () => {

        try {
            const dataU = JSON.parse(localStorage.getItem("user"))
            let response = await httpCommon.get(`/userDetail/${dataU?._id}`);
            let { data } = response;
            setUserDetails(data)
            setEditData({
                name: data?.name, contact: data?.contact, email: data?.email, address: data?.address, address2: data?.address2,
                pin: data?.pin, state: data?.state, city: data?.city,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleFileChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
                // console.log(e.target.files[0]);
                setFile(e.target.files[0]);
            }
        }
    };

    const uploadProfileValue = async (id) => {
        try {
            setLoad(true)
            let response = await httpCommon.patch(`/updateUserDetail/${id}`, editData);
            let { data } = response;
            setLoad(false)
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);

        } catch (err) {
            console.log(err);
        }
    }
    const uploadProfile = async (id) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            setLoad(true)
            let response = await httpCommon.patch(`/uploadUserImage/${id}`, formData);
            let { data } = response;
            setLoad(false)
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);

        } catch (err) {
            console.log(err);
        }
    }
    const handleChangeData = (e) => {
        if (e.target.name === "name") {
            setEditData({ ...editData, name: e.target.value })

        }
        if (e.target.name === "email") {
            setEditData({ ...editData, email: e.target.value })

        }
        if (e.target.name === "contact") {
            setEditData({ ...editData, contact: e.target.value })

        }
        if (e.target.name === "address") {
            setEditData({ ...editData, address: e.target.value })

        }
        if (e.target.name === "address2") {
            setEditData({ ...editData, address2: e.target.value })

        }
        if (e.target.name === "pin") {
            setEditData({ ...editData, pin: e.target.value })

        }
        if (e.target.name === "state") {
            setEditData({ ...editData, state: e.target.value })

        }
        if (e.target.name === "city") {
            setEditData({ ...editData, city: e.target.value })

        }
    }

    return (
        <>
            <Header random={randomValue} />
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-4 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 ">
                            <div className='fw-bold text-center mt-2'>Change Profile  </div>
                            {userDetails?.image === "" ? <img
                                className="rounded-circle mt-3"
                                width="150px"
                                height="150px"
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"

                            />
                                :
                                <img
                                    className="rounded-circle img-fluid1 mt-3"
                                    width="150px"
                                    height="150px"
                                    src={userDetails?.image}
                                />}

                        </div>
                        <div className='d-flex justify-content-between m-2'>
                            <input type='file' name='file' onChange={(e) => handleFileChange(e)} />
                            <div ><button className='btn btn-primary btn-sm' disabled={load} onClick={(e) => uploadProfile(userData?._id)} >Upload</button></div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className="fw-bold"> {userDetails?.name}</div>
                            <div>{userDetails?.email}</div>
                        </div>



                        {/* <span className="font-weight-bold"> {userData?.name}</span>
                        <span className="text-black-50">{userData?.email}</span> */}




                        <div className='d-flex justify-content-between'>
                            <div className="fw-bold"> Role</div>
                            <div>{userDetails?.role}</div>
                        </div>

                        {userDetails?.role === "End user" ? ""
                            : <div className='d-flex justify-content-between'>
                                <div className="fw-bold" > Discount</div>
                                <div>{userDetails?.discount}</div>
                            </div>
                        }
                        <div className='d-flex justify-content-between'>
                            <div className="fw-bold"> Registration Date</div>
                            <div>{new Date(userDetails?.createdAt).toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="col-md-8 ps-lg-5 ps-md-5 border-right">
                        <div className="p-3 ">
                            <div className="d-flex justify-content-between align-items-center pt-4">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>


                            <div className="row ">
                                <div className="col-md-6 col-12 mt-2">
                                    <label className="labels">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="first name"
                                        name='name'
                                        defaultValue={userDetails?.name}
                                        onChange={(e) => handleChangeData(e)}
                                    />
                                </div>


                                <div className="col-md-6 col-12 mt-2">
                                    <label className="labels">Mobile Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="enter phone number"
                                        name='contact'
                                        defaultValue={userDetails?.contact}
                                        onChange={(e) => handleChangeData(e)}
                                    />
                                </div>
                                <div className="col-md-12 mt-2">
                                    <label className="labels">Email ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="enter email id"
                                        name='email'
                                        defaultValue={userDetails?.email}
                                        onChange={(e) => handleChangeData(e)}
                                    />
                                </div>
                                <div className="col-md-12 mt-2">
                                    <label className="labels">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="enter address"
                                        name='address'
                                        defaultValue={userDetails?.address}
                                        onChange={(e) => handleChangeData(e)}
                                    />
                                </div>
                                <div className="col-md-12 mt-2">
                                    <label className="labels">Address2</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="enter address2"
                                        name='address2'
                                        defaultValue={userDetails?.address2}
                                        onChange={(e) => handleChangeData(e)}
                                    />
                                </div>
                                <div className="col-md-4 col-12 mt-2">
                                    <label className="labels">Pin</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="enter pin"
                                        name='pin'
                                        defaultValue={userDetails?.pin}
                                        onChange={(e) => handleChangeData(e)}
                                    />
                                </div>
                                <div className="col-md-4 col-12 mt-2">
                                    <label className="labels">State</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="enter state"
                                        name='state'
                                        defaultValue={userDetails?.state}
                                        onChange={(e) => handleChangeData(e)}
                                    />
                                </div>
                                <div className="col-md-4 col-12 mt-2">
                                    <label className="labels">Pin</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="enter city"
                                        name='city'
                                        defaultValue={userDetails?.city}
                                        onChange={(e) => handleChangeData(e)}
                                    />
                                </div>
                                {/* <div className="col-md-12">
                                <label className="labels">Address Line 2</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="enter address line 2"
                                    defaultValue=""
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Postcode</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="enter address line 2"
                                    defaultValue=""
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">State</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="enter address line 2"
                                    defaultValue=""
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Area</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="enter address line 2"
                                    defaultValue=""
                                />
                            </div>
                            
                            <div className="col-md-12">
                                <label className="labels">Education</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="education"
                                    defaultValue=""
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label className="labels">Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="country"
                                    defaultValue=""
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">State/Region</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue=""
                                    placeholder="state"
                                />
                            </div> */}
                            </div>
                            <div className="mt-5 text-center">
                                <div ><button className='btn btn-primary btn-sm' disabled={load} onClick={(e) => uploadProfileValue(userData?._id)} >Save Details</button></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </>
    )
}


export default UserProfile;