<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>
<%@ page import="org.apache.struts2.*" %>

 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame. Remove this if you use the .htaccess -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  
	<title>HottieHotspots</title>
	
	<sx:head cache="true" compressed="true"/>
		
	<meta name="description" content="website description for search engines" />
	
	<link rel="stylesheet" type="text/css" media="all" href="dashboard.css" />
	
	<link rel="shortcut icon" href="/images/index/favicon.png"/>
	
	<%@page language="java" import="java.util.*,hottiehotspots.model.Location, 
		hottiehotspots.model.GEOCities, hottiehotspots.model.User, hottiehotspots.model.Label, 
		java.util.Iterator" %>
	
	<!-- needed for popup allowing user to change default area -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
	<!-- ALL jQuery Tools. No jQuery library -->
	<script src="http://cdn.jquerytools.org/1.2.5/all/jquery.tools.min.js"></script>
	
	<link type="text/css" href="/jquery-ui-1.8.9.custom/css/smoothness/jquery-ui-1.8.9.custom.css" rel="Stylesheet" />	
	<script type="text/javascript" src="/jquery-ui-1.8.9.custom/js/jquery-ui-1.8.9.custom.min.js"></script>
	
	 <script type="text/javascript" src="/jquery.ui.stars-3.0/jquery.ui.stars.js"></script>
	 <link rel="stylesheet" type="text/css" media="all" href="/jquery.ui.stars-3.0/jquery.ui.stars.css" />
	
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
	<script type="text/javascript">
	
	var marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker8, marker9, marker10 = "";
	   <% 
	       
	       
			float lat = 0;
			float lng = 0;
			String city = "";
			String country = "";
			String postalCode = "";
			String state = "";
			GEOCities hhlocation;
			
			// get current location so that we can display the map and setup the page
			if(session.getAttribute( "currentLocation" ) != null)
			{
				hhlocation = (GEOCities)session.getAttribute( "currentLocation" );
				lat = hhlocation.getLatitude();
				lng = hhlocation.getLongitude();
				city = hhlocation.getCity();
				country = hhlocation.getCountryId().getCountry();
				state = hhlocation.getRegionId().getRegion();
			}
		%>
	
		 // create a map
	    var latlng = new google.maps.LatLng(<%=lat%>,<%=lng%>);
			var myOptions = {
			  zoom: 13,
			  disableDefaultUI: true,
			  panControl: true,
			  zoomControl: true,
			  mapTypeControl: false,
			  scaleControl: false,
			  streetViewControl: true,
			  overviewMapControl: false,
			  center: latlng,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};	
		var map = null;
	
		var infowindow = new google.maps.InfoWindow(
	    { 
	      size: new google.maps.Size(150,50)
	    });
	    
		function createMarker(latLng, content, name) {
			var marker = new Object();
	  		marker = new google.maps.Marker({
	  	      position: latLng, 
	  	      map: map, 
	  	      draggable: false,
	  	      title: name,
	  	      zIndex: Math.round(latlng.lat()*-100000)<<5    
	  	  	});   
	  		
	  		google.maps.event.addListener(marker, 'click', function() {
	  	        infowindow.setContent(content); 
	  	        infowindow.open(map,marker);
	  	        });
	  	  	  
	  		return marker;
		}
		
	    function OnLoad() {
	    
	    	//  Create a new viewpoint bound; used to establish the zoom level keeping all markers in view
			var bounds = new google.maps.LatLngBounds();
			
	    	map = new google.maps.Map(document.getElementById("google-map"),
	    		    myOptions);
			
			google.maps.event.addListener(map, 'click', function(){infowindow.close();});
	
	 	  // SETUP MARKERS
	      <%
			ArrayList<hottiehotspots.model.Location> hotspotLocations;
			
	      	hotspotLocations = (ArrayList<Location>)session.getAttribute("localHotspots");
		
	      	int idCount = 1; //counter for the total number of locations -
							//(both hotspots and google suggestions) added to map
							//
	      	int limit = 10; //only want to show this many in total
	      	int numberOfHotspots = 0;
	      	
	      		
	      	if(hotspotLocations != null)
			{
	      		numberOfHotspots = hotspotLocations.size();
			}
	     %>
	     
	  	  // setup markers for Suggestions
	      <%
			Set<hottiehotspots.model.Location> googleLocations;
			
			googleLocations = (Set<Location>)session.getAttribute("googleLocations");
		
			if(googleLocations != null)
			{
								
				Iterator iter = googleLocations.iterator();
				while (iter.hasNext() && idCount <= (limit - numberOfHotspots)) 
				{
					hottiehotspots.model.Location curLocation = (hottiehotspots.model.Location)iter.next();
					
				
		  %>
	
			  		var point = new google.maps.LatLng(<%=curLocation.getLatitude()%>,<%=curLocation.getLongitude()%>); 
	
		  			var contentString = "<div class=\"info-window\">" + 
                   "<h3><%=curLocation.getName()%></h3>" +
                   "<p><span>Category:</span>" +
                   <% if(curLocation.getLabels() != null) {
                   	Iterator labelIter = curLocation.getLabels().iterator();
                   	StringBuffer sb = new StringBuffer();
                   	Label label = new Label();
	    				while (labelIter.hasNext()) {
	    					label = (Label)labelIter.next();
	    					sb.append(label.getLabel());
	    					if(labelIter.hasNext()) {
	    						sb.append(", ");
	    					}
	    				}
                   %>
                   "<%=sb.toString()%>" +
                   <% 	 
	    				}%>
                   "</p>" + 
                   "<form>" +
               	"<div id=\"stars-wrapper<%=idCount%>\">" +
               		"<input type=\"radio\" name=\"newrate\" value=\"1\" title=\"Very poor\" />" +
               		"<input type=\"radio\" name=\"newrate\" value=\"2\" title=\"Poor\" />" +
               		"<input type=\"radio\" name=\"newrate\" value=\"3\" title=\"Fair\" />" +
               		"<input type=\"radio\" name=\"newrate\" value=\"4\" title=\"Good\" />" +
               		"<input type=\"radio\" name=\"newrate\" value=\"5\" title=\"Very Good\"/>" +
               	"</div>" +
               	
               	"</form> <p><a href=\"/addhotspot/default?id=<%=idCount%>\" class=\"submit-btn\">RATE</a></p><br />" +
               
                  
                   "<h4>CONTACT</h4>" +
                   "<p>" + 
                   "<%=curLocation.getAddress1()%><br />" +
                   <% if(curLocation.getAddress2() != null) { %>
                     "<%=curLocation.getAddress2()%><br />" +
                   <% } %>
                   "<%=curLocation.getCity()%>, <%=curLocation.getState()%>" +
                   <% if(curLocation.getPostalCode() != null) { %>
                   	" <%=curLocation.getPostalCode()%>" +
                   <% } %>
                   "<br />" + 
                   <% if(curLocation.getPhone() != null) { %>
                   	" <%=curLocation.getPhone()%>" +
                   <% } %>
                   "</p>" +
               	"</div>";
               	
               	marker<%=idCount%> = createMarker(point, contentString, "<%=curLocation.getName()%>");
               	
			    marker<%=idCount%>.setIcon('../images/index/purple_marker.png');
			        
			    bounds.extend(point); // increase the bounds to take this point (establish the zoom level of the map)
		        
		        // add listener to do star rating once the infowindow div exists in dom
		        google.maps.event.addListener(infowindow, "domready", function() {   
					$("#stars-wrapper<%=idCount%>").stars({
						captionEl: $("#stars-cap<%=idCount%>"),
						disabled:true
					});
				});

		  <%
		  		idCount++;
				} // end while
			} // end if
		  %>
	     
	     
	     
	     
	     
	     <% 	
			if(hotspotLocations != null)
			{
				
				Iterator iter = hotspotLocations.iterator();
				while (iter.hasNext()) 
				{
					hottiehotspots.model.Location curLocation = (hottiehotspots.model.Location)iter.next();
					
				
		  %>	
		  
				  var point = new google.maps.LatLng(<%=curLocation.getLatitude()%>,<%=curLocation.getLongitude()%>); 
					
					var contentString = "<div class=\"info-window\">" + 
		          "<h3><a href=\"/hotspot/default?id=<%=curLocation.getLocationId()%>\"><%=curLocation.getName()%></a></h3>" +
		          "<p><span>Category:</span>" +
		          <% if(curLocation.getLabels() != null) {
		          	Iterator labelIter = curLocation.getLabels().iterator();
		          	StringBuffer sb = new StringBuffer();
		          	Label label = new Label();
						while (labelIter.hasNext()) {
							label = new Label();
							label = (Label)labelIter.next();
							if(!sb.toString().trim().equals(""))
							{
								sb.append(", ");
							}
							sb.append(label.getLabel());
						}
		          %>
		          "<%=sb.toString()%>" +
		          <% 	 
						}%>
		          "</p>" + 
		          "<form>" +
		      	"<div id=\"stars-wrapper<%=idCount%>\">" +
		      	<%
		      		Double curRating = curLocation.getHotspot().getCurrentRating();
		      		int rating = (int)Float.parseFloat(curRating.toString());
		      		rating = rating/20;
		      		
		      		if(rating == 1)
		      		{
		      	%>
		      		"<input type=\"radio\" name=\"newrate\" value=\"1\" title=\"Very poor\" checked=\"checked\" />" +
		      	<%
		      		} else {		
		      	%>
		      		"<input type=\"radio\" name=\"newrate\" value=\"1\" title=\"Very poor\" />" +
		      	<%
		      		}
		      	%>
		      	<%
			    	if(rating == 2)
		      		{
	      		%>
		      		"<input type=\"radio\" name=\"newrate\" value=\"2\" title=\"Poor\" checked=\"checked\" />" +
		      	<%
		      		} else {		
		      	%>
		      		"<input type=\"radio\" name=\"newrate\" value=\"2\" title=\"Poor\" />" +
		      	<%
		      		}
		      	%>
		      	<%
			    	if(rating == 3)
		      		{
      			%>
		      		"<input type=\"radio\" name=\"newrate\" value=\"3\" title=\"Fair\" checked=\"checked\" />" +
		      	<%
		      		} else {		
		      	%>
		      		"<input type=\"radio\" name=\"newrate\" value=\"3\" title=\"Fair\" />" +
		      	<%
		      		}
		      	%>
		      	<%
			    	if(rating == 4)
		      		{
  				%>
		      		"<input type=\"radio\" name=\"newrate\" value=\"4\" title=\"Good\" checked=\"checked\" />" +
		      	<%
		      		} else {		
		      	%>	
		      		"<input type=\"radio\" name=\"newrate\" value=\"4\" title=\"Good\" />" +
		      	<%
		      		}
		      	%>
		      	<%
			    	if(rating == 5)
		      		{
				%>
		      		"<input type=\"radio\" name=\"newrate\" value=\"5\" title=\"Very Good\" checked=\"checked\" />" +
		      	<%
		      		} else {		
		      	%>
		      		"<input type=\"radio\" name=\"newrate\" value=\"5\" title=\"Very Good\"/>" +
		      	<%
		      		}		
		      	%>
		      	"</div>" +
		      	
		      	"</form> <br /><br />" +
		      
		         
		          "<h4>CONTACT</h4>" +
		          "<p>" + 
		          "<%=curLocation.getAddress1()%><br />" +
		          <% if(curLocation.getAddress2() != null && !(curLocation.getAddress2().trim()).equals("")) { %>
		            "<%=curLocation.getAddress2()%><br />" +
		          <% } %>
		          "<%=curLocation.getCity()%>, <%=curLocation.getState()%>" +
		          <% if(curLocation.getPostalCode() != null) { %>
		          	" <%=curLocation.getPostalCode()%>" +
		          <% } %>
		          "<br />" + 
		          <% if(curLocation.getPhone() != null) { %>
		          	" <%=curLocation.getPhone()%>" +
		          <% } %>
		          "</p>" +
		      	"</div>";
		      	
		      	marker<%=idCount%> = createMarker(point, contentString, "<%=curLocation.getName()%>");
		      	
		        marker<%=idCount%>.setIcon('../images/index/red_marker.png');
		        
		        bounds.extend(point); // increase the bounds to take this point (establish the zoom level of the map)
		        
		        // add listener to do star rating once the infowindow div exists in dom
		        google.maps.event.addListener(infowindow, "domready", function() {   
					$("#stars-wrapper<%=idCount%>").stars({
						captionEl: $("#stars-cap<%=idCount%>"),
						disabled:true
					});
				});
	
			<%
					idCount++;
					} // end while
				} // end if
			%>
	
			//
			// Reset the bounds of the map so that it shows all markers
			//
			map.fitBounds(bounds);
			
	    }
	
	  	
		function initialize() {
		
			//setup search
			setupSearch("<%=city%>", "<%=state%>", "<%=country%>");
	
			OnLoad();
		}
	
		function setupSearch(city, state, country) {
			
			if(city != null && country != null)
				$("#searchLocation").val(city + ", " + state + ", " + country);
			else
				$("#searchLocation").val("city, state, country");
		}
	
	
		dojo.event.topic.subscribe("/afterHomeLocation", function(data, request, widget){
	    	$('#loadingImage').show();

		    //data : text returned from request(the html)
		    //request: XMLHttpRequest object
		    //widget: widget that published the topic
		});
	</script>
	
	
	<!--  JQuery Tools Modal -->
	<script type="text/javascript">
	$(document).ready(function() {
	
		//console.log("loading overlay");
	
		// select text on focus
		$("input").focus(function() {
			  this.select();
		});
		$("input").mouseup(function(e){
	        e.preventDefault(); 
	        //needed because of bug
	        // http://code.google.com/p/chromium/issues/detail?id=4505
		});

		
		
		
		initialize();
		
		var searchLocation = $("#searchLocation");
	
		searchLocation.autocomplete({
			source: "/json/autoCompleteArea",
			dataType: "json",
			minLength: 3
		});
		
		
	<%
		User user = (User)session.getAttribute("user");
		if(user != null 
				&& user.getDefaultCity() == null)
		{
	%>	
		$("#prompt").overlay({
		 
			// some mask tweaks suitable for modal dialogs
			mask: {
				color: '#ebecff',
				loadSpeed: 200,
				opacity: 0.9
			},
		 
			closeOnClick: false,
			closeOnEsc: false,
		
			// load it immediately after the construction
			load: true
		});
		
		var homeLocation = $("#userDefaultLocation");
		var okButtonDiv = $("#okButtonDiv");
		
		homeLocation.select();
		
		//console.log("setting up autocompleter");
		
		homeLocation.autocomplete({
			source: "/json/autoCompleteArea",
			dataType: "json",
			minLength: 3,
			select: function( event, ui ) {
				okButtonDiv.show(); //allow the user to submit the form
			}
		});
		
		homeLocation.keypress(function() {
			okButtonDiv.hide();
		});
		
		homeLocation.keydown(function(event) {  
			if (event.keyCode == '8' || event.keyCode == '46') {
				//delete key is pressed, hide the ability to submit the form
				okButtonDiv.hide();
			}
		});
		

	<%
		}
	%>
		
	});
	</script>
</head>
<!-- Fore Reference http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7 ]> <body class="ie6"> <![endif]-->
<!--[if IE 7 ]>    <body class="ie7"> <![endif]-->
<!--[if IE 8 ]>    <body class="ie8"> <![endif]-->
<!--[if IE 9 ]>    <body class="ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <body> <!--<![endif]-->

<%
	if(user != null 
			&& user.getDefaultCity() == null)
	{
%>

<!-- user input dialog -->
<div class="modal" id="prompt">
	<h2>Please Select a Home Location</h2>

	<s:form method="post" theme="simple" namespace="/dashboard" action="setDefaultUserArea" id="myArea" cssClass="rounded">
	  	<s:actionerror />
	  	<div class="ui-widget">
		<s:textfield name="userDefaultLocation" id="userDefaultLocation" required="required" />
		</div>
	</s:form>
	<br />
	
	<div id="okButtonDiv" class="buttonDiv">
	<img id="loadingImage" src="/images/loader/ajax-loader.gif" style="display:none"/>
    <sx:a 
	  id="okButton" 
	  formId="myArea" 
	  validate="true" 
	  ajaxAfterValidation="false" 
	  showLoadingText="false"
	  indicator="loadingImage"
	  cssClass="button"
	  onclick="this.blur();"
	  afterNotifyTopics="/afterHomeLocation"><span>OK</span>
	</sx:a>
	</div>
</div>
<!-- JQuery Tools Modal - End -->
<%
	}
%>

	<div id="wrapper">
    
    	<div id="header-wrapper-two">
              <div id="header-two">	
                      <a href="#"><img src="/images/index/logo.png" alt="LOGO" class="logo" /></a>          
                      <ul id="main-nav">
                      	<li><a title="HOME" href="#">HOME</a></li>
                        <li><a title="PROFILE" href="/profileUpdate/default">PROFILE</a></li>
                        <li><a title="INVITE FRIENDS" href="#">INVITE FRIENDS</a></li>
                        <li><a title="LOGOUT" href="#">LOGOUT</a></li>
                      </ul>
                   
                      <s:form method="post" id="search-form-two" theme="simple" namespace="/dashboard" action="search" >
						  	<div class="ui-widget">
							  	<p>
							  		<%
							  			String searchString = (String)request.getAttribute("searchString");
							  			if(searchString == null) {
							  		%>
								  		<s:textfield name="searchString" id="searchString" cssClass="field" value="SEARCH FOR" />
									<% } else { %>
										<s:textfield name="searchString" id="searchString" cssClass="field"  />
									<% } %>
									<s:textfield name="searchLocation" id="searchLocation" cssClass="location" value="WHERE (CITY, STATE, COUNTRY)" />
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
              </div><!--end of header div-->
	      </div><!--end of header-wrapper-->
	  
		  <div id="container-two">
			<a href="#"><img src="/images/index/footer-button.png" alt="FeedBack"  class="feedback" /></a>	      				
			<div id="content-two">
				<div class="map-wapper">
                	<p>Dan Nascimbeni <span>36,000 Points  |  26 Hotspots</span></p>
                	
                	
             		<s:if test="hasActionErrors()">
                	<div id="error-area-wrapper" class="error-area-block">
                		<div id="error-area">
                			<s:actionerror />
                    	</div>
                	</div>
                	</s:if>
                    <div id="google-map-canvas" class="google-map-block">
                    	<div id="google-map">
                    	</div>
                    	<ul class="map-tabs">
							<li><a class="adds" href="/addhotspot/default"><img src="/images/index/map-tab.png" alt="map" /></a></li>
                        	<li><a class="expand-btn" href="#"><img  src="/images/index/places-tab.png" alt="hot places" /></a></li>
                        </ul>
						
                        <div class="drop-down-slid">
                            <ul class="expandable-side">

							<%
							
							// We have some interesting business here because we had to add suggestions
							// to the map first, then hotspots, so that hotspots show on top of suggestions
							//
							// When listing them out now... we have to calculate the marker ID that was used
							//
							// Hotspot ID = loopCount + (totalNumberOfLocationsToShow - numberOfHotspots)
							// 
							// Example.
							// first time thru the loop
							//
							// say there are: 3 hotspots and we only want to show 10 locations
							//
							// Hotspot ID = 1 + (10 - 3)
							// Hotspot ID = 8
							// *which makes sense because if we are only showing 10 locations and 3 of them are
							// hotspots, then there must be 7 suggestions, so hotspots would have begun at 8, then 9, then 10
							// for their ids.
							//
							// For Suggestions, it is different, since we started assigning IDs at 1
							//
							// Example.
							// So say we've looped thru the Hotspot collection and added them to the page (3). Now we enter the 
							// suggestions collection loop for the first time, and the count is already at 4.
							
							// Suggestion ID = loopCount - numberOfHotspots
							// Suggestion ID = 4 - 3
							// Suggestion ID = 1
							//
								int count = 1; //keep track of the number of entries
								if(hotspotLocations != null)
								{
									
									Iterator iter2 = hotspotLocations.iterator();
									while (iter2.hasNext()) 
									{
										hottiehotspots.model.Location drLocation = (hottiehotspots.model.Location)iter2.next();
										
									
							  %>
                                <li class="hotspot">
                                    <span><%=count %></span>
                                    <h4><a href="javascript:google.maps.event.trigger(marker<%=count + (limit - numberOfHotspots) %>, 'click');"><%=drLocation.getName() %></a></h4>
                                    <p><a href="/hotspot/default?id=<%=drLocation.getLocationId() %>">Visit page</a></p>
                                </li>
                            <%
                            			count++;
                            		}
                    			}
                            %>
                              <%
								if(googleLocations != null)
								{
									
									Iterator iter3 = googleLocations.iterator();
									while (iter3.hasNext() && count <= limit) 
									{
										hottiehotspots.model.Location drLocation = (hottiehotspots.model.Location)iter3.next();
										
									
							  %>
                                <li class="not-hotspot">
                                    <span><%=count %></span>
                                    <h4><a href="javascript:google.maps.event.trigger(marker<%=count - numberOfHotspots %>, 'click');"><%=drLocation.getName() %></a></h4>
                                    <p></p>
                                </li>
                            <%
                            			count++;
                            		}
                    			}
                            %>
                            </ul>
                            <a href="#" class="collapse-btn"><img class="go-more" src="/images/index/slide-more.png" alt="Go down" /></a>
                        </div><!--end of drop-down-slid div-->
						
                    </div><!--end of google-map-block div-->
                </div><!--end of map-wraper div-->
                <div id="tricol-wrapper">
                	<div class="col1">
                    	<h3>RECENTLY TAGGED</h3>
                        <ul class="taged-list">
                        
                        <%
	                        ArrayList<hottiehotspots.model.Location> recentlyTagged;
	            			
	            	      	recentlyTagged = (ArrayList<Location>)session.getAttribute("newestHotspots");
	            	      	
	            	      	if(recentlyTagged == null || recentlyTagged.size() == 0)
	            	      	{
	            	    %>
	            	    	<li>
                            	<h4>No Recently Tagged Hotspots</h4>
                            </li>
                        <%  }
	            	      	else
	            	      	{
	            	    
	            	      	
		            	      	Iterator<hottiehotspots.model.Location> rTaggedIter = recentlyTagged.iterator();
		            	      	
		            	      	while(rTaggedIter.hasNext())
		            	      	{
		            	      		hottiehotspots.model.Location curRecTagged = (hottiehotspots.model.Location)rTaggedIter.next();
		            	      		
		            	      		// setup data
		            	      		String curRecTaggedCity = curRecTagged.getCity();
		            	      		String curRecTaggedState = curRecTagged.getState();
		            	      		
		            	      		if(curRecTaggedCity.trim().equals(""))
		            	      		{
		            	      			curRecTaggedCity = curRecTagged.getArea().getCity();
		            	      		}
		            	      		
		            	      		if(curRecTaggedState.trim().equals(""))
		            	      		{
		            	      			curRecTaggedState = curRecTagged.getArea().getRegionId().getRegion();
		            	      		}
                        %>
                        	<li>
                        		<h4><a href="/hotspot/default?id=<%=curRecTagged.getLocationId()%>"><%=curRecTagged.getName() %> (<%=curRecTaggedCity%>, <%=curRecTaggedState%>)</a></h4>
                            	<p>Tagged by: <span><%=curRecTagged.getHotspot().getOriginallyTaggedBy() %></span> | <a href="/hotspot/default?id=<%=curRecTagged.getLocationId()%>">Read review &raquo;</a></p>
                            </li>
                        <%
		            	      	}
	            	      	} //end if
                        %>
                        <!-- 
                            <li class="list-last">
                            	<p class="see-more" ><a href="#">See More &raquo;</a></p>	
                            </li>
                        -->
                        </ul>
                    </div><!--end of col1 div-->
                    <div class="col2">
               	    	<h3>TOP HOTSPOTS</h3>
                        <ul class="hotspots-list">
                        <%
	                        ArrayList<hottiehotspots.model.Location> topTagged;
	            			
	            	      	topTagged = (ArrayList<Location>)session.getAttribute("topHotspots");
	            	      	
	            	      	if(topTagged == null || topTagged.size() == 0)
	            	      	{
	            	    %>
	            	    	<li>
                            	<h4>No Tagged Hotspots</h4>
                            </li>
                        <%  }
	            	      	else
	            	      	{
	            	    
	            	      	
		            	      	Iterator<hottiehotspots.model.Location> tTaggedIter = topTagged.iterator();
		            	      	
		            	      	while(tTaggedIter.hasNext())
		            	      	{
		            	      		hottiehotspots.model.Location curRecTagged = (hottiehotspots.model.Location)tTaggedIter.next();
		            	      		
		            	      		// setup data
		            	      		String curRecTaggedCity = curRecTagged.getCity();
		            	      		String curRecTaggedState = curRecTagged.getState();
		            	      		
		            	      		if(curRecTaggedCity.trim().equals(""))
		            	      		{
		            	      			curRecTaggedCity = curRecTagged.getArea().getCity();
		            	      		}
		            	      		
		            	      		if(curRecTaggedState.trim().equals(""))
		            	      		{
		            	      			curRecTaggedState = curRecTagged.getArea().getRegionId().getRegion();
		            	      		}
                        %>
                        	<li>
                            	<a href="#"><img class="thumb-col2" src="/images/index/col2-img-placeholder.png" alt="" /></a>
                                <h4><a href="/hotspot/default?id=<%=curRecTagged.getLocationId()%>"><%=curRecTagged.getName() %> (<%=curRecTaggedCity%>, <%=curRecTaggedState%>)</a></h4>
                            	<p>Tagged <span><%=curRecTagged.getHotspot().getTimesRated() %> times</span> | <a href="/hotspot/default?id=<%=curRecTagged.getLocationId()%>">Read review &raquo;</a></p>
                            </li>
                        	
                        <%
		            	      	}
	            	      	} //end if
                        %>
                        <!-- 
                            <li>
                            	<a href="#"><img class="thumb-col2" src="/images/index/col2-img-placeholder.png" alt="" /></a>
                                <h4>Jillian's Boston, MA</h4>
								<p>Tagged by <span>28 people</span> | <a href="#">Read review &raquo;</a></p>
                            </li>
                            <li class="last-col2">
                            	<a href="#"><img class="thumb-col2" src="/images/index/col2-img-placeholder.png" alt="" /></a>
                                <h4>Jillian'€™s Boston, MA</h4>
								<p>Tagged by <span>28 people</span> | <a href="#">Read review &raquo;</a></p>
                            	<p class="see-more" ><a href="#">See More &raquo;</a></p>
                            </li>
                         -->
                        </ul>
                    </div><!--end of col2 div-->
                    <div class="col3">
					
                   	  	<ul class="nav-col3">
                        	<li><a href="#newest">NEWEST</a></li>
                            <li><a href="#nearest">NEAREST</a></li>
                            <li><a href="#hottest">HOTTEST</a></li>
                        </ul>
						
                        <div id="newest">
                        	<ul class="images-list">
                        		<li><a href="#"><img src="/images/index/col3-img-placeholder.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder.png" alt="" /></a></li>
                        	</ul>
                        </div>
						
						<div id="nearest">
                        	<ul class="images-list">
                        		<li><a href="#"><img src="/images/index/col3-img-placeholder-1.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-1.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-1.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-1.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-1.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-1.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-1.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-1.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-1.png" alt="" /></a></li>
                        	</ul>
                        </div>
						
						<div id="hottest">
                        	<ul class="images-list">
                        		<li><a href="#"><img src="/images/index/col3-img-placeholder-2.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-2.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-2.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-2.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-2.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-2.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-2.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-2.png" alt="" /></a></li>
                        	    <li><a href="#"><img src="/images/index/col3-img-placeholder-2.png" alt="" /></a></li>
                        	</ul>
                        </div>
						
                    </div><!--end of col3 div-->
                </div><!--end of tricol-wrapper	 div-->		  
			</div><!--end of content div-->
			
<!--<div class="clear">&nbsp;</div>-->
			
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
      
	<!-- script file to add your own JavaScript -->
	<script type="text/javascript" src="/scripts/index.js"></script>
	
	<!-- PNG fix for IE6 -->	
	<!--[if IE 6]>
		<script type="text/javascript" src="js/dd_belatedpng_0.0.8a-min.js"></script>
		<script type="text/javascript" src="js/ie6-png-fix.js"></script>
	<![endif]-->
</body>
</html>