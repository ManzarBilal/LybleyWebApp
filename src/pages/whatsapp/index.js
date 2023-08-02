import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
const WhatsApp = () => {
    const phoneNumber = '9953889657'; // Replace with the phone number you want to chat with
    const message = 'Hello!'; // Replace with the default message
  
    const handleClick = () => {
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    };
  
    return (
        <div className='text-end'>
      <WhatsAppIcon   className='whatsAppCssSize' color='success' onClick={handleClick}/> 
      <div className='fw-bold 'style={{fontSize:"10px",color:"#2e7d32"}} >Chat here for fast Order</div>
      </div>
    );
  };

export default WhatsApp