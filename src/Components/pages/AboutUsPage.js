import React from "react";
import "./AboutUsPage.css";

function AboutUsPage() {
  return (
      <React.Fragment>
      <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
      <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'/>
    <div class="aboutus-section">
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="aboutus">
                        <h2 class="aboutus-title">About Us: CityKart</h2>
                        <p class="aboutus-text"> Hello. Your's HEARTLY WELCOME to CityKart. Yes, I know you want to know more about this....I will tell you..Go Ahead with this Story 😁😁</p>
                        <p class="aboutus-text">There is a College named JK Institute of Applied Physics and Technology, lies in University of Allahabad, Prayagraj UP. A Student whose name is 'Tirupati Raman Mishra', who is persuing B.tech from there. Don't get Bored, why I am telling about him, U Know? Actually, Reason is He is Developer of this Website CityKart. So, In case of any Query/Problem, Please Contact to him. Great.. </p>
                        <a class="aboutus-more" href="#">Contact/Helpline Number: +919450712968</a>
                        <br/><br/>
                        <a class="aboutus-more" href="#">Our Email: tirupatiramanmishra@gmail.com</a>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="aboutus-banner">
                        <img src="https://i.ibb.co/qsG4Vc5/Untitled-removebg-preview-1.png" alt=""/>
                    </div>
                </div>
                <div class="col-md-5 col-sm-6 col-xs-12">
                    <div class="feature">
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="iconset">
                                    <span class="glyphicon glyphicon-cog icon"></span>
                                </div>
                                <div class="feature-content">
                                    <h4>Work with heart</h4>
                                    <p>We are Working with full enthusiasm to improve this website to improve your experience with us.</p>
                                </div>
                            </div>
                        </div>
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="iconset">
                                    <span class="glyphicon glyphicon-cog icon"></span>
                                </div>
                                <div class="feature-content">
                                    <h4>Reliable services</h4>
                                    <p>We are the Most Realiable Service. Continuously Working for 24X7.</p>
                                </div>
                            </div>
                        </div>
                        <div class="feature-box">
                            <div class="clearfix">
                                <div class="iconset">
                                    <span class="glyphicon glyphicon-cog icon"></span>
                                </div>
                                <div class="feature-content">
                                    <h4>Great support</h4>
                                    <p>The Most Important thing is Your Support. And We are so much Proud of Our user's Support and Believing on us. It is Your Great Support which Motivate us always to take more features for all of you.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </React.Fragment>
  );
};

export default AboutUsPage;
