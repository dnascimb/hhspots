<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame. Remove this if you use the .htaccess -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  
	<title>HottieHotspots - Tag It</title>
		
	<meta name="description" content="website description for search engines" />
	
	<sx:head cache="true" compressed="true"/>
	
	<link rel="stylesheet" type="text/css" media="all" href="../style.css" />
	
	<link rel="shortcut icon" href="/images/index/favicon.png"/>

	<%@page language="java" import="java.util.*,hottiehotspots.model.Location, 
		hottiehotspots.model.GEOCities, hottiehotspots.model.User, 
		java.util.Iterator" %>
		
	 <!-- Grab Google CDN's jQuery. Remove it if you do not need jQuery-->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
	<!-- ALL jQuery Tools. No jQuery library -->
	<script src="http://cdn.jquerytools.org/1.2.5/all/jquery.tools.min.js"></script>
	
	<link type="text/css" href="../jquery-ui-1.8.9.custom/css/smoothness/jquery-ui-1.8.9.custom.css" rel="Stylesheet" />	
	<script type="text/javascript" src="../jquery-ui-1.8.9.custom/js/jquery-ui-1.8.9.custom.min.js"></script>
		
	<script type="text/javascript" src="../jquery.ui.stars-3.0/jquery.ui.stars.js"></script>
	<link rel="stylesheet" type="text/css" media="all" href="../jquery.ui.stars-3.0/jquery.ui.stars.css" />
	
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
	
	<script type="text/javascript">
	
		<% 
		    hottiehotspots.model.Location hotspot = (hottiehotspots.model.Location)request.getAttribute("hotspot");
		    
			float lat = 0;
			float lng = 0;
			String city = "";
			String country = "";
			String postalCode = "";
			String state = "";
			GEOCities hhlocation;
			
			if(hotspot != null)
			{
				lat = Float.valueOf(hotspot.getLatitude().trim()).floatValue();
				lng = Float.valueOf(hotspot.getLongitude().trim()).floatValue();
			}
		%>

		 // create a map
		var latlng = new google.maps.LatLng(<%=lat%>,<%=lng%>);
			var myOptions = {
			  zoom: 15,
			  disableDefaultUI: true,
			  panControl: false,
			  zoomControl: true,
			  mapTypeControl: false,
			  scaleControl: false,
			  streetViewControl: true,
			  overviewMapControl: false,
			  center: latlng,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};	
		var map = null;
		
		
		
		function createMarker(latLng, content, name) {
			var marker = new Object();
				marker = new google.maps.Marker({
			      position: latLng, 
			      map: map, 
			      draggable: false,
			      title: name,
			      zIndex: Math.round(latlng.lat()*-100000)<<5    
			  	});   
			  	  
				return marker;
		}


		$(document).ready(function() {
			
			map = new google.maps.Map(document.getElementById("google-map"),
				    myOptions);
			
		  	// setup marker on map
		  	var point = new google.maps.LatLng(<%=lat%>,<%=lng%>); 

		  	marker = createMarker(point, "", "<%=hotspot.getName()%>");
		    marker.setIcon('../images/index/purple_marker.png');
		    		
			// star rating 
			$("#stars-wrapperMain").stars({
				captionEl: $("#stars-capMain"),
				disabled:false,
				oneVoteOnly: true
			});
			
			dojo.event.topic.subscribe("/after1", function(data, request, widget){
			    
				if(!(data.indexOf('fieldErrors')>=0)) {
			    	$('#loadingImage').show();
			    }
			    //data : text returned from request(the html)
			    //request: XMLHttpRequest object
			    //widget: widget that published the topic
			});
			
		});
	</script>
</head>
<!-- Fore Reference http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7 ]> <body class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <body class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <body class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <body class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <body> <!--<![endif]-->
	<div id="wrapper">
    
    	<div id="header-wrapper-two">
              <div id="header-two">	
                      <a href="#"><img src="/images/index/logo.png" alt="LOGO" class="logo" /></a>
                      <ul id="main-nav">
                      	<li><a title="HOME" href="/dashboard/default">HOME</a></li>
                        <li><a title="PROFILE" href="#">PROFILE</a></li>
                        <li><a title="INVITE FRIENDS" href="#">INVITE FRIENDS</a></li>
                        <li><a title="LOGOUT" href="#">LOGOUT</a></li>
                      </ul>
                      <form action="#" method="post" id="search-form-two">
                              <p> 
                                <input type="text" name="search" id="search" class="field" value="SEARCH FOR" />
                                <input type="text" name="zipcode" id="zip-code" class="field" value="WHERE (CITY, STATE, ZIP)" />
                                <input type="submit" name="submit" class="submit" value="" /> 
                              </p>
                      </form>
              </div><!--end of header div-->
	      </div><!--end of header-wrapper-->
	  
		  <div id="container-two">
			<a href="#"><img src="/images/index/footer-button.png" alt="FeedBack"  class="feedback" /></a>	      				
			<div id="content-two">

				<div class="t-onthe-hill">
             		   	<div class="thill-left-block">
                    	<h3><s:label name="hotspot.name" /> </h3>
                        <br />
                    	<p><strong><s:label name="hotspot.address1" /></strong></p>
                        <s:if test="hotspot.address2 != null">
                        <p><strong><s:label name="hotspot.address2" /></strong></p>
                        </s:if>
                        
                        <p><strong><s:if test="hotspot.city != null"><s:label name="hotspot.city" />, </s:if>
                        	<s:if test="hotspot.state != null"><s:label name="hotspot.state" />, </s:if>
                        	<s:if test="hotspot.country != null"><s:label name="hotspot.country" /> </s:if>
                        	<s:if test="hotspot.postalCode != null"><s:label name="hotspot.postalCode" /></s:if></strong></p>
                        
                        <s:if test="hotspot.phone != null">
                    	<p><strong><s:label name="hotspot.phone" /></strong></p>
                    	</s:if>
                        
                        <s:if test="labels != null">
                        <br /><p><strong class="voilet-bold">LABELS</strong> <br />
                        <p><strong><s:label name="labels" /></strong></p>
                        </p>
                        </s:if>
                     
                         
                    </div><!--end of thill-left-block-->
                    <div class="gmap-reviewpage">
                    	<div id="google-map">
                    		<a href="#"><img class="gmap" src="/images/index/reviewpage-map.jpg" alt="" /></a>
                    	</div>
                    </div>
                
                </div><!--end of thill-left-block div-->
                
                <div class="review-block">
                	<div class="review-contents">
                	
                	<div id="address-correction-block">   
	                  	<div id="form2div">
	                  	<s:form method="post" theme="css_xhtml" namespace="/addhotspot" action="create" id="form2">
						 	<s:actionerror />
						 
                		<p><strong class="voilet-bold">Your Rating: </strong><span id="stars-capMain"></span>
                            <div id="stars-wrapperMain">
                				<input type="radio" name="rating" value="1" title="Very poor" />
                				<input type="radio" name="rating" value="2" title="Poor" />
                				<input type="radio" name="rating" value="3" title="Fair" />
                				<input type="radio" name="rating" value="4" title="Good" />
                				<input type="radio" name="rating" value="5" title="Very Good" />
                			</div>
                         </p>
                         <br />
                         <br />
                         <s:textarea label="YOUR REVIEW" name="review" class="comment-box" cols="50" rows="5" />
                         <br />
                         <br />
                        <h3 class="grey"><strong>Do we have the correct information? </strong></h3>
                     
						  	<s:hidden name="hotspot.city" />
						  	<s:hidden name="hotspot.state" />
						  	<s:hidden name="hotspot.country" />
						  	<s:hidden name="hotspot.postalCode" />
						  	<s:hidden name="hotspot.latitude" />
						  	<s:hidden name="hotspot.longitude" />
						  							  	
							<s:textfield labelposition="top" label="NAME" name="hotspot.name" cssClass="field" />
							<br />
							
							<s:textfield label="ADDRESS 1" name="hotspot.address1" cssClass="field" />
			        		<br />
			        		<s:textfield label="ADDRESS 2" name="hotspot.address2" cssClass="field" />
			        		<br />
							<s:textfield label="CITY, REGION & POSTAL" name="address" cssClass="field" />
			        		<br />
							<s:textfield label="PHONE" name="hotspot.phone" cssClass="field" />
			        		<br />
							<s:textfield label="URL" name="hotspot.url" cssClass="field" />
			        		<br />
							<s:textfield label="LABELS" name="labels" cssClass="field" />
			        		<em class="formNote">comma separated (examples: 21+, girls, sports, nerds)</em>
			        		<br />
			        		<br />
							<p class="submit-btn">
                            	<sx:a  
								  id="addressSubmit"
								  validate="true" 
								  ajaxAfterValidation="false" 
								  showLoadingText="false"
								  indicator="loadingImage"
								  cssClass="button"
								  onclick="this.blur();"
								  afterNotifyTopics="/after1"><span>Save</span>
								</sx:a>
                            	<img id="loadingImage" src="../images/loader/ajax-loader.gif" style="display:none"/>
							</p>
											
						  </s:form>
						 </div>
					 </div>
					
                     </div><!--end of review-contents div-->
                     
                     <div class="right-sidebar">
                        <a target="_blank" rel="nofollow" href="http://www.mycoke.com/smileizer?WT.cl=1&WT.mm=module1-smileizer-red_en_US">
						<img width="220" height="240" src="../images/ads/smileizer_220x240.jpg" alt="smileizer" border="0"/></a>
						
						<!-- <a href="/us/en/food/food_quality/trends_innovation/chef_dan_coudreaut.html">  
                    	<img width="276" height="128" title="" class="" src="../images/ads/mcdonalds1.png" alt=" "> -->

						<!--  <a href="/us/en/food/food_quality/nutrition_choices/kids_nutrition/food_to_feel_goodabout.html">  
                    	<img width="276" height="128" title="" class="" src="../images/ads/mcdonalds2.png" alt=" "> -->
                     </div><!--end of right-sidebar div-->
                
                 </div><!--end of review-block div-->
                 
                
            			  
        	</div><!--end of content div-->

        <!--<div class="clear">&nbsp;</div>-->
			
		</div><!--end of container div-->
		<div class="push">&nbsp;</div>
    </div> <!-- end of wrapper -->
    
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
      
  
	<!-- PNG fix for IE6 -->	
	<!--[if IE 6]>
		<script type="text/javascript" src="js/dd_belatedpng_0.0.8a-min.js"></script>
		<script type="text/javascript" src="js/ie6-png-fix.js"></script>
	<![endif]-->
</body>
</html>