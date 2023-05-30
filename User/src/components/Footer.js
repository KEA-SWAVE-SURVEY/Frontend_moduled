import '../styles/FooterStyles.css'

const Footer = () =>{
    return(
        <>
        <div className='footer'>
            <div className='top'>
                <div>
                    <h1>SWAVE</h1>
                    <p>Survey What you want</p>
                </div>
                <div>
                    <a href='/'>
                        <i className='fa-brands fa-facebook-square'></i>
                    </a>
                    <a href='/'>
                        <i className='fa-brands fa-facebook-square'></i>
                    </a>
                    <a href='/'>
                        <i className='fa-brands fa-facebook-square'></i>
                    </a>
                    <a href='/'>
                        <i className='fa-brands fa-facebook-square'></i>
                    </a>
                </div>
            </div>

            <div className='bottom'>
                <div>
                   <h4>Project</h4>
                   <a href="/">Changelog</a>
                   <a href="/">Status</a>
                   <a href="/">License</a>
                   <a href="/">All Versions</a> 
                </div>
                <div>
                   <h4>Community</h4>
                   <a href="/">Github</a>
                   <a href="/">Issues</a>
                   <a href="/">Projects</a>
                   <a href="/">Twitter</a> 
                </div>
                <div>
                   <h4>Help</h4>
                   <a href="/">Support</a>
                   <a href="/">Troubleshooting</a>
                   <a href="/">Contact Us</a> 
                </div>
                <div>
                   <h4>Others</h4>
                   <a href="/">Terms of Service</a>
                   <a href="/">Privacy Policy</a>
                   <a href="/">License</a>
                </div>
                
            </div>
            <br/>
            <br/>
            <br/>
            <div className='copy'>Copyright 2023. SWAVE all rights reserved. </div>
            </div>
        
        </>
    )
}

export default Footer