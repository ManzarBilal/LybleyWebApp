import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import httpCommon from '@/http-common'
import DateRangeIcon from '@mui/icons-material/DateRange';


const Blog = () => {
    const [data,setData]=useState([]);

    useEffect(()=>{
       getBlogs();
    },[]);

    const getBlogs=async()=>{
         try{
           let response=await httpCommon.get("/getAllBlogs");
           let {data}=response;
           setData(data);
           console.log("data",data);
         }catch(err){
           console.log(err);
         }
    }

    return (
        <div className='mt-3'>
            <h1> <u> Blog</u></h1>
            <div className="d-flex justify-content-between">
                <div className="row mt-2">
                   {data?.map(d1=>
                   <div className='col-12 col-md-4 col-lg-4'>
                        <div className="card">
                            <img src={d1?.image} className="img-fluid" alt="..." />
                            <div className="card-body">
                           
                                <h5 className="card-title">{d1?.title}</h5>
                                <p className="card-text">{d1?.content}</p>
                               <div className="d-flex justify-content-between align-items-end"> <a href='#' className='text-decoration-none'>view</a>   <div className='text-muted'> <small> <DateRangeIcon color='primary'/> {new Date(d1?.createdAt)?.toDateString()}</small></div></div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
            <div className='text-center'> <button className='mt-4 btn btn-dark'>View All</button>  </div>
            <div className='mt-5' style={{textAlign:"justify",padding:"25px 30px 15px" ,boxShadow:"0 3px 10px #ebebeb"}}>
            <h4 className='text-primary  '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, officiis?</h4>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nulla blanditiis ullam odit? Sint ullam consectetur quis ipsum maxime culpa recusandae omnis vel impedit perspiciatis laborum odit veritatis, similique repellat enim perferendis! Aliquid enim ipsam est vitae officiis dolorem at nulla dolore inventore eligendi. Assumenda repellat excepturi facilis dignissimos! Quo perferendis libero quisquam culpa cupiditate dolore nesciunt ad ea, fugiat odit facere fuga? Animi iste iusto vel voluptatem sit! Labore, quia sit? Quis temporibus tempore assumenda officiis ex ab totam voluptates eligendi, repellat qui commodi provident praesentium sequi explicabo magnam a perspiciatis id iusto dolor quas nemo dolorum iste! Quaerat.
            </p>
            <h5 className='text-primary mt-2'> Lorem ipsum dolor sit amet consectetur adipisicing.</h5>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident voluptatem, distinctio aliquam temporibus id sed voluptates sunt quis dolores ab, magni ipsa maxime! Inventore, doloremque? Numquam asperiores repellat autem voluptates dignissimos velit magnam enim, iure placeat minima, deleniti incidunt neque provident odio totam commodi mollitia cum vitae nisi necessitatibus ut eligendi. Praesentium tempora dolorem, rerum veniam ex, totam dolor culpa perspiciatis dolore accusamus iure a quae velit molestias qui quasi, eaque optio quo minus alias corrupti ea libero amet! Velit sint rerum perspiciatis sit voluptate.
            </p>
            <h5 className='text-primary mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt assumenda, molestiae, nobis voluptate aut ipsa dolor, quis corrupti ad ex rerum. Odit, nemo. Assumenda vitae pariatur laudantium esse hic expedita ullam totam itaque a corporis harum aperiam eveniet, unde suscipit dolorum qui ipsa labore aliquid saepe laborum! Provident perspiciatis hic, reprehenderit ratione unde numquam, eius iure corrupti cupiditate debitis doloribus est quos, accusamus odio quibusdam neque eum a quaerat amet dicta at deleniti nesciunt eaque delectus? Eius distinctio ex iure accusamus eos assumenda aliquam aut voluptatem? Odit totam error rerum!</p>
            </div>
        </div>
    )
}

export default Blog;