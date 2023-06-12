import React, { useEffect, useState } from 'react'
import './AdminDashBoard.css'
import NavBar from '../../components/Mynavbar/Navbar'
import Users from "../../img/users.png"
import Adverts from "../../img/advert.png"
import discussion from "../../img/discussion.png"
import socialPosts from "../../img/socialPosts.png"
import DataTable from './Table';
import Table from './Table';
import QaCategoryTable from './QaCategoryTable'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/UserAction';
import { reducers } from '../../reducers';
import SchoolAdvertShare from '../../components/SchoolAdvertShare/SchoolAdvertShare';
import { getAllCategories } from '../../actions/QAActions';


const AdminDashBoard = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const {users, loading} = useSelector((state) =>state.usersReducer);
    const { categories } = useSelector((state) => state.qaReducer);
    const {adverts} = useSelector((state)=> state.advertReducer);
    const {posts} = useSelector((state)=> state.postReducer);
    const {questions} = useSelector((state)=> state.qaReducer);
    const [openUsers, setOpenUsers] = useState(false);
    const [openAdvert, setOpenAdvert] = useState(false);
    const [openQaCategory, setOpenQaCategory] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(getAllUsers());
    },[])
    useEffect(()=>{
       dispatch(getAllCategories())
    },[])
    function swithDisplay(location){
        if(location==="user"){
           setOpenUsers(()=>true) 
           setOpenAdvert(()=>false)
        setOpenQaCategory(()=>false)
        }
        if(location ==="advert"){
            setOpenAdvert(()=>true)
            setOpenUsers(()=>false) 
            setOpenQaCategory(()=>false)
        }
        if(location==="category"){
           setOpenQaCategory(()=>true) 
           setOpenAdvert(()=>false)
           setOpenUsers(()=>false) 
            
        }
        
    }
  return (
    <>
      <NavBar />
      {user.isAdmin &&
     (<div className="main-container">
        <div className="navcontainer">
            <nav className="nav">
                <div className="nav-upper-options">
                    <div onClick={()=>swithDisplay("user")} className="nav-option option1">
                        <img src={Users}
                            className="nav-img"
                            alt="dashboard"/>
                        <h3> Users</h3>
                    </div>
 
                    <div onClick={()=>swithDisplay("advert")} className="option2 nav-option">
                        <img src={Adverts}
                            className="nav-img"
                            alt="articles"/>
                        <h3> Adverts</h3>
                    </div>
 
                    {/* <div className="nav-option option3">
                        <img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                            className="nav-img"
                            alt="report"/>
                        <h3> Report</h3>
                    </div> */}
 
                    <div onClick={()=>swithDisplay("category")} className="nav-option option5">
                        <img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                            className="nav-img"
                            alt="blog"/>
                        <h3> Q&A categories</h3>
                    </div>

 
                </div>
            </nav>
        </div>
        <div className="main">
            <div className="box-container">
 
                <div className="box box1">
                    <div className="text">
                        <h2 className="topic-heading">{users?.length}</h2>
                        <h2 className="topic">Total Users</h2>
                    </div>
 
                    <img src={Users}

                        alt="users"/>
                </div>
 
                <div className="box box2">
                    <div className="text">
                        <h2 className="topic-heading">{adverts?.length}</h2>
                        <h2 className="topic">Advertisements</h2>
                    </div>
 
                    <img src={Adverts}
                         alt="adverts"/>
                </div>
 
                <div className="box box3">
                    <div className="text">
                        <h2 className="topic-heading">{posts?.length}</h2>
                        <h2 className="topic">Social Posts</h2>
                    </div>
 
                    <img src={socialPosts}
                        alt="posts"/>
                </div>
 
                <div className="box box4">
                    <div className="text">
                        <h2 className="topic-heading">{questions?.length}</h2>
                        <h2 className="topic">Q&A exchanges</h2>
                    </div>
 
                    <img src={discussion}
alt="published"/>
                </div>
            </div>
 
            <div className="report-container">
            {openUsers ?
             <Table data={users} />
             :openAdvert ?
             <SchoolAdvertShare location={"new"}/>
             :openQaCategory ?
             <QaCategoryTable data = {categories}/>
             : <Table data={users} />
            }
            
            
            </div>
        </div>
    </div>)  
      }

    </>
   
    )
}

export default AdminDashBoard