import React from 'react'
 
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import style from "../common.module.css"

const Faqs = () => {
  return (
    <>
    
      <div className="container">
        <div className={`${style.faqsHead}`}>
        <div className='mt-5' >
            <h1 className='mt-3 fw-bold'>Frequently Asked Question (FAQs) </h1>
            </div>
          <div className='mt-5'>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Q: What is SpareTrade?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  A: SpareTrade is an online platform that connects customers directly with brands to purchase genuine spare parts for their appliances, electronics, and vehicles.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='mt-5'>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Q: How does SpareTrade work?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  A: Our platform allows you to search for spare parts by brand, model, or product category. You can browse through our extensive catalog of spare parts and purchase directly from the brand with just a few clicks. We ensure that the spare parts you purchase are authentic and compatible with your product.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='mt-5'>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Q: Are the spare parts on SpareTrade genuine?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  A: Yes, we work closely with brands to source only the highest quality and most reliable spare parts that are compatible with your product.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='mt-5'>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Q: What products do SpareTrade offer spare parts for?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  A: We offer spare parts for a wide range of products, including refrigerators, air conditioners, washing machines, televisions, mobile phones, laptops, and vehicles, among others.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='mt-5'>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Q: How do I pay for my spare parts on SpareTrade?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  A: We offer secure payment options, including credit card, debit card, and online banking.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='mt-5'>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Q: How long will it take to receive my spare parts?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Delivery times may vary depending on your location and the availability of the spare parts. We work with reliable delivery partners to ensure that you receive your spare parts as quickly as possible.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='mt-5'>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Q: What is the return policy for spare parts purchased on SpareTrade?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  A: We have a hassle-free return policy that allows you to return the spare parts within a specified period if they are not compatible with your product or are found to be defective.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='mt-5'>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Q: How do I contact customer support at SpareTrade?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  A: Our dedicated customer support team is always available to assist you with any queries or concerns you may have. You can reach us via email or phone, and we will be happy to help.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
       
    </>
  )
}

export default Faqs;