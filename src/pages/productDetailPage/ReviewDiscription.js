import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReviewDiscription() {
     const ReviewDiscriptionData=[
        {
            image:"https://c8.alamy.com/comp/2F9GW5A/the-electric-motor-from-the-washing-machine-spare-parts-used-to-repair-home-appliances-isolated-background-2F9GW5A.jpg",
            name:'Joan Dyer',
            time:'3 hours ago',
            productname:'Top-Oculus VR',
            productdiscription:'A good fit for many households, this Oculus VR has a movable deli drawer and door shelves that can accommodate gallon containers.Though its low price means fewer features, this pick is quiet and an energy-saving option, resulting in a lower energy bill.',
            type:'first'
        },
        {
            image:"https://c8.alamy.com/comp/2F9GW5A/the-electric-motor-from-the-washing-machine-spare-parts-used-to-repair-home-appliances-isolated-background-2F9GW5A.jpg",
            name:'Phil Glover',
            time:'1 Day ago',
            productname:'Oculus VR Full 3D',
            productdiscription:'I purchased this Oculus from elsewhere, on last Dipawali. As this Oculus contains in-built DDB( means you need not to install a separate set-top box), there is less number of wire hanging around the set and single remote required. Great full HD picture quality. Sound quality of the set is far better than most of the sets of the so called big brands.',
            type:'first'
        },
        {
            image:"https://c8.alamy.com/comp/2F9GW5A/the-electric-motor-from-the-washing-machine-spare-parts-used-to-repair-home-appliances-isolated-background-2F9GW5A.jpg",
            name:'Victor Rampling',
            time:'5 Day ago',
            productname:'Oculus VR  Wireless Bluetooth',
            productdiscription:'The build quality feels really premium.Sound quality is quite great compared to its price point.Sound quality is quite great compared to its price point.',
            img:"https://c8.alamy.com/comp/2F9GW5A/the-electric-motor-from-the-washing-machine-spare-parts-used-to-repair-home-appliances-isolated-background-2F9GW5A.jpg",
            secondname:'Karen Clark',
            secondtime:'Hd quality is quite great compared to its price point.',
            type:'second'
        }
    ]

    return (
        <ul className="list-unstyled mb-4">
            {
                ReviewDiscriptionData.map((d, i) => {
                    return <li key={'kdmowem' + i} className="card mb-2">
                        <div className="card-body p-lg-4 p-3">
                            <div className="d-flex mb-3 pb-3 border-bottom flex-wrap">
                                <img  style={{width:"50px" ,height:"50px"}} className="avatar rounded" src={d.image} alt="" />
                                <div className="flex-fill ms-3 text-truncate">
                                    <h6 className="mb-0"><span>{d.name}</span></h6>
                                    <span className="text-muted">{d.time}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="mb-2 me-3">
                                        <a href='#!' className="rating-link active"><i className="bi bi-star-fill text-warning"></i></a>
                                        <a href='#!' className="rating-link active"><i className="bi bi-star-fill text-warning"></i></a>
                                        <a href='#!' className="rating-link active"><i className="bi bi-star-fill text-warning"></i></a>
                                        <a href='#!' className="rating-link active"><i className="bi bi-star-fill text-warning"></i></a>
                                        <a href='#!' className="rating-link active"><i className="bi bi-star-half text-warning"></i></a>
                                    </span>
                                </div>
                            </div>
                            <div className="timeline-item-post">
                                <h6 className="">{d.productname}</h6>
                                <p>{d.productdiscription}</p>

                                {
                                    d.type === 'second' ? <div>
                                        <div className="d-flex mt-3 pt-3 border-top">
                                            <img style={{width:"50px" ,height:"50px"}}  className="avatar rounded" src={d.img} alt="" />
                                            <div className="flex-fill ms-3 text-truncate">
                                                <p className="mb-0"><span>{d.secondname}</span> <small className="msg-time text-muted">5 Day ago</small></p>
                                                <span className="text-muted">{d.secondtime}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <textarea className="form-control" placeholder="Replay"></textarea>
                                        </div>
                                    </div> : null
                                }

                            </div>
                        </div>
                    </li>
                })
            }
        </ul>

    )
}
export default ReviewDiscription;