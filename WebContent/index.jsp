<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame. Remove this if you use the .htaccess -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  
	<title>HottieHotspots</title>
	
	<meta name="description" content="website description for search engines" />
	
	<sx:head cache="true" compressed="true"/>
	
	<link rel="stylesheet" type="text/css" media="all" href="style.css" />
	
	
	<link rel="shortcut icon" href="images/index/favicon.png"/>
	
</head>
<!-- Fore Reference http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7 ]> <body class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <body class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <body class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <body class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <body> <!--<![endif]-->
	<div id="wrapper">
    
    	<div id="header-wrapper">
              <div id="header">	
                      <a href="#"><img src="images/index/logo.png" alt="LOGO" class="logo" /></a>
                      <!-- COMMENTED UNTIL THIS FEATURE IS IMPLEMENTED -->
                      <!--<form action="#" method="post" id="search-form">
                              <p> 
                                <input type="text" name="zipcode" id="zip-code" class="field" value="WHERE (CITY, REGION, COUNTRY)" />
                                <input type="submit" name="submit" class="submit" value="" /> 
                              </p>
                      </form> -->
              </div><!--end of header div-->
	      </div><!--end of header-wrapper-->
	  
	  <div id="container">
      
		<a href="#"><img src="images/index/footer-button.png" alt="FeedBack"  class="feedback" /></a>	      				
	  
      	<div id="content">
	                  <p>&nbsp;&nbsp;&nbsp;CONNECT WITH HOTTIES IN YOUR AREA IN THE HOTSPOTS YOU LIKE TO VISIT!</p>
	  	</div><!--end of content div-->
	  	
		<div id="sidebar">
                <div id="sidebar-data">
    			<s:actionerror />
    			
                       <s:form id="login-form" theme="css_xhtml" namespace="/login" action="login" cssClass="login">
                            <p><label>LOG IN</label></p>
                            <p><s:textfield labelposition="top" label="USERNAME" name="theUser.userName" id="theUser.userName" cssClass="field" /></p>
                            <p><s:password labelposition="top" label="PASSWORD" name="theUser.password" id="theUser.password" cssClass="field" /></p>
                            <p class="submit-btn">
                            	<sx:a  
								  id="loginSubmit"
								  validate="true" 
								  ajaxAfterValidation="false" 
								  showLoadingText="false"
								  indicator="loadingImage"
								  cssClass="button"
								  onclick="this.blur();"
								  afterNotifyTopics="/after1"><span>SIGN-IN</span>
								</sx:a>
                            	<div id="loading-img-container" class="loadingImage"><img id="loadingImage" src="/images/loader/ajax-loader.gif" style="display:none"/></div>
							</p>
                        </s:form>  
                     
                        
                        <s:form method="post" theme="css_xhtml" namespace="/" action="save" id="form2" cssClass="signup">
					 		<p><label>SIGN UP</label></p>
					 		<s:textfield labelposition="top" label="EMAIL" name="user.email" id="user.email" cssClass="field" />
							<s:textfield labelposition="top" label="USERNAME" name="user.userName" id="user.userName" cssClass="field" />
			        		<s:password labelposition="top" label="PASSWORD" name="user.password" id="user.password" cssClass="field" />
				
							<p class="submit-btn">
					  			<sx:a  
								  id="registerSubmit"
								  validate="true" 
								  ajaxAfterValidation="false" 
								  showLoadingText="false"
								  indicator="loadingImage2"
								  cssClass="button"
								  onclick="this.blur();"
								  afterNotifyTopics="/after2"><span>REGISTER</span>
								</sx:a>
								<div class="loadingImage"><img id="loadingImage2" src="/images/loader/ajax-loader.gif" style="display:none"/></div>
				  			</p>
			  			</s:form>
			  			
                </div><!--end of sidebar-data-->
		</div><!--end of sidebar div-->
        
 		<div class="clear">&nbsp;</div>
	  	
	</div><!--end of container div-->
        
       <div class="push">&nbsp;</div>
		
    </div> <!-- end of wrapper -->
    
    <div id="footer-wrapper">
      
      <div id="footer">
            
            <p>&#169; 2011&#8211; HottieHotspots</p>
            
            <ul>
                <li><a href="#">Mobile </a></li>
                <li><a href="#">Find Friends </a></li>
                <li><a href="#">FIND hotspots </a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li class="last"><a href="#">Help</a></li>
            </ul>
            
      </div><!--end of footer div-->
      
    </div><!--end of footer-wrapper-->
	
	<!-- Grab Google CDN's jQuery. Remove it if you do not need jQuery-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js" type="text/javascript"></script>
	
	<!-- script file to add your own JavaScript -->
	<script type="text/javascript" src="scripts/index.js"></script>
	
	<script type="text/javascript">
		
		dojo.event.topic.subscribe("/after1", function(data, request, widget){
		    
			if(!(data.indexOf('fieldErrors')>=0)) {
		    	$('#loadingImage').show();
		    }
		    //data : text returned from request(the html)
		    //request: XMLHttpRequest object
		    //widget: widget that published the topic
		});
	
		dojo.event.topic.subscribe("/after2", function(data, request, widget){
		    
			if(!(data.indexOf('fieldErrors')>=0)) {
		    	$('#loadingImage2').show();
		    }
		    //data : text returned from request(the html)
		    //request: XMLHttpRequest object
		    //widget: widget that published the topic
		});
		
		
		$(document).ready(function() {
	
			console.log("DOM READY");
			
			// support enter key submission of forms
			$("#login-form .field").keypress(function(event) { 
				
				if (event.keyCode == '13') {
					//delete key is pressed, hide the ability to submit the form
					$('#loginSubmit').focus().click();
				}
			});
			
			$("#form2 .field").keypress(function(event) { 
				
				if (event.keyCode == '13') {
					//delete key is pressed, hide the ability to submit the form
					$('#registerSubmit').focus().click();
				}
			});

			
		});
	
	
	</script>
	
	<!-- PNG fix for IE6 -->	
	<!--[if IE 6]>
		<script type="text/javascript" src="js/dd_belatedpng_0.0.8a-min.js"></script>
		<script type="text/javascript" src="js/ie6-png-fix.js"></script>
	<![endif]-->
</body>
</html>