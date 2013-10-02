<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-GB">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<!-- required to disable Chrome browser caching -->
	<meta http-equiv="pragma" content="no-cache"/>
		
	<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame. Remove this if you use the .htaccess -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    
	<title>HottieHotspots</title>
	
	<sx:head cache="true" compressed="true"/>
	

<!-- begin update to new look and feel -->
	<link rel="shortcut icon" href="/images/index/favicon.png"/>
	<link href="profile.css" rel="stylesheet" type="text/css" />
<!-- <link type="text/css" href="/jquery-ui-1.8.9.custom/css/smoothness/jquery-ui-1.8.9.custom.css" rel="Stylesheet" />	-->
	
<!-- <script type="text/javascript" src="/jquery-ui-1.8.9.custom/js/jquery-ui-1.8.9.custom.min.js"></script> -->
	
<!-- <script type="text/javascript" src="/jquery.ui.stars-3.0/jquery.ui.stars.js"></script> -->
<!-- <link rel="stylesheet" type="text/css" media="all" href="/jquery.ui.stars-3.0/jquery.ui.stars.css" /> -->
<!-- <link href="../common.css" rel="stylesheet" type="text/css" /> -->
<!-- <link href="profile.css" rel="stylesheet" type="text/css" /> -->
<!-- end update to new look and feel -->

	<script type="text/javascript" src="/scripts/hh_common.js"></script>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>

<!-- ALL jQuery Tools. No jQuery library -->
	<script src="http://cdn.jquerytools.org/1.2.5/all/jquery.tools.min.js"></script>
	<script type="text/javascript" src="../jquery-ui-1.8.9.custom/js/jquery-ui-1.8.9.custom.min.js"></script>
		
<!-- <link type="text/css" href="../jquery-ui-1.8.9.custom/css/smoothness/jquery-ui-1.8.9.custom.css" rel="Stylesheet" /> -->
	
	<%@page language="java" import="java.util.*,hottiehotspots.model.*" %>
		
	<link rel="icon" href="images/icon.ico" />
	
	<script type="text/javascript">
		function initialize()
		{
			<%User user = (User) session.getAttribute("user");%>

			var userCity = $("#userCity");

			userCity.autocomplete({
				source: "/json/autoCompleteArea",
				dataType: "json",
				minLength: 3
			});
		}
	</script>
	
	<script type="text/javascript">

		$(document).ready(function() 
		{
			//console.log("kickoff initialize");
			
			initialize();
		});
	</script>
	
</head>
<!-- Fore Reference http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7 ]> <body class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <body class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <body class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <body class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <body> <!--<![endif]-->

<body>

<!-- begin update to new look and feel -->
<!-- 
<div id="header">
	<p>blah</p>
</div>
-->
<!-- MENU -->
<!--  
<jsp:include
    page="/common/menu.jsp"
    flush="true"/>  
 -->

	<div id="wrapper">
    
    	<div id="header-wrapper-two">
              <div id="header-two">	
                      <a href="#"><img src="/images/index/logo.png" alt="LOGO" class="logo" /></a>          
                      <ul id="main-nav">
                        <li><a title="DASHBOARD" href="/dashboard/default">DASHBOARD</a></li>
                        <li><a title="INVITE FRIENDS" href="#">INVITE FRIENDS</a></li>
                        <li><a title="LOGOUT" href="#">LOGOUT</a></li>
                      </ul>
                   
                   <!--  TODO check with Dan, do we want search bar on all pages.  Assume no. -->
                   <!-- 
                      <s:form method="post" id="search-form-two" theme="simple" namespace="/dashboard" action="search" >
						  	<div class="ui-widget">
							  	<p>
								  	<s:textfield name="search" id="search" cssClass="field" value="SEARCH FOR" />
									<s:textfield name="zipcode" id="zip-code" cssClass="location" value="WHERE (CITY, STATE, COUNTRY)" />
									<s:submit 
									  id="submit"
									  value=""
									  validate="true" 
									  ajaxAfterValidation="false" 
									  showLoadingText="false"
									  cssClass="submit"
									  onclick="this.blur();">
									</s:submit>
								</p>
							</div>
					  </s:form>
					-->
              </div><!--end of header div-->
	      </div><!--end of header-wrapper-->

				<!-- Column 1 start -->
		  
				<!--  adapt new look and feel begin -->
			 <!-- <div id="form2div"> -->
			 <div id="tricol-wrapper">
             <div id="col1profile">
			 </div>
			 <div id="col2profile">
			 	<!--  adapt new look and fee end -->
			 	
             <div id="profile-image">
              
                           	 <!-- TODO size profile image --> 
                           	 <!-- TODO figure out image caching -->
                           	 <!-- TODO complete file exists check for user -->
                           	 
             	 		<%@ page import="java.io.*" %>
						<%@ page import="java.net.URL" %>
						<%!public URL fileURL;%>

						<%
							String profileImage = "";
							
							String imagesURI = (String)session.getAttribute( "images-location" ) + user.getId() + "_profile.png";
							String profileImageURL = (String)session.getAttribute( "images-location-url" );
							
							File profileImageFile = new File(imagesURI);
							if(!profileImageFile.exists()) {
								// use the default image
								profileImage = "0_profile_216x216.png";
							} 
							else {
								// use the user's profile image
								profileImage = user.getId() + "_profile.png";
							}
							
							profileImageURL = profileImageURL + profileImage;
						%>

						<a href="#"><img src=<%=profileImageURL%> alt="PROF IMG" class="profile-image" /></a> 
             </div> <!-- end profile-image -->
             
			 <a href="#"><img src="/images/index/footer-button.png" alt="FeedBack"  class="feedback" /></a>	      				
			 <div id="content-two">
			 	<br />
				<br />
				
				<p><label>UPDATE PROFILE</label></p>
				
				<br />	
			 <!--  adapt new look and fee end -->
			  <!--  this namespace and action link back to the struts.xml namespace and action. -->
			  <s:form method="post" theme="css_xhtml" namespace="/profileUpdate" action="save" id="form2" cssClass="profupdate-form">
			 	<s:actionerror />
			 	<s:hidden name="user.id" />
				<p><s:textfield label="USERNAME" labelposition="top" name="user.userName" cssClass="field" /></p>
        		<p><s:password label="PASSWORD" labelposition="top" name="user.password" cssClass="field" /></p>
        		<p><s:textfield label="FIRSTNAME" labelposition="top" name="user.firstName" cssClass="field" /></p>
        		<p><s:textfield label="LASTNAME" labelposition="top" name="user.lastName" cssClass="field" /></p>
        		<p><s:textfield label="HOME LOCATION" labelposition="top" name="currentCityString" id="userCity" cssClass="field" /></p>
				<p><s:textfield label="EMAIL" labelposition="top" name="user.email" cssClass="field" /></p>
				<p><sx:datetimepicker label="BIRTHDAY" labelposition="top" name="user.birthday" cssClass="field" startDate="1900-01-01" displayFormat="yyyy-MM-dd" 
							tooltip="enter date in YYYY-MM-DD format" tooltipIconPath="/images/tooltipqmark.png"/></p>
				<p><s:select label="I AM A..." name="user.gender" labelposition="top" emptyOption="true" cssClass="field" cssStyle="vertical" 
							list="{'Guy', 'Girl', '???'}" /></p>
				<p><s:select label="INTERESTED IN..." labelposition="top" name="user.sexuality" emptyOption="true" cssClass="field"
							list="{'Guys', 'Girls', 'Both', '???'}" /></p>
				<br></br>	
				<div id="addInfoDiv" style="margin-bottom:20px">	
				<tr><td colspan="2"><span><label>ADDITIONAL INFORMATION (OPTIONAL)</label></span></td></tr>
				</div>
				<p><s:select label="RELATIONSHIP STATUS" labelposition="top" name="user.relationshipStatus" emptyOption="true" cssClass="field"
							list="{'Single', 'Married', 'Divorced', 'Committed Relationship', 'Playing the Field', '???'}" /></p>
        				<div id="uploadImgDiv" class="buttonDiv">
        					<p>	
									<s:a
									  id="submitToImageUpload"
									  href="/imageUpload/default"
									  cssClass="button"
									  onclick="this.blur();"><span>Update Profile Image</span>
									</s:a>
							</p>			  
			  			</div>
			  			<br></br>

			 <div id="saveButtonDiv" class="buttonDiv" style="width:45%">	
			  <sx:a 
			  	id="saveButton"
			    formId="form2" 
			    validate="true" 
			    ajaxAfterValidation="false" 
			    showLoadingText="false"
			    cssClass="button"	
			    onclick="this.blur();"><span>Save</span>
			  </sx:a>
			 </div>			  			  
			  </s:form>
			   </div><!-- end content-two div -->
	</div><!--end of col2profile div-->

	</div><!-- end of tri-col wrapper -->
	<div class="push">&nbsp;</div>
</div><!-- end of wrapper div -->
<!-- add new footer and comment out old footer -->
    <div id="footer-wrapper">     
        <div id="footer">
              <p>Hottie hotspot © 2011</p>
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
      
	<!-- script file to add your own JavaScript -->
	<script type="text/javascript" src="/scripts/index.js"></script>
	
	<!-- PNG fix for IE6 -->	
	<!--[if IE 6]>
		<script type="text/javascript" src="js/dd_belatedpng_0.0.8a-min.js"></script>
		<script type="text/javascript" src="js/ie6-png-fix.js"></script>
	<![endif]-->

</body>
</html>
