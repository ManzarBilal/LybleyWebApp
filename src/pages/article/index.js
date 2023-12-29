import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Cards from '../cards';

const Article = () => {
    return (
        <div  className='bg-light'>
            
            <div class="container">
                <h1 className='text-primary text-center mt-3'>Articles</h1>
                <div class="row">
                    <div class="col-6">
                        <div class="card mt-4">
                            <img src="https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png" class="card-img-top" alt="..." height="382px" width="100px" />
                            <div class="card-body">
                                <h5 class="card-title text-primary">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card mt-4">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png" class="img-fluid rounded-start" alt="..." height="200px" width="100px" />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mt-2">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png" class="img-fluid rounded-start" alt="..." height="200px" width="100px" />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mt-2">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png" class="img-fluid rounded-start" alt="..." height="200px" width="100px" />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title text-primary">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            <div className='row mt-4'>
    {[1,2,3,4,5,6,7,8].map((p1,i)=>
    <div className='col-md-3 col-4 d-flex justify-content-center mb-3'>
      <Cards key={i} img="https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png" description="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer." title="Card title" link="Click" />
      </div>
      )}  
    </div>
    </div>
           
        </div>
    )
}

export default Article;